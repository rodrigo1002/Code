import { Plugin } from "@opencode/plugin"

const APP_PATHS = ["index.html", "styles.css", "app.js"]
const APP_PREFIXES = ["images/"]
const TOOLING_PREFIXES = [".opencode/", ".agents/"]
const DOC_PATHS = ["memory.md", "agents.md", "constitution.md"]
const FILE_TOOLS = /^(write|edit|patch|apply_patch|multiedit)$/i

const SYNC_PROMPT = `[SINCRONIZACIÓN DOCUMENTAL AUTOMÁTICA]
La tarea acaba de modificar la aplicación o sus herramientas. No la des por terminada todavía.
Sigue el procedimiento de \`.opencode/commands/SYNC.md\`:
1. Actualiza \`MEMORY.md\` con los cambios reales y verificados.
2. Revisa \`AGENTS.md\` y actualízalo solo si cambió una invariante, ruta, hook o regla.
3. Actualiza \`constitution.md\` solo si cambió el alcance o los principios; si lo haces, sube su versión manual.
No modifiques \`index.html\`, \`styles.css\` ni \`app.js\` en este turno. No inventes datos.
Si no hay cambios netos que documentar, responde exactamente \`Documentación sin cambios\` y no edites archivos.`

function normalize(value: string): string {
  return value.replaceAll("\\", "/").replace(/^\.\/+/, "").toLowerCase()
}

function relativeToDirectory(file: string, directory: string): string {
  const normalizedFile = normalize(file)
  const normalizedDirectory = normalize(directory).replace(/\/+$/, "")
  if (normalizedFile.startsWith(`${normalizedDirectory}/`)) {
    return normalizedFile.slice(normalizedDirectory.length + 1)
  }
  return normalizedFile
}

function extractPath(input: unknown): string | undefined {
  if (typeof input === "string") {
    try {
      return extractPath(JSON.parse(input))
    } catch {
      return undefined
    }
  }
  if (!input || typeof input !== "object") return undefined
  const record = input as Record<string, unknown>
  for (const key of ["filePath", "file_path", "path", "file", "filename"]) {
    const value = record[key]
    if (typeof value === "string" && value.trim() !== "") return value
  }
  return undefined
}

function isAppFile(relativePath: string): boolean {
  return (
    APP_PATHS.includes(relativePath) ||
    APP_PREFIXES.some((prefix) => relativePath.startsWith(prefix))
  )
}

function isToolingFile(relativePath: string): boolean {
  return TOOLING_PREFIXES.some((prefix) => relativePath.startsWith(prefix))
}

export default Plugin.define({
  id: "project.docs-sync",
  async setup(ctx) {
    const directory = ctx.location.directory
    let lastAppEdit = 0
    let lastDocsEdit = Date.now()
    let syncSessionID: string | undefined
    let syncPending = false

    await ctx.tool.hook("execute.after", (event) => {
      if (event.status !== "completed") return
      if (!FILE_TOOLS.test(event.tool ?? "")) return

      const file = extractPath(event.input)
      if (!file) return

      const relativePath = relativeToDirectory(file, directory)
      if (DOC_PATHS.includes(relativePath)) {
        lastDocsEdit = Date.now()
        return
      }
      if (isAppFile(relativePath) || isToolingFile(relativePath)) {
        lastAppEdit = Date.now()
      }
    })

    const controller = new AbortController()

    void (async () => {
      try {
        for await (const event of ctx.event.subscribe({
          types: ["session.idle"],
          signal: controller.signal,
        })) {
          const sessionID = event.data.sessionID

          // Ignore the idle event produced by the documentation turn itself.
          if (syncSessionID === sessionID) {
            syncSessionID = undefined
            continue
          }

          if (syncPending) continue
          if (lastAppEdit <= lastDocsEdit) continue

          const session = await ctx.session.get({ sessionID })
          const parentID = (session as any)?.data?.parentID ?? (session as any)?.parentID
          if (parentID) continue

          syncPending = true
          syncSessionID = sessionID
          lastDocsEdit = Date.now()

          try {
            await ctx.session.prompt({
              sessionID,
              text: SYNC_PROMPT,
              delivery: "queue",
            })
          } catch (error) {
            syncSessionID = undefined
            console.error("[docs-sync] No se pudo encolar la sincronización documental.", error)
          } finally {
            syncPending = false
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error("[docs-sync] El flujo de eventos se detuvo.", error)
        }
      }
    })()

    return () => controller.abort()
  },
})

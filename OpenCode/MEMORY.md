# Memory del proyecto — Top 100 DJs de Música Electrónica

**Última revisión manual:** 2026-11-07 (constitución 1.1)

## 1. Propósito del proyecto

Crear una página web estática llamada **Top 100 DJs de Música Electrónica**, cuyo objetivo es mostrar una selección editorial de los 100 DJs más destacados e influyentes de la historia de la música electrónica.

La web debe permitir descubrir artistas de diferentes épocas, países y estilos musicales, desde los pioneros de la música electrónica hasta los referentes actuales.

La prioridad es mantener un proyecto sencillo, limpio, moderno y fácil de mantener, especialmente para alguien que está aprendiendo programación.

El ranking es una selección editorial subjetiva, no una clasificación oficial ni universal.

## 2. Alcance funcional actual

La versión actual incluye:

1. Un encabezado principal con el título "Top 100 DJs de música electrónica".
2. Una breve introducción sobre el contenido de la página.
3. Un listado de exactamente 100 DJs.
4. Una posición numerada del 1 al 100 para cada DJ.
5. El nombre artístico de cada DJ.
6. Su género o estilo musical principal.
7. Una fotografía local de cada DJ (600 × 600 px).
8. Su país de origen, con una bandera pequeña (18 × 12 px).
9. Un buscador por nombre artístico.
10. Un filtro por género musical.
11. Un filtro por país.
12. Una sección de estadísticas con: total de DJs, géneros distintos, género con más DJs y países representados.
13. Una distribución por género con cantidad, porcentaje y barras horizontales.
14. Una distribución por década de inicio de carrera.
15. Un botón "Limpiar filtros" que solo aparece cuando hay algún filtro activo.
16. Un diseño responsive para ordenadores, tablets y móviles.
17. Una ficha individual por DJ, en diálogo nativo, con foto en color, posición, país, género, año de inicio (solo si está documentado), una línea de contexto con recuentos sobre los 100 DJs y una reseña editorial.
18. Una sección de metodología («Cómo se construyó este ranking») con las cinco dimensiones cualitativas y la declaración de naturaleza editorial.
19. Una sección «El mapa global de la música electrónica»: mapa mundial SVG con la ubicación documentada de los 100 DJs, panel lateral de detalle, buscador propio, filtro por país del marcador y un panel plegable con el recuento por país.

No incorporar funcionalidades adicionales sin autorización.

### Orden de la página

1. Encabezado e introducción (dos columnas en escritorio).
2. Barra de trabajo: buscador, género y país; debajo, contador de resultados y botón de limpiar. En escritorio queda fija arriba (`position: sticky`).
3. Mensaje de estado vacío (si procede).
4. Sección de estadísticas: resumen en cuatro celdas y dos paneles plegables (`<details>`).
5. Metodología: «Cómo se construyó este ranking», cinco dimensiones cualitativas en `<dl>` y la declaración de versión editorial.
6. Listado de fichas.
7. Mapa global: título, nota, controles propios, mapa con panel lateral, leyenda, resumen y un panel plegable de países.

Los controles van **antes** del dashboard a propósito: con 100 fichas la página es larga y el usuario debe poder filtrar sin recorrerla entera.

### Comportamiento de búsqueda y filtros

- La búsqueda se hace por **palabras**: la consulta se normaliza (minúsculas, sin acentos) y se sustituye cualquier signo de puntuación por espacio (`searchTokens`). Todas las palabras deben aparecer en el nombre.
  - Por eso `Chase Status`, `chase & status` y `Chase & Status` encuentran al mismo DJ, igual que `Aly Fila` y `Dimitri Vegas Like Mike`.
- Los tres filtros se combinan con Y lógico y nunca modifican el array `djs`.
- Cada tarjeta conserva siempre su `position` original, aunque el resultado filtrado sea de una sola tarjeta.
- `render()` es la única función que aplica filtros, pinta tarjetas y actualiza contador, estado vacío y visibilidad del botón de reset.
- Al limpiar filtros se restablecen los tres controles y el foco vuelve al buscador.

### Criterios de las estadísticas

- Todas las cifras se calculan en tiempo de ejecución a partir del array `djs`. No hay valores escritos a mano.
- Las estadísticas se calculan sobre los 100 DJs, **no** sobre el resultado filtrado.
- Los porcentajes se redondean a un decimal; como consecuencia, la suma de los porcentajes mostrados puede variar en ±0,1.
- El ancho de cada barra usa el porcentaje exacto (sin redondear), calculado en `app.js`.
- La estadística de décadas solo usa DJs con `debutYear` documentado e indica cuántos quedan fuera. Si ninguno tuviera año, se muestra un aviso en lugar de la gráfica.

### El mapa global

La sección «El mapa global de la música electrónica» es un sistema **independiente** del listado:

- **No comparte estado con los filtros superiores.** No llama a `render()` y no toca `#djGrid`, `#resultsInfo` ni los controles de buscador/género/país. Lee `djs` (puesto y país del ranking) y `djGeo` (ubicación documentada); su estado vive en `mapK`, `mapTX`, `mapTY`, `mapSelected`, `mapQuery`, `mapCountry`, `mapFocusIdx`, `mapPanelKind` y `mapPanelClusterKey`.
- **Proyección Miller** sobre un lienzo de 1000 × 500 unidades de viewBox (`millerY`, `mapX`, `mapY`), la misma con la que se proyectó el path de las fronteras. La cartografía es **Natural Earth 1:110 m (dominio público)** ya proyectada; **no se edita a mano**: vive como un único atributo `d` en `index.html` y solo se regenera desde la fuente.
- **Los marcadores no cambian con el zoom.** Las posiciones se recalculan en unidades del viewBox en cada repintado (`x = mapX(lon) * k + tx`), el grupo de marcadores no recibe `transform` y el mundo sí (`translate(...) scale(k)`). El tamaño visual y el área de captura se ajustan al ancho renderizado del SVG: `.map__hit` garantiza un objetivo de 24 × 24 px y el número de los grupos se lee a 10 px reales; en pantallas estrechas las formas crecen para seguir siendo legibles.
- **Agrupación por celdas de 26 unidades** del viewBox: un DJ solo se dibuja como marcador (`.map__marker`) y dos o más como grupo con la cifra (`.map__cluster`). El agrupado se recalcula con el zoom y la traslación, de modo que acercarse separa los grupos.
- **Ubicación**: los 100 DJs tienen una ciudad documentada y se dibujan con `.map__dot`. La leyenda muestra una sola clave, «Ciudad documentada»; no hay marcadores de solo país ni registros sin ubicación.
- **Zoom y traslación acotados**: `mapK` entre 1 y 6; con `k > 1`, `tx ∈ [1000·(1−k), 0]` y `ty ∈ [500·(1−k), 0]`; con `k = 1`, `tx = ty = 0`. Rueda hacia el cursor (factor `exp(-deltaY * 0.0015)`), arrastre con puntero y botones + / −. En los límites de zoom y con `Ctrl` la rueda no se intercepta, para no bloquear el desplazamiento de la página ni el zoom del navegador. En `k = 1` el SVG usa `touch-action: pan-y pinch-zoom` y el arrastre no captura el puntero; con `k > 1` usa `touch-action: none` y el arrastre traslada el mapa.
- **El panel lateral nunca queda vacío**: sin selección muestra «Selecciona un marcador para ver la ficha del DJ». Con un marcador seleccionado da puesto, nombre, ubicación, género y año de debut (solo si está documentado) y, si el país del marcador difiere del país del ranking, una línea `Ranking: …`. Con un grupo, lista sus DJs como botones. El panel guarda su tipo (`dj`/`cluster`) y la firma del grupo: si un filtro o el zoom lo deshacen, vuelve al estado por defecto en lugar de listar DJs que ya no forman ese grupo. El mapa no tiene botón de reinicio: la selección y el halo permanecen hasta elegir otro marcador o hasta que un filtro deje fuera al DJ seleccionado.
- **Accesibilidad**: `#mapSvg` es un `role="group"` con un solo elemento enfocable a la vez (roving tabindex sobre marcadores y grupos); las flechas recorren los marcadores, Enter/Espacio abre la ficha (o lista el grupo) y `+` / `−` hacen zoom. La selección se anuncia por `#mapLive` y los recuentos filtrados por `#mapSummary`, ambos `aria-live="polite"`.
- **Retorno de foco**: `openDetail(position, triggerEl)` acepta el elemento que abrió la ficha. Al cerrar, el foco vuelve a él si sigue en el documento y, si no, a `.card__media[data-position]`. El mapa le pasa el marcador seleccionado; las tarjetas siguen llamando solo con la posición. Si el DJ seleccionado está dentro de un grupo (no hay marcador suelto), el foco va a `.map__panel-open`; la búsqueda llama a `selectMapDj` con `focus: false` para no interrumpir la escritura.
- **Etiqueta de un grupo**: solo nombra un lugar si ese lugar es común a **todo** el grupo (`N DJs en Los Ángeles`). `mapClusterPlace` devuelve la ciudad únicamente cuando todos los puntos comparten la misma; en cualquier otro caso devuelve `null` y el rótulo pasa a `N DJs agrupados en esta zona` (en `aria-label`, en el `map__panel-kicker` y en el anuncio `#mapLive`). Una celda de 26 unidades mezcla ciudades distintas, así que nombrar la más repetida afirmaba un hecho falso; el panel sigue listando nombre y ciudad de cada DJ para desambiguar.

### Revisión de código y seguridad (2026-11-07)

- La página no hace peticiones externas ni usa `fetch`, XHR, `eval`, `new Function`, `document.write`, almacenamiento, cookies ni formularios. Todos los recursos (HTML, CSS, JS, fotos, banderas SVG y cartografía) son locales.
- El texto dinámico se inserta con `textContent` o `escapeHTML`; una cadena de inyección probada en los buscadores no crea nodos ni ejecuta código.
- Los recuentos de un solo artista usan `djUnit()` (`1 DJ`, nunca `1 DJs`).
- No se añadió CSP mediante `<meta>`: con `file://` aporta poco y podría bloquear los estilos en línea de las barras y el `data:` de la flecha de los desplegables. Si el sitio se publica en un servidor, la CSP (`default-src 'none'; script-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; connect-src 'none'; base-uri 'none'; form-action 'none'`) y las cabeceras `X-Content-Type-Options`, `Referrer-Policy` y `frame-ancestors` deben configurarse en el servidor.
- `djs`, `djGeo`, `djBios` y `countryFlags` son datos estáticos y locales. Si en el futuro se cargan desde una fuente externa o editable, habría que validar `position` como entero y no tratar `countryFlags` como HTML de confianza.

## 3. Arquitectura del proyecto

El proyecto debe utilizar tres archivos principales:

| Archivo | Responsabilidad |
|---|---|
| `index.html` | Estructura y contenido HTML de la página. Incluye el path de las fronteras (Natural Earth) del mapa global. |
| `styles.css` | Diseño visual, colores, tipografía, responsive y el bloque `/* --- Mapa global --- */`. |
| `app.js` | Datos de los DJs (`djs`, `djBios`, `djGeo`), estadísticas, buscador, filtros, renderizado del listado y módulo del mapa. |

Inventario de los tres archivos:

- `index.html`: encabezado, barra de trabajo, estadísticas, metodología, listado, sección del mapa (con un único `<path>` de 126.892 caracteres) y ficha en `<dialog>`.
- `styles.css`: tokens en `:root`, reset, componentes existentes y el bloque del mapa (`.map*`, `.map__key*`, `.map__panel*`), más sus reglas responsive dentro de las media queries.
- `app.js`: `djs`, `djBios`, `djGeo`, helpers compartidos (`escapeHTML`, `normalize`, `searchTokens`, `countBy`, `formatPercent`, `djUnit`, `fillSelect`), render del listado, ficha y módulo del mapa (`MAP_*`, `millerY`, `mapX`, `mapY`, `mapMetrics`, `renderMap`, `selectMapDj`, `activateMapCluster`, …).

Este archivo `MEMORY.md` funciona como documentación y memoria del proyecto. No forma parte de la interfaz web.

### Documentación y flujo de trabajo

El proyecto mantiene tres documentos con responsabilidades distintas:

| Documento | Responsabilidad |
|---|---|
| `constitution.md` | Principios, alcance y restricciones duraderas. |
| `AGENTS.md` | Invariantes operativas y reglas de edición. |
| `MEMORY.md` | Estado actual, cifras verificadas, decisiones y limitaciones. |

- Al cerrar una tarea que cambie comportamiento, datos, diseño o herramientas, se actualizan en este orden: `MEMORY.md`, `AGENTS.md` y, solo si cambió el alcance o los principios, `constitution.md`.
- Si no hay cambios netos, los documentos no se tocan.
- El plugin `.opencode/plugins/docs-sync/index.ts` detecta ediciones en `index.html`, `styles.css`, `app.js` y las herramientas del proyecto, y encola un turno final de documentación cuando la sesión queda inactiva. El procedimiento manual es el comando `/SYNC` (`.opencode/commands/SYNC.md`). Solo observa las herramientas de edición (`write`, `edit`, `patch`); si la app se modifica desde una shell, hay que ejecutar `/SYNC` a mano.
- El plugin y el comando son herramientas de OpenCode: no los carga `index.html` ni añaden dependencias a la web.
- Skills del proyecto: `.agents/skills/dj-electronic-web/SKILL.md` y `.agents/skills/frontend-design/SKILL.md`.
- Agentes SDD: `.opencode/agents/coordinador.md`, `planner.md`, `implementor.md` y `reviewer.md`. `explore` es un subagente integrado, sin archivo propio.

## 4. Restricciones técnicas

- Utilizar exclusivamente HTML, CSS y JavaScript vanilla.
- No utilizar frameworks.
- No utilizar librerías externas.
- No utilizar herramientas de compilación.
- No utilizar bases de datos.
- No utilizar APIs externas.
- No requerir instalación de dependencias.
- No requerir servidor web.
- La página debe funcionar abriendo `index.html` directamente con doble clic.
- Utilizar rutas relativas entre archivos.
- Mantener el código simple, organizado y fácil de entender.
- Evitar dependencias externas, incluidas fuentes que requieran conexión a Internet.

## 5. Contenido y criterios del ranking

El listado debe incluir exactamente 100 DJs únicos.

Debe existir una combinación equilibrada de artistas históricos y contemporáneos.

Se deben considerar diferentes estilos de música electrónica:

- House.
- Tech House.
- Deep House.
- Progressive House.
- Techno.
- Melodic Techno.
- Trance.
- Progressive Trance.
- EDM.
- Electro House.
- Big Room.
- Dubstep.
- Drum & Bass.
- Jungle.
- Psytrance.
- Breakbeat.
- Minimal Techno.
- Ambient.
- Otros estilos relevantes.

### Criterios editoriales

La sección «Cómo se construyó este ranking» declara **cinco dimensiones
cualitativas**, sin porcentajes, sin pesos y sin puntuaciones. El orden no se
calcula: se argumenta.

- Influencia histórica: impacto en la evolución de la música electrónica.
- Innovación: aportaciones musicales, experimentación y contribución a nuevos sonidos.
- Trayectoria: duración, consistencia y evolución de la carrera.
- Impacto cultural: influencia en clubes, festivales y cultura musical.
- Relevancia: reconocimiento e influencia en la actualidad.

Esas cinco dimensiones agrupan los siete criterios que se usaban para
seleccionar y ordenar. No se pierde ninguno:

| Criterio anterior | Dimensión visible |
|---|---|
| Influencia histórica en la música electrónica. | Influencia histórica. |
| Contribución al desarrollo de géneros musicales. | Innovación. |
| Innovación y aportaciones musicales. | Innovación. |
| Trayectoria y reconocimiento internacional. | Trayectoria (la carrera) y Relevancia (el reconocimiento). |
| Popularidad e impacto cultural. | Impacto cultural (la popularidad no decide por sí sola). |
| Influencia en la escena de clubes y festivales. | Impacto cultural. |
| Relevancia actual. | Relevancia. |

No basar el ranking exclusivamente en popularidad comercial.

Evitar nombres duplicados y verificar la escritura correcta de los nombres artísticos.

## 6. Diseño y experiencia de usuario

### Dirección visual: hoja de chart

La página se diseña como una **hoja de chart impresa** (el listado que una cabina o un sello pega en la pared, o el reverso de una funda de vinilo), no como un panel de aplicación. Eso decide todo lo demás: retícula estricta, reglas capilares de 1 px, cero radios de esquina, cero sombras y cero degradados.

#### Tintas

| Variable | Valor | Uso |
|---|---|---|
| `--ink` | `#08090C` | Fondo, negro frío (nunca `#000` puro ni gris `#111`). |
| `--ink-raised` | `#0E1014` | Celda o panel activo. |
| `--line` | `#24272E` | Reglas y bordes de la retícula. |
| `--chalk` | `#ECEDEC` | Texto principal y cifras. |
| `--ash` | `#A2A8B0` | Texto secundario. |
| `--ash-dim` | `#7B8089` | Etiquetas y metadatos (contraste 5,02:1 sobre `--ink`). |
| `--spot` | `#FF2D6F` | **Única tinta directa**: posición del ranking, marcadores `+`/`−`, barras, foco y enlaces de acción (contraste ≈ 5,5:1). |

Es una impresión a dos tintas: negro y magenta. No se añaden más colores; el orden y el tamaño hacen el resto.

#### Tipografía

- **Bahnschrift** (`--font-display`): DIN industrial, incluida en Windows, sin descargar nada. Para titulares, nombres y campos.
- **Consolas** (`--font-mono`): cifras, etiquetas, notas y metadatos. Los números usan `font-variant-numeric: tabular-nums` para que las columnas no bailen.
- Alternativas en la pila por si la fuente no existiera: `DIN Alternate`, `Franklin Gothic Medium`, `Trebuchet MS`; y `Cascadia Mono`, `ui-monospace`, `Courier New`.
- **Nunca** cargar fuentes de Google u otro CDN: la página debe funcionar sin conexión.

#### Piezas del diseño

- **Cabecera a dos columnas**: `Top 100` a gran escala y, compartiendo línea base a la derecha, la entradilla. En móvil vuelve a una columna.
- **Retícula de papel en toda la página** (`.backdrop`): capa fija, `z-index: -1`, `pointer-events: none`, líneas de 1 px al 6 % de blanco con `opacity: 0.4`. Deriva con el scroll: el patrón repite cada 72 px y `app.js` la desplaza dentro de ese ciclo (`scrollY × 0,18 % 72`), así que la deriva parece continua sin capas gigantes ni repintados. El encabezado conserva la **regla que se traza una sola vez** al cargar (`@keyframes rule-in`).
- **Movimiento**: solo la regla de entrada y la deriva de la retícula. Con `prefers-reduced-motion: reduce`, el CSS anula animaciones y transiciones y `app.js` no registra el listener de scroll: la trama queda estática.
- **Barra de trabajo fija**: filtros y contador (`#resultsInfo`) + botón de limpiar se quedan pegados arriba en escritorio (`.toolbar { position: sticky }`). En móvil vuelve al flujo normal porque ocuparía 144 px de alto.
- **Resumen numérico** como tabla de cuatro celdas separadas por reglas (truco `gap: 1px` + `background: var(--line)`), no como tarjetas.
- **Fichas**: cabecera con `posición` (magenta) y género (gris), foto cuadrada a sangre y pie con nombre y bandera. Las celdas **comparten línea** (borde derecho e inferior en cada ficha, superior e izquierdo en el contenedor): la rejilla se lee como una hoja de contactos.
- **Fotos en gris por defecto y en color al pasar el cursor por la foto** (solo en `@media (hover: hover)`). Las 100 imágenes vienen de fuentes distintas, con color y contraste desiguales; el gris las unifica y el color premia la exploración. En pantallas táctiles se ven siempre en color. El color está limitado a `.card__media` (la foto-botón), así que también señala qué zona se puede pulsar.

#### Reglas que no se deben romper

- No reintroducir degradados de texto, resplandores difusos ni sombras: eran el repertorio genérico del que se salió. El anillo de 1 px de `.flag` (`box-shadow: 0 0 0 1px`) es un borde capilar para separar banderas claras del fondo, no una sombra decorativa; no añadir otras sombras.
- No añadir una tercera tinta. Si se cambia `--spot`, comprobar el contraste sobre `--ink`.
- Mantener alineación a la izquierda y longitudes de línea por debajo de ~80 caracteres.
- **Nunca anular `outline` en un elemento interactivo.** El anillo de foco es uno solo, el global de `:focus-visible` (2 px de `--spot` con 3 px de separación). Los campos de filtro solo añaden el subrayado magenta como refuerzo.
- **Jerarquía de encabezados fija**: un `<h1>` (título), un `<h2>` por sección («El ranking en cifras», «Cómo se construyó este ranking», «El mapa global de la música electrónica», «Listado de los 100 DJs», este último oculto) y un `<h3>` por DJ. La ficha usa además un `<h2>` propio (`#detailName`) dentro del `<dialog>`, así que el documento tiene 5 `<h2>`. No volver a convertir los nombres en `<h2>`. La sección del mapa no añade ningún `<h3>`: los `<summary>` de sus paneles no son encabezados.
- **La geografía vive en `djGeo` y se indexa por nombre, nunca por posición** (`"Carl Cox": { … }`). Los nombres son únicos y estables; las posiciones podrían cambiar. Los 100 registros llevan ciudad, país, coordenadas, `precision: "city"`, `basis` (`birth` | `formation` | `activity` | `origin` en los datos actuales) y `source` (QID/PROP/QID de Wikidata, `enwiki:Artículo/campo`, `simplewiki:Artículo/campo` o `ranking:País`).
- **No hay registros sin ubicación**: los 100 DJs tienen ciudad documentada, así que no existe el panel «Sin ubicación verificada» ni la distinción visual entre ciudad y solo país. Si falta una ciudad, hay que buscarla en una fuente antes de dar el registro por cerrado; no se usa «desconocido» como sustituto.
- **El país del marcador es geográfico y puede no coincidir con el país del ranking** (`djs[].country`). Cuando difieren, el panel del mapa lo declara con una línea `Ranking: …`. No «corregir» `djGeo` para que coincida con el ranking ni al contrario.
- **La cartografía es Natural Earth 1:110 m (dominio público) y no se edita a mano**: el `d` del `<path>` se generó con la proyección Miller del proyecto y solo se sustituye completo, desde la fuente.
- **El mapa no comparte estado con los filtros del listado**: ni los lee ni los escribe, y no repinta `#djGrid` ni `#resultsInfo`. El buscador y el país del mapa son propios; no hay un botón de reinicio del mapa.
- **Ningún marcador puede cambiar de tamaño con el zoom**: las posiciones se recalculan en unidades del viewBox y el grupo `#mapMarkers` no lleva `transform`.
- **Ocultar solo con `.sr-only`**, nunca con `display: none` ni `visibility: hidden`, cuando el texto deba llegar a un lector de pantalla. La clase clipa el elemento a 1 px sin sacarlo del árbol de accesibilidad.
- **El pie debe citar todas las fuentes realmente usadas en `images/CREDITOS.md`**: hoy Wikimedia Commons (69), Deezer (30) y Discogs (1, el puesto 22). Si se cambia una foto de origen, hay que actualizar el pie; el recuento real está en `CREDITOS.md`, no en el pie.
- **Ningún control por debajo de 24 × 24 px** de área táctil (WCAG 2.5.8). `.btn-reset` lleva `min-height: 24px` por eso (medía 15 px); el botón de la foto ocupa la celda completa.
- **No aplicar `opacity` a texto**: rebaja el contraste sin tocar el color. `.footer__credits` la llevaba y caía a 3,26:1 (falla AA); ahora usa `--ash-dim` puro (5,02:1).
- **El gris de las fotos vive dentro de `@media (hover: hover)`**, nunca en la base: en táctil no existe el hover y las 100 fotos se quedarían grises para siempre.
- Un filtro cuenta como activo solo si produjo alguna palabra (`searchTokens`). Escribir solo signos (`&`, `...`) no debe mostrar «Limpiar filtros».
- **La sección de metodología no lleva cifras.** Sus cinco criterios son dimensiones cualitativas: nada de porcentajes, pesos, puntuaciones, barras ni `--spot`. No convertir los `<dt>` en `<h3>`: el conteo de encabezados es 1 `<h1>`, un `<h2>` por sección y exactamente 100 `<h3>`.
- **La sección declara «Versión 1.0 del ranking», no una fecha.** Decisión del usuario: cualquier fecha automática mentiría (`new Date()` da el reloj del visitante; `document.lastModified` cambia al copiar la carpeta y no es fiable en `file://`). La versión se sube a mano cuando cambia el listado, el orden o las reseñas. Nunca introducir una fecha generada por JS.

### Usabilidad

- El buscador debe ser fácil de localizar.
- El filtro debe permitir seleccionar los géneros disponibles.
- La búsqueda y el filtro deben funcionar simultáneamente.
- Mostrar un mensaje cuando no existan resultados.
- Ofrecer una forma rápida de limpiar todos los filtros.
- Mantener una navegación sencilla.
- Evitar elementos visuales innecesarios.

### Paneles de distribución y responsive

- Los dos paneles de distribución son `<details>` **cerrados por defecto**. El `summary` muestra un resumen útil (por ejemplo `23 géneros · Techno lidera` o `5 décadas · 99 de 100 con año`), así el dato clave se lee sin desplegar nada.
- El marcador del `summary` es tipográfico: `+` cerrado, `−` abierto, en la tinta directa. No se usan flechas.
- Del interior del panel abierto se encargan `.bars` (cuadrícula de 240 px mínimos, 1 columna por debajo de 460 px). El `summary` no se desplaza al abrir: solo se indenta el contenido.
- En pantallas de hasta 900 px la rejilla de estadísticas pasa a **2 columnas**.
- La rejilla de fichas va de 5 columnas (escritorio) a 3 (tablet) y 2 (móvil); por debajo de ~332 px cae a 1.
- Por debajo de 380 px los desplegables pasan a una sola columna: en dos, el texto de la opción se recorta.

Todos los textos visibles deben estar en español.

## 7. Organización del código

### index.html

Debe contener:

- Estructura HTML5.
- Metadatos y configuración responsive.
- Título de la página.
- Retícula de fondo decorativa (`.backdrop`, `aria-hidden="true"`, primer nodo del `body`).
- Encabezado principal.
- Introducción.
- Sección de estadísticas (tarjetas resumen y paneles de barras).
- Sección de metodología (texto estático, sin interacción).
- Contenedor del buscador.
- Selector de géneros.
- Selector de países.
- Contenedor del ranking.
- Mensaje para resultados vacíos.
- Sección del mapa global (controles propios, `svg` con el path de Natural Earth, panel lateral, leyenda, resumen y un panel plegable de países).
- Referencias a `styles.css` y `app.js`.

### styles.css

Debe contener:

- Variables CSS para colores y estilos.
- Estilos generales.
- Estilos del encabezado.
- Estilos de los controles.
- Estilos de las tarjetas o filas.
- Estilos de la sección de metodología (rejilla de criterios).
- Estilos del mapa global (lienzo, fronteras, retícula, marcadores, grupos, zoom, leyenda, panel y listas).
- Estados hover y focus.
- Media queries para móviles y tablets.

### app.js

Debe contener:

- Array principal con los 100 DJs. Campos: `position`, `name`, `genre`, `country`, `debutYear`.
- Funciones auxiliares compartidas: `countBy`, `formatPercent`, `fillSelect`, `escapeHTML`, `normalize`, `searchTokens`.
- Mapa `countryFlags` con una bandera SVG inline por país y helper `getFlag(country)`.
- Función para generar los géneros y países disponibles.
- Funciones de estadísticas: `renderStats`, `renderGenreDistribution`, `renderDecadeDistribution`.
- Función para renderizar el ranking (`createCard`, `render`).
- Ficha individual: `createDetail`, `openDetail`, `closeDetail` y el bloqueo de scroll del fondo.
- Función para buscar artistas.
- Funciones para filtrar por género y por país (combinables con el buscador).
- `resetFilters()` para devolver los controles a su estado inicial.
- Actualización del contador de resultados.
- Mensaje cuando no haya coincidencias.
- `djGeo`: ubicación documentada por nombre, con `city`, `country`, `lat`, `lon`, `precision`, `basis` y `source`; hoy los 100 registros son `precision: "city"`.
- Módulo del mapa: constantes de proyección (`MAP_W`, `MAP_H`, `MAP_RAD`, `millerY`, `MAP_YMAX`, `mapX`, `mapY`), estado (`mapK`, `mapTX`, `mapTY`, `mapSelected`, `mapQuery`, `mapCountry`, `mapFocusIdx`, `mapPanelKind`, `mapPanelClusterKey`), `renderMap`, `renderMapGraticule`, `selectMapDj`, `activateMapCluster`, `centerMapOnDj`, `clampMap`, `zoomMapAtPoint`, `mapMetrics` y los rellenos de panel y listas.
- Módulo de la retícula de fondo: `backdropLayer`, `backdropReducedMotion`, `BACKDROP_STEP` (72), `BACKDROP_RATE` (0,18), `paintBackdrop`, `scheduleBackdropPaint` y `syncBackdropMotion`.

Mantener los datos centralizados para facilitar futuras modificaciones.

Utilizar `textContent` para los valores numéricos de las estadísticas y `escapeHTML` para el texto que se inserta como HTML (tarjetas y barras). `escapeHTML` y `normalize` convierten la entrada con `String(text ?? "")`, de forma que un dato ausente no rompe el renderizado de toda la rejilla.

`escapeHTML` escapa `&`, `<`, `>` **y también `"` y `'`**: la función se usa dentro de atributos (`alt`, `aria-label`), y sin las comillas un nombre con `"` cerraría el valor.

`createCard()` genera esta estructura (no cambiar los nombres de clase sin tocar `styles.css`):

```html
<article class="card">
  <div class="card__head">
    <span class="card__rank">
      <span aria-hidden="true">042</span>                    <!-- visible -->
      <span class="sr-only">Puesto 42 de 100</span>          <!-- lector de pantalla -->
    </span>
    <span class="card__genre">Techno</span>
  </div>
  <button class="card__media" data-position="42" aria-label="Ver ficha de …">
    <img class="card__photo" …>
  </button>
  <div class="card__body">
    <h3 class="card__name">…</h3>
    <p class="card__country"><span class="flag">…</span> <span>País</span></p>
  </div>
</article>
```

La posición va en la cabecera, no sobre la foto: así la rejilla se lee como un índice de chart y el número nunca tapa el retrato.

**La foto es el disparador de la ficha.** `.card__media` es un `<button>` real que envuelve la imagen, con `data-position` y `aria-label="Ver ficha de …"`; la imagen lleva `alt=""` para que el nombre accesible sea el del botón y no se duplique. No existe ningún botón «Ver ficha»: se eliminó para dejar la tarjeta en foto, nombre y país. El botón ocupa la celda entera y conserva el área táctil mínima de 24 px con holgura (la celda mide el ancho de columna × lo mismo en alto).

El nombre de cada DJ es un **`<h3>`**, no un `<h2>`: el listado cuelga de su propio `<h2 class="sr-only">Listado de los 100 DJs</h2>` (sección `.ranking`), y así las cien fichas no compiten con «El ranking en cifras». El número visible conserva los ceros de relleno (`042`), pero el lector de pantalla recibe `Puesto 42 de 100` mediante un `.sr-only`, para que no lea «cero cuarenta y dos».

### Ficha individual (diálogo)

- Se abre con un `<dialog id="djDetail">` nativo (`showModal()`), declarado en `index.html` entre `</main>` y el pie. Sin hash routing ni cambios de URL.
- `openDetail(position)` rellena el diálogo y `closeDetail()` lo cierra; **ninguna de las dos llama a `render()`** ni toca los filtros, la rejilla o las estadísticas.
- `createDetail(dj)` es una función pura que devuelve el HTML de las filas del `<dl>`: País, Género y, solo si `Number.isInteger(debutYear)`, Inicio. Pawsa (posición 36, `debutYear: null`) no muestra fila de inicio ni ningún texto sustituto («No disponible», «—», «Sin dato» están prohibidos).
- La línea de contexto (`#detailContext`) cuenta sobre el array completo `djs`, nunca sobre los resultados filtrados.
- La foto de la ficha se ve **en color** (sin `filter`).
- **Cada ficha incluye una reseña editorial** de 21–40 palabras, guardada en `djBios` (`app.js`), un objeto indexado **por nombre** (los nombres son únicos; las posiciones no se tocan). Se inserta con `textContent` y se muestra bajo el rótulo «Reseña editorial». No es un dato verificado del ranking: es texto redactado por el proyecto y así se declara en la nota estática del pie de la ficha. Si falta una entrada en `djBios`, el bloque se oculta con `hidden` en lugar de dejar un hueco.
- Salidas: botón «Volver al ranking», Esc (nativo) y clic en el fondo. Al cerrar, el foco vuelve al botón de la foto (`.card__media[data-position]`) de la misma tarjeta; si no existe (lista refiltrada), al `#djGrid` (`tabindex="-1"`).
- Con el diálogo abierto, `html.detail-open` bloquea el desplazamiento del fondo y reserva `--scrollbar-gap` para que la página no salte.
- En móvil la ficha pasa a una columna (foto arriba) y `.detail__row` apila etiqueta y valor por debajo de 460 px.
- No se usa el atributo `hidden` en el `<dialog>`: `[hidden] { display: none !important; }` lo dejaría invisible al abrir.
- La bandera de la ficha reutiliza `.flag`, incluida su sombra de 1 px: es la **única** sombra del proyecto y la comparten las 100 tarjetas; no es una sombra nueva.
- `.detail__back` usa `--spot` al pasar el cursor, igual que `.btn-reset`: es el uso de «enlaces de acción» que ya define la sección de tintas, no una tercera tinta. La foto-botón no cambia de tinta: su señal es recuperar el color.

### Accesibilidad

- `#resultsInfo` es `aria-live="polite"` y anuncia el recuento.
- `#emptyState` tiene `role="status"` para que el mensaje de "sin resultados" se anuncie.
- `#djGrid` **no lleva `aria-label`**: un `div` sin rol expone el nombre de forma inconsistente entre lectores. La sección ya se anuncia por su `<h2 class="sr-only">Listado de los 100 DJs</h2>` (`aria-labelledby`) y el recuento llega por `#resultsInfo`. No volver a ponerlo: era un segundo mecanismo redundante para la misma información.
- El botón de reset y los `summary` de los paneles tienen `:focus-visible` visible.
- El diálogo de ficha usa `aria-labelledby="detailName"`; el botón de la foto (`.card__media`) lleva `aria-label="Ver ficha de …"` y la imagen `alt=""`, para que el nombre accesible sea la acción y no se duplique. No se añadió ningún `aria-live` nuevo.

### Detalle de CSS a recordar

`[hidden] { display: none !important; }` está declarado en `styles.css`. Es necesario porque componentes como `.controls__actions` (fila flex) o `.empty` declaran `display`, y sin esa regla el atributo `hidden` quedaría anulado y el botón de limpiar filtros se vería siempre.

### Modelo de datos

| Campo | Tipo | Notas |
|---|---|---|
| `position` | número | 1–100. Determina el nombre del archivo de la foto. |
| `name` | texto | Único en toda la lista. |
| `genre` | texto | Alimenta el filtro y la distribución por género. |
| `country` | texto | País de origen en español. Alimenta el filtro y las estadísticas. |
| `debutYear` | número o `null` | Año de inicio de carrera documentado. `null` si no hay fuente fiable. |

Reglas del modelo:

- No inventar países ni años. Si un dato no se puede verificar, se deja fuera o en `null`.
- `debutYear` alimenta la distribución por décadas; al añadir un DJ conviene rellenarlo con una fuente pública.
- Cambiar `country` o `genre` afecta automáticamente a los filtros y a las estadísticas.
- La bandera de cada país vive en `countryFlags` (`app.js`) como SVG inline. No usar emoji de bandera: Windows no los renderiza. Si se añade un país nuevo, hay que añadir su SVG; `getFlag` devuelve `""` y la tarjeta sigue mostrando el nombre sin romperse.

#### `djGeo` (mapa)

Objeto independiente de `djs`, con **100 entradas indexadas por nombre** (mismo orden y mismos nombres que el ranking).

| Campo | Tipo | Notas |
|---|---|---|
| `city` | texto | Ciudad documentada. Los 100 registros la tienen. |
| `country` | texto | País geográfico del marcador. Puede no coincidir con `djs[].country`. |
| `lat` / `lon` | número | Coordenadas en grados. Los 100 registros las tienen. |
| `precision` | texto | `city` (100). `country` y `unknown` quedan previstos, pero hoy no se usan. |
| `basis` | texto | `birth`, `formation`, `activity` u `origin` en los datos actuales; el esquema conserva `citizenship`, `ranking` y `none` para futuros casos. |
| `source` | texto | Procedencia: QID/PROP/QID de Wikidata, `enwiki:Artículo/campo`, `simplewiki:Artículo/campo` o `ranking:País`. |

Reglas de `djGeo`:

- Se indexa por **nombre**, nunca por posición.
- Los 100 registros llevan ciudad, país, coordenadas y `source`.
- `city` implica coordenadas y `precision: "city"`.
- Si falta una ciudad, **no se escribe «desconocido»**: se busca una fuente que la documente y se actualizan `city`, `country`, `lat`, `lon`, `basis` y `source`.
- Los seis registros que antes no tenían ciudad ya están documentados: Ron Hardy (Chicago, actividad), Michael Bibi (Londres, origen), Pawsa (Londres, origen), Âme (Karlsruhe, origen), Vini Vici (Afula, origen) y Ace Ventura (Zúrich, actividad; el panel muestra `Ranking: Israel`). Pawsa sigue sin `debutYear`.
- `basis` sigue siendo obligatorio en `djGeo` (integridad del dato), pero el panel ya no muestra su etiqueta: la leyenda solo distingue la ciudad documentada y la nota del mapa resume las bases. `mapBasisLabel()` se retiró.

## 8. Reglas para futuras modificaciones

Cualquier modificación debe respetar las siguientes reglas:

1. No cambiar la arquitectura original sin necesidad.
2. No introducir frameworks ni dependencias.
3. No eliminar funcionalidades existentes.
4. No modificar el ranking sin una razón clara.
5. Mantener siempre exactamente 100 DJs, salvo que el usuario solicite otro número.
6. Mantener el buscador y los filtros funcionales.
7. Conservar el diseño responsive.
8. Mantener todos los textos de la interfaz en español.
9. Evitar código innecesariamente complejo.
10. Explicar los cambios realizados de forma sencilla.
11. No modificar `djGeo` sin una fuente: si cambia una ubicación, actualizar también `precision`, `basis` y `source`.
12. Mantener el mapa como sistema independiente: no compartir estado ni funciones de repintado con el listado.
13. No editar a mano el `d` de las fronteras ni sustituirlo por tiles, imágenes o mapas externos.

Antes de modificar un archivo, revisar su contenido actual para evitar sobrescribir funcionalidades existentes.

## 9. Validación antes de entregar cambios

Comprobar siempre:

- [ ] Existen los tres archivos principales.
- [ ] La página abre mediante doble clic.
- [ ] No necesita servidor ni instalación.
- [ ] Hay exactamente 100 DJs.
- [ ] No existen nombres duplicados.
- [ ] Las posiciones van del 1 al 100.
- [ ] Cada DJ tiene un género musical.
- [ ] Cada DJ tiene un país de origen.
- [ ] El buscador funciona correctamente.
- [ ] El buscador encuentra nombres aunque se omita el `&` o la puntuación (`Chase Status`, `Aly Fila`).
- [ ] El filtro por género funciona.
- [ ] El filtro por país funciona.
- [ ] Búsqueda, género y país funcionan conjuntamente.
- [ ] El botón "Limpiar filtros" solo se ve con filtros activos y restablece los tres controles.
- [ ] Las estadísticas coinciden con los datos reales.
- [ ] Los porcentajes y los anchos de las barras son correctos.
- [ ] La distribución por décadas indica cuántos DJs tienen año documentado.
- [ ] La ficha individual abre y cierra (botón, Esc y fondo) sin repintar la rejilla ni alterar los filtros.
- [ ] Pawsa (36) no muestra fila de inicio ni textos sustitutos.
- [ ] Se muestra un mensaje cuando no hay resultados.
- [ ] Sin resultados, la rejilla vacía no deja reglas sueltas (`.grid:empty`).
- [ ] En escritorio, filtros y contador quedan fijos arriba al desplazarse.
- [ ] El diseño funciona en móviles.
- [ ] No hay desbordamiento horizontal entre 320 px y 1920 px.
- [ ] Solo hay una tinta de acento (`--spot`) y ningún degradado de texto, sombra o resplandor.
- [ ] Los campos de filtro muestran anillo de foco visible al tabular (2 px `--spot`), no solo el subrayado.
- [ ] En una pantalla táctil (`hover: none`) las fotos de la rejilla se ven en color.
- [ ] «Limpiar filtros» no aparece al escribir solo signos (`&`, `...`).
- [ ] La jerarquía de encabezados es 1 `<h1>`, un `<h2>` por sección y 100 `<h3>` (un `<h3>` por DJ).
- [ ] El puesto de una ficha se anuncia como «Puesto N de 100», no como «cero cero uno».
- [ ] `escapeHTML` escapa también comillas dobles y simples (se usa dentro de atributos).
- [ ] Ningún texto utilizable se oculta con otra cosa que no sea `.sr-only`.
- [ ] El pie cita todas las fuentes de `images/CREDITOS.md` (Wikimedia Commons, Deezer y Discogs).
- [ ] `#djGrid` no tiene `aria-label` (la sección ya se nombra por su `<h2>` y el recuento va por `aria-live`).
- [ ] El comentario de `countryFlags` dice el tamaño real de las banderas (18 × 12 px; 22 × 15 px en la ficha).
- [ ] Ningún control baja de 24 px de alto (`.btn-reset`); el botón de la foto ocupa la celda.
- [ ] Cada tarjeta tiene un único disparador de ficha: el botón de la foto (`.card__media`), sin botón «Ver ficha».
- [ ] Las 100 fichas muestran su reseña editorial y ninguna repite texto de otra.
- [ ] Al cerrar la ficha el foco vuelve a la foto de la tarjeta de origen.
- [ ] El texto del pie llega a 4,5:1 sobre `--ink` (sin `opacity`).
- [ ] Las fuentes son del sistema (Bahnschrift / Consolas); no se descarga ninguna.
- [ ] No hay errores JavaScript.
- [ ] No se han añadido dependencias externas.
- [ ] `MEMORY.md` está actualizado al final de la tarea.
- [ ] `AGENTS.md` refleja las invariantes, rutas o reglas que cambiaron en la tarea.
- [ ] `constitution.md` se actualizó solo si cambió el alcance o los principios; si no, sigue intacto.
- [ ] Si no hubo cambios netos, los tres documentos quedaron sin tocar.
- [ ] La sección «Cómo se construyó este ranking» muestra cinco criterios, sin porcentajes, pesos ni puntuaciones.
- [ ] La sección no añade `<h3>`: siguen siendo 100.
- [ ] La sección no usa `--spot`, barras ni elementos interactivos.
- [ ] La sección declara una versión manual, no una fecha generada por JS.
- [ ] El mapa dibuja marcadores y grupos (`0 < .map__marker + .map__cluster ≤ 100`) sin errores de consola.
- [ ] `djGeo` tiene 100 entradas con los mismos nombres que `djs`; todas llevan ciudad, país, coordenadas, `source` y `precision: "city"`.
- [ ] El mapa no repinta el listado: `#djGrid`, `#resultsInfo` y los filtros superiores no cambian al usarlo.
- [ ] Rueda, arrastre y botones + / − cambian el `transform` de `#mapWorld` y la traslación queda acotada.
- [ ] En los límites de zoom y con Ctrl, la rueda no se intercepta; en `k = 1` el mapa no captura el arrastre y conserva `touch-action: pan-y pinch-zoom`.
- [ ] Marcadores y grupos tienen un objetivo táctil de al menos 24 × 24 px y el número de los grupos se lee a 10 px reales, también en móvil.
- [ ] Clic en marcador rellena el panel y muestra el anillo; clic en grupo lista sus DJs y conserva el foco en el mapa.
- [ ] El panel del mapa no queda obsoleto: al cambiar zoom o filtros, un grupo que ya no existe vuelve al estado por defecto; un DJ filtrado fuera no se puede seleccionar.
- [ ] Al elegir un DJ de un grupo, el foco va a `.map__panel-open`, no a `<body>`; al escribir en el buscador del mapa, el foco sigue en el campo.
- [ ] El rótulo de un grupo no nombra un lugar salvo que ese lugar sea común a todo el grupo; si no, dice «N DJs agrupados en esta zona» (en `aria-label`, `kicker` y `#mapLive`).
- [ ] «Abrir ficha» abre el diálogo y, al cerrar, el foco vuelve al marcador.
- [ ] El buscador del mapa deja un solo marcador con «chase status» y lo centra con `scale(4)`.
- [ ] Sigue habiendo 1 `<h1>`, 5 `<h2>` y 100 `<h3>`: el mapa no añade encabezados.
- [ ] El mapa no introduce radios, sombras, degradados ni una segunda tinta de acento.
- [ ] La retícula de fondo se desplaza solo dentro del ciclo de 72 px (`transform` entre 0 y −72 px) y no repinta la página.
- [ ] Con `prefers-reduced-motion: reduce`, `.backdrop` no tiene `transform` y el scroll no lo escribe.

## 10. Posibles mejoras futuras

Estas funcionalidades son ideas para futuras versiones y no deben implementarse sin autorización:

- Biografía documentada con fuentes de cada artista, para sustituir la reseña editorial actual (que no está verificada).
- Discografía destacada.
- Mejores canciones o producciones.
- Enlaces a Spotify, SoundCloud o YouTube.
- Sistema de favoritos.
- Ranking interactivo mediante votaciones.
- Modo claro y oscuro.
- Completar `debutYear` de los DJs que aún no lo tienen.

Pendientes descartados por ahora (paquete C, no implementado):

- Mostrar el número de resultados por opción en los desplegables y deshabilitar las combinaciones imposibles.
- Debounce de ~120 ms en el buscador y caché de nombres normalizados. (El repintado del mapa durante el arrastre ya está agrupado por `requestAnimationFrame`.)

## 11. Principios generales del proyecto

El objetivo principal es construir una web sencilla, visualmente atractiva y funcional.

Priorizar siempre:

- Simplicidad antes que complejidad.
- Código limpio antes que soluciones sofisticadas.
- Experiencia de usuario antes que efectos visuales.
- Contenido de calidad antes que cantidad de funcionalidades.
- Compatibilidad antes que dependencias externas.

**Instrucción para futuras sesiones:** Antes de realizar cambios importantes, revisar este archivo `MEMORY.md`, `AGENTS.md` y `constitution.md`, junto con los archivos actuales del proyecto. Mantener las decisiones existentes y solicitar confirmación cuando una modificación implique cambiar el alcance original.
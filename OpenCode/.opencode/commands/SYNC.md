---
description: Sincroniza MEMORY.md, AGENTS.md y constitution.md al terminar una tarea, sin reescribir lo que no cambió.
---

# SYNC — Sincronización documental

Ejecuta este procedimiento al terminar una tarea que haya modificado la aplicación o sus herramientas.

## 1. Reúne solo cambios reales

- Revisa los archivos que se modificaron en la tarea y el resultado validado.
- Distingue lo comprobado de lo supuesto. No inventes datos, rutas ni cifras.
- Si no hubo cambios netos, no edites ningún documento y responde `Documentación sin cambios`.

## 2. Actualiza `MEMORY.md` primero

- Corrige cifras, rutas o comportamientos que hayan quedado obsoletos.
- Añade solo la información nueva que sea estable y verificable.
- Conserva el estilo, la estructura y las decisiones existentes; no reescribas secciones que sigan siendo correctas.
- Actualiza la marca manual de revisión si cambió el contenido relevante.

## 3. Revisa `AGENTS.md`

Actualízalo solo si cambió alguna de estas cosas:

- Una invariante del proyecto.
- Un hook, archivo, ruta o ID usado por el agente.
- Una regla de diseño, accesibilidad o datos.
- El flujo de trabajo o la automatización documental.

## 4. Revisa `constitution.md`

Actualízalo solo si cambió el alcance, los principios o las restricciones duraderas. Si lo tocas, sube su versión manual y actualiza la fecha de revisión.

## 5. Cierra

- No modifiques `index.html`, `styles.css` ni `app.js` durante este paso.
- No añadas fechas generadas por JavaScript ni por el reloj del sistema.
- Resume qué documentos cambiaste y por qué; si no cambió ninguno, dilo explícitamente.

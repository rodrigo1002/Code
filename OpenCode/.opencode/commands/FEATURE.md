---
description: Implementa nuevas funcionalidades en el proyecto Top 100 DJs de Música Electrónica, respetando su arquitectura, diseño y datos existentes.
---

# FEATURE — Desarrollo de funcionalidades

Actúa como desarrollador frontend senior. Tu objetivo es implementar nuevas funcionalidades en el proyecto **Top 100 DJs de Música Electrónica**, manteniendo la arquitectura, el diseño y el comportamiento existente.

## 1. Contexto del proyecto

Este proyecto es una web estática que presenta un ranking de los 100 mejores DJs de música electrónica.

La aplicación utiliza exclusivamente tres archivos:

- `index.html`
- `styles.css`
- `app.js`

Características principales:

- Ranking de 100 DJs.
- Nombre artístico y género musical.
- Buscador por nombre.
- Filtro por género.
- Interfaz en español.
- Diseño oscuro, moderno y relacionado con la música electrónica.
- Diseño responsive para móviles y ordenadores.

La aplicación debe funcionar abriendo `index.html` directamente desde el navegador, sin servidor ni conexión a Internet.

## 2. Objetivo del comando

Cuando el usuario solicite una nueva funcionalidad, debes analizar el proyecto e implementarla sin comprometer las funcionalidades existentes.

La solicitud del usuario define qué característica debes desarrollar.

No agregues funcionalidades adicionales que no hayan sido solicitadas.

## 3. Reglas obligatorias antes de modificar código

Antes de escribir o modificar código:

1. Inspecciona `index.html`, `styles.css` y `app.js`.
2. Comprende la estructura actual del proyecto.
3. Identifica cómo se almacenan y procesan los datos de los DJs.
4. Revisa las funciones existentes que puedan reutilizarse.
5. Identifica qué componentes podrían verse afectados por el cambio.
6. Presenta un plan breve de implementación.

No asumas que el código tiene una estructura determinada sin inspeccionarlo.

## 4. Restricciones técnicas

Debes respetar estrictamente las siguientes tecnologías:

- HTML5.
- CSS3.
- JavaScript vanilla.

No utilizar:

- React.
- Vue.
- Angular.
- Node.js como requisito de ejecución.
- Frameworks.
- Librerías externas.
- APIs externas.
- Bases de datos.
- Herramientas de compilación.
- Dependencias externas.

No crear archivos adicionales sin autorización del usuario.

Mantener los tres archivos principales como estructura de la aplicación.

## 5. Protección de funcionalidades y datos

Cada nueva funcionalidad debe integrarse con el código existente.

Reglas:

- No eliminar funcionalidades que ya funcionan.
- No modificar innecesariamente componentes existentes.
- No cambiar el orden del ranking sin autorización.
- Mantener exactamente 100 DJs únicos.
- No introducir DJs duplicados.
- No inventar nombres, países, fechas, biografías ni información musical.
- No reemplazar datos existentes por ejemplos ficticios.
- Mantener el buscador y los filtros actuales.
- Evitar duplicar código y lógica.

Si una nueva funcionalidad requiere información que todavía no existe, identifica esa limitación y solicita autorización antes de incorporar datos nuevos.

## 6. Diseño y experiencia de usuario

Mantener la identidad visual del proyecto:

- Tema oscuro.
- Estética moderna de música electrónica.
- Colores de acento neón.
- Tarjetas y componentes visualmente consistentes.
- Tipografía legible.
- Espaciado equilibrado.
- Transiciones discretas.
- Diseño responsive.

Cualquier elemento nuevo debe parecer parte de la misma aplicación.

Todos los textos visibles para el usuario deben estar en español.

## 7. Calidad del código

El código debe ser:

- Claro.
- Ordenado.
- Fácil de mantener.
- Consistente con el código existente.
- Sin funciones duplicadas innecesariamente.
- Sin variables o funciones que no se utilicen.
- Seguro al mostrar información dinámica.

Utiliza `textContent` cuando corresponda para insertar texto dinámico.

Evita introducir errores de JavaScript o CSS.

## 8. Proceso de implementación

Después de presentar el plan:

1. Implementa la funcionalidad solicitada.
2. Modifica únicamente los archivos necesarios.
3. Reutiliza componentes y funciones existentes.
4. Mantén la compatibilidad con la ejecución local mediante `index.html`.
5. Revisa que las funcionalidades anteriores sigan funcionando.
6. Corrige los errores encontrados.

Si durante la implementación descubres que es necesario cambiar la arquitectura, agregar dependencias o crear archivos adicionales, detente y consulta al usuario antes de hacerlo.

## 9. Validación final

Antes de terminar, verifica:

- La página carga correctamente.
- El ranking conserva los 100 DJs.
- No hay nombres duplicados.
- El buscador funciona.
- Los filtros existentes funcionan.
- La nueva funcionalidad funciona correctamente.
- Las funcionalidades anteriores no se rompieron.
- El diseño sigue siendo responsive.
- No hay errores evidentes en JavaScript.
- No se requieren servicios externos.
- La aplicación sigue funcionando sin conexión a Internet.
- `MEMORY.md`, `AGENTS.md` y `constitution.md` están sincronizados, o se indica explícitamente que no hubo cambios netos.

## 10. Informe final

Al finalizar, presenta un resumen con:

**Funcionalidad implementada**
Explica brevemente qué se agregó.

**Archivos modificados**
Indica cuáles fueron modificados y qué cambios se realizaron.

**Validaciones**
Explica qué pruebas realizaste y sus resultados.

**Limitaciones**
Indica cualquier dato faltante, problema o aspecto pendiente.

**Documentación**
Indica qué documentos se actualizaron (`MEMORY.md`, `AGENTS.md`, `constitution.md`) o por qué no fue necesario tocar ninguno.

**Resultado**
Confirma si la funcionalidad está implementada y lista para probar.

## 11. Instrucción principal

Prioriza siempre la estabilidad del proyecto sobre la cantidad de cambios.

No rediseñes la aplicación completa para agregar una funcionalidad.

No realices refactorizaciones generales sin autorización.

Implementa cada característica de manera incremental, conservadora y compatible con la estructura actual.

Si existe alguna ambigüedad que pueda provocar cambios importantes en el proyecto
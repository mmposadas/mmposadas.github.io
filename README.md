# Portfolio de Millán Posadas

Este repositorio contiene la página web personal de Millán Posadas, enfocada en **investigación en Data Science y visión artificial**. La página incluye una **landing page** y una sección de **conclusiones** sobre proyectos personales.  

El proyecto está desarrollado usando **HTML, Tailwind CSS, y JavaScript puro** para generar dinámicamente los artículos desde un JSON.

---

## Estructura del proyecto

El directorio principal del proyecto es **`/docs`**. A continuación se explica cada subdirectorio y su función:

- **/docs**
  - **index.html** → Landing page principal  
  - **/articulos** → Templates HTML de la lista de artículos y los artículos individuales  
    - **index.html** → Lista de artículos  
    - **articulo.html** → Template para mostrar un artículo individual  
  - **/components** → Componentes reutilizables de la UI  
    - **navbar.html** → Barra de navegación  
    - **footer.html** → Footer  
    - **/backgrounds** → Fondos animados o personalizados  
      - **hero_bg.html** → Fondo de la landing  
  - **/css** → Estilos personalizados  
  - **/data** → Datos y contenido dinámico  
    - **articulos.json** → Lista de artículos (id, título, fecha, lugar, preview, descripción, colaboración, etiquetas)  
    - **/md** → Contenido de los artículos en formato Markdown  
  - **/js** → Scripts de la web  


---

## Flujo de generación de artículos

1. Los artículos se definen en **`/docs/data/articulos.json`**. Cada objeto de artículo contiene:  

```json
{
  "id": "articulo1",
  "titulo": "Mi primer proyecto en VR",
  "fecha": "2024-07-15",
  "lugar": "Meta Oculus",
  "preview": "Cómo desarrollé un simulador en Oculus Quest.",
  "descripcion": "articulo1.md",
  "colaboracion": "Con equipo VR",
  "etiquetas": ["VR", "Simulación"]
}

```
2. **`articulos.js`** lee este JSON y genera dinámicamente las cards en **`/docs/articulos/index.html`**.

- Campos opcionales (fecha, lugar, colaboracion) solo se muestran si existen.

- Cada card es un enlace a **`articulo.html?id=<id>`**.

3. **`articulo.html`** lee el parámetro **`id`** de la URL y carga el contenido del Markdown correspondiente desde **`/docs/data/md`**.

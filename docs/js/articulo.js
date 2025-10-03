document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = parseInt(params.get("id")); // ej: articulo.html?id=2

  const contenedor = document.getElementById("articulo-contenido");
  const recomendaciones = document.getElementById("articulo-recomendaciones");

  fetch("/data/articulos.json")
    .then(res => res.json())
    .then(data => {
      const articulo = data.find(a => a.id === id);
      if (!articulo) {
        contenedor.innerHTML = "<p class='text-red-400'>Artículo no encontrado.</p>";
        return;
      }

      // Cabecera del artículo
      contenedor.innerHTML = `
        <h1 class="text-3xl font-bold mb-4">${articulo.titulo}</h1>
        <p class="text-gray-400 text-sm mb-6">
          ${articulo.fecha ? articulo.fecha : ""} 
          ${articulo.fecha && articulo.lugar ? " · " : ""} 
          ${articulo.lugar ? articulo.lugar : ""}
        </p>
        <div id="contenido-md" class="prose prose-invert max-w-none"></div>
        ${articulo.colaboracion ? `<p class="text-sm mt-6 text-gray-500">Colaboración: ${articulo.colaboracion}</p>` : ""}
        <div class="flex flex-wrap gap-2 mt-4">
          ${articulo.etiquetas ? articulo.etiquetas.map(tag => `<span class="px-2 py-1 text-xs bg-blue-600 rounded-lg">${tag}</span>`).join("") : ""}
        </div>
      `;

      // Cargar el contenido Markdown
      fetch(articulo.descripcion)
        .then(res => res.text())
        .then(md => {
          document.getElementById("contenido-md").innerHTML = marked.parse(md);
        })
        .catch(err => {
          console.error("Error cargando markdown:", err);
          document.getElementById("contenido-md").innerHTML = "<p class='text-red-400'>Error al cargar el contenido.</p>";
        });

      // Recomendar artículo anterior y siguiente
      const index = data.findIndex(a => a.id === id);
      let prev = index > 0 ? data[index - 1] : null;
      let next = index < data.length - 1 ? data[index + 1] : null;

      recomendaciones.innerHTML = `
        ${prev ? `<a href="articulo.html?id=${prev.id}" class="text-blue-400 hover:underline">← ${prev.titulo}</a>` : "<span></span>"}
        ${next ? `<a href="articulo.html?id=${next.id}" class="text-blue-400 hover:underline">${next.titulo} →</a>` : "<span></span>"}
      `;
    })
    .catch(err => {
      console.error("Error cargando artículo:", err);
      contenedor.innerHTML = "<p class='text-red-400'>Error al cargar el artículo.</p>";
    });
});

document.addEventListener("DOMContentLoaded", () => {
  const contenedor = document.getElementById("articulos-container");

  fetch("/data/articulos.json")
    .then(res => res.json())
    .then(data => {
      data.forEach(articulo => {
        // Crear card
        const card = document.createElement("a");
        card.href = `articulo.html?id=${articulo.id}`;
        card.className = "block bg-gray-800 p-6 rounded-xl hover:bg-gray-700 transition";

        // Fecha y lugar solo si existen
        let meta = "";
        if (articulo.fecha || articulo.lugar) {
          meta = `<p class="text-gray-400 text-sm mb-2">
                    ${articulo.fecha ? articulo.fecha : ""}
                    ${articulo.fecha && articulo.lugar ? " · " : ""}
                    ${articulo.lugar ? articulo.lugar : ""}
                  </p>`;
        }

        // Colaboración solo si existe
        let colaboracion = "";
        if (articulo.colaboracion) {
          colaboracion = `<p class="text-xs text-gray-500">Colaboración: ${articulo.colaboracion}</p>`;
        }

        // Etiquetas solo si existen
        let tags = "";
        if (articulo.etiquetas && articulo.etiquetas.length > 0) {
          tags = `<div class="flex flex-wrap gap-2 mt-3">
                    ${articulo.etiquetas.map(tag => 
                      `<span class="px-2 py-1 text-xs bg-blue-600 rounded-lg">${tag}</span>`
                    ).join("")}
                  </div>`;
        }

        card.innerHTML = `
          <h3 class="text-xl font-semibold mb-2">${articulo.titulo}</h3>
          ${meta}
          <p class="text-gray-300 text-sm mb-4">${articulo.preview}</p>
          ${colaboracion}
          ${tags}
        `;

        contenedor.appendChild(card);
      });
    })
    .catch(err => console.error("Error cargando artículos:", err));
});

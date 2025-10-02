// Función para cargar un HTML externo en un contenedor
function loadHTML(file, containerId) {
  fetch(file)
    .then(response => response.text())
    .then(html => {
      document.getElementById(containerId).innerHTML = html;
    })
    .catch(err => console.error(`Error cargando ${file}: `, err));
}

// Cargar navbar y footer
loadHTML('/componentes/navbar.html', 'navbar');
loadHTML('/componentes/footer.html', 'footer');

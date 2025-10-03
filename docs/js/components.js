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
loadHTML('/components/navbar.html', 'navbar');
loadHTML('/components/footer.html', 'footer');

function loadBackground(file) {
  fetch(`/components/backgrounds/${file}`)
    .then(res => res.text())
    .then(html => document.getElementById('background').innerHTML = html);
}

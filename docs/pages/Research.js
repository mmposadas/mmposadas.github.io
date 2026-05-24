import { ProjectCard } from './../components/ProjectCard.js';

export function ResearchPage() {
    // Retornamos un contenedor temporal mientras se monta el registro de proyectos
    return `
        <div id="dynamic-research-root">
            <section style="max-width: 1100px; margin: 0 auto; padding: 40px 24px;">
                <p style="font-family: var(--font-mono); font-size: 13px; color: var(--text-secondary);">
                    Sincronizando índice del logbook...
                </p>
            </section>
        </div>
    `;
}

// Toda la lógica de carga y filtrado se ejecuta de forma segura aquí
ResearchPage.afterRender = async () => {
    const rootContainer = document.getElementById("dynamic-research-root");
    if (!rootContainer) return;

    try {
        // 1. Calculamos la ruta base exacta del entorno (Local o GitHub Pages)
        const path = window.location.pathname;
        const basePathName = path.includes('/docs/') ? path.substring(0, path.indexOf('/docs/') + 6) : '/';
        
        // 2. Apuntamos de forma absoluta a la ubicación real de tu index.js (dentro de js/projects/)
        // Añadimos el destructor de caché (?v=...) para obligar a Live Server a leer el disco
        const indexUrl = `${window.location.origin}${basePathName}js/projects/index.js?v=${new Date().getTime()}`;
        
        // 3. Importamos el registro dinámicamente
        const module = await import(indexUrl);
        const projectsRegistry = module.projectsRegistry;

        // 4. Inyectamos la interfaz real con las tarjetas generadas
        rootContainer.innerHTML = `
            <section class="research-page-layout" style="max-width: 1100px; margin: 0 auto; padding: 40px 24px;">
                <header class="page-hero-header" style="margin-bottom: 32px;">
                    <span class="hero-subtitle" style="font-family: var(--font-mono); font-size: 13px; color: var(--google-blue); font-weight: 500; display: block; margin-bottom: 8px;">LOGBOOK DE PROYECTOS</span>
                    <h1 class="page-title" style="font-size: 28px; font-weight: 400; margin-bottom: 8px;">Catálogo de Modelos y Artículos</h1>
                    <p class="page-description" style="color: var(--text-secondary); font-size: 15px;">Exploración interactiva dividida por frentes técnicos. Filtra entre flujos de producción de datos o mis notas de estudio cuántico.</p>
                    
                    <div class="hero-chips" style="margin-top: 20px; display: flex; gap: 8px; flex-wrap: wrap;">
                        <span class="chip active" data-target="all">Todo</span>
                        <span class="chip" data-target="document-extraction">Extracción Documental</span>
                        <span class="chip" data-target="computer-vision">Visión Artificial</span>
                        <span class="chip" data-target="quantum-energy">Quantum ML & Energía</span>
                    </div>
                </header>
                
                <div class="main-content-wrapper">
                    <div class="projects-grid" id="projects-grid-root" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 24px;">
                        ${projectsRegistry.map(proyecto => ProjectCard(proyecto)).join('')}
                    </div>
                </div>
            </section>
        `;

        // 5. Activamos los listeners de los chips de filtrado
        const chips = rootContainer.querySelectorAll('.chip');
        const cards = rootContainer.querySelectorAll('.project-card');

        chips.forEach(chip => {
            chip.addEventListener('click', () => {
                chips.forEach(c => c.classList.remove('active'));
                chip.classList.add('active');

                const target = chip.getAttribute('data-target');

                cards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    if (target === 'all' || category === target) {
                        card.style.display = 'flex';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });

    } catch (error) {
        console.error("Error al mapear el índice de proyectos dinámico:", error);
        rootContainer.innerHTML = `
            <p style="padding: 40px; color: #d93025; font-family: var(--font-mono); font-size: 14px;">
                [ERROR_MIME_FALLBACK]: No se pudo enlazar el archivo js/projects/index.js de forma estática.
            </p>
        `;
    }
};
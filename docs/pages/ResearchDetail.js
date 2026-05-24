// Mapeo dinámico automatizado de Slugs a Archivos Físicos de Lógica
const projectModulesMap = {
    "quantum-grid-optimization": "quantum-grid.js",
    "heterogeneous-document-extraction": "document-parsing.js",
    "vision-transformers-alignment": "document-parsing.js",
    "quantum-kernel-energy": "quantum-grid.js"
};

export function ResearchDetailPage(slug) {
    // Retornamos el contenedor temporal con el slug en un data-attribute
    return `<div id="dynamic-detail-target" data-slug="${slug}"></div>`;
}

ResearchDetailPage.afterRender = async (slug) => {
    const container = document.getElementById("dynamic-detail-target");
    if (!container) return;

    const fileName = projectModulesMap[slug] || "quantum-grid.js";
    
    try {
        // 1. Calculamos la ruta base exacta del entorno (Local o GitHub Pages)
        const path = window.location.pathname;
        const basePathName = path.includes('/docs/') ? path.substring(0, path.indexOf('/docs/') + 6) : '/';
        const rootUrl = `${window.location.origin}${basePathName}`;
        const version = `?v=${new Date().getTime()}`;

        // 2. Importamos de forma ABSOLUTA el índice (index.js) para extraer metadatos si hiciera falta
        const indexModule = await import(`${rootUrl}js/projects/index.js${version}`);
        const projectsRegistry = indexModule.projectsRegistry;
        
        // Buscamos los metadatos específicos de este proyecto en el registro maestro
        const projectMeta = projectsRegistry.find(p => p.slug === slug);

        // 3. Importamos el módulo de lógica e interactividad visual del proyecto cuantitativo
        const projectModuleUrl = `${rootUrl}js/projects/${fileName}${version}`;
        const module = await import(projectModuleUrl);
        
        // Detectamos cuál exportación contiene los datos funcionales
        const projectData = module.quantumGridProject || module.documentParsingProject;

        const getFileIcon = (type) => {
            const icons = { pdf: "📄 [DOCUMENTO]", data: "📊 [DATASET]", code: "💻 [NOTEBOOK]" };
            return icons[type] || "📁 [ARCHIVO]";
        };

        // 4. Inyectamos la interfaz combinando metadatos del índice y la lógica del script
        container.innerHTML = `
            <section class="research-detail-layout" style="max-width: 800px; margin: 0 auto; padding: 60px 24px;">
                <a href="#/research" style="color: var(--google-blue); text-decoration: none; font-size: 14px; font-weight: 500;"><- Volver a los artículos</a>
                
                <header style="margin-top: 24px; margin-bottom: 32px;">
                    <h1 style="font-size: 32px; font-weight: 400; line-height: 1.3; color: var(--text-primary);">${projectMeta ? projectMeta.title : projectData.title}</h1>
                    <p style="color: var(--text-secondary); font-size: 16px;">${projectData.subtitle}</p>
                </header>

                <article class="math-render-zone" style="margin-bottom: 40px; font-size: 15px; color: var(--text-primary); line-height: 1.7;">
                    <h3 style="margin-bottom: 12px; font-weight: 500; color: var(--google-blue);">Análisis de la Arquitectura</h3>
                    <div>${projectData.abstract}</div>
                </article>

                <div style="margin-bottom: 40px;">
                    <div style="border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; background: #fff;">
                        <canvas id="project-canvas-runtime" width="600" height="220" style="width: 100%; height: auto; display: block;"></canvas>
                    </div>
                </div>

                <div style="border-top: 1px solid var(--border-color); padding-top: 32px;">
                    <h3 style="margin-bottom: 16px; font-weight: 500;">Recursos del Repositorio</h3>
                    <div style="display: flex; flex-direction: column; gap: 12px;">
                        ${projectData.downloads.map(file => `
                            <div style="display: flex; justify-content: space-between; align-items: center; padding: 12px 16px; border: 1px solid var(--border-color); border-radius: 6px; background: var(--bg-alt);">
                                <span style="font-size: 14px; font-weight: 500;">
                                    <span style="font-family: var(--font-mono); font-size: 11px; margin-right: 8px; color: var(--google-blue);">${getFileIcon(file.type)}</span>
                                    ${file.name}
                                </span>
                                <a href="${file.url}" target="_blank" rel="noopener noreferrer" download class="btn btn-secondary" style="padding: 4px 12px; font-size: 12px;">Descargar</a>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </section>
        `;

        // 5. Renderizado asíncrono de ecuaciones matemáticas de KaTeX
        if (window.renderMathInElement) {
            window.renderMathInElement(container, {
                delimiters: [
                    {left: '$$', right: '$$', display: true},
                    {left: '$', right: '$', display: false}
                ],
                throwOnError: false
            });
        }

        // 6. Encendemos el motor visual gráfico del proyecto específico
        if (projectData.renderVisuals) {
            window.currentChartCleanup = projectData.renderVisuals("project-canvas-runtime");
        }

    } catch (err) {
        console.error("Error crítico al montar el módulo detallado:", err);
        container.innerHTML = `
            <p style="padding: 40px; color: #d93025; font-family: var(--font-mono); font-size: 14px;">
                [ERROR_MIME_DETAIL]: No se pudo enlazar el submódulo de visualización cuántica de forma absoluta.
            </p>
        `;
    }
};
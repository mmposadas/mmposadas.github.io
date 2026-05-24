/**
 * Tarjeta de Proyecto Avanzada Estilo Google
 * @param {Object} project - Datos del proyecto
 */
export function ProjectCard(project) {
    return `
        <div class="project-card" data-category="${project.category}">
            <div class="card-header">
                <span class="card-tag">${project.tag}</span>
                <span class="card-date">${project.year}</span>
            </div>
            <h3 class="card-title">${project.title}</h3>
            <p class="card-abstract">${project.abstract}</p>
            
            <div class="card-tech-stack">
                ${project.technologies.map(tech => `<span class="tech-badge">${tech}</span>`).join('')}
            </div>
            
            <div class="card-actions" style="margin-top: auto; display: flex; flex-wrap: wrap; gap: 8px;">
                <a href="#/research/${project.slug}" class="btn btn-primary">Ver Análisis Completo</a>
                
                ${project.paperUrl ? `<a href="${project.paperUrl}" target="_blank" rel="noopener" class="btn btn-secondary">arXiv</a>` : ''}
                ${project.notebookUrl ? `<a href="${project.notebookUrl}" target="_blank" rel="noopener" class="btn btn-secondary">Notebook</a>` : ''}
            </div>
        </div>
    `;
}
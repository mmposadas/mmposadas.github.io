import { Navbar } from './../components/Navbar.js';
import { Footer } from './../components/Footer.js';

// Detectamos dinámicamente la base de la URL (así funciona en local con carpetas y en GitHub Pages)
const getBasePath = () => {
    const path = window.location.pathname;
    // Si estás usando subcarpetas de proyectos, extrae la ruta hasta el index.html
    if (path.includes('/docs/')) {
        return path.substring(0, path.indexOf('/docs/') + 6);
    }
    return '/';
};

export class Router {
    constructor(anchorElement) {
        this.anchor = anchorElement;
        this.basePath = window.location.origin + getBasePath();
        this.init();
    }

    init() {
        window.addEventListener('hashchange', () => this.render());
        window.addEventListener('load', () => this.render());
    }

    async render() {
        // Limpieza de animaciones de gráficos activos
        if (window.currentChartCleanup) {
            window.currentChartCleanup();
            window.currentChartCleanup = null;
        }

        const hash = window.location.hash || '#/';
        let PageModule;
        let routeParam = null;

        try {
            // Añadimos un query param dinámico (?v=...) para destruir la caché corrupta de Live Server
            const version = `?v=${new Date().getTime()}`;

            if (hash.startsWith('#/research/')) {
                routeParam = hash.replace('#/research/', '');
                PageModule = await import(`${this.basePath}pages/ResearchDetail.js${version}`);
            } else if (hash === '#/research') {
                PageModule = await import(`${this.basePath}pages/Research.js${version}`);
            } else if (hash === '#/contact') {
                PageModule = await import(`${this.basePath}pages/Contact.js${version}`);
            } else {
                PageModule = await import(`${this.basePath}pages/About.js${version}`);
            }

            const PageComponent = PageModule.ResearchDetailPage || PageModule.ResearchPage || PageModule.AboutPage || PageModule.ContactPage;

            this.anchor.innerHTML = `
                ${Navbar(hash)}
                <main class="router-view-container">
                    ${PageComponent(routeParam)}
                </main>
                ${Footer()}
            `;

            if (window.renderMathInElement) {
                window.renderMathInElement(this.anchor, {
                    delimiters: [
                        {left: '$$', right: '$$', display: true},
                        {left: '$', right: '$', display: false}
                    ],
                    throwOnError : false
                });
            }

            const hookComponent = PageModule.ResearchDetailPage || PageModule.ResearchPage || PageModule.AboutPage || PageModule.ContactPage;
            if (hookComponent.afterRender) {
                hookComponent.afterRender(routeParam);
            }

        } catch (error) {
            console.error("Error crítico en el enrutador adaptativo:", error);
            // ... (el resto de tu bloque catch idéntico)
            this.anchor.innerHTML = `
                ${Navbar(hash)}
                <section style="max-width: 600px; margin: 40px auto; text-align: center; padding: 24px;">
                    <h2 style="color: #d93025;">Error de Sincronización</h2>
                    <p style="color: var(--text-secondary); margin-bottom: 16px;">No se pudo conectar de forma segura con el módulo experimental.</p>
                    <button onclick="window.location.reload()" class="btn btn-primary">Forzar Recarga del Sistema</button>
                </section>
                ${Footer()}
            `;
        }
    }
}
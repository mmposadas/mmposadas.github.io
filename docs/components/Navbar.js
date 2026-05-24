/**
 * Componente Navbar Estilo Google Research (Adaptado a Data Science & Divulgación)
 * @param {string} currentHash - El hash actual de la URL para gestionar el estado activo
 */
export function Navbar(currentHash) {
    const isActive = (hash) => {
        if (hash === '#/about' || hash === '#/') {
            return (currentHash === '#/about' || currentHash === '#/' || currentHash === '') ? 'active' : '';
        }
        return currentHash === hash ? 'active' : '';
    };
    
    return `
        <nav class="google-nav">
            <div class="nav-container">
                <a href="#/" class="nav-logo">Data<span class="bold">Logbook</span></a>
                <div class="nav-links">
                    <a href="#/about" class="${isActive('#/about')}">Perfil</a>
                    <a href="#/research" class="${isActive('#/research')}">Modelos y Artículos</a>
                    <a href="#/contact" class="${isActive('#/contact')}">Contacto</a>
                </div>
            </div>
        </nav>
    `;
}
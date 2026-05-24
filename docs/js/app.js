import { Router } from './router.js';

document.addEventListener('DOMContentLoaded', () => {
    const root = document.getElementById('app-root');
    // Instanciar el router pasándole el contenedor principal
    new Router(root);
});
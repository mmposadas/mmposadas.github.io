export function ContactPage() {
    return `
        <section class="contact-page-layout" style="max-width: 800px; margin: 0 auto; padding: 60px 24px;">
            <header class="page-hero-header" style="margin-bottom: 40px;">
                <span class="hero-subtitle" style="font-family: var(--font-mono); font-size: 13px; color: var(--google-blue); font-weight: 500; display: block; margin-bottom: 8px;">CONNECT</span>
                <h1 class="page-title" style="font-size: 32px; font-weight: 400; margin-bottom: 12px;">¿Hablamos de Algoritmos?</h1>
                <p class="page-description" style="color: var(--text-secondary); font-size: 16px; line-height: 1.6;">
                    Ya sea para contrastar enfoques sobre extracción documental, debatir sobre arquitecturas de Visión Artificial, compartir recursos de Quantum ML para el sector energético o simplemente charlar sobre divulgación científica... la puerta del laboratorio está abierta.
                </p>
            </header>

            <div class="contact-channels-grid" style="display: flex; flex-direction: column; gap: 16px; margin-bottom: 40px;">
                
                <div class="contact-card" style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; background: var(--bg-alt); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 4px; color: var(--text-primary);">💻 Colaboraciones de Código</h3>
                        <p style="font-size: 14px; color: var(--text-secondary);">Revisa mis implementaciones, notebooks de estudio y scripts de código abierto.</p>
                    </div>
                    <a href="https://github.com" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size: 13px;">Ver GitHub</a>
                </div>

                <div class="contact-card" style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; background: var(--bg-alt); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 4px; color: var(--text-primary);">👔 Red Profesional</h3>
                        <p style="font-size: 14px; color: var(--text-secondary);">Para conectar a nivel de industria, compartir artículos o explorar sinergias laborales.</p>
                    </div>
                    <a href="https://www.linkedin.com/in/mill%C3%A1n-mill%C3%A1n-posadas/" target="_blank" rel="noopener" class="btn btn-secondary" style="font-size: 13px;">Conectar en LinkedIn</a>
                </div>

                <div class="contact-card" style="border: 1px solid var(--border-color); border-radius: 8px; padding: 20px; background: var(--bg-alt); display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 16px;">
                    <div>
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 4px; color: var(--text-primary);">📩 Comunicación Directa</h3>
                        <p style="font-size: 14px; color: var(--text-secondary);">Escríbeme directamente si tienes alguna duda técnica sobre los artículos publicados.</p>
                    </div>
                    <a href="mailto:tuemail@ejemplo.com" class="btn btn-primary" style="font-size: 13px;">Enviar Email</a>
                </div>

            </div>

            <div style="border-top: 1px solid var(--border-color); padding-top: 24px; text-align: center;">
                <p style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">
                    Frecuencia de actualización del logbook: asíncrona pero constante.
                </p>
            </div>
        </section>
    `;
}
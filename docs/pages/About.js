export function AboutPage() {
    return `
        <section class="about-page-layout" style="max-width: 1100px; margin: 0 auto; padding: 60px 24px;">
            <div class="hero-container" style="max-width: 800px; margin-bottom: 60px;">
                <span class="hero-subtitle" style="font-family: var(--font-mono); font-size: 13px; color: var(--google-blue); font-weight: 500; display: block; margin-bottom: 12px; text-transform: uppercase;">
                    Data Scientist • Computer Vision • QML Explorer
                </span>
                <h1 class="hero-title" style="font-size: 40px; font-weight: 400; line-height: 1.2; margin-bottom: 20px; color: var(--text-primary);">
                    Extracting Knowledge from Unstructured Data & Simulating the Quantum Future.
                </h1>
                <p class="hero-description" style="font-size: 16px; color: var(--text-secondary); line-height: 1.6;">
                    Soy Data Scientist enfocado en transformar datos complejos y no estructurados en valor accionable. Combino mi experiencia profesional en el diseño de arquitecturas de <b>Visión Artificial</b> y pipelines de <b>Extracción Documental Heterogénea</b> con mi investigación independiente en <b>Machine Learning Cuántico (QML)</b> enfocado en la transición y optimización energética. Mi meta es construir soluciones robustas hoy, mientras descifro los algoritmos del mañana.
                </p>
            </div>

            <div class="research-interests-section" style="border-top: 1px solid var(--border-color); padding-top: 40px;">
                <h2 class="section-heading" style="font-size: 22px; font-weight: 400; margin-bottom: 24px;">Frentes de Trabajo y Estudio</h2>
                <div class="interests-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px;">
                    
                    <div class="interest-card" style="background: var(--bg-alt); padding: 24px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 10px; color: var(--google-blue);">📂 Extracción Documental</h3>
                        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Modelado e ingeniería para digerir layouts mutables, tablas complejas y estructuras de documentos corporativos heterogéneos a gran escala.</p>
                    </div>

                    <div class="interest-card" style="background: var(--bg-alt); padding: 24px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 10px; color: var(--google-blue);">👁️ Visión Artificial</h3>
                        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Aplicación de Transformers Visuales, segmentación y modelos generativos para reconocimiento espacial y procesamiento de imágenes latentes.</p>
                    </div>
                    
                    <div class="interest-card" style="background: var(--bg-alt); padding: 24px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 10px; color: var(--google-blue);">⚡ QML en Sector Energético</h3>
                        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Estudio autodidacta centrado en algoritmos variacionales acoplados a series temporales para predicciones de carga y optimización de redes inteligentes.</p>
                    </div>
                    
                    <div class="interest-card" style="background: var(--bg-alt); padding: 24px; border-radius: 8px; border: 1px solid var(--border-color);">
                        <h3 style="font-size: 16px; font-weight: 500; margin-bottom: 10px; color: var(--google-blue);">📢 Divulgación</h3>
                        <p style="font-size: 14px; color: var(--text-secondary); line-height: 1.5;">Apertura de la "caja negra" algorítmica. Explicación intuitiva y visual de las matemáticas y arquitecturas que gobiernan los modelos.</p>
                    </div>
                    
                </div>
            </div>
        </section>
    `;
}
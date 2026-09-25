import os

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
with open(os.path.join(root_dir, "partials", "header.html"), encoding="utf-8") as f:
    HEADER_TEMPLATE = f.read()

TEMPLATE = """<!DOCTYPE html>
<html lang="es">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>{title} — Millán Millán Posadas</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=JetBrains+Mono:wght@500;600&display=swap" rel="stylesheet">
<link rel="stylesheet" href="{root}css/style.css" />
</head>
<body data-root="{root}">
{header}
<main>
  <section style="padding-top:56px;padding-bottom:12px;">
    <div class="container">
      <div class="breadcrumb reveal"><a href="{root}index.html">Inicio</a> / <a href="{crumb_href}">{crumb_label}</a> / {short_title}</div>
      <div class="eyebrow reveal">{eyebrow}</div>
      <h1 class="reveal">{title}</h1>
      <p class="lead reveal" style="max-width:680px;">{lead}</p>
      <div class="project-meta reveal">{badges}</div>
    </div>
  </section>

  <section>
    <div class="container grid grid-2" style="align-items:start;">
      <div class="reveal">
        <h2>El reto</h2>
        <p>{challenge}</p>
        <h2>Mi aportación</h2>
        <p>{contribution}</p>
      </div>
      <div class="card reveal">
        <h3>Ficha técnica</h3>
        <div class="skill-chips" style="margin-bottom:18px;">{tech_chips}</div>
        <div class="metric-strip">{metrics}</div>
      </div>
    </div>
  </section>

  <section class="section-alt">
    <div class="container reveal">
      <h2>Detalle del proceso</h2>
      {process_html}
    </div>
  </section>
{extra}
  <section>
    <div class="container reveal">
      <div class="callout"><p>{quote}</p></div>
      <div class="btn-row">
        <a href="{crumb_href}" class="btn btn-secondary">← Volver a {crumb_label}</a>
      </div>
    </div>
  </section>
</main>
<div data-include="footer"></div>
<script src="{root}js/main.js"></script>
</body>
</html>
"""

def badge_html(items):
    return "".join(f'<span class="badge">{i}</span>' for i in items)

def chip_html(items):
    return "".join(f'<span class="chip"><span class="dot dot-core"></span>{i}</span>' for i in items)

def metric_html(items):
    return "".join(f'<div class="m"><b>{v}</b><span>{l}</span></div>' for v, l in items)

def timeline_html(items):
    # items: list of (title, text) — vertical dotted timeline, for longer processes.
    steps = "".join(
        f'<div class="timeline-item"><span class="timeline-date">{i+1:02d}</span><h4>{t}</h4><p>{p}</p></div>'
        for i, (t, p) in enumerate(items)
    )
    return f'<div class="timeline">{steps}</div>'

def stepper_html(items):
    # items: list of (title, text) — horizontal numbered stepper, for shorter processes.
    steps = "".join(
        f'<div class="step"><span class="step-num">{i+1}</span><h4>{t}</h4><p>{p}</p></div>'
        for i, (t, p) in enumerate(items)
    )
    return f'<div class="stepper">{steps}</div>'

pages = []

# ---------- Hiberus - Rifas estatales ----------
pages.append(dict(
    path="experience/hiberus-rifas.html", root="../",
    crumb_href="index.html", crumb_label="Experiencia", short_title="Rifas estatales",
    eyebrow="Hiberus · Administración Pública",
    title="Verificación automatizada de solicitudes de rifas estatales",
    lead="Sistema de automatización de comprobación documental para solicitudes de rifas estatales ocasionales, con un chatbot que guía al solicitante durante todo el proceso.",
    badges=badge_html(["LLM", "Chatbot", "Context-windowing", "Sector público"]),
    challenge="La administración pública recibía un alto volumen de solicitudes de rifas estatales ocasionales, cada una acompañada de documentación heterogénea que debía verificarse manualmente contra los requisitos normativos de aceptación, rechazo, revisión y redirección. El proceso era lento y generaba dudas frecuentes por parte de los solicitantes sobre qué se pedía, en qué estado estaba su expediente y qué significaban los resultados de la revisión.",
    contribution="Realicé un estudio normativo de las condiciones de aceptación, rechazo, revisión y redirección de cada tipo de solicitud, y un análisis definitorio de todos los atributos necesarios en cada tipo de documento aportable. Con esa base diseñé ventanas de contexto adaptadas a los distintos documentos y layouts, y construí un extractor por documento sobre el modelo público ALIA, validando sus salidas con un motor de reglas. Analicé los datos extraídos de forma cruzada entre documentos para poder emitir un veredicto de la solicitud, y almacené todos los datos del proceso por fases para dar trazabilidad completa al expediente. Sobre esa base de datos diseñé un chatbot capaz de interpretar el estado actual del proceso a través de la información almacenada, explicando en lenguaje claro qué documentación se solicita, en qué fase está el expediente y qué significan los resultados obtenidos.",
    tech_chips=chip_html(["Python", "ALIA", "Prompt Engineering", "Análisis de layout", "Reglas de validación", "Pydantic"]),
    metrics=metric_html([("7", "Fases del proceso"), ("ALIA", "Modelo LLM público"), ("Agile", "Metodología")]),
    process_html=timeline_html([
        ("Estudio normativo", "Definición de las condiciones de aceptación, rechazo, revisión y redirección de cada tipo de solicitud."),
        ("Atributos por documento", "Análisis definitorio de todos los atributos necesarios en cada tipo de documento aportable."),
        ("Ventanas de contexto por layout", "Diseño de estrategias de context-windowing adaptadas a los distintos documentos y disposiciones."),
        ("Extracción con ALIA", "Extractor por documento sobre el modelo público ALIA, con validación de las salidas mediante un motor de reglas."),
        ("Cruce de datos y veredicto", "Análisis cruzado de los datos extraídos entre documentos para emitir el veredicto de la solicitud."),
        ("Almacenamiento por fases", "Persistencia de todos los datos del proceso por partes, para dar trazabilidad completa al expediente."),
        ("Chatbot de estado", "Asistente conversacional que interpreta esos datos almacenados para explicar requisitos, fase y resultados."),
    ]),
    extra="",
    quote="La parte más delicada no fue extraer los datos, sino explicar el resultado de forma comprensible a alguien que no conoce la jerga administrativa — ahí es donde el diseño del contexto del chatbot marcó la diferencia.",
))

# ---------- Hiberus - Monclinic (RAG documental + árbol de decisión BCLC) ----------
pages.append(dict(
    path="experience/hiberus-monclinic.html", root="../",
    crumb_href="index.html", crumb_label="Experiencia", short_title="Monclinic",
    eyebrow="Hiberus · Fundación Monclinic",
    title="Plataforma de soporte clínico BCLC: datos, árbol de decisión y pipeline RAG sobre PubMed Central",
    lead="Aplicativo clínico con modelo de datos en PostgreSQL y árbol de decisión BCLC para recomendación de tratamientos, más un pipeline de análisis de layouts complejos y RAG sobre 26.000+ publicaciones de PubMed Central sobre cáncer hepatocelular.",
    badges=badge_html(["RAG", "PostgreSQL", "BCLC", "Investigación biomédica"]),
    challenge="La Fundación Monclinic necesitaba, por un lado, una aplicación clínica capaz de persistir los datos de cada caso y recomendar tratamiento siguiendo fielmente el protocolo oficial de estadificación Barcelona Clinic Liver Cancer (BCLC), con informes que los profesionales pudieran compartir fácilmente; y por otro, sistematizar el conocimiento disperso en un volumen masivo de papers de PubMed Central sobre cáncer hepatocelular, filtrando lo relevante y extrayendo de forma estructurada los datos de población, tratamiento y resultados de cada estudio.",
    contribution="Diseñé el modelo de datos del aplicativo y lo desarrollé sobre PostgreSQL para dar persistencia a los casos clínicos, y desarrollé el árbol de decisión basado en reglas que recomienda el tratamiento siguiendo el protocolo oficial BCLC con cobertura completa. Sobre esos resultados, construí la generación automática de documentos PDF para visualizar los datos del paciente y la recomendación de tratamiento. En paralelo, diseñé un pipeline de análisis de layouts complejos sobre los papers de PubMed Central, con un filtrado que descartaba los documentos que no eran estudios y los estudios no relevantes para el dominio, y una clasificación por tipo de estudio y por objetivo de investigación. Extraje los datos de población, tratamientos y resultados por cada línea de investigación (arm) descrita en el paper, y generé embeddings de esa información para alimentar un sistema de recuperación aumentada (RAG). Automaticé además el análisis de licencias de los documentos, identificando un 18,9% incompatible con explotación comercial y un 21,5% no apto para la base de conocimiento, y reduje los costes de inferencia de LLM en aproximadamente un 75% mediante prompt engineering y selección de modelo.",
    tech_chips=chip_html(["Python", "PostgreSQL", "Reglas de negocio", "Generación de PDF", "Análisis de layout", "Clasificación de texto", "Embeddings", "RAG"]),
    metrics=metric_html([("26.000+", "Publicaciones analizadas"), ("-75%", "Coste de inferencia LLM"), ("100%", "Cobertura de reglas BCLC")]),
    process_html=timeline_html([
        ("Modelo de datos en PostgreSQL", "Diseño y desarrollo del esquema relacional del aplicativo para persistir los casos clínicos."),
        ("Árbol de decisión BCLC", "Implementación del sistema de reglas que recomienda el tratamiento según el protocolo oficial, con cobertura completa."),
        ("Generación de informes PDF", "Visualización de los datos del paciente y la recomendación de tratamiento en documentos PDF generados automáticamente."),
        ("Análisis de layouts complejos", "Extracción de la estructura de los papers de PubMed Central, heterogéneos en formato y disposición."),
        ("Filtrado de relevancia", "Descarte automático de documentos que no son estudios y de estudios no relevantes para el dominio."),
        ("Clasificación de estudios", "Categorización por tipo de estudio y por objetivo de la investigación."),
        ("Extracción por línea de investigación (arm)", "Datos de poblaciones, tratamientos y resultados extraídos por cada arm descrito en el paper."),
        ("Vectorización para RAG", "Generación de embeddings de la información extraída para alimentar el sistema de recuperación aumentada."),
    ]),
    extra="",
    quote="Diseñar el árbol BCLC y el modelo de datos en Postgres, y en paralelo convertir cientos de papers heterogéneos en datos estructurados por línea de investigación, fueron dos caras del mismo reto: que cada dato fuera trazable hasta su fuente.",
))

# ---------- Hiberus - Power Apps ----------
pages.append(dict(
    path="experience/hiberus-power-apps.html", root="../",
    crumb_href="index.html", crumb_label="Experiencia", short_title="Power Apps",
    eyebrow="Hiberus · Power Platform Developer",
    title="Gestión y automatización de solicitudes de recursos publicitarios",
    lead="Sistema construido con Microsoft Power Platform para automatizar la gestión de solicitudes de recursos publicitarios internos.",
    badges=badge_html(["Power Platform", "Low-code", "Automatización"]),
    challenge="El proceso de solicitud y gestión de recursos publicitarios se realizaba de forma manual, sin un flujo centralizado que integrara y transformara los datos entre las distintas aplicaciones involucradas.",
    contribution="Construí aplicaciones de negocio con Microsoft Power Apps, diseñando y creando tablas complementarias en Dataverse para dar soporte a los nuevos flujos de datos. Integré fuentes de datos y automaticé flujos de trabajo con Power Automate, y exploré capacidades de IA dentro del ecosistema Power Platform para mejorar el acceso a información de negocio.",
    tech_chips=chip_html(["Power Apps", "Power Automate", "Dataverse", "Integración de datos"]),
    metrics=metric_html([("Low-code", "Enfoque"), ("Sep–Nov 2025", "Duración")]),
    process_html=stepper_html([
        ("Mapeo del proceso", "Análisis del flujo manual de solicitud de recursos publicitarios."),
        ("Modelado en Dataverse", "Creación de tablas complementarias en Dataverse para soportar el nuevo flujo de datos."),
        ("Automatización con Power Platform", "Construcción de la app y los flujos de integración y transformación de datos."),
        ("Exploración de IA aplicada", "Evaluación de capacidades de IA dentro del ecosistema Power Platform."),
    ]),
    extra="",
    quote="Un buen primer contacto con el desarrollo low-code antes de especializarme en soluciones basadas en LLM.",
))

# ---------- Stokeen ----------
pages.append(dict(
    path="experience/stokeen.html", root="../",
    crumb_href="index.html", crumb_label="Experiencia", short_title="Stokeen",
    eyebrow="Stokeen · Data &amp; Backend Engineer",
    title="Ingeniería de datos y backend para un marketplace en escalada (C2C → B2B)",
    lead="Modelo de datos NoSQL, backend en Node.js y arquitectura para un marketplace de economía circular, desde la prueba de concepto hasta el pivote a B2B.",
    badges=badge_html(["Firestore", "NoSQL", "Node.js", "Geolocalización"]),
    challenge="Stokeen necesitaba una base de datos y una arquitectura backend capaces de sostener el crecimiento de un marketplace de economía circular hacia decenas de miles de usuarios, con un modelo de datos que representara perfiles de usuario, artículos publicados y su ubicación geográfica para ofrecer búsqueda por proximidad, y que empezaba a mostrar limitaciones estructurales a medida que la plataforma escalaba.",
    contribution="Diseñé el modelo de datos NoSQL en Firestore del marketplace — perfil de usuario, catálogo de artículos y una estructura geoespacial con índices de proximidad — y desarrollé el backend con Node.js Cloud Functions. Analicé métricas de uso reales de la plataforma e identifiqué que los usuarios evitaban el flujo oficial de intercambio en favor del chat directo — evidencia que motivó un rediseño del proceso. Detecté limitaciones arquitectónicas en el modelo de datos y en el flujo de intercambio que limitaban la escalabilidad y, tras ser promovido a IT Consultant, lideré la definición técnica de la nueva arquitectura durante el pivote estratégico hacia B2B, contribuyendo también a la hoja de ruta de migración cloud desde el ecosistema de Google hacia AWS.",
    tech_chips=chip_html(["Firestore", "Node.js", "Flutter", "NoSQL", "Datos geoespaciales"]),
    metrics=metric_html([("50.000", "Usuarios objetivo de escala"), ("C2C → B2B", "Pivote de producto"), ("Geoespacial", "Índices de proximidad")]),
    process_html=timeline_html([
        ("Modelado del perfil de usuario", "Diseñé el esquema de datos en Firestore para representar el perfil de cada usuario del marketplace: preferencias, historial de intercambios, valoraciones y ubicación habitual, sentando las bases para las funcionalidades de descubrimiento y confianza entre usuarios que la plataforma necesitaba para escalar de forma segura."),
        ("Catálogo de artículos", "Modelé la estructura de documentos para los artículos publicados en la plataforma, incluyendo categorías, estado de disponibilidad, fotografías asociadas y metadatos de condición, optimizando las consultas más frecuentes de búsqueda y filtrado para que la exploración del catálogo fuera fluida incluso con el crecimiento de la base de artículos."),
        ("Índices geoespaciales", "Diseñé una estructura de datos geoespacial sobre Firestore, con índices que permitían consultas eficientes de proximidad, de forma que la aplicación pudiera devolver artículos e intercambios cercanos a la ubicación del usuario sin recorrer manualmente el catálogo completo, un requisito clave para un marketplace de intercambio local."),
        ("Mapas de localización", "Integré la visualización en mapa de los artículos disponibles por proximidad, apoyándome en los índices geoespaciales del modelo de datos para renderizar resultados ordenados por cercanía real y facilitar que los usuarios coordinaran intercambios y encuentros dentro de su propia zona geográfica."),
        ("Backend con Node.js Cloud Functions", "Desarrollé funciones en Node.js para automatizar procesos y mantener la lógica de negocio desacoplada del cliente Flutter, cubriendo desde la validación de datos hasta la actualización de estado de los artículos e intercambios a medida que avanzaban por el flujo del marketplace."),
        ("Analítica de comportamiento", "Analicé métricas de uso reales de la plataforma e identifiqué que los usuarios evitaban el flujo oficial de intercambio en favor del chat directo, una evidencia cuantitativa que documenté y presenté al equipo de producto como motivo para replantear el diseño de ese flujo."),
        ("Rediseño y pivote a B2B", "Tras ser promovido a IT Consultant, lideré la definición técnica de la nueva arquitectura durante el pivote estratégico hacia B2B, detectando las limitaciones del modelo de datos original y contribuyendo a la hoja de ruta de migración cloud desde Google hacia AWS."),
    ]),
    extra="",
    quote="Los datos de uso real, no la especificación inicial, fueron los que revelaron dónde estaba realmente el cuello de botella del modelo de datos.",
))

# ---------- Climbea ----------
CLIMBEA_PUB = """
  <section>
    <div class="container reveal">
      <h2 style="margin-bottom:18px;">Referencia publicada</h2>
      <a class="pub-card" href="https://doi.org/10.4018/979-8-3693-0960-5.ch009" target="_blank" rel="noopener">
        <div class="pub-card-head">
          <span class="pub-card-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z"/></svg></span>
          <div>
            <span class="pub-card-kind">Capítulo de libro académico · IGI Global (2024)</span>
            <h3>Enhance Communication With Stakeholders Through Social Media in Protected Areas as Sustainable Tourism Destinations</h3>
          </div>
        </div>
        <p>Mañas-Álvarez, I. C.; Alonso-Cañadas, J.; Galán-Valdivieso, F.; Caba-Pérez, M. C. — Universidad de Almería. Publicado en <em>Social Media Strategies for Tourism Interactivity</em>. Los datasets que generé durante mi paso por Climbea sirvieron como fuente de datos para este trabajo de investigación.</p>
        <span class="pub-card-link">Ver publicación (DOI) <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6"/><path d="M20 4 10 14"/><path d="M19 13v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5"/></svg></span>
      </a>
    </div>
  </section>
"""

pages.append(dict(
    path="experience/climbea.html", root="../",
    crumb_href="index.html", crumb_label="Experiencia", short_title="Climbea",
    eyebrow="Climbea · Data Scientist",
    title="Automatización de extracción y análisis de datos sociales",
    lead="Pipeline de minería de datos de Twitter/X sobre 23 Parques Nacionales europeos, con NLP y dashboards en Power BI — cuyos datasets alimentaron un capítulo de libro académico publicado.",
    badges=badge_html(["Python", "NLP", "Power BI", "Crontab"]),
    challenge="En colaboración con la Universidad de Almería, el objetivo era entender patrones de comportamiento e interacción en Parques Nacionales europeos a partir de datos no estructurados de redes sociales, sin un proceso automatizado que los recopilara y analizara de forma periódica.",
    contribution="Diseñé e implementé un pipeline de recolección de datos vía Twitter API cubriendo las cuentas oficiales de 23 Parques Nacionales europeos, programando su ejecución periódica con crontab. Procesé y analicé aproximadamente un año de actividad con técnicas de NLP, estudiando sentimiento, engagement de audiencia y patrones de interacción geográfica, y modelé los resultados en paneles interactivos de Power BI aplicando transformaciones con Power Query. Los datasets analíticos resultantes sirvieron como fuente de datos para un capítulo de libro publicado sobre estrategias de redes sociales en áreas protegidas.",
    tech_chips=chip_html(["Python", "Twitter API", "NLP", "Power BI", "Power Query", "Crontab"]),
    metrics=metric_html([("23", "Parques Nacionales europeos"), ("~1 año", "Actividad analizada"), ("Publicado", "Capítulo de libro")]),
    process_html=stepper_html([
        ("Extracción vía Twitter API", "Pipeline en Python para recolectar datos de las cuentas oficiales de 23 Parques Nacionales, programado con crontab."),
        ("Análisis de sentimiento y NLP", "Procesamiento de texto no estructurado para extraer sentimiento y métricas de engagement."),
        ("Mapeo geográfico", "Identificación de patrones de comportamiento por ubicación en distintos Parques Nacionales europeos."),
        ("Dashboards en Power BI", "Transformación de datos con Power Query y modelado de paneles interactivos para el equipo de investigación."),
    ]),
    extra=CLIMBEA_PUB,
    quote="Fue mi primer proyecto end-to-end: desde la extracción cruda hasta datasets que acabaron siendo la base de una publicación académica.",
))

# ---------- Universidad de Almería · VR Developer ----------
pages.append(dict(
    path="experience/ual-vr.html", root="../",
    crumb_href="index.html", crumb_label="Experiencia", short_title="VR Developer",
    eyebrow="Universidad de Almería · Prácticas de desarrollo de software",
    title="Desarrollo de aplicaciones de Realidad Virtual con Unity para simulación clínica",
    lead="Prácticas de desarrollo de software en Unity y C#, incluyendo el diseño de un caso de uso de simulación clínica para el Grado en Enfermería.",
    badges=badge_html(["Unity", "C#", "VR", "Simulación clínica"]),
    challenge="Como parte de una beca de prácticas de desarrollo de software, el objetivo era construir experiencias de Realidad Virtual interactivas e inmersivas con Unity, incluyendo un caso de uso de simulación clínica desarrollado junto al Grado en Enfermería para entrenar el protocolo de actuación ante una emergencia en el entorno escolar.",
    contribution="Implementé mecánicas de juego y funcionalidades interactivas con Unity y C#, y diseñé y desarrollé, junto al Grado en Enfermería, un caso de uso de simulación centrado en el protocolo de actuación de un profesional de enfermería en un centro escolar ante un menor con lesiones autoinfligidas. La simulación cubría la recepción del aviso, el desplazamiento por el centro hasta llegar al alumno, la atención con el botiquín escolar, y una reunión posterior con el equipo directivo y los tutores legales para acordar las medidas a seguir — puntuando el desempeño del alumno de Enfermería en cada fase del protocolo.",
    tech_chips=chip_html(["Unity", "C#", "Diseño de simulación"]),
    metrics=metric_html([("3 meses", "Duración"), ("4 fases", "Caso de uso clínico"), ("Unity", "Motor")]),
    process_html=stepper_html([
        ("Mecánicas de interacción", "Implementación de mecánicas de juego e interacción con Unity y C#."),
        ("Diseño del caso de uso clínico", "Guion del escenario: recepción del aviso, movilidad por el centro, atención con botiquín y reunión con tutores."),
        ("Sistema de puntuación", "Evaluación del desempeño del alumno de Enfermería en cada fase del protocolo."),
        ("Testing e iteración", "Depuración, optimización y ajuste iterativo del comportamiento del escenario."),
    ]),
    extra="",
    quote="Diseñar un escenario que evaluara un protocolo real de enfermería, no solo una mecánica de juego, fue lo que hizo interesante este proyecto — la simulación tenía que ser útil para enseñar, no solo inmersiva.",
))

# ---------- Projects: Vigilancia IA ----------
pages.append(dict(
    path="projects/vigilancia-ia.html", root="../",
    crumb_href="index.html", crumb_label="Proyectos", short_title="Vigilancia IA",
    eyebrow="Universidad de Almería · Dic 2025 – Ene 2026",
    title="Sistema de vigilancia con IA para detección, seguimiento y analítica de afluencia",
    lead="Proyecto académico de sistemas distribuidos: streaming de vídeo con análisis espacio-temporal, detección y tracking de personas en tiempo real.",
    badges=badge_html([".NET · Blazor", "ONNX", "Sistemas distribuidos", "Streaming"]),
    challenge="Diseñar un sistema capaz de procesar streaming de vídeo en tiempo real para detectar personas, hacer seguimiento de su trayectoria y generar analítica de afluencia, con varios módulos independientes que debían coordinarse sin control centralizado único.",
    contribution="Diseñé una arquitectura con múltiples módulos — detección de personas, tracking y visualización — comunicados mediante pipelines de datos y colas en memoria, con procesamiento paralelo de frames para sostener el rendimiento en tiempo real. Desarrollé la aplicación sobre .NET con Blazor, ejecutando los modelos de detección en formato ONNX para la inferencia. Este proyecto es mi referencia directa de trabajo con sistemas distribuidos: múltiples componentes independientes coordinados para un objetivo común, con foco en escalabilidad y tolerancia a fallos.",
    tech_chips=chip_html([".NET", "Blazor", "ONNX", "Procesamiento paralelo", "Streaming"]),
    metrics=metric_html([("3", "Módulos"), ("Real-time", "Procesamiento"), ("Paralelo", "Por frame")]),
    process_html=stepper_html([
        ("Detección de personas", "Módulo de detección sobre el stream de vídeo de entrada."),
        ("Tracking", "Seguimiento de trayectorias entre frames para mantener identidad de cada persona detectada."),
        ("Analítica de afluencia", "Agregación espacio-temporal de las trayectorias para generar métricas de afluencia."),
        ("Visualización", "Módulo conectado mediante colas de datos en memoria al resto del pipeline."),
    ]),
    extra="",
    quote="Un sistema distribuido no es solo 'varios programas a la vez' — es diseñar para que cada módulo pueda fallar o escalar sin tumbar el resto. Eso es lo que me llevo de este proyecto.",
))

# ---------- Projects: Emociones Caninas ----------
pages.append(dict(
    path="projects/emociones-caninas.html", root="../",
    crumb_href="index.html", crumb_label="Proyectos", short_title="Emociones caninas",
    eyebrow="Universidad de Almería · May – Jun 2025 · Calificación 9.5/10",
    title="Reconocimiento de emociones caninas con CNNs y descriptores multimodales",
    lead="Proyecto académico de Deep Learning: clasificación de estados emocionales en perros con redes convolucionales personalizadas sobre distintos descriptores (imagen y puntos corporales), explorando también la clusterización por raza.",
    badges=badge_html(["TensorFlow / Keras", "CNN", "Visión por computador", "9.5/10"]),
    challenge="Construir un modelo capaz de reconocer emociones caninas a partir de datos visuales, combinando distintos tipos de descriptores (imagen completa y puntos corporales) para capturar las características relevantes de cada estado emocional, y evaluar si las diferencias estructurales entre razas debían tratarse de forma diferenciada.",
    contribution="Diseñé y entrené redes neuronales convolucionales (CNN) personalizadas con TensorFlow/Keras, probando distintos descriptores de entrada — imagen completa y puntos corporales (keypoints) — para la clasificación de emociones. Planteé además una clusterización por raza, dado que las diferencias estructurales entre razas afectaban a la representación de los puntos corporales y podían introducir sesgo en el modelo. El proyecto obtuvo una calificación de 9.5/10.",
    tech_chips=chip_html(["Python", "TensorFlow / Keras", "CNN", "Descriptores de puntos corporales", "Clustering"]),
    metrics=metric_html([("9.5/10", "Calificación"), ("CNN", "Arquitectura personalizada"), ("Académico", "UAL")]),
    process_html=stepper_html([
        ("Preparación de datos", "Recopilación y preprocesado de datos de imagen etiquetados por estado emocional."),
        ("Descriptores multimodales", "Extracción de descriptores de imagen y de puntos corporales (keypoints) como entradas alternativas al modelo."),
        ("CNN personalizada", "Diseño y entrenamiento de redes convolucionales a medida con TensorFlow/Keras para cada tipo de descriptor."),
        ("Clusterización por raza", "Exploración de la agrupación por raza para evaluar el efecto de las diferencias estructurales en la representación de los puntos corporales."),
        ("Evaluación", "Comparación del rendimiento entre descriptores y arquitecturas para seleccionar la configuración final."),
    ]),
    extra="",
    quote="Uno de los proyectos académicos con los que más disfruté — combinar distintos descriptores del mismo perro y descubrir cuánto pesaba la raza en el resultado fue un buen reto de diseño experimental.",
))

STALE = []

for rel in STALE:
    p = os.path.join(root_dir, rel)
    if os.path.exists(p):
        os.remove(p)
        print("removed stale", p)

for p in pages:
    html = TEMPLATE.format(
        header=HEADER_TEMPLATE.replace("{{ROOT}}", p["root"]),
        title=p["title"], root=p["root"], crumb_href=p["crumb_href"], crumb_label=p["crumb_label"],
        short_title=p["short_title"], eyebrow=p["eyebrow"], lead=p["lead"], badges=p["badges"],
        challenge=p["challenge"], contribution=p["contribution"], tech_chips=p["tech_chips"],
        metrics=p["metrics"], process_html=p["process_html"], extra=p.get("extra", ""), quote=p["quote"],
    )
    out_path = os.path.join(root_dir, p["path"])
    os.makedirs(os.path.dirname(out_path), exist_ok=True)
    with open(out_path, "w", encoding="utf-8") as f:
        f.write(html)
    print("wrote", out_path)

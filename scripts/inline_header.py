"""
Reinserta el contenido de partials/header.html directamente en cada página HTML,
sustituyendo el bloque <header class="site-header">...</header> existente (o el
placeholder <div data-include="header"></div> si una página aún no se ha
inlineado nunca) por el markup actual, con {{ROOT}} resuelto según el atributo
data-root de cada página.

Se hace así (en vez de depender de fetch() en el navegador) para que la barra
de navegación lateral SIEMPRE se vea, incluso abriendo los archivos con
doble clic (file://) sin servidor local, y aunque falle JavaScript.

Es seguro volver a ejecutarlo cuantas veces haga falta: siempre reemplaza el
<header> existente por la versión actual de partials/header.html, en vez de
limitarse a la primera vez (no busca solo el placeholder ya consumido).

Uso: edita partials/header.html y después
     python3 scripts/inline_header.py
"""
import os
import re

root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

with open(os.path.join(root_dir, "partials", "header.html"), encoding="utf-8") as f:
    HEADER_TEMPLATE = f.read()

INCLUDE_RE = re.compile(r'<div data-include="header"></div>')
HEADER_BLOCK_RE = re.compile(r'<header class="site-header">.*?</header>', re.DOTALL)
DATA_ROOT_RE = re.compile(r'data-root="([^"]*)"')

header_source_path = os.path.join(root_dir, "partials", "header.html")

count = 0
for dirpath, _dirnames, filenames in os.walk(root_dir):
    if "/.git" in dirpath or os.path.basename(dirpath) == "partials":
        continue
    for name in filenames:
        if not name.endswith(".html"):
            continue
        path = os.path.join(dirpath, name)
        if os.path.abspath(path) == header_source_path:
            continue
        with open(path, encoding="utf-8") as f:
            html = f.read()
        has_placeholder = 'data-include="header"' in html
        has_block = HEADER_BLOCK_RE.search(html) is not None
        if not has_placeholder and not has_block:
            continue
        m = DATA_ROOT_RE.search(html)
        root = m.group(1) if m else ""
        header_html = HEADER_TEMPLATE.replace("{{ROOT}}", root).rstrip("\n")
        if has_block:
            new_html = HEADER_BLOCK_RE.sub(lambda _m: header_html, html, count=1)
        else:
            new_html = INCLUDE_RE.sub(lambda _m: header_html, html, count=1)
        if new_html != html:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_html)
            count += 1
            print("updated header ->", os.path.relpath(path, root_dir))

print(f"Done. {count} files updated.")

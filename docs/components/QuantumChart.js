export function QuantumChart(canvasId, isRealTime = false) {
    return `
        <div class="chart-wrapper" style="border: 1px solid var(--border-color); border-radius: 8px; padding: 16px; background: #fff;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px; align-items: center;">
                <span style="font-family: var(--font-mono); font-size: 12px; color: var(--text-secondary);">MÉTRICA: Consecución de Estado Cuántico</span>
                ${isRealTime ? '<span class="live-indicator" style="color: #d93025; font-size: 11px; font-weight: bold; display: flex; align-items: center; gap: 4px;"><span style="width:6px; height:6px; background:#d93025; border-radius:50%; display:inline-block;"></span>LIVE SIMULATION</span>' : ''}
            </div>
            <canvas id="${canvasId}" width="500" height="200" style="width: 100%; height: auto; display: block;"></canvas>
        </div>
    `;
}

// Lógica de dibujo del gráfico tras montarse en el DOM
QuantumChart.init = (canvasId, isRealTime) => {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let offset = 0;

    // Datos estáticos fijos si no requiere tiempo real
    const staticPoints = [180, 140, 90, 70, 55, 42, 30, 22, 18, 15];

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Dibujar rejilla de fondo estilo Google Charts
        ctx.strokeStyle = '#f1f3f4';
        ctx.lineWidth = 1;
        for (let i = 20; i < canvas.height; i += 40) {
            ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
        }

        // Configuración de la línea del gráfico
        ctx.strokeStyle = '#1a73e8';
        ctx.lineWidth = 2.5;
        ctx.beginPath();

        if (isRealTime) {
            // Genera una simulación de onda sinusoidal amortiguada (Ruido cuántico simulado)
            for (let x = 0; x < canvas.width; x++) {
                const y = (canvas.height / 2) + Math.sin(x * 0.03 + offset) * 40 * Math.exp(-x * 0.002);
                if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
            }
            offset += 0.05;
            ctx.stroke();
            animationFrameId = requestAnimationFrame(draw);
        } else {
            // Dibuja una curva de convergencia típica basada en los puntos estáticos
            const step = canvas.width / (staticPoints.length - 1);
            staticPoints.forEach((p, idx) => {
                if (idx === 0) ctx.moveTo(idx * step, p); else ctx.lineTo(idx * step, p);
            });
            ctx.stroke();
        }
    }

    draw();

    // Retornamos una función de limpieza para detener la animación si cambiamos de página
    return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
};
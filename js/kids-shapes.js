// shapes game: arrastrar figura a silueta
const shapesData = [
    { name: "Círculo", nameEn: "Circle", icon: "●", dropZone: "circle" },
    { name: "Cuadrado", nameEn: "Square", icon: "■", dropZone: "square" },
    { name: "Triángulo", nameEn: "Triangle", icon: "▲", dropZone: "triangle" },
    { name: "Rectángulo", nameEn: "Rectangle", icon: "▭", dropZone: "rectangle" }
];

function initShapeGame() {
    const container = document.getElementById('shape-game');
    if (!container) return;
    container.innerHTML = `
        <div class="row">
            <div class="col-6 d-flex flex-wrap gap-3 justify-content-center" id="shapes-palette"></div>
            <div class="col-6" id="shapes-drops"></div>
        </div>
        <div id="shape-feedback" class="text-center mt-3 fw-bold"></div>
    `;
    const palette = document.getElementById('shapes-palette');
    const dropsArea = document.getElementById('shapes-drops');
    
    shapesData.forEach(shape => {
        const dragDiv = document.createElement('div');
        dragDiv.className = 'drag-shape p-2';
        dragDiv.setAttribute('draggable', 'true');
        dragDiv.setAttribute('data-shape', shape.dropZone);
        dragDiv.innerHTML = `<span style="font-size:3rem">${shape.icon}</span><br><small>${shape.name}</small>`;
        dragDiv.addEventListener('dragstart', handleDragStart);
        palette.appendChild(dragDiv);
        
        const dropDiv = document.createElement('div');
        dropDiv.className = 'drop-zone mt-2';
        dropDiv.setAttribute('data-expected', shape.dropZone);
        dropDiv.innerHTML = `❄️ ${shape.nameEn}`;
        dropDiv.addEventListener('dragover', (e) => e.preventDefault());
        dropDiv.addEventListener('drop', handleDrop);
        dropsArea.appendChild(dropDiv);
    });
}

let draggedShape = null;
function handleDragStart(e) {
    draggedShape = e.target.closest('.drag-shape');
    e.dataTransfer.setData('text/plain', draggedShape.getAttribute('data-shape'));
}

function handleDrop(e) {
    e.preventDefault();
    const targetZone = e.target.closest('.drop-zone');
    if (!targetZone || !draggedShape) return;
    const shapeType = draggedShape.getAttribute('data-shape');
    const expected = targetZone.getAttribute('data-expected');
    const feedback = document.getElementById('shape-feedback');
    if (shapeType === expected) {
        feedback.innerHTML = `✅ ¡Correcto! ${draggedShape.querySelector('small')?.innerText} / ${targetZone.innerText.trim()} ✅`;
        // Animación
        targetZone.style.transform = 'scale(1.05)';
        setTimeout(() => targetZone.style.transform = '', 300);
        // Guardar progreso local (para la pedagoga)
        let progress = JSON.parse(localStorage.getItem('shapeProgress') || '{}');
        progress[shapeType] = true;
        localStorage.setItem('shapeProgress', JSON.stringify(progress));
    } else {
        feedback.innerHTML = `❌ Intenta de nuevo: ${draggedShape.querySelector('small')?.innerText} no va allí. ❌`;
    }
    draggedShape = null;
}
// Inicializar cuando cargue la pestaña
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('shape-game')) initShapeGame();
});
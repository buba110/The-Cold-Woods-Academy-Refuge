// Juego de figuras geométricas (30 niveles)
let shapeLevel = 1;
let shapeScore = 0;
let currentShapeQuestion = null;
let shapeElements = null;

const shapeNames = [
    { name: "Círculo", nameEn: "Circle", icon: "●", dropZone: "circle" },
    { name: "Cuadrado", nameEn: "Square", icon: "■", dropZone: "square" },
    { name: "Triángulo", nameEn: "Triangle", icon: "▲", dropZone: "triangle" },
    { name: "Rectángulo", nameEn: "Rectangle", icon: "▭", dropZone: "rectangle" }
];

function initShapesGame() {
    const container = document.getElementById('shapes-game-container');
    if (!container) return;
    container.innerHTML = `
        <div class="game-area bg-black bg-opacity-25 rounded-4 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-white">Aciertos: <span id="shape-score">0</span></div>
                <div class="text-white">Nivel: <span id="shape-level">1</span></div>
            </div>
            <div id="shape-question" class="text-center mb-4 p-3 bg-dark bg-opacity-50 rounded-4">
                <p class="lead text-white">Arrastra la figura que corresponde a:</p>
                <h2 id="shape-prompt" class="display-6 text-info"></h2>
            </div>
            <div class="d-flex flex-wrap justify-content-center gap-3" id="shape-options"></div>
            <div id="shape-feedback" class="text-center mt-3 fw-bold text-white"></div>
        </div>
    `;
    loadShapeLevel();
}

function loadShapeLevel() {
    const level = shapeLevel;
    // Seleccionar una figura aleatoria (dificultad aumenta con nivel)
    const randomIndex = Math.floor(Math.random() * shapeNames.length);
    currentShapeQuestion = shapeNames[randomIndex];
    document.getElementById('shape-prompt').innerHTML = `${currentShapeQuestion.name} / ${currentShapeQuestion.nameEn}`;
    document.getElementById('shape-level').innerText = level;
    document.getElementById('shape-score').innerText = shapeScore;
    
    // Generar opciones (mezclar)
    const options = [...shapeNames];
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    const optionsDiv = document.getElementById('shape-options');
    optionsDiv.innerHTML = '';
    options.forEach(shape => {
        const dragDiv = document.createElement('div');
        dragDiv.className = 'drag-shape m-2';
        dragDiv.setAttribute('draggable', 'true');
        dragDiv.setAttribute('data-shape', shape.dropZone);
        dragDiv.innerHTML = `<span style="font-size:3rem">${shape.icon}</span><br><small>${shape.name}</small>`;
        dragDiv.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', shape.dropZone);
            e.dataTransfer.effectAllowed = 'copy';
        });
        optionsDiv.appendChild(dragDiv);
    });
    // Crear zona de drop (solamente una)
    let dropZone = document.querySelector('#shape-question + .drop-zone');
    if (!dropZone) {
        dropZone = document.createElement('div');
        dropZone.className = 'drop-zone mx-auto mt-3';
        dropZone.style.width = '150px';
        dropZone.innerHTML = '⬇️ Suelta aquí ⬇️';
        dropZone.addEventListener('dragover', (e) => e.preventDefault());
        dropZone.addEventListener('drop', (e) => {
            e.preventDefault();
            const droppedShape = e.dataTransfer.getData('text/plain');
            const feedback = document.getElementById('shape-feedback');
            if (droppedShape === currentShapeQuestion.dropZone) {
                shapeScore++;
                document.getElementById('shape-score').innerText = shapeScore;
                feedback.innerHTML = '✅ ¡Correcto! ✅';
                if (shapeScore >= shapeLevel * 2) { // subir nivel cada 2 aciertos por nivel
                    if (shapeLevel < 30) {
                        shapeLevel++;
                        shapeScore = 0;
                        feedback.innerHTML += ` ¡Subiste al nivel ${shapeLevel}! 🎉`;
                    } else {
                        feedback.innerHTML = '🏆 ¡Completaste los 30 niveles! Eres un explorador experto. 🏆';
                    }
                }
                loadShapeLevel();
            } else {
                feedback.innerHTML = '❌ Intenta de nuevo, esa no es la figura correcta. ❌';
            }
        });
        document.querySelector('#shape-question').after(dropZone);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('shapes-game-container')) initShapesGame();
});

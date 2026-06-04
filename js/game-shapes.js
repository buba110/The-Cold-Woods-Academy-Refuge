let shapeLevel = 1;
let shapeScore = 0;
let currentShapeQuestion = null;
let synth = window.speechSynthesis;

const shapeNames = [
    { name: "Círculo", nameEn: "Circle", icon: "●", dropZone: "circle" },
    { name: "Cuadrado", nameEn: "Square", icon: "■", dropZone: "square" },
    { name: "Triángulo", nameEn: "Triangle", icon: "▲", dropZone: "triangle" },
    { name: "Rectángulo", nameEn: "Rectangle", icon: "▭", dropZone: "rectangle" }
];

function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    synth.speak(utterance);
}

function initShapesGame() {
    const container = document.getElementById('shapes-game-container');
    if (!container) return;
    container.innerHTML = `
        <div class="game-area p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="fw-bold">🎯 Aciertos: <span id="shape-score">0</span></div>
                <div class="fw-bold">⭐ Nivel: <span id="shape-level">1</span></div>
            </div>
            <div id="shape-question" class="text-center mb-4 p-3 rounded-4" style="background:rgba(0,0,0,0.05)">
                <p class="lead mb-2">🖐️ Arrastra o toca la figura</p>
                <h2 id="shape-prompt" class="display-6"></h2>
            </div>
            <div id="shape-dropzone" class="drop-zone mb-4" style="width:80%; max-width:280px;">⬇️ Suelta o toca aquí ⬇️</div>
            <div class="row g-3 justify-content-center" id="shape-options"></div>
            <div id="shape-feedback" class="text-center mt-3 fw-bold"></div>
        </div>
    `;
    loadShapeLevel();
}

function loadShapeLevel() {
    const randomIndex = Math.floor(Math.random() * shapeNames.length);
    currentShapeQuestion = shapeNames[randomIndex];
    document.getElementById('shape-prompt').innerHTML = `${currentShapeQuestion.icon} ${currentShapeQuestion.name} / ${currentShapeQuestion.nameEn}`;
    document.getElementById('shape-level').innerText = shapeLevel;
    document.getElementById('shape-score').innerText = shapeScore;
    
    // Voz bilingüe
    speak(`Busca el ${currentShapeQuestion.name}. ${currentShapeQuestion.nameEn}`);
    
    const optionsDiv = document.getElementById('shape-options');
    optionsDiv.innerHTML = '';
    // Mezclar opciones
    const shuffled = [...shapeNames];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    shuffled.forEach(shape => {
        const col = document.createElement('div');
        col.className = 'col-6 col-md-3';
        const dragDiv = document.createElement('div');
        dragDiv.className = 'drag-shape p-2 text-center';
        dragDiv.setAttribute('data-shape', shape.dropZone);
        dragDiv.innerHTML = `<span style="font-size:2.5rem">${shape.icon}</span><br><small>${shape.name}</small>`;
        // Arrastrar
        dragDiv.setAttribute('draggable', 'true');
        dragDiv.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', shape.dropZone));
        // Tocar (para niños pequeños)
        dragDiv.addEventListener('click', () => checkAnswer(shape.dropZone));
        col.appendChild(dragDiv);
        optionsDiv.appendChild(col);
    });
    
    const dropZone = document.getElementById('shape-dropzone');
    dropZone.ondragover = (e) => e.preventDefault();
    dropZone.ondrop = (e) => {
        e.preventDefault();
        const dropped = e.dataTransfer.getData('text/plain');
        checkAnswer(dropped);
    };
    // También tocar el dropzone no hace nada, pero permitir tocar las figuras sí.
}

function checkAnswer(selected) {
    const feedback = document.getElementById('shape-feedback');
    if (selected === currentShapeQuestion.dropZone) {
        shapeScore++;
        document.getElementById('shape-score').innerText = shapeScore;
        feedback.innerHTML = '✅ ¡Correcto! ✅';
        speak(`¡Muy bien! ${currentShapeQuestion.name}`);
        if (shapeScore >= shapeLevel * 2) {
            if (shapeLevel < 30) {
                shapeLevel++;
                shapeScore = 0;
                feedback.innerHTML += ` 🎉 ¡Subiste al nivel ${shapeLevel}! 🎉`;
                speak(`¡Felicidades! Pasaste al nivel ${shapeLevel}`);
            } else {
                feedback.innerHTML = '🏆 ¡Completaste los 30 niveles! Eres un campeón. 🏆';
                speak('¡Increíble! Completaste todos los niveles.');
            }
        }
        loadShapeLevel();
    } else {
        feedback.innerHTML = '❌ Intenta de nuevo, esa no es la figura correcta. ❌';
        speak('No es correcto, vuelve a intentarlo');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('shapes-game-container')) initShapesGame();
});

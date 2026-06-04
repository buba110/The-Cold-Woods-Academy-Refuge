// Colores y objetos (niveles progresivos)
const colorItemsBase = [
    { color: "Rojo", colorEn: "Red", icon: "🍎" },
    { color: "Azul", colorEn: "Blue", icon: "💧" },
    { color: "Amarillo", colorEn: "Yellow", icon: "⭐" },
    { color: "Verde", colorEn: "Green", icon: "🌲" },
    { color: "Naranja", colorEn: "Orange", icon: "🍊" },
    { color: "Morado", colorEn: "Purple", icon: "🍇" }
];
let colorLevel = 1;
let colorScore = 0;
let currentColorItem = null;
let currentCount = 3; // cantidad inicial, aumenta con nivel

function initColorsGame() {
    const container = document.getElementById('colors-game-container');
    if (!container) return;
    container.innerHTML = `
        <div class="game-area bg-black bg-opacity-25 rounded-4 p-4">
            <div class="d-flex justify-content-between align-items-center mb-3">
                <div class="text-white">Aciertos: <span id="color-score">0</span></div>
                <div class="text-white">Nivel: <span id="color-level">1</span></div>
            </div>
            <div id="color-question" class="text-center mb-4 p-3 bg-dark bg-opacity-50 rounded-4">
                <p class="lead text-white">Toca todos los elementos de color:</p>
                <h2 id="color-prompt" class="display-6 text-info"></h2>
            </div>
            <div id="color-objects-area" class="d-flex flex-wrap justify-content-center gap-3 my-3"></div>
            <div id="color-feedback" class="text-center mt-3 fw-bold text-white"></div>
        </div>
    `;
    loadColorLevel();
}

function loadColorLevel() {
    const level = colorLevel;
    const availableColors = colorItemsBase.slice(0, Math.min(3 + Math.floor(level / 6), colorItemsBase.length));
    const randomIndex = Math.floor(Math.random() * availableColors.length);
    currentColorItem = availableColors[randomIndex];
    currentCount = 2 + Math.floor(level / 3); // aumenta cantidad con nivel (2 a 12)
    document.getElementById('color-prompt').innerHTML = `${currentColorItem.color} / ${currentColorItem.colorEn}`;
    document.getElementById('color-level').innerText = level;
    document.getElementById('color-score').innerText = colorScore;
    
    const objectsDiv = document.getElementById('color-objects-area');
    objectsDiv.innerHTML = '';
    const items = [];
    for (let i = 0; i < currentCount; i++) {
        items.push({ icon: currentColorItem.icon, correct: true });
    }
    // agregar distractores (cantidad aumenta con nivel)
    const distractorCount = Math.min(2 + Math.floor(level / 5), 6);
    for (let i = 0; i < distractorCount; i++) {
        let other = colorItemsBase[Math.floor(Math.random() * colorItemsBase.length)];
        while (other.color === currentColorItem.color) other = colorItemsBase[Math.floor(Math.random() * colorItemsBase.length)];
        items.push({ icon: other.icon, correct: false });
    }
    // mezclar
    for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [items[i], items[j]] = [items[j], items[i]];
    }
    let tappedCount = 0;
    items.forEach(item => {
        const obj = document.createElement('div');
        obj.className = 'fs-1 p-2 color-object';
        obj.textContent = item.icon;
        obj.style.cursor = 'pointer';
        obj.style.transition = 'transform 0.1s';
        obj.addEventListener('click', () => {
            if (item.correct) {
                tappedCount++;
                obj.style.transform = 'scale(1.2)';
                setTimeout(() => obj.style.transform = '', 200);
                obj.style.opacity = '0.5';
                obj.style.pointerEvents = 'none';
                document.getElementById('color-feedback').innerHTML = `✅ Tocado: ${currentColorItem.color} / ${currentColorItem.colorEn}`;
                if (tappedCount === currentCount) {
                    colorScore++;
                    document.getElementById('color-score').innerText = colorScore;
                    if (colorScore >= colorLevel * 2) {
                        if (colorLevel < 30) {
                            colorLevel++;
                            colorScore = 0;
                            document.getElementById('color-feedback').innerHTML = `🎉 ¡Subiste al nivel ${colorLevel}! 🎉`;
                        } else {
                            document.getElementById('color-feedback').innerHTML = '🏆 ¡Completaste los 30 niveles! Eres un genio de los colores. 🏆';
                        }
                    }
                    setTimeout(() => loadColorLevel(), 1000);
                }
            } else {
                document.getElementById('color-feedback').innerHTML = `❌ Ese no es color ${currentColorItem.color}, intenta de nuevo. ❌`;
                obj.style.transform = 'scale(0.9)';
                setTimeout(() => obj.style.transform = '', 200);
            }
        });
        objectsDiv.appendChild(obj);
    });
}
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('colors-game-container')) initColorsGame();
});

// Color Counter: objetos de montaña en diferentes colores
let colorItems = [
    { color: "Rojo", colorEn: "Red", count: 3, icon: "🍎" },
    { color: "Azul", colorEn: "Blue", count: 2, icon: "💧" },
    { color: "Amarillo", colorEn: "Yellow", count: 4, icon: "⭐" },
    { color: "Verde", colorEn: "Green", count: 3, icon: "🌲" }
];

let currentColorGame = null;

function initColorGame() {
    const container = document.getElementById('color-game');
    if (!container) return;
    container.innerHTML = `
        <div class="text-center mb-3">
            <select id="color-select" class="form-select w-auto d-inline-block bg-dark text-light"></select>
            <button id="check-count" class="btn btn-sm btn-light ms-2">Contar</button>
        </div>
        <div id="color-objects" class="d-flex flex-wrap justify-content-center gap-3 my-3"></div>
        <div id="color-feedback" class="text-center mt-2"></div>
    `;
    const select = document.getElementById('color-select');
    colorItems.forEach((item, idx) => {
        const option = document.createElement('option');
        option.value = idx;
        option.textContent = `${item.color} / ${item.colorEn}`;
        select.appendChild(option);
    });
    document.getElementById('check-count').addEventListener('click', () => {
        const selectedIdx = select.value;
        const selected = colorItems[selectedIdx];
        const objectsDiv = document.getElementById('color-objects');
        objectsDiv.innerHTML = '';
        for(let i=0; i<selected.count; i++) {
            const obj = document.createElement('div');
            obj.className = 'fs-1 p-2';
            obj.textContent = selected.icon;
            obj.addEventListener('click', () => {
                obj.style.transform = 'scale(1.2)';
                setTimeout(() => obj.style.transform = '', 200);
                const feedback = document.getElementById('color-feedback');
                feedback.innerHTML = `${selected.icon} ${selected.color} / ${selected.colorEn}`;
            });
            objectsDiv.appendChild(obj);
        }
        const feedback = document.getElementById('color-feedback');
        feedback.innerHTML = `🎨 Hay ${selected.count} ${selected.color}(s) (${selected.count} ${selected.colorEn}) ¡Tócalos! 🎨`;
        // Guardar actividad
        let colorProgress = JSON.parse(localStorage.getItem('colorProgress') || '{}');
        colorProgress[selected.colorEn] = selected.count;
        localStorage.setItem('colorProgress', JSON.stringify(colorProgress));
    });
    // Cargar primer color por defecto
    document.getElementById('check-count').click();
}
document.addEventListener('DOMContentLoaded', () => {
    if(document.getElementById('color-game')) initColorGame();
});
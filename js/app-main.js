document.addEventListener('DOMContentLoaded', () => {
    const profileScreen = document.getElementById('profile-screen');
    const kidsZone = document.getElementById('kids-zone');
    const refugeZone = document.getElementById('refuge-zone');
    const kidsBtn = document.getElementById('kids-btn');
    const backBtns = document.querySelectorAll('.btn-back');
    const snowflake = document.getElementById('secret-snowflake');
    const bypassModal = new bootstrap.Modal(document.getElementById('bypassModal'));
    let pressTimer;

    // Botón de niños - activa kids-mode
    kidsBtn.addEventListener('click', () => {
        document.body.classList.add('kids-mode');
        profileScreen.classList.add('d-none');
        kidsZone.classList.remove('d-none');
    });

    // Presión larga en el copo de nieve (3 segundos) - acceso al refugio
    snowflake.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            document.body.classList.remove('kids-mode');
            profileScreen.classList.add('d-none');
            bypassModal.show();
        }, 3000);
    });
    snowflake.addEventListener('mouseup', () => clearTimeout(pressTimer));
    snowflake.addEventListener('touchstart', (e) => {
        e.preventDefault();
        pressTimer = setTimeout(() => {
            document.body.classList.remove('kids-mode');
            profileScreen.classList.add('d-none');
            bypassModal.show();
        }, 3000);
    });
    snowflake.addEventListener('touchend', () => clearTimeout(pressTimer));

    // Lógica del bypass (triángulo a verde + palabra clave)
    const triangle = document.getElementById('drag-triangle');
    const dropGreen = document.getElementById('drop-green');
    const verifyBtn = document.getElementById('verify-bypass');
    const keyInput = document.getElementById('secret-key');
    const errorDiv = document.getElementById('bypass-error');

    if (triangle && dropGreen) {
        triangle.addEventListener('dragstart', (e) => e.dataTransfer.setData('text/plain', 'triangle'));
        dropGreen.addEventListener('dragover', (e) => e.preventDefault());
        dropGreen.addEventListener('drop', (e) => {
            e.preventDefault();
            if (e.dataTransfer.getData('text/plain') === 'triangle') {
                dropGreen.style.backgroundColor = '#6fbf4c';
                dropGreen.setAttribute('data-dropped', 'true');
                errorDiv.innerText = '✅ Triángulo en verde correcto. Ahora escribe la palabra clave.';
            } else {
                errorDiv.innerText = '❌ Solo el triángulo puede ir aquí.';
            }
        });
    }

    verifyBtn.addEventListener('click', () => {
        const isDropped = dropGreen.getAttribute('data-dropped') === 'true';
        const keyword = keyInput.value.trim().toLowerCase();
        if (isDropped && (keyword === 'gallodepelea' || keyword === 'pijamacorta')) {
            bypassModal.hide();
            refugeZone.classList.remove('d-none');
            dropGreen.setAttribute('data-dropped', 'false');
            dropGreen.style.backgroundColor = '';
            keyInput.value = '';
            errorDiv.innerText = '';
        } else {
            errorDiv.innerText = 'Acceso denegado. Asegura el triángulo en verde y escribe "gallodepelea" o "pijamacorta".';
        }
    });

    // Botones de volver
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const zone = btn.getAttribute('data-zone');
            if (zone === 'kids') {
                kidsZone.classList.add('d-none');
                document.body.classList.remove('kids-mode');
            } else if (zone === 'refuge') {
                refugeZone.classList.add('d-none');
                const stopBtn = document.getElementById('stop-sound');
                if (stopBtn) stopBtn.click();
            }
            profileScreen.classList.remove('d-none');
        });
    });

    // Cambio entre juegos (figuras / colores)
    const gameBtns = document.querySelectorAll('[data-game]');
    gameBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            gameBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const game = btn.getAttribute('data-game');
            if (game === 'shapes') {
                document.getElementById('shapes-game-container').classList.remove('d-none');
                document.getElementById('colors-game-container').classList.add('d-none');
            } else {
                document.getElementById('shapes-game-container').classList.add('d-none');
                document.getElementById('colors-game-container').classList.remove('d-none');
            }
        });
    });
});

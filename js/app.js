// app.js - Control maestro de la aplicación
document.addEventListener('DOMContentLoaded', () => {
    const profileScreen = document.getElementById('profile-screen');
    const kidsZone = document.getElementById('kids-zone');
    const refugeZone = document.getElementById('refuge-zone');
    const kidsBtn = document.getElementById('kids-btn');
    const guardianBtn = document.getElementById('guardian-btn');
    const backBtns = document.querySelectorAll('.btn-back');
    const snowflake = document.getElementById('secret-snowflake');
    const bypassModal = new bootstrap.Modal(document.getElementById('bypassModal'));
    
    // Ir a zona infantil directamente
    kidsBtn.addEventListener('click', () => {
        profileScreen.classList.add('d-none');
        kidsZone.classList.remove('d-none');
    });
    
    // Bypass secreto para guardiana
    let pressTimer;
    snowflake.addEventListener('mousedown', () => {
        pressTimer = setTimeout(() => {
            bypassModal.show();
        }, 3000);
    });
    snowflake.addEventListener('mouseup', () => clearTimeout(pressTimer));
    snowflake.addEventListener('touchstart', (e) => {
        e.preventDefault();
        pressTimer = setTimeout(() => {
            bypassModal.show();
        }, 3000);
    });
    snowflake.addEventListener('touchend', () => clearTimeout(pressTimer));
    
    // Lógica del bypass (arrastrar triángulo a verde + palabra clave)
    const triangle = document.getElementById('drag-triangle');
    const dropGreen = document.getElementById('drop-green');
    const verifyBtn = document.getElementById('verify-bypass');
    const keyInput = document.getElementById('secret-key');
    const errorDiv = document.getElementById('bypass-error');
    
    if(triangle && dropGreen) {
        triangle.addEventListener('dragstart', (e) => {
            e.dataTransfer.setData('text/plain', 'triangle');
        });
        dropGreen.addEventListener('dragover', (e) => e.preventDefault());
        dropGreen.addEventListener('drop', (e) => {
            e.preventDefault();
            const data = e.dataTransfer.getData('text/plain');
            if(data === 'triangle') {
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
        const validKeywords = ['gallodepelea', 'pijamacorta'];
        if (isDropped && validKeywords.includes(keyword)) {
            // Acceso concedido
            bypassModal.hide();
            profileScreen.classList.add('d-none');
            refugeZone.classList.remove('d-none');
            // Limpiar estado del bypass
            dropGreen.setAttribute('data-dropped', 'false');
            dropGreen.style.backgroundColor = '';
            keyInput.value = '';
            errorDiv.innerText = '';
        } else {
            errorDiv.innerText = 'Acceso denegado. Asegura el triángulo en verde y la palabra correcta.';
        }
    });
    
    // Botones de volver a perfil
    backBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const zone = btn.getAttribute('data-zone');
            if (zone === 'kids') {
                kidsZone.classList.add('d-none');
            } else if (zone === 'refuge') {
                refugeZone.classList.add('d-none');
                // Detener sonidos al salir
                if (typeof stopRefugeSound === 'function') stopRefugeSound();
                else {
                    const stopBtn = document.getElementById('stop-sound');
                    if(stopBtn) stopBtn.click();
                }
            }
            profileScreen.classList.remove('d-none');
        });
    });
});
const butterflyMessages = [
    "Sé que estás agotada en esa sala de espera, mi sobreviviente hermosa. Lo estás haciendo increíble con tu papá y tus niños. Te admiro y te amo.",
    "Confirmado: las mariposas que me haces sentir en la panza ya parecen zoológico completo. Me traes como morro de secundaria.",
    "Cada vez que el estrés aprieta, recuerda que allá afuera hay una cabaña fría esperándonos. Tú y yo, café y abrazos. Eres mi lugar seguro.",
    "Tus dolores de cabeza no pueden con tu fortaleza. Pero si necesitas descansar, cierra los ojos y siente el viento de la montaña. Estoy aquí.",
    "Gracias por hacer mejores mis días. Eres la razón por la que el frío se siente cálido."
];
document.getElementById('mariposas-btn')?.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * butterflyMessages.length);
    const msgDiv = document.getElementById('mariposas-message');
    msgDiv.innerHTML = `🦋 ${butterflyMessages[randomIndex]} 🦋`;
    msgDiv.style.opacity = '0';
    setTimeout(() => msgDiv.style.opacity = '1', 50);
});
document.getElementById('closet-btn')?.addEventListener('click', () => {
    document.getElementById('closet-message').innerHTML = `“Los niños ya aprendieron sus figuras hoy, ya descansan. Ahora este espacio es nuestro. El frío de la montaña, el café y mis brazos te esperan para cuando estrenes esa pijama corta frente a la chimenea. Descansa, mi niña hermosa, gracias por hacer mejores tus días.” ❄️🔥`;
});
let audioCtx = null, activeSources = null, isPlaying = false;
function createWindAndRain() {
    if (audioCtx) audioCtx.close();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = 4096;
    const whiteNoise = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = whiteNoise.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const noiseSource = audioCtx.createBufferSource();
    noiseSource.buffer = whiteNoise;
    noiseSource.loop = true;
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 800;
    const gain = audioCtx.createGain();
    gain.gain.value = 0.3;
    noiseSource.connect(filter); filter.connect(gain); gain.connect(audioCtx.destination);
    noiseSource.start();
    const rainBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const rainData = rainBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) rainData[i] = (Math.random() - 0.5) * 0.5;
    const rainSource = audioCtx.createBufferSource();
    rainSource.buffer = rainBuffer;
    rainSource.loop = true;
    const rainGain = audioCtx.createGain();
    rainGain.gain.value = 0.2;
    rainSource.connect(rainGain); rainGain.connect(audioCtx.destination);
    rainSource.start();
    return { noiseSource, rainSource };
}
document.getElementById('sonic-relief')?.addEventListener('click', () => {
    if (isPlaying) { if (activeSources) { activeSources.noiseSource.stop(); activeSources.rainSource.stop(); } if (audioCtx) audioCtx.close(); isPlaying = false; }
    activeSources = createWindAndRain();
    isPlaying = true;
    audioCtx.resume();
});
document.getElementById('stop-sound')?.addEventListener('click', () => {
    if (activeSources) { activeSources.noiseSource.stop(); activeSources.rainSource.stop(); if (audioCtx) audioCtx.close(); isPlaying = false; audioCtx = null; }
});
document.getElementById('darken-screen')?.addEventListener('change', (e) => {
    let overlay = document.querySelector('.darken-overlay');
    if (e.target.checked) {
        if (!overlay) {
            overlay = document.createElement('div');
            overlay.className = 'darken-overlay';
            document.body.appendChild(overlay);
        }
    } else {
        if (overlay) overlay.remove();
    }
});

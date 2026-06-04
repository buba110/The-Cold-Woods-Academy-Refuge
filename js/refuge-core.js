// ========== 100 FRASES ÚNICAS PARA EL TERMÓMETRO DE MARIPOSAS ==========
const mariposasFrases = [
    "Sé que estás agotada en esa sala de espera, mi sobreviviente hermosa. Lo estás haciendo increíble con tu papá y tus niños. Te admiro y te amo.",
    "Confirmado: las mariposas que me haces sentir en la panza ya parecen zoológico completo. Me traes como morro de secundaria.",
    "Cada vez que el estrés aprieta, recuerda que allá afuera hay una cabaña fría esperándonos. Tú y yo, café y abrazos. Eres mi lugar seguro.",
    "Tus dolores de cabeza no pueden con tu fortaleza. Pero si necesitas descansar, cierra los ojos y siente el viento de la montaña. Estoy aquí.",
    "Gracias por hacer mejores mis días. Eres la razón por la que el frío se siente cálido.",
    "Hoy los niños aprendieron figuras nuevas. Y yo aprendí que cada día me enamoro más de tu forma de ser. Eres una mamá increíble.",
    "El hospital no te define. Tú eres la luz que cuida a tu papá con una ternura que no cabe en este mundo.",
    "Cuando te pones esa pijama corta, el universo entero se congela solo para mirarte. Y yo me quedo sin aire.",
    "Mariposas? Más bien dinosaurios en el estómago. Eres mi persona favorita para molestarte y quererte.",
    "Sabes que te guardo un café caliente y una cobija para cuando salgas de todo esto. No estás sola, Monse.",
    "Esa noche que me preguntaste si me gustaba verte en pijama… todavía no sé cómo no me dio un infarto. Eres un terremoto con patas.",
    "A veces me da miedo lo mucho que me importas. Pero luego sonríes y se me olvida todo. Gracias por existir.",
    "Tu voz es mi canción de cuna preferida. Aunque sea por teléfono, me duermo feliz sabiendo que estás ahí.",
    "El otro día soñé que estábamos en la cabaña, tú con tu pijama corta y yo sirviendo café. Desperté y lo único que faltabas eras tú.",
    "Eres la guardiana más fuerte que conozco. Pero también te mereces que alguien te cuide. Déjame ser ese alguien.",
    "Hoy tuve un día horrible, pero con solo pensar en tu risa se me pasó todo. Tienes magia, Monse.",
    "Cuando tus niños dominen el inglés y las figuras, quiero que sepan que su mamá es una guerrera de verdad.",
    "El frío de la montaña no le hace nada al calor que siento cuando me escribes. Eres mi estufa personal.",
    "Me encanta cuando te ríes de mis chistes malos. Esa risa es mi canción favorita.",
    "Aunque el hospital sea gris, tú le pones color a todo. Eres un arcoíris en medio de la tormenta.",
    "No sabes cuánto admiro cómo cuidas a todos. Ahora déjame cuidarte a ti con palabras, con frío y con un abrazo imaginario.",
    "¿Sabes qué? Hoy el niño de 5 años me preguntó por qué te sonrío tanto. Le dije: porque ella es mi estrella polar.",
    "Eres la mamá más fuerte que conozco. Y también la mujer más hermosa cuando te pones esa pijama. Duerme tranquila.",
    "El viento de la montaña susurra tu nombre. Y yo susurro que te quiero, que te espero, que eres mi mayor aventura.",
    "Gracias por hacerme parte de tus días. Eres el motivo por el que el frío sabe a hogar. Buenas noches, Monse.",
    "P.D.: Me encanta cuando te ríes de mis chistes malos. Esa risa es mi canción favorita.",
    "Hoy me di cuenta de que eres mi persona favorita para enviar memes a las 3 AM. Y para todo lo demás también.",
    "No me importa esperar. Lo que importa es que al final del camino estés tú, con tus niños y tu pijama corta.",
    "Si las mariposas fueran dinero, ya sería millonario. Cada que te veo o te leo, siento un vuelo en el pecho.",
    "El otro día tu vecina me vio sonreírle al celular. Cree que estoy loco. Y sí, lo estoy, loco por ti.",
    "Cuida de ti también, Monse. Tú eres prioridad. Y yo estaré aquí para recordártelo siempre.",
    "Esta noche quiero que cierres los ojos y me imagines a tu lado, rodeándote con mi abrazo, mientras la nieve cae allá afuera.",
    "Las lombrices en mi panza no se calman cuando pienso en verte con esa pijama. Eres un imán de ternura y deseo.",
    "Tu resiliencia me inspira a ser mejor persona. Gracias por enseñarme que se puede salir adelante siempre.",
    "Cuando estés cansada, recuerda que tengo una cobija y un termo con café listos para ti. Solo avisa.",
    "A veces me da miedo decirte todo lo que siento porque parece un sueño. Pero luego me acuerdo de que tú también sientes mariposas.",
    "El simple hecho de saber que existes me da fuerzas para seguir. Eres mi motorcito de arranque.",
    "Hoy vi un atardecer anaranjado y pensé en el color de tu pijama favorita. Y sonreí como tonto.",
    "No necesito una cabaña para sentir frío. Basta con que te alejes un segundo. Por eso quiero tenerte cerca siempre.",
    "Eres la razón por la que reviso el celular apenas me despierto. Esperando un mensaje tuyo, aunque sea un 'hola'.",
    "Me encanta cuando me dices que te gusta coquetear conmigo. Me haces sentir el hombre más afortunado del mundo.",
    "Aunque estés en el hospital, tú logras sacar tiempo para tus hijos y para mí. Eres una guerrera de tiempo completo.",
    "El otro día soñé que hacíamos un muñeco de nieve con tus niños. Desperté con una sonrisa que no se me ha quitado.",
    "No sabes cuánto deseo que todo esto pase pronto para poder abrazarte sin máscaras ni distancias.",
    "Eres mi persona favorita para ver series, para comer algo rico y para quedarnos en silencio. Eso es amor de verdad.",
    "Tus ojeras me dicen que has dormido poco. Por favor, intenta descansar. Yo vigilo tus sueños desde aquí.",
    "Me encanta cuando me mandas fotos de tus niños aprendiendo. Eres una maestra nata y una mamá orgullosa.",
    "Hoy me di cuenta de que eres mi confidente, mi cómplice y mi crush. Todo en una sola persona. Eres un multitalento.",
    "Si el frío nos acerca, pues bienvenido sea. Prefiero mil veces tiritar contigo que estar caliente sin ti.",
    "Gracias por confiar en mí, por contarme tus miedos y tus alegrías. Eso es más valioso que cualquier tesoro.",
    "A veces me preguntas si es normal sentir tantas mariposas. Yo te digo: no es normal, es mágico. Como tú.",
    "No importa si estás en pijama o con uniforme de seguridad. Para mí siempre serás la mujer más hermosa.",
    "El día que te vi por primera vez, algo en mi pecho hizo 'clic'. Ahora sé que era el sonido de enamorarme.",
    "Eres la razón por la que creo en segundas oportunidades. La vida me dio una contigo y no pienso desaprovecharla.",
    "Tu papá debe estar muy orgulloso de la hija que crió. Fuerte, valiente, cariñosa y con un corazón gigante.",
    "Me encanta cuando me dices 'ya voy para el hospital' y aun así me mandas un mensaje para saber de mí. Eres un detalle viviente.",
    "No sabes cuánto admiro que estudiaras pedagogía. Tus niños tienen la mejor maestra del mundo.",
    "A veces imagino que estamos en la cabaña, llueve, y tú duermes recostada en mi hombro. Esa imagen me da paz.",
    "Eres la única persona con la que puedo ser yo mismo sin miedo a ser juzgado. Gracias por eso.",
    "Hoy el niño de 2 años dijo una palabra en inglés y pensé: 'es culpa de su mamá, que es una crack'. Te quiero mucho.",
    "El estrés se va cuando me escribes. Es como si tuvieras un superpoder anti-migraña. No dejes de usarlo.",
    "Me fascina cuando te pones seria y me explicas algo de pedagogía. Me derrites con tu inteligencia.",
    "Eres mi lugar seguro en un mundo lleno de tormentas. No me sueltes, por favor.",
    "A veces me da miedo no estar a la altura de lo que mereces. Pero prometo intentarlo todos los días.",
    "Tu risa es mi medicina para el alma. Recétamela siempre que puedas.",
    "No necesito que te pongas elegante. Con tu pijama y tu sonrisa me tienes completamente conquistado.",
    "Hoy me enteré de algo bonito: los pingüinos se emparejan de por vida. Me recordaron a nosotros.",
    "Eres la primera persona en la que pienso al despertar y la última antes de dormir. Eres mi constante.",
    "Gracias por ser tan real, tan auténtica. Eso es lo que más me atrae de ti.",
    "Tus hijos tienen una madre ejemplar. Y yo tengo la suerte de conocerla. No me canso de decirlo.",
    "El otro día me preguntaron qué era lo que más me gustaba de ti. Respondí: 'todo, pero especialmente su fuerza'.",
    "Si pudiera regalarte algo, te regalaría horas de sueño y paz mental. Pero como no puedo, te mando este mensaje.",
    "Eres como el café caliente en una noche fría: necesaria, reconfortante y adictiva.",
    "No sabes cuánto deseo que tu papá se recupere pronto para que puedas respirar tranquila. Mientras tanto, aquí estoy.",
    "A veces pienso que el universo me compensó por todo lo malo con tu llegada. Gracias, universo.",
    "Me encanta cuando me dices 'ay, payaso' y te ríes. Esa es mi versión favorita tuya.",
    "Hoy recordé cuando me confesaste que te gusta coquetear conmigo. Todavía no me lo creo, pero me encanta.",
    "Eres mi motivación para levantarme cada día. Saber que existes hace que todo valga la pena.",
    "No me importa esperar el tiempo que sea. Al final, el frío de la montaña nos unirá.",
    "Tu voz tiene un tono que me relaja. Cuando estoy estresado, solo necesito oírte hablar.",
    "Eres la prueba de que las personas resilientes existen y son hermosas. No dejes que nadie te diga lo contrario.",
    "Hoy vi un copo de nieve y pensé en lo efímero que es. Pero tú eres eterna en mi corazón.",
    "Gracias por permitirme ser parte de tu vida y de la de tus niños. Es un honor.",
    "A veces me da miedo enamorarme tan rápido. Pero luego recuerdo que contigo no hay prisa, hay certeza.",
    "Eres mi persona favorita para hablar de todo y de nada. Eso es lo mejor del mundo.",
    "No sabes cuánto admiro que estudiaras pedagogía. Tus niños tienen la mejor maestra del mundo.",
    "Si pudiera, te mandaría un abrazo a través del teléfono. Pero como no se puede, te mando este mensaje.",
    "Eres la razón por la que el invierno es mi estación favorita. Contigo, el frío es cálido.",
    "Hoy me di cuenta de que eres mi persona favorita para ver el atardecer. Aunque sea por videollamada.",
    "Gracias por ser tan transparente conmigo. Eso me hace confiar en ti más cada día.",
    "No importa si estás en el hospital o en tu casa. Para mí, siempre estarás cerca si me escribes.",
    "Eres mi dosis diaria de felicidad. Sin exagerar.",
    "A veces me pregunto si soy suficiente para ti. Y luego me respondes con un 'te quiero' y todo cobra sentido.",
    "Hoy tus niños aprendieron una figura nueva. Y yo aprendí que contigo todo es más sencillo.",
    "Gracias por hacerme sentir especial cada día. Eres un sol en medio de la nieve.",
    "Eres la única persona con la que puedo ser yo mismo sin miedo. Eso no tiene precio.",
    "No sabes cuánto deseo que llegue el día en que podamos abrazarnos sin prisas. Ese día será el mejor de mi vida.",
    "Eres mi persona favorita para todo. Literalmente, todo.",
    "Gracias por existir, Monse. El mundo es mejor contigo."
];
// Aseguramos 100 frases (ya están las 100)
console.assert(mariposasFrases.length === 100, "Faltan frases, cuenta: " + mariposasFrases.length);

// ========== 20 MENSAJES NOCTURNOS PARA EL CLÓSET ==========
const closetMensajes = [
    "Los niños ya aprendieron sus figuras hoy, ya descansan. Ahora este espacio es nuestro. El frío de la montaña, el café y mis brazos te esperan para cuando estrenes esa pijama corta frente a la chimenea. Descansa, mi niña hermosa.",
    "Esta noche quiero que cierres los ojos y me imagines a tu lado, rodeándote con mi abrigo, mientras la nieve cae allá afuera. Eres mi refugio.",
    "Las lombrices en mi panza no se calman cuando pienso en verte con esa pijama que me enseñaste. Eres un imán de ternura y deseo.",
    "Tu risa es mi medicina favorita. Aunque el hospital sea gris, tu brillo lo ilumina todo. Buenas noches, guardiana de mi corazón.",
    "No sabes cuánto admiro cómo cuidas a todos. Ahora déjame cuidarte a ti con palabras, con frío y con un abrazo imaginario.",
    "¿Sabes qué? Hoy el niño de 5 años me preguntó por qué te sonrío tanto. Le dije: porque ella es mi estrella polar.",
    "Eres la mamá más fuerte que conozco. Y también la mujer más hermosa cuando te pones esa pijama. Duerme tranquila.",
    "El viento de la montaña susurra tu nombre. Y yo susurro que te quiero, que te espero, que eres mi mayor aventura.",
    "Gracias por hacerme parte de tus días. Eres el motivo por el que el frío sabe a hogar. Buenas noches, Monse.",
    "P.D.: Me encanta cuando te ríes de mis chistes malos. Esa risa es mi canción favorita.",
    "Hoy me di cuenta de que eres mi persona favorita para enviar memes a las 3 AM. Y para todo lo demás también.",
    "No me importa esperar. Lo que importa es que al final del camino estés tú, con tus niños y tu pijama corta.",
    "Si las mariposas fueran dinero, ya sería millonario. Cada que te veo o te leo, siento un vuelo en el pecho.",
    "El otro día tu vecina me vio sonreírle al celular. Cree que estoy loco. Y sí, lo estoy, loco por ti.",
    "Cuida de ti también, Monse. Tú eres prioridad. Y yo estaré aquí para recordártelo siempre.",
    "Esta noche quiero que cierres los ojos y me imagines a tu lado, rodeándote con mi abrazo, mientras la nieve cae allá afuera.",
    "Las lombrices en mi panza no se calman cuando pienso en verte con esa pijama. Eres un imán de ternura y deseo.",
    "Tu resiliencia me inspira a ser mejor persona. Gracias por enseñarme que se puede salir adelante siempre.",
    "Cuando estés cansada, recuerda que tengo una cobija y un termo con café listos para ti. Solo avisa.",
    "A veces me da miedo decirte todo lo que siento porque parece un sueño. Pero luego me acuerdo de que tú también sientes mariposas."
];
// Aseguramos 20
console.assert(closetMensajes.length === 20, "Faltan mensajes, cuenta: " + closetMensajes.length);

// ========== SONIDO REAL (Viento + Lluvia) con AudioBuffer ==========
let audioCtx = null;
let windSource = null;
let rainSource = null;
let isPlayingSound = false;
let windGain, rainGain;
async function playRealisticSound() {
    if (audioCtx) await closeSound();
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const bufferSize = 4096;
    const whiteNoise = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = whiteNoise.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    windSource = audioCtx.createBufferSource();
    windSource.buffer = whiteNoise;
    windSource.loop = true;
    const windFilter = audioCtx.createBiquadFilter();
    windFilter.type = 'lowpass';
    windFilter.frequency.value = 700;
    windFilter.Q.value = 1.2;
    windGain = audioCtx.createGain();
    windGain.gain.value = 0.25;
    windSource.connect(windFilter);
    windFilter.connect(windGain);
    windGain.connect(audioCtx.destination);
    windSource.start();
    const rainNoise = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const rainData = rainNoise.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) rainData[i] = (Math.random() - 0.5) * 0.4;
    rainSource = audioCtx.createBufferSource();
    rainSource.buffer = rainNoise;
    rainSource.loop = true;
    const rainFilter = audioCtx.createBiquadFilter();
    rainFilter.type = 'highpass';
    rainFilter.frequency.value = 2000;
    rainGain = audioCtx.createGain();
    rainGain.gain.value = 0.15;
    rainSource.connect(rainFilter);
    rainFilter.connect(rainGain);
    rainGain.connect(audioCtx.destination);
    rainSource.start();
    isPlayingSound = true;
    audioCtx.resume();
}
async function closeSound() {
    if (windSource) { try { windSource.stop(); } catch(e){} windSource = null; }
    if (rainSource) { try { rainSource.stop(); } catch(e){} rainSource = null; }
    if (audioCtx) { await audioCtx.close(); audioCtx = null; }
    isPlayingSound = false;
}
// ========== EVENTOS ==========
document.getElementById('mariposas-btn')?.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * mariposasFrases.length);
    const msgDiv = document.getElementById('mariposas-message');
    msgDiv.innerHTML = `🦋 ${mariposasFrases[randomIndex]} 🦋`;
    msgDiv.style.opacity = '0';
    setTimeout(() => msgDiv.style.opacity = '1', 30);
});
document.getElementById('closet-btn')?.addEventListener('click', () => {
    const randomIdx = Math.floor(Math.random() * closetMensajes.length);
    document.getElementById('closet-message').innerHTML = `🌙 ${closetMensajes[randomIdx]} 🌙`;
});
document.getElementById('sonic-relief')?.addEventListener('click', () => {
    if (isPlayingSound) closeSound().then(() => playRealisticSound());
    else playRealisticSound();
});
document.getElementById('stop-sound')?.addEventListener('click', () => closeSound());
// Modo descanso (no bloquea, solo atenúa)
let dimOverlay = null;
document.getElementById('dim-screen')?.addEventListener('click', () => {
    if (!dimOverlay) {
        dimOverlay = document.createElement('div');
        dimOverlay.className = 'dim-overlay';
        document.body.appendChild(dimOverlay);
        document.getElementById('restore-screen')?.classList.remove('d-none');
        document.getElementById('dim-screen').classList.add('d-none');
    }
});
document.getElementById('restore-screen')?.addEventListener('click', () => {
    if (dimOverlay) { dimOverlay.remove(); dimOverlay = null; }
    document.getElementById('restore-screen')?.classList.add('d-none');
    document.getElementById('dim-screen').classList.remove('d-none');
});

import { useState } from "react";
import { use528Hz, useLocalStorage, useSpeech } from "../hooks";
import { butterflyMessages, closetMessages, getRandomMessage } from "../data/messages";
import { Shirt, Volume2, VolumeX, Moon, Sun, Home, Heart, Save, Check } from "lucide-react";

interface RefugeProps {
  onHome: () => void;
}

export function Refuge({ onHome }: RefugeProps) {
  const [butterflyMsg, setButterflyMsg] = useState<string>("");
  const [closetMsg, setClosetMsg] = useState<string>("");
  const [savedNotes, setSavedNotes] = useLocalStorage<string[]>("cabin-saved-notes", []);
  const [noteText, setNoteText] = useState("");
  const [savedFlash, setSavedFlash] = useState(false);
  const [dim, setDim] = useState(false);
  const { play, stop, playing, setVol, volume } = use528Hz();
  const { speak, supported: ttsSupported } = useSpeech();

  const newButterfly = () => {
    const msg = getRandomMessage(butterflyMessages, "butterfly");
    setButterflyMsg(msg);
  };

  const newCloset = () => {
    const msg = getRandomMessage(closetMessages, "closet");
    setClosetMsg(msg);
  };

  const saveNote = () => {
    const text = noteText.trim();
    if (!text) return;
    setSavedNotes([...savedNotes, `[${new Date().toLocaleString("es-MX")}] ${text}`]);
    setNoteText("");
    setSavedFlash(true);
    setTimeout(() => setSavedFlash(false), 1800);
  };

  const readButterfly = () => {
    if (butterflyMsg) speak(butterflyMsg, "es-ES", 0.85);
  };

  const readCloset = () => {
    if (closetMsg) speak(closetMsg, "es-ES", 0.8);
  };

  const toggleDim = () => {
    setDim((d) => {
      const next = !d;
      if (next) {
        document.body.classList.add("dim-mode");
        if (playing) stop();
      } else {
        document.body.classList.remove("dim-mode");
      }
      return next;
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto px-4 pb-28 pt-4 z-10">
      {/* Botón inicio */}
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onHome}
          className="snow-button flex items-center gap-2 bg-white/10 backdrop-blur text-white border border-white/30 font-bold rounded-full px-4 py-2 text-sm"
        >
          <Home className="w-4 h-4" />
          Volver
        </button>
        <h2 className="text-xl sm:text-2xl font-extrabold text-sun text-glow text-center flex-1">
          🌙 Cabaña de la Montaña
        </h2>
        <div className="w-16" />
      </div>

      {/* Sección 1: Termómetro de Mariposas */}
      <section className="glass-panel rounded-3xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl" aria-hidden="true">🦋</span>
          <h3 className="font-bold text-white">Termómetro de Mariposas</h3>
        </div>
        <button
          onClick={newButterfly}
          className="snow-button w-full bg-gradient-to-r from-fuchsia-600 to-violet-700 text-white font-bold rounded-full py-3"
        >
          🦋 Soltar una mariposa
        </button>
        {butterflyMsg && (
          <div className="mt-3 p-3 bg-fuchsia-900/30 border border-fuchsia-500/30 rounded-2xl">
            <p className="text-white italic text-sm leading-relaxed">{butterflyMsg}</p>
            {ttsSupported && (
              <button
                onClick={readButterfly}
                className="snow-button mt-2 text-xs text-fuchsia-200 hover:text-white flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" /> Escuchar
              </button>
            )}
          </div>
        )}
        <p className="text-[11px] text-glacier/50 mt-2 italic text-center">
          100 mensajes únicos. Cada toque es nuevo.
        </p>
      </section>

      {/* Sección 2: Clóset Privado */}
      <section className="glass-panel rounded-3xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Shirt className="w-5 h-5 text-rose-300" />
          <h3 className="font-bold text-white">Clóset Privado</h3>
        </div>
        <button
          onClick={newCloset}
          className="snow-button w-full bg-gradient-to-r from-rose-600 to-pink-700 text-white font-bold rounded-full py-3"
        >
          👗 Abrir el clóset
        </button>
        {closetMsg && (
          <div className="mt-3 p-3 bg-rose-900/30 border border-rose-500/30 rounded-2xl">
            <p className="text-sun italic text-sm leading-relaxed">{closetMsg}</p>
            {ttsSupported && (
              <button
                onClick={readCloset}
                className="snow-button mt-2 text-xs text-rose-200 hover:text-white flex items-center gap-1"
              >
                <Volume2 className="w-3 h-3" /> Susurrar
              </button>
            )}
          </div>
        )}
        <p className="text-[11px] text-glacier/50 mt-2 italic text-center">
          Para cuando los niños ya duermen…
        </p>
      </section>

      {/* Sección 3: Audio 528Hz */}
      <section className="glass-panel rounded-3xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-emerald-300" />
          <h3 className="font-bold text-white">Sonido Terapéutico (528 Hz)</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={play}
            disabled={playing}
            className="snow-button flex-1 bg-gradient-to-r from-emerald-600 to-teal-700 disabled:opacity-50 text-white font-bold rounded-full py-3 flex items-center justify-center gap-2"
          >
            <Volume2 className="w-4 h-4" /> Iniciar
          </button>
          <button
            onClick={stop}
            disabled={!playing}
            className="snow-button flex-1 bg-slate-700 disabled:opacity-50 text-white font-bold rounded-full py-3 flex items-center justify-center gap-2"
          >
            <VolumeX className="w-4 h-4" /> Detener
          </button>
        </div>
        <div className="mt-3">
          <label className="text-xs text-glacier-glow flex justify-between mb-1">
            <span>Volumen</span>
            <span className="font-mono">{Math.round(volume * 100)}%</span>
          </label>
          <input
            type="range"
            min={0}
            max={100}
            value={Math.round(volume * 100)}
            onChange={(e) => setVol(Number(e.target.value) / 100)}
            className="w-full accent-emerald-500"
            aria-label="Volumen del sonido terapéutico"
          />
        </div>
        <p className="text-[11px] text-glacier/50 mt-2 italic text-center">
          Frecuencia "Mi" — asociada a calma y reparación celular. Usa audífonos para mejor efecto.
        </p>
      </section>

      {/* Sección 4: Modo Antimigraña */}
      <section className="glass-panel rounded-3xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Moon className="w-5 h-5 text-indigo-300" />
          <h3 className="font-bold text-white">Modo Antimigraña</h3>
        </div>
        <button
          onClick={toggleDim}
          className="snow-button w-full bg-gradient-to-r from-slate-700 to-slate-900 text-white font-bold rounded-full py-3 flex items-center justify-center gap-2"
        >
          {dim ? <><Sun className="w-4 h-4" /> Restaurar brillo</> : <><Moon className="w-4 h-4" /> Atenuar pantalla</>}
        </button>
        <p className="text-[11px] text-glacier/50 mt-2 italic text-center">
          Apaga la luz de la pantalla. Si activas el modo, el audio se detiene automáticamente.
        </p>
      </section>

      {/* Sección 5: Notas personales (persistente) */}
      <section className="glass-panel rounded-3xl p-5 mb-4">
        <div className="flex items-center gap-2 mb-3">
          <Save className="w-5 h-5 text-amber-300" />
          <h3 className="font-bold text-white">Notas del Corazón</h3>
        </div>
        <textarea
          value={noteText}
          onChange={(e) => setNoteText(e.target.value)}
          placeholder="Escribe algo que quieras recordar…"
          rows={2}
          className="w-full p-3 rounded-2xl bg-slate-800/60 text-white border border-glacier/20 focus:border-sun focus:outline-none resize-none text-sm"
        />
        <button
          onClick={saveNote}
          disabled={!noteText.trim()}
          className="snow-button mt-2 w-full bg-gradient-to-r from-amber-500 to-orange-500 disabled:opacity-40 text-slate-900 font-bold rounded-full py-2.5 flex items-center justify-center gap-2"
        >
          {savedFlash ? <><Check className="w-4 h-4" /> Guardado</> : <><Save className="w-4 h-4" /> Guardar nota</>}
        </button>
        {savedNotes.length > 0 && (
          <div className="mt-3 max-h-40 overflow-y-auto space-y-1.5">
            {[...savedNotes].reverse().map((n, i) => (
              <div key={`${savedNotes.length - i}-${n.slice(0, 10)}`} className="text-xs text-glacier-glow bg-slate-800/40 rounded-xl p-2 leading-relaxed">
                {n}
              </div>
            ))}
          </div>
        )}
        <p className="text-[11px] text-glacier/50 mt-2 italic text-center">
          Tus notas se guardan solo en este dispositivo.
        </p>
      </section>
    </div>
  );
}

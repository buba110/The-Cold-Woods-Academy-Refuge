import { useEffect, useRef, useState } from "react";
import { useLocalStorage, useSpeech } from "../hooks";
import {
  shapes, paintColors, memoryEmojis, stories, monsterParts, clothingItems,
} from "../data/activities";
import {
  ArrowLeft, RefreshCw, Check, X, Volume2, Eraser, Sparkles, Save, Trash2,
} from "lucide-react";

interface ActivityFrameProps {
  title: string;
  emoji: string;
  onBack: () => void;
  children: React.ReactNode;
}

function ActivityFrame({ title, emoji, onBack, children }: ActivityFrameProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-3 sm:px-4 pb-28 pt-3">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="snow-button flex items-center gap-1 bg-white/50 backdrop-blur text-slate-800 font-bold rounded-full px-3 py-2 text-sm border border-white/60"
        >
          <ArrowLeft className="w-4 h-4" /> Menú
        </button>
        <h2 className="text-lg sm:text-xl font-extrabold text-slate-800 flex-1 flex items-center gap-2">
          <span className="text-2xl" aria-hidden="true">{emoji}</span>
          {title}
        </h2>
      </div>
      <div className="bg-white/85 backdrop-blur rounded-3xl p-4 sm:p-5 shadow-xl border-2 border-white">
        {children}
      </div>
    </div>
  );
}

// ============================================================
// 1. TODDLER (2 años): Toque y descubre (figuras gigantes con voz)
// ============================================================
export function ToddlerActivity({ onBack }: { onBack: () => void }) {
  const { speak, supported } = useSpeech();
  return (
    <ActivityFrame title="Tocar y descubrir (2 años)" emoji="👶" onBack={onBack}>
      <p className="text-center text-slate-600 text-sm mb-4">
        Toca cada figura y escucha su nombre.
      </p>
      <div className="responsive-grid">
        {shapes.map((s) => (
          <button
            key={s.name}
            onClick={() => speak(`${s.name}. ${s.nameEn}.`, "es-ES", 0.85)}
            className={`card-press ${s.bgClass} ${s.borderClass} border-4 rounded-3xl p-4 text-center`}
            aria-label={`Figura: ${s.name}`}
          >
            <div
              className="w-20 h-20 mx-auto mb-2"
              dangerouslySetInnerHTML={{ __html: s.svg }}
            />
            <div className="font-extrabold text-slate-800 text-base">{s.name}</div>
            <div className="text-xs text-slate-500">{s.nameEn}</div>
          </button>
        ))}
      </div>
      <p className="text-center text-xs text-slate-500 mt-4 italic">
        {supported ? "Toca una figura y yo la digo" : "Tu navegador no soporta voz"}
      </p>
    </ActivityFrame>
  );
}

// ============================================================
// 2. PRESCHOOL (5 años): Arrastre táctil + conteo real con validación
// ============================================================
type Challenge =
  | { type: "drag"; target: string; options: typeof shapes; instruction: string }
  | { type: "count"; correctNumber: number; options: number[]; emojis: string[]; instruction: string };

function makeChallenges(): Challenge[] {
  const pool = [...shapes];
  const dragChals: Challenge[] = pool.slice(0, 3).map((target) => ({
    type: "drag",
    target: target.name,
    instruction: `Arrastra el ${target.name} a la zona verde`,
    options: [...pool].sort(() => Math.random() - 0.5).slice(0, 3),
  }));

  const countChals: Challenge[] = [
    { type: "count", correctNumber: 2, options: [1, 2, 3], emojis: ["🐧", "🐧"], instruction: "¿Cuántos pingüinos hay?" },
    { type: "count", correctNumber: 3, options: [2, 3, 4], emojis: ["🐻", "🐻", "🐻"], instruction: "¿Cuántos osos hay?" },
    { type: "count", correctNumber: 4, options: [3, 4, 5], emojis: ["🦊", "🦊", "🦊", "🦊"], instruction: "¿Cuántos zorros hay?" },
    { type: "count", correctNumber: 1, options: [1, 2, 3], emojis: ["🐼"], instruction: "¿Cuántos pandas hay?" },
  ];

  // Mezclar
  return [...dragChals, ...countChals].sort(() => Math.random() - 0.5);
}

export function PreschoolActivity({ onBack }: { onBack: () => void }) {
  const [challenges] = useState<Challenge[]>(() => makeChallenges());
  const [idx, setIdx] = useState(0);
  const [feedback, setFeedback] = useState<"none" | "ok" | "fail">("none");
  const [shake, setShake] = useState(false);
  const [draggedName, setDraggedName] = useState<string | null>(null);
  const [overZone, setOverZone] = useState(false);
  const zoneRef = useRef<HTMLDivElement>(null);
  const { speak } = useSpeech();

  const current = challenges[idx];
  const finished = idx >= challenges.length;

  const speakInstruction = () => {
    if (current) speak(current.instruction, "es-ES", 0.9);
  };
  useEffect(() => {
    speakInstruction();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [idx]);

  const handleDragStart = (name: string) => (e: React.PointerEvent) => {
    setDraggedName(name);
    setFeedback("none");
    (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
  };

  const handleZonePointerMove = (e: React.PointerEvent) => {
    if (!draggedName) return;
    if (!zoneRef.current) return;
    const rect = zoneRef.current.getBoundingClientRect();
    const inside =
      e.clientX >= rect.left && e.clientX <= rect.right &&
      e.clientY >= rect.top && e.clientY <= rect.bottom;
    setOverZone(inside);
  };

  const handleZonePointerUp = () => {
    if (!draggedName || !current) return;
    if (current.type === "drag" && draggedName === current.target) {
      setFeedback("ok");
      speak("¡Muy bien!", "es-ES", 1);
      setTimeout(() => { next(); }, 1200);
    } else {
      setFeedback("fail");
      setShake(true);
      speak("Intenta otra vez", "es-ES", 1);
      setTimeout(() => { setShake(false); setFeedback("none"); setDraggedName(null); }, 900);
    }
    setOverZone(false);
  };

  const handleNumberPick = (n: number) => {
    if (current?.type !== "count") return;
    if (n === current.correctNumber) {
      setFeedback("ok");
      speak("¡Correcto!", "es-ES", 1);
      setTimeout(() => { next(); }, 1200);
    } else {
      setFeedback("fail");
      setShake(true);
      speak("Cuenta otra vez", "es-ES", 1);
      setTimeout(() => { setShake(false); setFeedback("none"); }, 900);
    }
  };

  const next = () => {
    setFeedback("none");
    setDraggedName(null);
    setIdx((i) => i + 1);
  };

  if (finished) {
    return (
      <ActivityFrame title="¡Lo lograste!" emoji="🎉" onBack={onBack}>
        <div className="text-center py-10">
          <div className="text-7xl mb-4 animate-tada inline-block">🌟</div>
          <h3 className="text-2xl font-extrabold text-slate-800">¡Eres genial!</h3>
          <p className="text-slate-600 mt-2">Completaste todos los desafíos.</p>
          <button
            onClick={() => { setIdx(0); }}
            className="snow-button mt-6 bg-gradient-to-r from-orange-400 to-amber-400 text-slate-900 font-bold rounded-full px-6 py-3 inline-flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4" /> Jugar de nuevo
          </button>
        </div>
      </ActivityFrame>
    );
  }

  return (
    <ActivityFrame title="5 años · Figuras y conteo" emoji="🧒" onBack={onBack}>
      {/* Progreso */}
      <div className="mb-4">
        <div className="flex justify-between text-xs text-slate-600 mb-1">
          <span>Desafío {idx + 1} de {challenges.length}</span>
          <button onClick={speakInstruction} className="text-sky-600 hover:text-sky-800 flex items-center gap-1">
            <Volume2 className="w-3 h-3" /> Escuchar
          </button>
        </div>
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-blue-500 transition-all"
            style={{ width: `${((idx) / challenges.length) * 100}%` }}
          />
        </div>
      </div>

      <p className="text-center text-slate-800 font-bold mb-4">{current.instruction}</p>

      {current.type === "drag" ? (
        <>
          <div
            ref={zoneRef}
            onPointerMove={handleZonePointerMove}
            onPointerUp={handleZonePointerUp}
            onPointerCancel={handleZonePointerUp}
            className={`mx-auto mb-5 rounded-3xl border-4 border-dashed flex items-center justify-center text-slate-700 font-bold transition-all ${
              overZone ? "border-emerald-500 bg-emerald-100 scale-105" : "border-emerald-300 bg-emerald-50/60"
            } ${shake ? "animate-[wiggle_0.4s]" : ""}`}
            style={{ minHeight: 120, touchAction: "none" }}
          >
            <div className="text-center">
              <div className="text-3xl mb-1">📦</div>
              <div className="text-sm">Suelta aquí el <span className="text-emerald-700">{current.target}</span></div>
            </div>
          </div>

          <div className="flex justify-center gap-3 flex-wrap">
            {current.options.map((o) => (
              <button
                key={o.name}
                onPointerDown={handleDragStart(o.name)}
                onPointerUp={() => {
                  // Si el dedo se suelta fuera de la zona, perdona
                  setDraggedName(null);
                  setOverZone(false);
                }}
                className={`${o.bgClass} ${o.borderClass} border-4 rounded-3xl p-3 w-24 text-center card-press touch-none ${
                  draggedName === o.name ? "opacity-50" : ""
                }`}
                style={{ touchAction: "none" }}
              >
                <div className="w-14 h-14 mx-auto" dangerouslySetInnerHTML={{ __html: o.svg }} />
                <div className="text-xs font-bold text-slate-700 mt-1">{o.name}</div>
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-3 my-6 text-5xl">
            {current.emojis.map((e, i) => <span key={i}>{e}</span>)}
          </div>
          <div className="flex justify-center gap-3 flex-wrap">
            {current.options.map((n) => (
              <button
                key={n}
                onClick={() => handleNumberPick(n)}
                className={`snow-button w-20 h-20 rounded-2xl bg-gradient-to-br from-sky-400 to-blue-500 text-white text-3xl font-extrabold shadow-lg`}
              >
                {n}
              </button>
            ))}
          </div>
        </>
      )}

      {feedback === "ok" && (
        <div className="mt-5 p-3 bg-emerald-100 border-2 border-emerald-400 rounded-2xl flex items-center gap-2 text-emerald-800 font-bold justify-center">
          <Check className="w-5 h-5" /> ¡Correcto!
        </div>
      )}
      {feedback === "fail" && (
        <div className="mt-5 p-3 bg-rose-100 border-2 border-rose-400 rounded-2xl flex items-center gap-2 text-rose-800 font-bold justify-center">
          <X className="w-5 h-5" /> Intenta otra vez
        </div>
      )}
    </ActivityFrame>
  );
}

// ============================================================
// 3. COLOR WORKSHOP: Taller de pintura
// ============================================================
export function ColorActivity({ onBack }: { onBack: () => void }) {
  const [color, setColor] = useState(paintColors[0].hex);
  const { speak } = useSpeech();
  return (
    <ActivityFrame title="Taller de Pintura" emoji="🎨" onBack={onBack}>
      <p className="text-center text-slate-600 text-sm mb-3">
        Elige un color y toca la montaña o el sol para pintarlo.
      </p>
      <div className="paint-palette flex gap-2 justify-center flex-wrap mb-4">
        {paintColors.map((c) => (
          <button
            key={c.name}
            onClick={() => { setColor(c.hex); speak(c.name, "es-ES", 1); }}
            className={`w-12 h-12 rounded-full ${c.class} border-4 snow-button ${
              color === c.hex ? "border-slate-900 scale-110" : "border-white"
            }`}
            aria-label={`Color ${c.name}`}
          />
        ))}
        <button
          onClick={() => { setColor("transparent"); speak("Borrador", "es-ES", 1); }}
          className={`w-12 h-12 rounded-full bg-white border-4 snow-button flex items-center justify-center ${
            color === "transparent" ? "border-slate-900 scale-110" : "border-slate-300"
          }`}
          aria-label="Borrador"
        >
          <Eraser className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      <svg viewBox="0 0 400 280" className="w-full bg-sky-100 rounded-2xl touch-none" role="img" aria-label="Escena para pintar">
        {/* Cielo */}
        <rect x="0" y="0" width="400" height="180" fill={color === "transparent" ? "#bae6fd" : color} className="cursor-pointer transition-colors" />
        {/* Sol */}
        <circle
          cx="320" cy="60" r="30"
          fill={color === "transparent" ? "#fde68a" : color}
          stroke="#92400e" strokeWidth="2"
          className="cursor-pointer transition-colors"
          onClick={() => speak(`Sol`, "es-ES", 1)}
        />
        {/* Nieve base */}
        <rect x="0" y="200" width="400" height="80" fill="#f8fafc" />
        {/* Montaña */}
        <polygon
          points="50,210 200,60 350,210"
          fill={color === "transparent" ? "#cbd5e1" : color}
          stroke="#1e293b" strokeWidth="3"
          className="cursor-pointer transition-colors"
          onClick={() => speak(`Montaña`, "es-ES", 1)}
        />
        {/* Pinos */}
        <g fill="#15803d">
          <polygon points="100,210 110,170 120,210" />
          <polygon points="280,210 290,165 300,210" />
        </g>
      </svg>
    </ActivityFrame>
  );
}

// ============================================================
// 4. MEMORY GAME: Memorama
// ============================================================
export function MemoryActivity({ onBack }: { onBack: () => void }) {
  const buildDeck = () => {
    const cards = [...memoryEmojis, ...memoryEmojis]
      .map((emoji, i) => ({ id: `${emoji}-${i}-${Math.random()}`, emoji, flipped: false, matched: false }))
      .sort(() => Math.random() - 0.5);
    return cards;
  };
  const [deck, setDeck] = useState(buildDeck);
  const [picked, setPicked] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [matches, setMatches] = useState(0);
  const { speak } = useSpeech();

  useEffect(() => {
    if (picked.length !== 2) return;
    setMoves((m) => m + 1);
    const [a, b] = picked;
    if (deck[a].emoji === deck[b].emoji) {
      setTimeout(() => {
        setDeck((d) => d.map((c, i) => i === a || i === b ? { ...c, matched: true } : c));
        setMatches((m) => m + 1);
        speak("¡Pareja!", "es-ES", 1);
        setPicked([]);
      }, 500);
    } else {
      setTimeout(() => {
        setDeck((d) => d.map((c, i) => i === a || i === b ? { ...c, flipped: false } : c));
        setPicked([]);
      }, 900);
    }
  }, [picked, deck, speak]);

  const flip = (i: number) => {
    if (picked.length >= 2 || deck[i].flipped || deck[i].matched) return;
    setDeck((d) => d.map((c, idx) => idx === i ? { ...c, flipped: true } : c));
    setPicked((p) => [...p, i]);
  };

  const reset = () => {
    setDeck(buildDeck());
    setPicked([]);
    setMoves(0);
    setMatches(0);
  };

  const won = matches === memoryEmojis.length;

  return (
    <ActivityFrame title="Memorama" emoji="🧠" onBack={onBack}>
      <div className="flex justify-between text-sm text-slate-700 mb-3">
        <span>🎯 Pares: <b>{matches}/{memoryEmojis.length}</b></span>
        <span>👆 Movimientos: <b>{moves}</b></span>
        <button onClick={reset} className="snow-button flex items-center gap-1 text-sky-600 hover:text-sky-800">
          <RefreshCw className="w-4 h-4" /> Reiniciar
        </button>
      </div>
      {won ? (
        <div className="text-center py-8">
          <div className="text-7xl mb-3 animate-tada inline-block">🏆</div>
          <h3 className="text-2xl font-extrabold text-slate-800">¡Ganaste en {moves} movimientos!</h3>
          <button onClick={reset} className="snow-button mt-4 bg-gradient-to-r from-emerald-400 to-green-500 text-white font-bold rounded-full px-5 py-2.5">
            Jugar otra vez
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-4 gap-2 sm:gap-3">
          {deck.map((c, i) => (
            <button
              key={c.id}
              onClick={() => flip(i)}
              className={`aspect-square rounded-2xl text-3xl sm:text-4xl flex items-center justify-center font-bold transition-all ${
                c.flipped || c.matched
                  ? c.matched
                    ? "bg-emerald-200 border-2 border-emerald-400 animate-match"
                    : "bg-white border-2 border-sky-300"
                  : "bg-gradient-to-br from-sky-500 to-blue-600 text-white"
              }`}
              aria-label={c.flipped || c.matched ? c.emoji : "Carta oculta"}
            >
              {c.flipped || c.matched ? c.emoji : "❓"}
            </button>
          ))}
        </div>
      )}
    </ActivityFrame>
  );
}

// ============================================================
// 5. DRESS UP: Viste a Frost
// ============================================================
export function DressUpActivity({ onBack }: { onBack: () => void }) {
  const [outfit, setOutfit] = useLocalStorage<{ hat: string; scarf: string; glasses: string }>(
    "frost-outfit",
    { hat: "hat-none", scarf: "scarf-none", glasses: "glass-none" }
  );
  const findItem = (items: { id: string; emoji: string; label: string }[], id: string) =>
    items.find((i) => i.id === id) || items[0];

  return (
    <ActivityFrame title="Viste a Frost" emoji="🐧" onBack={onBack}>
      <div className="bg-gradient-to-b from-sky-100 to-sky-200 rounded-2xl p-6 mb-4 relative h-56 flex items-center justify-center">
        <div className="text-8xl relative" style={{ filter: "drop-shadow(0 4px 6px rgba(0,0,0,0.2))" }}>
          🐧
          {/* Gorro */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl pointer-events-none">
            {outfit.hat !== "hat-none" ? findItem(clothingItems.hats, outfit.hat).emoji : ""}
          </div>
          {/* Bufanda */}
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 text-4xl pointer-events-none">
            {outfit.scarf !== "scarf-none" ? findItem(clothingItems.scarves, outfit.scarf).emoji : ""}
          </div>
          {/* Lentes */}
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-3xl pointer-events-none">
            {outfit.glasses !== "glass-none" ? findItem(clothingItems.glasses, outfit.glasses).emoji : ""}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <h4 className="font-bold text-slate-700 text-sm mb-1">🎩 Gorros</h4>
          <div className="flex gap-2 flex-wrap">
            {clothingItems.hats.map((it) => (
              <button
                key={it.id}
                onClick={() => setOutfit({ ...outfit, hat: it.id })}
                className={`px-3 py-2 rounded-2xl border-2 text-2xl snow-button ${
                  outfit.hat === it.id ? "border-violet-500 bg-violet-100" : "border-slate-200 bg-white"
                }`}
                aria-label={it.label}
                title={it.label}
              >
                {it.emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-700 text-sm mb-1">🧣 Bufandas</h4>
          <div className="flex gap-2 flex-wrap">
            {clothingItems.scarves.map((it) => (
              <button
                key={it.id}
                onClick={() => setOutfit({ ...outfit, scarf: it.id })}
                className={`px-3 py-2 rounded-2xl border-2 text-2xl snow-button ${
                  outfit.scarf === it.id ? "border-rose-500 bg-rose-100" : "border-slate-200 bg-white"
                }`}
                aria-label={it.label}
                title={it.label}
              >
                {it.emoji}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-bold text-slate-700 text-sm mb-1">🕶️ Lentes</h4>
          <div className="flex gap-2 flex-wrap">
            {clothingItems.glasses.map((it) => (
              <button
                key={it.id}
                onClick={() => setOutfit({ ...outfit, glasses: it.id })}
                className={`px-3 py-2 rounded-2xl border-2 text-2xl snow-button ${
                  outfit.glasses === it.id ? "border-amber-500 bg-amber-100" : "border-slate-200 bg-white"
                }`}
                aria-label={it.label}
                title={it.label}
              >
                {it.emoji}
              </button>
            ))}
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-slate-500 mt-3 italic">
        Tu disfraz se guarda solo en este dispositivo.
      </p>
    </ActivityFrame>
  );
}

// ============================================================
// 6. MONSTER FACTORY: Fábrica de monstruos
// ============================================================
export function MonsterActivity({ onBack }: { onBack: () => void }) {
  const [monster, setMonster] = useLocalStorage<{ head: string; body: string; legs: string }>(
    "monster-saved",
    { head: monsterParts.heads[0].id, body: monsterParts.bodies[0].id, legs: monsterParts.legs[0].id }
  );
  const [saved, setSaved] = useLocalStorage<{ head: string; body: string; legs: string }[]>(
    "monster-collection", []
  );
  const { speak } = useSpeech();

  const findPart = (arr: typeof monsterParts.heads, id: string) =>
    arr.find((p) => p.id === id) || arr[0];

  const saveMonster = () => {
    if (saved.length >= 8) {
      setSaved([...saved.slice(1), monster]);
    } else {
      setSaved([...saved, monster]);
    }
    speak("Monstruo guardado", "es-ES", 1);
  };

  const randomize = () => {
    const h = monsterParts.heads[Math.floor(Math.random() * monsterParts.heads.length)].id;
    const b = monsterParts.bodies[Math.floor(Math.random() * monsterParts.bodies.length)].id;
    const l = monsterParts.legs[Math.floor(Math.random() * monsterParts.legs.length)].id;
    setMonster({ head: h, body: b, legs: l });
  };

  const current = {
    head: findPart(monsterParts.heads, monster.head),
    body: findPart(monsterParts.bodies, monster.body),
    legs: findPart(monsterParts.legs, monster.legs),
  };

  return (
    <ActivityFrame title="Fábrica de Monstruos" emoji="🐉" onBack={onBack}>
      <div className="bg-gradient-to-br from-fuchsia-100 to-pink-100 rounded-2xl p-4 mb-4 text-center">
        <div className="text-7xl">{current.head.emoji}</div>
        <div className="text-8xl my-1">{current.body.emoji}</div>
        <div className="text-7xl">{current.legs.emoji}</div>
        <p className="text-slate-700 font-bold mt-2 italic">
          {current.head.label} {current.body.label} {current.legs.label}
        </p>
      </div>

      <div className="flex gap-2 mb-4">
        <button onClick={randomize} className="snow-button flex-1 bg-gradient-to-r from-fuchsia-500 to-pink-500 text-white font-bold rounded-full py-2.5 flex items-center justify-center gap-1">
          <Sparkles className="w-4 h-4" /> Mezclar
        </button>
        <button onClick={saveMonster} className="snow-button flex-1 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-bold rounded-full py-2.5 flex items-center justify-center gap-1">
          <Save className="w-4 h-4" /> Guardar
        </button>
      </div>

      {[
        { label: "🐲 Cabezas", items: monsterParts.heads, key: "head" as const },
        { label: "🐻 Cuerpos", items: monsterParts.bodies, key: "body" as const },
        { label: "🦵 Patas", items: monsterParts.legs, key: "legs" as const },
      ].map((section) => (
        <div key={section.key} className="mb-3">
          <h4 className="font-bold text-slate-700 text-sm mb-1">{section.label}</h4>
          <div className="flex gap-2 flex-wrap">
            {section.items.map((it) => (
              <button
                key={it.id}
                onClick={() => setMonster({ ...monster, [section.key]: it.id })}
                className={`px-3 py-2 rounded-2xl border-2 text-3xl snow-button ${
                  monster[section.key] === it.id ? "border-fuchsia-500 bg-fuchsia-100" : "border-slate-200 bg-white"
                }`}
                aria-label={it.label}
              >
                {it.emoji}
              </button>
            ))}
          </div>
        </div>
      ))}

      {saved.length > 0 && (
        <div className="mt-4 pt-3 border-t border-slate-200">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-slate-700 text-sm">📚 Tu colección ({saved.length})</h4>
            <button onClick={() => setSaved([])} className="text-xs text-rose-500 flex items-center gap-1">
              <Trash2 className="w-3 h-3" /> Borrar todo
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {saved.map((m, i) => (
              <div key={i} className="bg-white rounded-xl p-2 text-center border-2 border-slate-200">
                <div className="text-2xl">{findPart(monsterParts.heads, m.head).emoji}</div>
                <div className="text-3xl">{findPart(monsterParts.bodies, m.body).emoji}</div>
                <div className="text-2xl">{findPart(monsterParts.legs, m.legs).emoji}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </ActivityFrame>
  );
}

// ============================================================
// 7. STORYBOOK: Cuento ilustrado
// ============================================================
export function StoryActivity({ onBack }: { onBack: () => void }) {
  const [storyIdx, setStoryIdx] = useState(0);
  const [pageIdx, setPageIdx] = useState(0);
  const { speak, supported } = useSpeech();
  const story = stories[storyIdx];

  const next = () => {
    if (pageIdx < story.length - 1) setPageIdx(pageIdx + 1);
    else { setStoryIdx((storyIdx + 1) % stories.length); setPageIdx(0); }
  };
  const prev = () => {
    if (pageIdx > 0) setPageIdx(pageIdx - 1);
    else if (storyIdx > 0) { setStoryIdx(storyIdx - 1); setPageIdx(stories[storyIdx - 1].length - 1); }
  };

  const page = story[pageIdx];

  return (
    <ActivityFrame title="Cuento Ilustrado" emoji="📖" onBack={onBack}>
      <div className="bg-gradient-to-br from-cyan-50 to-teal-100 rounded-2xl p-6 mb-4 text-center min-h-56 flex flex-col items-center justify-center">
        <div className="text-7xl mb-3 animate-tada inline-block">{page.emoji}</div>
        <p className="text-slate-800 leading-relaxed text-base sm:text-lg max-w-md">
          {page.text}
        </p>
      </div>
      <div className="flex items-center justify-between gap-2">
        <button onClick={prev} disabled={pageIdx === 0 && storyIdx === 0} className="snow-button flex-1 bg-white border-2 border-slate-200 disabled:opacity-40 text-slate-700 font-bold rounded-full py-2.5">
          ← Anterior
        </button>
        {supported && (
          <button
            onClick={() => speak(page.text, "es-ES", 0.85)}
            className="snow-button bg-cyan-500 text-white rounded-full p-3"
            aria-label="Leer en voz alta"
          >
            <Volume2 className="w-5 h-5" />
          </button>
        )}
        <button onClick={next} className="snow-button flex-1 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-bold rounded-full py-2.5">
          {pageIdx < story.length - 1 ? "Siguiente →" : "Otro cuento 🔄"}
        </button>
      </div>
      <p className="text-center text-xs text-slate-500 mt-2 italic">
        Página {pageIdx + 1} de {story.length} · Cuento {storyIdx + 1} de {stories.length}
      </p>
    </ActivityFrame>
  );
}

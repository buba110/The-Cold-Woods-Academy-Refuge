import { Baby, Shapes, Palette, Brain, Shirt, Sparkles, BookOpen, Home } from "lucide-react";

export type ActivityId =
  | "toddler"
  | "preschool"
  | "colors"
  | "memory"
  | "dressup"
  | "monster"
  | "story";

interface KidsMenuProps {
  onSelect: (id: ActivityId) => void;
  onHome: () => void;
  current: ActivityId | null;
}

const ACTIVITIES: { id: ActivityId; label: string; sub: string; icon: React.ReactNode; color: string }[] = [
  { id: "toddler", label: "2 años", sub: "Tocar y descubrir", icon: <Baby className="w-5 h-5" />, color: "from-rose-400 to-pink-400" },
  { id: "preschool", label: "5 años", sub: "Figuras y conteo", icon: <Shapes className="w-5 h-5" />, color: "from-sky-400 to-blue-400" },
  { id: "colors", label: "Pintura", sub: "Taller de colores", icon: <Palette className="w-5 h-5" />, color: "from-amber-400 to-orange-400" },
  { id: "memory", label: "Memorama", sub: "Pares y memoria", icon: <Brain className="w-5 h-5" />, color: "from-emerald-400 to-green-400" },
  { id: "dressup", label: "Frost", sub: "Viste al pingüino", icon: <Shirt className="w-5 h-5" />, color: "from-violet-400 to-purple-400" },
  { id: "monster", label: "Monstruos", sub: "Fábrica de híbridos", icon: <Sparkles className="w-5 h-5" />, color: "from-fuchsia-400 to-pink-400" },
  { id: "story", label: "Cuento", sub: "Lectura en voz alta", icon: <BookOpen className="w-5 h-5" />, color: "from-cyan-400 to-teal-400" },
];

export function KidsMenu({ onSelect, onHome, current }: KidsMenuProps) {
  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-24 pt-4">
      <div className="flex items-center justify-between mb-5">
        <button
          onClick={onHome}
          className="snow-button flex items-center gap-2 bg-white/40 backdrop-blur text-slate-800 font-bold rounded-full px-4 py-2 text-sm border border-white/60"
        >
          <Home className="w-4 h-4" />
          Inicio
        </button>
        <h2 className="text-xl sm:text-2xl font-extrabold text-slate-800 text-center flex-1 px-2">
          Pequeños Exploradores
        </h2>
        <div className="w-16" /> {/* spacer */}
      </div>

      <div className="responsive-grid">
        {ACTIVITIES.map((a) => {
          const active = current === a.id;
          return (
            <button
              key={a.id}
              onClick={() => onSelect(a.id)}
              aria-pressed={active}
              className={`card-press bg-gradient-to-br ${a.color} text-white rounded-3xl p-3 sm:p-4 text-left shadow-lg border-2 ${
                active ? "border-sun ring-4 ring-sun/40" : "border-white/40"
              }`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="w-9 h-9 rounded-full bg-white/25 flex items-center justify-center">
                  {a.icon}
                </div>
                <span className="text-2xl" aria-hidden="true">
                  {a.id === "toddler" && "👶"}
                  {a.id === "preschool" && "🧒"}
                  {a.id === "colors" && "🎨"}
                  {a.id === "memory" && "🧠"}
                  {a.id === "dressup" && "🐧"}
                  {a.id === "monster" && "🐲"}
                  {a.id === "story" && "📖"}
                </span>
              </div>
              <div className="font-extrabold text-base sm:text-lg leading-tight">{a.label}</div>
              <div className="text-xs text-white/85 leading-tight">{a.sub}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

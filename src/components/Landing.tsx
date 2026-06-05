import { Snowflake, Lock, ArrowRight } from "lucide-react";
import { useLongPress } from "../hooks";

interface LandingProps {
  onEnterKids: () => void;
  onSecretBypass: () => void;
}

export function Landing({ onEnterKids, onSecretBypass }: LandingProps) {
  const longPress = useLongPress(onSecretBypass, { delay: 2500, threshold: 10 });

  return (
    <div className="relative w-full max-w-md mx-auto px-4 pb-24 pt-8 z-10">
      {/* Copos flotantes decorativos */}
      <div className="absolute -top-4 left-0 right-0 flex justify-center gap-6 text-3xl opacity-70 pointer-events-none select-none" aria-hidden="true">
        <span style={{ animation: "fall 12s linear infinite" }}>❄️</span>
        <span style={{ animation: "fall 14s linear 2s infinite" }}>❄️</span>
        <span style={{ animation: "fall 11s linear 4s infinite" }}>❄️</span>
      </div>

      <div className="glass-panel rounded-3xl p-6 sm:p-8 text-center shadow-2xl">
        <div className="text-5xl mb-3" aria-hidden="true">🏔️</div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-white text-glow leading-tight">
          The Cold Woods
          <span className="block text-sun mt-1">Academy</span>
        </h1>
        <p className="text-glacier-glow mt-3 mb-6 italic text-sm sm:text-base">
          un refugio de aprendizaje y magia
        </p>

        <button
          onClick={onEnterKids}
          className="snow-button w-full bg-gradient-to-r from-orange-400 to-amber-400 text-slate-900 font-bold rounded-full py-4 px-6 flex items-center justify-center gap-3 shadow-lg shadow-orange-500/30 hover:shadow-orange-500/50"
        >
          <span className="text-2xl" aria-hidden="true">👨‍👩‍👧‍👦</span>
          <span className="text-base sm:text-lg">Área de Pequeños Exploradores</span>
          <ArrowRight className="w-5 h-5" />
        </button>

        <p className="text-xs text-glacier/70 mt-6 italic">
          para Monse, con todo el frío de la montaña ❄️
        </p>
      </div>

      {/* Copo de nieve secreto — más visible (sin opacity 0.5) y con pista */}
      <button
        aria-label="Zona secreta (mantener presionado)"
        title="Mantén presionado 2.5 segundos…"
        {...longPress}
        className="fixed bottom-20 right-4 z-50 w-14 h-14 flex items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/30 pulse-snow cursor-pointer hover:bg-white/20"
      >
        <Snowflake className="w-7 h-7 text-white" />
      </button>

      {/* Tarjeta de pista de la Cabaña */}
      <div className="mt-6 glass-panel rounded-2xl p-4 flex items-start gap-3">
        <Lock className="w-5 h-5 text-sun flex-shrink-0 mt-0.5" />
        <p className="text-xs text-glacier-glow leading-relaxed">
          <strong className="text-sun">¿Buscas la Cabaña?</strong> El copo
          de la esquina guarda una puerta. Mantenlo presionado, sin mover el
          dedo, hasta que el copo crezca.
        </p>
      </div>
    </div>
  );
}

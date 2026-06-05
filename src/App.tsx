import { useEffect, useState } from "react";
import { Landing } from "./components/Landing";
import { BypassModal } from "./components/BypassModal";
import { KidsMenu, type ActivityId } from "./components/KidsMenu";
import { Refuge } from "./components/Refuge";
import { Footer } from "./components/Footer";
import {
  ToddlerActivity, PreschoolActivity, ColorActivity, MemoryActivity,
  DressUpActivity, MonsterActivity, StoryActivity,
} from "./components/Activities";

type Mode = "landing" | "kids" | "activity" | "refuge";

export default function App() {
  const [mode, setMode] = useState<Mode>("landing");
  const [bypassOpen, setBypassOpen] = useState(false);
  const [activity, setActivity] = useState<ActivityId>("toddler");

  // Activar modo kids/refuge/dim en <body> para que los estilos globales respondan
  useEffect(() => {
    const body = document.body;
    body.classList.remove("kids-mode", "refuge-mode", "dim-mode");
    if (mode === "kids" || mode === "activity") body.classList.add("kids-mode");
    if (mode === "refuge") body.classList.add("refuge-mode");
  }, [mode]);

  // Registrar service worker para PWA (silencioso si falla)
  useEffect(() => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Fallar silenciosamente; la app funciona online sin SW
      });
    }
  }, []);

  const goHome = () => setMode("landing");
  const goRefuge = () => setMode("refuge");
  const goKids = () => setMode("kids");
  const selectActivity = (id: ActivityId) => { setActivity(id); setMode("activity"); };

  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Fondo animado de nieve en modo refugio */}
      {mode === "refuge" && (
        <div className="snowfall" aria-hidden="true">
          {Array.from({ length: 18 }).map((_, i) => (
            <span
              key={i}
              className="snowflake-fall"
              style={{
                left: `${(i * 53) % 100}%`,
                fontSize: `${10 + (i % 4) * 6}px`,
                animationDuration: `${8 + (i % 5) * 2}s`,
                animationDelay: `${(i * 0.7) % 10}s`,
              }}
            >
              ❄
            </span>
          ))}
        </div>
      )}

      <main className="flex-1 flex items-start justify-center pt-2">
        {mode === "landing" && (
          <Landing
            onEnterKids={goKids}
            onSecretBypass={() => setBypassOpen(true)}
          />
        )}

        {mode === "kids" && (
          <KidsMenu
            onSelect={selectActivity}
            onHome={goHome}
            current={null}
          />
        )}

        {mode === "activity" && (
          <ActivityRouter id={activity} onBack={goKids} />
        )}

        {mode === "refuge" && (
          <Refuge onHome={goHome} />
        )}
      </main>

      <BypassModal
        open={bypassOpen}
        onClose={() => setBypassOpen(false)}
        onSuccess={() => { setBypassOpen(false); goRefuge(); }}
      />

      <Footer />
    </div>
  );
}

function ActivityRouter({ id, onBack }: { id: ActivityId; onBack: () => void }) {
  switch (id) {
    case "toddler": return <ToddlerActivity onBack={onBack} />;
    case "preschool": return <PreschoolActivity onBack={onBack} />;
    case "colors": return <ColorActivity onBack={onBack} />;
    case "memory": return <MemoryActivity onBack={onBack} />;
    case "dressup": return <DressUpActivity onBack={onBack} />;
    case "monster": return <MonsterActivity onBack={onBack} />;
    case "story": return <StoryActivity onBack={onBack} />;
  }
}

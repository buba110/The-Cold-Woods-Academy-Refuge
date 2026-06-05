import { useEffect, useRef, useState } from "react";
import { Lock, X, Eye, EyeOff } from "lucide-react";

interface BypassModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// Claves válidas (case-insensitive, sin acentos, sin espacios)
const VALID_KEYS = ["pijamacorta", "gallodepelea", "cabañafria", "coldwoods"];

function normalize(s: string): string {
  return s
    .toLowerCase()
    .trim()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "");
}

export function BypassModal({ open, onClose, onSuccess }: BypassModalProps) {
  const [key, setKey] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const dialogRef = useRef<HTMLDivElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  // Trampa de foco y gestión de Escape
  useEffect(() => {
    if (!open) return;
    previousFocus.current = document.activeElement as HTMLElement | null;
    setTimeout(() => inputRef.current?.focus(), 50);

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "Tab" && dialogRef.current) {
        const focusables = dialogRef.current.querySelectorAll<HTMLElement>(
          'button, input, [tabindex]:not([tabindex="-1"])'
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("keydown", handleKey);
      previousFocus.current?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setKey("");
    setError("");
    setShow(false);
    onClose();
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const normalized = normalize(key);
    if (VALID_KEYS.includes(normalized)) {
      setError("");
      onSuccess();
    } else {
      setError("Clave incorrecta. Pista: algo que solo Monse sabría…");
      setKey("");
      inputRef.current?.focus();
    }
  };

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="bypass-title"
      className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        className="bg-gradient-to-br from-slate-900 to-slate-950 border border-sun/30 rounded-3xl p-6 max-w-sm w-full shadow-2xl"
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-sun/20 flex items-center justify-center">
              <Lock className="w-5 h-5 text-sun" />
            </div>
            <h3 id="bypass-title" className="text-xl font-bold text-white">
              Acceso al Refugio
            </h3>
          </div>
          <button
            onClick={handleClose}
            aria-label="Cerrar modal"
            className="text-glacier/60 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <p className="text-sm text-glacier-glow mb-4">
          Ingresa la clave secreta para abrir la Cabaña de la Montaña.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="relative">
            <input
              ref={inputRef}
              type={show ? "text" : "password"}
              value={key}
              onChange={(e) => { setKey(e.target.value); setError(""); }}
              placeholder="Clave secreta"
              autoComplete="off"
              spellCheck={false}
              className="w-full px-4 py-3 pr-12 rounded-full bg-slate-800 text-white border border-glacier/30 focus:border-sun focus:outline-none focus:ring-2 focus:ring-sun/30"
              aria-invalid={!!error}
              aria-describedby={error ? "bypass-error" : undefined}
            />
            <button
              type="button"
              onClick={() => setShow((s) => !s)}
              aria-label={show ? "Ocultar clave" : "Mostrar clave"}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-glacier/70 hover:text-white"
            >
              {show ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>

          {error && (
            <p id="bypass-error" role="alert" className="text-rose-400 text-sm mt-2 text-center">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="snow-button w-full mt-4 bg-gradient-to-r from-sun to-amber-400 text-slate-900 font-bold rounded-full py-3"
          >
            Acceder a la Cabaña
          </button>

          <button
            type="button"
            onClick={handleClose}
            className="snow-button w-full mt-2 text-glacier/70 hover:text-white text-sm py-2"
          >
            Cancelar
          </button>
        </form>

        <p className="text-[10px] text-glacier/40 text-center mt-4 italic">
          Pista: pijama + corta, o algo de gallos peleando 🐓
        </p>
      </div>
    </div>
  );
}

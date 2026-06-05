import { useCallback, useEffect, useRef, useState } from "react";

/**
 * Hook de presión larga con detección de movimiento.
 * Soluciona el bug del copo de nieve: si el dedo se mueve más de `threshold`px,
 * el temporizador se cancela automáticamente.
 */
export function useLongPress(
  onLongPress: () => void,
  options: { delay?: number; threshold?: number } = {}
) {
  const { delay = 3000, threshold = 10 } = options;
  const timerRef = useRef<number | null>(null);
  const startPos = useRef<{ x: number; y: number } | null>(null);
  const triggered = useRef(false);

  const start = useCallback(
    (e: React.PointerEvent) => {
      // Capturar pointer para que pointermove siga funcionando aunque el dedo
      // se salga del elemento
      const target = e.currentTarget as HTMLElement;
      try {
        target.setPointerCapture(e.pointerId);
      } catch {
        // Algunos navegadores no soportan capture en todos los elementos
      }
      startPos.current = { x: e.clientX, y: e.clientY };
      triggered.current = false;
      timerRef.current = window.setTimeout(() => {
        triggered.current = true;
        // Vibración háptica si está disponible (mejora la experiencia móvil)
        if (typeof navigator !== "undefined" && "vibrate" in navigator) {
          try { navigator.vibrate(50); } catch { /* ignore */ }
        }
        onLongPress();
      }, delay);
    },
    [onLongPress, delay]
  );

  const move = useCallback(
    (e: React.PointerEvent) => {
      if (!startPos.current || triggered.current) return;
      const dx = e.clientX - startPos.current.x;
      const dy = e.clientY - startPos.current.y;
      if (Math.hypot(dx, dy) > threshold) {
        if (timerRef.current !== null) {
          clearTimeout(timerRef.current);
          timerRef.current = null;
        }
        startPos.current = null;
      }
    },
    [threshold]
  );

  const end = useCallback(() => {
    if (timerRef.current !== null) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    startPos.current = null;
  }, []);

  useEffect(() => {
    return () => {
      if (timerRef.current !== null) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    onPointerDown: start,
    onPointerMove: move,
    onPointerUp: end,
    onPointerCancel: end,
  };
}

/**
 * Hook de síntesis de voz bilingüe (es/en).
 * Cancela cualquier utterance en curso antes de hablar para evitar solapamientos.
 */
export function useSpeech(defaultLang: "es-ES" | "en-US" = "es-ES") {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      setSupported(false);
    }
  }, []);

  const speak = useCallback(
    (text: string, lang: "es-ES" | "en-US" = defaultLang, rate = 0.9) => {
      if (!supported) return;
      try {
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.lang = lang;
        u.rate = rate;
        u.onend = () => setSpeaking(false);
        u.onerror = () => setSpeaking(false);
        setSpeaking(true);
        window.speechSynthesis.speak(u);
      } catch {
        setSpeaking(false);
      }
    },
    [supported, defaultLang]
  );

  const cancel = useCallback(() => {
    if (supported) window.speechSynthesis.cancel();
    setSpeaking(false);
  }, [supported]);

  return { speak, cancel, supported, speaking };
}

/**
 * Hook de audio terapéutico 528Hz con inicio/detención REAL.
 * Soluciona el bug del original: el oscilador se detiene y se desconecta,
 * no solo se suspende, evitando fugas de memoria.
 */
export function use528Hz() {
  const ctxRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.15);

  const ensureContext = useCallback(() => {
    if (!ctxRef.current) {
      try {
        const Ctor = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        ctxRef.current = new Ctor();
      } catch {
        return null;
      }
    }
    if (ctxRef.current.state === "suspended") {
      ctxRef.current.resume().catch(() => {});
    }
    return ctxRef.current;
  }, []);

  const play = useCallback(() => {
    const ctx = ensureContext();
    if (!ctx) return;
    // Si ya está sonando, no recrear
    if (oscRef.current) {
      if (ctx.state === "suspended") ctx.resume();
      return;
    }
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = 528; // Frecuencia terapéutica (Mi en solfeo)
    gain.gain.value = volume;
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
    setPlaying(true);
  }, [ensureContext, volume]);

  const stop = useCallback(() => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
      } catch {
        // Ya estaba detenido
      }
      try {
        oscRef.current.disconnect();
      } catch { /* ignore */ }
      oscRef.current = null;
    }
    if (gainRef.current) {
      try { gainRef.current.disconnect(); } catch { /* ignore */ }
      gainRef.current = null;
    }
    setPlaying(false);
  }, []);

  const setVol = useCallback(
    (v: number) => {
      const clamped = Math.max(0, Math.min(1, v));
      setVolume(clamped);
      if (gainRef.current && ctxRef.current) {
        // setTargetAtTime evita clicks
        gainRef.current.gain.setTargetAtTime(clamped, ctxRef.current.currentTime, 0.05);
      }
    },
    []
  );

  // Cleanup real al desmontar
  useEffect(() => {
    return () => {
      stop();
      if (ctxRef.current && ctxRef.current.state !== "closed") {
        ctxRef.current.close().catch(() => {});
      }
      ctxRef.current = null;
    };
  }, [stop]);

  return { play, stop, setVol, playing, volume };
}

/**
 * Hook de persistencia en localStorage con manejo de errores.
 */
export function useLocalStorage<T>(key: string, initial: T): [T, (v: T | ((p: T) => T)) => void] {
  const [value, setValue] = useState<T>(() => {
    if (typeof window === "undefined") return initial;
    try {
      const stored = window.localStorage.getItem(key);
      if (stored === null) return initial;
      return JSON.parse(stored) as T;
    } catch {
      return initial;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // localStorage lleno o no disponible
    }
  }, [key, value]);

  return [value, setValue];
}

import { TreePine, Snowflake, Coffee, Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-40 bg-slate-950/85 backdrop-blur-md border-t border-glacier/20 px-4 py-2.5">
      <div className="flex items-center justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-glacier-glow">
        <TreePine className="w-4 h-4 text-emerald-400" />
        <Snowflake className="w-4 h-4 text-cyan-300" />
        <Coffee className="w-4 h-4 text-amber-400" />
        <span className="flex items-center gap-1">
          con mucho <Heart className="w-3 h-3 text-rose-400 fill-rose-400" /> para Monserrat
        </span>
        <span className="font-bold text-sun tracking-wider">MDBAJA SOFT</span>
      </div>
    </footer>
  );
}

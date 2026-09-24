import { Logo } from "./Logo";
import { Loader2 } from "lucide-react";

export function Loading() {
  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-slate-900 font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 blur-[2px]"
        style={{ backgroundImage: `url('/background.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-2xl w-full bg-white/95 backdrop-blur-md rounded-[32px] shadow-2xl px-6 py-12 flex flex-col items-center justify-center gap-6">
        <Logo />
        <div className="flex flex-col items-center gap-3 py-6">
          <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
          <span className="text-sm font-medium text-slate-600 tracking-wide animate-pulse">
            Cargando tu espacio de bienestar...
          </span>
        </div>
      </div>
    </main>
  );
}

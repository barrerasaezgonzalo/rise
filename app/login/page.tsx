"use client";

import { useAuth } from "@/app/hooks/useAuth";
import { Logo } from "../components/UI/Logo";

export default function Login() {
  const { loginWithGoogle } = useAuth();

  return (
    <main className="min-h-screen relative flex items-center justify-center p-4 bg-slate-900 font-sans">
      <div
        className="absolute inset-0 bg-cover bg-center opacity-90 blur-[2px]"
        style={{ backgroundImage: `url('/background.jpg')` }}
      />
      <div className="absolute inset-0 bg-black/30" />
      <div className="relative z-10 max-w-2xl w-full bg-white/90 backdrop-blur-md rounded-[32px] shadow-2xl px-6 py-8 flex flex-col items-center justify-between gap-6">
        <Logo />
        <div className="flex flex-col items-center gap-4 w-full max-w-sm">
          <p className="text-sm text-slate-600 text-center">
            Inicia sesión para acceder a tu plan de bienestar y acompañar tu
            progreso diario.
          </p>
          <button
            onClick={loginWithGoogle}
            className="w-full flex items-center justify-center gap-3 bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-medium py-2.5 px-4 rounded-xl shadow-xs transition cursor-pointer"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.17z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.19v3.15C3.18 21.32 7.23 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.19C.43 8.1 0 9.99 0 12s.43 3.9 1.19 5.42l4.09-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.23 0 3.18 2.68 1.19 6.58l4.09 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            Continuar con Google
          </button>
        </div>
      </div>
    </main>
  );
}

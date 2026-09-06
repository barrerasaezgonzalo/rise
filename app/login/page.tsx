"use client";

import { useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { HeaderBg } from "../components/HeaderBg";
import { HeaderLogo } from "../components/HeaderLogo";
import { useAuth } from "../hooks/useAuth";

export default function Login() {
  const { checkUser, loginWithGoogle } = useAuth();

  useEffect(() => {
    checkUser();
  }, [checkUser]);

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden font-sans">
      <HeaderBg />

      <div className="relative w-full max-w-2xl rounded-3xl border border-white/40 bg-[#fffaf2]/95 px-6 py-6 shadow-2xl backdrop-blur-md md:px-10 md:py-8">
        <header className="flex flex-col items-center text-center -mt-16 ">
          <HeaderLogo />
        </header>

        <h1 className="text-4xl font-semibold tracking-tight text-title text-center">
          Bienvenido a Rise
        </h1>

        <p className="mt-4 text-base leading-7 text-subtitle text-center mb-8">
          Un espacio para entender cómo estás, ordenar lo que necesitas y
          avanzar con pequeñas acciones.
        </p>

        <div className="rounded-2xl border border-border bg-white p-6">
          <h2 className="text-xl font-semibold text-title text-center">
            Comencemos
          </h2>

          <p className="mt-2 text-sm leading-6 text-subtitle text-center">
            Inicia sesión para guardar tus respuestas, tus planes y tu progreso.
          </p>

          <button
            type="button"
            onClick={loginWithGoogle}
            className="mt-6 flex h-12 cursor-pointer w-full items-center justify-between rounded-xl bg-rise px-4 text-sm font-medium text-white transition hover:bg-rise-hover"
          >
            <span className="mx-auto">Continuar con Google</span>
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </main>
  );
}

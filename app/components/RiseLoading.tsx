"use client";

import { Leaf } from "lucide-react";
import { HeaderLogo } from "./HeaderLogo";

export function RiseLoading() {
  return (
    <main className="relative flex min-h-screen items-center justify-center bg-[#fffaf2]/95 px-6">
      <div className="flex flex-col items-center text-center">
        <div className="flex justify-center">
          <HeaderLogo />
        </div>
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-rise-soft">
          <Leaf size={28} className="text-rise animate-spin" />
        </div>

        <h2 className="mt-6 text-xl font-semibold text-title">
          Preparando tu espacio
        </h2>

        <p className="mt-2 text-base text-subtitle">
          Estamos revisando tu progreso...
        </p>

        <div className="mt-6 h-1.5 w-48 overflow-hidden rounded-full bg-rise-soft">
          <div className="h-full w-1/2 animate-pulse rounded-full bg-rise" />
        </div>
      </div>
    </main>
  );
}

"use client";

import { X } from "lucide-react";
import { useState } from "react";

export function RiseInfoBanner() {
  // Hacer un hook, que guardar en cookie si ya lo vio
  const [isOpen, setIsOpen] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-5 opacity-90 left-1/2 z-50 w-[calc(100%-2rem)] max-w-7xl -translate-x-1/2 rounded-xl border border-rise bg-background p-5 shadow-lg">
      <button
        type="button"
        onClick={() => setIsOpen(false)}
        className="absolute right-4 top-4 text-rise transition cursor-pointer"
      >
        <X size={20} />
      </button>

      <div className="pr-8">
        <h3 className="text-base font-semibold text-title">
          Antes de comenzar
        </h3>

        <p className="mt-2 text-sm leading-6 text-subtitle">
          Rise te hará algunas preguntas para entender cómo estás y qué
          necesitas en este momento. Tus respuestas se utilizarán para crear un
          plan personalizado con pequeñas acciones que puedas realizar durante
          los próximos días.
        </p>

        <p className="mt-2 text-sm leading-6 text-subtitle">
          No hay respuestas correctas o incorrectas. Responde con sinceridad y a
          tu propio ritmo.
        </p>
      </div>
    </div>
  );
}

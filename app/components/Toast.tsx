"use client";

import { CircleAlert, CircleCheck, X } from "lucide-react";
import { ToastProps } from "../types";

export function Toast({ message, type = "error", onClose }: ToastProps) {
  const isError = type === "error";

  return (
    <div
      className={`fixed right-5 top-5 z-50 flex w-[calc(100%-2rem)] max-w-sm items-start gap-3 rounded-2xl border bg-[#fffaf2]/95 px-4 py-4 shadow-2xl backdrop-blur-md ${
        isError ? "border-orange-200/80" : "border-rise/30"
      }`}
    >
      <div
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isError ? "bg-orange-200 text-orange-700" : "bg-rise-soft text-rise"
        }`}
      >
        {isError ? <CircleAlert size={18} /> : <CircleCheck size={18} />}
      </div>

      <div className="min-w-0 flex-1">
        <span
          className={`block text-xs font-semibold uppercase tracking-wider ${
            isError ? "text-orange-400" : "text-rise"
          }`}
        >
          {isError ? "Algo salió mal" : "Listo"}
        </span>

        <p className="mt-1 text-sm leading-5 text-subtitle">{message}</p>
      </div>

      <button
        type="button"
        onClick={onClose}
        aria-label="Cerrar notificación"
        className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-neutral-400 transition hover:bg-neutral-100 hover:text-title"
      >
        <X size={16} />
      </button>
    </div>
  );
}

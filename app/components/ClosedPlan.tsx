"use client";

import { Leaf } from "lucide-react";
import { useRise } from "../hooks/useRise";
import { HeaderLogo } from "./HeaderLogo";

export function ClosedPlan() {
  const { plan, completedTasks, rejectedTasks, handleNewPlan } = useRise();

  if (!plan) return null;

  const isCompleted = plan.status === "completed";

  return (
    <div className="-mt-4">
      <div className="flex justify-center">
        <HeaderLogo />
      </div>

      <div className="mt-4">
        <h1 className="text-2xl font-semibold text-rise">{plan.title}</h1>
      </div>

      <p className="mt-3 text-base leading-7 text-subtitle">
        {isCompleted
          ? "Completaste este ciclo. Tómate un momento para reconocer lo que pudiste hacer y también aquello que fue más difícil."
          : "A veces un plan no encaja con el momento que estamos viviendo. Puedes comenzar otro cuando quieras y ajustar mejor tu próxima ruta."}
      </p>

      <div className="mt-8 grid grid-cols-3 gap-4 text-center">
        <div>
          <span className="block text-2xl font-semibold text-rise">
            {plan.tasks.length}
          </span>

          <span className="text-sm text-subtitle">Días</span>
        </div>

        <div>
          <span className="block text-2xl font-semibold text-rise">
            {completedTasks}
          </span>

          <span className="text-sm text-subtitle">Realizadas</span>
        </div>

        <div>
          <span className="block text-2xl font-semibold text-orange-600">
            {rejectedTasks}
          </span>

          <span className="text-sm text-subtitle">Difíciles</span>
        </div>
      </div>

      <div className="mt-8">
        <span className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
          {isCompleted ? "Un pequeño cierre" : "Lo importante"}
        </span>

        <p className="mt-3 text-base leading-7 text-subtitle">
          {isCompleted
            ? "Durante estos días priorizaste espacios de calma, conexión y pequeños cambios en tu rutina. No se trata de haber cumplido todo perfectamente, sino de reconocer qué acciones te hicieron bien y cuáles necesitas adaptar para tu próximo ciclo."
            : "Lo que alcanzaste a registrar seguirá formando parte de tu historial. Esa información puede ayudarte a construir un próximo plan más realista y acorde a lo que necesitas ahora."}
        </p>
      </div>

      <button
        type="button"
        onClick={handleNewPlan}
        className="mt-8 flex w-full cursor-pointer items-center rounded-2xl bg-rise px-5 py-4 text-sm font-medium uppercase tracking-wider text-background shadow-md transition hover:bg-rise-hover"
      >
        <span />

        <span className="mx-auto">Crear nuevo plan</span>

        <Leaf size={22} />
      </button>
    </div>
  );
}

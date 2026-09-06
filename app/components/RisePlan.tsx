"use client";

import { Ban, CheckCircle } from "lucide-react";
import { useRise } from "../hooks/useRise";
import { useState } from "react";
import { RisePlanTaskItem } from "./RisePlanTaskItem";

export function RisePlan() {
  const {
    plan,
    tasks,
    progress,
    canCompletePlan,
    loading,
    completePlan,
    updateTaskStatus,
    cancelPlan,
  } = useRise();
  const [confirmAbandon, setConfirmAbandon] = useState(false);
  return (
    <div>
      <h1 className="mt-4 text-2xl mt-12 font-semibold text-rise ">
        {plan?.title}
      </h1>
      <p className="mt-3 max-w-md text-base font-medium leading-6 text-subtitle">
        {plan?.summary}
      </p>
      <div className="mt-6 border-y border-border py-4">
        <div className="mb-2 flex items-center justify-between text-sm">
          <span className="font-medium text-subtitle">Progreso de tu plan</span>
        </div>
        <div className="mt-4 mb-4 h-2 w-full overflow-hidden rounded-full bg-rise/20">
          <div
            className="h-full rounded-full bg-rise-hover transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <section className="mt-5">
        <div className="flex flex-col">
          {tasks.map((task) => (
            <RisePlanTaskItem
              key={task.day}
              task={task}
              updateTaskStatus={updateTaskStatus}
            />
          ))}
        </div>
      </section>

      <div className="mt-6 text-center">
        <p className="text-sm leading-5 text-neutral-500">
          No necesitas hacerlo perfecto. Avanza a tu ritmo y vuelve cuando lo
          necesites.
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-border pt-5 space-x-4 md:space-x-0">
        {!confirmAbandon ? (
          <button
            type="button"
            onClick={() => setConfirmAbandon(true)}
            className="flex items-center  cursor-pointer gap-2 text-sm font-medium text-orange-700 transition hover:text-orange-900 border-2 border-orange-700 rounded-xl py-3 px-3"
          >
            <Ban size={16} />
            Abandonar plan
          </button>
        ) : (
          <div className="flex flex-col gap-3">
            <span className="text-sm text-subtitle">
              ¿Seguro que quieres abandonar?
            </span>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setConfirmAbandon(false)}
                className="text-sm font-medium text-neutral-400 transition hover:text-neutral-600"
              >
                Cancelar
              </button>

              <button
                type="button"
                className="text-sm font-medium text-orange-700 transition hover:text-orange-800 cursor-pointer"
                onClick={cancelPlan}
                disabled={loading}
              >
                {loading ? "Abandonando..." : "Sí, abandonar"}
              </button>
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={completePlan}
          disabled={!canCompletePlan || loading}
          className="flex items-center gap-2 rounded-xl cursor-pointer bg-rise px-5 py-3 text-sm font-medium text-white transition hover:bg-rise-hover disabled:cursor-not-allowed disabled:opacity-50"
        >
          <CheckCircle size={17} />
          {loading ? "Completando..." : "Completar plan"}
        </button>
      </div>
    </div>
  );
}

"use client";

import { HeaderBg } from "@/app/components/HeaderBg";
import { HeaderButtons } from "@/app/components/HeaderButtons";
import { HeaderLogo } from "@/app/components/HeaderLogo";
import { HistoryPlanItem } from "@/app/components/HistoryPlanItem";
import { useHistory } from "@/app/hooks/useHistory";
import { useRise } from "@/app/hooks/useRise";
import { Leaf } from "lucide-react";
import { useRouter } from "next/navigation";

export default function History() {
  const router = useRouter();
  const { plan: activePlan } = useRise();
  const { planHistory, planToDelete, setPlanToDelete, handleDeletePlan, totalPlans, completedPlans, cancelledPlans, plansProgress, } = useHistory();

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden pb-8 pt-16 font-sans md:pt-22">
      <HeaderBg />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-2xl rounded-3xl border border-white/40 bg-[#fffaf2]/95 px-6 py-6 shadow-2xl backdrop-blur-md md:px-10 md:py-8">
        <HeaderButtons />

        <header className="flex flex-col items-center text-center">
          <HeaderLogo />
        </header>

        {planHistory.length === 0 ? (
          <>
            <p className="text-center text-2xl font-semibold text-title md:text-3xl">
              Tu recorrido comienza aquí
            </p>

            <p className="mt-4 text-sm text-subtitle md:text-base">
              Cuando completes o cierres un plan de bienestar, podrás volver
              aquí para revisar tu progreso y recordar qué acciones te ayudaron
              más.
            </p>

            <p className="mt-2 text-base leading-5 text-neutral-500">
              Aquí aparecerán tus planes completados y abandonados.
            </p>
          </>
        ) : (
          <>
            <p className="mt-3 text-base leading-5 text-neutral-500">
              Aquí puedes volver a tus ciclos anteriores y recordar qué acciones
              te hicieron bien y cuáles fueron más difíciles.
            </p>

            <div className="mt-6 rounded-2xl border border-border bg-white/60 p-5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-subtitle">
                  Tu avance
                </span>

                <span className="text-sm font-semibold text-rise">
                  {plansProgress}%
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-rise/15">
                <div
                  className="h-full rounded-full bg-rise transition-all"
                  style={{ width: `${plansProgress}%` }}
                />
              </div>

              <div className="mt-4 flex gap-5 text-sm">
                <span className="text-rise">
                  {completedPlans} completados
                </span>

                <span className="text-orange-700">
                  {cancelledPlans} abandonados
                </span>

                <span className="text-subtitle">
                  {totalPlans} ciclos
                </span>
              </div>
            </div>


            <section className="mt-4">
              <div className="flex flex-col">
                {planHistory.map((plan) => (
                  <HistoryPlanItem
                    key={plan.id}
                    plan={plan}
                    planToDelete={planToDelete}
                    setPlanToDelete={setPlanToDelete}
                    handleDeletePlan={handleDeletePlan}
                  />
                ))}
              </div>
            </section>
          </>
        )}

        <div className="mt-7 text-center">
          <p className="text-sm leading-5 text-neutral-500">
            Cada ciclo deja información útil para conocerte mejor y crear planes
            más realistas para ti.
          </p>
        </div>

        <button
          onClick={() => router.push("/")}
          type="button"
          className="mt-8 flex w-full cursor-pointer items-center rounded-2xl bg-rise px-5 py-4 text-sm font-medium uppercase tracking-wider text-background shadow-md transition hover:bg-rise-hover"
        >
          <span className="mx-auto">
            {activePlan?.status === "active" ? "Ver mi plan" : "Crear un plan"}
          </span>

          <Leaf size={22} />
        </button>
      </div>
    </main>
  );
}

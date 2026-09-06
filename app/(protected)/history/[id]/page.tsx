"use client";

import { useParams, useRouter } from "next/navigation";
import { Leaf, History as HistoryButton } from "lucide-react";
import { RiseLoading } from "@/app/components/RiseLoading";
import { HeaderBg } from "@/app/components/HeaderBg";
import { HeaderButtons } from "@/app/components/HeaderButtons";
import { HeaderLogo } from "@/app/components/HeaderLogo";
import { useHistory } from "@/app/hooks/useHistory";
import { useRise } from "@/app/hooks/useRise";
import { HistoryTaskItem } from "@/app/components/HistoryTaskItem";

export default function HistoryDetail() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { plan: activePlan } = useRise();
  const { plan, loading, completedTasks, rejectedTasks, progress } = useHistory(
    params.id,
  );

  if (loading) {
    return <RiseLoading />;
  }
  if (!plan) {
    return null;
  }

  return (
    <main className="relative flex min-h-screen items-start justify-center overflow-hidden pb-8 pt-16 font-sans md:pt-22">
      <HeaderBg />

      <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />

      <div className="relative w-full max-w-2xl rounded-3xl border border-white/40 bg-[#fffaf2]/95 px-6 py-6 shadow-2xl backdrop-blur-md md:px-10 md:py-8">
        <HeaderButtons />

        <header className="flex flex-col items-center text-center">
          <HeaderLogo />
        </header>

        <h1 className="text-center text-2xl font-semibold text-rise">
          {plan.title}
        </h1>

        <p className="mt-3 text-center text-base font-medium leading-6 text-subtitle">
          {plan.summary}
        </p>

        <div className="mt-6 border-y border-border py-4">
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="font-medium text-subtitle">
              Resultado del plan
            </span>

            <span className="font-medium text-rise">{progress}%</span>
          </div>

          <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-rise/20">
            <div
              className="h-full rounded-full bg-rise-hover transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-4 flex gap-4 text-sm text-subtitle">
            <span>{completedTasks} realizadas</span>
            <span>{rejectedTasks} no realizadas</span>
          </div>
        </div>

        <section className="mt-5">
          <div className="flex flex-col">
            {plan.tasks.map((task) => (
              <HistoryTaskItem key={task.day} task={task} />
            ))}
          </div>
        </section>

        <div className="mt-6 border-b border-border pb-6 text-center">
          <p className="text-sm leading-5 text-neutral-500">
            Cada ciclo deja información útil para conocerte mejor y crear planes
            más realistas para ti.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => router.push("/history")}
            className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl border border-neutral-300 bg-transparent px-5 text-sm font-medium uppercase tracking-wider text-neutral-600 transition hover:bg-neutral-100"
          >
            Volver
            <HistoryButton size={20} />
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="flex h-14 cursor-pointer items-center justify-center gap-2 rounded-2xl bg-rise px-5 text-sm font-medium uppercase tracking-wider text-white shadow-md transition hover:bg-rise-hover"
          >
            {activePlan?.status === "active" ? "Ver mi plan" : "Crear un plan"}
            <Leaf size={20} />
          </button>
        </div>
      </div>
    </main>
  );
}

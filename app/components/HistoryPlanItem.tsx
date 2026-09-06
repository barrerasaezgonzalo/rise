"use client";

import { CheckCircle, ChevronRight, CircleOff, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { HistoryPlanItemProps } from "../types";
import { getPlanStats } from "../utils";

export function HistoryPlanItem({
  plan,
  planToDelete,
  setPlanToDelete,
  handleDeletePlan,
}: HistoryPlanItemProps) {
  const router = useRouter();

  const { completedTasks, rejectedTasks } = getPlanStats(plan);
  const isCompleted = plan.status === "completed";

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => router.push(`/history/${plan.id}`)}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          router.push(`/history/${plan.id}`);
        }
      }}
      className="group flex w-full cursor-pointer items-start gap-3 border-t border-neutral-200 px-1 py-4 text-left transition hover:rounded-xl hover:bg-neutral-50 sm:items-center sm:gap-4 sm:px-0 sm:py-3"
    >
      <div
        className={`mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full sm:mx-4 sm:mt-0 sm:h-10 sm:w-10 ${
          isCompleted
            ? "bg-emerald-100 text-emerald-700"
            : "bg-orange-100 text-orange-700"
        }`}
      >
        {isCompleted ? <CheckCircle size={19} /> : <CircleOff size={19} />}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <h2 className="min-w-0 text-sm font-semibold leading-5 text-neutral-700 sm:truncate">
            {plan.title}
          </h2>

          <span
            className={`shrink-0 text-[10px] font-semibold uppercase tracking-wider ${
              isCompleted ? "text-emerald-700" : "text-orange-700"
            }`}
          >
            {isCompleted ? "Completado" : "Abandonado"}
          </span>
        </div>

        <p className="mt-1 text-xs leading-4 text-neutral-400">
          {plan.summary}
        </p>

        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs">
          <span className="text-emerald-700">{completedTasks} realizadas</span>

          <span className="text-orange-600">{rejectedTasks} difíciles</span>
        </div>
      </div>

      <div className="relative flex shrink-0 flex-col items-center gap-3 pr-1">
        {planToDelete === plan.id ? (
          <div
            className="flex flex-col items-center gap-2"
            onClick={(event) => event.stopPropagation()}
          >
            <span className="text-xs font-medium text-orange-700">
              Eliminar
            </span>

            <div className="flex flex-row gap-2 items-center">
              <button
                type="button"
                onClick={() => setPlanToDelete(null)}
                className="cursor-pointer text-xs font-medium text-neutral-500"
              >
                No
              </button>

              <button
                type="button"
                onClick={(event) => {
                  event.stopPropagation();
                  handleDeletePlan(plan.id);
                }}
                className="cursor-pointer text-xs font-medium text-orange-700"
              >
                Sí
              </button>
            </div>
          </div>
        ) : (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setPlanToDelete(plan.id);
            }}
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-neutral-400"
          >
            <Trash2 size={17} />
          </button>
        )}

        <ChevronRight
          size={18}
          className="mt-2 shrink-0 text-neutral-300 transition group-hover:text-emerald-600"
        />
      </div>
    </div>
  );
}

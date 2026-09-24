import { Task } from "@/app/types";
import { Check, X, Rose, Clover } from "lucide-react";
import { useActivePlan } from "@/app/hooks/useActivePlan";
import { useState } from "react";

export function PlanActive() {
  const {
    handleTaskStatusChange,
    activePlan: plan,
    handleAbandonPlan,
    handleCompletePlan,
    allTasksFinished,
    completedCount,
    progressPercentage,
  } = useActivePlan();

  const [isConfirmingAbandon, setIsConfirmingAbandon] = useState(false);
  if (!plan) return null;

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-2">
      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            {plan.title}
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
            {plan.summary}
          </p>
        </div>

        <div className="w-full bg-white/20 border-emerald-600/10 border  p-3.5 rounded-xl space-y-2 shadow-xs">
          <div className="flex justify-between items-center text-xs font-bold text-slate-600 px-1">
            <span>Progreso del plan</span>
            <span className="text-emerald-600">
              {completedCount} de {plan.tasks.length} completadas (
              {progressPercentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-300/70 h-2.5 rounded-full overflow-hidden p-0.5">
            <div
              className="bg-emerald-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>

        <div className="w-full text-left space-y-2.5 mt-2">
          <h3 className="text-lg text-center font-semibold text-emerald-600 block px-1">
            Seguimiento de tus tareas activas:
          </h3>
          <div className="space-y-3">
            {plan.tasks.map((task: Task, index: number) => (
              <div
                key={index}
                className={`p-3.5 border rounded-xl text-sm transition-all space-y-2 ${
                  task.status === "completed"
                    ? "bg-emerald-100/50 border-emerald-600/30 shadow-xs"
                    : task.status === "rejected"
                      ? "bg-rose-100/90 border-rose-200"
                      : "bg-white/70 border-emerald-600/15"
                }`}
              >
                <div className="flex gap-3 items-start">
                  <span
                    className={`mt-0.5 h-6 w-6 items-center justify-center flex border rounded-full text-xs 
                                    ${
                                      task.status === "completed"
                                        ? "border-emerald-600/50  text-emerald-700 bg-emerald-100/60"
                                        : task.status === "rejected"
                                          ? "border-rose-600/50  text-rose-700 bg-rose-100/60"
                                          : "border-neutral-400/50 text-neutral-500 bg-neutral-100/60 "
                                    } `}
                  >
                    {index + 1}
                  </span>

                  <div className="flex-1">
                    <p className="font-semibold text-slate-800">{task.title}</p>
                    <p className="text-sm text-slate-600">{task.description}</p>
                  </div>
                </div>

                <div className="flex gap-2 pt-1 ">
                  <button
                    onClick={() => handleTaskStatusChange(index, "completed")}
                    className={`cursor-pointer flex-1 py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                      task.status === "completed"
                        ? "bg-emerald-600 text-white shadow-xs"
                        : "bg-white border border-emerald-600/20 text-emerald-800 hover:bg-emerald-50"
                    }`}
                  >
                    Lo hice
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleTaskStatusChange(index, "rejected")}
                    className={`cursor-pointer flex-1 py-2 px-3 rounded-xl font-medium text-xs flex items-center justify-center gap-1.5 transition-all ${
                      task.status === "rejected"
                        ? "bg-rose-400 text-white shadow-xs"
                        : "bg-white border border-rose-200 text-rose-600 hover:bg-rose-50"
                    }`}
                  >
                    No pude hacerlo
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex-col md:flex-row flex items-center gap-2.5 mt-6">
        {isConfirmingAbandon ? (
          <div className="w-full md:w-1/2 flex items-center gap-1 bg-rose-100 rounded-lg">
            <button
              onClick={handleAbandonPlan}
              className="cursor-pointer flex-1 py-2 bg-rose-400 hover:bg-rose-500 text-neutral-100 font-medium rounded-md text-sm transition-all shadow-xs flex items-center justify-center gap-1"
            >
              <span>Sí, abandonar</span>
            </button>
            <button
              onClick={() => setIsConfirmingAbandon(false)}
              className="cursor-pointer px-3 py-2.5 bg-white border-emerald-600/20 text-emerald-800 hover:bg-emerald-50 font-medium rounded-md text-xs transition-all border border-slate-200"
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={() => setIsConfirmingAbandon(true)}
            className="cursor-pointer w-full md:w-1/2 py-3.5 bg-rose-50 hover:bg-rose-200 font-medium rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide"
          >
            <span className="mx-auto w-full text-rose-400 uppercase">
              Abandonar Plan
            </span>
            <Rose className="ml-auto w-5 h-5 mr-4 text-rose-400" />
          </button>
        )}

        <button
          onClick={handleCompletePlan}
          disabled={!allTasksFinished}
          className={`cursor-pointer w-full md:w-1/2 py-3.5 font-medium text-emerald-200 bg-emerald-600 rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide
                    ${
                      allTasksFinished
                        ? "hover:bg-emerald-700 "
                        : "opacity-40 cursor-not-allowed shadow-none"
                    }`}
        >
          <span className="mx-auto w-full  uppercase">Completar Plan</span>
          <Clover className="ml-auto w-5 h-5 mr-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
}

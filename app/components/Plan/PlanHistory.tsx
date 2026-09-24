import { Plan, Task } from "@/app/types";
import {
  ChevronUp,
  ChevronDown,
  BroomSparkles,
  Trash2,
  AlertTriangle,
} from "lucide-react";
import { useHistoryPlans } from "@/app/hooks/useHistoryPlans";
import { useState } from "react";
import { usePlanView } from "@/app/hooks/usePlanView";

export function PlanHistory() {
  const {
    historyPlans,
    expandedPlanId,
    toggleExpandPlan,
    handleDeleteHistoryPlan,
  } = useHistoryPlans();
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const { handleHomeClick } = usePlanView();

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-2">
      <div className="space-y-4 w-full flex flex-col items-center">
        <div className="w-full text-left space-y-3 mt-2 max-h-[340px] overflow-y-auto pr-1">
          <h3 className="text-lg font-semibold text-center text-emerald-600 block px-1">
            Tu recorrido:
          </h3>
          {historyPlans.map((plan: Plan) => {
            const isExpanded = expandedPlanId === plan.id;
            const isConfirming = confirmDeleteId === plan.id;

            return (
              <div
                key={plan.id}
                className="p-3.5 bg-white/70 border border-emerald-600/15 rounded-xl text-sm space-y-2 transition-all"
              >
                {isConfirming ? (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-3 text-xs my-1">
                    <div className="flex items-center gap-1.5 text-rose-700 font-medium text-left">
                      <AlertTriangle className="w-4 h-4 shrink-0" />
                      <span>¿Eliminar este plan del historial?</span>
                    </div>
                    <div className="flex gap-2 w-full sm:w-auto justify-end">
                      <button
                        type="button"
                        onClick={() => setConfirmDeleteId(null)}
                        className="px-3 py-1.5 bg-white hover:bg-neutral-100 text-neutral-700 border border-neutral-300 rounded-md font-medium transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          handleDeleteHistoryPlan(plan.id);
                          setConfirmDeleteId(null);
                        }}
                        className="px-3 py-1.5 bg-rose-600 hover:bg-rose-700 text-white rounded-md font-medium transition-colors"
                      >
                        Sí, eliminar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="cursor-pointer flex flex-col md:flex-row items-center justify-between">
                      <div
                        onClick={() => toggleExpandPlan(plan.id)}
                        className="space-y-0.5 text-left flex-1"
                      >
                        <p className="font-semibold text-slate-800">
                          {plan.title}
                        </p>
                        <p className="text-xs text-slate-600 line-clamp-1 mr-2">
                          {plan.summary}
                        </p>
                      </div>
                      <div className="flex ml-auto items-center gap-2 mt-4 md:mt-0">
                        <span
                          className={`px-2.5 py-1 rounded-lg text-xs font-medium ${
                            plan.status === "completed"
                              ? "bg-emerald-500/20 text-emerald-800 border border-emerald-700/20"
                              : "bg-rose-100 text-rose-500/80 border border-rose-200"
                          }`}
                        >
                          {plan.status === "completed"
                            ? "Completado"
                            : "Abandonado"}
                        </span>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setConfirmDeleteId(plan.id);
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50"
                          title="Eliminar plan"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <div onClick={() => toggleExpandPlan(plan.id)}>
                          {isExpanded ? (
                            <ChevronUp className="w-4 h-4 text-slate-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-slate-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    {isExpanded && (
                      <div className="pt-2.5 border-t border-emerald-600/10 space-y-2">
                        {plan.tasks.map((task: Task, tIndex: number) => (
                          <div
                            key={task.id || tIndex}
                            className="p-2.5 bg-neutral-200/30 border border-neutral-300/20 rounded-lg text-xs flex flex-col md:flex-row justify-between items-center"
                          >
                            <div className="text-left">
                              <p className="font-semibold text-slate-800">
                                {task.title}
                              </p>
                              <p className="text-slate-600 mr-4">
                                {task.description}
                              </p>
                            </div>
                            <span
                              className={`px-2 py-0.5 mt-2 md:mt-0 ml-auto rounded-md font-medium text-[10px] ${
                                task.status === "completed"
                                  ? "bg-emerald-100 text-emerald-900"
                                  : task.status === "rejected"
                                    ? "bg-rose-100 text-rose-500/80"
                                    : "bg-neutral-200 text-neutral-600"
                              }`}
                            >
                              {task.status === "completed"
                                ? "Realizado"
                                : task.status === "rejected"
                                  ? "No Realizado"
                                  : "Pendiente"}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="w-full mt-8">
        <button
          onClick={handleHomeClick}
          className="w-full cursor-pointer py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide"
        >
          <span className="mx-auto w-full text-emerald-200 uppercase">
            Volver al inicio{" "}
          </span>
          <BroomSparkles className="ml-auto w-5 h-5 mr-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
}

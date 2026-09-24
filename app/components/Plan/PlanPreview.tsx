import { useCheckIn } from "@/app/hooks/useCheckIn";
import { Task } from "@/app/types";
import { Clover, Rose } from "lucide-react";

export function PlanPreview() {
  const {
    handleAcceptPlan,
    draftPlan: plan,
    handleRejectPlan,
    loadingAction,
  } = useCheckIn();
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

        <div className="w-full text-left space-y-2.5 mt-2">
          <h3 className="text-lg text-center font-semibold text-emerald-600 block px-1">
            Tareas recomendadas para ti:
          </h3>
          <div className="space-y-2.5">
            {plan.tasks.map((task: Task, index: number) => (
              <div
                key={task.id || index}
                className="p-3 bg-white/70 border border-emerald-600/15 rounded-lg text-sm space-y-1 flex gap-3"
              >
                <span className="mt-0.5 text-emerald-700 bg-emerald-100/60 h-6 w-6 items-center justify-center flex border border-emerald-600/50 rounded-full text-xs">
                  {index + 1}
                </span>
                <div className="flex-1">
                  <p className="font-semibold text-slate-800">{task.title}</p>
                  <p className="text-sm text-slate-600">{task.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="w-full flex-col md:flex-row flex items-center gap-2.5 mt-6">
        <button
          disabled={loadingAction}
          onClick={handleRejectPlan}
          className="cursor-pointer w-full md:w-1/2 py-3.5 bg-rose-50 hover:bg-rose-200 font-medium rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide disabled:opacity-40"
        >
          <span className="mx-auto w-full text-rose-400 uppercase">
            Rechazar Plan
          </span>
          <Rose className="ml-auto w-5 h-5 mr-4 text-rose-400" />
        </button>
        <button
          disabled={loadingAction}
          onClick={handleAcceptPlan}
          className="cursor-pointer w-full md:w-1/2 py-3.5 bg-emerald-600 hover:bg-emerald-700 font-medium rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide disabled:opacity-40"
        >
          <span className="mx-auto w-full text-emerald-200 uppercase">
            Aceptar Plan
          </span>
          <Clover className="ml-auto w-5 h-5 mr-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
}

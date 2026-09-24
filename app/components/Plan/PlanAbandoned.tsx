import { BroomSparkles } from "lucide-react";
import { usePlanView } from "@/app/hooks/usePlanView";

export function PlanAbandoned() {
  const { handleHomeClick } = usePlanView();
  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-6">
      <div className="flex flex-col items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            No te preocupes, mañana es un nuevo día
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
            El camino del bienestar tiene altibajos, y saber cuándo parar y
            escuchar a tu cuerpo también es parte del crecimiento. Lo importante
            es no rendirse y recordar que siempre podrás retomar el rumbo cuando
            estés listo{" "}
          </p>
        </div>
      </div>

      <div className="w-full mt-8">
        <button
          onClick={handleHomeClick}
          className="w-full cursor-pointer py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide"
        >
          <span className="mx-auto w-full text-emerald-200 uppercase">
            Intentarlo de nuevo{" "}
          </span>
          <BroomSparkles className="ml-auto w-5 h-5 mr-4 text-emerald-200" />
        </button>
      </div>
    </div>
  );
}

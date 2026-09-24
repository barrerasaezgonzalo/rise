import { BroomSparkles } from "lucide-react";
import { usePlanView } from "@/app/hooks/usePlanView";

export function PlanCompleted() {
  const { handleHomeClick } = usePlanView();

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-6">
      <div className="flex flex-col items-center">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">
            ¡Felicitaciones por completar tu plan de bienestar!
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
            Has finalizado tu plan de bienestar. Cada actividad que completaste
            y cada obstáculo que enfrentaste forman parte de tu aprendizaje y
            crecimiento. Tu constancia para llegar hasta aquí demuestra un
            verdadero compromiso contigo mismo. ¡Sigue adelante!
          </p>
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

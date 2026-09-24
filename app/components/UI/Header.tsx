import { useState } from "react";
import { TOTAL_QUESTIONS_TO_ASK } from "@/app/constants";
import { useCheckIn } from "@/app/hooks/useCheckIn";
import { useAuth } from "@/app/hooks/useAuth";
import {
  BroomSparkles,
  Leaf,
  SquircleDashed,
  Sparkles,
  LogOut,
  History,
  Sunrise,
  Footprints,
} from "lucide-react";
import { useActivePlan } from "@/app/hooks/useActivePlan";
import { usePlanView } from "@/app/hooks/usePlanView";

export function Header() {
  const { view, setView, currentStep } = useCheckIn();
  const { user, logout } = useAuth();
  const [isConfirmingLogout, setIsConfirmingLogout] = useState(false);
  const { activePlan } = useActivePlan();
  const { handleHomeClick } = usePlanView();

  const viewConfig: Record<string, { icon: React.ReactNode; text: string }> = {
    checkin: {
      icon: <Leaf className="w-4 h-4 text-emerald-700" />,
      text: `Pregunta ${currentStep} de ${TOTAL_QUESTIONS_TO_ASK}`,
    },
    preview: {
      icon: <SquircleDashed className="w-4 h-4 text-emerald-700" />,
      text: "Propuesta de Plan",
    },
    active: {
      icon: <Sparkles className="w-4 h-4 text-emerald-700" />,
      text: "Plan Activo",
    },
    completed: {
      icon: <Sunrise className="w-4 h-4 text-emerald-700" />,
      text: "Plan Completado",
    },
    abandoned: {
      icon: <Footprints className="w-4 h-4 text-emerald-700" />,
      text: "Plan Abandonado",
    },
    history: {
      icon: <History className="w-4 h-4 text-emerald-700" />,
      text: "Historial de Planes",
    },
  };
  const currentBadge = viewConfig[view];
  return (
    <div className="flex items-center text-sm mb-2">
      <button
        onClick={handleHomeClick}
        title="Inicio"
        className="outline-none bg-emerald-500/20 border border-emerald-700/20 mr-2 cursor-pointer hover:bg-emerald-500/40 px-1.5 py-1.5 rounded-lg flex items-center gap-2 shadow-xs"
      >
        <BroomSparkles className="w-4 h-4 text-emerald-700" />
      </button>
      {currentBadge && (
        <span className="bg-emerald-500/20 border border-emerald-700/20 text-emerald-800/80 px-3 py-1 rounded-lg flex items-center gap-2 shadow-xs">
          {currentBadge.icon}
          {currentBadge.text}
        </span>
      )}
      <div className="flex gap-3 text-emerald-900/80 items-center ml-auto">
        {activePlan && view !== "active" && (
          <button
            onClick={() => setView("active")}
            className="cursor-pointer hover:text-emerald-950 transition flex items-center gap-1.5"
          >
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span className="hidden md:flex">Ver plan activo</span>
          </button>
        )}
        {view !== "history" && (
          <button
            onClick={() => setView("history")}
            className="cursor-pointer text-emerald-800/80 hover:text-emerald-600 transition flex items-center gap-1"
          >
            <History className="w-4 h-4" />
            <span className="hidden md:flex"> Historial</span>
          </button>
        )}
        {user &&
          (isConfirmingLogout ? (
            <div className="flex items-center gap-1.5 text-orange-800/90 font-medium">
              <span className="hidden md:flex">¿Desconectar?</span>
              <button
                onClick={logout}
                className="underline hover:text-orange-600 cursor-pointer"
              >
                Sí
              </button>
              <span>/</span>
              <button
                onClick={() => setIsConfirmingLogout(false)}
                className="underline hover:text-orange-600 cursor-pointer"
              >
                No
              </button>
            </div>
          ) : (
            <button
              onClick={() => setIsConfirmingLogout(true)}
              className="cursor-pointer text-orange-800/80 hover:text-orange-600 transition flex items-center gap-1"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden md:flex"> Desconectar</span>
            </button>
          ))}
      </div>
    </div>
  );
}

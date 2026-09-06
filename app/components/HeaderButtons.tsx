import { History, Leaf, LogIn, LogOut, Sparkles } from "lucide-react";
import { useRise } from "../hooks/useRise";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

export function HeaderButtons() {
  const { questionIndex, totalQuestions, plan } = useRise();
  const [confirmLogout, setConfirmLogout] = useState(false);
  const { user, logout, loginWithGoogle } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const isHistoryPage = pathname.startsWith("/history");

  return (
    <div className="absolute left-4 right-4 top-4 flex items-center sm:left-6 sm:right-6 sm:top-5">
      {isHistoryPage ? (
        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-rise/50 bg-rise-soft px-3 py-2 text-sm text-rise">
          <Leaf size={15} />
          Tu recorrido
        </div>
      ) : plan?.status === "active" ? (
        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-rise/50 bg-rise-soft px-3 py-2 text-sm text-rise">
          <Sparkles size={13} />
          Tu plan está listo
        </div>
      ) : plan?.status === "completed" ? (
        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-rise/50 bg-rise-soft px-3 py-2 text-sm text-rise">
          <Leaf size={15} />
          Plan completado
        </div>
      ) : plan?.status === "cancelled" ? (
        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-rise/50 bg-rise-soft px-3 py-2 text-sm text-rise">
          <Leaf size={15} />
          Plan cancelado
        </div>
      ) : (
        <div className="hidden md:inline-flex items-center gap-2 rounded-full border border-rise/50 bg-rise-soft px-3 py-2 text-sm text-rise">
          <Leaf size={15} />

          <span>
            Pregunta {questionIndex + 1} de {totalQuestions}
          </span>
        </div>
      )}

      <div className="ml-auto flex items-center gap-0 sm:gap-4">
        {user && (
          <button
            type="button"
            onClick={() => router.push("/history")}
            title="Historial"
            aria-label="Historial"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-subtitle transition  sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-none"
          >
            <History className="h-6 w-6 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Historial</span>
          </button>
        )}

        {plan?.status === "active" && (
          <button
            type="button"
            onClick={() => router.push("/")}
            title="Ver mi plan"
            aria-label="Ver mi plan"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-rise transition sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-none"
          >
            <Leaf className="h-6 w-6 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Ver mi plan</span>
          </button>
        )}

        {user ? (
          confirmLogout ? (
            <div className="flex items-center gap-2">
              <span className="hidden text-sm text-orange-700 sm:inline">
                ¿Desconectar?
              </span>

              <button
                type="button"
                onClick={() => setConfirmLogout(false)}
                className="cursor-pointer text-xs text-subtitle transition hover:text-title sm:text-sm"
              >
                No
              </button>

              <button
                type="button"
                onClick={logout}
                className="cursor-pointer text-xs font-medium text-orange-700 transition hover:text-orange-900 sm:text-sm"
              >
                Sí
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setConfirmLogout(true)}
              title="Desconectar"
              aria-label="Desconectar"
              className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-orange-700 transition hover:bg-orange-50 sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-none"
            >
              <LogOut className="h-6 w-6 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Desconectar</span>
            </button>
          )
        ) : (
          <button
            type="button"
            onClick={loginWithGoogle}
            title="Iniciar sesión"
            aria-label="Iniciar sesión"
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full text-rise transition hover:bg-rise-soft sm:h-auto sm:w-auto sm:gap-1.5 sm:rounded-none"
          >
            <LogIn className="h-6 w-6 sm:h-4 sm:w-4" />
            <span className="hidden sm:inline">Iniciar sesión</span>
          </button>
        )}
      </div>
    </div>
  );
}

import { Leaf } from "lucide-react";
import { useRise } from "../hooks/useRise";

export function HomeHero() {
  const { questionIndex, totalQuestions, progress } = useRise();

  return (
    <>
      <p className="text-2xl font-semibold text-title md:text-3xl">
        ¡Bienvenido a tu viaje de bienestar!
      </p>

      <p className="mt-2 text-sm text-subtitle md:text-base">
        Tómate un momento. No hay respuestas incorrectas.
      </p>

      <div className="inline-flex md:hidden mt-4 items-center gap-2 rounded-full bg-rise-soft border border-rise/50 px-3 py-2 text-sm text-rise">
        <Leaf size={15} />

        <span>
          Pregunta {questionIndex + 1} de {totalQuestions}
        </span>
      </div>

      <div className="mt-8 h-2 w-full overflow-hidden rounded-full bg-rise/20">
        <div
          className="h-full rounded-full bg-rise-hover transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </>
  );
}

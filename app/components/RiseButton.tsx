import { Leaf } from "lucide-react";
import { useRise } from "../hooks/useRise";

export function RiseButton() {
  const { handleContinue, answer, isLastQuestion, loading } = useRise();

  return (
    <button
      type="button"
      onClick={handleContinue}
      disabled={!answer.trim() || loading}
      className="flex w-full cursor-pointer items-center rounded-2xl bg-rise px-5 py-4 text-sm font-medium uppercase tracking-wider text-background shadow-md transition hover:bg-rise-hover disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {" "}
      <span></span>
      <span className="mx-auto">
        {loading
          ? isLastQuestion
            ? "Generando plan..."
            : "Generando pregunta..."
          : isLastQuestion && answer.trim()
            ? "Generar plan"
            : "Siguiente pregunta"}
      </span>
      <Leaf size={22} />
    </button>
  );
}

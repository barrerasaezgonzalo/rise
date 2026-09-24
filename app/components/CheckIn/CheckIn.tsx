import { Leaf, Sparkles } from "lucide-react";
import { useCheckIn } from "@/app/hooks/useCheckIn";
import { MIN_QUESTIONS_TO_ASK } from "@/app/constants";

export function CheckIn() {
  const {
    currentStep,
    inputAnswer,
    setInputAnswer,
    handleNextQuestion,
    handleGeneratePlan,
    loadingQuestion,
    loadingPlan,
    progressPercent,
    isLastStep,
    currentQuestion,
  } = useCheckIn();

  return (
    <div className="flex flex-col items-center text-center flex-1 justify-between py-1">
      <div className="space-y-3 w-full flex flex-col items-center">
        <div className="w-full bg-neutral-300 h-1.5 rounded-full overflow-hidden my-2 mb-6">
          <div
            className="bg-emerald-700 h-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="space-y-1">
          <h1 className="text-3xl mb-4 font-bold tracking-tight text-slate-800">
            ¡Bienvenido a tu viaje de bienestar!
          </h1>
          <p className="text-sm text-slate-600 font-normal max-w-xl mx-auto leading-relaxed">
            A través de este breve espacio de reflexión, responderás unas
            preguntas diseñadas para comprender tu estado actual y generar un
            plan de bienestar personalizado para ti.
          </p>
        </div>
      </div>

      <div className="relative w-full text-center space-y-2 mt-8 mb-2">
        <label className="text-lg font-semibold text-emerald-600 block px-1">
          {currentQuestion}
        </label>
        <textarea
          className="w-full p-2 bg-emerald-50/60 border border-emerald-600/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-600/20 text-slate-400 text-sm resize-none h-35 placeholder:text-slate-400 shadow-inner transition-all"
          placeholder="Tómate un momento. No hay respuestas incorrectas."
          value={inputAnswer}
          maxLength={500}
          onChange={(e) => setInputAnswer(e.target.value)}
        />
        <span className="absolute right-5 bottom-5 text-emerald-600/50 text-xs">
          {inputAnswer.length}/500
        </span>
      </div>

      <div className="w-full flex-col md:flex-row flex items-center gap-2.5">
        {currentStep > MIN_QUESTIONS_TO_ASK && (
          <button
            disabled={loadingPlan}
            onClick={handleGeneratePlan}
            className="cursor-pointer w-full md:w-2/5 py-3.5 bg-orange-300/60 text-orange-900 font-medium rounded-lg transition-all shadow-xs flex items-center justify-center gap-1.5 text-sm tracking-wide hover:bg-orange-300  disabled:opacity-40"
          >
            <span className="mx-auto w-full text-orange-500 uppercase">
              Generar Plan{" "}
            </span>
            <Sparkles className="w-5 h-5 mr-4 text-orange-500" />
          </button>
        )}

        {!isLastStep && (
          <button
            onClick={handleNextQuestion}
            disabled={inputAnswer.trim().length < 6 || loadingQuestion}
            className={`cursor-pointer py-3.5 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-medium rounded-lg transition-all shadow-md flex items-center justify-center gap-1.5 text-sm tracking-wide ${currentStep >= 4 ? "w-full md:w-3/5" : "w-full"}`}
          >
            <span className="mx-auto w-full text-emerald-200 uppercase">
              Siguiente Pregunta{" "}
            </span>
            <Leaf className="ml-auto w-5 h-5 mr-4 text-emerald-200" />
          </button>
        )}
      </div>
    </div>
  );
}

import { Leaf } from "lucide-react";
import { useRise } from "../hooks/useRise";
import { useAutoFocus } from "../hooks/useAutoFocus";

export function HomeInput() {
  const { question, answer, setAnswer, loading, questionIndex } = useRise();
  const textareaRef = useAutoFocus(questionIndex);
  return (
    <section className="mt-8">
      <h2 className="text-center text-xl font-semibold leading-snug text-rise md:text-2xl">
        {question}
      </h2>

      <div className="relative mt-5">
        <textarea
          ref={textareaRef}
          disabled={loading || questionIndex >= 6}
          rows={6}
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Permítete fluir y escribe tus pensamientos aquí..."
          className="w-full resize-none rounded-2xl border border-rise/50 bg-rise/10 p-5 pr-12 text-base text-rise shadow-inner outline-none transition placeholder:text-subtitle/50 focus:border-rise"
        />

        <Leaf size={20} className="absolute bottom-4 right-4 text-rise/50" />
      </div>
    </section>
  );
}

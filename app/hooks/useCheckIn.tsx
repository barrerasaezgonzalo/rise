import { useContext, useState } from "react";
import { RiseContext } from "../providers/RiseProvider";
import { Plan, Task } from "../types";
import { TOTAL_QUESTIONS_TO_ASK } from "../constants";

export function useCheckIn() {
  const context = useContext(RiseContext);
  if (!context) {
    throw new Error("useCheckIn debe usarse dentro de RiseProvider");
  }

  const {
    currentStep,
    setCurrentStep,
    answers,
    setAnswers,
    setView,
    setDraftPlan,
    draftPlan,
    setActivePlan,
    selectedQuestions,
    setSelectedQuestions,
    shuffleQuestions,
  } = context;
  const [inputAnswer, setInputAnswer] = useState("");
  const [loadingQuestion, setLoadingQuestion] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  const [loadingAction, setLoadingAction] = useState(false);
  const questionsList = selectedQuestions.length > 0 ? selectedQuestions : [];
  const totalQuestions = TOTAL_QUESTIONS_TO_ASK;

  const handleGeneratePlan = async () => {
    let finalAnswers = answers;

    if (inputAnswer.trim()) {
      const currentQ = questionsList[currentStep - 1] || "";
      finalAnswers = [
        ...answers,
        {
          question: currentQ,
          answer: inputAnswer,
        },
      ];
      setAnswers(finalAnswers);
      setInputAnswer("");
    }

    setLoadingPlan(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: finalAnswers }),
      });

      if (res.ok) {
        const data = await res.json();
        const planData = data.plan || data;

        if (planData) {
          const generatedPlan: Plan = {
            id: planData.id || Date.now().toString(),
            user_id: planData.user_id,
            title: planData.title,
            summary: planData.summary,
            status: "draft",
            tasks: planData.tasks.map((task: Task, index: number) => ({
              id: task.id || `t-${index + 1}`,
              order: task.order ?? index + 1,
              title: task.title,
              description: task.description,
              status: "pending",
            })),
          };
          setDraftPlan(generatedPlan);
          setView("preview");
        }
      }
    } catch (error) {
      console.error("Error generando el plan con Groq:", error);
    } finally {
      setLoadingPlan(false);
    }
  };

  const handleNextQuestion = async () => {
    if (!inputAnswer.trim()) return;
    const currentQ = questionsList[currentStep - 1] || "";
    const updatedAnswers = [
      ...answers,
      {
        question: currentQ,
        answer: inputAnswer,
      },
    ];
    setAnswers(updatedAnswers);
    setInputAnswer("");

    if (currentStep < totalQuestions) {
      setLoadingQuestion(true);
      try {
        const res = await fetch("/api/question", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ answers: updatedAnswers }),
        });

        if (res.ok) {
          const data = await res.json();
          if (data.question) {
            const updatedQuestions = [...selectedQuestions];
            updatedQuestions[currentStep] = data.question;
            setSelectedQuestions(updatedQuestions);
          }
        }
      } catch (error) {
        console.error(
          "Error obteniendo siguiente pregunta con contexto:",
          error,
        );
      } finally {
        setLoadingQuestion(false);
      }

      setCurrentStep(currentStep + 1);
    }
  };

  const handleAcceptPlan = async () => {
    if (!draftPlan || loadingAction) return;

    setLoadingAction(true);
    try {
      const res = await fetch(`/api/plan/${draftPlan.id}/activate`, {
        method: "PATCH",
      });

      if (res.ok) {
        const accepted = {
          ...draftPlan,
          status: "active" as const,
        };
        setActivePlan(accepted);
        setDraftPlan(null);
        setView("active");
      }
    } catch (error) {
      console.error("Error al activar el plan:", error);
    } finally {
      setLoadingAction(false);
    }
  };

  const handleRejectPlan = async () => {
    if (loadingAction) return;

    setLoadingAction(true);
    if (draftPlan) {
      try {
        await fetch(`/api/plan/${draftPlan.id}`, {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Error al eliminar el plan en preview:", error);
      } finally {
        setLoadingAction(false);
      }
    } else {
      setLoadingAction(false);
    }
    setView("checkin");
    setCurrentStep(1);
    setAnswers([]);
    setInputAnswer("");
    shuffleQuestions();
    setDraftPlan(null);
  };

  const progressPercent = (currentStep / totalQuestions) * 100;
  const isLastStep = currentStep === totalQuestions;
  const currentQuestion =
    questionsList[currentStep - 1] || "Cargando pregunta...";

  return {
    ...context,
    currentStep,
    inputAnswer,
    answers,
    questionsList,
    totalQuestions,
    setInputAnswer,
    handleNextQuestion,
    handleGeneratePlan,
    handleAcceptPlan,
    handleRejectPlan,
    loadingQuestion,
    loadingPlan,
    loadingAction,
    progressPercent,
    isLastStep,
    currentQuestion,
  };
}

import { CheckIn } from "../components/CheckIn/CheckIn";
import { PlanPreview } from "../components/Plan/PlanPreview";
import { PlanActive } from "../components/Plan/PlanActive";
import { PlanCompleted } from "../components/Plan/PlanCompleted";
import { PlanAbandoned } from "../components/Plan/PlanAbandoned";
import { PlanHistory } from "../components/Plan/PlanHistory";
import { useContext } from "react";
import { RiseContext } from "../providers/RiseProvider";

export function usePlanView() {
  const context = useContext(RiseContext);
  if (!context) {
    throw new Error("usePlanView debe usarse dentro de RiseProvider");
  }

  const {
    view,
    draftPlan,
    activePlan,
    setView,
    setCurrentStep,
    setAnswers,
    shuffleQuestions,
  } = context;

  const handleHomeClick = () => {
    setCurrentStep(1);
    setAnswers([]);
    shuffleQuestions();
    if (activePlan) {
      setView("active");
    } else {
      setView("checkin");
    }
  };

  const viewComponents = {
    checkin: <CheckIn />,
    preview: draftPlan ? <PlanPreview /> : null,
    active: activePlan ? <PlanActive /> : <CheckIn />,
    completed: <PlanCompleted />,
    abandoned: <PlanAbandoned />,
    history: <PlanHistory />,
  } as const;

  const currentView = viewComponents[view as keyof typeof viewComponents] ?? (
    <CheckIn />
  );

  return {
    ...context,
    currentView,
    handleHomeClick,
  };
}

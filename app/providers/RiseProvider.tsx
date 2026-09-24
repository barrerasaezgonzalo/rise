"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { Answer, Plan, RiseView } from "../types";
import { mockQuestions } from "../constants";

type RiseContextType = {
  view: RiseView;
  setView: React.Dispatch<React.SetStateAction<RiseView>>;
  activePlan: Plan | null;
  setActivePlan: React.Dispatch<React.SetStateAction<Plan | null>>;
  currentStep: number;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  answers: Answer[];
  setAnswers: React.Dispatch<React.SetStateAction<Answer[]>>;
  draftPlan: Plan | null;
  setDraftPlan: React.Dispatch<React.SetStateAction<Plan | null>>;
  historyPlans: Plan[] | [];
  setHistoryPlans: React.Dispatch<React.SetStateAction<Plan[] | []>>;
  selectedQuestions: string[];
  setSelectedQuestions: React.Dispatch<React.SetStateAction<string[]>>;
  shuffleQuestions: () => void;
  loadingInitial: boolean;
};

export const RiseContext = createContext<RiseContextType | null>(null);

export function RiseProvider({ children }: { children: React.ReactNode }) {
  const [view, setView] = useState<RiseView>("checkin");
  const [activePlan, setActivePlan] = useState<Plan | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [draftPlan, setDraftPlan] = useState<Plan | null>(null);
  const [historyPlans, setHistoryPlans] = useState<Plan[] | []>([]);
  const [selectedQuestions, setSelectedQuestions] = useState<string[]>(() =>
    [...mockQuestions].sort(() => 0.5 - Math.random()),
  );
  const [loadingInitial, setLoadingInitial] = useState(true);

  const shuffleQuestions = useCallback(() => {
    const shuffled = [...mockQuestions].sort(() => 0.5 - Math.random());
    setSelectedQuestions(shuffled);
  }, []);

  useEffect(() => {
    const checkActivePlan = async () => {
      try {
        const res = await fetch("/api/plan/active");
        if (res.ok) {
          const data = await res.json();
          if (data) {
            setActivePlan(data);
            setView("active");
          }
        }
      } catch (error) {
        console.error("Error verificando plan activo inicial:", error);
      } finally {
        setLoadingInitial(false);
      }
    };

    checkActivePlan();
  }, []);

  return (
    <RiseContext.Provider
      value={{
        view,
        setView,
        activePlan,
        setActivePlan,
        currentStep,
        setCurrentStep,
        answers,
        setAnswers,
        draftPlan,
        setDraftPlan,
        historyPlans,
        setHistoryPlans,
        selectedQuestions,
        setSelectedQuestions,
        shuffleQuestions,
        loadingInitial,
      }}
    >
      {children}
    </RiseContext.Provider>
  );
}

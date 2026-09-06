"use client";

import { createContext, useEffect, useState } from "react";
import { useRiseApi } from "../hooks/useRiseApi";
import { checkInQuestions, totalQuestions } from "../constants";
import { Answer, RisePlan } from "../types";
import { useRiseFlow } from "../hooks/useRiseFlow";
import { RiseLoading } from "../components/RiseLoading";

type RiseContextType = {
  question: string;
  questionIndex: number;
  totalQuestions: number;
  answer: string;
  answers: Answer[];
  isLastQuestion: boolean;
  loading: boolean;
  completed: boolean;
  plan: RisePlan | null;
  planHistory: RisePlan[];
  setPlanHistory: React.Dispatch<React.SetStateAction<RisePlan[]>>;
  error: string;
  setError: (e: "") => void;
  setAnswer: (value: string) => void;
  handleContinue: () => Promise<void>;
  completePlan: () => Promise<void>;
  updateTaskStatus: (
    day: number,
    status: "pending" | "completed" | "rejected",
  ) => void;
  cancelPlan: () => Promise<void>;
  resetRise: () => void;
  initialLoading: boolean;
};

export const RiseContext = createContext<RiseContextType | null>(null);

export function RiseProvider({ children }: { children: React.ReactNode }) {
  const [initialLoading, setInitialLoading] = useState(true);
  const [question, setQuestion] = useState("");
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [loading, setLoading] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [plan, setPlan] = useState<RisePlan | null>(null);
  const [planHistory, setPlanHistory] = useState<RisePlan[]>([]);
  const [error, setError] = useState("");
  const isLastQuestion = questionIndex === totalQuestions - 1;

  const { getActivePlan, getPlanHistory } = useRiseApi();

  useEffect(() => {
    const loadRise = async () => {
      try {
        const [activePlan, history] = await Promise.all([
          getActivePlan(),
          getPlanHistory(),
        ]);

        setPlanHistory(history ?? []);

        if (activePlan) {
          setPlan(activePlan);
          setCompleted(true);
          return;
        }

        const randomIndex = Math.floor(Math.random() * checkInQuestions.length);

        setQuestion(checkInQuestions[randomIndex]);
      } catch (error) {
        console.error(error);
        setError("No se pudo cargar Rise");
      } finally {
        setInitialLoading(false);
      }
    };

    loadRise();
  }, [getActivePlan, getPlanHistory]);

  const {
    handleContinue,
    updateTaskStatus,
    completePlan,
    cancelPlan,
    resetRise,
  } = useRiseFlow({
    question,
    answer,
    answers,
    questionIndex,
    totalQuestions,
    plan,
    loading,
    setQuestion,
    setQuestionIndex,
    setAnswer,
    setAnswers,
    setLoading,
    setCompleted,
    setPlan,
    setError,
  });

  if (initialLoading) {
    return <RiseLoading />;
  }
  return (
    <RiseContext.Provider
      value={{
        question,
        questionIndex,
        totalQuestions,
        answer,
        answers,
        isLastQuestion,
        loading,
        completed,
        plan,
        planHistory,
        setPlanHistory,
        error,
        setError,
        setAnswer,
        handleContinue,
        completePlan,
        updateTaskStatus,
        cancelPlan,
        resetRise,
        initialLoading,
      }}
    >
      {children}
    </RiseContext.Provider>
  );
}

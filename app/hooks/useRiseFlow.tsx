"use client";

import { Dispatch, SetStateAction } from "react";
import { checkInQuestions } from "../constants";
import { Answer, RisePlan } from "../types";
import { useRiseApi } from "./useRiseApi";

type Props = {
  question: string;
  answer: string;
  answers: Answer[];
  questionIndex: number;
  totalQuestions: number;
  plan: RisePlan | null;
  loading: boolean;
  setQuestion: Dispatch<SetStateAction<string>>;
  setQuestionIndex: Dispatch<SetStateAction<number>>;
  setAnswer: Dispatch<SetStateAction<string>>;
  setAnswers: Dispatch<SetStateAction<Answer[]>>;
  setLoading: Dispatch<SetStateAction<boolean>>;
  setCompleted: Dispatch<SetStateAction<boolean>>;
  setPlan: Dispatch<SetStateAction<RisePlan | null>>;
  setError: Dispatch<SetStateAction<string>>;
};

export function useRiseFlow({
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
}: Props) {
  const {
    generateQuestion,
    generatePlan,
    completePlan: completePlanApi,
    cancelPlan: cancelPlanApi,
    updateTaskStatus: updateTaskStatusApi,
  } = useRiseApi();

  const handleContinue = async () => {
    if (!answer.trim() || loading) return;
    const newAnswer: Answer = { question, answer: answer.trim() };
    const updatedAnswers = [...answers, newAnswer];
    setAnswers(updatedAnswers);
    setAnswer("");
    setError("");
    setLoading(true);

    try {
      if (questionIndex === totalQuestions - 1) {
        const generatedPlan = await generatePlan(updatedAnswers);
        setPlan({
          ...generatedPlan,
          tasks: generatedPlan.tasks.map((task) => ({
            ...task,
            status: "pending",
          })),
        });
        setCompleted(true);
        return;
      }

      const nextQuestion = await generateQuestion(updatedAnswers);
      setQuestion(nextQuestion);
      setQuestionIndex((current) => current + 1);
    } catch (error) {
      console.error(error);
      setError("Algo salió mal. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  const updateTaskStatus = async (
    day: number,
    status: "pending" | "completed" | "rejected",
  ) => {
    if (!plan) return;

    try {
      await updateTaskStatusApi(plan.id, day, status);

      setPlan((current) => {
        if (!current) return null;

        return {
          ...current,
          tasks: current.tasks.map((task) =>
            task.day === day
              ? {
                  ...task,
                  status,
                }
              : task,
          ),
        };
      });
    } catch (error) {
      console.error(error);

      setError("No se pudo actualizar la tarea.");
    }
  };

  const completePlan = async () => {
    if (!plan || loading) return;

    const canCompletePlan =
      plan.tasks.length > 0 &&
      plan.tasks.every((task) => task.status !== "pending");

    if (!canCompletePlan) {
      setError("Debes resolver todas las tareas antes de completar el plan.");

      return;
    }

    setLoading(true);
    setError("");

    try {
      await completePlanApi(plan.id);

      const randomIndex = Math.floor(Math.random() * checkInQuestions.length);

      setPlan((current) =>
        current
          ? {
              ...current,
              status: "completed",
            }
          : null,
      );

      setCompleted(false);
      setAnswers([]);
      setAnswer("");
      setQuestionIndex(0);
      setQuestion(checkInQuestions[randomIndex]);
    } catch (error) {
      console.error(error);

      setError("No se pudo completar el plan.");
    } finally {
      setLoading(false);
    }
  };

  const cancelPlan = async () => {
    if (!plan || loading) return;
    setLoading(true);
    setError("");

    try {
      await cancelPlanApi(plan.id);
      setPlan((current) =>
        current
          ? {
              ...current,
              status: "cancelled",
            }
          : null,
      );
    } catch (error) {
      console.error(error);
      setError("No se pudo cancelar el plan.");
    } finally {
      setLoading(false);
    }
  };

  const resetRise = () => {
    const randomIndex = Math.floor(Math.random() * checkInQuestions.length);
    setQuestion(checkInQuestions[randomIndex]);
    setQuestionIndex(0);
    setAnswer("");
    setAnswers([]);
    setCompleted(false);
    setPlan(null);
    setError("");
  };

  return {
    handleContinue,
    updateTaskStatus,
    completePlan,
    cancelPlan,
    resetRise,
  };
}

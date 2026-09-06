"use client";

import { useCallback } from "react";
import { Answer, RisePlan } from "../types";
import { useToast } from "./useToast";

async function getApiError(response: Response, fallback: string) {
  const data = await response.json().catch(() => null);

  return data?.error ?? fallback;
}

export function useRiseApi() {
  const { showToast } = useToast();

  const generateQuestion = useCallback(
    async (currentAnswers: Answer[]) => {
      const response = await fetch("/api/rise/question", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: currentAnswers }),
      });

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo generar la siguiente pregunta",
        );

        showToast(message);
        throw new Error(message);
      }

      const data = await response.json();

      return data.question as string;
    },
    [showToast],
  );

  const generatePlan = useCallback(
    async (currentAnswers: Answer[]) => {
      const response = await fetch("/api/rise/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers: currentAnswers }),
      });

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo generar el plan",
        );

        showToast(message);
        throw new Error(message);
      }

      return (await response.json()) as RisePlan;
    },
    [showToast],
  );

  const completePlan = useCallback(
    async (planId: string) => {
      const response = await fetch("/api/rise/plan/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo completar el plan",
        );

        showToast(message);
        throw new Error(message);
      }
    },
    [showToast],
  );

  const cancelPlan = useCallback(
    async (planId: string) => {
      const response = await fetch("/api/rise/plan/cancel", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId }),
      });

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo cancelar el plan",
        );

        showToast(message);
        throw new Error(message);
      }
    },
    [showToast],
  );

  const getActivePlan = useCallback(async () => {
    const response = await fetch("/api/rise/plan/active");

    if (!response.ok) {
      const message = await getApiError(
        response,
        "No se pudo cargar el plan activo",
      );

      showToast(message);
      throw new Error(message);
    }

    return await response.json();
  }, [showToast]);

  const getPlanHistory = useCallback(async () => {
    const response = await fetch("/api/rise/plan/history");

    if (!response.ok) {
      const message = "No se pudo cargar el historial";

      showToast(message);
      throw new Error(message);
    }

    return await response.json();
  }, [showToast]);

  const updateTaskStatus = useCallback(
    async (
      planId: string,
      day: number,
      status: "pending" | "completed" | "rejected",
    ) => {
      const response = await fetch("/api/rise/plan/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          planId,
          day,
          status,
        }),
      });

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo actualizar la tarea",
        );

        showToast(message);
        throw new Error(message);
      }
    },
    [showToast],
  );

  const getPlanById = useCallback(
    async (planId: string) => {
      const response = await fetch(`/api/rise/plan/${planId}`);

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo cargar el plan",
        );

        showToast(message);
        throw new Error(message);
      }

      return (await response.json()) as RisePlan;
    },
    [showToast],
  );

  const deletePlan = useCallback(
    async (planId: string) => {
      const response = await fetch(`/api/rise/plan/${planId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const message = await getApiError(
          response,
          "No se pudo eliminar el plan",
        );

        showToast(message);
        throw new Error(message);
      }

      return await response.json();
    },
    [showToast],
  );

  return {
    generateQuestion,
    generatePlan,
    completePlan,
    cancelPlan,
    getActivePlan,
    getPlanHistory,
    updateTaskStatus,
    getPlanById,
    deletePlan,
  };
}

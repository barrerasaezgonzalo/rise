"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { RisePlan } from "../types";
import { getPlanStats } from "../utils";
import { useRise } from "./useRise";
import { useRiseApi } from "./useRiseApi";

export function useHistory(planId?: string) {
  const router = useRouter();
  const { planHistory, setPlanHistory } = useRise();
  const { deletePlan, getPlanById } = useRiseApi();
  const [planToDelete, setPlanToDelete] = useState<string | null>(null);
  const [selectedPlan, setSelectedPlan] = useState<RisePlan | null>(null);
  const [loading, setLoading] = useState(Boolean(planId));

  useEffect(() => {
    if (!planId) return;

    const loadPlan = async () => {
      try {
        const data = await getPlanById(planId);
        setSelectedPlan(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    loadPlan();
  }, [planId, getPlanById]);

  useEffect(() => {
    if (planId && !loading && !selectedPlan) {
      router.replace("/");
    }
  }, [planId, loading, selectedPlan, router]);

  const handleDeletePlan = async (planId: string) => {
    try {
      await deletePlan(planId);
      setPlanHistory((current) => current.filter((plan) => plan.id !== planId));
      setPlanToDelete(null);
    } catch (error) {
      console.error(error);
    }
  };

  const stats = getPlanStats(selectedPlan);
  const totalPlans = planHistory.length;
  const completedPlans = planHistory.filter(
    (plan) => plan.status === "completed",
  ).length;
  const cancelledPlans = planHistory.filter(
    (plan) => plan.status === "cancelled",
  ).length;
  const totalTasks = planHistory.reduce(
    (total, plan) => total + plan.tasks.length,
    0,
  );
  const completedTasks = planHistory.reduce(
    (total, plan) =>
      total +
      plan.tasks.filter((task) => task.status === "completed").length,
    0,
  );
  const plansProgress =
    totalTasks > 0
      ? Math.round((completedTasks / totalTasks) * 100)
      : 0;

  return {
    planHistory,
    planToDelete,
    setPlanToDelete,
    handleDeletePlan,
    totalPlans,
    completedPlans,
    cancelledPlans,
    plansProgress,
    plan: selectedPlan,
    loading,
    ...stats,
  };
}

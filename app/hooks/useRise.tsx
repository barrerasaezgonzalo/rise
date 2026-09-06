"use client";

import { useContext } from "react";
import { RiseContext } from "../providers/RiseProvider";
import { getPlanStats } from "../utils";

export function useRise() {
  const context = useContext(RiseContext);
  if (!context) {
    throw new Error("useRise debe usarse dentro de RiseProvider");
  }

  const handleNewPlan = () => {
    context.resetRise();
  };

  const { tasks, completedTasks, rejectedTasks, progress, canCompletePlan } =
    getPlanStats(context.plan);

  return {
    ...context,
    tasks,
    completedTasks,
    rejectedTasks,
    progress,
    canCompletePlan,
    handleNewPlan,
  };
}

import { RisePlan } from "../types";

export function getPlanStats(plan: RisePlan | null) {
  const tasks = plan?.tasks ?? [];

  const completedTasks = tasks.filter(
    (task) => task.status === "completed",
  ).length;

  const rejectedTasks = tasks.filter(
    (task) => task.status === "rejected",
  ).length;

  const progress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  const canCompletePlan =
    tasks.length > 0 && tasks.every((task) => task.status !== "pending");

  return {
    tasks,
    completedTasks,
    rejectedTasks,
    progress,
    canCompletePlan,
  };
}

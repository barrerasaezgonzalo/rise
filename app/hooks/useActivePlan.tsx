import { useContext } from "react";
import { RiseContext } from "../providers/RiseProvider";
import { Task, TaskStatus } from "../types";

export function useActivePlan() {
  const context = useContext(RiseContext);
  if (!context) {
    throw new Error("useRise debe usarse dentro de RiseProvider");
  }
  const { activePlan, setActivePlan, setView, loadingInitial } = context;

  const handleTaskStatusChange = async (
    taskIndex: number,
    newStatus: TaskStatus,
  ) => {
    if (!activePlan) return;
    const updatedTasks: Task[] = activePlan.tasks.map(
      (task: Task, index: number) => {
        if (index === taskIndex) {
          return {
            ...task,
            status: task.status === newStatus ? undefined : newStatus,
          };
        }
        return task;
      },
    );

    setActivePlan({ ...activePlan, tasks: updatedTasks });

    try {
      await fetch(`/api/plan/${activePlan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tasks: updatedTasks }),
      });
    } catch (error) {
      console.error("Error al actualizar tarea:", error);
    }
  };

  const handleAbandonPlan = async () => {
    if (!activePlan) return;
    try {
      await fetch(`/api/plan/${activePlan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "abandoned" }),
      });
      setActivePlan(null);
      setView("abandoned");
    } catch (error) {
      console.error("Error al abandonar el plan:", error);
    }
  };

  const handleCompletePlan = async () => {
    if (!activePlan) return;
    try {
      await fetch(`/api/plan/${activePlan.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      setActivePlan(null);
      setView("completed");
    } catch (error) {
      console.error("Error al completar el plan:", error);
    }
  };
  const allTasksFinished = activePlan
    ? activePlan.tasks.every(
        (task: Task) =>
          task.status === "completed" || task.status === "rejected",
      )
    : false;
  const completedCount = activePlan
    ? activePlan.tasks.filter((task: Task) => task.status === "completed")
        .length
    : 0;
  const progressPercentage = activePlan
    ? Math.round((completedCount / activePlan.tasks.length) * 100)
    : 0;

  return {
    ...context,
    handleTaskStatusChange,
    handleAbandonPlan,
    handleCompletePlan,
    loadingInitial,
    allTasksFinished,
    completedCount,
    progressPercentage,
  };
}

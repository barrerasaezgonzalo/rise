"use client";

import { Ban, Check } from "lucide-react";
import { PlanTask } from "../types";

type RisePlanTaskItemProps = {
  task: PlanTask;
  updateTaskStatus: (
    day: number,
    status: "pending" | "completed" | "rejected",
  ) => void;
};

export function RisePlanTaskItem({
  task,
  updateTaskStatus,
}: RisePlanTaskItemProps) {
  const isCompleted = task.status === "completed";
  const isRejected = task.status === "rejected";

  return (
    <div className="border-b border-border py-4">
      <div className="flex items-start gap-4">
        <div
          className={`flex h-8 w-8 shrink-0 items-center justify-center text-xs font-semibold ${
            isCompleted
              ? "bg-rise text-white"
              : isRejected
                ? "bg-orange-100 text-orange-700"
                : "border border-border text-neutral-400"
          }`}
        >
          {isCompleted ? (
            <Check size={16} />
          ) : isRejected ? (
            <Ban size={15} />
          ) : (
            task.day
          )}
        </div>

        <div className="min-w-0 flex-1">
          <span
            className={`text-base font-semibold ${
              isCompleted
                ? "text-neutral-400 line-through"
                : isRejected
                  ? "text-orange-700"
                  : "text-title"
            }`}
          >
            {task.title}
          </span>

          <p className="mt-1 text-sm leading-5 text-subtitle">
            {task.description}
          </p>

          <div className="mt-3 flex items-center gap-4">
            <button
              type="button"
              onClick={() =>
                updateTaskStatus(
                  task.day,
                  isCompleted ? "pending" : "completed",
                )
              }
              className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition ${
                isCompleted ? "text-rise" : "text-neutral-500 hover:text-rise"
              }`}
            >
              <Check size={15} />
              La hice
            </button>

            <button
              type="button"
              onClick={() =>
                updateTaskStatus(task.day, isRejected ? "pending" : "rejected")
              }
              className={`flex cursor-pointer items-center gap-1.5 text-sm font-medium transition ${
                isRejected
                  ? "text-orange-700"
                  : "text-neutral-500 hover:text-orange-700"
              }`}
            >
              <Ban size={15} />
              No pude hacerla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

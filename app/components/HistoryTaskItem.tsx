"use client";

import { Ban, Check } from "lucide-react";
import { HistoryTaskItemProps } from "../types";

export function HistoryTaskItem({ task }: HistoryTaskItemProps) {
  const isCompleted = task.status === "completed";
  const isRejected = task.status === "rejected";

  return (
    <div className="border-b border-border py-4">
      1
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
        </div>
      </div>
    </div>
  );
}

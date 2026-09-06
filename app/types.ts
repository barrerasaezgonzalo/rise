export type Answer = {
  question: string;
  answer: string;
};

export type PlanTask = {
  day: number;
  title: string;
  description: string;
  status: "pending" | "completed" | "rejected";
};

export type RisePlan = {
  id: string;
  title: string;
  summary: string;
  tasks: PlanTask[];
  status: "active" | "completed" | "cancelled";
};

export type ToastProps = {
  message: string;
  type?: "success" | "error";
  onClose: () => void;
};

export type HistoryTaskItemProps = {
  task: PlanTask;
};

export type HistoryPlanItemProps = {
  plan: RisePlan;
  planToDelete: string | null;
  setPlanToDelete: (planId: string | null) => void;
  handleDeletePlan: (planId: string) => Promise<void>;
};

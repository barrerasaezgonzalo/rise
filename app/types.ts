type PlanStatus = "draft" | "active" | "completed" | "abandoned";
export type TaskStatus = "pending" | "completed" | "rejected";
export type RiseView =
  "checkin" | "preview" | "active" | "completed" | "abandoned" | "history";

export type Task = {
  id: string;
  order?: number;
  title: string;
  description: string;
  status?: TaskStatus;
};

export type Plan = {
  id: string;
  user_id: string;
  title: string;
  summary: string;
  status: PlanStatus;
  tasks: Task[];
  created_at?: string;
};

export type Answer = {
  question: string;
  answer: string;
};

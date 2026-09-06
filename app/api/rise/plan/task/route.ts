import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { planId, day, status } = await request.json();

    const supabase = await createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data: plan, error: planError } = await supabase
      .from("wn_rise_plans")
      .select("tasks")
      .eq("id", planId)
      .eq("user_id", user.id)
      .single();

    if (planError) {
      throw planError;
    }

    const tasks = plan.tasks.map(
      (task: {
        day: number;
        title: string;
        description: string;
        status: string;
      }) =>
        task.day === day
          ? {
              ...task,
              status,
            }
          : task,
    );

    const { error } = await supabase
      .from("wn_rise_plans")
      .update({
        tasks,
      })
      .eq("id", planId)
      .eq("user_id", user.id);

    if (error) {
      throw error;
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        error: "No se pudo actualizar la tarea",
      },
      {
        status: 500,
      },
    );
  }
}

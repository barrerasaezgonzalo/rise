import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { id } = await params;
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data: activePlans, error: checkError } = await supabase
      .from("wn_rise_plans")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "active");

    if (checkError) {
      throw checkError;
    }

    if (activePlans && activePlans.length > 0) {
      await supabase
        .from("wn_rise_plans")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id)
        .eq("status", "preview");

      return NextResponse.json(
        {
          error:
            "Ya existe un plan activo. Debes completarlo o abandonarlo antes de activar uno nuevo.",
        },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from("wn_rise_plans")
      .update({ status: "active" })
      .eq("id", id)
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) {
      throw error;
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("ACTIVATE PLAN ERROR:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo activar el plan",
      },
      { status: 500 },
    );
  }
}

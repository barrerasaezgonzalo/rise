import { createClient } from "@/app/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("wn_rise_plans")
    .select("*")
    .eq("user_id", user.id)
    .in("status", ["completed", "cancelled"])
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error al cargar historial de planes", error);
    return NextResponse.json(
      { error: "No se pudo cargar el historial" },
      { status: 500 },
    );
  }
  return NextResponse.json(data ?? []);
}

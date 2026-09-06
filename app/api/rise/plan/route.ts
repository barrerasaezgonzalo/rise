import { apiModel } from "@/app/constants";
import { createClient } from "@/app/lib/supabase/server";
import { Answer } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { answers }: { answers: Answer[] } = await request.json();
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const { data: activePlan, error: activePlanError } = await supabase
      .from("wn_rise_plans")
      .select("id")
      .eq("user_id", user.id)
      .eq("status", "active")
      .maybeSingle();

    if (activePlanError) {
      throw activePlanError;
    }

    if (activePlan) {
      return NextResponse.json(
        { error: "Ya tienes un plan activo" },
        { status: 409 },
      );
    }

    const response = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: apiModel,
          temperature: 0.7,
          reasoning_effort: "low",
          messages: [
            {
              role: "system",
              content: `
Eres el asistente de Rise, una aplicación de bienestar personal.

Analiza el check-in del usuario y crea un plan sencillo de 7 días.

El objetivo es proponer pequeñas acciones realistas y concretas basadas exclusivamente en lo que el usuario contó.

Reglas:
- Una acción por día.
- Las acciones deben ser pequeñas y alcanzables.
- Evita recomendaciones médicas.
- No diagnostiques.
- No uses lenguaje alarmista.
- Los títulos deben ser breves.
- Las descripciones deben explicar claramente qué hacer.
- El resumen debe explicar brevemente el objetivo general del plan.
              `,
            },
            {
              role: "user",
              content: JSON.stringify(answers),
            },
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "rise_plan",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  title: {
                    type: "string",
                  },
                  summary: {
                    type: "string",
                  },
                  tasks: {
                    type: "array",
                    minItems: 7,
                    maxItems: 7,
                    items: {
                      type: "object",
                      properties: {
                        day: {
                          type: "number",
                        },
                        title: {
                          type: "string",
                        },
                        description: {
                          type: "string",
                        },
                        status: {
                          type: "string",
                          enum: ["pending", "completed", "rejected"],
                        },
                      },
                      required: ["day", "title", "description", "status"],
                      additionalProperties: false,
                    },
                  },
                },
                required: ["title", "summary", "tasks"],
                additionalProperties: false,
              },
            },
          },
        }),
      },
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Groq error:", errorText);
      throw new Error(errorText);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    const plan = JSON.parse(content);

    const { data: checkIn, error: checkInError } = await supabase
      .from("wn_rise_checkins")
      .insert({
        user_id: user.id,
        answers,
      })
      .select()
      .single();

    if (checkInError) {
      throw checkInError;
    }

    const { data: savedPlan, error: planError } = await supabase
      .from("wn_rise_plans")
      .insert({
        user_id: user.id,
        checkin_id: checkIn.id,
        title: plan.title,
        summary: plan.summary,
        tasks: plan.tasks,
        status: "active",
      })
      .select()
      .single();

    if (planError) {
      throw planError;
    }

    return NextResponse.json(savedPlan);
  } catch (error) {
    console.error("PLAN ERROR:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "No se pudo generar el plan",
      },
      { status: 500 },
    );
  }
}

import { apiModel } from "@/app/constants";
import { Answer } from "@/app/types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { answers }: { answers: Answer[] } = await request.json();
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
          temperature: 0.8,
          reasoning_effort: "low",
          messages: [
            {
              role: "system",
              content: `
Eres el asistente de Rise, una aplicación de bienestar personal.

Tu trabajo es realizar un breve check-in conversacional.

Genera UNA sola pregunta basándote en las respuestas anteriores del usuario.

La pregunta debe:
- sentirse natural y cercana;
- ayudar a entender qué necesita actualmente;
- ser breve;
- no repetir preguntas anteriores;
- profundizar progresivamente en lo que cuenta el usuario;
- evitar diagnósticos médicos o psicológicos;
- poder responderse con texto libre.

Devuelve exclusivamente JSON.
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
              name: "rise_question",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  question: {
                    type: "string",
                  },
                },
                required: ["question"],
                additionalProperties: false,
              },
            },
          },
        }),
      },
    );

    if (!response.ok) {
      throw new Error("Error generating question");
    }
    const data = await response.json();
    const content = data.choices[0].message.content;
    const result = JSON.parse(content);
    return NextResponse.json(result);
  } catch {
    return NextResponse.json(
      { error: "No se pudo generar la pregunta" },
      { status: 500 },
    );
  }
}

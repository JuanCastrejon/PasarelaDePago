import { NextResponse } from "next/server";

export async function POST(
  _request: Request,
  context: { params: Promise<{ provider: string }> }
) {
  const { provider } = await context.params;

  return NextResponse.json(
    {
      code: "WEBHOOK_INBOX_PENDING",
      message: `El inbox de webhooks para ${provider} aun no esta implementado.`,
      nextStep: "Definir deduplicacion, validacion de firma y persistencia."
    },
    { status: 501 }
  );
}

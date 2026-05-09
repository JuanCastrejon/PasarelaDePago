import { createPaymentOrder } from "@pasarela/payment-core";
import { NextResponse } from "next/server";
import { z } from "zod";

const createPaymentOrderSchema = z.object({
  externalReference: z.string().trim().min(1),
  amountInCents: z.number().int().positive(),
  currency: z.literal("COP")
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      {
        code: "INVALID_REQUEST_BODY",
        message: "El cuerpo del request debe ser JSON válido."
      },
      { status: 400 }
    );
  }

  const parsed = createPaymentOrderSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      {
        code: "INVALID_PAYMENT_ORDER_PAYLOAD",
        message:
          "El payload minimo requiere externalReference, amountInCents y currency='COP'.",
        details: parsed.error.flatten().fieldErrors
      },
      { status: 400 }
    );
  }

  const paymentOrder = createPaymentOrder(parsed.data);

  return NextResponse.json(
    {
      paymentOrder,
      scope: {
        createsPaymentAttempt: false,
        executesCharge: false
      }
    },
    { status: 201 }
  );
}

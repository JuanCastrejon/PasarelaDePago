import { describe, expect, it } from "vitest";
import {
  createPaymentOrder,
  DEFAULT_PAYMENT_ORDER_MERCHANT_ID
} from "./payment-order";

describe("createPaymentOrder", () => {
  it("crea una payment_order canonica sin campos de intento", () => {
    const paymentOrder = createPaymentOrder({
      externalReference: "order-123",
      amountInCents: 250000,
      currency: "COP"
    });

    expect(paymentOrder.id).toBeTypeOf("string");
    expect(paymentOrder.merchantId).toBe(DEFAULT_PAYMENT_ORDER_MERCHANT_ID);
    expect(paymentOrder.orderStatus).toBe("OPEN");
    expect(paymentOrder).not.toHaveProperty("providerCode");
    expect(paymentOrder).not.toHaveProperty("attemptNumber");
  });

  it("incluye customerEmail y expiresAt cuando se envian", () => {
    const paymentOrder = createPaymentOrder({
      externalReference: "order-optional",
      amountInCents: 300000,
      currency: "COP",
      customerEmail: "cliente@test.com",
      expiresAt: "2026-12-31T00:00:00.000Z"
    });

    expect(paymentOrder.customerEmail).toBe("cliente@test.com");
    expect(paymentOrder.expiresAt).toBe("2026-12-31T00:00:00.000Z");
  });

  it("omite customerEmail y expiresAt cuando no se envian", () => {
    const paymentOrder = createPaymentOrder({
      externalReference: "order-without-optional",
      amountInCents: 300000,
      currency: "COP"
    });

    expect(paymentOrder).not.toHaveProperty("customerEmail");
    expect(paymentOrder).not.toHaveProperty("expiresAt");
  });
});

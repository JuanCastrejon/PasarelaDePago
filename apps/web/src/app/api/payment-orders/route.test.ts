import { describe, expect, it } from "vitest";
import { POST } from "./route";

describe("POST /api/payment-orders", () => {
  it("responde 201 con estructura canonica", async () => {
    const response = await POST(
      new Request("http://localhost/api/payment-orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          externalReference: "order-001",
          amountInCents: 100000,
          currency: "COP"
        })
      })
    );

    expect(response.status).toBe(201);

    const body = await response.json();
    expect(body.paymentOrder.externalReference).toBe("order-001");
    expect(body.paymentOrder.amountInCents).toBe(100000);
    expect(body.paymentOrder.currency).toBe("COP");
    expect(body.paymentOrder.orderStatus).toBe("OPEN");
    expect(body.scope).toEqual({
      createsPaymentAttempt: false,
      executesCharge: false
    });
  });

  it("responde 400 cuando externalReference es inválido", async () => {
    const response = await POST(
      new Request("http://localhost/api/payment-orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          externalReference: "",
          amountInCents: 100000,
          currency: "COP"
        })
      })
    );

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.code).toBe("INVALID_PAYMENT_ORDER_PAYLOAD");
  });

  it("responde 400 cuando amountInCents es inválido", async () => {
    const response = await POST(
      new Request("http://localhost/api/payment-orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          externalReference: "order-001",
          amountInCents: 0,
          currency: "COP"
        })
      })
    );

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.code).toBe("INVALID_PAYMENT_ORDER_PAYLOAD");
  });

  it("responde 400 cuando currency es inválido", async () => {
    const response = await POST(
      new Request("http://localhost/api/payment-orders", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          externalReference: "order-001",
          amountInCents: 100000,
          currency: "USD"
        })
      })
    );

    expect(response.status).toBe(400);

    const body = await response.json();
    expect(body.code).toBe("INVALID_PAYMENT_ORDER_PAYLOAD");
  });
});

import { randomUUID } from "node:crypto";
import type { PaymentOrderStatus } from "./payment-status";

export const DEFAULT_PAYMENT_ORDER_MERCHANT_ID = "merchant_bootstrap";

export interface PaymentOrder {
  id: string;
  merchantId: string;
  externalReference: string;
  amountInCents: number;
  currency: "COP";
  orderStatus: PaymentOrderStatus;
  customerEmail?: string;
  expiresAt?: string;
  createdAt: string;
}

export interface CreatePaymentOrderInput {
  externalReference: string;
  amountInCents: number;
  currency: "COP";
  merchantId?: string;
  customerEmail?: string;
  expiresAt?: string;
}

export function createPaymentOrder(input: CreatePaymentOrderInput): PaymentOrder {
  return {
    id: randomUUID(),
    merchantId: input.merchantId ?? DEFAULT_PAYMENT_ORDER_MERCHANT_ID,
    externalReference: input.externalReference,
    amountInCents: input.amountInCents,
    currency: input.currency,
    orderStatus: "OPEN",
    ...(input.customerEmail ? { customerEmail: input.customerEmail } : {}),
    ...(input.expiresAt ? { expiresAt: input.expiresAt } : {}),
    createdAt: new Date().toISOString()
  };
}

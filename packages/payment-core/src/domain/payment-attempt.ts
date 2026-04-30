import { randomUUID } from "node:crypto";

import type { PaymentMethodFamily } from "./payment-method-family";
import type { CanonicalPaymentAttemptStatus } from "./payment-status";
import type { ProviderCode } from "./provider";

export const ATTEMPT_ORIGINS = [
  "PRIMARY",
  "RETRY",
  "FALLBACK",
  "MANUAL"
] as const;

export type AttemptOrigin = (typeof ATTEMPT_ORIGINS)[number];

export interface PaymentAttempt {
  id: string;
  paymentOrderId: string;
  attemptNumber: number;
  providerCode: ProviderCode;
  methodFamily: PaymentMethodFamily;
  origin: AttemptOrigin;
  canonicalStatus: CanonicalPaymentAttemptStatus;
  rawProviderStatus: string | null;
  createdAt: string;
  startedAt: string;
}

export interface CreatePaymentAttemptInput {
  paymentOrderId: string;
  attemptNumber: number;
  providerCode: ProviderCode;
  methodFamily: PaymentMethodFamily;
  origin: AttemptOrigin;
}

export function createPaymentAttempt(
  input: CreatePaymentAttemptInput
): PaymentAttempt {
  const now = new Date().toISOString();

  return {
    id: randomUUID(),
    paymentOrderId: input.paymentOrderId,
    attemptNumber: input.attemptNumber,
    providerCode: input.providerCode,
    methodFamily: input.methodFamily,
    origin: input.origin,
    canonicalStatus: "ATTEMPT_CREATED",
    rawProviderStatus: null,
    createdAt: now,
    startedAt: now
  };
}

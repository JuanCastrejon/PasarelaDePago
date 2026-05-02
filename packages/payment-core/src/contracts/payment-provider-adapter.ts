import type { PaymentAttempt } from "../domain/payment-attempt";
import type { PaymentMethodFamily } from "../domain/payment-method-family";
import type { ProviderCode } from "../domain/provider";

export interface CreateProviderPaymentAttemptInput {
  paymentOrderId: string;
  paymentMethodFamily: PaymentMethodFamily;
  amountInCents: number;
  currency: "COP";
  payerEmail?: string;
  returnUrl?: string;
  webhookUrl?: string;
}

export interface CreatePaymentAttemptResult {
  providerCode: ProviderCode;
  attempt: PaymentAttempt;
  redirectUrl?: string;
  providerReference?: string;
}

export interface QueryPaymentAttemptInput {
  providerReference: string;
}

export interface NormalizeWebhookInput {
  headers: Record<string, string | string[] | undefined>;
  rawBody: string;
}

export interface NormalizedProviderEvent {
  providerCode: ProviderCode;
  providerReference: string;
  rawStatus: string;
  receivedAt: string;
  signatureValidated: boolean;
  payload: unknown;
}

export interface PaymentProviderAdapter {
  readonly providerCode: ProviderCode;

  createAttempt(
    input: CreateProviderPaymentAttemptInput
  ): Promise<CreatePaymentAttemptResult>;

  queryAttemptStatus(input: QueryPaymentAttemptInput): Promise<unknown>;

  normalizeWebhook(
    input: NormalizeWebhookInput
  ): Promise<NormalizedProviderEvent>;
}

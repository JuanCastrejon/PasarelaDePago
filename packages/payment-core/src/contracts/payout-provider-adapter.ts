import type { ProviderCode } from "../domain/provider";

export interface CreatePayoutInput {
  beneficiaryId: string;
  amountInCents: number;
  currency: "COP";
  externalReference: string;
}

export interface CreatePayoutResult {
  providerCode: ProviderCode;
  providerTransferReference: string;
  acceptedAt: string;
}

export interface PayoutProviderAdapter {
  readonly providerCode: ProviderCode;

  createPayout(input: CreatePayoutInput): Promise<CreatePayoutResult>;
}

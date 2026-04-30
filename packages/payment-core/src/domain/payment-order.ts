import type { PaymentOrderStatus } from "./payment-status";

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

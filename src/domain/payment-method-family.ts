export const PAYMENT_METHOD_FAMILIES = [
  "CARD",
  "PSE",
  "BRE_B_QR",
  "NEQUI",
  "BANCOLOMBIA_BUTTON",
  "DAVIPLATA",
  "CASH",
  "PAYOUT_BANK"
] as const;

export type PaymentMethodFamily = (typeof PAYMENT_METHOD_FAMILIES)[number];

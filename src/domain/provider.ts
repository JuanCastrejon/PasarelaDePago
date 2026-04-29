export const PROVIDER_CODES = [
  "WOMPI",
  "PAYU",
  "EPAYCO",
  "PAYVALIDA",
  "AVALPAY",
  "PSE_RAIL",
  "MERCADO_PAGO"
] as const;

export type ProviderCode = (typeof PROVIDER_CODES)[number];

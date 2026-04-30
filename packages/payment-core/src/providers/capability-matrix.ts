import type { PaymentMethodFamily } from "../domain/payment-method-family";
import type { ProviderCode } from "../domain/provider";

export type EvidenceLevel = "CONFIRMED" | "PARTIAL" | "NOT_CONFIRMED";

export interface ProviderCapability {
  providerCode: ProviderCode;
  methodFamily: PaymentMethodFamily;
  direction: "PAYIN" | "PAYOUT";
  supportsRedirect: boolean;
  supportsWebhook: boolean;
  supportsPolling: boolean;
  supportsSilentRetry: boolean;
  requiresStrongUserConsent: boolean;
  evidenceLevel: EvidenceLevel;
  notes: string;
}

export const PROVIDER_CAPABILITY_MATRIX: ProviderCapability[] = [
  {
    providerCode: "WOMPI",
    methodFamily: "PSE",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: true,
    evidenceLevel: "CONFIRMED",
    notes: "Toda transaccion nace PENDING y se confirma por webhook o consulta."
  },
  {
    providerCode: "WOMPI",
    methodFamily: "CARD",
    direction: "PAYIN",
    supportsRedirect: false,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: true,
    requiresStrongUserConsent: false,
    evidenceLevel: "CONFIRMED",
    notes: "Retry tecnico elegible solo segun tipo de falla."
  },
  {
    providerCode: "WOMPI",
    methodFamily: "PAYOUT_BANK",
    direction: "PAYOUT",
    supportsRedirect: false,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: false,
    evidenceLevel: "CONFIRMED",
    notes: "Pagos a terceros con estados asincronos."
  },
  {
    providerCode: "PAYU",
    methodFamily: "PSE",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: true,
    evidenceLevel: "CONFIRMED",
    notes: "Inicia en PENDING con PENDING_TRANSACTION_CONFIRMATION."
  },
  {
    providerCode: "PAYU",
    methodFamily: "BRE_B_QR",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: true,
    evidenceLevel: "CONFIRMED",
    notes: "Bre-B QR confirmado en documentacion revisada."
  },
  {
    providerCode: "PAYU",
    methodFamily: "PAYOUT_BANK",
    direction: "PAYOUT",
    supportsRedirect: false,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: false,
    evidenceLevel: "CONFIRMED",
    notes: "Payouts enterprise con reportes y transferencias."
  },
  {
    providerCode: "EPAYCO",
    methodFamily: "PSE",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: true,
    evidenceLevel: "CONFIRMED",
    notes: "Pendiente puede durar hasta 20 minutos."
  },
  {
    providerCode: "EPAYCO",
    methodFamily: "CARD",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: true,
    requiresStrongUserConsent: false,
    evidenceLevel: "CONFIRMED",
    notes: "Response URL no es fuente de verdad."
  },
  {
    providerCode: "PAYVALIDA",
    methodFamily: "PSE",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: true,
    supportsPolling: true,
    supportsSilentRetry: false,
    requiresStrongUserConsent: true,
    evidenceLevel: "CONFIRMED",
    notes: "No abrir nueva transaccion sobre misma referencia mientras siga pendiente."
  },
  {
    providerCode: "AVALPAY",
    methodFamily: "PSE",
    direction: "PAYIN",
    supportsRedirect: true,
    supportsWebhook: false,
    supportsPolling: false,
    supportsSilentRetry: false,
    requiresStrongUserConsent: true,
    evidenceLevel: "PARTIAL",
    notes: "Benchmark UX y backoffice; webhook tecnico no auditado publicamente."
  }
];

export function getCapabilitiesForProvider(
  providerCode: ProviderCode
): ProviderCapability[] {
  return PROVIDER_CAPABILITY_MATRIX.filter(
    (capability) => capability.providerCode === providerCode
  );
}

import type { PaymentMethodFamily } from "../domain/payment-method-family";
import { isTerminalAttemptStatus } from "../domain/payment-status";
import type { CanonicalPaymentAttemptStatus } from "../domain/payment-status";

export type RetryStrategy =
  | "NONE"
  | "WAIT"
  | "USER_GUIDED_RETRY"
  | "SILENT_TECHNICAL_RETRY"
  | "TECHNICAL_FALLBACK"
  | "MANUAL_REVIEW";

export interface RetryEvaluationInput {
  methodFamily: PaymentMethodFamily;
  canonicalStatus: CanonicalPaymentAttemptStatus;
  hasUserBeenRedirected: boolean;
  hasStrongUserConsent: boolean;
  hasRemoteReference: boolean;
  technicalFailureBeforeHandoff: boolean;
}

export interface RetryDecision {
  eligible: boolean;
  strategy: RetryStrategy;
  reason: string;
}

function isStrongConsentMethod(methodFamily: PaymentMethodFamily): boolean {
  return methodFamily === "PSE" || methodFamily === "BRE_B_QR";
}

export function evaluateRetryEligibility(
  input: RetryEvaluationInput
): RetryDecision {
  const strongConsentMethod =
    input.hasStrongUserConsent || isStrongConsentMethod(input.methodFamily);

  if (
    input.canonicalStatus === "AWAITING_PAYER_ACTION" ||
    input.canonicalStatus === "AWAITING_PROVIDER_CONFIRMATION"
  ) {
    return {
      eligible: false,
      strategy: "WAIT",
      reason: "El intento sigue vivo y debe esperar confirmacion o accion del usuario."
    };
  }

  if (input.canonicalStatus === "PENDING_MANUAL_REVIEW") {
    return {
      eligible: false,
      strategy: "MANUAL_REVIEW",
      reason: "La operacion requiere revision manual antes de intentar nuevamente."
    };
  }

  if (
    input.technicalFailureBeforeHandoff &&
    !input.hasRemoteReference &&
    !input.hasUserBeenRedirected
  ) {
    return {
      eligible: true,
      strategy: "TECHNICAL_FALLBACK",
      reason: "El fallo ocurrio antes del handoff y sin referencia remota confiable."
    };
  }

  if (strongConsentMethod && (input.hasUserBeenRedirected || input.hasRemoteReference)) {
    return {
      eligible: false,
      strategy: "USER_GUIDED_RETRY",
      reason: "El metodo requiere nueva accion explicita del usuario."
    };
  }

  if (
    input.canonicalStatus === "FAILED_TO_CREATE" ||
    input.canonicalStatus === "FAILED_PROCESSING"
  ) {
    return {
      eligible: true,
      strategy: "SILENT_TECHNICAL_RETRY",
      reason: "El intento termino por falla tecnica recuperable."
    };
  }

  if (input.canonicalStatus === "REJECTED" && isTerminalAttemptStatus(input.canonicalStatus)) {
    return {
      eligible: true,
      strategy: "USER_GUIDED_RETRY",
      reason: "El rechazo debe resolverse con un nuevo intento consciente del usuario."
    };
  }

  return {
    eligible: false,
    strategy: "NONE",
    reason: "No existe una politica de retry segura para este caso."
  };
}

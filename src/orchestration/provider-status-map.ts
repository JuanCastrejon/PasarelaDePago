import type { CanonicalPaymentAttemptStatus } from "../domain/payment-status.js";
import type { ProviderCode } from "../domain/provider.js";

export interface ProviderStatusMapping {
  canonicalStatus: CanonicalPaymentAttemptStatus;
  isTerminal: boolean;
  notes: string;
}

type ProviderStatusDictionary = Record<string, ProviderStatusMapping>;

const STATUS_MAP: Record<ProviderCode, ProviderStatusDictionary> = {
  WOMPI: {
    PENDING: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Transaccion creada y en proceso."
    },
    APPROVED: {
      canonicalStatus: "APPROVED",
      isTerminal: true,
      notes: "Pago aprobado."
    },
    DECLINED: {
      canonicalStatus: "REJECTED",
      isTerminal: true,
      notes: "Pago rechazado."
    },
    VOIDED: {
      canonicalStatus: "REVERSED_OR_NULLIFIED",
      isTerminal: true,
      notes: "Transaccion anulada."
    },
    ERROR: {
      canonicalStatus: "FAILED_PROCESSING",
      isTerminal: true,
      notes: "Error del proveedor."
    }
  },
  PAYU: {
    PENDING: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Espera de confirmacion del proveedor o del riel."
    },
    SUBMITTED: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Enviada a entidad financiera."
    },
    APPROVED: {
      canonicalStatus: "APPROVED",
      isTerminal: true,
      notes: "Transaccion aprobada."
    },
    DECLINED: {
      canonicalStatus: "REJECTED",
      isTerminal: true,
      notes: "Transaccion rechazada."
    },
    EXPIRED: {
      canonicalStatus: "EXPIRED",
      isTerminal: true,
      notes: "Transaccion expirada."
    },
    ERROR: {
      canonicalStatus: "FAILED_PROCESSING",
      isTerminal: true,
      notes: "Error procesando la transaccion."
    },
    PENDING_TRANSACTION_REVIEW: {
      canonicalStatus: "PENDING_MANUAL_REVIEW",
      isTerminal: false,
      notes: "Revision manual o validacion."
    },
    PENDING_TRANSACTION_CONFIRMATION: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Recibo generado y esperando confirmacion."
    },
    PENDING_AWAITING_PSE_CONFIRMATION: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Espera propia del riel PSE."
    }
  },
  EPAYCO: {
    Aceptada: {
      canonicalStatus: "APPROVED",
      isTerminal: true,
      notes: "Pago aprobado."
    },
    Rechazada: {
      canonicalStatus: "REJECTED",
      isTerminal: true,
      notes: "Pago rechazado."
    },
    Pendiente: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Espera confirmacion final."
    },
    Fallida: {
      canonicalStatus: "FAILED_TO_CREATE",
      isTerminal: true,
      notes: "Fallo al culminar el flujo de creacion."
    },
    Retenida: {
      canonicalStatus: "PENDING_MANUAL_REVIEW",
      isTerminal: false,
      notes: "Revision de auditoria."
    },
    Iniciada: {
      canonicalStatus: "ATTEMPT_CREATED",
      isTerminal: false,
      notes: "Estado interno de arranque."
    },
    Abandonada: {
      canonicalStatus: "ABANDONED_BY_PAYER",
      isTerminal: true,
      notes: "El usuario cerro el flujo."
    },
    Cancelada: {
      canonicalStatus: "CANCELLED",
      isTerminal: true,
      notes: "El usuario no completo el flujo final."
    },
    Caducada: {
      canonicalStatus: "EXPIRED",
      isTerminal: true,
      notes: "Medio caducado."
    },
    Reversada: {
      canonicalStatus: "REVERSED_OR_NULLIFIED",
      isTerminal: true,
      notes: "Transaccion reversada."
    }
  },
  PAYVALIDA: {
    PENDIENTE: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Orden o transaccion pendiente."
    },
    APROBADA: {
      canonicalStatus: "APPROVED",
      isTerminal: true,
      notes: "Pago aprobado."
    },
    RECHAZADA: {
      canonicalStatus: "REJECTED",
      isTerminal: true,
      notes: "Pago rechazado."
    },
    VENCIDA: {
      canonicalStatus: "EXPIRED",
      isTerminal: true,
      notes: "Orden vencida."
    },
    CANCELADA: {
      canonicalStatus: "CANCELLED",
      isTerminal: true,
      notes: "Orden cancelada."
    },
    ANULADA: {
      canonicalStatus: "REVERSED_OR_NULLIFIED",
      isTerminal: true,
      notes: "Orden anulada."
    },
    FALLIDA: {
      canonicalStatus: "FAILED_PROCESSING",
      isTerminal: true,
      notes: "Fallo de procesamiento."
    }
  },
  AVALPAY: {
    APPROVED: {
      canonicalStatus: "APPROVED",
      isTerminal: true,
      notes: "Artefacto visible de checkout."
    },
    REJECTED: {
      canonicalStatus: "REJECTED",
      isTerminal: true,
      notes: "Artefacto visible de checkout."
    }
  },
  PSE_RAIL: {
    PENDING: {
      canonicalStatus: "AWAITING_PROVIDER_CONFIRMATION",
      isTerminal: false,
      notes: "Espera confirmacion del riel."
    },
    APPROVED: {
      canonicalStatus: "APPROVED",
      isTerminal: true,
      notes: "Correo o confirmacion con CUS."
    },
    REJECTED: {
      canonicalStatus: "REJECTED",
      isTerminal: true,
      notes: "Rechazo confirmado con CUS."
    }
  },
  MERCADO_PAGO: {}
};

export function normalizeProviderStatus(
  providerCode: ProviderCode,
  rawStatus: string
): ProviderStatusMapping {
  const mapping = STATUS_MAP[providerCode][rawStatus];

  if (mapping) {
    return mapping;
  }

  return {
    canonicalStatus: "FAILED_PROCESSING",
    isTerminal: false,
    notes: `Estado no mapeado para ${providerCode}: ${rawStatus}`
  };
}

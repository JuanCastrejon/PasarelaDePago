export type ProviderErrorKind =
  | "CONFIGURATION_ERROR"
  | "AUTHENTICATION_ERROR"
  | "NETWORK_ERROR"
  | "RATE_LIMIT"
  | "INVALID_REQUEST"
  | "RETRYABLE_PROVIDER_ERROR"
  | "NON_RETRYABLE_PROVIDER_ERROR";

export interface ProviderError {
  kind: ProviderErrorKind;
  code: string;
  message: string;
  retryable: boolean;
  providerRequestId?: string;
}

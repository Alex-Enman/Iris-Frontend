// Error message utilities

import { getStoredLanguage, t } from '@lib/i18n';

export function getErrorMessage(error: any) {
  const language = getStoredLanguage();

  if (error?.status === 401) {
    return {
      title: t('unauthorizedTitle', language),
      description: t('unauthorizedDescription', language),
    };
  }

  if (error?.status === 403) {
    return {
      title: t('accessDeniedTitle', language),
      description: t('accessDeniedDescription', language),
    };
  }

  if (error?.status === 404) {
    return {
      title: t('notFoundTitle', language),
      description: t('notFoundDescription', language),
    };
  }

  if (error?.status === 408) {
    return {
      title: t('connectionErrorTitle', language),
      description: t('requestTimeoutError', language),
    };
  }

  if (error?.status === 429) {
    return {
      title: t('tooManyRequestsTitle', language),
      description: t('tooManyRequestsDescription', language),
    };
  }

  if (error?.status === 500) {
    return {
      title: t('serverErrorTitle', language),
      description: t('serverErrorDescription', language),
    };
  }

  if (error?.status === 0 || !error?.status) {
    return {
      title: t('networkErrorTitle', language),
      description: t('networkErrorDescription', language),
    };
  }

  return {
    title: t('errorTitle', language),
    description:
      error?.message || t('unexpectedErrorOccurredDescription', language),
  };
}

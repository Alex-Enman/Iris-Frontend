// Error message utilities

export function getErrorMessage(error: any, t: (key: any) => string) {

  if (error?.status === 401) {
    return {
      title: t('unauthorizedTitle'),
      description: t('unauthorizedDescription'),
    };
  }

  if (error?.status === 403) {
    return {
      title: t('accessDeniedTitle'),
      description: t('accessDeniedDescription'),
    };
  }

  if (error?.status === 404) {
    return {
      title: t('notFoundTitle'),
      description: t('notFoundDescription'),
    };
  }

  if (error?.status === 408) {
    return {
      title: t('connectionErrorTitle'),
      description: t('requestTimeoutError'),
    };
  }

  if (error?.status === 429) {
    return {
      title: t('tooManyRequestsTitle'),
      description: t('tooManyRequestsDescription'),
    };
  }

  if (error?.status === 500) {
    return {
      title: t('serverErrorTitle'),
      description: t('serverErrorDescription'),
    };
  }

  if (error?.status === 0 || !error?.status) {
    return {
      title: t('networkErrorTitle'),
      description: t('networkErrorDescription'),
    };
  }

  return {
    title: t('errorTitle'),
    description:
      error?.message || t('unexpectedErrorOccurredDescription'),
  };
}

// Error handling utilities
// Centralized error handling and user-friendly error messages

import { ApiError } from '@/lib/data/repositories/client';
import { getStoredLanguage, t } from '@lib/i18n';

export interface ErrorState {
  hasError: boolean;
  error: Error | null;
  errorId: string;
}

export interface UserFriendlyError {
  title: string;
  message: string;
  action?: string;
  retryable: boolean;
}

export class ErrorHandler {
  /**
   * Convert technical errors to user-friendly messages
   */
  static toUserFriendlyError(error: Error): UserFriendlyError {
    const language = getStoredLanguage();

    if (error instanceof ApiError) {
      return this.handleApiError(error);
    }

    if (error.name === 'NetworkError' || error.message.includes('fetch')) {
      return {
        title: t('connectionErrorTitle', language),
        message: t('connectionErrorDescription', language),
        action: t('tryAgain', language),
        retryable: true,
      };
    }

    if (error.name === 'ValidationError') {
      return {
        title: t('invalidInputTitle', language),
        message: t('invalidInputDescription', language),
        retryable: false,
      };
    }

    return {
      title: t('somethingWentWrongTitle', language),
      message: t('unexpectedErrorOccurredDescription', language),
      action: t('tryAgain', language),
      retryable: true,
    };
  }

  /**
   * Handle API-specific errors
   */
  private static handleApiError(error: ApiError): UserFriendlyError {
    const language = getStoredLanguage();
    const map: Record<number, UserFriendlyError> = {
      400: {
        title: t('invalidInputTitle', language),
        message: t('invalidInputDescription', language),
        retryable: false,
      },
      401: {
        title: t('unauthorizedTitle', language),
        message: t('unauthorizedDescription', language),
        action: t('signIn', language),
        retryable: false,
      },
      403: {
        title: t('accessDeniedTitle', language),
        message: t('accessDeniedDescription', language),
        retryable: false,
      },
      404: {
        title: t('notFoundTitle', language),
        message: t('notFoundDescription', language),
        retryable: false,
      },
      409: {
        title: t('errorTitle', language),
        message: error.message,
        retryable: false,
      },
      422: {
        title: t('invalidInputTitle', language),
        message: error.message || t('invalidInputDescription', language),
        retryable: false,
      },
      429: {
        title: t('errorTitle', language),
        message: error.message,
        action: t('tryAgain', language),
        retryable: true,
      },
      500: {
        title: t('serverErrorTitle', language),
        message: t('serverErrorDescription', language),
        action: t('tryAgain', language),
        retryable: true,
      },
      503: {
        title: t('serverErrorTitle', language),
        message: t('serverErrorDescription', language),
        action: t('tryAgain', language),
        retryable: true,
      },
    };
    return (
      map[error.status] || {
        title: t('errorTitle', language),
        message: error.message || t('unexpectedErrorOccurredDescription', language),
        action: t('tryAgain', language),
        retryable: true,
      }
    );
  }

  /**
   * Generate a unique error ID for tracking
   */
  static generateErrorId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Log error for debugging
   */
  static logError(error: Error, context?: Record<string, any>): void {
    console.error('Error occurred:', {
      error: error.message,
      stack: error.stack,
      context,
      timestamp: new Date().toISOString(),
    });
  }
}

/**
 * Error boundary component props
 */
export interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error: Error; retry: () => void }>;
  onError?: (error: Error, errorInfo: any) => void;
}

/**
 * Error boundary state
 */
export interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

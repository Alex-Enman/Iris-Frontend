// API-specific error state component

import { ErrorState } from './ErrorState';
import { getErrorMessage } from './error-messages';
import { useLanguage } from '@contexts/LanguageContext';

interface ApiErrorStateProps {
  error: any;
  onRetry?: () => void;
  className?: string;
}

export function ApiErrorState({
  error,
  onRetry,
  className,
}: ApiErrorStateProps) {
  const { t } = useLanguage();
  const { title, description } = getErrorMessage(error, t);

  return (
    <ErrorState
      title={title}
      description={description}
      error={error}
      onRetry={onRetry}
      className={className}
    />
  );
}

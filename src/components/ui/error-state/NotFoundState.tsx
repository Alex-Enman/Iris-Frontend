// Not found error state component

import { ErrorState } from './ErrorState';
import { useLanguage } from '@contexts/LanguageContext';

interface NotFoundStateProps {
  title?: string;
  description?: string;
  onGoHome?: () => void;
  className?: string;
}

export function NotFoundState({
  title,
  description,
  onGoHome,
  className,
}: NotFoundStateProps) {
  const { t } = useLanguage();
  const resolvedTitle = title ?? t('pageNotFoundTitle');
  const resolvedDescription = description ?? t('pageNotFoundDescription');

  return (
    <ErrorState
      title={resolvedTitle}
      description={resolvedDescription}
      onGoHome={onGoHome}
      className={className}
    />
  );
}

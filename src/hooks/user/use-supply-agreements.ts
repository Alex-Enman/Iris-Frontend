import { getStoredLanguage, t } from '@lib/i18n';

export interface SupplyAgreementItem {
  id: number;
  supplier: string;
  type: string;
  frequency: string;
  status: string;
  nextDelivery: string;
  items: string;
  discount: string;
  startDate: string;
  endDate: string;
}

export function useSupplyAgreements() {
  const language = getStoredLanguage();

  const supplyAgreements: SupplyAgreementItem[] = [
    {
      id: 1,
      supplier: t('supplierNameGreenValleyFarm', language),
      type: t('agreementWeeklyDelivery', language),
      frequency: t('agreementFrequencyEveryMondayAndThursday', language),
      status: t('activeStatus', language),
      nextDelivery: '2024-10-28',
      items: t('agreementItemsSeasonalVegetablesHerbs', language),
      discount: '15%',
      startDate: '2024-03-15',
      endDate: '2025-03-15',
    },
    {
      id: 2,
      supplier: t('supplierNameMountainDairyCo', language),
      type: t('agreementBiWeeklySupply', language),
      frequency: t('agreementFrequencyEveryOtherTuesday', language),
      status: t('activeStatus', language),
      nextDelivery: '2024-10-29',
      items: t('agreementItemsDairyProductsCheese', language),
      discount: '10%',
      startDate: '2024-04-01',
      endDate: '2025-04-01',
    },
  ];

  return {
    supplyAgreements,
  };
}

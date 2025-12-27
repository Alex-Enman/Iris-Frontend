import { useEffect, useState, useRef } from 'react';
import { toast } from 'sonner';
import { useLanguage } from '@contexts/LanguageContext';

export interface MessageItem {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export interface ChatItem {
  id: string;
  name: string;
  type: 'general' | 'project';
  description?: string;
  supplierId?: string;
  messages: MessageItem[];
}

interface UseSupplierMessagesTabOptions {
  onViewSupplier?: (supplierId: string) => void;
}

export function useSupplierMessagesTab({
  onViewSupplier,
}: UseSupplierMessagesTabOptions = {}) {
  const { t } = useLanguage();

  const demoChats: ChatItem[] = [
    {
      id: '1',
      name: t('supplierNameGreenValleyFarm'),
      type: 'project',
      description: t('chatSupplierDescriptionOrganicVegetables'),
      supplierId: '1',
      messages: [
        {
          id: '1',
          text: t('chatMsgHiPlaceOrderNextWeek'),
          sender: t('you'),
          timestamp: t('chatTimestamp10_30AM'),
        },
        {
          id: '2',
          text: t('chatMsgHelloHappyToHelpWhatItems'),
          sender: t('supplierNameGreenValleyFarm'),
          timestamp: t('chatTimestamp10_32AM'),
        },
        {
          id: '3',
          text: t('chatMsgNeed10kgTomatoesGreensCarrots'),
          sender: t('you'),
          timestamp: t('chatTimestamp10_33AM'),
        },
        {
          id: '4',
          text: t('chatMsgPerfectAllInStockTomatoesBeautiful'),
          sender: t('supplierNameGreenValleyFarm'),
          timestamp: t('chatTimestamp10_35AM'),
        },
      ],
    },
    {
      id: '2',
      name: t('supplierNameMountainDairyCo'),
      type: 'project',
      description: t('chatSupplierDescriptionArtisanDairy'),
      supplierId: '2',
      messages: [
        {
          id: '1',
          text: t('chatMsgThanksLastDeliveryMozzarellaExcellent'),
          sender: t('you'),
          timestamp: t('chatTimestampYesterday3_45PM'),
        },
        {
          id: '2',
          text: t('chatMsgGladYouEnjoyedNewAgedCheddar'),
          sender: t('supplierNameMountainDairyCo'),
          timestamp: t('chatTimestampYesterday4_12PM'),
        },
      ],
    },
    {
      id: '3',
      name: t('supplierNameHeritageBakery'),
      type: 'project',
      description: t('chatSupplierDescriptionArtisanBakery'),
      supplierId: '3',
      messages: [
        {
          id: '1',
          text: t('chatMsgCanIAddPastriesWeeklyOrder'),
          sender: t('you'),
          timestamp: t('chatTimestampOct23_2_15PM'),
        },
        {
          id: '2',
          text: t('chatMsgAbsolutelyFreshCroissantsPainAuChocolat'),
          sender: t('supplierNameHeritageBakery'),
          timestamp: t('chatTimestampOct23_2_20PM'),
        },
      ],
    },
    {
      id: '4',
      name: t('supplierNameOliveGroveEstate'),
      type: 'project',
      description: t('chatSupplierDescriptionOilsAndPreserves'),
      supplierId: '4',
      messages: [
        {
          id: '1',
          text: t('chatMsgDoYouHaveTruffleOliveOil'),
          sender: t('you'),
          timestamp: t('chatTimestampOct18_11_00AM'),
        },
        {
          id: '2',
          text: t('chatMsgYesFreshBatchWouldYouLikeOrder'),
          sender: t('supplierNameOliveGroveEstate'),
          timestamp: t('chatTimestampOct18_11_15AM'),
        },
      ],
    },
  ];

  const [chats, setChats] = useState<ChatItem[]>([
    ...demoChats,
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find(c => c.id === selectedChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: MessageItem = {
      id: `m${Date.now()}`,
      text: messageInput,
      sender: t('you'),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChats(prev =>
      prev.map(chat =>
        chat.id === selectedChatId
          ? { ...chat, messages: [...chat.messages, newMessage] }
          : chat
      )
    );

    setMessageInput('');
    toast.success(t('messageSent'));

    if (selectedChat.type === 'project') {
      setTimeout(() => {
        const autoReply: MessageItem = {
          id: `m${Date.now()}`,
          text: t('autoReplyThanksWellGetBackSoon'),
          sender: selectedChat.name,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };
        setChats(prev =>
          prev.map(chat =>
            chat.id === selectedChatId
              ? { ...chat, messages: [...chat.messages, autoReply] }
              : chat
          )
        );
      }, 2000);
    }
  };

  const handleNewChat = () => {
    toast.success(t('newChatFeatureComingSoon'));
  };

  useEffect(() => {
    setChats(demoChats);
    setSelectedChatId('1');
  }, [t]);

  const getParticipantCount = (chat: ChatItem) => {
    const uniqueSenders = new Set(chat.messages.map(m => m.sender));
    return uniqueSenders.size;
  };

  return {
    chats,
    selectedChatId,
    setSelectedChatId,
    selectedChat,
    messageInput,
    setMessageInput,
    messagesEndRef,
    handleSendMessage,
    handleNewChat,
    getParticipantCount,
    onViewSupplier,
  };
}

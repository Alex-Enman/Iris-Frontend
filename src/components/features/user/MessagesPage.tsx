'use client';

import { ChatsSidebar } from './messages/ChatsSidebar';
import { ChatArea } from './messages/ChatArea';
import { useMessagesPage, type Chat } from '@/hooks/user/use-messages-page';
import { useEffect, useMemo } from 'react';
import { useLanguage } from '@contexts/LanguageContext';

export interface MessagesPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

export function MessagesPage({ onViewSupplier }: MessagesPageProps) {
  const { t } = useLanguage();
  const {
    chats,
    setChats,
    selectedChatId,
    setSelectedChatId,
    selectedChat,
    messageInput,
    setMessageInput,
    messagesEndRef,
    handleSendMessage,
    handleNewChat,
    getParticipantCount,
  } = useMessagesPage();

  const initialChats: Chat[] = useMemo(
    () => [
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
    ],
    [t]
  );

  useEffect(() => {
    if (chats.length === 0) {
      setChats(initialChats);
      setSelectedChatId('1');
    }
  }, [chats.length, setChats, setSelectedChatId, initialChats]);

  useEffect(() => {
    if (chats.length > 0) {
      setChats(initialChats);
    }
  }, [chats.length, initialChats, setChats]);

  if (!selectedChat) return null;

  return (
    <div className='min-h-screen py-12'>
      <div className='mx-auto max-w-7xl px-4'>
        <div className='grid gap-6 lg:grid-cols-[300px_1fr]'>
          <ChatsSidebar
            chats={chats}
            selectedChatId={selectedChatId}
            onSelectChat={setSelectedChatId}
            onNewChat={handleNewChat}
          />
          <ChatArea
            chatName={selectedChat.name}
            participantCount={getParticipantCount(selectedChat)}
            messages={selectedChat.messages}
            messageInput={messageInput}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
            messagesEndRef={messagesEndRef}
          />
        </div>
      </div>
    </div>
  );
}

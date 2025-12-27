'use client';

import { useState, useRef } from 'react';
import { toast } from 'sonner';
import { getStoredLanguage, t } from '@lib/i18n';

export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  name: string;
  type: 'general' | 'project';
  description?: string;
  supplierId?: string;
  messages: Message[];
}

export function useMessagesPage() {
  const language = getStoredLanguage();
  const [chats, setChats] = useState<Chat[]>([]);
  const [selectedChatId, setSelectedChatId] = useState<string>('');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat =
    chats.find(chat => chat.id === selectedChatId) || chats[0];

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageInput,
      sender: t('you', language),
      timestamp: new Date().toLocaleTimeString([], {
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setChats(prevChats =>
      prevChats.map(chat =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessageInput('');
    toast.success(t('messageSent', language));

    // Simulate response after 2 seconds if not general chat
    if (selectedChat?.type === 'project') {
      setTimeout(() => {
        const autoReply: Message = {
          id: `m${Date.now()}`,
          text: t('autoReplyThanksWellGetBackSoon', language),
          sender: selectedChat.name,
          timestamp: new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
          }),
        };

        setChats(prevChats =>
          prevChats.map(chat =>
            chat.id === selectedChatId
              ? {
                  ...chat,
                  messages: [...chat.messages, autoReply],
                }
              : chat
          )
        );
      }, 2000);
    }
  };

  const handleNewChat = () => {
    toast.success(t('newChatFeatureComingSoon', language));
  };

  const getParticipantCount = (chat: Chat) => {
    const uniqueSenders = new Set(chat.messages.map(m => m.sender));
    return uniqueSenders.size;
  };

  return {
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
  };
}

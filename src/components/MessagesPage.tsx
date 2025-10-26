import { useState, useRef } from 'react';
import { MessageSquare, Plus, Send } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import { Card, CardContent, CardHeader } from './ui/card';
import { toast } from 'sonner@2.0.3';

interface MessagesPageProps {
  onViewSupplier?: (supplierId: string) => void;
}

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: string;
}

interface Chat {
  id: string;
  name: string;
  type: 'general' | 'project';
  description?: string;
  supplierId?: string;
  messages: Message[];
}

export function MessagesPage({ onViewSupplier }: MessagesPageProps) {
  const [chats, setChats] = useState<Chat[]>([
    {
      id: '1',
      name: 'Green Valley Farm',
      type: 'project',
      description: 'Supplier: Organic Vegetables',
      supplierId: '1',
      messages: [
        {
          id: '1',
          text: 'Hi! I\'d like to place an order for next week\'s delivery.',
          sender: 'You',
          timestamp: '10:30 AM',
        },
        {
          id: '2',
          text: 'Hello! Of course, we\'d be happy to help. What items are you interested in?',
          sender: 'Green Valley Farm',
          timestamp: '10:32 AM',
        },
        {
          id: '3',
          text: 'I need 10kg of heirloom tomatoes, 5kg of mixed greens, and 8kg of organic carrots.',
          sender: 'You',
          timestamp: '10:33 AM',
        },
        {
          id: '4',
          text: 'Perfect! All items are in stock. The heirloom tomatoes are particularly beautiful this week.',
          sender: 'Green Valley Farm',
          timestamp: '10:35 AM',
        },
      ],
    },
    {
      id: '2',
      name: 'Mountain Dairy Co.',
      type: 'project',
      description: 'Supplier: Artisan Dairy',
      supplierId: '2',
      messages: [
        {
          id: '1',
          text: 'Thank you for the last delivery, the mozzarella was excellent!',
          sender: 'You',
          timestamp: 'Yesterday, 3:45 PM',
        },
        {
          id: '2',
          text: 'We\'re so glad you enjoyed it! We have a new aged cheddar you might be interested in.',
          sender: 'Mountain Dairy Co.',
          timestamp: 'Yesterday, 4:12 PM',
        },
      ],
    },
    {
      id: '3',
      name: 'Heritage Bakery',
      type: 'project',
      description: 'Supplier: Artisan Bakery',
      supplierId: '3',
      messages: [
        {
          id: '1',
          text: 'Can I add pastries to my weekly order?',
          sender: 'You',
          timestamp: 'Oct 23, 2:15 PM',
        },
        {
          id: '2',
          text: 'Absolutely! We have fresh croissants and pain au chocolat available.',
          sender: 'Heritage Bakery',
          timestamp: 'Oct 23, 2:20 PM',
        },
      ],
    },
    {
      id: '4',
      name: 'Olive Grove Estate',
      type: 'project',
      description: 'Supplier: Oils & Preserves',
      supplierId: '4',
      messages: [
        {
          id: '1',
          text: 'Do you have any truffle-infused olive oil in stock?',
          sender: 'You',
          timestamp: 'Oct 18, 11:00 AM',
        },
        {
          id: '2',
          text: 'Yes! We just received a fresh batch. Would you like to place an order?',
          sender: 'Olive Grove Estate',
          timestamp: 'Oct 18, 11:15 AM',
        },
      ],
    },
  ]);

  const [selectedChatId, setSelectedChatId] = useState<string>('1');
  const [messageInput, setMessageInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const selectedChat = chats.find((chat) => chat.id === selectedChatId) || chats[0];

  // Auto-scroll removed - let users control their own scrolling

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageInput.trim()) return;

    const newMessage: Message = {
      id: `m${Date.now()}`,
      text: messageInput,
      sender: 'You',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setChats(
      chats.map((chat) =>
        chat.id === selectedChatId
          ? {
              ...chat,
              messages: [...chat.messages, newMessage],
            }
          : chat
      )
    );

    setMessageInput('');
    toast.success('Message sent');

    // Simulate response after 2 seconds if not general chat
    if (selectedChat.type === 'project') {
      setTimeout(() => {
        const autoReply: Message = {
          id: `m${Date.now()}`,
          text: 'Thanks for your message! We\'ll get back to you shortly.',
          sender: selectedChat.name,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        setChats((prevChats) =>
          prevChats.map((chat) =>
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
    toast.success('New chat feature coming soon!');
  };

  const getParticipantCount = (chat: Chat) => {
    const uniqueSenders = new Set(chat.messages.map((m) => m.sender));
    return uniqueSenders.size;
  };

  return (
    <div className="min-h-screen py-12">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
          {/* Chats Sidebar */}
          <Card className="rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg">Chats</h3>
                <Button
                  onClick={handleNewChat}
                  size="sm"
                  className="rounded-xl bg-primary text-primary-foreground"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  New Chat
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-2">
                {chats.map((chat) => (
                  <button
                    key={chat.id}
                    onClick={() => setSelectedChatId(chat.id)}
                    className={`w-full rounded-2xl p-3 text-left transition-all duration-250 ${
                      selectedChatId === chat.id
                        ? 'bg-primary text-primary-foreground'
                        : 'hover:bg-muted'
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      <span className="font-medium">{chat.name}</span>
                    </div>
                    <p
                      className={`mt-1 text-xs ${
                        selectedChatId === chat.id ? 'opacity-80' : 'text-muted-foreground'
                      }`}
                    >
                      {chat.description}
                    </p>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Chat Area */}
          <Card className="flex h-[calc(100vh-12rem)] flex-col rounded-3xl shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
            <CardHeader className="p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-2xl">{selectedChat.name}</h3>
                <div className="text-sm text-muted-foreground">
                  {getParticipantCount(selectedChat)} participant{getParticipantCount(selectedChat) !== 1 ? 's' : ''}
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <div className="flex flex-1 flex-col overflow-hidden p-0">
              <ScrollArea className="flex-1 px-4">
                <div className="space-y-4 py-4">
                  {selectedChat.messages.map((message) => {
                    const isYou = message.sender === 'You';
                    return (
                      <div
                        key={message.id}
                        className={`flex gap-3 ${isYou ? 'flex-row-reverse' : ''}`}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarFallback className="bg-muted text-muted-foreground">
                            {message.sender.charAt(0).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className={`flex max-w-[70%] flex-col ${isYou ? 'items-end' : 'items-start'}`}>
                          <div className={`mb-1 flex items-center gap-2 ${isYou ? 'flex-row-reverse' : ''}`}>
                            <span className="text-sm font-medium">{message.sender}</span>
                            <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                          </div>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              isYou
                                ? 'bg-primary text-primary-foreground'
                                : 'bg-muted text-foreground'
                            }`}
                          >
                            <p className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                              {message.text}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message Input */}
              <div className="border-t border-border p-4">
                <form onSubmit={handleSendMessage} className="flex gap-2">
                  <Input
                    placeholder="Type a message..."
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="rounded-xl"
                  />
                  <Button
                    type="submit"
                    disabled={!messageInput.trim()}
                    className="rounded-xl bg-primary text-primary-foreground"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </form>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
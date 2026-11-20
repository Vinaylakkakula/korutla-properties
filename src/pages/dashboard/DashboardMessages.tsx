import React, { useState } from 'react';
import { Send, User as UserIcon } from 'lucide-react';
import { messages } from '../../data/messages';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';

export const DashboardMessages: React.FC = () => {
  const { user } = useAuth();
  const { addToast } = useToast();
  const [chatList, setChatList] = useState(messages);
  const [newText, setNewText] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;

    const newMessage = {
      id: `msg-${Date.now()}`,
      senderId: user?.id || 'user-1',
      senderName: user?.name || 'Vinay Kumar',
      receiverId: 'agent-1',
      receiverName: 'Rajesh Kumar',
      content: newText.trim(),
      isRead: true,
      createdAt: new Date().toISOString(),
    };

    setChatList((prev) => [...prev, newMessage]);
    setNewText('');
    addToast('Message sent to advisor', 'success');
  };

  return (
    <div className="bg-white rounded-3xl border border-neutral-200/80 shadow-subtle overflow-hidden flex flex-col h-[600px]">
      {/* Header */}
      <div className="p-4 sm:p-5 border-b border-neutral-100 flex items-center justify-between bg-ivory-50">
        <div className="flex items-center gap-3">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&q=80"
            alt="Advisor"
            className="w-10 h-10 rounded-full object-cover border border-forest"
          />
          <div>
            <h4 className="font-bold text-sm text-forest">Rajesh Kumar</h4>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Online • Senior Property Advisor
            </span>
          </div>
        </div>
      </div>

      {/* Messages Thread */}
      <div className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4 bg-ivory-50/30">
        {chatList.map((msg) => {
          const isMe = msg.senderName === (user?.name || 'Vinay Kumar');
          return (
            <div
              key={msg.id}
              className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
            >
              <div
                className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed ${
                  isMe
                    ? 'bg-forest text-white rounded-br-none shadow-sm'
                    : 'bg-white text-charcoal rounded-bl-none border border-neutral-200 shadow-subtle'
                }`}
              >
                {msg.content}
              </div>
              <span className="text-[10px] text-mutedGray mt-1 px-1">
                {new Date(msg.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          );
        })}
      </div>

      {/* Message Input Form */}
      <form onSubmit={handleSend} className="p-4 border-t border-neutral-100 bg-white flex items-center gap-3">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Type your message to Rajesh Kumar..."
          className="flex-1 bg-ivory-100 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-charcoal focus:outline-none focus:border-forest"
        />
        <button
          type="submit"
          className="p-2.5 rounded-xl bg-forest hover:bg-forest-900 text-white transition-colors cursor-pointer shrink-0 shadow-sm"
        >
          <Send className="w-4 h-4 text-gold" />
        </button>
      </form>
    </div>
  );
};

export default DashboardMessages;


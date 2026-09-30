// @ts-nocheck
'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '@/context/AppContext';
import { 
  Send, 
  Paperclip, 
  Sparkles, 
  ShieldCheck, 
  ExternalLink, 
  MessageSquare, 
  User, 
  Clock, 
  CheckCheck, 
  DollarSign, 
  Briefcase,
  Play,
  Code2,
  FileCheck
} from 'lucide-react';

export const MessagesView: React.FC = () => {
  const { 
    conversations, 
    activeConversationId, 
    setActiveConversationId, 
    sendMessage, 
    currentUser, 
    freelancers, 
    setSelectedFreelancerId, 
    setActiveView, 
    setHiringTargetFreelancer, 
    setIsHireModalOpen 
  } = useApp();

  const [messageText, setMessageText] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const currentConv = conversations.find(c => c.id === activeConversationId) || conversations[0];

  // Auto-scroll to bottom of conversation
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentConv?.messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!messageText.trim() || !currentConv) return;
    sendMessage(currentConv.id, messageText.trim());
    setMessageText('');
  };

  const handleSendDeliverableDraft = () => {
    if (!currentConv) return;
    const deliverableMessage = "🎬 Rough Cut Deliverable v1 ready for milestone review: https://craftlink.stream/review/cut-9402 - Please inspect sound design layers and pacing.";
    sendMessage(currentConv.id, deliverableMessage);
  };

  const recipientFreelancer = freelancers.find(f => 
    f.id === currentConv?.participantId || 
    f.name === currentConv?.participantName
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-[var(--bg-card)] rounded-3xl border-2 border-[var(--border-subtle)] overflow-hidden shadow-2xl h-[750px] flex flex-col md:flex-row">
        {/* Left Sidebar: Conversations List */}
        <div className="w-full md:w-80 lg:w-96 border-r border-[var(--border-subtle)]/10 flex flex-col bg-[var(--bg-primary)]">
          {/* Header */}
          <div className="p-4 border-b border-[var(--border-subtle)]/10 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-[var(--accent-primary)] font-bold">Secure Channels</span>
              <h2 className="font-display font-black text-xl text-[var(--text-primary)] italic">Direct Messages</h2>
            </div>
            <span className="px-2 py-0.5 bg-[var(--bg-elevated)] text-white text-[10px] font-mono rounded font-bold">
              {conversations.length} Active
            </span>
          </div>

          {/* Conversations */}
          <div className="flex-1 overflow-y-auto divide-y divide-[#1A1A1A]/5">
            {conversations.map((conv) => {
              const isActive = conv.id === (currentConv?.id || '');
              return (
                <div
                  key={conv.id}
                  onClick={() => setActiveConversationId(conv.id)}
                  className={`p-4 cursor-pointer transition-colors flex items-start gap-3 relative ${
                    isActive ? 'bg-[var(--bg-secondary)] border-l-4 border-[var(--accent-primary)]' : 'hover:bg-white'
                  }`}
                >
                  <div className="relative shrink-0">
                    <img
                      src={conv.participantAvatar}
                      alt={conv.participantName}
                      className="w-11 h-11 rounded-full object-cover border border-[var(--border-subtle)]/15"
                    />
                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white"></span>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-0.5">
                      <h4 className="font-display font-bold text-sm text-[var(--text-primary)] truncate italic">
                        {conv.participantName}
                      </h4>
                      <span className="text-[10px] font-mono text-[var(--text-primary)]/50 shrink-0">
                        {conv.lastMessageTime}
                      </span>
                    </div>

                    <p className="text-[11px] font-mono text-[var(--accent-primary)] truncate mb-1">
                      {conv.participantRole}
                    </p>

                    <p className="text-xs text-[var(--text-primary)]/60 truncate font-sans">
                      {conv.lastMessage}
                    </p>
                  </div>

                  {conv.unreadCount > 0 && (
                    <span className="w-5 h-5 rounded-full bg-[var(--accent-primary)] text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                      {conv.unreadCount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Area: Active Message Thread */}
        {currentConv ? (
          <div className="flex-1 flex flex-col bg-[var(--bg-card)]">
            {/* Thread Header */}
            <div className="p-4 px-6 border-b border-[var(--border-subtle)]/10 flex items-center justify-between bg-[var(--bg-card)] shadow-2xs">
              <div className="flex items-center gap-3">
                <img
                  src={currentConv.participantAvatar}
                  alt={currentConv.participantName}
                  className="w-10 h-10 rounded-full object-cover border-2 border-[var(--border-subtle)]"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-display font-black text-base text-[var(--text-primary)] italic">
                      {currentConv.participantName}
                    </h3>
                    <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-mono font-bold rounded-full flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                      <span>Online</span>
                    </span>
                  </div>
                  <p className="text-xs text-[var(--accent-primary)] font-bold font-mono">
                    {currentConv.participantRole}
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                {recipientFreelancer && (
                  <button
                    onClick={() => {
                      setSelectedFreelancerId(recipientFreelancer.id);
                      setActiveView('freelancer-profile');
                    }}
                    className="px-3 py-1.5 bg-[var(--bg-secondary)] hover:bg-[var(--bg-elevated)] hover:text-white rounded-full text-xs font-bold transition-colors hidden sm:flex items-center gap-1"
                  >
                    <span>View Portfolio</span>
                    <ExternalLink className="w-3 h-3" />
                  </button>
                )}

                {currentUser?.role === 'client' && recipientFreelancer && (
                  <button
                    onClick={() => {
                      setHiringTargetFreelancer(recipientFreelancer);
                      setIsHireModalOpen(true);
                    }}
                    className="px-4 py-1.5 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] text-white rounded-full text-xs font-black uppercase tracking-wider transition-all shadow-sm flex items-center gap-1.5"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Create Escrow Proposal</span>
                  </button>
                )}
              </div>
            </div>

            {/* Escrow Trust Banner */}
            <div className="bg-[var(--bg-primary)] px-6 py-2 border-b border-[var(--border-subtle)]/10 flex items-center justify-between text-[11px] font-mono text-[var(--text-primary)]/70">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[var(--accent-primary)]" />
                <span>CraftLink Escrow Protection Active. Never pay outside the platform to maintain payment guarantees.</span>
              </div>
            </div>

            {/* Message Bubble Thread */}
            <div className="flex-1 p-6 overflow-y-auto space-y-4 bg-[var(--bg-primary)]">
              {currentConv.messages.map((msg) => {
                const isMe = msg.senderId === currentUser?.id || msg.senderRole === currentUser?.role;
                return (
                  <div
                    key={msg.id}
                    className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] font-mono text-[var(--text-primary)]/50">
                      <span>{msg.senderName}</span>
                      <span>•</span>
                      <span>{msg.timestamp}</span>
                    </div>

                    <div
                      className={`max-w-md sm:max-w-lg p-4 rounded-2xl text-xs sm:text-sm font-sans leading-relaxed shadow-2xs ${
                        isMe
                          ? 'bg-[var(--bg-elevated)] text-white rounded-tr-none'
                          : 'bg-[var(--bg-card)] text-[var(--text-primary)] border border-[var(--border-subtle)]/15 rounded-tl-none'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions & Input Form */}
            <div className="p-4 border-t border-[var(--border-subtle)]/10 bg-[var(--bg-card)] space-y-3">
              {/* Quick Actions Bar */}
              <div className="flex items-center gap-2 text-[11px] font-mono">
                <span className="text-[var(--text-primary)]/50 uppercase font-bold text-[10px]">Shortcuts:</span>
                <button
                  type="button"
                  onClick={handleSendDeliverableDraft}
                  className="px-2.5 py-1 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white rounded-lg text-[var(--text-primary)] transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 text-[var(--accent-primary)]" />
                  <span>Send Cut Review Link</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMessageText("Hi! Could we arrange a brief 10-minute sync to review the second revision phase?")}
                  className="px-2.5 py-1 bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white rounded-lg text-[var(--text-primary)] transition-colors"
                >
                  Request Sync
                </button>
              </div>

              {/* Message Input Form */}
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    placeholder="Type your message or attach project briefs..."
                    className="w-full pl-4 pr-10 py-3 bg-[var(--bg-primary)] border border-[var(--border-subtle)]/20 rounded-full text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent-primary)] shadow-2xs"
                  />
                  <button
                    type="button"
                    onClick={() => setMessageText(prev => prev + " 📎 [Asset: brand_guidelines_v2.pdf Attached]")}
                    className="absolute right-3 top-3 text-[var(--text-primary)]/40 hover:text-[var(--accent-primary)]"
                    title="Attach File / Brief"
                  >
                    <Paperclip className="w-4 h-4" />
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={!messageText.trim()}
                  className="p-3 bg-[var(--accent-primary)] hover:bg-[var(--bg-elevated)] disabled:opacity-40 text-white rounded-full transition-all shadow-md active:scale-95 shrink-0"
                  title="Send Message"
                >
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center space-y-3 bg-[var(--bg-primary)]">
            <MessageSquare className="w-12 h-12 text-[var(--accent-primary)] opacity-50" />
            <h3 className="font-display font-black text-2xl italic text-[var(--text-primary)]">No conversation selected</h3>
            <p className="text-xs text-[var(--text-primary)]/60 max-w-sm">
              Select an artisan or client from the left channel list to inspect deliverables and review milestones.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};


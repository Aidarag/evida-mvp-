import React, { useState } from 'react';
import { Send, Search, Sparkles, Check, CheckCheck, Users } from 'lucide-react';

interface MessageThread {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unreadCount: number;
  isGroup: boolean;
  status?: 'sent' | 'delivered' | 'read';
}

export const Messages: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  const threads: MessageThread[] = [
    {
      id: 'thread-bsu',
      name: 'BSU Event Planning',
      avatar: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200',
      lastMessage: 'Marcus Vance: The decorations are in the quad!',
      time: '12:42 PM',
      unreadCount: 3,
      isGroup: true
    },
    {
      id: 'thread-sarah',
      name: 'Sarah Jenkins',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Let\'s run the code review sessions at 6 PM.',
      time: '10:15 AM',
      unreadCount: 0,
      isGroup: false,
      status: 'read'
    },
    {
      id: 'thread-tech',
      name: 'Tech Innovators Hackathon',
      avatar: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=200',
      lastMessage: 'Tariq Al-Fayed: Make sure your repositories are updated.',
      time: 'Yesterday',
      unreadCount: 0,
      isGroup: true,
      status: 'delivered'
    },
    {
      id: 'thread-marcus',
      name: 'Marcus Vance',
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Are you heading to the Stadium Concert tonight?',
      time: 'Yesterday',
      unreadCount: 0,
      isGroup: false,
      status: 'read'
    },
    {
      id: 'thread-maya',
      name: 'Maya Lin',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      lastMessage: 'Yes! The flyers are approved. Thanks for checking.',
      time: '3 days ago',
      unreadCount: 0,
      isGroup: false,
      status: 'read'
    }
  ];

  const filteredThreads = threads.filter(thread => 
    thread.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    thread.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-6 fade-in pb-24 text-left select-none bg-brand-bg min-h-screen">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-text font-display uppercase tracking-tight">
          Campus Messages
        </h1>
        <p className="text-sm sm:text-base text-brand-text-sec leading-relaxed font-sans">
          Coordinate socials, event setups, and study groups directly with your classmates.
        </p>
      </div>

      {/* Messages Main Layout */}
      <div className="bg-white rounded-3xl border border-brand-text/5 shadow-sm overflow-hidden flex flex-col md:flex-row h-[600px]">
        {/* Left Side: Thread List */}
        <div className="w-full md:w-80 border-r border-brand-text/5 flex flex-col h-full bg-brand-bg/10">
          {/* Thread Search */}
          <div className="p-4 border-b border-brand-text/5 relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chat or user..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-brand-bg/50 border border-brand-text/10 focus:outline-none focus:border-[#FF7A30] font-sans transition-all"
            />
            <Search className="w-4 h-4 text-brand-text-sec/40 absolute left-7 top-[27px]" />
          </div>

          {/* Threads scrolling container */}
          <div className="flex-1 overflow-y-auto custom-scrollbar divide-y divide-brand-text/5">
            {filteredThreads.map(thread => (
              <div
                key={thread.id}
                className="p-4 hover:bg-white flex items-center gap-3.5 cursor-pointer transition-colors relative"
              >
                <div className="relative">
                  <img
                    src={thread.avatar}
                    alt={thread.name}
                    className="w-11 h-11 rounded-full border border-brand-text/5 object-cover"
                  />
                  {thread.isGroup && (
                    <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-[#FF7A30] text-white flex items-center justify-center border border-white">
                      <Users className="w-2 h-2" />
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-baseline mb-0.5">
                    <h4 className="text-xs font-bold text-brand-text truncate">{thread.name}</h4>
                    <span className="text-[9px] text-brand-text-sec/60">{thread.time}</span>
                  </div>
                  <p className="text-[11px] text-brand-text-sec/80 truncate leading-snug">
                    {thread.lastMessage}
                  </p>
                </div>

                {thread.unreadCount > 0 ? (
                  <span className="w-4.5 h-4.5 rounded-full bg-[#FF7A30] text-[9px] font-bold text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                    {thread.unreadCount}
                  </span>
                ) : thread.status ? (
                  <span className="flex-shrink-0">
                    {thread.status === 'read' ? (
                      <CheckCheck className="w-3.5 h-3.5 text-[#FF7A30]" />
                    ) : (
                      <Check className="w-3.5 h-3.5 text-brand-text-sec/30" />
                    )}
                  </span>
                ) : null}
              </div>
            ))}
            
            {filteredThreads.length === 0 && (
              <div className="text-center py-12 px-4 space-y-2">
                <p className="text-xs text-brand-text-sec/60 font-medium">No active chats found.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Active Chat Preview */}
        <div className="hidden md:flex flex-1 flex-col h-full bg-white relative">
          <div className="p-5 border-b border-brand-text/5 flex items-center gap-3.5 text-left">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=200"
              alt="BSU Event Planning"
              className="w-10 h-10 rounded-full border border-brand-text/5 object-cover"
            />
            <div>
              <h3 className="text-sm font-bold text-brand-text leading-tight">BSU Event Planning</h3>
              <p className="text-[10px] text-[#FF7A30] font-bold mt-0.5">Marcus, Sarah, and 12 others active</p>
            </div>
          </div>

          {/* Messages List Area */}
          <div className="flex-1 p-5 overflow-y-auto custom-scrollbar space-y-4 bg-brand-bg/5 flex flex-col justify-end">
            <div className="flex items-start gap-3 text-left max-w-[70%]">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
                alt="Marcus"
                className="w-8 h-8 rounded-full border border-brand-text/5 object-cover flex-shrink-0 mt-0.5"
              />
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-brand-text-sec/70">Marcus Vance • 12:40 PM</span>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-brand-text/5 text-xs text-brand-text leading-relaxed">
                  Hey guys, are we all set for the Open Mic setup tomorrow?
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left max-w-[70%]">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
                alt="Aida"
                className="w-8 h-8 rounded-full border border-brand-text/5 object-cover flex-shrink-0 mt-0.5"
              />
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-brand-text-sec/70">Aida Garba (You) • 12:41 PM</span>
                <div className="bg-[#FF7A30]/10 border border-[#FF7A30]/15 p-3 rounded-2xl rounded-tl-none text-xs text-brand-text leading-relaxed">
                  Yes, I've loaded the custom stickers and brochures. The digital invites went out through Evida too!
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left max-w-[70%]">
              <img
                src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
                alt="Marcus"
                className="w-8 h-8 rounded-full border border-brand-text/5 object-cover flex-shrink-0 mt-0.5"
              />
              <div className="space-y-1">
                <span className="text-[9px] font-bold text-brand-text-sec/70">Marcus Vance • 12:42 PM</span>
                <div className="bg-white p-3 rounded-2xl rounded-tl-none border border-brand-text/5 text-xs text-brand-text leading-relaxed">
                  Perfect! The decorations are in the quad! See you there.
                </div>
              </div>
            </div>
          </div>

          {/* Messages Send Input bar */}
          <div className="p-4 border-t border-brand-text/5 flex gap-2">
            <input
              type="text"
              placeholder="Type your message..."
              disabled
              className="flex-1 px-4 py-2.5 rounded-full text-xs bg-brand-bg/50 border border-brand-text/5 focus:outline-none font-sans cursor-not-allowed opacity-60"
            />
            <button
              disabled
              className="w-10 h-10 rounded-full bg-[#FF7A30] hover:bg-[#E0601B] flex items-center justify-center text-white cursor-not-allowed opacity-60"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* integrated Protip Bottom banner */}
      <div className="bg-[#FFF0DE] max-w-4xl mx-auto rounded-3xl p-5 border border-brand-text/5 flex items-start space-x-3.5 select-none shadow-sm">
        <Sparkles className="w-5 h-5 text-[#FF7A30] flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="font-bold text-xs text-[#FF7A30] uppercase tracking-wider mb-1">Evida Messaging</h4>
          <p className="text-xs text-brand-text-sec leading-relaxed">
            Messaging is available automatically for RSVP'ed attendees of any event or members of any club. Coordinate rides, gear, and updates seamlessly!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Messages;

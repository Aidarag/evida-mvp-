import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Heart, MessageCircle, X, Send } from 'lucide-react';
import type { Moment } from '../types';

export const ShareMoments: React.FC = () => {
  const { moments, likeMoment, addMomentComment } = useApp();
  const [selectedMoment, setSelectedMoment] = useState<Moment | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleOpenMoment = (moment: Moment) => {
    setSelectedMoment(moment);
  };

  const handleCloseMoment = () => {
    setSelectedMoment(null);
    setCommentText('');
  };

  const handleLike = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    likeMoment(id);
    // If the modal is open, sync the state
    if (selectedMoment && selectedMoment.id === id) {
      setSelectedMoment(prev => {
        if (!prev) return null;
        const hasLiked = !prev.hasLiked;
        return {
          ...prev,
          hasLiked,
          likes: hasLiked ? prev.likes + 1 : prev.likes - 1
        };
      });
    }
  };

  const handleSubmitComment = (e: React.FormEvent, momentId: string) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    addMomentComment(momentId, commentText);

    // Sync state in the open modal
    if (selectedMoment) {
      setSelectedMoment(prev => {
        if (!prev) return null;
        return {
          ...prev,
          comments: [
            ...prev.comments,
            {
              id: `mcomm-temp-${Date.now()}`,
              author: 'Aida Garba',
              avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
              text: commentText,
              timestamp: 'Just now'
            }
          ]
        };
      });
    }

    setCommentText('');
  };

  return (
    <section className="space-y-4 select-none">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-white font-display">Campus Moments</h2>
          <p className="text-xs text-[#B8B8B8] font-medium mt-0.5">BeReal snaps shared by students around campus</p>
        </div>
      </div>

      {/* Horizontal scroll track of Moments */}
      <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 px-1 scrollbar-none custom-scrollbar -mx-4 sm:mx-0">
        {moments.map((moment) => (
          <div
            key={moment.id}
            onClick={() => handleOpenMoment(moment)}
            className="flex-shrink-0 w-52 aspect-[3/4] rounded-[2rem] bg-[#111111] border border-white/5 overflow-hidden relative group cursor-pointer hover:border-[#FF7A1A]/30 transition-all duration-300 hover:-translate-y-1"
          >
            {/* Main moment photo */}
            <img
              src={moment.image}
              alt={`${moment.studentName}'s moment`}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/40 opacity-90 transition-opacity" />

            {/* Top User Badge */}
            <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center space-x-2">
              <img
                src={moment.studentAvatar}
                alt={moment.studentName}
                className="w-7 h-7 rounded-full border border-white/20 object-cover"
              />
              <div className="min-w-0 leading-tight">
                <h4 className="text-[11px] font-bold text-white truncate font-display">{moment.studentName}</h4>
                <p className="text-[9px] text-[#B8B8B8] truncate">{moment.organization}</p>
              </div>
            </div>

            {/* Bottom Actions overlay */}
            <div className="absolute bottom-3.5 left-3.5 right-3.5 flex items-center justify-between">
              {/* Like action */}
              <button
                onClick={(e) => handleLike(e, moment.id)}
                className={`flex items-center space-x-1 py-1 px-2.5 rounded-full backdrop-blur-md transition-all ${
                  moment.hasLiked
                    ? 'bg-[#FF7A1A] text-white'
                    : 'bg-black/45 hover:bg-black/60 text-white/80 hover:text-white'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${moment.hasLiked ? 'fill-white' : ''}`} />
                <span className="text-[10px] font-bold font-display">{moment.likes}</span>
              </button>

              {/* Comments counter */}
              <div className="flex items-center space-x-1 py-1 px-2.5 rounded-full bg-black/45 backdrop-blur-md text-white/80">
                <MessageCircle className="w-3.5 h-3.5" />
                <span className="text-[10px] font-bold font-display">{moment.comments.length}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Expanded Modal Overlay */}
      {selectedMoment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div 
            className="bg-[#111111] rounded-[2.5rem] overflow-hidden max-w-4xl w-full aspect-[16/10] border border-white/10 shadow-2xl flex flex-col md:flex-row relative animate-fadeIn"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={handleCloseMoment}
              className="absolute top-4 right-4 p-2 bg-black/55 text-white/80 hover:text-white rounded-full hover:bg-black/80 transition-colors z-20"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Left Column: Huge high-res Image */}
            <div className="w-full md:w-[55%] h-64 md:h-full bg-black relative">
              <img
                src={selectedMoment.image}
                alt={selectedMoment.studentName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-6 flex items-center space-x-3">
                <img
                  src={selectedMoment.studentAvatar}
                  alt={selectedMoment.studentName}
                  className="w-10 h-10 rounded-full border-2 border-white/20 object-cover"
                />
                <div className="text-left">
                  <h4 className="font-display font-bold text-white text-sm">{selectedMoment.studentName}</h4>
                  <p className="text-xs text-[#B8B8B8]">{selectedMoment.organization}</p>
                </div>
              </div>
            </div>

            {/* Right Column: Interaction, Likes, Comments Feed */}
            <div className="flex-1 p-6 flex flex-col h-full bg-[#111111] border-l border-white/5 text-left justify-between">
              <div>
                <div className="flex justify-between items-center pb-4 border-b border-white/5">
                  <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Comments</h3>
                  <button
                    onClick={(e) => handleLike(e, selectedMoment.id)}
                    className={`flex items-center space-x-1.5 py-1.5 px-4 rounded-full transition-all ${
                      selectedMoment.hasLiked
                        ? 'bg-[#FF7A1A] text-white shadow-md shadow-[#FF7A1A]/20'
                        : 'bg-white/5 hover:bg-white/10 text-white/80'
                    }`}
                  >
                    <Heart className={`w-4 h-4 ${selectedMoment.hasLiked ? 'fill-white' : ''}`} />
                    <span className="text-xs font-bold font-display">{selectedMoment.likes} Likes</span>
                  </button>
                </div>

                {/* Comments List */}
                <div className="mt-4 space-y-4 h-[280px] overflow-y-auto custom-scrollbar pr-2">
                  {selectedMoment.comments.length > 0 ? (
                    selectedMoment.comments.map((comment) => (
                      <div key={comment.id} className="flex items-start space-x-3">
                        <img
                          src={comment.avatar}
                          alt={comment.author}
                          className="w-8 h-8 rounded-full object-cover mt-0.5 border border-white/5"
                        />
                        <div className="min-w-0 flex-1 leading-normal">
                          <div className="flex items-baseline space-x-2">
                            <h5 className="text-xs font-bold text-white font-display">{comment.author}</h5>
                            <span className="text-[9px] text-[#B8B8B8]/60">{comment.timestamp}</span>
                          </div>
                          <p className="text-xs text-[#B8B8B8] mt-0.5">{comment.text}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-16 text-[#B8B8B8]/40 italic text-xs">
                      No comments yet. Be the first to share a vibe!
                    </div>
                  )}
                </div>
              </div>

              {/* Write a comment form */}
              <form
                onSubmit={(e) => handleSubmitComment(e, selectedMoment.id)}
                className="pt-4 border-t border-white/5 flex items-center space-x-2 mt-auto"
              >
                <input
                  type="text"
                  placeholder="Share a vibe or comment..."
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="flex-1 px-4 py-2.5 bg-[#090909] border border-white/5 rounded-full text-xs text-white placeholder-[#B8B8B8]/40 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all"
                />
                <button
                  type="submit"
                  className="p-2.5 bg-gradient-to-r from-[#FF7A1A] to-[#E56717] text-white rounded-full hover:opacity-95 active:scale-95 transition-all shadow-md shadow-[#FF7A1A]/10"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShareMoments;

import React from 'react';
import type { Community } from '../types';
import { useApp } from '../context/AppContext';
import { Users, Check } from 'lucide-react';
import Button from './Button';

interface CommunityCardProps {
  community: Community;
}

export const CommunityCard: React.FC<CommunityCardProps> = ({ community }) => {
  const { profile, toggleFollowCommunity, setSelectedCommunityId, setCurrentPage } = useApp();
  
  const isFollowing = profile.followedCommunityIds.includes(community.id);

  const categoryStyles: Record<string, string> = {
    Tech: 'bg-[#FFFB97]/10 text-[#FFFB97] border border-[#FFFB97]/25',
    Culture: 'bg-[#FE7F42]/10 text-[#FE7F42] border border-[#FE7F42]/20',
    Sports: 'bg-[#FF8A4C]/10 text-[#FF8A4C] border border-[#FF8A4C]/20',
    Business: 'bg-[#FE7F42]/10 text-[#FE7F42] border border-[#FE7F42]/20',
    Wellness: 'bg-[#FF8A4C]/10 text-[#FF8A4C] border border-[#FF8A4C]/20',
    Creative: 'bg-[#FFFB97]/10 text-[#FFFB97] border border-[#FFFB97]/25',
  };

  const handleCardClick = () => {
    setSelectedCommunityId(community.id);
    setCurrentPage('community-profile');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-[#1A1214] rounded-3xl overflow-hidden transition-all duration-300 border border-white/5 hover:border-[#FE7F42]/30 flex flex-col h-full hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Banner/Header image */}
      <div className="relative h-32 w-full overflow-hidden bg-white/5">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1214] via-[#1A1214]/50 to-transparent" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${categoryStyles[community.category] || 'bg-white/10 border border-white/10 text-white'}`}>
          {community.category}
        </span>
      </div>

      {/* Community Info */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#FE7F42] transition-colors">
          {community.name}
        </h3>
        
        <p className="text-xs text-white/70 line-clamp-2 mb-4 flex-grow leading-relaxed">
          {community.description}
        </p>

        {/* Member Count & Follow Action */}
        <div className="pt-3.5 border-t border-white/5 flex justify-between items-center mt-auto">
          <div className="flex items-center text-[10px] text-white/60 font-semibold bg-white/5 px-2.5 py-1 rounded-full border border-white/5">
            <Users className="w-3.5 h-3.5 text-white/30 mr-1.5" />
            <span>{community.memberCount} members</span>
          </div>

          <Button
            variant={isFollowing ? 'secondary' : 'outline'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCommunity(community.id);
            }}
            className="flex items-center space-x-1 py-1 px-3 border-white/10 font-bold text-xs text-[#FE7F42]"
          >
            {isFollowing ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
                <span>Joined</span>
              </>
            ) : (
              <span>Join</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};
export default CommunityCard;

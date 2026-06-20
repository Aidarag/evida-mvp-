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
    Tech: 'bg-[#FFA851]/10 text-[#FFA851] border border-[#FFA851]/20',
    Culture: 'bg-[#E56717]/10 text-[#E56717] border border-[#E56717]/20',
    Sports: 'bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/20',
    Business: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Wellness: 'bg-[#FFA044]/10 text-[#FFA044] border border-[#FFA044]/20',
    Creative: 'bg-[#FF9F43]/10 text-[#FF9F43] border border-[#FF9F43]/20',
  };

  const handleCardClick = () => {
    setSelectedCommunityId(community.id);
    setCurrentPage('community-profile');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-[#111111] rounded-3xl overflow-hidden shadow-sm hover:shadow-[#FF7A1A]/5 hover:shadow-xl transition-all duration-300 border border-white/5 hover:border-white/10 flex flex-col h-full hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Banner/Header image */}
      <div className="relative h-32 w-full overflow-hidden bg-white/5">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] to-transparent opacity-85" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${categoryStyles[community.category] || 'bg-[#111111] text-white'}`}>
          {community.category}
        </span>
      </div>

      {/* Community Info */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-[#FF7A1A] transition-colors">
          {community.name}
        </h3>
        
        <p className="text-xs text-[#B8B8B8] line-clamp-2 mb-4 flex-grow leading-relaxed">
          {community.description}
        </p>

        {/* Member Count & Follow Action */}
        <div className="pt-3.5 border-t border-white/5 flex justify-between items-center mt-auto">
          <div className="flex items-center text-[10px] text-[#B8B8B8] font-semibold bg-[#161616] px-2.5 py-1 rounded-full border border-white/5">
            <Users className="w-3.5 h-3.5 text-[#B8B8B8]/30 mr-1.5" />
            <span>{community.memberCount} members</span>
          </div>

          <Button
            variant={isFollowing ? 'secondary' : 'outline'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCommunity(community.id);
            }}
            className="flex items-center space-x-1 py-1 px-3 border-white/5 font-bold text-xs"
          >
            {isFollowing ? (
              <>
                <Check className="w-3 h-3 stroke-[3px]" />
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

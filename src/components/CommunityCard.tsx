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
    Tech: 'bg-[#FFC857]/15 text-[#B47C00] border border-[#FFC857]/35',
    Culture: 'bg-[#E0601B]/10 text-[#E0601B] border border-[#E0601B]/20',
    Sports: 'bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/20',
    Business: 'bg-[#FF7A30]/10 text-[#FF7A30] border border-[#FF7A30]/20',
    Wellness: 'bg-[#FF7A30]/10 text-[#FF7A30] border border-[#FF7A30]/20',
    Creative: 'bg-[#FFC857]/15 text-[#B47C00] border border-[#FFC857]/35',
  };

  const handleCardClick = () => {
    setSelectedCommunityId(community.id);
    setCurrentPage('community-profile');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:shadow-brand-text/5 transition-all duration-300 border border-brand-text/5 hover:border-brand-text/10 flex flex-col h-full hover:-translate-y-1 cursor-pointer select-none"
    >
      {/* Banner/Header image */}
      <div className="relative h-32 w-full overflow-hidden bg-white/5">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent opacity-85" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${categoryStyles[community.category] || 'bg-white border border-brand-text/10 text-brand-text'}`}>
          {community.category}
        </span>
      </div>

      {/* Community Info */}
      <div className="p-5 flex flex-col flex-grow text-left">
        <h3 className="text-lg font-bold text-brand-text mb-1.5 group-hover:text-[#FF7A30] transition-colors">
          {community.name}
        </h3>
        
        <p className="text-xs text-brand-text-sec line-clamp-2 mb-4 flex-grow leading-relaxed">
          {community.description}
        </p>

        {/* Member Count & Follow Action */}
        <div className="pt-3.5 border-t border-brand-text/5 flex justify-between items-center mt-auto">
          <div className="flex items-center text-[10px] text-brand-text-sec font-semibold bg-brand-bg px-2.5 py-1 rounded-full border border-brand-text/5">
            <Users className="w-3.5 h-3.5 text-brand-text-sec/30 mr-1.5" />
            <span>{community.memberCount} members</span>
          </div>

          <Button
            variant={isFollowing ? 'secondary' : 'outline'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCommunity(community.id);
            }}
            className="flex items-center space-x-1 py-1 px-3 border-brand-text/10 font-bold text-xs"
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

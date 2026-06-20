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
    Tech: 'bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20',
    Culture: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Sports: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Business: 'bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20',
    Wellness: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Creative: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
  };

  const handleCardClick = () => {
    setSelectedCommunityId(community.id);
    setCurrentPage('community-profile');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 border border-gray-200/80 hover:border-[#FF7A1A]/30 hover:shadow-[0_8px_30px_rgba(255,122,26,0.06)] flex flex-col h-full hover:-translate-y-1 cursor-pointer select-none shadow-sm"
    >
      {/* Banner/Header image */}
      <div className="relative h-32 w-full overflow-hidden bg-[#F7F8FA]">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/50 to-transparent" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${categoryStyles[community.category] || 'bg-gray-100 border border-gray-200 text-gray-700'}`}>
          {community.category}
        </span>
      </div>

      {/* Community Info */}
      <div className="p-5 flex flex-col flex-grow text-left font-sans">
        <h3 className="text-lg font-bold text-[#111111] mb-1.5 group-hover:text-[#FF7A1A] transition-colors">
          {community.name}
        </h3>
        
        <p className="text-xs text-[#555555] line-clamp-2 mb-4 flex-grow leading-relaxed font-medium">
          {community.description}
        </p>

        {/* Member Count & Follow Action */}
        <div className="pt-3.5 border-t border-gray-100 flex justify-between items-center mt-auto">
          <div className="flex items-center text-[10px] text-[#555555] font-bold bg-[#F7F8FA] px-2.5 py-1 rounded-full border border-gray-200/50">
            <Users className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
            <span>{community.memberCount} members</span>
          </div>

          <Button
            variant={isFollowing ? 'secondary' : 'outline'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCommunity(community.id);
            }}
            className="flex items-center space-x-1 py-1 px-3 border-gray-200 font-bold text-xs text-[#FF7A1A]"
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

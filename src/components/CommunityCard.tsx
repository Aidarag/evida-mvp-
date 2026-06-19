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
    Tech: 'bg-cyan-50 text-cyan-700 border border-cyan-100',
    Culture: 'bg-amber-50 text-amber-700 border border-amber-100',
    Sports: 'bg-rose-50 text-rose-700 border border-rose-100',
    Business: 'bg-blue-50 text-blue-700 border border-blue-100',
    Wellness: 'bg-emerald-50 text-emerald-700 border border-emerald-100',
    Creative: 'bg-purple-50 text-purple-700 border border-purple-100',
  };

  const handleCardClick = () => {
    setSelectedCommunityId(community.id);
    setCurrentPage('community-profile');
  };

  return (
    <div 
      onClick={handleCardClick}
      className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-lavender/30 flex flex-col h-full hover:-translate-y-1 cursor-pointer"
    >
      {/* Banner/Header image */}
      <div className="relative h-32 w-full overflow-hidden bg-brand-lavender/10">
        <img
          src={community.image}
          alt={community.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase font-display ${categoryStyles[community.category] || 'bg-brand-bg text-brand-text'}`}>
          {community.category}
        </span>
      </div>

      {/* Community Info */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-brand-text mb-2 font-display group-hover:text-brand-purple transition-colors">
          {community.name}
        </h3>
        
        <p className="text-sm text-brand-text-sec line-clamp-3 mb-5 flex-grow">
          {community.description}
        </p>

        {/* Member Count & Follow Action */}
        <div className="pt-4 border-t border-brand-lavender/20 flex justify-between items-center mt-auto">
          <div className="flex items-center text-xs text-brand-text-sec font-semibold bg-brand-bg px-2.5 py-1.5 rounded-full border border-brand-lavender/30">
            <Users className="w-3.5 h-3.5 text-brand-text/40 mr-1.5" />
            <span>{community.memberCount} members</span>
          </div>

          <Button
            variant={isFollowing ? 'secondary' : 'outline'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              toggleFollowCommunity(community.id);
            }}
            className="flex items-center space-x-1 py-1.5 px-4 border-brand-purple/10"
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

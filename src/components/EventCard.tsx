import React from 'react';
import type { Event } from '../types';
import { useApp } from '../context/AppContext';
import { Calendar, MapPin, Heart, Check, Users } from 'lucide-react';
import Button from './Button';

interface EventCardProps {
  event: Event;
}

export const EventCard: React.FC<EventCardProps> = ({ event }) => {
  const { profile, rsvpEvent, saveEvent, setSelectedEventId, setCurrentPage } = useApp();
  
  const isRsvped = profile.rsvpEventIds.includes(event.id);
  const isSaved = profile.savedEventIds.includes(event.id);

  const categoryStyles: Record<string, string> = {
    Social: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Career: 'bg-[#FFA851]/10 text-[#FFA851] border border-[#FFA851]/20',
    Sports: 'bg-[#FF5E00]/10 text-[#FF5E00] border border-[#FF5E00]/20',
    Culture: 'bg-[#E56717]/10 text-[#E56717] border border-[#E56717]/20',
    Academic: 'bg-[#FF9F43]/10 text-[#FF9F43] border border-[#FF9F43]/20',
    Wellness: 'bg-[#FFA044]/10 text-[#FFA044] border border-[#FFA044]/20',
    Volunteer: 'bg-[#D95400]/10 text-[#D95400] border border-[#D95400]/20',
  };

  const handleCardClick = () => {
    setSelectedEventId(event.id);
    setCurrentPage('event-details');
  };

  return (
    <div className="group bg-[#111111] rounded-3xl overflow-hidden shadow-sm hover:shadow-[#FF7A1A]/5 hover:shadow-xl transition-all duration-300 border border-white/5 hover:border-white/10 hover:-translate-y-1.5 flex flex-col h-full select-none">
      {/* Event Image */}
      <div 
        onClick={handleCardClick}
        className="relative h-48 w-full overflow-hidden cursor-pointer bg-white/5"
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/90 via-[#080808]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${categoryStyles[event.category] || 'bg-[#111111] text-white'}`}>
          {event.category}
        </span>

        {/* Bookmark Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            saveEvent(event.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-200 cursor-pointer ${
            isSaved 
              ? 'bg-[#FF7A1A] text-white scale-110 shadow-lg shadow-[#FF7A1A]/30' 
              : 'bg-black/50 hover:bg-black/75 text-white/80 hover:scale-110'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Event'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Event Details Content */}
      <div className="p-5 flex flex-col flex-grow text-left">
        {/* Organizer */}
        <p className="text-[10px] text-[#B8B8B8]/60 font-bold uppercase tracking-wider mb-1.5">
          {event.organizer}
        </p>

        {/* Title */}
        <h3 
          onClick={handleCardClick}
          className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-[#FF7A1A] cursor-pointer transition-colors"
        >
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center text-xs text-[#B8B8B8] mb-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#FF7A1A] mr-2 flex-shrink-0" />
          <span className="truncate">{event.date} • {event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-xs text-[#B8B8B8] mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] mr-2 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Attendee Pill & RSVP Button Row */}
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center text-[10px] text-[#B8B8B8] font-semibold bg-[#161616] px-2.5 py-1.5 rounded-full border border-white/5">
            <Users className="w-3.5 h-3.5 text-[#B8B8B8]/30 mr-1.5" />
            <span>{event.attendeeCount} going</span>
          </div>

          <Button
            variant={isRsvped ? 'secondary' : 'primary'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              rsvpEvent(event.id);
            }}
            className="flex items-center space-x-1 py-1.5 px-4 font-bold text-xs"
          >
            {isRsvped ? (
              <>
                <Check className="w-3.5 h-3.5 stroke-[3px]" />
                <span>Going</span>
              </>
            ) : (
              <span>RSVP</span>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;

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
    Social: 'bg-[#FE7F42]/10 text-[#FE7F42] border border-[#FE7F42]/20',
    Career: 'bg-[#FFFB97]/10 text-[#FFFB97] border border-[#FFFB97]/25',
    Sports: 'bg-[#FF8A4C]/10 text-[#FF8A4C] border border-[#FF8A4C]/20',
    Culture: 'bg-[#FE7F42]/10 text-[#FE7F42] border border-[#FE7F42]/20',
    Academic: 'bg-white/5 text-white/80 border border-white/10',
    Wellness: 'bg-[#FF8A4C]/10 text-[#FF8A4C] border border-[#FF8A4C]/20',
    Volunteer: 'bg-[#FF8A4C]/10 text-[#FF8A4C] border border-[#FF8A4C]/20',
  };

  const handleCardClick = () => {
    setSelectedEventId(event.id);
    setCurrentPage('event-details');
  };

  return (
    <div className="group bg-[#1A1214] rounded-3xl overflow-hidden transition-all duration-300 border border-white/5 hover:border-[#FE7F42]/30 hover:shadow-[0_8px_30px_rgba(254,127,66,0.08)] hover:-translate-y-1.5 flex flex-col h-full select-none">
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
        <div className="absolute inset-0 bg-gradient-to-t from-[#1A1214] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${categoryStyles[event.category] || 'bg-white/10 border border-white/10 text-white'}`}>
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
              ? 'bg-[#FE7F42] text-white scale-110 shadow-lg shadow-[#FE7F42]/30' 
              : 'bg-black/40 hover:bg-black/60 text-white/80 hover:scale-110 shadow-sm border border-white/10'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Event'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Event Details Content */}
      <div className="p-5 flex flex-col flex-grow text-left">
        {/* Organizer */}
        <p className="text-[10px] text-white/50 font-bold uppercase tracking-wider mb-1.5">
          {event.organizer}
        </p>

        {/* Title */}
        <h3 
          onClick={handleCardClick}
          className="text-base font-bold text-white mb-2 line-clamp-1 group-hover:text-[#FE7F42] cursor-pointer transition-colors"
        >
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center text-xs text-white/70 mb-1.5">
          <Calendar className="w-3.5 h-3.5 text-[#FE7F42] mr-2 flex-shrink-0" />
          <span className="truncate">{event.date} • {event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-xs text-white/70 mb-4">
          <MapPin className="w-3.5 h-3.5 text-[#FE7F42] mr-2 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Attendee Pill & RSVP Button Row */}
        <div className="mt-auto pt-4 border-t border-white/5 flex justify-between items-center">
          <div className="flex items-center text-[10px] text-white/60 font-semibold bg-white/5 px-2.5 py-1.5 rounded-full border border-white/5">
            <Users className="w-3.5 h-3.5 text-white/30 mr-1.5" />
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

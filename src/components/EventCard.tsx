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
    Career: 'bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20',
    Sports: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Culture: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Academic: 'bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20',
    Wellness: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Volunteer: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
  };

  const handleCardClick = () => {
    setSelectedEventId(event.id);
    setCurrentPage('event-details');
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden transition-all duration-300 border border-gray-200/80 hover:border-[#FF7A1A]/30 hover:shadow-[0_8px_30px_rgba(255,122,26,0.06)] hover:-translate-y-1.5 flex flex-col h-full select-none shadow-sm">
      {/* Event Image */}
      <div 
        onClick={handleCardClick}
        className="relative h-48 w-full overflow-hidden cursor-pointer bg-[#F7F8FA]"
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${categoryStyles[event.category] || 'bg-gray-100 border border-gray-200 text-gray-700'}`}>
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
              : 'bg-white hover:bg-gray-50 text-gray-500 hover:text-gray-800 hover:scale-110 shadow-sm border border-gray-200'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Event'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Event Details Content */}
      <div className="p-5 flex flex-col flex-grow text-left">
        {/* Organizer */}
        <p className="text-[10px] text-[#555555] font-black uppercase tracking-wider mb-1.5 font-sans">
          {event.organizer}
        </p>

        {/* Title */}
        <h3 
          onClick={handleCardClick}
          className="text-base font-bold text-[#111111] mb-2 line-clamp-1 group-hover:text-[#FF7A1A] cursor-pointer transition-colors font-sans"
        >
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center text-xs text-[#555555] mb-1.5 font-sans font-medium">
          <Calendar className="w-3.5 h-3.5 text-[#FF7A1A] mr-2 flex-shrink-0" />
          <span className="truncate">{event.date} • {event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-xs text-[#555555] mb-4 font-sans font-medium">
          <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] mr-2 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Attendee Pill & RSVP Button Row */}
        <div className="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
          <div className="flex items-center text-[10px] text-[#555555] font-bold bg-[#F7F8FA] px-2.5 py-1.5 rounded-full border border-gray-200/50">
            <Users className="w-3.5 h-3.5 text-gray-400 mr-1.5" />
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

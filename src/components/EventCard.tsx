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
    Social: 'bg-rose-50 text-rose-600 border border-rose-100',
    Career: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    Sports: 'bg-orange-50 text-orange-600 border border-orange-100',
    Culture: 'bg-amber-50 text-amber-600 border border-amber-100',
    Academic: 'bg-purple-50 text-purple-600 border border-purple-100',
    Wellness: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Volunteer: 'bg-teal-50 text-teal-600 border border-teal-100',
  };

  const handleCardClick = () => {
    setSelectedEventId(event.id);
    setCurrentPage('event-details');
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-lavender/30 hover:-translate-y-1.5 flex flex-col h-full">
      {/* Event Image */}
      <div 
        onClick={handleCardClick}
        className="relative h-48 w-full overflow-hidden cursor-pointer bg-brand-lavender/10"
      >
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Category Tag */}
        <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold font-display ${categoryStyles[event.category] || 'bg-brand-bg text-brand-text'}`}>
          {event.category}
        </span>

        {/* Bookmark Icon */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            saveEvent(event.id);
          }}
          className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isSaved 
              ? 'bg-brand-purple text-white scale-110 shadow-md shadow-brand-purple/20' 
              : 'bg-white/80 hover:bg-white text-brand-text/60 hover:text-brand-purple hover:scale-110'
          }`}
          title={isSaved ? 'Remove from Saved' : 'Save Event'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-white' : ''}`} />
        </button>
      </div>

      {/* Event Details Content */}
      <div className="p-6 flex flex-col flex-grow">
        {/* Organizer */}
        <p className="text-xs text-brand-text-sec font-semibold uppercase tracking-wider mb-2 font-display">
          {event.organizer}
        </p>

        {/* Title */}
        <h3 
          onClick={handleCardClick}
          className="text-lg font-bold text-brand-text mb-3 line-clamp-1 group-hover:text-brand-purple cursor-pointer transition-colors font-display"
        >
          {event.title}
        </h3>

        {/* Date & Time */}
        <div className="flex items-center text-sm text-brand-text-sec mb-2">
          <Calendar className="w-4 h-4 text-brand-purple mr-2.5 flex-shrink-0" />
          <span className="truncate">{event.date} • {event.time}</span>
        </div>

        {/* Location */}
        <div className="flex items-center text-sm text-brand-text-sec mb-4">
          <MapPin className="w-4 h-4 text-brand-purple mr-2.5 flex-shrink-0" />
          <span className="truncate">{event.location}</span>
        </div>

        {/* Attendee Pill & RSVP Button Row */}
        <div className="mt-auto pt-4 border-t border-brand-lavender/20 flex justify-between items-center">
          <div className="flex items-center text-xs text-brand-text-sec font-semibold bg-brand-bg px-2.5 py-1.5 rounded-full border border-brand-lavender/30">
            <Users className="w-3.5 h-3.5 text-brand-text/40 mr-1.5" />
            <span>{event.attendeeCount} going</span>
          </div>

          <Button
            variant={isRsvped ? 'secondary' : 'primary'}
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              rsvpEvent(event.id);
            }}
            className="flex items-center space-x-1 py-1.5 px-4"
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

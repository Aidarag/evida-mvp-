import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Calendar } from 'lucide-react';
import type { Event } from '../types';

interface MapLocation {
  id: string;
  name: string;
  x: string; // Coordinate percentages
  y: string;
  matches: string[]; // Match patterns for event locations
  description: string;
}

export const CampusMap: React.FC = () => {
  const { events, setSelectedEventId, setCurrentPage } = useApp();
  const [hoveredLocation, setHoveredLocation] = useState<string | null>(null);

  const locations: MapLocation[] = [
    {
      id: 'center',
      name: 'Student Center',
      x: '35%',
      y: '58%',
      matches: ['student center', 'student lounge', 'quad'],
      description: 'The social hub of Livingstone campus'
    },
    {
      id: 'library',
      name: 'Main Library',
      x: '62%',
      y: '28%',
      matches: ['library', 'digital den', 'brew'],
      description: 'Quiet study dens and innovation labs'
    },
    {
      id: 'auditorium',
      name: 'Main Auditorium',
      x: '22%',
      y: '32%',
      matches: ['auditorium', 'theater', 'hall'],
      description: 'Campus performances and large lectures'
    },
    {
      id: 'sports',
      name: 'Sports Complex',
      x: '78%',
      y: '68%',
      matches: ['sports complex', 'stadium', 'court'],
      description: 'Athletic courts, gym, and track field'
    },
    {
      id: 'cafeteria',
      name: 'Campus Dining Hall',
      x: '48%',
      y: '38%',
      matches: ['cafeteria', 'dining', 'café', 'brew'],
      description: 'Student eateries and social tables'
    }
  ];

  // Helper to find events active at a location pin
  const getEventsForPin = (loc: MapLocation): Event[] => {
    return events.filter(evt => {
      const eventLocationLower = evt.location.toLowerCase();
      return loc.matches.some(m => eventLocationLower.includes(m));
    });
  };

  const handleEventClick = (eventId: string) => {
    setSelectedEventId(eventId);
    setCurrentPage('event-details');
  };

  return (
    <div className="bg-[#111111] border border-white/5 rounded-3xl p-5 relative overflow-hidden select-none">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-display font-bold text-sm text-white">Campus Map</h3>
          <p className="text-[10px] text-[#B8B8B8] font-medium mt-0.5">Explore active events by location</p>
        </div>
        <span className="flex h-2 w-2 relative">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7A1A]/40 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7A1A]"></span>
        </span>
      </div>

      {/* SVG Vector Blueprint Map */}
      <div className="relative aspect-[4/3] w-full rounded-2xl bg-[#090909] border border-white/5 overflow-hidden">
        {/* Grid Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,122,26,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,122,26,0.02)_1px,transparent_1px)] bg-[size:16px_16px] pointer-events-none" />

        {/* Blueprint Paths & Rivers */}
        <svg className="absolute inset-0 w-full h-full text-white/5" xmlns="http://www.w3.org/2000/svg">
          {/* River / Lake */}
          <path d="M -10,220 C 100,180 180,240 300,190 C 380,150 420,100 520,80" fill="none" stroke="rgba(255,122,26,0.04)" strokeWidth="24" strokeLinecap="round" />
          
          {/* Main Ring Road Path */}
          <rect x="15%" y="20%" width="70%" height="60%" rx="36" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="3,3" />
          
          {/* Diagonal walking paths */}
          <line x1="15%" y1="20%" x2="85%" y2="80%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />
          <line x1="85%" y1="20%" x2="15%" y2="80%" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2,4" />

          {/* Stylized Buildings */}
          {/* Auditorium */}
          <rect x="16%" y="22%" width="12%" height="16%" rx="6" fill="#111111" stroke="currentColor" strokeWidth="1" />
          {/* Library */}
          <rect x="58%" y="18%" width="14%" height="18%" rx="8" fill="#111111" stroke="currentColor" strokeWidth="1" />
          {/* Student Center */}
          <circle cx="35%" cy="58%" r="7%" fill="#111111" stroke="currentColor" strokeWidth="1" />
          {/* Dining */}
          <polygon points="45,30 55,30 52,44 48,44" transform="scale(3.5)" fill="#111111" stroke="currentColor" strokeWidth="0.25" />
          {/* Sports Complex */}
          <rect x="72%" y="60%" width="14%" height="16%" rx="12" fill="#111111" stroke="currentColor" strokeWidth="1" />
        </svg>

        {/* User Location Pulse Pin */}
        <div className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 z-20 select-none pointer-events-none" title="Your Location">
          <span className="flex h-3.5 w-3.5 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75"></span>
            <span className="animate-pulse absolute -inset-1.5 rounded-full bg-[#FF7A1A]/30"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-gradient-to-r from-[#FF7A1A] to-[#E56717] border-2 border-white shadow-lg shadow-[#FF7A1A]/40"></span>
          </span>
        </div>

        {/* Location Pins */}
        {locations.map((loc) => {
          const locEvents = getEventsForPin(loc);
          const hasEvents = locEvents.length > 0;
          const isHovered = hoveredLocation === loc.id;

          return (
            <div
              key={loc.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
              style={{ left: loc.x, top: loc.y }}
              onMouseEnter={() => setHoveredLocation(loc.id)}
              onMouseLeave={() => setHoveredLocation(null)}
            >
              {/* Pin Glowing Aura */}
              <div className={`absolute -inset-2.5 rounded-full transition-all duration-300 ${
                hasEvents 
                  ? 'bg-[#FF7A1A]/10 scale-100 group-hover:scale-120 animate-pulse' 
                  : 'bg-white/5'
              }`} />

              {/* Pin Icon */}
              <div className={`p-1.5 rounded-full border transition-all duration-300 ${
                isHovered
                  ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white scale-110 shadow-lg shadow-[#FF7A1A]/30'
                  : hasEvents
                    ? 'bg-[#111111] border-[#FF7A1A]/50 text-[#FF7A1A]'
                    : 'bg-[#111111] border-white/10 text-[#B8B8B8]'
              }`}>
                <MapPin className="w-3.5 h-3.5" />
              </div>

              {/* Live Event Count Tag */}
              {hasEvents && !isHovered && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#FF7A1A] text-white text-[8px] font-black w-3.5 h-3.5 flex items-center justify-center rounded-full border border-[#111111]">
                  {locEvents.length}
                </span>
              )}

              {/* Tooltip Overlay */}
              {isHovered && (
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 p-3 rounded-2xl bg-[#161616]/95 border border-white/10 shadow-2xl backdrop-blur-md pointer-events-auto z-20 text-left">
                  <h4 className="text-xs font-bold text-white font-display truncate">{loc.name}</h4>
                  <p className="text-[9px] text-[#B8B8B8] mt-0.5 leading-tight">{loc.description}</p>
                  
                  <div className="mt-2.5 pt-2 border-t border-white/5 space-y-1.5 max-h-36 overflow-y-auto custom-scrollbar">
                    {hasEvents ? (
                      locEvents.map((evt) => (
                        <div
                          key={evt.id}
                          onClick={() => handleEventClick(evt.id)}
                          className="flex items-start space-x-1.5 p-1 rounded-lg hover:bg-white/5 cursor-pointer group/item transition-colors"
                        >
                          <Calendar className="w-2.5 h-2.5 text-[#FF7A1A] mt-0.5 flex-shrink-0" />
                          <div className="min-w-0">
                            <p className="text-[10px] font-bold text-white group-hover/item:text-[#FF7A1A] transition-colors truncate">
                              {evt.title}
                            </p>
                            <p className="text-[8px] text-[#B8B8B8] truncate">{evt.time}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[9px] text-[#B8B8B8]/50 italic">No events scheduled here</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CampusMap;

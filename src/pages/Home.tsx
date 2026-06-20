import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import ShareMoments from '../components/ShareMoments';
import CampusMap from '../components/CampusMap';
import Button from '../components/Button';
import { Calendar, MapPin, Heart, Users, Sparkles, MessageSquare, Bell } from 'lucide-react';

export const Home: React.FC = () => {
  const { 
    events, 
    communities, 
    opportunities, 
    profile, 
    rsvpEvent, 
    saveEvent, 
    setSelectedEventId, 
    setSelectedCommunityId, 
    setCurrentPage, 
    saveOpportunity
  } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Featured Event Hero (Homecoming 2026)
  const featuredEvent = events.find(e => e.id === 'evt-homecoming') || events[0];

  // 2. Happening This Week (STEM Expo, Basketball Tournament, Open Mic Night)
  const happeningThisWeek = events.filter(e => ['evt-stem-expo', 'evt-bball', 'evt-open-mic'].includes(e.id));

  // 3. Recommended For You (Career Fair 2026, Workshop: AI Basics, Black Excellence Gala)
  const recommendedForYou = events.filter(e => ['evt-career-mixer', 'evt-ai-basics', 'evt-gala'].includes(e.id));

  const filteredRecommended = recommendedForYou.filter(e => 
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.organizer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const isHeroSaved = profile.savedEventIds.includes(featuredEvent.id);
  const isHeroRsvped = profile.rsvpEventIds.includes(featuredEvent.id);

  const handleHeroClick = () => {
    setSelectedEventId(featuredEvent.id);
    setCurrentPage('event-details');
  };

  return (
    <div className="fade-in max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 select-none pb-24 space-y-10">
      
      {/* ==================== TOP HEADER BAR ==================== */}
      <header className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-white/5 pb-6">
        <div className="flex-1 max-w-2xl">
          <SearchBar 
            value={searchQuery} 
            onChange={setSearchQuery} 
            placeholder="Search events, organizations, opportunities..." 
          />
        </div>
        <div className="flex items-center space-x-5 justify-end">
          <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#B8B8B8] hover:text-white transition-all cursor-pointer border border-white/5">
            <MessageSquare className="w-5 h-5" />
          </button>
          <button className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 text-[#B8B8B8] hover:text-white transition-all cursor-pointer border border-white/5 relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-[#FF7A1A] shadow-md shadow-[#FF7A1A]/50 animate-pulse"></span>
          </button>
          <div 
            onClick={() => setCurrentPage('profile')} 
            className="w-10 h-10 rounded-full border border-white/10 hover:border-[#FF7A1A]/40 cursor-pointer transition-all overflow-hidden flex-shrink-0"
          >
            <img src={profile.avatar} alt={profile.name} className="w-full h-full object-cover" />
          </div>
        </div>
      </header>

      {/* ==================== GRID ROW 1 (split 8/4 grid) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Row 1 Left: Featured Event Hero & Social feed */}
        <div className="lg:col-span-8 space-y-8">
          <section className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display">Featured Experience</h3>
            </div>
            
            {/* Cinematic Hero Card */}
            <div className="group relative w-full h-[500px] rounded-[2rem] bg-[#111111] overflow-hidden border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-300">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/40 to-transparent" />
              
              {/* Top actions */}
              <div className="absolute top-6 left-6 right-6 flex justify-between items-center z-10">
                <span className="inline-flex items-center px-4 py-1.5 bg-[#8B5CF6]/90 border border-[#A78BFA]/20 text-[10px] font-black text-white rounded-full uppercase tracking-wider font-display shadow-lg shadow-purple-500/25">
                  <span>★ Featured Event</span>
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    saveEvent(featuredEvent.id);
                  }}
                  className={`p-3 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                    isHeroSaved
                      ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white'
                      : 'bg-black/45 border-white/10 text-white hover:bg-black/60 hover:scale-105'
                  }`}
                  title={isHeroSaved ? 'Saved' : 'Save Event'}
                >
                  <Heart className={`w-4.5 h-4.5 ${isHeroSaved ? 'fill-white' : ''}`} />
                </button>
              </div>

              {/* Bottom Details */}
              <div className="absolute bottom-0 inset-x-0 p-8 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left">
                <div className="space-y-4 max-w-xl">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 px-3.5 py-1.5 rounded-xl bg-white text-black font-display font-extrabold text-xs select-none tracking-wider text-center">
                      MAY 24
                    </div>
                    <div className="flex flex-col text-xs text-[#B8B8B8] font-semibold space-y-0.5">
                      <span className="flex items-center text-white">
                        <Calendar className="w-3.5 h-3.5 text-[#FF7A1A] mr-1.5 flex-shrink-0" />
                        Sat, May 24 · 7:00 PM
                      </span>
                      <span className="flex items-center">
                        <MapPin className="w-3.5 h-3.5 text-[#B8B8B8] mr-1.5 flex-shrink-0" />
                        Main Stadium
                      </span>
                    </div>
                  </div>

                  <h2 
                    onClick={handleHeroClick}
                    className="text-3xl sm:text-4xl font-extrabold font-display text-white tracking-tight cursor-pointer hover:text-[#FF7A1A] transition-colors leading-tight line-clamp-1"
                  >
                    {featuredEvent.title}
                  </h2>

                  <p className="text-xs sm:text-sm text-[#B8B8B8] line-clamp-2 leading-relaxed font-sans">
                    {featuredEvent.description}
                  </p>

                  <div className="flex items-center space-x-3.5">
                    <div className="flex -space-x-2.5 overflow-hidden">
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-[#111] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-[#111] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-[#111] object-cover" src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80" alt="Student" />
                      <img className="inline-block h-6.5 w-6.5 rounded-full ring-2 ring-[#111] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80" alt="Student" />
                    </div>
                    <span className="text-xs text-[#B8B8B8] font-semibold">
                      <span className="text-white font-bold">{featuredEvent.attendeeCount} going</span>
                    </span>
                  </div>
                </div>

                <div className="flex-shrink-0 flex items-center space-x-3">
                  <button
                    onClick={() => rsvpEvent(featuredEvent.id)}
                    className={`py-3 px-6 rounded-full font-bold text-xs cursor-pointer shadow-lg transition-all active:scale-[0.98] ${
                      isHeroRsvped
                        ? 'bg-[#FF7A1A] text-white hover:opacity-95 shadow-[#FF7A1A]/10'
                        : 'bg-white text-black hover:bg-neutral-100 shadow-white/5'
                    }`}
                  >
                    {isHeroRsvped ? "I'm Going ✓" : "I'm Going"}
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Social Moments Feed */}
          <ShareMoments />
        </div>

        {/* Row 1 Right: Happening This Week */}
        <div className="lg:col-span-4 text-left">
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display pl-1 border-l-2 border-[#FF7A1A]">
              Happening This Week
            </h3>
            
            <div className="space-y-3.5">
              {happeningThisWeek.map((evt) => {
                const isSaved = profile.savedEventIds.includes(evt.id);
                const parts = evt.date.split(' ');
                const month = (parts[1] || 'MAY').toUpperCase();
                const day = (parts[2] || '21').replace(',', '');

                return (
                  <div
                    key={evt.id}
                    onClick={() => {
                      setSelectedEventId(evt.id);
                      setCurrentPage('event-details');
                    }}
                    className="group bg-[#111111] rounded-2xl p-3 border border-white/5 hover:border-white/10 hover:shadow-md hover:shadow-[#FF7A1A]/2 transition-all duration-200 flex items-center space-x-3.5 cursor-pointer"
                  >
                    {/* Date Badge */}
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-white/5 border border-white/5 flex flex-col items-center justify-center font-display leading-tight select-none">
                      <span className="text-[9px] font-black text-[#FF7A1A]">{month}</span>
                      <span className="text-sm font-extrabold text-white">{day}</span>
                    </div>

                    {/* Thumbnail */}
                    <img
                      src={evt.image}
                      alt={evt.title}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />

                    {/* Meta */}
                    <div className="min-w-0 flex-1">
                      <h4 className="text-xs font-bold text-white group-hover:text-[#FF7A1A] transition-colors truncate font-display">
                        {evt.title}
                      </h4>
                      <p className="text-[10px] text-[#B8B8B8]/60 mt-0.5 truncate">{evt.time}</p>
                      <p className="text-[9px] text-[#B8B8B8] font-semibold mt-0.5 truncate flex items-center">
                        <MapPin className="w-2.5 h-2.5 text-[#FF7A1A] mr-1 flex-shrink-0" />
                        {evt.location}
                      </p>
                    </div>

                    {/* Save Action */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveEvent(evt.id);
                      }}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isSaved ? 'text-[#FF7A1A]' : 'text-[#B8B8B8]/40 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#FF7A1A]' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      {/* ==================== GRID ROW 2 (split 8/4 grid) ==================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pt-4">
        
        {/* Row 2 Left: Recommended & Opportunities */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Recommended For You Section */}
          <section className="space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
                <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display">
                  Recommended For You
                </h3>
              </div>
              {searchQuery && (
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/60 font-display">
                  {filteredRecommended.length} Results
                </span>
              )}
            </div>

            {filteredRecommended.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                {filteredRecommended.map((evt) => {
                  const isSaved = profile.savedEventIds.includes(evt.id);
                  return (
                    <div
                      key={evt.id}
                      onClick={() => {
                        setSelectedEventId(evt.id);
                        setCurrentPage('event-details');
                      }}
                      className="group bg-[#111111] rounded-2xl border border-white/5 hover:border-white/10 transition-all overflow-hidden flex flex-col justify-between cursor-pointer shadow-sm"
                    >
                      <div>
                        <div className="aspect-[16/10] w-full relative overflow-hidden bg-white/5">
                          <img
                            src={evt.image}
                            alt={evt.title}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              saveEvent(evt.id);
                            }}
                            className="absolute top-3 right-3 p-2 rounded-full bg-black/50 hover:bg-black/75 text-white backdrop-blur-sm transition-all"
                          >
                            <Heart className={`w-3.5 h-3.5 ${isSaved ? 'fill-[#FF7A1A] text-[#FF7A1A]' : 'text-white'}`} />
                          </button>
                        </div>
                        <div className="p-4.5 space-y-2">
                          <h4 className="text-xs font-bold text-white group-hover:text-[#FF7A1A] transition-colors truncate font-display">
                            {evt.title}
                          </h4>
                          <p className="text-[10px] text-[#B8B8B8]/60 mt-0.5 truncate">{evt.time}</p>
                          <p className="text-[9px] text-[#B8B8B8] font-semibold mt-0.5 truncate flex items-center">
                            <MapPin className="w-2.5 h-2.5 text-[#FF7A1A] mr-1 flex-shrink-0" />
                            {evt.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="text-center py-8 bg-[#111111] border border-white/5 rounded-3xl space-y-3 max-w-sm mx-auto">
                <p className="text-xs text-[#B8B8B8] italic">No matching recommended events found.</p>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                  Clear Search
                </Button>
              </div>
            )}
          </section>

          {/* Opportunities For You Section */}
          <section className="space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display">
                Opportunities For You
              </h3>
              <button
                onClick={() => setCurrentPage('opportunities')}
                className="text-[9px] font-black text-[#FF7A1A] uppercase tracking-wider hover:underline cursor-pointer"
              >
                Browse Opportunity Hub
              </button>
            </div>

            <div className="space-y-3">
              {opportunities.slice(0, 3).map((opp) => {
                const isSaved = profile.savedOpportunityIds.includes(opp.id);
                return (
                  <div
                    key={opp.id}
                    onClick={() => {
                      setCurrentPage('opportunities');
                    }}
                    className="bg-[#111111] p-4 rounded-2xl border border-white/5 hover:border-[#FF7A1A]/10 transition-all flex items-center justify-between cursor-pointer shadow-sm group"
                  >
                    <div className="flex items-center space-x-4 min-w-0">
                      {opp.thumbnail && (
                        <img
                          src={opp.thumbnail}
                          alt={opp.title}
                          className="w-12 h-12 rounded-xl object-cover flex-shrink-0 border border-white/5"
                        />
                      )}
                      <div className="min-w-0 text-left">
                        <div className="flex items-center space-x-2">
                          <span className="bg-[#FF7A1A]/10 text-[#FF7A1A] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-display border border-[#FF7A1A]/15 select-none">
                            {opp.category || opp.type}
                          </span>
                          <span className="text-[9px] text-[#B8B8B8]/40 font-medium">Deadline: {opp.deadline}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-display group-hover:text-[#FF7A1A] transition-colors truncate mt-1.5">
                          {opp.title}
                        </h4>
                        <p className="text-xs text-[#B8B8B8]/60 mt-0.5 truncate font-medium">
                          {opp.organizer} • <span className="text-[#FF7A1A] font-semibold">{opp.reward}</span>
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        saveOpportunity(opp.id);
                      }}
                      className={`p-2.5 rounded-full transition-colors hover:bg-white/5 cursor-pointer ${
                        isSaved ? 'text-[#FF7A1A]' : 'text-[#B8B8B8]/40 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-[#FF7A1A]' : ''}`} />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

        </div>

        {/* Row 2 Right: Organizations You Follow & Campus Map */}
        <div className="lg:col-span-4 space-y-10 text-left">
          
          {/* Organizations You Follow Section */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display pl-1 border-l-2 border-[#FF7A1A]">
              Organizations You Follow
            </h3>

            <div className="space-y-3">
              {communities.slice(0, 4).map((comm) => {
                return (
                  <div
                    key={comm.id}
                    onClick={() => {
                      setSelectedCommunityId(comm.id);
                      setCurrentPage('community-profile');
                    }}
                    className="group bg-[#111111] p-3.5 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between cursor-pointer shadow-sm"
                  >
                    <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-xl bg-white/5 flex items-center justify-center border border-white/5 flex-shrink-0 text-white">
                        <Users className="w-4 h-4 text-[#FF7A1A]" />
                      </div>
                      <div className="min-w-0 text-left">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#FF7A1A] transition-colors truncate font-display">
                          {comm.name}
                        </h4>
                        <p className="text-[9px] text-[#B8B8B8] mt-0.5">{comm.memberCount} members</p>
                      </div>
                    </div>

                    {/* Wide cover image on the right */}
                    <div className="w-14 h-9 rounded-lg overflow-hidden border border-white/5 flex-shrink-0 ml-3 bg-white/5">
                      <img
                        src={comm.image}
                        alt={comm.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                );
              })}
            </div>

            <button
              onClick={() => setCurrentPage('communities')}
              className="w-full py-2.5 rounded-xl border border-white/5 hover:border-white/10 hover:bg-white/5 text-[10px] font-bold text-white uppercase tracking-wider text-center cursor-pointer transition-all"
            >
              Explore All Organizations
            </button>
          </section>

          {/* Campus Map Component */}
          <CampusMap />

        </div>

      </div>
    </div>
  );
};

export default Home;

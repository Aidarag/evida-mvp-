import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import SearchBar from '../components/SearchBar';
import ShareMoments from '../components/ShareMoments';
import CampusMap from '../components/CampusMap';
import Button from '../components/Button';
import { Calendar, MapPin, Heart, Users, Sparkles, Plus } from 'lucide-react';

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
    toggleFollowCommunity, 
    setCurrentPage, 
    setCreateModalOpen 
  } = useApp();
  const [searchQuery, setSearchQuery] = useState('');

  // 1. Featured Event Hero (Homecoming Concert)
  const featuredEvent = events.find(e => e.id === 'evt-homecoming') || events[0];

  // 2. Happening This Week (Vertical stack, e.g. STEM expo, Bball, Open mic)
  const happeningThisWeek = events.filter(e => e.id !== 'evt-homecoming').slice(0, 4);

  // 3. Recommended Events (Filtered by search query)
  const filteredRecommended = events
    .filter(e => e.id !== featuredEvent.id)
    .filter(e => 
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
    <div className="fade-in max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-8 select-none pb-24">
      {/* Three-Column Frame split (Center + Right, Left is fixed sidebar in App.tsx) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* ==================== CENTER COLUMN: Primary Content ==================== */}
        <div className="lg:col-span-8 space-y-10">
          
          {/* Top Search Bar */}
          <div className="w-full">
            <SearchBar 
              value={searchQuery} 
              onChange={setSearchQuery} 
              placeholder="Search events, organizations, people, opportunities..." 
            />
          </div>

          {/* Featured Event Hero Section */}
          <section className="space-y-4">
            <div className="flex items-center space-x-2">
              <Sparkles className="w-4 h-4 text-[#FF7A1A]" />
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display">Featured Experience</h3>
            </div>
            
            {/* Cinematic Hero Card */}
            <div className="group relative w-full aspect-[21/9] rounded-[2.5rem] bg-[#111111] overflow-hidden border border-white/5 hover:border-white/10 shadow-2xl transition-all duration-300">
              <img
                src={featuredEvent.image}
                alt={featuredEvent.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-102"
              />
              {/* Immersive overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/95 via-[#080808]/40 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#080808]/80 via-transparent to-transparent hidden md:block" />

              {/* Overlay Details */}
              <div className="absolute inset-0 p-6 sm:p-8 flex flex-col justify-end text-left">
                <div className="max-w-2xl space-y-3">
                  {/* Badge */}
                  <span className="self-start inline-flex items-center space-x-1.5 px-3 py-1 bg-[#FF7A1A] text-[9px] font-black text-white rounded-full uppercase tracking-wider font-display shadow-md shadow-[#FF7A1A]/20">
                    <span>★ Featured Event</span>
                  </span>

                  {/* Title */}
                  <h2 
                    onClick={handleHeroClick}
                    className="text-2xl sm:text-4xl font-extrabold font-display text-white tracking-tight cursor-pointer hover:text-[#FF7A1A] transition-colors leading-tight line-clamp-1"
                  >
                    {featuredEvent.title}
                  </h2>

                  {/* Short Description */}
                  <p className="text-xs sm:text-sm text-[#B8B8B8] line-clamp-2 leading-relaxed font-sans">
                    {featuredEvent.description}
                  </p>

                  {/* Meta (Date, Location, Count) */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-white/90 pt-1 font-semibold">
                    <span className="flex items-center">
                      <Calendar className="w-3.5 h-3.5 text-[#FF7A1A] mr-1.5 flex-shrink-0" />
                      {featuredEvent.date}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] mr-1.5 flex-shrink-0" />
                      {featuredEvent.location}
                    </span>
                    <span className="flex items-center bg-white/10 px-2 py-0.5 rounded-full border border-white/10">
                      <Users className="w-3.5 h-3.5 text-[#FF7A1A] mr-1.5 flex-shrink-0" />
                      {featuredEvent.attendeeCount} going
                    </span>
                  </div>

                  {/* CTAs */}
                  <div className="flex flex-wrap items-center gap-3 pt-3">
                    <Button
                      variant={isHeroRsvped ? 'secondary' : 'primary'}
                      size="md"
                      onClick={() => rsvpEvent(featuredEvent.id)}
                      className="font-bold text-xs"
                    >
                      {isHeroRsvped ? 'Going ✓' : 'Join Event'}
                    </Button>
                    <button
                      onClick={() => saveEvent(featuredEvent.id)}
                      className={`p-2.5 rounded-full border backdrop-blur-md transition-all cursor-pointer ${
                        isHeroSaved
                          ? 'bg-[#FF7A1A] border-[#FF7A1A] text-white'
                          : 'bg-black/45 border-white/10 text-white hover:bg-black/60 hover:scale-105'
                      }`}
                      title={isHeroSaved ? 'Saved' : 'Save Event'}
                    >
                      <Heart className={`w-4 h-4 ${isHeroSaved ? 'fill-white' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Social Share Moments feed */}
          <ShareMoments />

          {/* Dedicated Gradient Banner for Creating Events */}
          <section className="bg-gradient-to-r from-[#FF7A1A] to-[#E56717] rounded-[2.5rem] p-8 relative overflow-hidden shadow-xl shadow-[#FF7A1A]/10 text-left">
            {/* Glowing circle vector */}
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-black/10 rounded-full blur-2xl" />
            
            <div className="max-w-xl space-y-4 relative z-10">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">Hosting something?</h3>
              <p className="text-xs sm:text-sm text-white/90 leading-relaxed max-w-md">
                Bring your clubs together, manage guests, or organize a study lounge session. Create an event in seconds.
              </p>
              <Button
                variant="primary"
                size="md"
                onClick={() => setCreateModalOpen(true)}
                className="bg-white text-[#FF7A1A] hover:bg-white/95 shadow-lg border border-transparent font-bold"
                style={{ background: '#FFFFFF', color: '#FF7A1A' }}
              >
                <Plus className="w-4 h-4 mr-1.5 stroke-[3px]" />
                <span>Create Event</span>
              </Button>
            </div>
          </section>

          {/* Recommended Events Grid */}
          <section className="space-y-6">
            <div className="flex justify-between items-center border-b border-white/5 pb-3">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-[#FF7A1A]" />
                <h2 className="text-xl sm:text-2xl font-bold font-display text-white">Recommended Events</h2>
              </div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/60 font-display">
                {filteredRecommended.length} Event{filteredRecommended.length !== 1 ? 's' : ''} Found
              </span>
            </div>

            {filteredRecommended.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRecommended.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16 bg-[#111111] border border-white/5 rounded-3xl space-y-4 max-w-md mx-auto">
                <p className="text-sm text-[#B8B8B8] italic">No matching campus events found.</p>
                <Button variant="outline" size="sm" onClick={() => setSearchQuery('')}>
                  Clear Search Filters
                </Button>
              </div>
            )}
          </section>

        </div>

        {/* ==================== RIGHT COLUMN: Supplementary Content ==================== */}
        <div className="lg:col-span-4 space-y-8 text-left">

          {/* Happening This Week Stack */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display pl-1 border-l-2 border-[#FF7A1A]">
              Happening This Week
            </h3>
            
            <div className="space-y-3.5">
              {happeningThisWeek.map((evt) => {
                const isSaved = profile.savedEventIds.includes(evt.id);
                // Parse date for badge (e.g. "Oct 14, 2026" -> "OCT 14")
                const parts = evt.date.split(' ');
                const month = parts[0]?.toUpperCase() || 'OCT';
                const day = parts[1]?.replace(',', '') || '12';

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

          {/* Interactive dark blueprint campus map */}
          <CampusMap />

          {/* Student Organizations Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center pl-1 border-l-2 border-[#FF7A1A]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display">
                Active Student Circles
              </h3>
              <button
                onClick={() => setCurrentPage('communities')}
                className="text-[9px] font-black text-[#FF7A1A] uppercase tracking-wider hover:underline cursor-pointer"
              >
                See All
              </button>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {communities.slice(0, 3).map((comm) => {
                const isFollowing = profile.followedCommunityIds.includes(comm.id);
                return (
                  <div
                    key={comm.id}
                    onClick={() => {
                      setSelectedCommunityId(comm.id);
                      setCurrentPage('community-profile');
                    }}
                    className="group bg-[#111111] p-3 rounded-2xl border border-white/5 hover:border-white/10 transition-colors flex items-center justify-between cursor-pointer"
                  >
                    <div className="flex items-center space-x-3 min-w-0">
                      <img
                        src={comm.image}
                        alt={comm.name}
                        className="w-10 h-10 rounded-xl object-cover flex-shrink-0 border border-white/5"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-white group-hover:text-[#FF7A1A] transition-colors truncate font-display">
                          {comm.name}
                        </h4>
                        <p className="text-[9px] text-[#B8B8B8] mt-0.5">{comm.memberCount} members</p>
                      </div>
                    </div>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFollowCommunity(comm.id);
                      }}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold font-display cursor-pointer transition-colors ${
                        isFollowing
                          ? 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20'
                          : 'bg-white/5 hover:bg-white/10 text-white border border-transparent'
                      }`}
                    >
                      {isFollowing ? 'Joined' : 'Join'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>

          {/* Compact Opportunities Section */}
          <section className="space-y-4">
            <div className="flex justify-between items-center pl-1 border-l-2 border-[#FF7A1A]">
              <h3 className="text-xs font-bold uppercase tracking-widest text-[#B8B8B8] font-display">
                Compact Opportunities
              </h3>
              <button
                onClick={() => setCurrentPage('opportunities')}
                className="text-[9px] font-black text-[#FF7A1A] uppercase tracking-wider hover:underline cursor-pointer"
              >
                Browse Hub
              </button>
            </div>

            <div className="space-y-2.5">
              {opportunities.slice(0, 3).map((opp) => (
                <div
                  key={opp.id}
                  onClick={() => {
                    setCurrentPage('opportunities');
                  }}
                  className="bg-[#111111] p-3.5 rounded-xl border border-white/5 hover:border-white/10 transition-colors text-left flex flex-col justify-between cursor-pointer space-y-1"
                >
                  <div className="flex justify-between items-start">
                    <span className="bg-[#FF7A1A]/10 text-[#FF7A1A] text-[8px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider font-display">
                      {opp.type}
                    </span>
                    <span className="text-[9px] text-[#B8B8B8]/50">Deadline: {opp.deadline}</span>
                  </div>
                  <h4 className="text-xs font-bold text-white font-display truncate pt-0.5">
                    {opp.title}
                  </h4>
                  <p className="text-[10px] text-[#B8B8B8] font-medium truncate">
                    {opp.organizer} • <span className="text-[#FF7A1A] font-semibold">{opp.reward}</span>
                  </p>
                </div>
              ))}
            </div>
          </section>

        </div>

      </div>
    </div>
  );
};

export default Home;

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Bell, Calendar, Users, Briefcase, ArrowRight, 
  Plus, TrendingUp, Compass, UserCheck, Check 
} from 'lucide-react';
import EventCard from '../components/EventCard';

export const Home: React.FC = () => {
  const { 
    profile, 
    events, 
    communities, 
    opportunities, 
    setCurrentPage, 
    setExploreActiveTab,
    setSelectedEventId,
    setSelectedCommunityId,
    setSelectedOpportunityId
  } = useApp();

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2500);
  };

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentPage('event-details');
  };

  const handleClubClick = (id: string) => {
    setSelectedCommunityId(id);
    setCurrentPage('community-profile');
  };

  const handleOppClick = (id: string) => {
    setSelectedOpportunityId(id);
    setCurrentPage('opportunity-details');
  };

  // Section Filters
  const trendingEvents = events.filter(evt => evt.attendeeCount >= 100);
  const thisWeekEvents = events.slice(0, 4); // chronological mockup
  const recruitingOrgs = communities.slice(0, 3);
  const featuredOpps = opportunities.slice(0, 2);
  const popularEvents = events.filter(evt => evt.location.includes('Center') || evt.location.includes('Stadium'));
  
  // Custom mock friends list for "Friends Attending" section
  const mockFriends = [
    { name: 'Marcus', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80' },
    { name: 'Sarah', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80' },
    { name: 'Tariq', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80' },
    { name: 'Maya', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 fade-in pb-24 text-left select-none bg-transparent">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-5 py-3 rounded-full dark-glass-card border border-[#FE7F42]/30 flex items-center gap-2.5 shadow-xl animate-bounce">
          <div className="w-5 h-5 rounded-full bg-[#FE7F42] flex items-center justify-center text-white">
            <Check className="w-3 h-3 stroke-[3px]" />
          </div>
          <span className="text-[11px] font-bold text-white tracking-wide">{toastMessage}</span>
        </div>
      )}

      {/* Header Dashboard Welcome */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-[10px] font-black uppercase tracking-widest text-[#FE7F42]">Campus Hub</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1 font-sans">
            Hey, {profile.name.split(' ')[0]}
          </h1>
          <p className="text-xs text-white/60 mt-1">Here is what is happening around you at {profile.university}.</p>
        </div>

        {/* Quick controls */}
        <div className="flex items-center gap-2">
          <button 
            onClick={() => triggerToast('No new notifications!')}
            className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white flex items-center justify-center cursor-pointer transition-colors relative"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FE7F42] animate-ping" />
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#FE7F42]" />
          </button>
          
          <button 
            onClick={() => setCurrentPage('create-event')}
            className="px-4 py-2 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-xs uppercase tracking-wide flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#FE7F42]/10 transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Create</span>
          </button>
        </div>
      </div>

      {/* 1. TRENDING EVENTS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#FE7F42]" />
            <h2 className="text-lg font-bold uppercase tracking-wider text-white">Trending Events</h2>
          </div>
          <button 
            onClick={() => { setExploreActiveTab('events'); setCurrentPage('explore'); }}
            className="text-[11px] font-bold text-[#FE7F42] hover:underline uppercase"
          >
            See all
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingEvents.map(evt => (
            <EventCard key={`trend-${evt.id}`} event={evt} />
          ))}
        </div>
      </section>

      {/* Two Column Grid: Left chronological feed, Right clubs & opportunities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
        
        {/* LEFT COLUMN: THIS WEEK ON CAMPUS */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex justify-between items-center border-b border-white/5 pb-2">
            <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#FE7F42]" />
              <span>This Week</span>
            </h2>
            <span className="text-[10px] text-white/40 uppercase font-black">{thisWeekEvents.length} events</span>
          </div>

          <div className="space-y-4">
            {thisWeekEvents.map(evt => (
              <div 
                key={`week-${evt.id}`}
                onClick={() => handleEventClick(evt.id)}
                className="p-5 rounded-[24px] bg-[#1A1214] border border-white/5 hover:border-[#FE7F42]/20 transition-all flex flex-col sm:flex-row gap-4 items-start sm:items-center cursor-pointer text-left group"
              >
                <div className="w-full sm:w-28 h-20 rounded-xl overflow-hidden flex-shrink-0 bg-white/5">
                  <img src={evt.image} alt={evt.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-1.5 flex-grow min-w-0">
                  <span className="bg-[#FE7F42]/10 text-[#FE7F42] text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#FE7F42]/15">
                    {evt.category}
                  </span>
                  <h3 className="text-base font-bold text-white group-hover:text-[#FE7F42] transition-colors truncate">
                    {evt.title}
                  </h3>
                  <p className="text-xs text-white/60 truncate">{evt.date} • {evt.time} • {evt.location}</p>
                </div>
                <div className="flex items-center gap-1 text-[#FE7F42] text-xs font-bold shrink-0 self-end sm:self-center">
                  <span>RSVP</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT COLUMN: ORGANIZATIONS & OPPORTUNITIES */}
        <div className="space-y-10">
          
          {/* 3. ORGANIZATIONS (CLUBS) */}
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-[#FE7F42]" />
                <span>Organizations</span>
              </h2>
              <button 
                onClick={() => { setExploreActiveTab('communities'); setCurrentPage('explore'); }}
                className="text-[10px] font-bold text-[#FE7F42] uppercase hover:underline"
              >
                Explore
              </button>
            </div>

            <div className="space-y-3">
              {recruitingOrgs.map(org => (
                <div 
                  key={`org-${org.id}`}
                  onClick={() => handleClubClick(org.id)}
                  className="p-4 rounded-2xl bg-[#1A1214] border border-white/5 hover:border-[#FE7F42]/20 transition-all flex items-center justify-between gap-3 cursor-pointer group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-10 h-10 rounded-xl overflow-hidden bg-white/5 shrink-0">
                      <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-white group-hover:text-[#FE7F42] transition-colors truncate">{org.name}</h4>
                      <p className="text-[10px] text-white/50 truncate">{org.memberCount} members</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold text-[#FE7F42] uppercase border border-[#FE7F42]/20 rounded-full px-2 py-0.5 hover:bg-[#FE7F42]/10 transition-colors">Join</span>
                </div>
              ))}
            </div>
          </div>

          {/* 4. OPPORTUNITIES */}
          <div className="space-y-4 text-left">
            <div className="flex justify-between items-center border-b border-white/5 pb-2">
              <h2 className="text-base font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-[#FE7F42]" />
                <span>Opportunities</span>
              </h2>
              <button 
                onClick={() => { setExploreActiveTab('opportunities'); setCurrentPage('explore'); }}
                className="text-[10px] font-bold text-[#FE7F42] uppercase hover:underline"
              >
                More
              </button>
            </div>

            <div className="space-y-3">
              {featuredOpps.map(opp => (
                <div 
                  key={`opp-${opp.id}`}
                  onClick={() => handleOppClick(opp.id)}
                  className="p-4.5 rounded-2xl bg-[#1A1214] border border-white/5 hover:border-[#FE7F42]/20 transition-all cursor-pointer text-left group space-y-1.5"
                >
                  <span className="text-[9px] font-black uppercase text-[#FE7F42] bg-[#FE7F42]/10 border border-[#FE7F42]/20 rounded px-1.5 py-0.5">
                    {opp.type}
                  </span>
                  <h4 className="text-sm font-bold text-white group-hover:text-[#FE7F42] transition-colors line-clamp-1">{opp.title}</h4>
                  <p className="text-[11px] text-white/60 line-clamp-1">{opp.organizer}</p>
                  <p className="text-[10px] text-[#FE7F42] font-semibold">Stipend: {opp.reward}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* 5. POPULAR NEAR YOU */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-[#FE7F42]" />
            <span>Popular Near You</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {popularEvents.slice(0, 3).map(evt => (
            <EventCard key={`pop-${evt.id}`} event={evt} />
          ))}
        </div>
      </section>

      {/* 6. FRIENDS ATTENDING */}
      <section className="p-6 rounded-[2rem] bg-[#1A1214] border border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-4 text-left w-full md:w-auto">
          <div className="w-12 h-12 rounded-2xl bg-[#FE7F42]/10 border border-[#FE7F42]/20 flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6 text-[#FE7F42]" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Friends Attending</h3>
            <p className="text-xs text-white/60 mt-0.5">Connect and check out what events your classmates have RSVP'd to.</p>
          </div>
        </div>

        <div className="flex items-center justify-between gap-4 w-full md:w-auto self-stretch md:self-center">
          <div className="flex -space-x-3 overflow-hidden">
            {mockFriends.map((f, i) => (
              <img 
                key={i} 
                src={f.avatar} 
                alt={f.name} 
                className="w-10 h-10 rounded-full border-2 border-[#1A1214] object-cover bg-white/5 shrink-0" 
              />
            ))}
          </div>
          <button 
            onClick={() => triggerToast('Checking friend sync... All friends are synced!')}
            className="px-4 py-2 rounded-full border border-white/10 hover:bg-white/5 text-white font-bold text-xs uppercase tracking-wide cursor-pointer transition-colors"
          >
            Sync Contacts
          </button>
        </div>
      </section>

      {/* 7. UPCOMING EVENTS */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-bold uppercase tracking-wider text-white">Upcoming Events</h2>
          <button 
            onClick={() => { setExploreActiveTab('events'); setCurrentPage('explore'); }}
            className="text-[11px] font-bold text-[#FE7F42] hover:underline uppercase"
          >
            View explore board
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {events.slice(0, 4).map(evt => (
            <EventCard key={`upcoming-${evt.id}`} event={evt} />
          ))}
        </div>
      </section>

      {/* 8. CREATE EVENT CTA */}
      <section className="pt-4">
        <div className="p-8 rounded-[2rem] bg-gradient-to-r from-[#FE7F42]/10 to-transparent border border-[#FE7F42]/20 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative overflow-hidden">
          {/* Subtle Orange Glow Overlay */}
          <div className="absolute right-0 top-0 w-48 h-48 bg-[#FE7F42]/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="space-y-2">
            <h3 className="text-xl font-extrabold text-white">Hosting an activity or meeting?</h3>
            <p className="text-xs text-white/60 max-w-xl">
              Broadcast your student club gatherings, study lounges, or homecoming open mic events directly onto the campus square instantly.
            </p>
          </div>

          <button 
            onClick={() => setCurrentPage('create-event')}
            className="px-6 py-3.5 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer shadow-md shadow-[#FE7F42]/20 transition-all shrink-0 active:scale-95"
          >
            <span>Host Event Now</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5px]" />
          </button>
        </div>
      </section>

    </div>
  );
};

export default Home;

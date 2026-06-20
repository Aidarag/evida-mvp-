import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { Calendar, Users, Briefcase, X, DollarSign } from 'lucide-react';

export const Saved: React.FC = () => {
  const { profile, events, communities, opportunities, setCurrentPage, saveOpportunity, setSelectedOpportunityId } = useApp();
  const [activeTab, setActiveTab] = useState<'events' | 'clubs' | 'opportunities'>('events');

  const handleViewOpportunity = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setCurrentPage('opportunity-details');
  };

  const savedEvents = events.filter(evt => profile.savedEventIds.includes(evt.id));
  const followedClubs = communities.filter(comm => profile.followedCommunityIds.includes(comm.id));
  const savedOpportunities = opportunities.filter(opp => profile.savedOpportunityIds.includes(opp.id));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 fade-in pb-16 text-left select-none bg-transparent">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-display text-[#111111] uppercase tracking-tight">
          My Saved Square
        </h1>
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans font-medium">
          Keep track of upcoming events you like, active communities you joined, and internships or scholarships you bookmarked.
        </p>
      </div>

      {/* Tabs Menu Bar */}
      <div className="flex border-b border-gray-200/80 max-w-md mx-auto justify-center select-none">
        <button
          onClick={() => setActiveTab('events')}
          className={`flex-1 pb-3 text-center text-sm font-bold transition-all relative cursor-pointer ${
            activeTab === 'events' 
              ? 'text-[#FE7F42] font-extrabold' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center justify-center space-x-1.5">
            <Calendar className="w-4 h-4" />
            <span>Events ({savedEvents.length})</span>
          </span>
          {activeTab === 'events' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FE7F42] rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('clubs')}
          className={`flex-1 pb-3 text-center text-sm font-bold transition-all relative cursor-pointer ${
            activeTab === 'clubs' 
              ? 'text-[#FE7F42] font-extrabold' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center justify-center space-x-1.5">
            <Users className="w-4 h-4" />
            <span>Clubs ({followedClubs.length})</span>
          </span>
          {activeTab === 'clubs' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FE7F42] rounded-t-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('opportunities')}
          className={`flex-1 pb-3 text-center text-sm font-bold transition-all relative cursor-pointer ${
            activeTab === 'opportunities' 
              ? 'text-[#FE7F42] font-extrabold' 
              : 'text-gray-500 hover:text-gray-900'
          }`}
        >
          <span className="flex items-center justify-center space-x-1.5">
            <Briefcase className="w-4 h-4" />
            <span>Careers ({savedOpportunities.length})</span>
          </span>
          {activeTab === 'opportunities' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FE7F42] rounded-t-full" />
          )}
        </button>
      </div>

      {/* Tab Panels */}
      <div className="min-h-[300px]">
        
        {/* SAVED EVENTS */}
        {activeTab === 'events' && (
          savedEvents.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
              {savedEvents.map(event => (
                <EventCard key={`saved-evt-${event.id}`} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F7F8FA] rounded-3xl border border-gray-200/80 max-w-sm mx-auto space-y-4 shadow-sm">
              <Calendar className="w-8 h-8 text-[#FE7F42]/50 mx-auto" />
              <h3 className="font-bold text-base text-[#111111]">No saved events</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">Bookmark events from the explore board to keep them pinned here.</p>
              <Button variant="primary" size="sm" onClick={() => setCurrentPage('explore')}>Explore Events</Button>
            </div>
          )
        )}

        {/* JOINED CLUBS */}
        {activeTab === 'clubs' && (
          followedClubs.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {followedClubs.map(club => (
                <CommunityCard key={`saved-club-${club.id}`} community={club} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F7F8FA] rounded-3xl border border-gray-200/80 max-w-sm mx-auto space-y-4 shadow-sm">
              <Users className="w-8 h-8 text-[#FE7F42]/50 mx-auto" />
              <h3 className="font-bold text-base text-[#111111]">No joined communities</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">Find and join active student chapters and athletic clubs on campus.</p>
              <Button variant="primary" size="sm" onClick={() => setCurrentPage('communities')}>Browse Clubs</Button>
            </div>
          )
        )}

        {/* SAVED OPPORTUNITIES */}
        {activeTab === 'opportunities' && (
          savedOpportunities.length > 0 ? (
            <div className="space-y-3 max-w-4xl mx-auto">
              {savedOpportunities.map((opp) => (
                <div 
                  key={`saved-opp-${opp.id}`}
                  className="bg-[#F7F8FA] p-5 rounded-3xl border border-gray-200/80 shadow-sm hover:border-[#FE7F42]/30 transition-all flex justify-between items-center gap-4 text-left"
                >
                  <div>
                    <span className="bg-[#FE7F42]/10 text-[#FE7F42] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider select-none border border-[#FE7F42]/15">
                      {opp.type}
                    </span>
                    <h4 
                      onClick={() => handleViewOpportunity(opp.id)}
                      className="text-base font-bold text-[#111111] pt-1.5 cursor-pointer hover:text-[#FE7F42] transition-colors font-sans"
                    >
                      {opp.title}
                    </h4>
                    <p className="text-xs text-gray-600 font-semibold">{opp.organizer}</p>
                    <p className="text-[11px] text-[#FE7F42] font-bold pt-1 flex items-center">
                      <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#FE7F42] flex-shrink-0" />
                      <span>{opp.reward}</span>
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => saveOpportunity(opp.id)}
                      className="p-2 bg-white text-gray-500 hover:text-[#FE7F42] rounded-full hover:bg-[#FE7F42]/10 border border-gray-200 transition-colors cursor-pointer"
                      title="Remove bookmark"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewOpportunity(opp.id)}
                      className="text-xs py-1.5"
                    >
                      Apply
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 px-4 bg-[#F7F8FA] rounded-3xl border border-gray-200/80 max-w-sm mx-auto space-y-4 shadow-sm">
              <Briefcase className="w-8 h-8 text-[#FE7F42]/50 mx-auto" />
              <h3 className="font-bold text-base text-[#111111]">No saved opportunities</h3>
              <p className="text-xs text-gray-600 leading-relaxed font-sans">Bookmark research roles, tutor positions, and internships to follow up later.</p>
              <Button variant="primary" size="sm" onClick={() => setCurrentPage('opportunities')}>Explore Hub</Button>
            </div>
          )
        )}

      </div>

    </div>
  );
};

export default Saved;

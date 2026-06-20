import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { 
  CalendarRange, Sparkles, TrendingUp, CalendarDays, Code, Globe, 
  Heart, Briefcase, Activity, Palette, Sprout, Users, DollarSign, 
  Calendar, FileSpreadsheet, Sparkle, Award 
} from 'lucide-react';

export const Explore: React.FC = () => {
  const { 
    events, 
    communities, 
    opportunities, 
    profile, 
    saveOpportunity, 
    setSelectedCommunityId, 
    setSelectedOpportunityId, 
    setCurrentPage, 
    exploreActiveTab, 
    setExploreActiveTab 
  } = useApp();

  // ==================== STATES ====================
  // Events
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');

  // Communities
  const [commSearchQuery, setCommSearchQuery] = useState('');
  const [commSelectedCategory, setCommSelectedCategory] = useState('All');

  // Opportunities
  const [oppSearchQuery, setOppSearchQuery] = useState('');
  const [oppSelectedType, setOppSelectedType] = useState('All');

  // ==================== FILTER LOGIC ====================
  // Events
  const categoriesList = ['All', 'Social', 'Career', 'Sports', 'Culture', 'Academic', 'Wellness', 'Volunteer'];
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    let matchesDate = true;
    if (selectedDateFilter !== 'All') {
      const mockToday = new Date('2026-10-12');
      const eventDate = new Date(event.date);
      const diffTime = eventDate.getTime() - mockToday.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (selectedDateFilter === 'Today') {
        matchesDate = diffDays === 0;
      } else if (selectedDateFilter === 'This Week') {
        matchesDate = diffDays >= 0 && diffDays <= 6;
      } else if (selectedDateFilter === 'Next Week') {
        matchesDate = diffDays >= 7 && diffDays <= 13;
      }
    }
    return matchesSearch && matchesCategory && matchesDate;
  });
  const trendingEvents = events.filter(e => e.attendeeCount >= 100).slice(0, 3);

  // Communities
  const commCategoriesList = ['All', 'Tech', 'Culture', 'Academic', 'Business', 'Wellness', 'Creative'];
  const filteredCommunities = communities.filter((comm) => {
    const matchesSearch =
      comm.name.toLowerCase().includes(commSearchQuery.toLowerCase()) ||
      comm.description.toLowerCase().includes(commSearchQuery.toLowerCase()) ||
      comm.category.toLowerCase().includes(commSearchQuery.toLowerCase());
    
    const matchesCategory = commSelectedCategory === 'All' || comm.category === commSelectedCategory;
    return matchesSearch && matchesCategory;
  });
  const featuredComms = communities.filter(c => c.id === 'comm-bsu' || c.id === 'comm-wistem');

  // Opportunities
  const oppTypesList = ['All', 'Internship', 'Scholarship', 'Job', 'Research', 'Competition'];
  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(oppSearchQuery.toLowerCase()) ||
      opp.organizer.toLowerCase().includes(oppSearchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(oppSearchQuery.toLowerCase());
    
    const matchesType = oppSelectedType === 'All' || 
      opp.type === oppSelectedType || 
      (oppSelectedType === 'Job' && opp.type === 'Campus Job');
    return matchesSearch && matchesType;
  });

  // ==================== HELPERS ====================
  const handleResetEvents = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDateFilter('All');
  };

  const handleResetCommunities = () => {
    setCommSelectedCategory('All');
    setCommSearchQuery('');
  };

  const handleResetOpps = () => {
    setOppSearchQuery('');
    setOppSelectedType('All');
  };

  const handleCommunityClick = (id: string) => {
    setSelectedCommunityId(id);
    setCurrentPage('community-profile');
  };

  const handleViewOpportunity = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setCurrentPage('opportunity-details');
  };

  const renderCommunityIcon = (logoKey: string, className = "w-6 h-6 text-[#FF7A30]") => {
    switch (logoKey) {
      case 'Code':
        return <Code className={className} />;
      case 'Globe':
        return <Globe className={className} />;
      case 'Briefcase':
        return <Briefcase className={className} />;
      case 'Activity':
        return <Activity className={className} />;
      case 'Palette':
        return <Palette className={className} />;
      case 'Heart':
        return <Heart className={className} />;
      default:
        return <Sprout className={className} />;
    }
  };

  const getOppIcon = (type: string) => {
    switch (type) {
      case 'Internship':
        return <Briefcase className="w-5 h-5 text-[#FF7A30]" />;
      case 'Scholarship':
        return <Award className="w-5 h-5 text-[#B47C00]" />;
      case 'Campus Job':
      case 'Job':
        return <DollarSign className="w-5 h-5 text-[#FF7A30]" />;
      case 'Research':
        return <FileSpreadsheet className="w-5 h-5 text-[#E0601B]" />;
      default:
        return <Sparkle className="w-5 h-5 text-[#E0601B]" />;
    }
  };

  // ==================== SUB-RENDERS ====================
  // Render Events Tab
  const renderEventsTab = () => (
    <div className="space-y-12">
      {/* Search and Filters Controls */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search campus events..." />
        
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-brand-text-sec/60 text-left">
            Categories
          </p>
          <CategoryFilter
            categories={categoriesList}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-white/45 text-left">
            When
          </p>
          <div className="flex flex-wrap gap-2">
            {['All', 'Today', 'This Week', 'Next Week'].map((dateFilter) => {
              const isActive = selectedDateFilter === dateFilter;
              return (
                <button
                  key={dateFilter}
                  onClick={() => setSelectedDateFilter(dateFilter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FE7F42] text-white shadow-md shadow-[#FE7F42]/15'
                      : 'bg-white/5 text-white/70 hover:bg-white/10 border border-white/10 shadow-sm'
                  }`}
                >
                  {dateFilter === 'All' ? 'All Dates' : dateFilter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trending (Only show if not filtering/searching) */}
      {!searchQuery && selectedCategory === 'All' && selectedDateFilter === 'All' && trendingEvents.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
            <TrendingUp className="w-5 h-5 text-[#FE7F42]" />
            <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-tight">Trending Gatherings</h2>
            <span className="bg-[#FE7F42]/15 text-[#FE7F42] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#FE7F42]/20">Hot</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {trendingEvents.map((event) => (
              <EventCard key={`trending-${event.id}`} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Main Discover Layout */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-[#FE7F42]" />
            <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-tight">
              {!searchQuery && selectedCategory === 'All' ? 'Upcoming Events' : 'Matching Events'}
            </h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {filteredEvents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-[#1A1214] rounded-3xl border border-white/5 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center border border-white/10">
              <CalendarRange className="w-8 h-8 text-[#FE7F42]/50" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">No events found</h3>
              <p className="text-sm text-white/60 leading-relaxed">
                We couldn't find any events matching "{searchQuery}". Try refining your keywords or filters.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={handleResetEvents}>
              Reset Filters
            </Button>
          </div>
        )}
      </section>
    </div>
  );

  // Render Communities Tab
  const renderCommunitiesTab = () => (
    <div className="space-y-12">
      {/* Featured Communities (Only show when not filtering/searching) */}
      {!commSearchQuery && commSelectedCategory === 'All' && featuredComms.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
            <Heart className="w-5 h-5 text-[#FE7F42] fill-[#FE7F42]/10" />
            <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-tight">Featured Clubs</h2>
            <span className="bg-[#FE7F42]/15 text-[#FE7F42] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-[#FE7F42]/20">Spotlight</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredComms.map((comm) => (
              <div 
                key={`featured-${comm.id}`}
                onClick={() => handleCommunityClick(comm.id)}
                className="bg-gradient-to-r from-[#FE7F42]/5 to-[#FF8A4C]/5 rounded-[2rem] p-6 border border-white/5 flex flex-col sm:flex-row gap-6 items-center cursor-pointer hover:border-[#FE7F42]/30 transition-all duration-300 group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-inner bg-white/5">
                  <img src={comm.image} alt={comm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-grow">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FE7F42]/10 flex items-center justify-center">
                      {renderCommunityIcon(comm.logo, "w-4.5 h-4.5 text-[#FE7F42]")}
                    </div>
                    <h3 className="text-lg font-bold text-white group-hover:text-[#FE7F42] transition-colors">{comm.name}</h3>
                  </div>
                  <p className="text-xs text-white/70 line-clamp-2 leading-relaxed font-sans">
                    {comm.description}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-3 pt-1 text-[11px] text-[#FE7F42] font-bold">
                    <span>{comm.memberCount} active members</span>
                    <span>•</span>
                    <span className="underline group-hover:text-[#FF8A4C]">View Hub →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Controls */}
      <div className="space-y-6 max-w-3xl mx-auto pt-4">
        <SearchBar 
          value={commSearchQuery} 
          onChange={setCommSearchQuery} 
          placeholder="Search student organizations..." 
        />
        <CategoryFilter
          categories={commCategoriesList}
          selectedCategory={commSelectedCategory}
          onChange={setCommSelectedCategory}
        />
      </div>

      {/* Grid of Results */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h2 className="text-2xl sm:text-3xl font-display text-white uppercase tracking-tight">All Communities</h2>
          <span className="text-xs font-semibold uppercase tracking-wider text-white/50">
            {filteredCommunities.length} {filteredCommunities.length === 1 ? 'club' : 'clubs'}
          </span>
        </div>

        {filteredCommunities.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {filteredCommunities.map((community) => (
              <CommunityCard key={community.id} community={community} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-[#1A1214] rounded-3xl border border-white/5 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center border border-white/10">
              <Users className="w-8 h-8 text-[#FE7F42]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white">No clubs found</h3>
              <p className="text-sm text-white/60 leading-relaxed font-sans">
                We couldn't find any communities matching "{commSearchQuery}".
              </p>
            </div>
            <Button variant="primary" size="md" onClick={handleResetCommunities}>
              Show All Communities
            </Button>
          </div>
        )}
      </section>
    </div>
  );

  // Render Opportunities Tab
  const renderOpportunitiesTab = () => (
    <div className="space-y-10">
      {/* Controls */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SearchBar 
          value={oppSearchQuery} 
          onChange={setOppSearchQuery} 
          placeholder="Search keywords, companies, roles..." 
        />

        <div className="flex space-x-2 overflow-x-auto pb-2 pt-1 px-1 custom-scrollbar -mx-4 sm:mx-0 sm:justify-start scrollbar-none">
          {oppTypesList.map((type) => {
            const isActive = oppSelectedType === type;
            return (
              <button
                key={type}
                onClick={() => setOppSelectedType(type)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold cursor-pointer transition-all duration-200 border active:scale-95 ${
                  isActive
                    ? 'bg-[#FE7F42] text-white border-[#FE7F42] shadow-md shadow-[#FE7F42]/20'
                    : 'bg-white/5 text-white/70 border-white/10 hover:border-white/25 hover:bg-[#1A1214] hover:text-white shadow-sm'
                }`}
              >
                {type === 'Job' ? 'Campus Jobs' : type}
              </button>
            );
          })}
        </div>
      </div>

      {/* Feed list */}
      <div className="space-y-4 max-w-5xl mx-auto">
        <div className="flex justify-between items-center text-xs font-bold text-white/40 uppercase tracking-wider px-4">
          <span>Opportunities Feed</span>
          <span>{filteredOpps.length} listed</span>
        </div>

        {filteredOpps.length > 0 ? (
          <div className="space-y-3">
            {filteredOpps.map((opp) => {
              const isSaved = profile.savedOpportunityIds.includes(opp.id);
              return (
                <div 
                  key={opp.id}
                  className="bg-[#1A1214] p-5 sm:px-6 rounded-3xl border border-white/5 hover:border-[#FE7F42]/20 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group shadow-sm hover:shadow-md"
                >
                  <div className="flex items-start gap-4 flex-grow min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-white/5 flex items-center justify-center flex-shrink-0 border border-white/10 select-none shadow-inner">
                      {getOppIcon(opp.type)}
                    </div>
                    
                    <div className="space-y-1 min-w-0 text-left">
                      <div 
                        className="flex flex-wrap items-center gap-x-2 gap-y-1 cursor-pointer"
                        onClick={() => handleViewOpportunity(opp.id)}
                      >
                        <h3 className="text-base font-bold text-white group-hover:text-[#FE7F42] transition-colors truncate">
                          {opp.title}
                        </h3>
                        <span className="bg-[#FE7F42]/10 text-[#FE7F42] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider select-none border border-[#FE7F42]/15">
                          {opp.type}
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-white/70">
                        {opp.organizer}
                      </p>
                      
                      <p className="text-xs text-white/60 line-clamp-2 leading-relaxed pt-1 select-text">
                        {opp.description}
                      </p>
                      
                      <div className="flex flex-wrap items-center gap-x-4 pt-2 text-[10px] sm:text-xs font-semibold text-white/50">
                        <span className="flex items-center text-[#FE7F42]">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#FE7F42] flex-shrink-0" />
                          <span>{opp.reward}</span>
                        </span>
                        <span className="flex items-center">
                          <Calendar className="w-3.5 h-3.5 mr-1 flex-shrink-0 text-white/20" /> 
                          Deadline: {opp.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/5">
                    <button
                      onClick={() => saveOpportunity(opp.id)}
                      className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                        isSaved
                          ? 'bg-[#FE7F42]/10 border-[#FE7F42] text-[#FE7F42]'
                          : 'bg-white/5 border-white/10 hover:border-[#FE7F42] hover:text-[#FE7F42] text-white/65 shadow-sm'
                      }`}
                    >
                      <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-[#FE7F42]' : ''}`} />
                    </button>

                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => handleViewOpportunity(opp.id)}
                      className="px-6 font-bold"
                    >
                      Apply Now
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 px-4 bg-[#1A1214] rounded-3xl border border-white/5 max-w-md mx-auto space-y-4 shadow-sm">
            <Briefcase className="w-8 h-8 text-white/30 mx-auto" />
            <h4 className="font-bold text-base text-white">No matches found</h4>
            <p className="text-xs text-white/60">We couldn't locate opportunities matching search filters.</p>
            <Button variant="outline" size="sm" onClick={handleResetOpps} className="border-white/10 text-white">
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 fade-in pb-24 text-left select-none bg-transparent text-white">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display uppercase tracking-tight">
          Explore Campus
        </h1>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-sans font-medium">
          Mingle at student gatherings, check out organizations, and lock in career internships in one place.
        </p>
      </div>

      {/* Tab Switcher */}
      <div className="flex border-b border-white/5 max-w-md mx-auto sm:mx-0 select-none">
        {['events', 'communities', 'opportunities'].map((tab) => {
          const isActive = exploreActiveTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setExploreActiveTab(tab as any)}
              className={`flex-1 sm:flex-initial px-6 py-3 border-b-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'border-[#FE7F42] text-[#FE7F42]'
                  : 'border-transparent text-white/50 hover:text-white'
              }`}
            >
              {tab}
            </button>
          );
        })}
      </div>

      {/* Swapped Tab Sheet Content */}
      <div className="pt-2">
        {exploreActiveTab === 'communities' && renderCommunitiesTab()}
        {exploreActiveTab === 'opportunities' && renderOpportunitiesTab()}
        {exploreActiveTab === 'events' && renderEventsTab()}
      </div>

      {/* Integrated Protip Bottom banner */}
      <div className="bg-[#2A1617] max-w-4xl mx-auto rounded-3xl p-5 border border-[#FE7F42]/15 flex items-start space-x-3.5 mt-8 select-none shadow-sm">
        <Sparkles className="w-5 h-5 text-[#FE7F42] flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="font-bold text-xs text-[#FE7F42] uppercase tracking-wider mb-1">Evida Protip</h4>
          <p className="text-xs text-white/70 leading-relaxed">
            Hosting a campus group match, a study circle, or an open mic jam that isn't listed here? Head over to the Create Event page to broadcast it instantly to the square!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Explore;

import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import EventCard from '../components/EventCard';
import Button from '../components/Button';
import { CalendarRange, Sparkles, TrendingUp, CalendarDays } from 'lucide-react';

export const Explore: React.FC = () => {
  const { events } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDateFilter, setSelectedDateFilter] = useState('All');

  const categories = ['All', 'Social', 'Career', 'Sports', 'Culture', 'Academic', 'Wellness', 'Volunteer'];

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

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDateFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 fade-in pb-24 text-left select-none">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
          Explore Campus Events
        </h1>
        <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed font-sans">
          Find your next adventure, meet campus communities, network with alumni, or try something completely new today.
        </p>
      </div>

      {/* Search and Filters Controls */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8B8B8]/60 font-display text-left">
            Categories
          </p>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] font-bold uppercase tracking-widest text-[#B8B8B8]/60 font-display text-left">
            When
          </p>
          <div className="flex flex-wrap gap-2">
            {['All', 'Today', 'This Week', 'Next Week'].map((dateFilter) => {
              const isActive = selectedDateFilter === dateFilter;
              return (
                <button
                  key={dateFilter}
                  onClick={() => setSelectedDateFilter(dateFilter)}
                  className={`px-4 py-2 rounded-full text-xs font-bold font-display cursor-pointer transition-all duration-200 ${
                    isActive
                      ? 'bg-[#FF7A1A] text-white shadow-md shadow-[#FF7A1A]/15'
                      : 'bg-[#111111] text-[#B8B8B8] hover:bg-white/5 border border-white/5'
                  }`}
                >
                  {dateFilter === 'All' ? 'All Dates' : dateFilter}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Trending Gatherings (Only show if not filtering/searching) */}
      {!searchQuery && selectedCategory === 'All' && selectedDateFilter === 'All' && trendingEvents.length > 0 && (
        <section className="space-y-5">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
            <TrendingUp className="w-5 h-5 text-[#FF7A1A]" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">Trending Gatherings</h2>
            <span className="bg-[#FF7A1A]/15 text-[#FF7A1A] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase font-display tracking-wider border border-[#FF7A1A]/20">Hot</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {trendingEvents.map((event) => (
              <EventCard key={`trending-${event.id}`} event={event} />
            ))}
          </div>
        </section>
      )}

      {/* Main Discover Layout (Upcoming Events) */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-[#FF7A1A]" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">
              {!searchQuery && selectedCategory === 'All' ? 'Upcoming Events' : 'Matching Events'}
            </h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8B8B8]/60 font-display">
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
          /* Friendly Empty State */
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-[#111111] rounded-3xl border border-white/5 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center">
              <CalendarRange className="w-8 h-8 text-[#FF7A1A]/50" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-display">No events found</h3>
              <p className="text-sm text-[#B8B8B8] leading-relaxed">
                We couldn't find any events matching "{searchQuery}" under "{selectedCategory}" category. Try refining your keywords or filters.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={handleResetFilters}>
              Reset Search Filters
            </Button>
          </div>
        )}
      </section>

      {/* Decorative Tips */}
      <div className="bg-[#111111] max-w-4xl mx-auto rounded-3xl p-5 border border-white/5 flex items-start space-x-3.5 mt-8 select-none">
        <Sparkles className="w-5 h-5 text-[#FF7A1A] flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="font-display font-bold text-xs text-[#FF7A1A] uppercase tracking-wider mb-1">Evida Protip</h4>
          <p className="text-xs text-[#B8B8B8] leading-relaxed">
            Organizing a study session, a board game café hour, or a club meeting that isn't listed here? Open Create Event in the sidebar to invite the campus!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Explore;

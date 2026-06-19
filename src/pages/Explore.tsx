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

  // Filter events based on search query, category, and date range
  const filteredEvents = events.filter((event) => {
    const matchesSearch =
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || event.category === selectedCategory;

    // Mock date parsing relative to the first mock event date "Oct 12, 2026"
    let matchesDate = true;
    if (selectedDateFilter !== 'All') {
      const mockToday = new Date('2026-10-12');
      const eventDate = new Date(event.date);
      const diffTime = eventDate.getTime() - mockToday.getTime();
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24)); // round to avoid timezone edge cases

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

  // Trending events (high attendeeCount, e.g., >= 40)
  const trendingEvents = events.filter(e => e.attendeeCount >= 40).slice(0, 3);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setSelectedDateFilter('All');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 fade-in pb-16">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-text font-display">
          Explore Campus Events
        </h1>
        <p className="text-sm sm:text-base text-brand-text-sec leading-relaxed">
          Find your next adventure, meet campus communities, network with alumni, or try something completely new today.
        </p>
      </div>

      {/* Search and Filters Controls */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        
        <div className="space-y-3">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 font-display text-left">
            Categories
          </p>
          <CategoryFilter
            categories={categories}
            selectedCategory={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>

        <div className="space-y-3">
          <p className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 font-display text-left">
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
                      ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/15'
                      : 'bg-slate-50 text-slate-500 hover:bg-slate-100 border border-slate-100/50'
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
          <div className="flex items-center space-x-2 border-b border-brand-lavender/25 pb-3">
            <TrendingUp className="w-5 h-5 text-brand-purple" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-text">Trending Gatherings</h2>
            <span className="bg-brand-green/10 text-brand-green text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase font-display tracking-wider border border-brand-green/15">Hot</span>
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
        <div className="flex justify-between items-center border-b border-brand-lavender/20 pb-3">
          <div className="flex items-center space-x-2">
            <CalendarDays className="w-5 h-5 text-brand-purple" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-text">
              {!searchQuery && selectedCategory === 'All' ? 'Upcoming Events' : 'Matching Events'}
            </h2>
          </div>
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-text-sec/60 font-display">
            {filteredEvents.length} {filteredEvents.length === 1 ? 'event' : 'events'}
          </span>
        </div>

        {/* Masonry-inspired layout using pure Tailwind CSS columns (Pinterest blend) */}
        {filteredEvents.length > 0 ? (
          <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 sm:gap-8 space-y-6 sm:space-y-8">
            {filteredEvents.map((event) => (
              <div key={event.id} className="break-inside-avoid">
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          /* Friendly Empty State */
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-white rounded-3xl border border-brand-lavender/30 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-brand-lavender/30 mx-auto flex items-center justify-center">
              <CalendarRange className="w-8 h-8 text-brand-purple" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-brand-text font-display">No events found</h3>
              <p className="text-sm text-brand-text-sec leading-relaxed">
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
      <div className="bg-brand-lavender/10 max-w-4xl mx-auto rounded-3xl p-5 border border-brand-lavender/25 flex items-start space-x-3.5 mt-8 select-none">
        <Sparkles className="w-5 h-5 text-brand-purple flex-shrink-0 mt-0.5" />
        <div className="text-left">
          <h4 className="font-display font-bold text-xs text-brand-purple uppercase tracking-wider mb-1">Evida Protip</h4>
          <p className="text-xs text-brand-text-sec leading-relaxed">
            Organizing a study session, a board game café hour, or a club meeting that isn't listed here? Use the floating Create action to invite the campus!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Explore;

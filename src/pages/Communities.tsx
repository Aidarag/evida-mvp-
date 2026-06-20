import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CommunityCard from '../components/CommunityCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { Users, Sparkles, Heart, Code, Globe, Briefcase, Activity, Palette, Sprout } from 'lucide-react';
import Button from '../components/Button';

const renderCommunityIcon = (logoKey: string, className = "w-6 h-6 text-[#FF7A1A]") => {
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

export const Communities: React.FC = () => {
  const { communities, setSelectedCommunityId, setCurrentPage } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Tech', 'Culture', 'Academic', 'Business', 'Wellness', 'Creative'];

  // Filter based on search query and category
  const filteredCommunities = communities.filter((comm) => {
    const matchesSearch =
      comm.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      comm.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || comm.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Featured Highlights
  const featuredComms = communities.filter(c => c.id === 'comm-bsu' || c.id === 'comm-wistem');

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
  };

  const handleCommunityClick = (id: string) => {
    setSelectedCommunityId(id);
    setCurrentPage('community-profile');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 fade-in pb-24 text-left select-none">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-white font-display">
          Campus Communities
        </h1>
        <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed font-sans">
          Find your crew! Join student-run clubs, design chapters, sports clubs, and creative groups.
        </p>
      </div>

      {/* Featured Communities Panel (Only show when not filtering/searching) */}
      {!searchQuery && selectedCategory === 'All' && featuredComms.length > 0 && (
        <section className="space-y-6">
          <div className="flex items-center space-x-2 border-b border-white/5 pb-3">
            <Heart className="w-5 h-5 text-[#FF7A1A] fill-[#FF7A1A]/10" />
            <h2 className="text-xl sm:text-2xl font-bold font-display text-white">Featured Clubs</h2>
            <span className="bg-[#FF7A1A]/15 text-[#FF7A1A] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase font-display tracking-wider border border-[#FF7A1A]/20">Spotlight</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredComms.map((comm) => (
              <div 
                key={`featured-${comm.id}`}
                onClick={() => handleCommunityClick(comm.id)}
                className="bg-gradient-to-r from-[#FF7A1A]/5 to-[#E56717]/10 rounded-[2rem] p-6 border border-white/5 flex flex-col sm:flex-row gap-6 items-center cursor-pointer hover:shadow-md hover:border-[#FF7A1A]/20 transition-all duration-300 group"
              >
                <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0 border border-white/10 shadow-inner bg-white/5">
                  <img src={comm.image} alt={comm.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="space-y-2 text-center sm:text-left flex-grow">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <div className="w-8 h-8 rounded-xl bg-[#FF7A1A]/10 flex items-center justify-center">
                      {renderCommunityIcon(comm.logo, "w-4.5 h-4.5 text-[#FF7A1A]")}
                    </div>
                    <h3 className="text-lg font-bold text-white font-display group-hover:text-[#FF7A1A] transition-colors">{comm.name}</h3>
                  </div>
                  <p className="text-xs text-[#B8B8B8] line-clamp-2 leading-relaxed">
                    {comm.description}
                  </p>
                  <div className="flex items-center justify-center sm:justify-start space-x-3 pt-1 text-[11px] text-[#FF7A1A] font-bold">
                    <span>{comm.memberCount} active members</span>
                    <span>•</span>
                    <span className="underline group-hover:text-[#E56717]">View Hub →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Control Widgets */}
      <div className="space-y-6 max-w-3xl mx-auto pt-4">
        {/* Search */}
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search student organizations..." 
        />

        {/* Category Bar */}
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onChange={setSelectedCategory}
        />
      </div>

      {/* Grid of Results */}
      <section className="space-y-6">
        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-white">All Communities</h2>
          <span className="text-xs font-semibold uppercase tracking-wider text-[#B8B8B8]/60 font-display">
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
          /* Empty State */
          <div className="text-center py-16 px-4 max-w-md mx-auto bg-[#111111] rounded-3xl border border-white/5 shadow-sm space-y-6">
            <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center">
              <Users className="w-8 h-8 text-[#FF7A1A]" />
            </div>
            <div className="space-y-2">
              <h3 className="text-xl font-bold text-white font-display">No clubs found</h3>
              <p className="text-sm text-[#B8B8B8] leading-relaxed">
                We couldn't find any communities matching "{searchQuery}" under the "{selectedCategory}" category.
              </p>
            </div>
            <Button variant="primary" size="md" onClick={handleResetFilters}>
              Show All Communities
            </Button>
          </div>
        )}
      </section>

      {/* Joining disclaimer */}
      <div className="bg-[#111111] max-w-4xl mx-auto rounded-[2rem] p-6 border border-white/5 flex items-start space-x-4 mt-12 select-none">
        <Sparkles className="w-6 h-6 text-[#FF7A1A] flex-shrink-0 mt-0.5" />
        <div className="text-left space-y-1">
          <h4 className="font-display font-bold text-sm text-white uppercase tracking-wider">Start a Student Club</h4>
          <p className="text-xs text-[#B8B8B8] leading-relaxed">
            Don't see your organization listed on Evida? College students can register a new official student organization in minutes. Contact student activities or request a club portal to get started!
          </p>
        </div>
      </div>
    </div>
  );
};
export default Communities;

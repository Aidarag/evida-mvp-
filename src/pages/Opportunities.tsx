import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import SearchBar from '../components/SearchBar';
import { Briefcase, Heart, Calendar, DollarSign, Award, FileSpreadsheet, Sparkle } from 'lucide-react';
import Button from '../components/Button';

export const Opportunities: React.FC = () => {
  const { opportunities, profile, saveOpportunity, setCurrentPage, setSelectedOpportunityId } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('All');
  const types = ['All', 'Internship', 'Scholarship', 'Job', 'Research', 'Competition'];

  // Filter opportunities
  const filteredOpps = opportunities.filter((opp) => {
    const matchesSearch =
      opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.organizer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      opp.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = selectedType === 'All' || 
      (opp.type as string) === selectedType || 
      (selectedType === 'Job' && opp.type === 'Campus Job');

    return matchesSearch && matchesType;
  });

  const handleViewOpportunity = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setCurrentPage('opportunity-details');
  };

  const getOppIcon = (type: string) => {
    switch (type) {
      case 'Internship':
        return <Briefcase className="w-5 h-5 text-[#FE7F42]" />;
      case 'Scholarship':
        return <Award className="w-5 h-5 text-[#FFFB97]" />;
      case 'Campus Job':
      case 'Job':
        return <DollarSign className="w-5 h-5 text-[#FE7F42]" />;
      case 'Research':
        return <FileSpreadsheet className="w-5 h-5 text-[#FF8A4C]" />;
      default:
        return <Sparkle className="w-5 h-5 text-[#FE7F42]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 fade-in pb-24 text-left select-none">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-text font-display">
          Opportunities Hub
        </h1>
        <p className="text-sm sm:text-base text-brand-text-sec leading-relaxed font-sans">
          Discover paid internships, campus fellowships, research assistantships, scholarship programs, and local pitch hackathons.
        </p>
      </div>

      {/* Control widgets */}
      <div className="space-y-6 max-w-3xl mx-auto">
        <SearchBar 
          value={searchQuery} 
          onChange={setSearchQuery} 
          placeholder="Search keywords, companies, roles..." 
        />

        {/* Filter categories tabs */}
        <div className="flex space-x-2 overflow-x-auto pb-2 pt-1 px-1 custom-scrollbar -mx-4 sm:mx-0 sm:justify-start scrollbar-none">
          {types.map((type) => {
            const isActive = selectedType === type;
            return (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold font-display cursor-pointer transition-all duration-200 border active:scale-95 ${
                  isActive
                    ? 'bg-[#FE7F42] text-white border-[#FE7F42] shadow-md shadow-[#FE7F42]/20'
                    : 'bg-[#1A1214] text-brand-text-sec border-white/10 hover:border-[#FE7F42] hover:bg-[#2A1617]/20 hover:text-white'
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
        <div className="flex justify-between items-center text-xs font-bold text-brand-text-sec/60 uppercase tracking-wider font-display px-4">
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
                  className="bg-[#1A1214]/60 hover:bg-[#1A1214]/85 p-5 sm:px-6 rounded-3xl border border-white/10 hover:border-[#FE7F42]/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group shadow-sm hover:shadow-md"
                >
                  {/* Left block info */}
                  <div className="flex items-start gap-4 flex-grow min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-brand-bg flex items-center justify-center flex-shrink-0 border border-white/10 select-none shadow-inner">
                      {getOppIcon(opp.type)}
                    </div>
                    
                    <div className="space-y-1 min-w-0 text-left">
                      <div 
                        className="flex flex-wrap items-center gap-x-2 gap-y-1 cursor-pointer"
                        onClick={() => handleViewOpportunity(opp.id)}
                      >
                        <h3 className="text-base font-bold text-brand-text font-display group-hover:text-[#FF8A4C] transition-colors truncate">
                          {opp.title}
                        </h3>
                        <span className="bg-[#FF8A4C]/10 text-[#FF8A4C] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display select-none border border-[#FF8A4C]/15">
                          {opp.type}
                        </span>
                      </div>
                      
                      <p className="text-xs font-semibold text-brand-text-sec">
                        {opp.organizer}
                      </p>
                      
                      <p className="text-xs text-brand-text-sec/70 line-clamp-2 leading-relaxed pt-1 select-text font-sans">
                        {opp.description}
                      </p>
                      
                      {/* Sub row details tags */}
                      <div className="flex flex-wrap items-center gap-x-4 pt-2 text-[10px] sm:text-xs font-semibold text-brand-text-sec/55">
                        <span className="flex items-center text-[#FF8A4C]">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#FF8A4C] flex-shrink-0" />
                          <span>{opp.reward}</span>
                        </span>
                        <span className="flex items-center font-sans">
                          <Calendar className="w-3.5 h-3.5 mr-1 flex-shrink-0 text-brand-text-sec/30" /> 
                          Deadline: {opp.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right actions block */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-white/10">
                    {/* Bookmark Save icon */}
                    <button
                      onClick={() => saveOpportunity(opp.id)}
                      className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                        isSaved
                          ? 'bg-[#FE7F42]/10 border-[#FE7F42] text-[#FE7F42]'
                          : 'bg-[#1A1214] border-white/10 hover:border-[#FE7F42] hover:text-[#FE7F42] text-brand-text-sec/60'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Opportunity'}
                    >
                      <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-[#FE7F42]' : ''}`} />
                    </button>

                    {/* Apply Button */}
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
          /* Empty Search State */
          <div className="text-center py-16 px-4 bg-[#1A1214]/60 backdrop-blur-md rounded-3xl border border-white/10 max-w-md mx-auto space-y-4 shadow-sm">
            <Briefcase className="w-8 h-8 text-brand-text-sec/30 mx-auto" />
            <h4 className="font-display font-bold text-base text-brand-text">No matches found</h4>
            <p className="text-xs text-brand-text-sec">We couldn't locate opportunities matching "{searchQuery}". Try editing filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Opportunities;

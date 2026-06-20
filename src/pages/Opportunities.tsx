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
        return <Briefcase className="w-5 h-5 text-[#FF7A1A]" />;
      case 'Scholarship':
        return <Award className="w-5 h-5 text-[#0F766E]" />;
      case 'Campus Job':
      case 'Job':
        return <DollarSign className="w-5 h-5 text-[#FF7A1A]" />;
      case 'Research':
        return <FileSpreadsheet className="w-5 h-5 text-[#0F766E]" />;
      default:
        return <Sparkle className="w-5 h-5 text-[#FF7A1A]" />;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 fade-in pb-24 text-left select-none text-[#111111] bg-transparent">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-[#111111] font-display uppercase tracking-tight">
          Opportunities Hub
        </h1>
        <p className="text-sm sm:text-base text-[#555555] leading-relaxed font-sans font-medium">
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
                    ? 'bg-[#FF7A1A] text-white border-[#FF7A1A] shadow-md shadow-[#FF7A1A]/20'
                    : 'bg-white text-[#555555] border-gray-200 hover:border-[#FF7A1A] hover:bg-[#FF7A1A]/5 hover:text-[#111111] shadow-sm'
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
        <div className="flex justify-between items-center text-xs font-bold text-[#555555]/60 uppercase tracking-wider font-display px-4">
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
                  className="bg-white hover:bg-[#F7F8FA]/60 p-5 sm:px-6 rounded-3xl border border-gray-200/80 hover:border-[#FF7A1A]/30 transition-all flex flex-col md:flex-row items-start md:items-center justify-between gap-5 group shadow-sm hover:shadow-md"
                >
                  {/* Left block info */}
                  <div className="flex items-start gap-4 flex-grow min-w-0">
                    <div className="w-11 h-11 rounded-2xl bg-[#F7F8FA] flex items-center justify-center flex-shrink-0 border border-gray-200 select-none shadow-inner">
                      {getOppIcon(opp.type)}
                    </div>
                    
                    <div className="space-y-1 min-w-0 text-left font-sans">
                      <div 
                        className="flex flex-wrap items-center gap-x-2 gap-y-1 cursor-pointer"
                        onClick={() => handleViewOpportunity(opp.id)}
                      >
                        <h3 className="text-base font-bold text-[#111111] group-hover:text-[#FF7A1A] transition-colors truncate">
                          {opp.title}
                        </h3>
                        <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase tracking-wider border ${
                          opp.type === 'Scholarship' || opp.type === 'Research'
                            ? 'bg-[#0F766E]/10 text-[#0F766E] border-[#0F766E]/15'
                            : 'bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/15'
                        }`}>
                          {opp.type}
                        </span>
                      </div>
                      
                      <p className="text-xs font-bold text-[#555555]">
                        {opp.organizer}
                      </p>
                      
                      <p className="text-xs text-[#555555]/85 line-clamp-2 leading-relaxed pt-1 select-text font-medium">
                        {opp.description}
                      </p>
                      
                      {/* Sub row details tags */}
                      <div className="flex flex-wrap items-center gap-x-4 pt-2 text-[10px] sm:text-xs font-bold text-[#555555]/60">
                        <span className="flex items-center text-[#FF7A1A]">
                          <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#FF7A1A] flex-shrink-0" />
                          <span>{opp.reward}</span>
                        </span>
                        <span className="flex items-center font-sans font-medium">
                          <Calendar className="w-3.5 h-3.5 mr-1 flex-shrink-0 text-gray-400" /> 
                          Deadline: {opp.deadline}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right actions block */}
                  <div className="flex items-center gap-3 w-full md:w-auto justify-end flex-shrink-0 pt-3 md:pt-0 border-t md:border-t-0 border-gray-100">
                    {/* Bookmark Save icon */}
                    <button
                      onClick={() => saveOpportunity(opp.id)}
                      className={`p-2.5 rounded-full border transition-all duration-200 cursor-pointer ${
                        isSaved
                          ? 'bg-[#FF7A1A]/10 border-[#FF7A1A] text-[#FF7A1A]'
                          : 'bg-white border-gray-200 hover:border-[#FF7A1A] hover:text-[#FF7A1A] text-[#555555]'
                      }`}
                      title={isSaved ? 'Remove Bookmark' : 'Save Opportunity'}
                    >
                      <Heart className={`w-4.5 h-4.5 ${isSaved ? 'fill-[#FF7A1A]' : ''}`} />
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
          <div className="text-center py-16 px-4 bg-[#F7F8FA] rounded-3xl border border-gray-200/80 max-w-md mx-auto space-y-4 shadow-sm">
            <Briefcase className="w-8 h-8 text-gray-400 mx-auto" />
            <h4 className="font-display font-bold text-base text-[#111111] uppercase tracking-tight">No matches found</h4>
            <p className="text-xs text-[#555555] font-medium font-sans">We couldn't locate opportunities matching "{searchQuery}". Try editing filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};
export default Opportunities;

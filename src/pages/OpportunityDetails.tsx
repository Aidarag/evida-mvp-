import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Clock, DollarSign, Heart, Share2, Send, Check, X, Briefcase, Award, FileSpreadsheet, Sparkles } from 'lucide-react';
import Button from '../components/Button';

export const OpportunityDetails: React.FC = () => {
  const { 
    opportunities, 
    selectedOpportunityId, 
    profile, 
    saveOpportunity, 
    setCurrentPage, 
    setSelectedOpportunityId 
  } = useApp();

  const [showApplyModal, setShowApplyModal] = useState(false);
  const [applicantNote, setApplicantNote] = useState('');
  const [isAppliedSuccessfully, setIsAppliedSuccessfully] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const opportunity = opportunities.find(o => o.id === selectedOpportunityId) || opportunities[0];

  useEffect(() => {
    if (!opportunity) {
      setCurrentPage('opportunities');
    }
  }, [opportunity, setCurrentPage]);

  if (!opportunity) return null;

  const isSaved = profile.savedOpportunityIds.includes(opportunity.id);

  const getOppDetails = (type: string) => {
    switch (type) {
      case 'Internship':
        return {
          icon: <Briefcase className="w-6 h-6 text-[#FF7A1A]" />,
          colorClass: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/20',
          gradient: 'from-[#FF7A1A]/15 to-[#E56717]/5'
        };
      case 'Scholarship':
        return {
          icon: <Award className="w-6 h-6 text-[#FF9F43]" />,
          colorClass: 'bg-[#FF9F43]/10 text-[#FF9F43] border-[#FF9F43]/20',
          gradient: 'from-[#FF9F43]/15 to-[#E56717]/5'
        };
      case 'Campus Job':
      case 'Job':
        return {
          icon: <DollarSign className="w-6 h-6 text-[#FF7A1A]" />,
          colorClass: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border-[#FF7A1A]/20',
          gradient: 'from-[#FF7A1A]/15 to-[#E56717]/5'
        };
      case 'Research':
        return {
          icon: <FileSpreadsheet className="w-6 h-6 text-[#FFA044]" />,
          colorClass: 'bg-[#FFA044]/10 text-[#FFA044] border-[#FFA044]/20',
          gradient: 'from-[#FFA044]/15 to-[#E56717]/5'
        };
      default:
        return {
          icon: <Sparkles className="w-6 h-6 text-[#E56717]" />,
          colorClass: 'bg-[#E56717]/10 text-[#E56717] border-[#E56717]/20',
          gradient: 'from-[#E56717]/15 to-[#E56717]/5'
        };
    }
  };

  const details = getOppDetails(opportunity.type);

  const relatedOpps = opportunities
    .filter(o => o.id !== opportunity.id)
    .slice(0, 3);

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppliedSuccessfully(true);
    setTimeout(() => {
      setShowApplyModal(false);
      setIsAppliedSuccessfully(false);
      setApplicantNote('');
    }, 2200);
  };

  const handleShareClick = () => {
    const mockUrl = `${window.location.origin}/#opportunity/${opportunity.id}`;
    navigator.clipboard.writeText(mockUrl).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 fade-in pb-24 text-left select-none">
      {/* Back Link */}
      <button 
        onClick={() => setCurrentPage('opportunities')}
        className="flex items-center space-x-2 text-sm text-[#B8B8B8] hover:text-[#FF7A1A] font-bold group transition-colors select-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to opportunities hub</span>
      </button>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Title and Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className={`p-8 sm:p-10 rounded-[2rem] border border-white/5 bg-gradient-to-br ${details.gradient} relative overflow-hidden text-left space-y-4 shadow-xl`}>
            <div className="flex justify-between items-center">
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${details.colorClass}`}>
                {opportunity.type}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center border border-white/10 shadow-inner select-none">
                {details.icon}
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl sm:text-5xl font-display text-white leading-tight tracking-tight uppercase">
                {opportunity.title}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-[#B8B8B8]">
                Offered by <span className="text-[#FF7A1A] font-bold">{opportunity.organizer}</span>
              </p>
            </div>
          </div>

          {/* About Position */}
          <div className="bg-[#111111] p-8 sm:p-10 rounded-[2rem] border border-white/5 shadow-sm space-y-6 text-left">
            <h2 className="text-2xl font-display text-white uppercase tracking-tight border-b border-white/5 pb-3">
              Opportunity Description
            </h2>
            <p className="text-[#B8B8B8] leading-relaxed text-sm sm:text-base select-text whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-[#111111] p-8 sm:p-10 rounded-[2rem] border border-white/5 space-y-6 text-left">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-[#FF7A1A]" />
              <h2 className="text-2xl font-display text-white uppercase tracking-tight">
                Candidate Requirements
              </h2>
            </div>
            
            <div className="bg-white/5 p-5 rounded-2xl border border-white/5 text-sm text-[#B8B8B8] leading-relaxed">
              <p className="select-text">{opportunity.requirements}</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <li className="flex items-start space-x-2.5 text-xs text-[#B8B8B8]/70">
                <div className="w-4.5 h-4.5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center flex-shrink-0 text-[#FF7A1A] font-bold text-[10px]">✓</div>
                <span>Pre-filled profile & CV application routing</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-[#B8B8B8]/70">
                <div className="w-4.5 h-4.5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center flex-shrink-0 text-[#FF7A1A] font-bold text-[10px]">✓</div>
                <span>Reviewed by {opportunity.organizer} admissions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: CTA Info Panel */}
        <div className="space-y-6">
          <div className="bg-[#111111] p-6 sm:p-8 rounded-[2rem] border border-white/5 shadow-sm space-y-6 sticky top-24">
            
            {/* Quick specifications */}
            <div className="space-y-5 text-left">
              
              {/* Financial Reward */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/15 flex items-center justify-center flex-shrink-0 text-[#FF7A1A]">
                  <DollarSign className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/40">Stipend & Reward</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">{opportunity.reward}</p>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center flex-shrink-0 text-[#FF7A1A]">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/40">Application Deadline</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">{opportunity.deadline}</p>
                  <p className="text-[9px] text-[#FF7A1A] font-bold mt-0.5">Closes soon</p>
                </div>
              </div>

              {/* Host/Employer */}
              <div className="flex items-start space-x-3.5 border-t border-white/5 pt-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF9F43]/10 border border-[#FF9F43]/15 flex items-center justify-center flex-shrink-0 text-[#FF7A1A]">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/40">Employer</h4>
                  <p className="text-sm font-semibold text-white mt-0.5">{opportunity.organizer}</p>
                </div>
              </div>

            </div>

            <hr className="border-white/5" />

            {/* CTAs */}
            <div className="space-y-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowApplyModal(true)}
                className="w-full flex items-center justify-center space-x-2 text-sm font-bold shadow-md shadow-[#FF7A1A]/10"
              >
                <span>Apply Now</span>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => saveOpportunity(opportunity.id)}
                  className="flex items-center justify-center space-x-1.5 border-white/5 hover:border-[#FF7A1A]/40 font-bold"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'text-[#FF7A1A] fill-[#FF7A1A]' : 'text-[#B8B8B8]/50'}`} />
                  <span>{isSaved ? 'Bookmarked' : 'Save'}</span>
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleShareClick}
                  className="flex items-center justify-center space-x-1.5 border-white/5 hover:border-[#FF7A1A]/40 font-bold"
                >
                  <Share2 className="w-4 h-4 text-[#B8B8B8]/50" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Recommended Opportunities */}
      <section className="space-y-6 pt-8 border-t border-white/5 text-left">
        <h2 className="text-2xl font-display text-white uppercase tracking-tight">
          Recommended Opportunities
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {relatedOpps.map((opp) => (
            <div 
              key={opp.id}
              onClick={() => {
                setSelectedOpportunityId(opp.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-[#111111] p-5 rounded-3xl border border-white/5 hover:border-[#FF7A1A]/20 transition-all cursor-pointer flex flex-col justify-between text-left group"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="bg-[#FF7A1A]/10 text-[#FF7A1A] text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider select-none border border-[#FF7A1A]/15">
                    {opp.type}
                  </span>
                  <span className="text-[10px] text-[#B8B8B8]/60 font-semibold">{opp.deadline}</span>
                </div>
                <h3 className="text-sm font-bold text-white group-hover:text-[#FF7A1A] line-clamp-1 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs font-semibold text-[#B8B8B8]">{opp.organizer}</p>
                <p className="text-xs text-[#B8B8B8]/75 line-clamp-2 leading-relaxed pt-1">{opp.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-white/5 text-xs font-bold text-[#FF7A1A] text-right group-hover:text-[#E56717]">
                View Opportunity →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulated Application slide-up modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#111111] rounded-[2rem] p-6 sm:p-8 max-w-lg w-full border border-white/10 shadow-2xl relative space-y-6 text-center">
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {isAppliedSuccessfully ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 text-emerald-500 rounded-full mx-auto flex items-center justify-center border border-emerald-500/20 shadow-inner">
                  <Check className="w-8 h-8 stroke-[3.5px]" />
                </div>
                <h3 className="text-2xl font-bold text-white">Application Sent!</h3>
                <p className="text-sm text-[#B8B8B8] leading-relaxed max-w-xs mx-auto">
                  Your application materials have been routed to <strong>{opportunity.organizer}</strong>. You'll receive updates at <strong>{profile.name.toLowerCase().replace(/\s+/g, '')}@livingstone.edu</strong>!
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-left">
                <div className="space-y-1">
                  <span className="bg-[#FF7A1A]/10 text-[#FF7A1A] text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider select-none border border-[#FF7A1A]/15">
                    Apply for {opportunity.type}
                  </span>
                  <h3 className="text-lg font-bold text-white pt-1.5 leading-snug">
                    {opportunity.title}
                  </h3>
                  <p className="text-xs text-[#B8B8B8]/70 font-semibold">
                    Employer: <strong>{opportunity.organizer}</strong>
                  </p>
                </div>

                <hr className="border-white/5" />

                <div className="grid grid-cols-2 gap-4 bg-white/5 p-3.5 rounded-2xl border border-white/5 text-xs font-semibold text-[#B8B8B8] leading-none select-none">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-[#B8B8B8]/40 mb-1">Student</p>
                    <p className="text-white text-sm mt-0.5">{profile.name}</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-[#B8B8B8]/40 mb-1">Major</p>
                    <p className="text-white text-sm mt-0.5 truncate">{profile.major}</p>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider">Introduce Yourself (Cover Note)</label>
                  <textarea
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    rows={4}
                    placeholder={`Tell ${opportunity.organizer} why you're interested in this opportunity and highlight your experience...`}
                    className="w-full px-4 py-3 bg-[#090909] border border-white/5 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all text-white resize-none"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-white/5">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setShowApplyModal(false)}
                    className="w-full border-white/10 text-white hover:bg-white/5"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full flex items-center justify-center space-x-2 font-bold text-xs"
                  >
                    <Send className="w-4 h-4" />
                    <span>Submit Application</span>
                  </Button>
                </div>
              </form>
            )}

          </div>
        </div>
      )}

      {/* Share Toast */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white text-xs font-semibold px-4.5 py-3.5 rounded-full shadow-lg flex items-center space-x-2 border border-white/10 animate-bounce">
          <span>Opportunity link copied! Send to classmates</span>
        </div>
      )}
    </div>
  );
};

export default OpportunityDetails;

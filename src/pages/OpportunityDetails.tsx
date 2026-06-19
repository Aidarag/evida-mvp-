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

  // Retrieve selected opportunity or fallback to the first
  const opportunity = opportunities.find(o => o.id === selectedOpportunityId) || opportunities[0];

  useEffect(() => {
    if (!opportunity) {
      setCurrentPage('opportunities');
    }
  }, [opportunity, setCurrentPage]);

  if (!opportunity) return null;

  const isSaved = profile.savedOpportunityIds.includes(opportunity.id);

  // Helper to resolve colors/icons
  const getOppDetails = (type: string) => {
    switch (type) {
      case 'Internship':
        return {
          icon: <Briefcase className="w-6 h-6 text-brand-purple" />,
          colorClass: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
          gradient: 'from-brand-purple/20 to-brand-blue/10'
        };
      case 'Scholarship':
        return {
          icon: <Award className="w-6 h-6 text-amber-600" />,
          colorClass: 'bg-amber-50 text-amber-600 border border-amber-200',
          gradient: 'from-amber-50 to-brand-blue/5'
        };
      case 'Campus Job':
      case 'Job':
        return {
          icon: <DollarSign className="w-6 h-6 text-emerald-600" />,
          colorClass: 'bg-emerald-50 text-emerald-600 border border-emerald-200',
          gradient: 'from-emerald-50 to-brand-blue/5'
        };
      case 'Research':
        return {
          icon: <FileSpreadsheet className="w-6 h-6 text-cyan-600" />,
          colorClass: 'bg-cyan-50 text-cyan-600 border border-cyan-200',
          gradient: 'from-cyan-50 to-brand-blue/5'
        };
      default:
        return {
          icon: <Sparkles className="w-6 h-6 text-rose-500" />,
          colorClass: 'bg-rose-50 text-rose-600 border border-rose-200',
          gradient: 'from-rose-50 to-brand-blue/5'
        };
    }
  };

  const details = getOppDetails(opportunity.type);

  // Filter 3 related opportunities (excluding current one)
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 fade-in pb-16">
      {/* Back Link */}
      <button 
        onClick={() => setCurrentPage('opportunities')}
        className="flex items-center space-x-2 text-sm text-brand-text/60 hover:text-brand-purple font-bold font-display group transition-colors select-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to opportunities hub</span>
      </button>

      {/* Main Grid Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns: Title and Details */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Header Card */}
          <div className={`p-8 sm:p-10 rounded-[2rem] border border-brand-lavender/35 bg-gradient-to-br ${details.gradient} relative overflow-hidden text-left space-y-4 shadow-sm`}>
            <div className="flex items-center justify-between">
              <span className={`inline-block px-3.5 py-1 rounded-full text-xs font-bold font-display uppercase tracking-wider ${details.colorClass}`}>
                {opportunity.type}
              </span>
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center border border-brand-lavender/35 shadow-sm select-none">
                {details.icon}
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-2xl sm:text-4xl font-bold font-display text-brand-text leading-tight tracking-tight">
                {opportunity.title}
              </h1>
              <p className="text-sm sm:text-base font-semibold text-brand-text-sec">
                Offered by <span className="text-brand-purple font-bold">{opportunity.organizer}</span>
              </p>
            </div>
          </div>

          {/* About Position */}
          <div className="bg-white p-8 sm:p-10 rounded-[2rem] border border-brand-lavender/25 shadow-sm space-y-6 text-left">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-text border-b border-brand-lavender/25 pb-3">
              Opportunity Description
            </h2>
            <p className="text-brand-text-sec leading-relaxed text-sm sm:text-base select-text whitespace-pre-line">
              {opportunity.description}
            </p>
          </div>

          {/* Requirements */}
          <div className="bg-brand-peach/10 p-8 sm:p-10 rounded-[2rem] border border-brand-peach/25 space-y-6 text-left">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-brand-purple" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-text">
                Candidate Requirements
              </h2>
            </div>
            
            <div className="bg-white p-5 rounded-2xl border border-brand-lavender/15 shadow-sm text-sm text-brand-text-sec leading-relaxed">
              <p className="select-text">{opportunity.requirements}</p>
            </div>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              <li className="flex items-start space-x-2.5 text-xs text-brand-text-sec/90">
                <div className="w-4.5 h-4.5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 text-brand-green font-bold text-[10px]">✓</div>
                <span>Pre-filled profile & CV application routing</span>
              </li>
              <li className="flex items-start space-x-2.5 text-xs text-brand-text-sec/90">
                <div className="w-4.5 h-4.5 rounded-full bg-brand-green/10 flex items-center justify-center flex-shrink-0 text-brand-green font-bold text-[10px]">✓</div>
                <span>Reviewed by {opportunity.organizer} admissions</span>
              </li>
            </ul>
          </div>

        </div>

        {/* Right Column: CTA Info Panel */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-brand-lavender/25 shadow-sm space-y-6 sticky top-24">
            
            {/* Quick specifications */}
            <div className="space-y-5 text-left">
              
              {/* Financial Reward */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-green/10 flex items-center justify-center flex-shrink-0">
                  <DollarSign className="w-5 h-5 text-brand-green" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-sec/50 font-display">Stipend & Reward</h4>
                  <p className="text-sm font-semibold text-brand-text mt-0.5">{opportunity.reward}</p>
                </div>
              </div>

              {/* Deadline */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-rose-50 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-rose-500" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-sec/50 font-display">Application Deadline</h4>
                  <p className="text-sm font-semibold text-brand-text mt-0.5">{opportunity.deadline}</p>
                  <p className="text-[10px] text-rose-600 font-semibold mt-0.5">Closes soon</p>
                </div>
              </div>

              {/* Host/Employer */}
              <div className="flex items-start space-x-3.5 border-t border-brand-lavender/20 pt-4">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-sec/50 font-display">Employer</h4>
                  <p className="text-sm font-semibold text-brand-text mt-0.5">{opportunity.organizer}</p>
                </div>
              </div>

            </div>

            <hr className="border-brand-lavender/20" />

            {/* CTAs */}
            <div className="space-y-3.5">
              <Button
                variant="primary"
                size="lg"
                onClick={() => setShowApplyModal(true)}
                className="w-full flex items-center justify-center space-x-2 text-base font-bold shadow-md shadow-brand-purple/10"
              >
                <span>Apply Now</span>
              </Button>

              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => saveOpportunity(opportunity.id)}
                  className="flex items-center justify-center space-x-1.5 border-brand-purple/15 hover:border-brand-purple"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'text-brand-purple fill-brand-purple animate-pulse' : 'text-brand-text/50'}`} />
                  <span>{isSaved ? 'Bookmarked' : 'Save'}</span>
                </Button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleShareClick}
                  className="flex items-center justify-center space-x-1.5 border-brand-purple/15 hover:border-brand-purple"
                >
                  <Share2 className="w-4 h-4 text-brand-text/50" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Recommended Opportunities */}
      <section className="space-y-6 pt-8 border-t border-brand-lavender/25 text-left">
        <h2 className="text-2xl font-bold text-brand-text font-display">
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
              className="bg-white p-5 rounded-3xl border border-brand-lavender/25 shadow-sm hover:shadow-md hover:border-brand-purple/20 transition-all cursor-pointer flex flex-col justify-between text-left group"
            >
              <div className="space-y-2">
                <div className="flex justify-between items-start">
                  <span className="bg-brand-purple/10 text-brand-purple text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display select-none">
                    {opp.type}
                  </span>
                  <span className="text-[10px] text-brand-text-sec/60 font-semibold">{opp.deadline}</span>
                </div>
                <h3 className="text-sm font-bold text-brand-text font-display group-hover:text-brand-purple line-clamp-1 transition-colors">
                  {opp.title}
                </h3>
                <p className="text-xs font-semibold text-brand-text-sec">{opp.organizer}</p>
                <p className="text-xs text-brand-text-sec/75 line-clamp-2 leading-relaxed pt-1">{opp.description}</p>
              </div>
              <div className="mt-4 pt-3 border-t border-brand-lavender/10 text-xs font-bold text-brand-purple text-right">
                View Opportunity →
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Simulated Application slide-up modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-text/30 backdrop-blur-sm transition-all duration-300">
          <div className="bg-brand-bg rounded-[2rem] p-6 sm:p-8 max-w-lg w-full border border-brand-lavender shadow-2xl relative space-y-6 animate-fadeIn">
            <button 
              onClick={() => setShowApplyModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-brand-text/40 hover:text-brand-text hover:bg-brand-lavender/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {isAppliedSuccessfully ? (
              <div className="text-center py-10 space-y-4">
                <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full mx-auto flex items-center justify-center border border-emerald-100 shadow-inner">
                  <Check className="w-8 h-8 stroke-[3.5px]" />
                </div>
                <h3 className="text-2xl font-bold font-display text-brand-text">Application Sent!</h3>
                <p className="text-sm text-brand-text-sec leading-relaxed max-w-xs mx-auto">
                  Your application materials have been routed to <strong>{opportunity.organizer}</strong>. You'll receive updates at maya.lin@college.edu!
                </p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4">
                <div className="space-y-1 text-left">
                  <span className="bg-brand-purple/10 text-brand-purple text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display select-none">
                    Apply for {opportunity.type}
                  </span>
                  <h3 className="text-xl font-bold text-brand-text font-display pt-1 leading-snug">
                    {opportunity.title}
                  </h3>
                  <p className="text-xs text-brand-text-sec/75">
                    Employer: <strong>{opportunity.organizer}</strong>
                  </p>
                </div>

                <hr className="border-brand-lavender/25" />

                <div className="grid grid-cols-2 gap-4 bg-white p-3.5 rounded-2xl border border-brand-lavender/15 text-left text-xs font-semibold text-brand-text-sec leading-none select-none">
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-brand-text-sec/40 mb-1">Student</p>
                    <p className="text-brand-text">Maya Lin</p>
                  </div>
                  <div>
                    <p className="text-[9px] uppercase tracking-wider text-brand-text-sec/40 mb-1">Major</p>
                    <p className="text-brand-text truncate">Communication & CS</p>
                  </div>
                </div>

                <div className="space-y-1.5 text-left">
                  <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider font-display">Introduce Yourself (Cover Note)</label>
                  <textarea
                    value={applicantNote}
                    onChange={(e) => setApplicantNote(e.target.value)}
                    rows={4}
                    placeholder={`Tell ${opportunity.organizer} why you're interested in this opportunity and highlight your experience...`}
                    className="w-full px-4 py-3 bg-white border border-brand-lavender/70 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all text-brand-text"
                    required
                  />
                </div>

                <div className="flex gap-3 pt-3 border-t border-brand-lavender/25">
                  <Button
                    type="button"
                    variant="outline"
                    size="md"
                    onClick={() => setShowApplyModal(false)}
                    className="w-full border-brand-purple/15 hover:border-brand-purple"
                  >
                    Cancel
                  </Button>
                  
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="w-full flex items-center justify-center space-x-2"
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
        <div className="fixed bottom-6 right-6 z-50 bg-brand-text text-white text-xs font-semibold px-4.5 py-3.5 rounded-full shadow-lg flex items-center space-x-2 border border-white/10 animate-bounce">
          <span>Opportunity link copied! Send to classmates</span>
        </div>
      )}
    </div>
  );
};

export default OpportunityDetails;

import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import Button from '../components/Button';
import { Calendar, MapPin, Heart, Share2, Users, ArrowLeft, Check, Sparkles, X, Sparkle } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const { events, selectedEventId, profile, rsvpEvent, saveEvent, setCurrentPage, setSelectedEventId } = useApp();
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  const event = events.find(e => e.id === selectedEventId) || events[0];

  useEffect(() => {
    if (!event) {
      setCurrentPage('explore');
    }
  }, [event, setCurrentPage]);

  if (!event) return null;

  const isRsvped = profile.rsvpEventIds.includes(event.id);
  const isSaved = profile.savedEventIds.includes(event.id);

  const categoryStyles: Record<string, string> = {
    Social: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Career: 'bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20',
    Sports: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Culture: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Academic: 'bg-[#0F766E]/10 text-[#0F766E] border border-[#0F766E]/20',
    Wellness: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
    Volunteer: 'bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/20',
  };

  const getExpectations = (cat: string) => {
    switch (cat) {
      case 'Social':
      case 'Culture':
        return [
          'Warm welcome & relaxed community vibe',
          'Free snacks, pizza, and craft drinks',
          'Fun icebreaker games and friendly student hosts',
          'No formal dress code—just come as you are!'
        ];
      case 'Career':
      case 'Academic':
        return [
          'Informal panels & casual Q&A slots',
          'Complimentary coffee & campus pastries',
          'Practical tip sheets (resumes, portfolios, Github)',
          'Alumni networks eager to meet undergraduates'
        ];
      case 'Wellness':
      case 'Sports':
        return [
          'Comfortable pace suitable for all fitness levels',
          'Complimentary smoothies and water provided',
          'Mindful grounding exercises and screen breaks',
          'Bring walking/running shoes and positive vibes'
        ];
      default:
        return [
          'Fun collaborative activities and discussions',
          'Free resources, guides, and takeaways',
          'Opportunities to start club projects',
          'Inclusive atmosphere welcoming all students'
        ];
    }
  };

  const similarEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  const displayedSimilar = similarEvents.length > 0 
    ? similarEvents 
    : events.filter(e => e.id !== event.id).slice(0, 3);

  const handleRsvpClick = () => {
    rsvpEvent(event.id);
    if (!isRsvped) {
      setShowRsvpModal(true);
    }
  };

  const handleShareClick = () => {
    const mockUrl = `${window.location.origin}/#event/${event.id}`;
    navigator.clipboard.writeText(mockUrl).then(() => {
      setShowShareToast(true);
      setTimeout(() => setShowShareToast(false), 2500);
    });
  };

  const handleBackClick = () => {
    setCurrentPage('explore');
  };

  const handleSimilarClick = (evtId: string) => {
    setSelectedEventId(evtId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 fade-in relative pb-24 text-left select-none bg-transparent text-[#111111]">
      {/* Back Button Link */}
      <button 
        onClick={handleBackClick}
        className="flex items-center space-x-2 text-sm text-[#555555] hover:text-[#FF7A1A] font-bold group transition-colors select-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to explore</span>
      </button>

      {/* Main Grid Layout: Banner & Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Columns: Details & Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Big Immersive Banner Container */}
          <div className="relative h-64 sm:h-96 rounded-[2rem] overflow-hidden border border-gray-200/80 bg-[#F7F8FA]">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* Soft wash gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
            
            {/* Sparkles over banner */}
            <div className="absolute top-6 right-6 text-gray-700 pointer-events-none animate-pulse">
              <Sparkle className="w-6 h-6 text-[#FF7A1A]" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-[#111111] space-y-2.5 text-left">
              <span className={`inline-block px-3 py-1 rounded-full text-[10px] uppercase tracking-wider font-bold ${categoryStyles[event.category]} shadow-sm`}>
                {event.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-display leading-tight tracking-tight uppercase">
                {event.title}
              </h1>
              <p className="text-xs sm:text-sm text-[#555555] font-semibold">
                Hosted by <span className="underline hover:text-[#FF7A1A] cursor-pointer transition-colors" onClick={() => setCurrentPage('communities')}>{event.organizer}</span>
              </p>
            </div>
          </div>

          {/* Description Details Card */}
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-gray-200/80 shadow-sm space-y-4">
            <h2 className="text-2xl font-display text-[#111111] uppercase tracking-tight border-b border-gray-100 pb-3 font-sans">
              About the Event
            </h2>
            <p className="text-[#555555] leading-relaxed text-sm sm:text-base whitespace-pre-line font-sans font-medium">
              {event.description}
            </p>
          </div>

          {/* What to Expect Section */}
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-gray-200/80 space-y-6 shadow-sm">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-[#FF7A1A]" />
              <h2 className="text-2xl font-display text-[#111111] uppercase tracking-tight font-sans">
                What to Expect
              </h2>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getExpectations(event.category).map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-[#555555] leading-relaxed font-sans font-medium">
                  <div className="w-5 h-5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center flex-shrink-0 text-xs text-[#FF7A1A] font-bold mt-0.5 select-none">
                    ✦
                  </div>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: RSVP Actions Widget */}
        <div className="space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200/80 shadow-sm space-y-6 sticky top-24">
            
            {/* Event Stats / Highlights */}
            <div className="space-y-5">
              
              {/* Date */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/15 flex items-center justify-center flex-shrink-0 text-[#FF7A1A]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="font-sans">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-[#555555]/60">Date & Time</h4>
                  <p className="text-sm font-bold text-[#111111] mt-0.5">{event.date}</p>
                  <p className="text-xs text-[#555555] font-semibold">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#F7F8FA] border border-gray-200 flex items-center justify-center flex-shrink-0 text-[#FF7A1A]">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="font-sans">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-[#555555]/60">Location</h4>
                  <p className="text-sm font-bold text-[#111111] mt-0.5 leading-snug">{event.location}</p>
                </div>
              </div>

              {/* RSVP Count & Attendee Avatars Group */}
              <div className="flex items-start space-x-3.5 border-t border-gray-100 pt-4">
                <div className="w-10 h-10 rounded-xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/15 flex items-center justify-center flex-shrink-0 text-[#FF7A1A]">
                  <Users className="w-5 h-5" />
                </div>
                <div className="font-sans">
                  <h4 className="text-[10px] font-black uppercase tracking-wider text-[#555555]/60">Attendees</h4>
                  
                  {/* Overlapping Attendee Avatars */}
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex -space-x-2 select-none">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80" alt="Attendee" className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" />
                      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=80" alt="Attendee" className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" />
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" alt="Attendee" className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" />
                    </div>
                    <p className="text-xs font-bold text-[#111111]">
                      {event.attendeeCount} going
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <hr className="border-gray-100" />

            {/* RSVP and Action Buttons */}
            <div className="space-y-3.5">
              
              {/* Primary CTA: "I'm Going" */}
              <Button
                variant={isRsvped ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleRsvpClick}
                className="w-full flex items-center justify-center space-x-2 text-sm font-bold shadow-md shadow-[#FF7A1A]/10"
              >
                {isRsvped ? (
                  <>
                    <Check className="w-5 h-5 stroke-[3px]" />
                    <span>I'm Going</span>
                  </>
                ) : (
                  <span>I'm Going</span>
                )}
              </Button>

              <div className="grid grid-cols-2 gap-3">
                {/* Secondary CTA: "Save Event" */}
                <Button
                  variant="outline"
                  size="md"
                  onClick={() => saveEvent(event.id)}
                  className="flex items-center justify-center space-x-1.5 border-gray-200 hover:border-[#FF7A1A]/40 font-bold text-[#111111] bg-white"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'text-[#FF7A1A] fill-[#FF7A1A]' : 'text-[#555555]/50'}`} />
                  <span>{isSaved ? 'Saved' : 'Save'}</span>
                </Button>

                {/* Share Button */}
                <Button
                  variant="outline"
                  size="md"
                  onClick={handleShareClick}
                  className="flex items-center justify-center space-x-1.5 border-gray-200 hover:border-[#FF7A1A]/40 font-bold text-[#111111] bg-white"
                >
                  <Share2 className="w-4 h-4 text-[#555555]/50" />
                  <span>Share</span>
                </Button>
              </div>
            </div>

            {/* Attendance indicator confirmation card */}
            {isRsvped && (
              <div className="bg-[#FF7A1A]/10 border border-[#FF7A1A]/15 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-[#FF7A1A] flex items-center justify-center">
                  <Check className="w-4 h-4 text-[#FF7A1A] mr-1.5 flex-shrink-0 stroke-[3px]" />
                  Your spot is locked in! Enjoy!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Events Section */}
      <section className="space-y-6 pt-8 border-t border-gray-100">
        <h2 className="text-2xl font-display text-[#111111] uppercase tracking-tight">
          Similar Gatherings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {displayedSimilar.map((similarEvt) => (
            <div 
              key={similarEvt.id} 
              onClick={() => handleSimilarClick(similarEvt.id)}
              className="cursor-pointer"
            >
              <EventCard event={similarEvt} />
            </div>
          ))}
        </div>
      </section>

      {/* RSVP Success Modal Dialog (Apple Invites style) */}
      {showRsvpModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/50 backdrop-blur-md">
          <div className="bg-white rounded-[2rem] p-8 max-w-md w-full border border-gray-100 shadow-2xl relative text-center space-y-6 animate-fadeIn text-[#111111]">
            {/* Close Button */}
            <button 
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-[#555555]/40 hover:text-[#111111] hover:bg-[#F7F8FA] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Celebration Sparkles */}
            <div className="w-16 h-16 rounded-full bg-[#FF7A1A]/10 mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-[#FF7A1A] animate-pulse" />
            </div>

            {/* Text details */}
            <div className="space-y-2 text-center font-sans">
              <h3 className="text-2xl font-bold text-[#111111]">You’re Going!</h3>
              <p className="text-sm text-[#555555] leading-relaxed font-medium">
                Awesome! You are officially confirmed for this campus event. You can access all your upcoming RSVPs on your <span className="font-bold text-[#FF7A1A] underline cursor-pointer" onClick={() => { setShowRsvpModal(false); setCurrentPage('profile'); }}>Student Profile</span>.
              </p>
            </div>

            {/* Action button */}
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowRsvpModal(false)}
              className="w-full shadow-sm font-bold"
            >
              Done
            </Button>
          </div>
        </div>
      )}

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-white text-[#111111] text-xs font-semibold px-4.5 py-3.5 rounded-full shadow-2xl flex items-center space-x-2 border border-gray-100 animate-bounce">
          <Sparkle className="w-4.5 h-4.5 text-[#FF7A1A] animate-spin" />
          <span>Event invite link copied! Send it to classmates</span>
        </div>
      )}
    </div>
  );
};
export default EventDetails;

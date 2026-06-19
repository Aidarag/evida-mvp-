import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import Button from '../components/Button';
import { Calendar, MapPin, Heart, Share2, Users, ArrowLeft, Check, Sparkles, X, Sparkle } from 'lucide-react';

export const EventDetails: React.FC = () => {
  const { events, selectedEventId, profile, rsvpEvent, saveEvent, setCurrentPage, setSelectedEventId } = useApp();
  const [showRsvpModal, setShowRsvpModal] = useState(false);
  const [showShareToast, setShowShareToast] = useState(false);

  // Retrieve selected event or fallback to the first event
  const event = events.find(e => e.id === selectedEventId) || events[0];

  useEffect(() => {
    // If we somehow don't have an event, send back to explore
    if (!event) {
      setCurrentPage('explore');
    }
  }, [event, setCurrentPage]);

  if (!event) return null;

  const isRsvped = profile.rsvpEventIds.includes(event.id);
  const isSaved = profile.savedEventIds.includes(event.id);

  // Category styling
  const categoryStyles: Record<string, string> = {
    Social: 'bg-rose-50 text-rose-600 border border-rose-100',
    Career: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
    Sports: 'bg-orange-50 text-orange-600 border border-orange-100',
    Culture: 'bg-amber-50 text-amber-600 border border-amber-100',
    Academic: 'bg-purple-50 text-purple-600 border border-purple-100',
    Wellness: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
    Volunteer: 'bg-teal-50 text-teal-600 border border-teal-100',
  };

  // What to Expect items based on Category
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

  // Find similar events (same category, excluding current event)
  const similarEvents = events
    .filter(e => e.category === event.category && e.id !== event.id)
    .slice(0, 3);

  // Fallback to any other events if no same-category events found
  const displayedSimilar = similarEvents.length > 0 
    ? similarEvents 
    : events.filter(e => e.id !== event.id).slice(0, 3);

  const handleRsvpClick = () => {
    // Toggle RSVP
    rsvpEvent(event.id);
    // If RSVPing, show the success confirmation state
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
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-10 fade-in relative pb-16">
      {/* Back Button Link */}
      <button 
        onClick={handleBackClick}
        className="flex items-center space-x-2 text-sm text-brand-text/60 hover:text-brand-purple font-bold font-display group transition-colors select-none"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to explore</span>
      </button>

      {/* Main Grid Layout: Banner & Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left/Middle Columns: Details & Info */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Big Immersive Banner Container */}
          <div className="relative h-64 sm:h-96 rounded-[2rem] overflow-hidden shadow-sm border border-brand-lavender/30 bg-brand-lavender/10">
            <img 
              src={event.image} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            {/* Dark wash gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />
            
            {/* Sparkles over banner */}
            <div className="absolute top-6 right-6 text-white/40 pointer-events-none animate-pulse">
              <Sparkle className="w-6 h-6" />
            </div>

            <div className="absolute bottom-6 left-6 right-6 text-white space-y-2.5">
              <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-display ${categoryStyles[event.category]} border-none shadow-md shadow-black/10`}>
                {event.category}
              </span>
              <h1 className="text-3xl sm:text-5xl font-bold font-display leading-tight tracking-tight">
                {event.title}
              </h1>
              <p className="text-xs sm:text-sm text-brand-bg/85 font-semibold">
                Hosted by <span className="underline hover:text-brand-peach cursor-pointer transition-colors" onClick={() => setCurrentPage('communities')}>{event.organizer}</span>
              </p>
            </div>
          </div>

          {/* Description Details Card */}
          <div className="bg-white p-6 sm:p-10 rounded-[2rem] border border-brand-lavender/25 shadow-sm space-y-6">
            <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-text border-b border-brand-lavender/25 pb-3">
              About the Event
            </h2>
            <p className="text-brand-text-sec leading-relaxed text-sm sm:text-base whitespace-pre-line">
              {event.description}
            </p>
          </div>

          {/* What to Expect Section (Required Screen Element) */}
          <div className="bg-brand-peach/10 p-6 sm:p-10 rounded-[2rem] border border-brand-peach/30 space-y-6">
            <div className="flex items-center space-x-2.5">
              <Sparkles className="w-5 h-5 text-brand-purple" />
              <h2 className="text-xl sm:text-2xl font-bold font-display text-brand-text">
                What to Expect
              </h2>
            </div>
            
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {getExpectations(event.category).map((item, idx) => (
                <li key={idx} className="flex items-start space-x-2.5 text-sm text-brand-text-sec leading-relaxed">
                  <div className="w-5 h-5 rounded-full bg-brand-peach/35 flex items-center justify-center flex-shrink-0 text-xs text-brand-purple font-bold mt-0.5">
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
          <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-brand-lavender/25 shadow-sm space-y-6 sticky top-24">
            
            {/* Event Stats / Highlights */}
            <div className="space-y-5">
              
              {/* Date */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                  <Calendar className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-sec/50 font-display">Date & Time</h4>
                  <p className="text-sm font-semibold text-brand-text mt-0.5">{event.date}</p>
                  <p className="text-xs text-brand-text-sec font-medium">{event.time}</p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start space-x-3.5">
                <div className="w-10 h-10 rounded-xl bg-brand-lavender/40 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand-purple/80" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-sec/50 font-display">Location</h4>
                  <p className="text-sm font-semibold text-brand-text mt-0.5 leading-snug">{event.location}</p>
                </div>
              </div>

              {/* RSVP Count & Attendee Avatars Group */}
              <div className="flex items-start space-x-3.5 border-t border-brand-lavender/20 pt-4">
                <div className="w-10 h-10 rounded-xl bg-brand-peach/30 flex items-center justify-center flex-shrink-0">
                  <Users className="w-5 h-5 text-brand-purple" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-brand-text-sec/50 font-display">Attendees</h4>
                  
                  {/* Overlapping Attendee Avatars (Required Detail) */}
                  <div className="flex items-center space-x-2 mt-1">
                    <div className="flex -space-x-2 select-none">
                      <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80" alt="Attendee" className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" />
                      <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=80" alt="Attendee" className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" />
                      <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" alt="Attendee" className="w-6 h-6 rounded-full border border-white object-cover shadow-sm" />
                    </div>
                    <p className="text-sm font-semibold text-brand-text">
                      {event.attendeeCount} going
                    </p>
                  </div>
                </div>
              </div>

            </div>

            <hr className="border-brand-lavender/20" />

            {/* RSVP and Action Buttons */}
            <div className="space-y-3.5">
              
              {/* Primary CTA: "I'm Going" */}
              <Button
                variant={isRsvped ? 'secondary' : 'primary'}
                size="lg"
                onClick={handleRsvpClick}
                className="w-full flex items-center justify-center space-x-2 text-base font-bold shadow-md shadow-brand-purple/10"
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
                  className="flex items-center justify-center space-x-1.5 border-brand-purple/15 hover:border-brand-purple"
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'text-brand-purple fill-brand-purple animate-pulse' : 'text-brand-text/50'}`} />
                  <span>{isSaved ? 'Saved Event' : 'Save Event'}</span>
                </Button>

                {/* Share Button */}
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

            {/* Attendance indicator confirmation card */}
            {isRsvped && (
              <div className="bg-brand-purple/5 border border-brand-purple/10 rounded-2xl p-4 text-center">
                <p className="text-xs font-bold text-brand-purple font-display flex items-center justify-center">
                  <Check className="w-4 h-4 text-brand-purple mr-1.5 flex-shrink-0 stroke-[3px]" />
                  Your spot is locked in! Enjoy!
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Similar Events Section */}
      <section className="space-y-6 pt-8 border-t border-brand-lavender/25">
        <h2 className="text-2xl font-bold text-brand-text font-display">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-text/30 backdrop-blur-sm transition-all duration-300">
          <div className="bg-brand-bg rounded-[2rem] p-8 max-w-md w-full border border-brand-lavender shadow-2xl relative text-center space-y-6 animate-fadeIn">
            {/* Close Button */}
            <button 
              onClick={() => setShowRsvpModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-brand-text/40 hover:text-brand-text hover:bg-brand-lavender/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Celebration Sparkles */}
            <div className="w-16 h-16 rounded-full bg-brand-purple/10 mx-auto flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-brand-purple animate-pulse" />
            </div>

            {/* Text details */}
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-brand-text">You’re Going!</h3>
              <p className="text-sm text-brand-text-sec leading-relaxed">
                Awesome! You are officially confirmed for this campus event. You can access all your upcoming RSVPs on your <span className="font-bold text-brand-purple underline cursor-pointer" onClick={() => { setShowRsvpModal(false); setCurrentPage('profile'); }}>Student Profile</span>.
              </p>
            </div>

            {/* Action button */}
            <Button
              variant="primary"
              size="md"
              onClick={() => setShowRsvpModal(false)}
              className="w-full shadow-sm"
            >
              Add to My Calendar
            </Button>
          </div>
        </div>
      )}

      {/* Share Toast Notification */}
      {showShareToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-brand-text text-white text-xs font-semibold px-4.5 py-3.5 rounded-full shadow-lg flex items-center space-x-2 border border-white/10 animate-bounce">
          <Sparkle className="w-4.5 h-4.5 text-brand-peach animate-spin" />
          <span>Event invite link copied! Send it to classmates</span>
        </div>
      )}
    </div>
  );
};
export default EventDetails;

import React from 'react';
import { useApp } from '../context/AppContext';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { Compass, Landmark, Sparkles, Smile, Users } from 'lucide-react';

export const Home: React.FC = () => {
  const { events, communities, setCurrentPage } = useApp();

  // Pick first 3 events and first 3 communities as featured
  const featuredEvents = events.slice(0, 3);
  const featuredCommunities = communities.slice(0, 3);

  return (
    <div className="fade-in pb-12 w-full">
      {/* Hero Section */}
      <HeroSection />

      {/* University Trust Section */}
      <div className="bg-slate-50/60 py-8 border-b border-slate-100/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-[10px] sm:text-xs font-bold uppercase tracking-widest text-slate-400 font-display mb-4">
            Connecting students across campuses
          </p>
          <div className="flex flex-wrap justify-center items-center gap-x-8 sm:gap-x-12 gap-y-4 opacity-50 font-display font-black text-slate-600 text-sm sm:text-base tracking-wider">
            <span>STANFORD</span>
            <span>M.I.T.</span>
            <span>HARVARD</span>
            <span>U.C. BERKELEY</span>
            <span>GREENWOOD</span>
          </div>
        </div>
      </div>

      {/* Main Content Sections */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Featured Events */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text font-display">
              Featured Events
            </h2>
            <p className="text-sm text-brand-text-sec">
              Handpicked gatherings and workshops happening on campus this week.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage('explore')}
            className="flex items-center space-x-1.5 border-brand-purple/20 hover:border-brand-purple hover:bg-brand-purple/5"
          >
            <span>See All Events</span>
            <span>→</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* 4 Feature Blocks */}
      <section className="bg-brand-lavender/10 rounded-3xl p-8 sm:p-12 border border-brand-lavender/25 relative overflow-hidden">
        {/* Playful subtle highlight in background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-purple/5 rounded-bl-full pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text font-display mb-3">
            Designed for real college life.
          </h2>
          <p className="text-sm sm:text-base text-brand-text-sec max-w-xl mx-auto leading-relaxed">
            Forget messy group chats and confusing flyers. Evida gathers everything you care about into one clean, friendly square.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Find Your People */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-purple/20 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-brand-purple/10 flex items-center justify-center mb-4 text-brand-purple group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2 text-brand-text">Find Your People</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              Connect with classmates who share your exact niche interests, background, and passions.
            </p>
          </div>
          
          {/* Discover Events */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-purple/20 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 flex items-center justify-center mb-4 text-brand-blue group-hover:scale-110 transition-transform">
              <Compass className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2 text-brand-text">Discover Events</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              From large outdoor festivals and mixers to intimate study blocks and workshops.
            </p>
          </div>

          {/* Create Memories */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-purple/20 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Smile className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2 text-brand-text">Create Memories</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              RSVP to build your personal memory board of your favorite campus chapters.
            </p>
          </div>

          {/* Build Community */}
          <div className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-brand-purple/20 hover:shadow-md transition-all duration-300 flex flex-col items-center text-center group">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-base mb-2 text-brand-text">Build Community</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              Start your own student circle, manage host permissions, and invite members.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Communities */}
      <section className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-brand-text font-display">
              Active Communities
            </h2>
            <p className="text-sm text-brand-text-sec">
              Join clubs and campus chapters, and connect with peers outside the classroom.
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage('communities')}
            className="flex items-center space-x-1.5 border-brand-purple/20 hover:border-brand-purple hover:bg-brand-purple/5"
          >
            <span>See All Clubs</span>
            <span>→</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {featuredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>

      {/* Creative Welcome / Call to Action */}
      <section className="text-center py-8 max-w-xl mx-auto space-y-6">
        <div className="flex justify-center items-center space-x-2">
          <Sparkles className="w-5 h-5 text-brand-purple fill-brand-purple/20" />
          <Smile className="w-8 h-8 text-brand-purple" />
          <Sparkles className="w-4 h-4 text-brand-peach fill-brand-peach/20" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold text-brand-text font-display">
          Ready to experience campus life?
        </h3>
        <p className="text-sm text-brand-text-sec leading-relaxed">
          Log in with your college interests to start building your profile, discovering unique events, and RSVPing with a single click.
        </p>
        <div className="flex justify-center pt-2">
          <Button
            variant="primary"
            size="md"
            onClick={() => setCurrentPage('explore')}
            className="shadow-md shadow-brand-purple/15 px-8"
          >
            Explore Campus Events
          </Button>
        </div>
      </section>
      </div>
    </div>
  );
};
export default Home;

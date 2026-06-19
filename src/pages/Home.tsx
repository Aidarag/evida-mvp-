import React from 'react';
import { useApp } from '../context/AppContext';
import HeroSection from '../components/HeroSection';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { CalendarRange, Compass, Landmark, Sparkles, Smile } from 'lucide-react';

export const Home: React.FC = () => {
  const { events, communities, setCurrentPage } = useApp();

  // Pick first 3 events and first 3 communities as featured
  const featuredEvents = events.slice(0, 3);
  const featuredCommunities = communities.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 space-y-16 fade-in pb-12">
      {/* Hero Section */}
      <HeroSection />

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

      {/* Why Evida? Info Cards */}
      <section className="bg-brand-lavender/15 rounded-3xl p-8 sm:p-12 border border-brand-lavender/30 relative overflow-hidden">
        {/* Playful sparkle in background */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-brand-peach/20 rounded-bl-full pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-text font-display mb-3">
            Designed for real college life.
          </h2>
          <p className="text-sm sm:text-base text-brand-text-sec max-w-xl mx-auto leading-relaxed">
            Forget messy group chats and confusing flyers. Evida gathers everything you care about into one clean, friendly square.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-brand-lavender/15 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-purple/10 flex items-center justify-center mb-4">
              <CalendarRange className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-brand-text">Discover Instantly</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              Find social mixers, game nights, career talks, and volunteer projects happening today.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-2xl border border-brand-lavender/15 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-peach/30 flex items-center justify-center mb-4">
              <Landmark className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-brand-text">Find Your People</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              Join clubs and communities that share your passions, from tech enthusiasts to creative studios.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-brand-lavender/15 text-center flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-brand-lavender/50 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6 text-brand-purple" />
            </div>
            <h3 className="font-display font-bold text-lg mb-2 text-brand-text">Simple RSVP</h3>
            <p className="text-xs text-brand-text-sec leading-relaxed">
              One-click RSVP keeps your calendar clear and adds events directly to your profile memory board.
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
  );
};
export default Home;

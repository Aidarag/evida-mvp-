import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Calendar, UserPlus, Flame, Star, Palette, Check } from 'lucide-react';
import Button from './Button';

export const HeroSection: React.FC = () => {
  const { setCurrentPage } = useApp();

  return (
    <div className="relative overflow-hidden bg-gradient-to-tr from-brand-lavender/30 via-brand-peach/15 to-white py-16 sm:py-24 px-6 sm:px-12 rounded-[2rem] border border-brand-lavender/30 max-w-7xl mx-auto my-6 shadow-sm">
      {/* Background blobs for premium soft Luma aesthetics */}
      <div className="absolute top-10 left-10 w-64 h-64 bg-brand-purple/5 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-brand-peach/20 rounded-full blur-3xl -z-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-brand-lavender/50 rounded-full blur-2xl -z-10 pointer-events-none opacity-40" />

      {/* Sparks/Stars decoration */}
      <div className="absolute top-12 right-1/4 text-brand-purple/30 animate-pulse pointer-events-none hidden sm:block">
        <Sparkles className="w-8 h-8" />
      </div>
      <div className="absolute bottom-12 left-12 text-brand-peach/60 animate-bounce pointer-events-none hidden sm:block">
        <Star className="w-5 h-5 fill-brand-peach" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative">
        {/* Left Side: Taglines & Details */}
        <div className="lg:col-span-7 space-y-8 text-left">
          
          {/* Welcoming Top Tag Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-brand-lavender/40 text-xs font-bold text-brand-purple rounded-full shadow-sm">
            <Sparkles className="w-4 h-4 text-brand-purple fill-brand-purple/20 animate-spin" style={{ animationDuration: '3s' }} />
            <span className="font-display tracking-tight font-bold">Find your people. Build your story.</span>
          </div>

          {/* Heading with Accent Typography */}
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight text-brand-text font-display leading-[1.05]">
            Find your <br />
            <span className="bg-gradient-to-r from-brand-purple via-[#8566ff] to-[#a890ff] bg-clip-text text-transparent">
              people
            </span>
            .
          </h1>

          {/* Subheading */}
          <p className="text-lg sm:text-xl text-brand-text-sec leading-relaxed max-w-xl">
            Discover events, communities, and opportunities that make campus life unforgettable.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage('explore')}
              className="flex items-center justify-center space-x-2 shadow-lg shadow-brand-purple/20"
            >
              <Calendar className="w-5 h-5" />
              <span>Explore Events</span>
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setCurrentPage('profile')}
              className="flex items-center justify-center space-x-2 border border-brand-lavender/35"
            >
              <UserPlus className="w-5 h-5 text-brand-purple" />
              <span>Join Evida</span>
            </Button>
          </div>

          {/* Social Proof Row */}
          <div className="flex items-center space-x-3.5 pt-6 border-t border-brand-lavender/25 max-w-md select-none">
            {/* Avatars Overlap */}
            <div className="flex -space-x-3">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=100" alt="Student" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=100" alt="Student" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Student" className="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" />
              <div className="w-8 h-8 rounded-full border-2 border-white bg-brand-lavender flex items-center justify-center text-[10px] font-extrabold text-brand-purple font-display shadow-sm">
                +1.2k
              </div>
            </div>
            <p className="text-xs text-brand-text-sec font-medium leading-tight">
              Join <span className="font-bold text-brand-purple font-display">1,200+ students</span> discovering communities this week!
            </p>
          </div>

        </div>

        {/* Right Side: Joyful Floating Cards & Student Collage */}
        <div className="lg:col-span-5 relative min-h-[360px] flex items-center justify-center mt-6 lg:mt-0 select-none">
          
          {/* Central Main Student Photo Polaroid Card */}
          <div className="relative z-10 w-64 bg-white p-4 pb-6 rounded-2xl shadow-xl border border-brand-lavender/25 transform rotate-2 animate-float-slow hover:rotate-0 transition-transform duration-300">
            <div className="relative aspect-square rounded-xl overflow-hidden bg-brand-bg">
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=500" 
                alt="Students laughing" 
                className="w-full h-full object-cover"
              />
              <span className="absolute bottom-2.5 right-2.5 px-2.5 py-0.5 rounded-full text-[9px] font-bold bg-white/95 text-brand-purple font-display border border-brand-lavender/30">
                #CampusLife
              </span>
            </div>
            <p className="mt-4 text-sm font-accent text-brand-text text-center font-semibold leading-tight">
              “Found my people on day one!”
            </p>
          </div>

          {/* Floating Card 1: Event Preview (Top Left) */}
          <div className="absolute top-4 -left-4 z-20 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl shadow-md border border-brand-lavender/40 max-w-[170px] transform -rotate-6 animate-float-medium hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-rose-50 flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-4 h-4 text-brand-purple" />
              </div>
              <div className="text-left min-w-0">
                <h4 className="text-[11px] font-bold text-brand-text truncate font-display">Welcome Pizza Mixer</h4>
                <p className="text-[9px] text-brand-text-sec truncate font-medium">Tonight • 6:00 PM</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-brand-lavender/20 text-[9px] text-brand-text-sec font-semibold">
              <span className="text-brand-purple">128 attending</span>
              <div className="w-4 h-4 bg-brand-purple text-white rounded-full flex items-center justify-center">
                <Check className="w-2.5 h-2.5 stroke-[3.5px]" />
              </div>
            </div>
          </div>

          {/* Floating Card 2: Club Spotlight (Bottom Right) */}
          <div className="absolute bottom-2 -right-4 z-20 bg-white/95 backdrop-blur-md p-3.5 rounded-2xl shadow-lg border border-brand-lavender/40 max-w-[180px] transform rotate-6 animate-float-fast hover:rotate-0 transition-transform duration-300">
            <div className="flex items-center space-x-2.5">
              <div className="w-9 h-9 rounded-xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0">
                <Palette className="w-4.5 h-4.5 text-brand-purple" />
              </div>
              <div className="text-left">
                <h4 className="text-[11px] font-bold text-brand-text font-display leading-tight">Creative Studio</h4>
                <p className="text-[9px] text-brand-text-sec font-medium">95 members active</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5 mt-2 pt-2 border-t border-brand-lavender/20">
              <span className="text-[9px] px-2 py-0.5 rounded-full bg-brand-purple/10 text-brand-purple font-extrabold font-display">Join Club</span>
              <span className="text-[9px] text-brand-text-sec font-medium">Weekly collabs</span>
            </div>
          </div>

          {/* Floating Card 3: Opportunity Alert (Top Right) */}
          <div className="absolute top-2 right-2 z-0 bg-white/80 backdrop-blur-md py-2 px-3.5 rounded-xl shadow-sm border border-brand-lavender/35 flex items-center space-x-2 transform -rotate-2 pointer-events-none">
            <Flame className="w-3.5 h-3.5 text-brand-peach fill-brand-peach" />
            <span className="text-[10px] font-display font-bold text-brand-text">Internship Alert!</span>
          </div>

        </div>
      </div>
    </div>
  );
};
export default HeroSection;

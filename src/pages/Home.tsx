import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowRight, Plus, Sparkles
} from 'lucide-react';
import EventCard from '../components/EventCard';
import CampusMap from '../components/CampusMap';

export const Home: React.FC = () => {
  const { 
    events, 
    communities, 
    setCurrentPage, 
    setExploreActiveTab,
    setSelectedEventId,
    setSelectedCommunityId
  } = useApp();

  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
    setCurrentPage('event-details');
  };

  const handleClubClick = (id: string) => {
    setSelectedCommunityId(id);
    setCurrentPage('community-profile');
  };

  const handleNavClick = (page: any) => {
    setCurrentPage(page);
  };

  // Section Filters
  const featuredEvents = events.filter(evt => evt.id === 'evt-homecoming' || evt.id === 'evt-gala' || evt.id === 'evt-career-mixer');
  const discoverEvents = events.slice(0, 6);
  const recruitingOrgs = communities.slice(0, 3);
  
  // Custom mock testimonials for HBCU collegiate energy
  const testimonials = [
    {
      quote: "Evida is how I found my crew. The homecoming concert quad energy was the exact moment I realized this is where I belong.",
      author: "Maya Lin",
      role: "Class of '26 • Women in STEM",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "Discovering student hackathons and joining BSU completely transformed my engineering path. This is the heartbeat of campus life.",
      author: "Tariq Al-Fayed",
      role: "Class of '25 • Tech Innovators",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80"
    },
    {
      quote: "Hosting open mic sessions and sharing student stories was incredibly simple. These are the moments I'll remember long after graduation.",
      author: "Aida Garba",
      role: "Class of '26 • Computer Science",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80"
    }
  ];

  return (
    <div className="space-y-20 fade-in pb-24 text-left select-none bg-transparent">

      {/* 1. HERO SECTION (Luma-inspired Immersive Backdrop) */}
      <section className="relative w-full h-[620px] md:h-[680px] overflow-hidden flex items-center justify-center border-b border-gray-100 bg-[#F7F8FA]">
        {/* Cinematic Student Crowd Cover Background */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/campus_festival.jpg" 
            alt="Campus student festival quad" 
            className="w-full h-full object-cover opacity-90 scale-105 filter brightness-95" 
          />
          {/* Subtle Warm Gradient Wash to White Bottom */}
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-black/10" />
        </div>

        {/* Hero Copy overlay */}
        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 space-y-6 pt-12">
          <div className="inline-flex items-center space-x-2 bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 px-3.5 py-1 rounded-full text-[#FF7A1A] text-xs font-black uppercase tracking-wider animate-pulse">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Digital Home of Campus Life</span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black text-[#111111] leading-none uppercase tracking-tighter drop-shadow-sm font-display">
            College Ends.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF7A1A] to-[#FF8A4C]">Memories Don't.</span>
          </h1>

          <p className="text-base sm:text-lg text-[#555555] max-w-2xl mx-auto font-sans leading-relaxed font-medium">
            Discover student-run gatherings, campus organizations, internships, and the lifelong friendships shaping your college experience.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => handleNavClick('create-event')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#FF7A1A] hover:bg-[#FF8A4C] text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-[#FF7A1A]/20 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center justify-center space-x-2"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span>Create Event</span>
            </button>
            
            <button
              onClick={() => handleNavClick('explore')}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/90 hover:bg-white text-[#111111] border border-gray-200 font-bold text-xs uppercase tracking-widest shadow-sm hover:shadow transition-all hover:scale-105 active:scale-95 cursor-pointer"
            >
              Explore Events
            </button>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        
        {/* 2. FEATURED EVENTS SECTION */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-gray-100 pb-3">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A1A]">Curated Highlights</span>
              <h2 className="text-2xl sm:text-3xl font-display text-[#111111] uppercase tracking-tight">Featured Happenings</h2>
            </div>
            <button 
              onClick={() => { setExploreActiveTab('events'); setCurrentPage('explore'); }}
              className="text-[11px] font-bold text-[#FF7A1A] hover:underline uppercase tracking-wide cursor-pointer"
            >
              See All Events →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredEvents.map(evt => (
              <EventCard key={`featured-${evt.id}`} event={evt} />
            ))}
          </div>
        </section>

        {/* 3. DISCOVER EVENTS GRID (Spacious Scanning layout) */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-gray-100 pb-3">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#0F766E]">Explore Categories</span>
              <h2 className="text-2xl sm:text-3xl font-display text-[#111111] uppercase tracking-tight">Discover Campus Activities</h2>
            </div>
            <button
              onClick={() => { setExploreActiveTab('events'); setCurrentPage('explore'); }}
              className="text-[11px] font-bold text-[#0F766E] hover:underline uppercase tracking-wide cursor-pointer"
            >
              Explore Map & Hub →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {discoverEvents.map(evt => (
              <div 
                key={`discover-${evt.id}`}
                onClick={() => handleEventClick(evt.id)}
                className="cursor-pointer transition-transform hover:scale-[1.01]"
              >
                <EventCard event={evt} />
              </div>
            ))}
          </div>
        </section>

        {/* 4. STUDENT ORGANIZATIONS */}
        <section className="space-y-6">
          <div className="flex justify-between items-end border-b border-gray-100 pb-3">
            <div className="space-y-1.5 text-left">
              <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A1A]">Join the crew</span>
              <h2 className="text-2xl sm:text-3xl font-display text-[#111111] uppercase tracking-tight">Student Organizations</h2>
            </div>
            <button 
              onClick={() => { setExploreActiveTab('communities'); setCurrentPage('explore'); }}
              className="text-[11px] font-bold text-[#FF7A1A] hover:underline uppercase tracking-wide cursor-pointer"
            >
              Browse Clubs →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recruitingOrgs.map(org => (
              <div 
                key={`org-${org.id}`}
                onClick={() => handleClubClick(org.id)}
                className="bg-[#F7F8FA] hover:bg-[#FFFFFF] p-5 rounded-3xl border border-gray-200/60 hover:border-[#FF7A1A]/30 transition-all flex flex-col justify-between items-start cursor-pointer group shadow-sm hover:shadow-md h-52 text-left"
              >
                <div className="space-y-3 w-full">
                  <div className="flex justify-between items-center w-full">
                    <div className="w-12 h-12 rounded-2xl overflow-hidden border border-gray-200 shadow-inner bg-white flex-shrink-0">
                      <img src={org.image} alt={org.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[9px] font-black uppercase px-2.5 py-0.5 bg-[#FF7A1A]/10 text-[#FF7A1A] border border-[#FF7A1A]/15 rounded-full">
                      {org.category}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-[#111111] group-hover:text-[#FF7A1A] transition-colors truncate">{org.name}</h3>
                    <p className="text-xs text-[#555555] line-clamp-2 mt-1 leading-normal font-sans font-medium">{org.description}</p>
                  </div>
                </div>
                <div className="flex justify-between items-center w-full pt-2 border-t border-gray-200/50 text-xs font-bold text-[#FF7A1A]">
                  <span>{org.memberCount} active members</span>
                  <span className="group-hover:translate-x-1 transition-transform">Hub →</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5. CAMPUS HIGHLIGHTS (Visual Map Integration) */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center bg-[#F7F8FA] p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm text-left">
          <div className="lg:col-span-1 space-y-4">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0F766E]">Live View</span>
            <h2 className="text-3xl sm:text-4xl font-display text-[#111111] uppercase tracking-tight leading-none">Livingstone<br />Campus Map</h2>
            <p className="text-sm text-[#555555] leading-relaxed font-sans font-medium">
              Explore your campus and find out exactly what gatherings, sports games, and club activities are happening in real-time.
            </p>
            <div className="pt-2">
              <button 
                onClick={() => { setExploreActiveTab('events'); setCurrentPage('explore'); }}
                className="px-5 py-2.5 rounded-full bg-[#0F766E] hover:bg-[#115E59] text-white font-bold text-xs uppercase tracking-wide flex items-center space-x-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
              >
                <span>Full Map View</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          <div className="lg:col-span-2 w-full">
            <CampusMap />
          </div>
        </section>

        {/* 6. STUDENT TESTIMONIALS (The emotional layer) */}
        <section className="space-y-8 text-center max-w-5xl mx-auto">
          <div className="space-y-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-[#FF7A1A]">Campus Memories</span>
            <h2 className="text-3xl sm:text-4xl font-display text-[#111111] uppercase tracking-tight">The Moments We Hold Onto</h2>
            <p className="text-sm text-[#555555] max-w-xl mx-auto font-sans font-medium">Hear from students sharing their favorite memories shaped by Evida events.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((test, index) => (
              <div 
                key={index}
                className="bg-white p-6 sm:p-8 rounded-3xl border border-gray-100 shadow-sm flex flex-col justify-between items-center text-center space-y-6 relative overflow-hidden"
              >
                {/* Accent Gold Quote Symbol */}
                <div className="absolute -top-4 -left-2 text-gray-100 text-7xl font-black select-none pointer-events-none">“</div>
                
                <p className="text-sm text-[#555555] leading-relaxed italic font-sans font-medium relative z-10 flex-grow">
                  "{test.quote}"
                </p>

                <div className="flex flex-col items-center space-y-2 pt-2 border-t border-gray-100 w-full">
                  <img 
                    src={test.avatar} 
                    alt={test.author} 
                    className="w-10 h-10 rounded-full object-cover border border-gray-200 shadow-inner" 
                  />
                  <div>
                    <h4 className="text-xs font-black text-[#111111]">{test.author}</h4>
                    <p className="text-[10px] text-[#FF7A1A] font-bold">{test.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 7. BOTTOM HOST CALL-TO-ACTION */}
        <section className="pt-4">
          <div className="p-8 sm:p-12 rounded-[2.5rem] bg-gradient-to-br from-[#FF7A1A]/8 via-[#FF7A1A]/3 to-transparent border border-[#FF7A1A]/15 flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left relative overflow-hidden shadow-sm">
            {/* Soft Warm Glow Overlay */}
            <div className="absolute right-0 top-0 w-64 h-64 bg-[#FF7A1A]/8 rounded-full blur-3xl pointer-events-none" />
            
            <div className="space-y-2">
              <h3 className="text-2xl font-black text-[#111111] uppercase tracking-tight font-display">Hosting an event or study session?</h3>
              <p className="text-sm text-[#555555] max-w-xl font-sans font-medium leading-relaxed">
                Connect directly with your campus. Post student assemblies, design socials, or career meetups onto the campus quad feed instantly.
              </p>
            </div>

            <button 
              onClick={() => handleNavClick('create-event')}
              className="px-7 py-4 rounded-full bg-[#FF7A1A] hover:bg-[#FF8A4C] text-white font-black text-xs uppercase tracking-widest flex items-center gap-2 cursor-pointer shadow-lg shadow-[#FF7A1A]/15 transition-all shrink-0 active:scale-95"
            >
              <span>Host Event Now</span>
              <ArrowRight className="w-4 h-4 stroke-[3px]" />
            </button>
          </div>
        </section>

      </div>
    </div>
  );
};

export default Home;

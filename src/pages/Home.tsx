import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { Sparkles, Calendar, Users, ChevronLeft, ChevronRight, Award, ArrowRight } from 'lucide-react';

export const Home: React.FC = () => {
  const { events, communities, setCurrentPage, setExploreActiveTab } = useApp();

  // Carousel Slides representing real student life
  const slides = [
    {
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=1200',
      tag: 'Campus Culture',
      description: 'Cherish every moment of your college journey, from stadium matches to quad events.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200',
      tag: 'Student Organizations',
      description: 'Find your crew in student-led coding circles, support organizations, and design hubs.'
    },
    {
      image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=1200',
      tag: 'Collaborative Study',
      description: 'Host study lounges, peer review blocks, and hackathon project squads.'
    },
    {
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200',
      tag: 'Stadium Concerts',
      description: 'Rally for annual campus homecoming shows, open mics, and student galas.'
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  // Filter 3 Featured Events
  const featuredEvents = events.slice(0, 3);

  // Filter 3 Featured Communities
  const featuredCommunities = communities.slice(0, 3);

  const testimonials = [
    {
      quote: "SGA Homecoming concert was the absolute highlight of my year! Joining student organizations through Evida made finding my campus community so natural.",
      author: "Marcus Vance",
      role: "BSU Event Planner",
      avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "As a computer science major, joining Tech Innovators let me collaborate with other builders. Evida is where campus life actually coordinates.",
      author: "Aida Garba",
      role: "Computer Science '26",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80"
    },
    {
      quote: "Organizing our weekly code jams became effortless. We went from a dozen members to over a hundred in just one semester through the hub.",
      author: "Sarah Jenkins",
      role: "Women in Tech Chair",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=150&q=80"
    }
  ];

  return (
    <div className="fade-in select-none bg-[#080808]">
      
      {/* ==================== HERO SECTION ==================== */}
      <section className="relative w-full min-h-[85vh] flex items-center justify-center overflow-hidden border-b border-white/5 py-20 px-4">
        {/* Background Image Carousel with crossfade */}
        <div className="absolute inset-0 z-0">
          {slides.map((slide, idx) => (
            <div
              key={idx}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                idx === currentSlide ? 'opacity-30' : 'opacity-0'
              }`}
            >
              <img
                src={slide.image}
                alt={slide.tag}
                className="w-full h-full object-cover scale-105 filter blur-[2px]"
              />
            </div>
          ))}
          {/* Glowing sunset overlay masks */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/70 to-[#080808]/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#080808] via-transparent to-[#080808]" />
          
          {/* Subtle Orange Glow Sphere */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#FF7A1A]/10 rounded-full blur-[120px] pointer-events-none" />
        </div>

        {/* Carousel controls */}
        <div className="absolute bottom-10 right-10 z-20 hidden md:flex items-center space-x-3">
          <button
            onClick={handlePrevSlide}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white cursor-pointer"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNextSlide}
            className="p-2.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all text-white cursor-pointer"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Hero Content */}
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10 select-none">
          <div className="inline-flex items-center space-x-2 px-4 py-1.5 rounded-full bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 text-[10px] uppercase font-bold tracking-widest text-[#FF7A1A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Evida</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-5xl sm:text-8xl font-display text-white tracking-tight leading-none uppercase">
              College ends.<br />
              <span className="bg-gradient-to-r from-[#FF7A1A] to-[#E56717] bg-clip-text text-transparent drop-shadow-sm">
                Memories don't.
              </span>
            </h1>
            <p className="text-sm sm:text-xl text-[#B8B8B8] max-w-2xl mx-auto leading-relaxed font-sans font-medium">
              Evida is the digital home of your campus life. Discover student events, join vibrant student organizations, coordinate study lounges, and build connections with classmates that last a lifetime.
            </p>
          </div>

          {/* Primary & Secondary Call to Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                setExploreActiveTab('events');
                setCurrentPage('explore');
              }}
              className="w-full sm:w-auto px-8 py-4 font-bold text-sm shadow-xl shadow-[#FF7A1A]/10 flex items-center justify-center space-x-2"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentPage('create-event')}
              className="w-full sm:w-auto px-8 py-4 font-bold text-sm border-white/10 hover:border-[#FF7A1A] text-white hover:bg-white/5"
            >
              Create Event
            </Button>
          </div>

          {/* Slide Indicator Dots */}
          <div className="flex justify-center space-x-2 pt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  idx === currentSlide ? 'bg-[#FF7A1A] w-6' : 'bg-white/20'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== WHAT IS EVIDA ==================== */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-b border-white/5">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 select-none">
          <h2 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-tight">
            Everything happening on campus, unified.
          </h2>
          <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed">
            Forget messy group chats, outdated emails, and lost flyers. Evida puts student culture at the center of your university experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: Discover Events */}
          <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/5 space-y-4 text-left shadow-sm hover:border-[#FF7A1A]/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A]">
              <Calendar className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Discover Events</h3>
            <p className="text-xs sm:text-sm text-[#B8B8B8] leading-relaxed font-sans">
              Search, bookmark, and RSVP to student-led mixers, sports tournaments, study sessions, and career conferences. Check location maps instantly.
            </p>
          </div>

          {/* Card 2: Join Communities */}
          <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/5 space-y-4 text-left shadow-sm hover:border-[#FF7A1A]/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A]">
              <Users className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Join Communities</h3>
            <p className="text-xs sm:text-sm text-[#B8B8B8] leading-relaxed font-sans">
              Find your people in academic clubs, black student unions, intramural teams, and start-up builder groups. Mingle in active discussion boards.
            </p>
          </div>

          {/* Card 3: Create Experiences */}
          <div className="bg-[#111111] p-8 rounded-[2rem] border border-white/5 space-y-4 text-left shadow-sm hover:border-[#FF7A1A]/20 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-[#FF7A1A]/10 border border-[#FF7A1A]/20 flex items-center justify-center text-[#FF7A1A]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-white">Create Experiences</h3>
            <p className="text-xs sm:text-sm text-[#B8B8B8] leading-relaxed font-sans">
              Host your own social match, coordinate tutoring, or list student activities. Build cover photos, set locations, and see attendees instantly.
            </p>
          </div>
        </div>
      </section>

      {/* ==================== FEATURED EVENTS ==================== */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 select-none text-left">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-tight">Featured Gatherings</h2>
            <p className="text-xs sm:text-sm text-[#B8B8B8]">The most anticipated student experiences scheduled around campus.</p>
          </div>
          <button
            onClick={() => {
              setExploreActiveTab('events');
              setCurrentPage('explore');
            }}
            className="text-xs font-black text-[#FF7A1A] uppercase tracking-wider hover:underline flex items-center space-x-1.5 cursor-pointer"
          >
            <span>See All Events</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>

      {/* ==================== FEATURED COMMUNITIES ==================== */}
      <section className="py-24 px-4 max-w-7xl mx-auto border-b border-white/5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 mb-12 select-none text-left">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-tight">Student Clubs & Circles</h2>
            <p className="text-xs sm:text-sm text-[#B8B8B8]">Connect with university cohorts, network with peers, and find your crowd.</p>
          </div>
          <button
            onClick={() => {
              setExploreActiveTab('communities');
              setCurrentPage('explore');
            }}
            className="text-xs font-black text-[#FF7A1A] uppercase tracking-wider hover:underline flex items-center space-x-1.5 cursor-pointer"
          >
            <span>See All Communities</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCommunities.map((community) => (
            <CommunityCard key={community.id} community={community} />
          ))}
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="py-24 px-4 max-w-7xl mx-auto select-none">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl font-display text-white uppercase tracking-tight">
            Loved by Campus Leaders
          </h2>
          <p className="text-sm sm:text-base text-[#B8B8B8]">
            Here is what active students and community planners have to say about the Evida hub.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((test, index) => (
            <div
              key={index}
              className="bg-[#111111] p-8 rounded-[2.5rem] border border-white/5 flex flex-col justify-between text-left space-y-6 shadow-sm hover:border-[#FF7A1A]/10 transition-all duration-300"
            >
              <p className="text-sm sm:text-base text-[#B8B8B8]/95 leading-relaxed font-accent italic font-medium select-text">
                “{test.quote}”
              </p>
              
              <div className="flex items-center space-x-3 pt-2">
                <img
                  src={test.avatar}
                  alt={test.author}
                  className="w-10 h-10 rounded-full border border-white/10 object-cover"
                />
                <div>
                  <h4 className="text-sm font-bold text-white leading-tight">{test.author}</h4>
                  <p className="text-[10px] text-[#B8B8B8]/60 mt-0.5 font-medium">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};

export default Home;

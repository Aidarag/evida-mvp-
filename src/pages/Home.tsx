import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import CampusMap from '../components/CampusMap';
import { 
  Bell, Menu, ArrowRight, Calendar, Users, Briefcase, 
  Handshake, Map, Gift, X, Check 
} from 'lucide-react';

export const Home: React.FC = () => {
  const { setExploreActiveTab, setCurrentPage } = useApp();
  const [showToast, setShowToast] = useState(false);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  // Copy invite link function with custom toast popup
  const handleInviteClick = () => {
    // Copy a mock link to the clipboard
    navigator.clipboard.writeText('https://evida.edu/invite/livingstone-campus');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 3000);
  };

  const handleCategoryClick = (category: string) => {
    if (category === 'events') {
      setExploreActiveTab('events');
      setCurrentPage('explore');
    } else if (category === 'organizations') {
      setExploreActiveTab('communities');
      setCurrentPage('explore');
    } else if (category === 'opportunities') {
      setExploreActiveTab('opportunities');
      setCurrentPage('explore');
    } else if (category === 'connect') {
      setCurrentPage('messages');
    } else if (category === 'map') {
      setIsMapOpen(true);
    }
  };

  const categoryCards = [
    {
      id: 'events',
      title: 'Events',
      image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=400',
      icon: <Calendar className="w-4 h-4 text-[#FE7F42]" />
    },
    {
      id: 'organizations',
      title: 'Organizations',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=400',
      icon: <Users className="w-4 h-4 text-[#FE7F42]" />
    },
    {
      id: 'opportunities',
      title: 'Opportunities',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=400',
      icon: <Briefcase className="w-4 h-4 text-[#FE7F42]" />
    },
    {
      id: 'connect',
      title: 'Connect',
      image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
      icon: <Handshake className="w-4 h-4 text-[#FE7F42]" />
    },
    {
      id: 'map',
      title: 'Campus Map',
      image: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?auto=format&fit=crop&q=80&w=400',
      icon: <Map className="w-4 h-4 text-[#FE7F42]" />
    }
  ];

  const campusMoments = [
    {
      id: 'moment-1',
      title: 'Friends taking selfies',
      image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'moment-2',
      title: 'Parties & nightlife',
      image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'moment-3',
      title: 'Campus concerts',
      image: 'https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'moment-4',
      title: 'Outdoor festivals',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'moment-5',
      title: 'Career fairs',
      image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=400'
    },
    {
      id: 'moment-6',
      title: 'Study lounges',
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400'
    }
  ];

  return (
    <div className="select-none bg-[#1A1617] text-white min-h-screen relative font-sans">
      
      {/* Toast Notification */}
      {showToast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[100] px-4 py-2.5 rounded-full dark-glass-card border border-[#FE7F42]/30 flex items-center gap-2.5 shadow-xl animate-bounce">
          <div className="w-5 h-5 rounded-full bg-[#FE7F42] flex items-center justify-center text-white">
            <Check className="w-3.5 h-3.5 stroke-[3px]" />
          </div>
          <span className="text-[11px] font-bold text-white tracking-wide">Invite link copied to clipboard!</span>
        </div>
      )}

      {/* Hamburger Drawer Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-[90] bg-[#1A1617]/95 backdrop-blur-xl p-6 flex flex-col justify-between">
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5 rotate-12">
                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                  <div className="bg-[#FE7F42] rounded-tr-md rounded-bl-md rounded-tl-[10px] rounded-br-[2px]" />
                  <div className="bg-[#FE7F42] rounded-tl-md rounded-br-md rounded-tr-[10px] rounded-bl-[2px]" />
                  <div className="bg-[#D85A1A] rounded-tl-md rounded-br-md rounded-bl-[10px] rounded-tr-[2px]" />
                  <div className="bg-[#FE7F42] rounded-tr-md rounded-bl-md rounded-br-[10px] rounded-tl-[2px]" />
                </div>
                <span className="text-lg font-bold font-sans tracking-tight text-white select-none rotate-[-12deg] ml-1">Evida</span>
              </div>
              <button onClick={() => setIsMenuOpen(false)} className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-6 pt-12 text-left">
              <button onClick={() => { setCurrentPage('home'); setIsMenuOpen(false); }} className="text-2xl font-display font-bold hover:text-[#FE7F42] uppercase tracking-wide">Home</button>
              <button onClick={() => { setExploreActiveTab('events'); setCurrentPage('explore'); setIsMenuOpen(false); }} className="text-2xl font-display font-bold hover:text-[#FE7F42] uppercase tracking-wide">Events</button>
              <button onClick={() => { setExploreActiveTab('communities'); setCurrentPage('explore'); setIsMenuOpen(false); }} className="text-2xl font-display font-bold hover:text-[#FE7F42] uppercase tracking-wide">Communities</button>
              <button onClick={() => { setExploreActiveTab('opportunities'); setCurrentPage('explore'); setIsMenuOpen(false); }} className="text-2xl font-display font-bold hover:text-[#FE7F42] uppercase tracking-wide">Opportunities</button>
              <button onClick={() => { setCurrentPage('messages'); setIsMenuOpen(false); }} className="text-2xl font-display font-bold hover:text-[#FE7F42] uppercase tracking-wide">Messages</button>
              <button onClick={() => { setCurrentPage('profile'); setIsMenuOpen(false); }} className="text-2xl font-display font-bold hover:text-[#FE7F42] uppercase tracking-wide">Profile</button>
            </nav>
          </div>
          <div className="pt-8 border-t border-white/5 text-left">
            <p className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Evida Campus App</p>
            <p className="text-xs text-white/60 mt-1">The memory layer of campus life.</p>
          </div>
        </div>
      )}

      {/* Interactive Map Modal Drawer */}
      {isMapOpen && (
        <div className="fixed inset-0 z-[90] bg-black/60 backdrop-blur-md flex items-end md:items-center justify-center p-0 md:p-6 transition-all duration-300">
          {/* Modal Background click */}
          <div className="absolute inset-0 z-0" onClick={() => setIsMapOpen(false)} />
          
          {/* Modal Content container */}
          <div className="w-full md:max-w-2xl bg-[#161616] rounded-t-[2.5rem] md:rounded-[2.5rem] border-t md:border border-white/10 p-5 md:p-6 relative z-10 animate-slide-up md:animate-zoom-in max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#FE7F42]/10 border border-[#FE7F42]/20 flex items-center justify-center">
                  <Map className="w-4 h-4 text-[#FE7F42]" />
                </div>
                <h2 className="text-lg font-bold text-white font-display uppercase tracking-wide">Interactive Campus Map</h2>
              </div>
              <button 
                onClick={() => setIsMapOpen(false)}
                className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <CampusMap />
          </div>
        </div>
      )}

      {/* ==================== SECTION 1: HERO ==================== */}
      <section className="relative w-full min-h-[92vh] flex flex-col justify-between overflow-hidden">
        
        {/* Hero Background image with Overlay */}
        <div className="absolute inset-0 z-0 select-none pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200" 
            alt="Student Concert" 
            className="w-full h-full object-cover object-center filter scale-105 saturate-[1.25] blur-[0.5px]"
          />
          {/* Dark overlay and glow elements */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#1A1617]/50 via-[#1A1617]/85 to-[#1A1617]" />
          {/* Subtle Orange Glow Overlay */}
          <div className="absolute top-[30%] left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#FE7F42]/15 rounded-full blur-[100px]" />
        </div>

        {/* Top Navigation */}
        <header className="relative z-10 w-full px-6 py-5 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-1.5 rotate-12 cursor-pointer group" onClick={() => setCurrentPage('home')}>
            <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
              <div className="bg-[#FE7F42] rounded-tr-md rounded-bl-md rounded-tl-[10px] rounded-br-[2px] transition-transform group-hover:scale-95" />
              <div className="bg-[#FE7F42] rounded-tl-md rounded-br-md rounded-tr-[10px] rounded-bl-[2px] transition-transform group-hover:scale-95" />
              <div className="bg-[#D85A1A] rounded-tl-md rounded-br-md rounded-bl-[10px] rounded-tr-[2px] transition-transform group-hover:scale-95" />
              <div className="bg-[#FE7F42] rounded-tr-md rounded-bl-md rounded-br-[10px] rounded-tl-[2px] transition-transform group-hover:scale-95" />
            </div>
            <span className="text-lg font-bold font-sans tracking-tight text-white select-none rotate-[-12deg] ml-1">Evida</span>
          </div>

          {/* Right Controls */}
          <div className="flex items-center gap-3">
            <button 
              onClick={() => {
                navigator.clipboard.writeText("You have 3 new notifications!");
                setShowToast(true);
              }}
              className="w-10 h-10 rounded-full dark-glass-card flex items-center justify-center text-white border border-white/5 cursor-pointer relative hover:bg-white/5 active:scale-95 transition-all"
            >
              <Bell className="w-4.5 h-4.5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FE7F42] animate-ping" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-[#FE7F42]" />
            </button>
            
            <button 
              onClick={() => setIsMenuOpen(true)}
              className="w-10 h-10 rounded-full dark-glass-card flex items-center justify-center text-white border border-white/5 cursor-pointer hover:bg-white/5 active:scale-95 transition-all"
            >
              <Menu className="w-4.5 h-4.5" />
            </button>
          </div>
        </header>

        {/* Hero Content */}
        <div className="relative z-10 px-6 pt-12 flex-grow flex flex-col justify-center space-y-6 text-left">
          
          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight leading-[1.08] uppercase font-sans">
            College ends.<br />
            <span className="text-[#FE7F42]">Memories don't.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-[13px] sm:text-[15px] text-[#FFF8F0]/75 max-w-[320px] sm:max-w-md font-sans leading-relaxed tracking-wide">
            Discover events, clubs, opportunities, and the people that make your campus unforgettable.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 pt-3">
            <button 
              onClick={() => {
                setExploreActiveTab('events');
                setCurrentPage('explore');
              }}
              className="w-full py-3.5 px-6 rounded-full bg-[#FE7F42] hover:bg-[#D85A1A] text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#FE7F42]/20 hover:shadow-[#FE7F42]/35 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button 
              onClick={() => setCurrentPage('create-event')}
              className="w-full py-3.5 px-6 rounded-full border border-white/10 hover:border-[#FE7F42]/40 bg-white/5 hover:bg-white/10 text-white font-bold text-xs tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
            >
              Create Event
            </button>
          </div>
        </div>

        {/* Hero Bottom - Avatars & Text */}
        <div className="relative z-10 px-6 py-8 border-b border-white/5 bg-gradient-to-t from-[#1A1617] to-transparent text-left">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-2.5 overflow-hidden">
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1A1617] object-cover" src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&w=100&q=80" alt="Marcus" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1A1617] object-cover" src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=100&q=80" alt="Aida" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1A1617] object-cover" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Sarah" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1A1617] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100" alt="Tariq" />
              <img className="inline-block h-8 w-8 rounded-full ring-2 ring-[#1A1617] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=100" alt="Maya" />
            </div>
            <p className="text-[11px] text-[#FFF8F0]/70 font-sans tracking-wide leading-tight">
              Join <span className="text-white font-bold">25,000+ students</span><br />on your campus
            </p>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: WHAT'S HAPPENING TODAY ==================== */}
      <section className="px-6 py-10 space-y-6 text-left relative z-10">
        <h2 className="text-lg font-bold font-display uppercase tracking-wider text-white">What's happening today</h2>
        
        <div className="flex flex-col gap-4">
          
          {/* Card 1: Events */}
          <div 
            onClick={() => handleCategoryClick('events')}
            className="p-5 rounded-[20px] dark-glass-card dark-glass-card-hover flex items-center gap-4 cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FE7F42]/10 border border-[#FE7F42]/20 flex items-center justify-center text-[#FE7F42] shadow-inner">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#FE7F42] leading-none">12</h3>
              <p className="text-[11px] text-[#FFF8F0]/70 font-semibold tracking-wide mt-1">Events live on campus</p>
            </div>
          </div>

          {/* Card 2: Organizations */}
          <div 
            onClick={() => handleCategoryClick('organizations')}
            className="p-5 rounded-[20px] dark-glass-card dark-glass-card-hover flex items-center gap-4 cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FE7F42]/10 border border-[#FE7F42]/20 flex items-center justify-center text-[#FE7F42] shadow-inner">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#FE7F42] leading-none">4</h3>
              <p className="text-[11px] text-[#FFF8F0]/70 font-semibold tracking-wide mt-1">Organizations recruiting</p>
            </div>
          </div>

          {/* Card 3: Opportunities */}
          <div 
            onClick={() => handleCategoryClick('opportunities')}
            className="p-5 rounded-[20px] dark-glass-card dark-glass-card-hover flex items-center gap-4 cursor-pointer text-left"
          >
            <div className="w-11 h-11 rounded-2xl bg-[#FE7F42]/10 border border-[#FE7F42]/20 flex items-center justify-center text-[#FE7F42] shadow-inner">
              <Briefcase className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-2xl font-extrabold text-[#FE7F42] leading-none">9</h3>
              <p className="text-[11px] text-[#FFF8F0]/70 font-semibold tracking-wide mt-1">Opportunities closing this week</p>
            </div>
          </div>

        </div>
      </section>

      {/* ==================== SECTION 3: BROWSE BY CATEGORY ==================== */}
      <section className="py-10 space-y-6 text-left relative z-10">
        <h2 className="text-lg font-bold font-display uppercase tracking-wider text-white px-6">Browse by category</h2>
        
        {/* Horizontal Category Slider */}
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none -mx-4 px-10">
          {categoryCards.map((card) => (
            <div
              key={card.id}
              onClick={() => handleCategoryClick(card.id)}
              className="flex-shrink-0 w-28 aspect-[3/4.5] rounded-3xl overflow-hidden border border-white/5 relative cursor-pointer group shadow-lg transition-transform duration-300 hover:scale-[1.03]"
            >
              {/* Photo background */}
              <img 
                src={card.image} 
                alt={card.title} 
                className="w-full h-full object-cover absolute inset-0 z-0 transition-transform duration-500 group-hover:scale-110 filter brightness-[0.8] saturate-[1.1]"
              />
              {/* Dark Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/20 z-10" />
              
              {/* Category Info Container */}
              <div className="relative z-20 h-full p-3 flex flex-col justify-between items-start text-left">
                {/* Rounded Box with Orange Icon */}
                <div className="w-8 h-8 rounded-xl bg-[#1A1617]/80 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-md">
                  {card.icon}
                </div>
                
                {/* Title */}
                <h4 className="text-[11px] font-bold text-white tracking-wide leading-tight uppercase font-sans">
                  {card.title}
                </h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SECTION 4: CAMPUS MOMENTS ==================== */}
      <section className="py-10 space-y-6 text-left relative z-10">
        <div className="flex justify-between items-center px-6">
          <h2 className="text-lg font-bold font-display uppercase tracking-wider text-white">Campus moments</h2>
          <button 
            onClick={() => handleInviteClick()}
            className="text-[11px] font-bold text-[#FE7F42] uppercase hover:underline cursor-pointer"
          >
            See all
          </button>
        </div>

        {/* Horizontal Moments gallery */}
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-none -mx-4 px-10">
          {campusMoments.map((moment) => (
            <div
              key={moment.id}
              onClick={() => handleInviteClick()}
              className="flex-shrink-0 w-36 aspect-[3/4] rounded-[24px] overflow-hidden border border-white/5 relative cursor-pointer group shadow-lg transition-transform duration-300 hover:scale-[1.02]"
            >
              {/* Real student life photography */}
              <img 
                src={moment.image} 
                alt={moment.title} 
                className="w-full h-full object-cover absolute inset-0 z-0 filter brightness-[0.9] saturate-[1.1] transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent z-10" />
              
              {/* Image title overlay (bottom) */}
              <div className="absolute bottom-3 left-3 right-3 z-20">
                <p className="text-[9px] text-white/50 uppercase tracking-widest font-black leading-none mb-1">Moment</p>
                <p className="text-[10px] font-bold text-white leading-tight truncate font-sans">
                  {moment.title}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==================== SECTION 5: INVITE FRIENDS ==================== */}
      <section className="px-6 py-10 pb-16 relative z-10">
        <div className="p-5 rounded-[28px] dark-glass-card border border-[#FE7F42]/15 flex items-center justify-between gap-4 text-left">
          
          {/* Left Details */}
          <div className="flex items-center gap-3.5">
            {/* Gift Icon inside circular container */}
            <div className="w-11 h-11 rounded-2xl bg-[#FE7F42]/10 border border-[#FE7F42]/20 flex items-center justify-center text-[#FE7F42] shadow-inner flex-shrink-0">
              <Gift className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-sm font-extrabold text-white leading-tight">Invite your friends</h3>
              <p className="text-[11px] text-[#FFF8F0]/50 tracking-wide mt-1">More friends, more memories.</p>
            </div>
          </div>

          {/* Right Action Button */}
          <button 
            onClick={handleInviteClick}
            className="px-4 py-2.5 rounded-full bg-[#FE7F42] hover:bg-[#D85A1A] text-white font-bold text-[10px] uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-md shadow-[#FE7F42]/15 cursor-pointer active:scale-95 flex-shrink-0 hover:shadow-lg hover:shadow-[#FE7F42]/25"
          >
            <span>Invite Now</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5px]" />
          </button>

        </div>
      </section>

    </div>
  );
};

export default Home;

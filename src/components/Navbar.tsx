import React from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Compass, Users, PlusCircle, User, Home, Heart, Briefcase, Sparkles } from 'lucide-react';
import { EvidaLogo, EvidaLogoText } from './EvidaLogo';
import Button from './Button';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const isHome = currentPage === 'home';

  const desktopNavItems: { label: string; page: PageName; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-4 h-4" /> },
    { label: 'Events', page: 'explore', icon: <Compass className="w-4 h-4" /> },
    { label: 'Clubs', page: 'communities', icon: <Users className="w-4 h-4" /> },
    { label: 'Opportunities', page: 'opportunities', icon: <Briefcase className="w-4 h-4" /> },
    { label: 'Saved', page: 'saved', icon: <Heart className="w-4 h-4" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-4 h-4" /> },
  ];

  const mobileBottomItems: { label: string; page: PageName; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-5.5 h-5.5" /> },
    { label: 'Explore', page: 'explore', icon: <Compass className="w-5.5 h-5.5" /> },
    { label: 'Create', page: 'create-event', icon: <PlusCircle className="w-6 h-6 text-brand-purple" /> },
    { label: 'Saved', page: 'saved', icon: <Heart className="w-5.5 h-5.5" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-5.5 h-5.5" /> },
  ];

  const handleNavClick = (page: PageName) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Desktop/Tablet Sticky Header */}
      <nav className={`sticky top-0 z-40 backdrop-blur-md transition-all duration-300 ${
        isHome 
          ? 'bg-slate-950/40 border-b border-white/5 text-white' 
          : 'bg-white/70 border-b border-brand-lavender/25 text-brand-text'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Logo */}
            <div 
              onClick={() => handleNavClick('home')}
              className="flex items-center space-x-2.5 cursor-pointer group select-none text-brand-purple"
            >
              <EvidaLogo size={28} className="transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
              <EvidaLogoText size={20} className={`${isHome ? 'text-white' : 'text-brand-text'} group-hover:text-brand-purple transition-colors`} />
              <span className="inline-flex items-center px-2 py-0.5 text-[9px] font-bold bg-brand-purple/10 text-brand-purple rounded-full uppercase tracking-wider font-display">
                CAMPUS
              </span>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-1.5 items-center">
              {desktopNavItems.map((item) => {
                const isActive = currentPage === item.page || 
                  (item.page === 'explore' && currentPage === 'event-details') ||
                  (item.page === 'communities' && currentPage === 'community-profile') ||
                  (item.page === 'opportunities' && currentPage === 'opportunity-details');
                return (
                  <button
                    key={item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`flex items-center space-x-1.5 px-4.5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 font-display ${
                      isActive
                        ? isHome
                          ? 'bg-white/10 text-white font-bold'
                          : 'bg-brand-purple/10 text-brand-purple font-bold shadow-sm'
                        : isHome
                          ? 'text-slate-400 hover:text-white hover:bg-white/5'
                          : 'text-brand-text-sec hover:text-brand-text hover:bg-brand-lavender/20'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Header Actions (Desktop) */}
            <div className="hidden md:flex items-center space-x-2">
              <Button 
                variant="primary"
                size="sm"
                onClick={() => handleNavClick('create-event')}
                className="flex items-center space-x-1.5 font-bold"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Host Event</span>
              </Button>
            </div>
            
            {/* Header Sparkle Icon for Mobile aesthetics */}
            <div className="flex md:hidden items-center">
              <Sparkles className="w-5 h-5 text-brand-purple fill-brand-purple/20 animate-pulse" />
            </div>
          </div>
        </div>
      </nav>

      {/* Floating Bottom Navigation Bar (Mobile Experience) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-brand-lavender/30 py-2.5 px-6 flex justify-between items-center shadow-2xl rounded-t-3xl pb-safe">
        {mobileBottomItems.map((item) => {
          const isActive = currentPage === item.page || 
            (item.page === 'explore' && currentPage === 'event-details') ||
            (item.page === 'create-event' && currentPage === 'create-event') ||
            (item.page === 'profile' && currentPage === 'profile') ||
            (item.page === 'saved' && currentPage === 'saved');
            
          const isCreateButton = item.page === 'create-event';

          return (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className="flex flex-col items-center justify-center relative py-1 px-3 group"
              aria-label={item.label}
            >
              {isCreateButton ? (
                <div className="flex items-center justify-center w-11 h-11 bg-brand-purple/10 rounded-full text-brand-purple group-active:scale-95 transition-transform border border-brand-purple/20 shadow-sm shadow-brand-purple/10 -mt-5">
                  {item.icon}
                </div>
              ) : (
                <div className={`transition-colors duration-200 ${isActive ? 'text-brand-purple' : 'text-brand-text/50'}`}>
                  {item.icon}
                </div>
              )}
              
              <span className={`text-[10px] font-display font-bold mt-1 tracking-tight ${isCreateButton ? 'hidden' : isActive ? 'text-brand-purple' : 'text-brand-text/45'}`}>
                {item.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && !isCreateButton && (
                <span className="absolute top-0 w-1 h-1 rounded-full bg-brand-purple" />
              )}
            </button>
          );
        })}
      </div>
      
      {/* Pad bottom content on mobile so bottom bar does not overlap */}
      <div className="md:hidden h-16 pointer-events-none" />
    </>
  );
};
export default Navbar;

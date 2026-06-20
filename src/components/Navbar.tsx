import React from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Compass, User, Home, MessageSquare, Plus } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();
  const isLandingPage = currentPage === 'home';

  const mobileBottomItems: { label: string; page: PageName; icon: React.ReactNode; isCreate?: boolean }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', page: 'explore', icon: <Compass className="w-5 h-5" /> },
    { label: 'Create', page: 'create-event', icon: <Plus className="w-6 h-6 text-white stroke-[3px]" />, isCreate: true },
    { label: 'Messages', page: 'messages', icon: <MessageSquare className="w-5 h-5" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleNavClick = (page: PageName) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Floating Bottom Navigation Bar (Mobile Experience only) */}
      <div 
        className={`md:hidden fixed bottom-0 left-0 right-0 z-50 py-2 px-4 flex justify-between items-center shadow-2xl rounded-t-3xl pb-safe transition-all duration-300 ${
          isLandingPage 
            ? 'bg-[#1A1617]/85 border-t border-white/5 backdrop-blur-2xl' 
            : 'bg-white/90 border-t border-brand-text/5 backdrop-blur-xl'
        }`}
      >
        {mobileBottomItems.map((item) => {
          const isActive = currentPage === item.page || 
            (item.page === 'explore' && (currentPage === 'explore' || currentPage === 'event-details' || currentPage === 'communities' || currentPage === 'opportunity-details' || currentPage === 'community-profile'));
            
          if (item.isCreate) {
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className={`relative -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#FE7F42] hover:bg-[#D85A1A] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#FE7F42]/35 border-4 z-50 cursor-pointer text-white ${
                  isLandingPage ? 'border-[#1A1617]' : 'border-brand-bg'
                }`}
                aria-label="Create Event"
              >
                {item.icon}
              </button>
            );
          }

          const activeColorClass = isLandingPage 
            ? 'text-[#FE7F42] font-bold' 
            : 'text-brand-text font-bold';
            
          const inactiveColorClass = isLandingPage 
            ? 'text-white/40 hover:text-white/70' 
            : 'text-brand-text-sec/50 hover:text-brand-text/80';

          return (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className="flex flex-col items-center justify-center relative py-1 px-3 group cursor-pointer"
              aria-label={item.label}
            >
              <div className={`transition-colors duration-200 ${isActive ? activeColorClass : inactiveColorClass}`}>
                {item.icon}
              </div>
              
              <span className={`text-[9px] font-display mt-1 tracking-tight ${isActive ? activeColorClass : inactiveColorClass}`}>
                {item.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className={`absolute -top-1 w-1 h-1 rounded-full shadow-sm ${
                  isLandingPage ? 'bg-[#FE7F42]' : 'bg-brand-text'
                }`} />
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

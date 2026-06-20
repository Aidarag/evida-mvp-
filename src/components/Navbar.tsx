import React from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Compass, User, Home, Heart, Plus } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  const mobileBottomItems: { label: string; page: PageName; icon: React.ReactNode; isCreate?: boolean }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', page: 'explore', icon: <Compass className="w-5 h-5" /> },
    { label: 'Create', page: 'create-event', icon: <Plus className="w-6 h-6 text-white stroke-[3px]" />, isCreate: true },
    { label: 'Saved', page: 'saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleNavClick = (page: PageName) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Floating Bottom Navigation Bar (Mobile Experience only, dark glass design) */}
      <div 
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 py-2.5 px-4 flex justify-between items-center shadow-2xl rounded-t-[2rem] pb-safe border-t border-white/5 bg-[#1A1214]/85 backdrop-blur-2xl transition-all duration-300"
      >
        {mobileBottomItems.map((item) => {
          const isActive = currentPage === item.page || 
            (item.page === 'explore' && (currentPage === 'explore' || currentPage === 'event-details' || currentPage === 'communities' || currentPage === 'opportunity-details' || currentPage === 'community-profile'));
            
          if (item.isCreate) {
            return (
              <button
                key={item.page}
                onClick={() => handleNavClick(item.page)}
                className="relative -top-5 flex items-center justify-center w-14 h-14 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] hover:scale-105 active:scale-95 transition-all shadow-lg shadow-[#FE7F42]/35 border-4 border-[#0F0D11] z-50 cursor-pointer text-white"
                aria-label="Create Event"
              >
                {item.icon}
              </button>
            );
          }

          const activeColorClass = 'text-[#FE7F42] font-bold';
          const inactiveColorClass = 'text-white/40 hover:text-white/70';

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
              
              <span className={`text-[9px] font-sans mt-1 tracking-tight ${isActive ? activeColorClass : inactiveColorClass}`}>
                {item.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-[#FE7F42] shadow-sm shadow-[#FE7F42]/30" />
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

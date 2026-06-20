import React from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Compass, Users, User, Home, Heart } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, setCurrentPage } = useApp();

  const mobileBottomItems: { label: string; page: PageName; icon: React.ReactNode }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Events', page: 'explore', icon: <Compass className="w-5 h-5" /> },
    { label: 'Clubs', page: 'communities', icon: <Users className="w-5 h-5" /> },
    { label: 'Saved', page: 'saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleNavClick = (page: PageName) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Floating Bottom Navigation Bar (Mobile Experience only) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[#0e0e0e]/90 backdrop-blur-xl border-t border-white/5 py-2.5 px-6 flex justify-between items-center shadow-2xl rounded-t-3xl pb-safe">
        {mobileBottomItems.map((item) => {
          const isActive = currentPage === item.page || 
            (item.page === 'explore' && currentPage === 'event-details') ||
            (item.page === 'communities' && (currentPage === 'community-profile')) ||
            (item.page === 'saved' && currentPage === 'opportunity-details');
            
          return (
            <button
              key={item.page}
              onClick={() => handleNavClick(item.page)}
              className="flex flex-col items-center justify-center relative py-1 px-3 group cursor-pointer"
              aria-label={item.label}
            >
              <div className={`transition-colors duration-200 ${isActive ? 'text-[#FF7A1A]' : 'text-[#B8B8B8]/40'}`}>
                {item.icon}
              </div>
              
              <span className={`text-[9px] font-display font-bold mt-1 tracking-tight ${isActive ? 'text-[#FF7A1A]' : 'text-[#B8B8B8]/45'}`}>
                {item.label}
              </span>

              {/* Active Indicator dot */}
              {isActive && (
                <span className="absolute -top-1 w-1 h-1 rounded-full bg-[#FF7A1A] shadow-md shadow-[#FF7A1A]/40" />
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

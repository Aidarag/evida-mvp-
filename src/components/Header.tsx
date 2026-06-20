import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Compass, Users, Heart, User, Plus, Menu, X } from 'lucide-react';
import { EvidaLogo, EvidaLogoText } from './EvidaLogo';

export const Header: React.FC = () => {
  const { currentPage, setCurrentPage, profile } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (page: PageName) => {
    setCurrentPage(page);
    setMobileMenuOpen(false);
  };

  const navLinks: { label: string; page: PageName; icon: React.ReactNode }[] = [
    { label: 'Explore', page: 'explore', icon: <Compass className="w-4 h-4" /> },
    { label: 'Organizations', page: 'communities', icon: <Users className="w-4 h-4" /> },
    { label: 'Saved', page: 'saved', icon: <Heart className="w-4 h-4" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 transition-all select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          
          {/* Left: Brand Logo & Wordmark */}
          <div 
            onClick={() => handleNavClick('home')}
            className="flex items-center space-x-2.5 cursor-pointer group flex-shrink-0"
          >
            <EvidaLogo size={28} className="transform transition-transform duration-300 group-hover:rotate-6" />
            <EvidaLogoText size={18} className="text-[#111111] group-hover:text-[#FF7A1A] transition-colors" />
          </div>

          {/* Center: Visually Centered Navigation Items (Desktop) */}
          <nav className="hidden md:flex items-center justify-center space-x-8 flex-grow max-w-2xl mx-auto">
            {/* Left flank links */}
            <button 
              onClick={() => handleNavClick('explore')} 
              className={`font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                currentPage === 'explore' || currentPage === 'event-details' || currentPage === 'opportunity-details'
                  ? 'text-[#FF7A1A]' 
                  : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Explore
            </button>
            <button 
              onClick={() => handleNavClick('communities')} 
              className={`font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                currentPage === 'communities' || currentPage === 'community-profile'
                  ? 'text-[#FF7A1A]' 
                  : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Organizations
            </button>

            {/* Prominent centered Create Event CTA Button */}
            <button 
              onClick={() => handleNavClick('create-event')} 
              className="bg-[#FF7A1A] hover:bg-[#FF8A4C] text-white px-6 py-2.5 rounded-full text-xs font-black uppercase tracking-wider shadow-lg shadow-[#FF7A1A]/12 hover:shadow-[#FF7A1A]/22 transition-all hover:scale-105 active:scale-95 cursor-pointer flex items-center space-x-2 border border-transparent mx-2"
            >
              <Plus className="w-4 h-4 stroke-[3px]" />
              <span>Create Event</span>
            </button>

            {/* Right flank links */}
            <button 
              onClick={() => handleNavClick('saved')} 
              className={`font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                currentPage === 'saved' 
                  ? 'text-[#FF7A1A]' 
                  : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Saved
            </button>
            <button 
              onClick={() => handleNavClick('profile')} 
              className={`font-semibold text-xs uppercase tracking-wider transition-colors cursor-pointer ${
                currentPage === 'profile' 
                  ? 'text-[#FF7A1A]' 
                  : 'text-[#555555] hover:text-[#111111]'
              }`}
            >
              Profile
            </button>
          </nav>

          {/* Right Section: Desktop User Profile Quick Link */}
          <div className="hidden md:flex items-center justify-end flex-shrink-0">
            <div 
              onClick={() => handleNavClick('profile')}
              className="flex items-center space-x-2.5 cursor-pointer p-1.5 hover:bg-gray-50 rounded-full transition-colors border border-transparent hover:border-gray-100"
            >
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
              />
              <span className="text-xs font-bold text-[#111111] pr-1.5">{profile.name.split(' ')[0]}</span>
            </div>
          </div>

          {/* Mobile Right Controls: Create Trigger, Profile, Hamburger Toggle */}
          <div className="flex items-center space-x-3.5 md:hidden">
            {/* Centered Prominent icon for mobile viewports */}
            <button 
              onClick={() => handleNavClick('create-event')} 
              className="w-9 h-9 rounded-full bg-[#FF7A1A] hover:bg-[#FF8A4C] flex items-center justify-center text-white shadow-md shadow-[#FF7A1A]/15 cursor-pointer active:scale-95 transition-all"
              aria-label="Create Event"
            >
              <Plus className="w-5 h-5 stroke-[2.5]" />
            </button>

            <img
              src={profile.avatar}
              alt={profile.name}
              onClick={() => handleNavClick('profile')}
              className="w-7 h-7 rounded-full object-cover border border-gray-200 cursor-pointer"
            />

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1 text-[#555555] hover:text-[#111111] cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white/95 backdrop-blur-lg animate-fadeIn select-none">
          <div className="px-4 py-4 space-y-2.5">
            {navLinks.map((link) => {
              const isActive = currentPage === link.page;
              return (
                <button
                  key={link.page}
                  onClick={() => handleNavClick(link.page)}
                  className={`w-full flex items-center space-x-3.5 px-4.5 py-3 rounded-2xl text-sm font-semibold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FF7A1A]/5 text-[#FF7A1A] border-l-4 border-[#FF7A1A]'
                      : 'text-[#555555] hover:text-[#111111] hover:bg-gray-50'
                  }`}
                >
                  <div className={isActive ? 'text-[#FF7A1A]' : 'text-gray-400'}>
                    {link.icon}
                  </div>
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;

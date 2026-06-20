import React from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Home, Compass, Plus, Heart, User } from 'lucide-react';
import { EvidaLogo, EvidaLogoText } from './EvidaLogo';

export const Sidebar: React.FC = () => {
  const { currentPage, setCurrentPage, setCreateModalOpen, profile } = useApp();

  const navItems: { label: string; page: PageName; icon: React.ReactNode; isModalTrigger?: boolean }[] = [
    { label: 'Home', page: 'home', icon: <Home className="w-5 h-5" /> },
    { label: 'Explore', page: 'explore', icon: <Compass className="w-5 h-5" /> },
    { label: 'Create', page: 'create-event', icon: <Plus className="w-5 h-5" />, isModalTrigger: true },
    { label: 'Saved', page: 'saved', icon: <Heart className="w-5 h-5" /> },
    { label: 'Profile', page: 'profile', icon: <User className="w-5 h-5" /> },
  ];

  const handleNavClick = (item: typeof navItems[0]) => {
    if (item.isModalTrigger) {
      setCreateModalOpen(true);
    } else {
      setCurrentPage(item.page);
    }
  };

  return (
    <aside className="w-64 xl:w-72 bg-[#0b0b0b] border-r border-white/5 flex flex-col h-screen flex-shrink-0 select-none z-30 relative">
      {/* Top logo block */}
      <div className="p-6 flex items-center space-x-3 border-b border-white/5">
        <div className="flex items-center space-x-2.5 cursor-pointer group" onClick={() => setCurrentPage('home')}>
          <EvidaLogo size={32} className="transform transition-transform duration-300 group-hover:rotate-6 group-hover:scale-105" />
          <EvidaLogoText size={22} className="text-white group-hover:text-[#FF7A1A] transition-colors" />
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 px-4 py-6 space-y-2.5 overflow-y-auto custom-scrollbar">
        {navItems.map((item) => {
          const isCreate = item.label === 'Create';
          const isActive = !isCreate && (
            currentPage === item.page ||
            (item.page === 'explore' && currentPage === 'event-details') ||
            (item.page === 'saved' && currentPage === 'opportunity-details')
          );

          if (isCreate) {
            return (
              <button
                key={item.label}
                onClick={() => handleNavClick(item)}
                className="w-full mt-2 flex items-center justify-center space-x-2.5 py-3 px-5 rounded-full text-white font-bold bg-gradient-to-r from-[#FF7A1A] to-[#E56717] hover:opacity-95 active:scale-[0.98] transition-all cursor-pointer shadow-lg shadow-[#FF7A1A]/20 hover:shadow-[#FF7A1A]/35"
              >
                <Plus className="w-5 h-5 stroke-[2.5]" />
                <span className="font-display text-sm tracking-wide">Create Event</span>
              </button>
            );
          }

          return (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className={`w-full flex items-center space-x-4 py-3 px-5 rounded-full text-sm font-semibold transition-all duration-200 font-display cursor-pointer ${
                isActive
                  ? 'bg-white/5 text-[#FF7A1A] border border-[#FF7A1A]/10 font-bold'
                  : 'text-[#B8B8B8] hover:text-white hover:bg-white/5 border border-transparent'
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110 text-[#FF7A1A]' : ''}`}>
                {item.icon}
              </div>
              <span className="tracking-wide">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Bottom user profile card */}
      <div 
        onClick={() => setCurrentPage('profile')}
        className="p-5 border-t border-white/5 bg-[#0e0e0e] hover:bg-white/5 cursor-pointer transition-colors duration-200 flex items-center space-x-3.5"
      >
        <img
          src={profile.avatar}
          alt={profile.name}
          className="w-10 h-10 rounded-full border border-white/10 object-cover bg-white/5"
        />
        <div className="min-w-0 text-left">
          <h4 className="text-sm font-bold text-white truncate font-display tracking-wide">{profile.name}</h4>
          <p className="text-[11px] text-[#B8B8B8] font-medium leading-tight mt-0.5">{profile.graduationYear}</p>
          <p className="text-[10px] text-[#B8B8B8]/60 truncate mt-0.5">{profile.university}</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;

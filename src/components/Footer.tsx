import React from 'react';
import { useApp } from '../context/AppContext';
import { Heart } from 'lucide-react';
import { EvidaLogo, EvidaLogoText } from './EvidaLogo';

export const Footer: React.FC = () => {
  const { setCurrentPage, setExploreActiveTab } = useApp();

  const quickLinks = [
    { label: 'Explore Events', action: () => { setExploreActiveTab('events'); setCurrentPage('explore'); } },
    { label: 'Communities / Clubs', action: () => { setExploreActiveTab('communities'); setCurrentPage('explore'); } },
    { label: 'Opportunities Hub', action: () => { setExploreActiveTab('opportunities'); setCurrentPage('explore'); } },
    { label: 'My Student Profile', action: () => { setCurrentPage('profile'); } },
  ];

  return (
    <footer className="bg-[#FFF0DE] text-brand-text-sec py-10 mt-auto border-t border-brand-text/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2.5 mb-2.5">
              <EvidaLogo size={24} />
              <EvidaLogoText size={18} className="text-brand-text" />
            </div>
            <p className="text-brand-text-sec/70 text-xs max-w-sm mx-auto md:mx-0 leading-relaxed font-sans">
              One life, one campus, one platform. Discover events, join student communities, and make college life feel warm, active, and connected.
            </p>
          </div>
 
          {/* Quick Links */}
          <div className="flex flex-col space-y-2 md:items-center">
            <span className="font-bold text-xs text-[#FF7A30] tracking-widest uppercase mb-0.5">Explore</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 md:flex-col md:items-center md:gap-y-1.5">
              {quickLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={link.action}
                  className="text-brand-text-sec hover:text-[#FF7A30] text-xs transition-colors duration-150 font-semibold cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
 
          {/* Quote & Hearts */}
          <div className="text-center md:text-right flex flex-col justify-center md:items-end">
            <p className="text-[#FF7A30] font-accent font-medium italic text-base mb-1">
              “Find your people. Build your story.”
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-1.5 text-[11px] text-brand-text-sec/50 font-medium">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#FF7A30] fill-[#FF7A30]" />
              <span>for college students</span>
            </div>
            <p className="text-[10px] text-brand-text-sec/40 mt-2 font-semibold">
              © {new Date().getFullYear()} Evida. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

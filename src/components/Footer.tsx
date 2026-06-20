import React from 'react';
import { useApp } from '../context/AppContext';
import type { PageName } from '../context/AppContext';
import { Heart } from 'lucide-react';
import { EvidaLogo, EvidaLogoText } from './EvidaLogo';

export const Footer: React.FC = () => {
  const { setCurrentPage } = useApp();

  const quickLinks: { label: string; page: PageName }[] = [
    { label: 'Explore Events', page: 'explore' },
    { label: 'Communities / Clubs', page: 'communities' },
    { label: 'Opportunities Hub', page: 'opportunities' },
    { label: 'My Student Profile', page: 'profile' },
  ];

  return (
    <footer className="bg-[#090909] text-[#B8B8B8] py-10 mt-auto border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2.5 mb-2.5">
              <EvidaLogo size={24} />
              <EvidaLogoText size={18} className="text-white" />
            </div>
            <p className="text-[#B8B8B8]/60 text-xs max-w-sm mx-auto md:mx-0 leading-relaxed font-sans">
              One life, one campus, one platform. Discover events, join student communities, and make college life feel warm, active, and connected.
            </p>
          </div>
 
          {/* Quick Links */}
          <div className="flex flex-col space-y-2 md:items-center">
            <span className="font-display font-bold text-xs text-[#FF7A1A] tracking-widest uppercase mb-0.5">Explore</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-1.5 md:flex-col md:items-center md:gap-y-1.5">
              {quickLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => setCurrentPage(link.page)}
                  className="text-[#B8B8B8] hover:text-[#FF7A1A] text-xs transition-colors duration-150 font-display font-semibold cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
 
          {/* Quote & Hearts */}
          <div className="text-center md:text-right flex flex-col justify-center md:items-end">
            <p className="text-[#FF7A1A] font-display font-bold italic text-sm mb-1">
              “Find your people. Build your story.”
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-1.5 text-[11px] text-[#B8B8B8]/40 font-medium">
              <span>Made with</span>
              <Heart className="w-3 h-3 text-[#FF7A1A] fill-[#FF7A1A]" />
              <span>for college students</span>
            </div>
            <p className="text-[10px] text-[#B8B8B8]/30 mt-2 font-semibold">
              © {new Date().getFullYear()} Evida. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

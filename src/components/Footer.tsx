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
    { label: 'Organize Event', page: 'create-event' },
    { label: 'My Student Profile', page: 'profile' },
  ];

  return (
    <footer className="bg-slate-50 text-brand-text-sec py-12 mt-auto border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
          {/* Brand Info */}
          <div>
            <div className="flex items-center justify-center md:justify-start space-x-2.5 mb-3">
              <EvidaLogo size={24} />
              <EvidaLogoText size={18} className="text-brand-text" />
            </div>
            <p className="text-slate-500 text-sm max-w-sm mx-auto md:mx-0 leading-relaxed">
              One life, one campus, one platform. Discover events, join student communities, and make college life feel warm, active, and connected.
            </p>
          </div>
 
          {/* Quick Links */}
          <div className="flex flex-col space-y-2 md:items-center">
            <span className="font-display font-bold text-xs text-brand-purple tracking-widest uppercase mb-1">Explore</span>
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 md:flex-col md:items-center md:gap-y-2">
              {quickLinks.map((link) => (
                <button
                  key={link.page}
                  onClick={() => setCurrentPage(link.page)}
                  className="text-slate-500 hover:text-brand-purple text-sm transition-colors duration-150 font-display font-semibold"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
 
          {/* Quote & Hearts */}
          <div className="text-center md:text-right flex flex-col justify-center md:items-end">
            <p className="text-brand-purple font-display font-bold italic text-base mb-2">
              “Find your people. Build your story.”
            </p>
            <div className="flex items-center justify-center md:justify-end space-x-1.5 text-xs text-slate-400 font-medium">
              <span>Made with</span>
              <Heart className="w-3.5 h-3.5 text-brand-purple fill-brand-purple" />
              <span>for college students</span>
            </div>
            <p className="text-[11px] text-slate-400 mt-3 font-semibold">
              © {new Date().getFullYear()} Evida. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;

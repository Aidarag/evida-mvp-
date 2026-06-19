import React from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, PlusCircle, Users } from 'lucide-react';
import Button from './Button';
import { motion, useReducedMotion } from 'framer-motion';
import type { Variants } from 'framer-motion';

export const HeroSection: React.FC = () => {
  const { setCurrentPage } = useApp();
  const prefersReducedMotion = useReducedMotion();

  // Simple clean animations
  const fadeUp: Variants = {
    hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 20 },
    visible: (custom: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: custom * 0.12,
        duration: 0.65,
        ease: "easeOut"
      }
    })
  };

  return (
    <div className="relative w-full bg-brand-bg py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden border-b border-slate-100">
      
      {/* Soft background decor (subtle glows) */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-brand-purple/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/10 w-96 h-96 bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
        
        {/* Left Side: Text and CTAs */}
        <div className="lg:col-span-5 flex flex-col space-y-6 sm:space-y-7 text-left">
          
          {/* Badge */}
          <motion.div 
            custom={0}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="self-start inline-flex items-center space-x-2 px-3 py-1 bg-brand-purple/10 text-[11px] font-bold text-brand-purple rounded-full tracking-widest font-display uppercase border border-brand-purple/5"
          >
            <Sparkles className="w-3.5 h-3.5 fill-brand-purple/20 animate-pulse" />
            <span>Campus life, reimagined.</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            custom={1}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-5xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-brand-text font-display leading-[1.05]"
          >
            Find your <br />
            <span className="font-accent italic text-brand-purple font-normal tracking-wide relative inline-block py-1">
              people.
              <span className="absolute bottom-1 left-0 right-0 h-1 bg-brand-purple/15 rounded-full" />
            </span>
          </motion.h1>

          {/* Supporting Text */}
          <motion.p 
            custom={2}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="text-base sm:text-lg text-brand-text-sec leading-relaxed max-w-md font-sans"
          >
            Discover events, join communities, and create memories that make every moment on campus count.
          </motion.p>

          {/* CTAs */}
          <motion.div 
            custom={3}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage('explore')}
              className="flex items-center justify-center space-x-2 shadow-lg shadow-brand-purple/15 hover:shadow-xl hover:shadow-brand-purple/25 transition-all font-bold"
            >
              <span>Explore Events</span>
              <ArrowRight className="w-4.5 h-4.5" />
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              onClick={() => setCurrentPage('create-event')}
              className="flex items-center justify-center space-x-2 border-slate-200 hover:border-brand-purple hover:bg-brand-purple/5 font-bold"
            >
              <PlusCircle className="w-4.5 h-4.5 text-brand-purple" />
              <span>Create Event</span>
            </Button>
          </motion.div>
        </div>

        {/* Right Side: Floating Student Collage & Social Proof */}
        <div className="lg:col-span-7 relative h-[420px] sm:h-[480px] w-full flex items-center justify-center mt-6 lg:mt-0 select-none">
          <div className="relative w-full max-w-[500px] h-full flex items-center justify-center">
            
            {/* Collage Image 1: Main Center-Left */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -8 }}
              animate={{ opacity: 1, scale: 1, rotate: -4 }}
              transition={{ duration: 0.8, delay: 0.15, ease: "easeOut" }}
              className="absolute left-6 top-10 w-[200px] sm:w-[240px] aspect-[4/5] rounded-[2rem] p-2 bg-white shadow-[0_15px_30px_rgba(108,59,255,0.06)] border border-slate-100 z-10 animate-float-slow overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=500" 
                alt="Students laughing" 
                className="w-full h-full object-cover rounded-[1.65rem] pointer-events-none" 
              />
            </motion.div>

            {/* Collage Image 2: Top-Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: 10 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="absolute right-4 top-4 w-[160px] sm:w-[180px] aspect-square rounded-[1.75rem] p-1.5 bg-white shadow-[0_12px_24px_rgba(108,59,255,0.05)] border border-slate-100 z-20 animate-float-medium overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400" 
                alt="Student networking" 
                className="w-full h-full object-cover rounded-[1.45rem] pointer-events-none" 
              />
            </motion.div>

            {/* Collage Image 3: Bottom-Right */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, rotate: -6 }}
              animate={{ opacity: 1, scale: 1, rotate: -2 }}
              transition={{ duration: 0.8, delay: 0.45, ease: "easeOut" }}
              className="absolute right-10 bottom-6 w-[170px] sm:w-[200px] aspect-[4/3] rounded-[1.75rem] p-2 bg-white shadow-[0_15px_30px_rgba(108,59,255,0.07)] border border-slate-100 z-10 animate-float-fast overflow-hidden"
            >
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400" 
                alt="Student workshop collaboration" 
                className="w-full h-full object-cover rounded-[1.45rem] pointer-events-none" 
              />
            </motion.div>

            {/* Social Proof Pill overlaying the bottom/center */}
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.6, ease: "easeOut" }}
              className="absolute bottom-16 left-8 sm:left-4 z-30 bg-white/95 backdrop-blur-md border border-slate-100 p-4.5 rounded-3xl shadow-[0_20px_40px_rgba(108,59,255,0.12)] w-[260px] sm:w-[280px] text-left hover:scale-[1.02] transition-transform duration-300 animate-float-medium"
            >
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-2xl bg-brand-purple/10 flex items-center justify-center flex-shrink-0 text-brand-purple shadow-sm">
                  <Users className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-base font-bold text-brand-text font-display">2.3K+ Students</h4>
                  <p className="text-xs text-brand-text-sec font-semibold mt-0.5">joined today</p>
                </div>
                <div className="flex-grow flex justify-end">
                  <span className="flex h-2.5 w-2.5 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                  </span>
                </div>
              </div>
              <div className="flex items-center space-x-1.5 mt-3 pt-3 border-t border-slate-100">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60" alt="Student" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=60" alt="Student" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=60" alt="Student" className="w-6 h-6 rounded-full border-2 border-white object-cover" />
                </div>
                <span className="text-[10px] text-brand-text-sec font-bold tracking-tight">Active at Greenwood Uni & more</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;

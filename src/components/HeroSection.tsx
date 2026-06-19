import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Music, Laptop, Camera, Users, Clock, Play, ArrowUpRight } from 'lucide-react';
import Button from './Button';

// Mock live notifications for the Evida living campus
const liveNotifications = [
  { id: 1, text: "Golden Hour Botanical Yoga just filled up", label: "Event Full" },
  { id: 2, text: "Google SWE Internship gains 140 new saves today", label: "Trending Career" },
  { id: 3, text: "Photography Club scheduled: Autumn Zine Launch", label: "Club Update" },
  { id: 4, text: "Fall Hackathon RSVPs close in 12 hours", label: "Deadline Alert" },
  { id: 5, text: "Creative Coding workshop: 22 spots remaining", label: "Academic Mixer" }
];

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedOpportunityId } = useApp();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Motion Values (tracking pointer relative to container)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor parallax
  const springConfig = { damping: 25, stiffness: 100 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Subtle parallax translates (maximum offset delta 12px for maximum responsiveness)
  const cardParallaxX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const cardParallaxY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);
  const cardParallaxXInverse = useTransform(smoothX, [-0.5, 0.5], [10, -10]);
  const cardParallaxYInverse = useTransform(smoothY, [-0.5, 0.5], [10, -10]);

  const bgParallaxX = useTransform(smoothX, [-0.5, 0.5], [-20, 20]);
  const bgParallaxY = useTransform(smoothY, [-0.5, 0.5], [-20, 20]);

  // Live alert rotation states
  const [notificationIndex, setNotificationIndex] = useState(0);
  const [showNotification, setShowNotification] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(false);
      setTimeout(() => {
        setNotificationIndex((prev) => (prev + 1) % liveNotifications.length);
        setShowNotification(true);
      }, 500); // fade out duration
    }, 6000); // Cycle every 6 seconds

    return () => clearInterval(interval);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || prefersReducedMotion) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  // Staggered Entrance Animations
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, filter: prefersReducedMotion ? 'none' : 'blur(10px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.9, 
        ease: [0.16, 1, 0.3, 1] as const
      } 
    }
  };

  const dashboardVariants = {
    hidden: { opacity: 0, scale: 0.96 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.2,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.2
      }
    }
  };

  const handleOpportunityClick = () => {
    setSelectedOpportunityId('opp-linear-intern');
    setCurrentPage('opportunity-details');
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full bg-[#030712] py-24 sm:py-32 px-6 md:px-12 overflow-hidden select-none border-b border-white/5"
    >
      
      {/* 1. RADIAL BLOB LIGHTS (Obsidian Glow Layers) */}
      <motion.div 
        style={{ x: prefersReducedMotion ? 0 : bgParallaxX, y: prefersReducedMotion ? 0 : bgParallaxY }}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        {/* Glowing Purple light */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.15, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-40 left-1/4 w-[500px] h-[500px] bg-brand-purple/20 rounded-full blur-[140px] opacity-70"
        />

        {/* Glowing Sky Blue light */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1.1, 0.9, 1.1],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-10 right-1/4 w-[600px] h-[600px] bg-brand-blue/15 rounded-full blur-[160px] opacity-60"
        />

        {/* Glowing Leaf Green light */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [0.9, 1.1, 0.9],
            x: [20, -20, 20],
            y: [-30, 20, -30]
          }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-brand-green/10 rounded-full blur-[120px] opacity-45"
        />
      </motion.div>

      {/* 2. GLOWING GRID BACKGROUND PATTERN */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-70" />

      {/* 3. HERO GRID CONTENT */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* LEFT COLUMN: Editorial Header */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 space-y-8 text-left"
        >
          {/* Badge Tag */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-3.5 py-1 bg-white/5 border border-white/10 text-xs font-bold text-slate-300 rounded-full font-display shadow-inner backdrop-blur-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-purple fill-brand-purple/20 animate-pulse" />
            <span>Campus life, reimagined</span>
          </motion.div>

          {/* Large Editorial Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-6xl sm:text-[5.5rem] font-bold tracking-tight text-white font-display leading-[0.95]"
          >
            Life's happening. <br />
            <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-green bg-clip-text text-transparent">
              Don't miss it.
            </span>
          </motion.h1>

          {/* Editorial Paragraph */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-slate-400 leading-relaxed max-w-xl font-sans"
          >
            Discover events, opportunities, communities, internships, and experiences that help you grow beyond the classroom.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage('explore')}
              className="flex items-center justify-center space-x-2 shadow-[0_0_30px_rgba(124,58,237,0.25)] hover:shadow-[0_0_40px_rgba(124,58,237,0.4)] border-none"
            >
              <span>Explore Campus</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <button
              onClick={() => setCurrentPage('opportunities')}
              className="inline-flex items-center justify-center font-display rounded-full transition-all duration-200 border border-white/10 text-white hover:bg-white/5 hover:border-white/20 px-7 py-3.5 text-base font-bold tracking-wide active:scale-95"
            >
              <Play className="w-4.5 h-4.5 mr-2 fill-white/10 text-white" />
              <span>Watch Demo</span>
            </button>
          </motion.div>

          {/* Social Proof metrics */}
          <motion.div 
            variants={itemVariants}
            className="flex items-center space-x-3.5 pt-6 border-t border-white/5 max-w-md"
          >
            <div className="flex -space-x-2.5">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=80" alt="Maya" className="w-7 h-7 rounded-full border-2 border-[#030712] object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=80" alt="Student" className="w-7 h-7 rounded-full border-2 border-[#030712] object-cover shadow-md" />
              <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=80" alt="Student" className="w-7 h-7 rounded-full border-2 border-[#030712] object-cover shadow-md" />
            </div>
            <p className="text-xs text-slate-500 font-semibold flex items-center select-none leading-none">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green mr-2 animate-ping" />
              Join 1,200+ students discovering campus opportunities this week
            </p>
          </motion.div>

        </motion.div>

        {/* RIGHT COLUMN: Overlapping Floating UI Dashboard */}
        <motion.div 
          variants={dashboardVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-6 relative h-[540px] w-full flex items-center justify-center mt-12 lg:mt-0 select-none"
        >
          
          {/* BACKGROUND MATTE DASHBOARD PANEL MOCK (Noventis Depth Frame) */}
          <div className="absolute inset-0 bg-slate-900/20 rounded-[2.5rem] border border-white/[0.04] backdrop-blur-sm -z-10 shadow-2xl overflow-hidden">
            {/* Subtle dashboard lines */}
            <div className="absolute top-0 left-0 right-0 h-11 border-b border-white/[0.04] bg-white/[0.02] flex items-center px-5 space-x-2">
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
              <div className="flex-grow" />
              <div className="w-24 h-4 bg-white/[0.03] rounded" />
            </div>
            <div className="absolute inset-0 pt-16 px-6 grid grid-cols-2 gap-6 opacity-30 pointer-events-none">
              <div className="space-y-4">
                <div className="h-6 bg-white/[0.05] rounded-xl w-3/4" />
                <div className="h-20 bg-white/[0.03] rounded-2xl" />
                <div className="h-20 bg-white/[0.03] rounded-2xl" />
              </div>
              <div className="space-y-4">
                <div className="h-6 bg-white/[0.05] rounded-xl w-1/2" />
                <div className="h-44 bg-white/[0.03] rounded-2xl" />
              </div>
            </div>
          </div>

          {/* CARD 1: Open Mic Night (Tonight • 7:00 PM) */}
          <motion.div
            style={{ x: cardParallaxX, y: cardParallaxY }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -12, 0],
              x: [0, 4, 0]
            }}
            transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-6 z-20 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] w-[210px] text-left hover:border-white/20 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-purple/20 flex items-center justify-center flex-shrink-0 text-brand-purple shadow-inner">
                <Music className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate font-display">Open Mic Night</h4>
                <p className="text-[10px] text-brand-purple font-bold mt-0.5">Tonight • 7:00 PM</p>
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-3 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mr-2" />
              Campus Center Lounge
            </p>
          </motion.div>

          {/* CARD 2: Google Internship (Applications Open) */}
          <motion.div
            style={{ x: cardParallaxXInverse, y: cardParallaxYInverse }}
            animate={prefersReducedMotion ? {} : {
              y: [0, 10, 0],
              x: [0, -5, 0]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            className="absolute top-28 right-6 z-10 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-5 rounded-2xl shadow-[0_12px_40px_rgba(0,0,0,0.5)] w-[230px] text-left hover:border-white/20 transition-colors duration-300 cursor-pointer"
            onClick={handleOpportunityClick}
          >
            <div className="flex justify-between items-start">
              <span className="bg-brand-blue/10 text-brand-blue border border-brand-blue/20 text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display">
                Internship
              </span>
              <ArrowUpRight className="w-4 h-4 text-slate-500 hover:text-white" />
            </div>
            <h4 className="text-sm font-bold text-white font-display mt-2">Google SWE Intern</h4>
            <p className="text-[10px] text-slate-400 font-semibold mt-0.5">Applications Open</p>
            <p className="text-[11px] text-brand-blue font-bold mt-3 hover:underline">Apply Now →</p>
          </motion.div>

          {/* CARD 3: Hackathon (Starts in 2 Days) */}
          <motion.div
            style={{ x: cardParallaxX, y: cardParallaxYInverse }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -8, 0],
              x: [0, -6, 0]
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            className="absolute top-[200px] left-14 z-30 bg-slate-950/80 backdrop-blur-xl border border-white/10 p-5 rounded-[1.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.6)] w-[240px] text-left hover:border-white/20 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3.5">
              <div className="w-9 h-9 rounded-xl bg-brand-green/20 flex items-center justify-center flex-shrink-0 text-brand-green shadow-inner">
                <Laptop className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate font-display">Fall Hackathon</h4>
                <p className="text-[10px] text-brand-green font-bold mt-0.5">Starts in 2 days</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 pt-3.5 border-t border-white/5 text-[10px] font-semibold text-slate-400">
              <span className="flex items-center"><Clock className="w-3.5 h-3.5 mr-1" /> 48 hours left</span>
              <span className="text-white hover:underline cursor-pointer" onClick={() => setCurrentPage('explore')}>Register →</span>
            </div>
          </motion.div>

          {/* CARD 4: Photography Club (127 Members) */}
          <motion.div
            style={{ x: cardParallaxXInverse, y: cardParallaxY }}
            animate={prefersReducedMotion ? {} : {
              y: [0, 12, 0],
              x: [0, 5, 0]
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 3 }}
            className="absolute bottom-24 left-6 z-20 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] w-[200px] text-left hover:border-white/20 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-blue/20 flex items-center justify-center flex-shrink-0 text-brand-blue shadow-inner">
                <Camera className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate font-display">Photography Club</h4>
                <p className="text-[10px] text-slate-400 font-semibold mt-0.5">127 Members</p>
              </div>
            </div>
          </motion.div>

          {/* CARD 5: Networking Event (85 Attending) */}
          <motion.div
            style={{ x: cardParallaxXInverse, y: cardParallaxYInverse }}
            animate={prefersReducedMotion ? {} : {
              y: [0, 8, 0],
              x: [0, -3, 0]
            }}
            transition={{ duration: 17, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
            className="absolute bottom-16 right-10 z-20 bg-slate-900/60 backdrop-blur-xl border border-white/10 p-4.5 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.5)] w-[210px] text-left hover:border-white/20 transition-colors duration-300"
          >
            <div className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-brand-green/20 flex items-center justify-center flex-shrink-0 text-brand-green shadow-inner">
                <Users className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-white truncate font-display">Networking Event</h4>
                <p className="text-[10px] text-brand-green font-bold mt-0.5">85 attending</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-[9px] text-slate-400 font-semibold pt-2.5 border-t border-white/5">
              <span>Alumni Panels</span>
              <span className="text-brand-green cursor-pointer hover:underline" onClick={() => setCurrentPage('explore')}>Join</span>
            </div>
          </motion.div>

          {/* LIVE CAMPUS TOAST (Cycled Overlay) */}
          <div className="absolute -bottom-4 z-40 w-full max-w-[340px] px-4 sm:px-0">
            <AnimatePresence mode="wait">
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95, filter: prefersReducedMotion ? 'none' : 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, scale: 0.95, filter: prefersReducedMotion ? 'none' : 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="bg-[#0f172a]/90 backdrop-blur-xl text-white py-3 px-4.5 rounded-2xl border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.6)] flex items-center space-x-3.5 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-4 h-4 text-brand-purple" />
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-[9px] text-brand-green uppercase font-bold tracking-wider font-display">
                      {liveNotifications[notificationIndex].label}
                    </p>
                    <p className="text-[11px] font-semibold text-slate-300 leading-snug line-clamp-1">
                      {liveNotifications[notificationIndex].text}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </motion.div>
        
      </div>
    </div>
  );
};

export default HeroSection;

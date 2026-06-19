import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Sparkles, ArrowRight, Music, Laptop, Award, Clock, Users, Activity, Bell } from 'lucide-react';
import Button from './Button';

// Mock live notifications for the Evida living campus
const liveNotifications = [
  { id: 1, text: "New event added: Golden Hour Botanical Yoga", icon: <Sparkles className="w-4 h-4 text-brand-purple" /> },
  { id: 2, text: "Photography Club gained 12 new members", icon: <Users className="w-4 h-4 text-emerald-600" /> },
  { id: 3, text: "Google Internship deadline approaching (3 days left)", icon: <Bell className="w-4 h-4 text-rose-500 animate-bounce" /> },
  { id: 4, text: "Intramural Soccer tournament RSVPs filled up", icon: <Activity className="w-4 h-4 text-amber-500" /> },
  { id: 5, text: "Hackathon workshop: Git & GitHub 101 started", icon: <Laptop className="w-4 h-4 text-cyan-500" /> }
];

export const HeroSection: React.FC = () => {
  const { setCurrentPage, setSelectedOpportunityId } = useApp();
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax Motion Values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth springs for cursor parallax
  const springConfig = { damping: 30, stiffness: 120 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Transform outputs for parallax cards (maximum 5px - 10px shift)
  const cardParallaxX = useTransform(smoothX, [-0.5, 0.5], [-8, 8]);
  const cardParallaxY = useTransform(smoothY, [-0.5, 0.5], [-8, 8]);
  const cardParallaxXInverse = useTransform(smoothX, [-0.5, 0.5], [6, -6]);
  const cardParallaxYInverse = useTransform(smoothY, [-0.5, 0.5], [6, -6]);

  const bgParallaxX = useTransform(smoothX, [-0.5, 0.5], [-12, 12]);
  const bgParallaxY = useTransform(smoothY, [-0.5, 0.5], [-12, 12]);

  // Live notification rotation states
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

  // Track cursor position relative to container
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

  // Staggered Entrance Variants
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25, filter: prefersReducedMotion ? 'none' : 'blur(8px)' },
    visible: { 
      opacity: 1, 
      y: 0, 
      filter: 'blur(0px)',
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] as const 
      } 
    }
  };

  const cardContainerVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.16, 1, 0.3, 1] as const,
        delay: 0.4
      }
    }
  };

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full max-w-7xl mx-auto py-16 sm:py-24 px-6 md:px-12 rounded-[2rem] border border-brand-lavender/25 shadow-sm bg-white overflow-hidden select-none transition-all duration-300"
    >
      
      {/* BACKGROUND BLOBS: slow breathing animations + mouse parallax */}
      <motion.div 
        style={{ x: prefersReducedMotion ? 0 : bgParallaxX, y: prefersReducedMotion ? 0 : bgParallaxY }}
        className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      >
        {/* Soft Lavender Blob (Breathing scale) */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.12, 1],
            x: [0, 15, 0],
            y: [0, -10, 0]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-20 left-10 w-96 h-96 bg-brand-lavender/40 rounded-full blur-3xl opacity-60"
        />

        {/* Soft Green Blob */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1, 1.18, 1],
            x: [0, -20, 0],
            y: [0, 15, 0]
          }}
          transition={{
            duration: 35,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-brand-green/10 rounded-full blur-[90px] opacity-40"
        />

        {/* Warm Peach/Cream Blob */}
        <motion.div
          animate={prefersReducedMotion ? {} : {
            scale: [1.1, 0.95, 1.1],
            x: [10, -10, 10],
            y: [-15, 10, -15]
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4
          }}
          className="absolute top-1/3 left-1/3 w-80 h-80 bg-brand-peach/30 rounded-full blur-[80px] opacity-40"
        />
      </motion.div>

      {/* Decorative tiny stars/sparkles */}
      <div className="absolute top-10 right-12 text-brand-purple/20 hidden sm:block animate-pulse">
        <Sparkles className="w-5 h-5" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* LEFT SIDE: Heading & Actions */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-7 space-y-6 text-left"
        >
          {/* Badge */}
          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center space-x-2 px-4 py-1.5 bg-brand-purple/5 border border-brand-purple/15 text-xs font-bold text-brand-purple rounded-full font-display shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-brand-purple" />
            <span>Your campus, your community</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 
            variants={itemVariants}
            className="text-5xl sm:text-7xl font-bold tracking-tight text-brand-text font-display leading-[1.05]"
          >
            Your next <br />
            <span className="bg-gradient-to-r from-brand-purple via-brand-blue to-brand-green bg-clip-text text-transparent">
              opportunity
            </span>{" "}
            <br />
            is waiting.
          </motion.h1>

          {/* Description */}
          <motion.p 
            variants={itemVariants}
            className="text-lg sm:text-xl text-brand-text-sec leading-relaxed max-w-xl"
          >
            Discover events, communities, clubs, and opportunities that make campus life unforgettable.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2"
          >
            <Button
              variant="primary"
              size="lg"
              onClick={() => setCurrentPage('explore')}
              className="flex items-center justify-center space-x-2 shadow-lg shadow-brand-purple/10 hover:shadow-brand-purple/20 transition-all font-bold"
            >
              <span>Explore Campus</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
            
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setCurrentPage('profile')}
              className="flex items-center justify-center space-x-2 border border-brand-lavender/35 hover:bg-brand-lavender/10"
            >
              <span>Join Evida</span>
            </Button>
          </motion.div>

          {/* Social Proof */}
          <motion.p 
            variants={itemVariants}
            className="text-xs text-brand-text-sec/60 font-semibold pt-4 flex items-center"
          >
            <span className="w-2 h-2 rounded-full bg-brand-purple inline-block mr-2 animate-ping" />
            Join 1,200+ students discovering communities this week.
          </motion.p>

        </motion.div>

        {/* RIGHT SIDE: Overlapping Floating Ecosystem Cards */}
        <motion.div 
          variants={cardContainerVariants}
          initial="hidden"
          animate="visible"
          className="lg:col-span-5 relative h-[500px] w-full flex items-center justify-center mt-8 lg:mt-0"
        >
          
          {/* Card 1: Open Mic Night (Top Left) */}
          <motion.div
            style={{ x: cardParallaxX, y: cardParallaxY }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -10, 0],
              x: [0, 5, 0]
            }}
            transition={{
              duration: 18,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="absolute top-8 left-2 z-20 bg-white/85 backdrop-blur-md p-4 rounded-2xl shadow-md border border-brand-lavender/25 w-[190px] text-left hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-xl bg-brand-purple/15 flex items-center justify-center flex-shrink-0 text-brand-purple">
                <Music className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-brand-text truncate font-display">Open Mic Night</h4>
                <p className="text-[9px] text-brand-purple font-bold">Tonight • 7:00 PM</p>
              </div>
            </div>
            <p className="text-[10px] text-brand-text-sec mt-2 flex items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple mr-1.5" />
              Campus Center Lounge
            </p>
          </motion.div>

          {/* Card 2: Design Club (Middle Right) */}
          <motion.div
            style={{ x: cardParallaxXInverse, y: cardParallaxYInverse }}
            animate={prefersReducedMotion ? {} : {
              y: [0, 12, 0],
              x: [0, -6, 0]
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5
            }}
            className="absolute top-16 right-2 z-10 bg-white/90 backdrop-blur-md p-4.5 rounded-2xl shadow-md border border-brand-lavender/25 w-[190px] text-left hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-[#bd5133]/10 flex items-center justify-center flex-shrink-0 text-[#bd5133]">
                <Award className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-brand-text truncate font-display">Design Club</h4>
                <p className="text-[9px] text-[#bd5133] font-bold">Monthly Meeting</p>
              </div>
            </div>
            <p className="text-[10px] text-brand-text-sec mt-2.5 flex items-center font-medium">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-text-sec/40" />
              Tomorrow • 5:30 PM
            </p>
          </motion.div>

          {/* Card 3: Google SWE Internship (Center Focus) */}
          <motion.div
            style={{ x: cardParallaxX, y: cardParallaxYInverse }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -8, 0],
              x: [0, -4, 0]
            }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.5
            }}
            className="absolute top-[165px] left-12 z-30 bg-white p-5 rounded-[1.5rem] shadow-xl border border-brand-lavender/35 w-[230px] text-left hover:scale-[1.03] hover:shadow-2xl transition-all duration-300"
          >
            <span className="bg-brand-purple/10 text-brand-purple text-[8px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display select-none">
              Career Opportunity
            </span>
            <h4 className="text-sm font-bold text-brand-text font-display pt-1.5">Google SWE Internship</h4>
            <p className="text-[10px] text-brand-text-sec font-semibold mt-0.5">Google Software Engineering</p>
            
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-brand-lavender/15 text-[10px] font-semibold">
              <span className="text-rose-600 flex items-center">
                <Clock className="w-3 h-3 mr-1" />
                Close in 3 days
              </span>
              <span className="text-brand-purple cursor-pointer hover:underline" onClick={() => { setSelectedOpportunityId('opp-linear-intern'); setCurrentPage('opportunity-details'); }}>Apply Now →</span>
            </div>
          </motion.div>

          {/* Card 4: Hackathon Starts in 2h (Bottom Left) */}
          <motion.div
            style={{ x: cardParallaxXInverse, y: cardParallaxY }}
            animate={prefersReducedMotion ? {} : {
              y: [0, 8, 0],
              x: [0, 5, 0]
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3
            }}
            className="absolute bottom-16 left-2 z-20 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-md border border-brand-lavender/25 w-[180px] text-left hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0 text-emerald-600">
                <Laptop className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-brand-text truncate font-display">Fall Hackathon</h4>
                <p className="text-[9px] text-emerald-600 font-bold">Starts in 2 hours</p>
              </div>
            </div>
          </motion.div>

          {/* Card 5: Sarah Joined (Top Right background layer) */}
          <motion.div
            style={{ x: cardParallaxX, y: cardParallaxYInverse }}
            animate={prefersReducedMotion ? {} : {
              y: [0, -6, 0],
              x: [0, 8, 0]
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.2
            }}
            className="absolute top-2 right-12 z-0 bg-white/80 backdrop-blur-sm p-3 rounded-2xl shadow-sm border border-brand-lavender/20 w-[170px] text-left"
          >
            <div className="flex items-center space-x-2">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=60" alt="Sarah" className="w-6.5 h-6.5 rounded-full object-cover shadow-inner" />
              <div className="min-w-0">
                <p className="text-[10px] text-brand-text font-semibold truncate leading-none">Sarah joined</p>
                <p className="text-[9px] text-brand-purple font-semibold truncate">Photography Club</p>
              </div>
            </div>
            <span className="text-[8px] text-brand-text-sec/40 block mt-1.5 text-right font-medium">2m ago</span>
          </motion.div>

          {/* Card 6: Tennis Mixer (Bottom Right) */}
          <motion.div
            style={{ x: cardParallaxXInverse, y: cardParallaxY }}
            animate={prefersReducedMotion ? {} : {
              y: [0, 10, 0],
              x: [0, -4, 0]
            }}
            transition={{
              duration: 17,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2.2
            }}
            className="absolute bottom-6 right-6 z-20 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-md border border-brand-lavender/25 w-[180px] text-left hover:scale-[1.03] hover:shadow-lg transition-all duration-300"
          >
            <div className="flex items-center space-x-2.5">
              <div className="w-8.5 h-8.5 rounded-xl bg-cyan-50 flex items-center justify-center flex-shrink-0 text-cyan-600">
                <Activity className="w-4.5 h-4.5" />
              </div>
              <div className="min-w-0">
                <h4 className="text-xs font-bold text-brand-text truncate font-display">Tennis Mixer</h4>
                <p className="text-[9px] text-cyan-600 font-bold">Starts in 1 hour</p>
              </div>
            </div>
            <div className="flex items-center justify-between mt-3 text-[9px] text-brand-text-sec font-semibold">
              <span>Intramural Courts</span>
              <span className="bg-brand-purple/10 text-brand-purple px-1.5 py-0.5 rounded-full">Rec</span>
            </div>
          </motion.div>

          {/* LIVE CAMPUS ACTIVITY TOAST: rotation cycles + slide animations */}
          <div className="absolute bottom-0 z-40 w-full max-w-[340px] px-4 sm:px-0">
            <AnimatePresence mode="wait">
              {showNotification && (
                <motion.div
                  initial={{ opacity: 0, y: 15, scale: 0.95, filter: prefersReducedMotion ? 'none' : 'blur(4px)' }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, scale: 0.95, filter: prefersReducedMotion ? 'none' : 'blur(4px)' }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as const }}
                  className="bg-brand-text/95 backdrop-blur-md text-white py-3 px-4.5 rounded-2xl border border-white/10 shadow-lg flex items-center space-x-3 text-left"
                >
                  <div className="w-8 h-8 rounded-lg bg-white/15 flex items-center justify-center flex-shrink-0">
                    {liveNotifications[notificationIndex].icon}
                  </div>
                  <div className="min-w-0 flex-grow">
                    <p className="text-[10px] text-brand-peach uppercase font-bold tracking-wider font-display">Live Campus Alert</p>
                    <p className="text-[11px] font-semibold text-white/90 leading-snug line-clamp-1">
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

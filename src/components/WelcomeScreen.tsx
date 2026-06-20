import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import { Camera, Check, ArrowRight, School, Calendar, BookOpen, GraduationCap, ArrowLeft } from 'lucide-react';
import EvidaLogo from './EvidaLogo';

export const WelcomeScreen: React.FC = () => {
  const { 
    setIsAuthenticated, 
    setIsOnboarded, 
    updateProfile, 
    profile 
  } = useApp();

  // Screen phase states: 'welcome' | 'auth' | 'step1' | 'step2' | 'step3' | 'step4' | 'success'
  const [phase, setPhase] = useState<'welcome' | 'auth' | 'step1' | 'step2' | 'step3' | 'step4' | 'success'>('welcome');
  
  // Onboarding Form States
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState(profile.avatar);
  const [selectedSchool, setSelectedSchool] = useState('Livingstone College');
  const [gradYear, setGradYear] = useState('2026');
  const [major, setMajor] = useState('');
  const [studentStatus, setStudentStatus] = useState<'Freshman' | 'Sophomore' | 'Junior' | 'Senior' | 'Graduate'>('Junior');
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedLookingFor, setSelectedLookingFor] = useState<string[]>([]);

  // List of interests options
  const interestsOptions = [
    'Sports', 'Technology', 'Business', 'Music', 'Art', 'Networking', 
    'Gaming', 'Fashion', 'Community Service', 'Entrepreneurship', 
    'Career Development', 'Student Organizations'
  ];

  // List of looking for options
  const lookingForOptions = [
    'Events', 'Clubs', 'Friends', 'Networking', 'Opportunities', 
    'Internships', 'Campus Activities'
  ];

  // Handle Interest Chip Toggle
  const toggleInterest = (interest: string) => {
    setSelectedInterests(prev => 
      prev.includes(interest)
        ? prev.filter(i => i !== interest)
        : [...prev, interest]
    );
  };

  // Handle Looking For Chip Toggle
  const toggleLookingFor = (item: string) => {
    setSelectedLookingFor(prev => 
      prev.includes(item)
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  const handleFinishOnboarding = () => {
    const fullName = `${firstName || 'Alex'} ${lastName || 'Johnson'}`;
    const formattedGradYear = `'${gradYear.slice(-2)}`;
    // Merge selected expectations into interests or bio
    const mergedInterests = [...selectedInterests, ...selectedLookingFor];
    
    updateProfile(
      fullName,
      `Looking for ${selectedLookingFor.join(', ').toLowerCase()} on campus. Interested in ${selectedInterests.join(', ').toLowerCase()}.`,
      mergedInterests,
      major || 'Computer Science',
      formattedGradYear,
      selectedSchool
    );
    setPhase('success');
  };

  const handleEnterApp = () => {
    setIsAuthenticated(true);
    setIsOnboarded(true);
  };

  // Common transition properties for slide/fade animations
  const slideVariants = {
    initial: { opacity: 0, x: 20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 },
    transition: { duration: 0.35, ease: 'easeInOut' }
  };

  return (
    <div className="flex-1 flex items-center justify-center p-0 md:p-6 h-full w-full relative z-10 select-none bg-[#0F0D11]">
      
      {/* Lava Lamp background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[320px] h-[320px] rounded-full bg-[#FE7F42]/10 blur-[110px] animate-lava-1" />
        <div className="absolute bottom-[15%] right-[15%] w-[380px] h-[380px] rounded-full bg-[#D85A1A]/8 blur-[120px] animate-lava-2" />
      </div>

      {/* Simulator Device Frame */}
      <div className="w-full h-full md:max-w-[430px] md:max-h-[880px] md:h-[92vh] md:rounded-[40px] md:border-[10px] md:border-[#2A2325] md:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] md:overflow-hidden relative flex flex-col bg-[#1A1214] text-white">
        
        {/* Top Notch for simulator */}
        <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-[#2A2325] rounded-b-2xl z-50 pointer-events-none" />
        
        {/* Scrollable Content inside Mobile Frame */}
        <div className="flex-grow overflow-y-auto scrollbar-none relative flex flex-col p-6 pt-10 md:pt-14 pb-8">
          
          {/* Back Button (show if onboarding has started) */}
          {phase !== 'welcome' && phase !== 'success' && (
            <button 
              onClick={() => {
                if (phase === 'auth') setPhase('welcome');
                else if (phase === 'step1') setPhase('auth');
                else if (phase === 'step2') setPhase('step1');
                else if (phase === 'step3') setPhase('step2');
                else if (phase === 'step4') setPhase('step3');
              }}
              className="absolute top-8 left-6 p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-white cursor-pointer z-10"
              aria-label="Back"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
          )}

          <AnimatePresence mode="wait">
            
            {/* Phase 1: WELCOME SCREEN */}
            {phase === 'welcome' && (
              <motion.div 
                key="welcome" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full relative"
              >
                {/* Background image overlay with authentic moments */}
                <div className="absolute inset-x-0 -top-14 -mx-6 h-[50vh] overflow-hidden opacity-30 select-none pointer-events-none">
                  <img 
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800" 
                    alt="Campus Friends" 
                    className="w-full h-full object-cover filter brightness-[0.7] saturate-[1.2]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1A1214]" />
                </div>

                <div className="pt-24 z-10 text-left">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FE7F42]">E-LIFE</span>
                  <h1 className="text-4xl sm:text-[40px] font-black tracking-tight leading-[1.08] uppercase text-white mt-2">
                    COLLEGE ENDS.<br />
                    <span className="text-[#FE7F42] drop-shadow-[0_0_15px_rgba(254,127,66,0.25)]">MEMORIES<br />DON'T.</span>
                  </h1>
                  <p className="text-sm text-white/70 leading-relaxed font-sans mt-4 max-w-[310px]">
                    Discover events, clubs, opportunities and the people shaping your campus experience.
                  </p>
                </div>

                <div className="space-y-4 pt-12 z-10">
                  <button 
                    onClick={() => setPhase('auth')}
                    className="w-full py-4 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#FE7F42]/20 hover:shadow-[#FE7F42]/35 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Get Started</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                  <button 
                    onClick={() => setPhase('auth')}
                    className="w-full py-4 rounded-full border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    Sign In
                  </button>
                  
                  <p className="text-[10px] text-white/40 text-center pt-2">
                    By continuing, you agree to our Terms of Service & Privacy Policy.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 2: SIGN UP OPTIONS */}
            {phase === 'auth' && (
              <motion.div 
                key="auth" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full pt-10"
              >
                <div className="text-center space-y-4 pt-8">
                  <div className="flex justify-center">
                    <EvidaLogo size={48} />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-sans mt-2">Welcome to Evida</h2>
                  <p className="text-xs text-white/60 font-sans max-w-[280px] mx-auto leading-relaxed">
                    College ends. Memories don't. Select an option below to continue to your campus dashboard.
                  </p>
                </div>

                <div className="space-y-3 py-8">
                  {/* Apple */}
                  <button 
                    onClick={() => setPhase('step1')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-white text-black font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white/95 active:scale-[0.99] shadow-md"
                  >
                    <svg className="w-4.5 h-4.5 fill-black" viewBox="0 0 24 24">
                      <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.54 9.103 1.51 12.09 1.01 1.454 2.19 3.082 3.77 3.02 1.52-.06 2.09-.982 3.93-.982 1.829 0 2.362.981 3.924.948 1.605-.03 2.643-1.468 3.62-2.89 1.13-1.656 1.6-3.255 1.629-3.34-.06-.024-3.13-1.2-3.163-4.75-.027-2.985 2.443-4.417 2.553-4.48-1.4-2.05-3.56-2.285-4.32-2.333-1.99-.163-3.486 1.078-4.49 1.078h-.026zm2.464-4.595c.84-.972 1.343-2.3 1.183-3.627-1.127.046-2.502.753-3.315 1.701-.699.799-1.31 2.148-1.144 3.447 1.258.098 2.548-.654 3.276-1.521z" />
                    </svg>
                    <span>Continue with Apple</span>
                  </button>

                  {/* Google */}
                  <button 
                    onClick={() => setPhase('step1')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1A1214] border border-white/15 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2.5 cursor-pointer hover:bg-white/5 active:scale-[0.99] shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Continue with Google</span>
                  </button>

                  {/* School Email */}
                  <button 
                    onClick={() => setPhase('step1')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1A1214] border border-white/15 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-white/5 active:scale-[0.99] shadow-sm"
                  >
                    <span>Continue with School Email</span>
                  </button>

                  {/* Personal Email */}
                  <button 
                    onClick={() => setPhase('step1')}
                    className="w-full py-3.5 px-6 rounded-2xl bg-[#1A1214] border border-white/15 text-white font-semibold text-xs tracking-wide transition-all flex items-center justify-center gap-2 cursor-pointer hover:bg-white/5 active:scale-[0.99] shadow-sm"
                  >
                    <span>Continue with Personal Email</span>
                  </button>
                </div>

                <div className="text-center pt-2">
                  <p className="text-[10px] text-white/30 font-sans leading-relaxed">
                    By signing in, you agree to our Terms of Service.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Phase 3: ONBOARDING STEP 1 - PROFILE INFO */}
            {phase === 'step1' && (
              <motion.div 
                key="step1" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full pt-10"
              >
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#FE7F42] uppercase tracking-wider">Step 1 of 4</span>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Let's get to know you</h2>
                  <p className="text-xs text-white/60 font-sans">Introduce yourself to your campus community.</p>
                </div>

                <div className="flex-grow flex flex-col justify-center py-6 space-y-6">
                  {/* Photo Upload Mockup */}
                  <div className="flex flex-col items-center">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white/10 shadow-xl bg-white/5 flex items-center justify-center">
                        <img 
                          src={avatarUrl} 
                          alt="Avatar Preview" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <button 
                        onClick={() => {
                          // Rotate mock avatars
                          const avatars = [
                            'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
                            'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300',
                            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
                            'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=300'
                          ];
                          const nextIdx = (avatars.indexOf(avatarUrl) + 1) % avatars.length;
                          setAvatarUrl(avatars[nextIdx]);
                        }}
                        className="absolute bottom-0 right-0 p-2 bg-[#FE7F42] hover:bg-[#FF8A4C] text-white rounded-full shadow-lg border border-[#1A1214] cursor-pointer transition-transform active:scale-90"
                      >
                        <Camera className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <span className="text-[10px] text-white/40 mt-2">Tap camera icon to toggle photo</span>
                  </div>

                  {/* Input Fields */}
                  <div className="space-y-4 text-left">
                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">First Name</label>
                      <input 
                        type="text" 
                        placeholder="Alex" 
                        value={firstName} 
                        onChange={(e) => setFirstName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1214] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FE7F42]/30 focus:border-[#FE7F42] transition-all font-sans"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider">Last Name</label>
                      <input 
                        type="text" 
                        placeholder="Johnson" 
                        value={lastName} 
                        onChange={(e) => setLastName(e.target.value)}
                        className="w-full px-4 py-3 bg-[#1A1214] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FE7F42]/30 focus:border-[#FE7F42] transition-all font-sans"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setPhase('step2')}
                    disabled={!firstName}
                    className="w-full py-4 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Phase 4: ONBOARDING STEP 2 - SCHOOL DETAILS */}
            {phase === 'step2' && (
              <motion.div 
                key="step2" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full pt-10"
              >
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#FE7F42] uppercase tracking-wider">Step 2 of 4</span>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Your School</h2>
                  <p className="text-xs text-white/60 font-sans">Link your profile to your college campus details.</p>
                </div>

                <div className="flex-grow flex flex-col justify-center py-4 space-y-4 text-left">
                  {/* School */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                      <School className="w-3 h-3 text-[#FE7F42]" />
                      <span>Select School</span>
                    </label>
                    <select 
                      value={selectedSchool}
                      onChange={(e) => setSelectedSchool(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1214] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FE7F42]/30 focus:border-[#FE7F42] transition-all font-sans cursor-pointer"
                    >
                      <option value="Livingstone College">Livingstone College</option>
                      <option value="University of California, Berkeley">University of California, Berkeley</option>
                      <option value="Stanford University">Stanford University</option>
                      <option value="New York University">New York University</option>
                    </select>
                  </div>

                  {/* Graduation Year */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                      <Calendar className="w-3 h-3 text-[#FE7F42]" />
                      <span>Graduation Year</span>
                    </label>
                    <select 
                      value={gradYear}
                      onChange={(e) => setGradYear(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1214] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FE7F42]/30 focus:border-[#FE7F42] transition-all font-sans cursor-pointer"
                    >
                      <option value="2026">2026</option>
                      <option value="2027">2027</option>
                      <option value="2028">2028</option>
                      <option value="2029">2029</option>
                    </select>
                  </div>

                  {/* Major */}
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                      <BookOpen className="w-3 h-3 text-[#FE7F42]" />
                      <span>Major</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="Computer Science" 
                      value={major} 
                      onChange={(e) => setMajor(e.target.value)}
                      className="w-full px-4 py-3 bg-[#1A1214] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#FE7F42]/30 focus:border-[#FE7F42] transition-all font-sans"
                    />
                  </div>

                  {/* Student Status tag pills */}
                  <div className="space-y-2 pt-1">
                    <label className="text-[10px] font-bold text-white/60 uppercase tracking-wider flex items-center gap-1">
                      <GraduationCap className="w-3 h-3 text-[#FE7F42]" />
                      <span>Student Status</span>
                    </label>
                    <div className="flex flex-wrap gap-1.5">
                      {(['Freshman', 'Sophomore', 'Junior', 'Senior', 'Graduate'] as const).map((status) => {
                        const isSel = studentStatus === status;
                        return (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setStudentStatus(status)}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                              isSel 
                                ? 'bg-[#FE7F42] text-white border-[#FE7F42]' 
                                : 'bg-[#1A1214] text-white/60 border-white/10 hover:border-white/20'
                            }`}
                          >
                            {status}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={() => setPhase('step3')}
                    disabled={!major}
                    className="w-full py-4 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Phase 5: ONBOARDING STEP 3 - INTERESTS */}
            {phase === 'step3' && (
              <motion.div 
                key="step3" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full pt-10"
              >
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#FE7F42] uppercase tracking-wider">Step 3 of 4</span>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-sans">Your Interests</h2>
                  <p className="text-xs text-white/60 font-sans">Select topics that you want to see on your campus feed.</p>
                </div>

                {/* Grid layout of interest options */}
                <div className="flex-grow py-6 overflow-y-auto max-h-[360px] scrollbar-none my-4">
                  <div className="grid grid-cols-2 gap-2">
                    {interestsOptions.map((interest) => {
                      const isSel = selectedInterests.includes(interest);
                      return (
                        <button
                          key={interest}
                          onClick={() => toggleInterest(interest)}
                          className={`py-3 px-4 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                            isSel 
                              ? 'bg-[#FE7F42] text-white border-[#FE7F42] shadow-sm shadow-[#FE7F42]/15' 
                              : 'bg-[#1A1214] text-white/70 border-white/10 hover:border-white/20'
                          }`}
                        >
                          {interest}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={() => setPhase('step4')}
                    disabled={selectedInterests.length === 0}
                    className="w-full py-4 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
                  >
                    <span>Continue</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Phase 6: ONBOARDING STEP 4 - LOOKING FOR */}
            {phase === 'step4' && (
              <motion.div 
                key="step4" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full pt-10"
              >
                <div className="space-y-2 text-left">
                  <span className="text-[10px] font-bold text-[#FE7F42] uppercase tracking-wider">Step 4 of 4</span>
                  <h2 className="text-2xl font-bold tracking-tight text-white font-sans">What are you looking for?</h2>
                  <p className="text-xs text-white/60 font-sans">Select categories you are actively seeking.</p>
                </div>

                {/* List options */}
                <div className="flex-grow py-6 overflow-y-auto max-h-[360px] scrollbar-none my-4">
                  <div className="space-y-2">
                    {lookingForOptions.map((item) => {
                      const isSel = selectedLookingFor.includes(item);
                      return (
                        <button
                          key={item}
                          onClick={() => toggleLookingFor(item)}
                          className={`w-full py-3 px-5 rounded-xl text-xs font-bold text-left border transition-all cursor-pointer flex justify-between items-center ${
                            isSel 
                              ? 'bg-[#FE7F42] text-white border-[#FE7F42] shadow-sm shadow-[#FE7F42]/15' 
                              : 'bg-[#1A1214] text-white/70 border-white/10 hover:border-white/20'
                          }`}
                        >
                          <span>{item}</span>
                          {isSel && <Check className="w-4 h-4" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="pt-2">
                  <button 
                    onClick={handleFinishOnboarding}
                    disabled={selectedLookingFor.length === 0}
                    className="w-full py-4 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]"
                  >
                    <span>Finish</span>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Phase 7: ONBOARDING SUCCESS */}
            {phase === 'success' && (
              <motion.div 
                key="success" 
                variants={slideVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex-grow flex flex-col justify-between h-full pt-10 text-center"
              >
                <div className="flex-grow flex flex-col items-center justify-center space-y-6">
                  {/* Success glow checkmark */}
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-[#FE7F42]/10 border border-[#FE7F42]/30 flex items-center justify-center text-[#FE7F42] shadow-[0_0_30px_rgba(254,127,66,0.3)]">
                      <Check className="w-10 h-10 stroke-[3px]" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold tracking-tight text-white font-sans">You're all set!</h2>
                    <p className="text-xs text-white/60 font-sans max-w-[280px] leading-relaxed">
                      Let's personalise your experience. Your campus profile is active. Welcome home!
                    </p>
                  </div>
                </div>

                <div className="pt-4">
                  <button 
                    onClick={handleEnterApp}
                    className="w-full py-4 rounded-full bg-[#FE7F42] hover:bg-[#FF8A4C] text-white font-bold text-sm tracking-wider uppercase transition-all duration-300 shadow-lg shadow-[#FE7F42]/20 hover:shadow-[#FE7F42]/35 flex items-center justify-center gap-2 cursor-pointer active:scale-[0.98]"
                  >
                    <span>Go to Home</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>

        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;

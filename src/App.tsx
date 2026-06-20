import React from 'react';
import { AppContextProvider, useApp } from './context/AppContext';
import Header from './components/Header';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import WelcomeScreen from './components/WelcomeScreen';
import Home from './pages/Home';
import Explore from './pages/Explore';
import EventDetails from './pages/EventDetails';
import Communities from './pages/Communities';
import CommunityProfile from './pages/CommunityProfile';
import CreateEvent from './pages/CreateEvent';
import Opportunities from './pages/Opportunities';
import OpportunityDetails from './pages/OpportunityDetails';
import Saved from './pages/Saved';
import Profile from './pages/Profile';

const AppContent: React.FC = () => {
  const { 
    currentPage, 
    isLoading, 
    setIsLoading, 
    isAuthenticated, 
    isOnboarded 
  } = useApp();

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  if (!isAuthenticated || !isOnboarded) {
    return <WelcomeScreen />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />;
      case 'explore':
        return <Explore />;
      case 'event-details':
        return <EventDetails />;
      case 'communities':
        return <Communities />;
      case 'community-profile':
        return <CommunityProfile />;
      case 'create-event':
        return <CreateEvent />;
      case 'opportunities':
        return <Opportunities />;
      case 'opportunity-details':
        return <OpportunityDetails />;
      case 'saved':
        return <Saved />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-sans antialiased selection:bg-[#FF7A1A]/10 bg-white text-[#111111] relative">
      {/* Global Soft Warm Background Glows */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[15%] w-[320px] h-[320px] rounded-full bg-[#FF7A1A]/3 blur-[110px] animate-lava-1" />
        <div className="absolute bottom-[15%] right-[15%] w-[380px] h-[380px] rounded-full bg-[#0F766E]/2 blur-[120px] animate-lava-2" />
        <div className="absolute top-[45%] left-[45%] w-[280px] h-[280px] rounded-full bg-[#FF7A1A]/1.5 blur-[100px] animate-lava-3" />
      </div>

      {/* Sticky Top Header Navigation */}
      <Header />

      {/* Main Page Scroll Container */}
      <div className="flex-grow overflow-y-auto custom-scrollbar relative z-10 bg-transparent flex flex-col">
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <AppContextProvider>
      <AppContent />
    </AppContextProvider>
  );
};

export default App;

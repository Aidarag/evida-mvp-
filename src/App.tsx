import React from 'react';
import { AppContextProvider, useApp } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
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
import Messages from './pages/Messages';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

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
      case 'messages':
        return <Messages />;
      default:
        return <Home />;
    }
  };

  const isLandingPage = currentPage === 'home';

  return (
    <div className={`flex h-screen w-screen overflow-hidden font-sans antialiased selection:bg-[#FE7F42]/20 transition-colors duration-300 relative ${
      isLandingPage ? 'bg-[#1A1617] text-white' : 'bg-brand-bg text-brand-text'
    }`}>
      {/* Lava Lamp Background (only on landing page) */}
      {isLandingPage && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-[10%] left-[15%] w-[320px] h-[320px] rounded-full bg-[#FE7F42]/10 blur-[110px] animate-lava-1" />
          <div className="absolute bottom-[15%] right-[15%] w-[380px] h-[380px] rounded-full bg-[#D85A1A]/8 blur-[120px] animate-lava-2" />
          <div className="absolute top-[45%] left-[45%] w-[280px] h-[280px] rounded-full bg-[#B32C1A]/6 blur-[100px] animate-lava-3" />
        </div>
      )}

      {/* Desktop Left Sidebar Navigation (hidden on landing page) */}
      {!isLandingPage && (
        <div className="hidden md:block">
          <Sidebar />
        </div>
      )}

      {/* Main Page Scroll Container */}
      {isLandingPage ? (
        // Mobile Simulator Container for Landing Page on Desktop, Full screen on Mobile
        <div className="flex-1 flex items-center justify-center p-0 md:p-6 h-full w-full relative z-10">
          <div className="w-full h-full md:max-w-[430px] md:max-h-[880px] md:h-[92vh] md:rounded-[40px] md:border-[10px] md:border-[#2A2325] md:shadow-[0_30px_70px_-15px_rgba(0,0,0,0.8)] md:overflow-hidden relative flex flex-col bg-[#1A1617]">
            {/* Top Notch for mobile simulator */}
            <div className="hidden md:block absolute top-0 left-1/2 -translate-x-1/2 w-36 h-6 bg-[#2A2325] rounded-b-2xl z-50 pointer-events-none" />
            
            {/* Scrollable screen content */}
            <div className="flex-grow overflow-y-auto scrollbar-none relative pb-16">
              {renderPage()}
            </div>
            
            {/* Fixed Navbar inside simulator for simulator layout */}
            <Navbar />
          </div>
        </div>
      ) : (
        // Standard full layout for other views
        <div className="flex-grow flex flex-col h-full overflow-y-auto custom-scrollbar relative">
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
          <Navbar />
        </div>
      )}
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

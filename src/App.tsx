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
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex h-screen w-screen overflow-hidden bg-[#080808] text-white font-sans antialiased selection:bg-[#FF7A1A]/20">
      {/* Desktop Left Sidebar Navigation */}
      <div className="hidden md:block">
        <Sidebar />
      </div>

      {/* Main Page Scroll Container */}
      <div className="flex-1 flex flex-col h-full overflow-y-auto custom-scrollbar relative">
        <main className="flex-grow">
          {renderPage()}
        </main>
        <Footer />
      </div>

      {/* Floating Bottom Navigation Bar (Mobile Experience) */}
      <Navbar />
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

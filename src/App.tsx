import React from 'react';
import { AppContextProvider, useApp } from './context/AppContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Explore from './pages/Explore';
import EventDetails from './pages/EventDetails';
import Communities from './pages/Communities';
import CommunityProfile from './pages/CommunityProfile';
import CreateEvent from './pages/CreateEvent';
import Opportunities from './pages/Opportunities';
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
      case 'saved':
        return <Saved />;
      case 'profile':
        return <Profile />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-bg text-brand-text">
      <Navbar />
      <main className="flex-grow">
        {renderPage()}
      </main>
      <Footer />
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

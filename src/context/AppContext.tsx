import React, { createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import type { Event, Community, UserProfile, Opportunity, Discussion } from '../types';
import { mockEvents, mockCommunities, mockOpportunities, initialProfile } from '../data/mockData';

export type PageName = 'home' | 'explore' | 'event-details' | 'communities' | 'create-event' | 'profile' | 'opportunities' | 'saved' | 'community-profile' | 'opportunity-details';

interface AppContextType {
  events: Event[];
  communities: Community[];
  opportunities: Opportunity[];
  profile: UserProfile;
  currentPage: PageName;
  selectedEventId: string | null;
  selectedCommunityId: string | null;
  selectedOpportunityId: string | null;
  isCreateModalOpen: boolean;
  setCreateModalOpen: (open: boolean) => void;
  setCurrentPage: (page: PageName) => void;
  setSelectedEventId: (id: string | null) => void;
  setSelectedCommunityId: (id: string | null) => void;
  setSelectedOpportunityId: (id: string | null) => void;
  rsvpEvent: (eventId: string) => void;
  saveEvent: (eventId: string) => void;
  toggleFollowCommunity: (communityId: string) => void;
  createEvent: (newEvent: Omit<Event, 'id' | 'attendeeCount'>) => void;
  updateProfile: (name: string, bio: string, interests: string[], major: string, graduationYear: string, university: string) => void;
  saveOpportunity: (oppId: string) => void;
  addDiscussionPost: (communityId: string, postText: string) => void;
  exploreActiveTab: 'events' | 'communities' | 'opportunities';
  setExploreActiveTab: (tab: 'events' | 'communities' | 'opportunities') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [events, setEvents] = useState<Event[]>(mockEvents);
  const [communities, setCommunities] = useState<Community[]>(mockCommunities);
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [profile, setProfile] = useState<UserProfile>(initialProfile);
  const [currentPage, setCurrentPageState] = useState<PageName>('home');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [selectedCommunityId, setSelectedCommunityId] = useState<string | null>(null);
  const [selectedOpportunityId, setSelectedOpportunityId] = useState<string | null>(null);
  const [isCreateModalOpen, setCreateModalOpen] = useState(false);
  const [exploreActiveTab, setExploreActiveTab] = useState<'events' | 'communities' | 'opportunities'>('events');

  const setCurrentPage = (page: PageName) => {
    setCurrentPageState(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const rsvpEvent = (eventId: string) => {
    const isRsvped = profile.rsvpEventIds.includes(eventId);
    
    // Toggle RSVP in profile
    setProfile(prev => ({
      ...prev,
      rsvpEventIds: isRsvped
        ? prev.rsvpEventIds.filter(id => id !== eventId)
        : [...prev.rsvpEventIds, eventId]
    }));

    // Update attendeeCount in events list
    setEvents(prevEvents =>
      prevEvents.map(evt => {
        if (evt.id === eventId) {
          return {
            ...evt,
            attendeeCount: isRsvped ? evt.attendeeCount - 1 : evt.attendeeCount + 1
          };
        }
        return evt;
      })
    );
  };

  const saveEvent = (eventId: string) => {
    setProfile(prev => ({
      ...prev,
      savedEventIds: prev.savedEventIds.includes(eventId)
        ? prev.savedEventIds.filter(id => id !== eventId)
        : [...prev.savedEventIds, eventId]
    }));
  };

  const toggleFollowCommunity = (communityId: string) => {
    const isFollowing = profile.followedCommunityIds.includes(communityId);
    
    // Toggle Follow in profile
    setProfile(prev => ({
      ...prev,
      followedCommunityIds: isFollowing
        ? prev.followedCommunityIds.filter(id => id !== communityId)
        : [...prev.followedCommunityIds, communityId]
    }));

    // Update memberCount in communities list
    setCommunities(prevComms =>
      prevComms.map(comm => {
        if (comm.id === communityId) {
          return {
            ...comm,
            memberCount: isFollowing ? comm.memberCount - 1 : comm.memberCount + 1
          };
        }
        return comm;
      })
    );
  };

  const createEvent = (newEventData: Omit<Event, 'id' | 'attendeeCount'>) => {
    const generatedId = `evt-${Date.now()}`;
    const newEvent: Event = {
      ...newEventData,
      id: generatedId,
      attendeeCount: 1 // Organizer is attending
    };
    
    setEvents(prev => [newEvent, ...prev]);
    
    // Auto RSVP the creator
    setProfile(prev => ({
      ...prev,
      rsvpEventIds: [...prev.rsvpEventIds, generatedId]
    }));
  };

  const updateProfile = (name: string, bio: string, interests: string[], major: string, graduationYear: string, university: string) => {
    setProfile(prev => ({
      ...prev,
      name,
      bio,
      interests,
      major,
      graduationYear,
      university
    }));
  };

  const saveOpportunity = (oppId: string) => {
    setProfile(prev => ({
      ...prev,
      savedOpportunityIds: prev.savedOpportunityIds.includes(oppId)
        ? prev.savedOpportunityIds.filter(id => id !== oppId)
        : [...prev.savedOpportunityIds, oppId]
    }));
  };

  const addDiscussionPost = (communityId: string, postText: string) => {
    const newPost: Discussion = {
      id: `disc-${Date.now()}`,
      author: profile.name,
      avatar: profile.avatar,
      text: postText,
      timestamp: 'Just now'
    };

    setCommunities(prevComms =>
      prevComms.map(comm => {
        if (comm.id === communityId) {
          return {
            ...comm,
            discussions: [newPost, ...comm.discussions]
          };
        }
        return comm;
      })
    );
  };

  return (
    <AppContext.Provider
      value={{
        events,
        communities,
        opportunities,
        profile,
        currentPage,
        selectedEventId,
        selectedCommunityId,
        selectedOpportunityId,
        isCreateModalOpen,
        setCreateModalOpen,
        setCurrentPage,
        setSelectedEventId,
        setSelectedCommunityId,
        setSelectedOpportunityId,
        rsvpEvent,
        saveEvent,
        toggleFollowCommunity,
        createEvent,
        updateProfile,
        saveOpportunity,
        addDiscussionPost,
        exploreActiveTab,
        setExploreActiveTab
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppContextProvider');
  }
  return context;
};

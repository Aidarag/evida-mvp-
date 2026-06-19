export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  organizer: string;
  category: 'Social' | 'Career' | 'Sports' | 'Culture' | 'Academic' | 'Wellness' | 'Volunteer';
  image: string;
  attendeeCount: number;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
}

export interface Discussion {
  id: string;
  author: string;
  avatar: string;
  text: string;
  timestamp: string;
}

export interface Resource {
  id: string;
  title: string;
  category: string;
  url: string;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  category: 'Tech' | 'Culture' | 'Sports' | 'Business' | 'Wellness' | 'Creative';
  image: string;
  banner: string;
  logo: string;
  about: string;
  membersList: { name: string; avatar: string; role?: string }[];
  projects: Project[];
  gallery: string[];
  discussions: Discussion[];
  resources: Resource[];
}

export interface Opportunity {
  id: string;
  title: string;
  organizer: string;
  type: 'Internship' | 'Scholarship' | 'Campus Job' | 'Research' | 'Competition';
  description: string;
  requirements: string;
  reward: string;
  deadline: string;
  link?: string;
}

export interface UserProfile {
  name: string;
  major: string;
  university: string;
  bio: string;
  avatar: string;
  interests: string[];
  achievements: string[];
  savedEventIds: string[];
  rsvpEventIds: string[];
  followedCommunityIds: string[];
  savedOpportunityIds: string[];
}


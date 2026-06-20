import type { Event, Community, UserProfile, Opportunity } from '../types';

export const mockEvents: Event[] = [
  {
    id: 'evt-homecoming',
    title: 'Homecoming 2026',
    description: 'The biggest night of the school year! Join us for live student bands, concert lights, free street foods, and a spectacular fireworks show over the campus quad. Bring your friends, celebrate campus culture, and kick off homecoming weekend in style!',
    date: 'Sat, May 24',
    time: '7:00 PM',
    location: 'Main Stadium',
    organizer: 'Student Government Association',
    category: 'Culture',
    image: '/concert_confetti.jpg',
    attendeeCount: 236
  },
  {
    id: 'evt-stem-expo',
    title: 'STEM Expo',
    description: 'Discover cutting-edge research, hands-on student demos, and tech prototypes. Meet industry sponsors from local labs and show off your own builds. Free merchandise, stickers, and pizza for all attendees!',
    date: 'Wed, May 21',
    time: '1:00 PM - 5:00 PM',
    location: 'Student Center Main Hall',
    organizer: 'Women in Tech',
    category: 'Academic',
    image: '/crowd_ribbons.jpg',
    attendeeCount: 142
  },
  {
    id: 'evt-bball',
    title: 'Basketball Tournament',
    description: 'Livingstone College annual basketball showdown! Grab a squad or come cheer from the bleachers. DJ music, half-time student contests, and prizes for the winning team.',
    date: 'Thu, May 22',
    time: '5:00 PM - 9:00 PM',
    location: 'Campus Sports Complex',
    organizer: 'Athletics Department',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 98
  },
  {
    id: 'evt-open-mic',
    title: 'Open Mic Night',
    description: 'Sing, recite poetry, show off your standup comedy, or just cozy up with a warm apple cider. Student performers get a free custom sticker pack.',
    date: 'Fri, May 23',
    time: '8:00 PM - 10:30 PM',
    location: 'Campus Brew Library Café',
    organizer: 'BSU',
    category: 'Social',
    image: '/campus_festival.jpg',
    attendeeCount: 64
  },
  {
    id: 'evt-career-mixer',
    title: 'Career Fair 2026',
    description: 'Looking for internships or part-time student work? Mingle with local startups and student founders. Bring your resumes, grab a custom coffee, and chat in an informal, low-pressure setting.',
    date: 'Mon, May 26',
    time: '3:00 PM - 6:00 PM',
    location: 'Entrepreneurship Hub Center',
    organizer: 'Entrepreneur Society',
    category: 'Career',
    image: '/career_fair.png',
    attendeeCount: 57
  },
  {
    id: 'evt-ai-basics',
    title: 'Workshop: AI Basics',
    description: 'Discover the power of large language models, prompt engineering, and generative AI systems in this hands-on workshop led by industry researchers.',
    date: 'Tue, May 27',
    time: '2:00 PM - 4:00 PM',
    location: 'Main Library Digital Den',
    organizer: 'Tech Innovators',
    category: 'Academic',
    image: '/crowd_ribbons.jpg',
    attendeeCount: 88
  },
  {
    id: 'evt-gala',
    title: 'Black Excellence Gala',
    description: 'An elegant evening celebrating achievements, culture, and unity on campus. Dress to impress for the final student-run gala of the academic year.',
    date: 'Thu, May 29',
    time: '6:30 PM - 10:00 PM',
    location: 'Grand Ballroom',
    organizer: 'BSU',
    category: 'Culture',
    image: '/indoor_party.jpg',
    attendeeCount: 180
  }
];

export const mockCommunities: Community[] = [
  {
    id: 'comm-tech-innovators',
    name: 'Tech Innovators',
    description: 'Building software, hackathons, and learning modern tech together.',
    memberCount: 142,
    category: 'Tech',
    image: '/crowd_ribbons.jpg',
    banner: '/crowd_ribbons.jpg',
    logo: 'Code',
    about: 'Tech Innovators is the premier student tech club on campus.',
    membersList: [
      { name: 'Tariq Al-Fayed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'President' }
    ],
    projects: [
      { id: 'proj-nsbe-map', title: 'Interactive Campus Directory', description: 'A sleek visual directory helping freshmen find classes and student labs.', image: '/crowd_ribbons.jpg' }
    ],
    gallery: [
      '/crowd_ribbons.jpg',
      '/campus_festival.jpg'
    ],
    discussions: [
      { id: 'disc-nsbe-1', author: 'Tariq Al-Fayed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', text: 'Hackathon schedules are live! Make sure your teams are registered.', timestamp: '1 day ago' }
    ],
    resources: [
      { id: 'res-nsbe-1', title: 'Hackathon Tech Stack Setup Guide', category: 'Tutorial', url: '#' }
    ]
  },
  {
    id: 'comm-wistem',
    name: 'Women in Tech',
    description: 'Empowering women in STEM, mentorship circles, and workshops.',
    memberCount: 125,
    category: 'Tech',
    image: '/crowd_ribbons.jpg',
    banner: '/crowd_ribbons.jpg',
    logo: 'Palette',
    about: 'Women in Tech supports professional mentorship and networking.',
    membersList: [
      { name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Event Chair' }
    ],
    projects: [
      { id: 'proj-wistem-code', title: 'Girls Who Code Camp', description: 'Weekly free programming camps for local high school kids.', image: '/crowd_ribbons.jpg' }
    ],
    gallery: [
      '/crowd_ribbons.jpg'
    ],
    discussions: [
      { id: 'disc-wistem-1', author: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Thank you to everyone who supported the Innovation Expo! We had an incredible turnout.', timestamp: '2 days ago' }
    ],
    resources: [
      { id: 'res-wistem-1', title: 'STEM Mentor Circle Registration', category: 'Link', url: '#' }
    ]
  },
  {
    id: 'comm-bsu',
    name: 'BSU',
    description: 'Black Student Union - fostering cultural awareness, community, and excellence.',
    memberCount: 210,
    category: 'Culture',
    image: '/indoor_party.jpg',
    banner: '/campus_festival.jpg',
    logo: 'Users',
    about: 'BSU empowers and connects students of African descent.',
    membersList: [
      { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', role: 'President' },
      { name: 'Aida Garba', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', role: 'Event Planner' }
    ],
    projects: [
      { id: 'proj-zine', title: 'BSU Campus Voice', description: 'Student publications, reflections, and photography on community.', image: '/indoor_party.jpg' }
    ],
    gallery: [
      '/indoor_party.jpg',
      '/campus_festival.jpg'
    ],
    discussions: [
      { id: 'disc-bsu-1', author: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', text: 'Who is down to help set up the quad decorations for Open Mic Night tomorrow at 6 PM?', timestamp: '3 hours ago' }
    ],
    resources: [
      { id: 'res-bsu-1', title: 'Homecoming Quad Sign-Up Sheet', category: 'Volunteer', url: '#' }
    ]
  },
  {
    id: 'comm-esoc',
    name: 'Entrepreneur Society',
    description: 'Pitch practices, startup builders, and MVP developer circles.',
    memberCount: 95,
    category: 'Business',
    image: '/career_fair.png',
    banner: '/career_fair.png',
    logo: 'Briefcase',
    about: 'Entrepreneur Society empowers student builders with mentorship.',
    membersList: [
      { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', role: 'President' }
    ],
    projects: [
      { id: 'proj-esoc-pitch', title: 'Student Pitch Competition', description: 'Molding collegiate MVPs into investable startup candidates.', image: '/career_fair.png' }
    ],
    gallery: [
      '/career_fair.png'
    ],
    discussions: [
      { id: 'disc-esoc-1', author: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', text: 'Startup mixer is this Friday! Mingle with student founders.', timestamp: '1 hour ago' }
    ],
    resources: [
      { id: 'res-esoc-1', title: 'Venture Capital Pitch Deck Template', category: 'Document', url: '#' }
    ]
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-linear-intern',
    title: 'Software Engineering Intern',
    organizer: 'Linear Systems Group',
    type: 'Internship',
    description: 'We are seeking a Software Engineering Intern passionate about code quality, performance, and building premium interfaces. You will work on core features using React, TypeScript, and TailwindCSS.',
    requirements: 'Solid knowledge of JavaScript/TypeScript, React, and responsive layouts. Experience with Git.',
    reward: '$45/hour Stipend • Remote/Hybrid',
    deadline: 'Nov 01, 2026',
    link: '#',
    thumbnail: '/career_fair.png',
    category: 'Engineering'
  },
  {
    id: 'opp-stem-scholar',
    title: 'Evida Leaders Scholarship',
    organizer: 'Tech Foundation Fellowship',
    type: 'Scholarship',
    description: 'The Evida Leaders Scholarship recognizes undergraduate students who demonstrate outstanding leadership, technical talent, and active contributions to campus community building.',
    requirements: 'Undergraduate student, active participation in campus organizations, essay on community contribution.',
    reward: '$6,000 / Year • Academic Support',
    deadline: 'Oct 30, 2026',
    link: '#',
    thumbnail: '/crowd_ribbons.jpg',
    category: 'Leadership'
  },
  {
    id: 'opp-hci-research',
    title: 'AI Research Assistant',
    organizer: 'Future Human-Computer Interaction Lab',
    type: 'Research',
    description: 'Assist in training, fine-tuning, and evaluating generative model prompts and interfaces for accessible education. Conduct user study sessions and analyze feedback data.',
    requirements: 'Strong interest in AI/HCI, basic Python/data analysis skills, completion of intro CS course.',
    reward: '$22/hour or Course Credit',
    deadline: 'Oct 15, 2026',
    link: '#',
    thumbnail: '/crowd_ribbons.jpg',
    category: 'AI Research'
  }
];

export const initialProfile: UserProfile = {
  name: 'Aida Garba',
  graduationYear: "'26",
  university: 'Livingstone College',
  major: 'Computer Science',
  bio: 'Livingstone Computer Science student, building neat interfaces, capturing student campus moments, and organizing coding socials! BSU and Tech Innovators member.',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
  interests: ['Coding', 'UI Design', 'Homecoming Concerts', 'Basketball', 'Photography'],
  achievements: ['Community Catalyst', 'Hackathon Finalist', 'Dean\'s List'],
  savedEventIds: ['evt-open-mic'],
  rsvpEventIds: ['evt-game-night'],
  followedCommunityIds: ['comm-bsu', 'comm-tech-innovators'],
  savedOpportunityIds: ['opp-linear-intern']
};

import type { Event, Community, UserProfile, Opportunity } from '../types';

export const mockEvents: Event[] = [
  {
    id: 'evt-mixer',
    title: 'International Student Mixer',
    description: 'Welcome to campus! Meet fellow students from all around the world, share stories, play icebreakers, and enjoy free snacks and drinks. Whether you are an international student or just love learning about new cultures, everyone is welcome!',
    date: 'Oct 12, 2026',
    time: '4:00 PM - 6:30 PM',
    location: 'Student Center Quad (Rain location: Lobby)',
    organizer: 'Afro Culture Club',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 42
  },
  {
    id: 'evt-game-night',
    title: 'Campus Game Night',
    description: 'Join us for a cozy evening of board games, video games, and trivia! We will have Mario Kart on the big screen, classic games like Catan and Codenames, and plenty of pizza. Bring your friends or come make new ones!',
    date: 'Oct 15, 2026',
    time: '6:00 PM - 9:00 PM',
    location: 'Student Lounge, Lower Level',
    organizer: 'Debate Society',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 28
  },
  {
    id: 'evt-coffee-chat',
    title: 'Career Coffee Chat',
    description: 'Looking for resume tips or internship advice? Grab a free coffee and chat informally with campus alumni working in Tech, Design, Finance, and Non-profits. No pressure, just good conversations and career guidance.',
    date: 'Oct 19, 2026',
    time: '2:00 PM - 4:00 PM',
    location: 'Campus Brew Library Café',
    organizer: 'Entrepreneurship Hub',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 19
  },
  {
    id: 'evt-culture-fest',
    title: 'Autumn Culture Fest',
    description: 'Celebrate our diverse campus community! Experience traditional music, dance performances, and art showcases. Best of all, sample delicious street foods from over 15 different countries. A true highlight of the fall semester!',
    date: 'Oct 24, 2026',
    time: '12:00 PM - 5:00 PM',
    location: 'University Commons Lawn',
    organizer: 'Multicultural Student Alliance',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 156
  },
  {
    id: 'evt-wellness-walk',
    title: 'Golden Hour Wellness Walk',
    description: 'Take a break from screen time and midterms. Join the Wellness Society for a refreshing, mindful walk through the campus botanical gardens and surrounding woods. We will end with warm apple cider and a quick grounding meditation.',
    date: 'Oct 28, 2026',
    time: '4:30 PM - 5:45 PM',
    location: 'Meet at Botanical Gardens Gate',
    organizer: 'Wellness Society',
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 15
  },
  {
    id: 'evt-tech-workshop',
    title: 'AI & Creative Coding Workshop',
    description: 'Learn how to use AI tools for generative art, web design, and brainstorming. This hands-on workshop covers basic prompt engineering, GitHub Copilot, and dynamic coding libraries. No coding experience required! Bring your laptop.',
    date: 'Nov 02, 2026',
    time: '5:00 PM - 7:00 PM',
    location: 'Engineering Building, Room 402',
    organizer: 'Tech Innovators Club',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 34
  },
  {
    id: 'evt-volunteer-sat',
    title: 'Volunteer Saturday: Park Cleanup',
    description: 'Give back to the local community! We are teaming up with the City Parks Dept to plant native flowers, clear trail paths, and paint park benches. Lunch, tools, and volunteer t-shirts are provided. Shuttle leaves from campus center at 8:45 AM.',
    date: 'Nov 07, 2026',
    time: '9:00 AM - 1:00 PM',
    location: 'Oakridge Community Park (Shuttle provided)',
    organizer: 'Campus Service Club',
    category: 'Volunteer',
    image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 22
  },
  {
    id: 'evt-movie-night',
    title: 'Campus Starlight Movie Night',
    description: 'Cozy blankets, warm popcorn, and a giant screen under the stars. Bring your picnic rugs and join us for a screening of the classic coming-of-age movie. Hot cocoa and popcorn are free for all students!',
    date: 'Nov 12, 2026',
    time: '7:30 PM - 10:00 PM',
    location: 'North Campus Amphitheater',
    organizer: 'Creative Studio & Film Union',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 85
  }
];

export const mockCommunities: Community[] = [
  {
    id: 'comm-tech',
    name: 'Tech Innovators Club',
    description: 'For student builders, coders, and makers. We organize weekly hack nights, workshops, and help students launch side projects.',
    memberCount: 142,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    logo: 'Code',
    about: 'Tech Innovators Club is the premier student builder community on campus. We focus on hands-on creation, hosting weekly hack sessions, peer-to-peer programming workshops, and hosting guest lectures from tech industry veterans. Whether you wrote your first line of code today or are already shipping production apps, you have a home here.',
    membersList: [
      { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', role: 'President' },
      { name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Design Lead' },
      { name: 'Justin Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'Tech Lead' }
    ],
    projects: [
      { id: 'proj-campus-map', title: 'Interactive Campus Map', description: 'A sleek, real-time map that shows crowded study spaces and food truck locations.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400' },
      { id: 'proj-study-buddy', title: 'StudyBuddy Matcher', description: 'Swipe left/right to find study partners with matching course schedules and workloads.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-1', author: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', text: 'Who is down to form a group for the upcoming Fall Hackathon? Looking for someone with mobile experience!', timestamp: '2 hours ago' },
      { id: 'disc-2', author: 'Justin Chen', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', text: 'Just uploaded our Git/Github cheat sheet to the resources section. Let me know if we should add anything!', timestamp: '1 day ago' }
    ],
    resources: [
      { id: 'res-git', title: 'Git & GitHub 101 Cheat Sheet', category: 'Tutorial', url: '#' },
      { id: 'res-react', title: 'Tailwind & React Component Library Template', category: 'Code Template', url: '#' }
    ]
  },
  {
    id: 'comm-intl',
    name: 'Afro Culture Club',
    description: 'Celebrating African heritage, history, and modern culture. We host vibrant social events, food tastings, music nights, and community discussions.',
    memberCount: 210,
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    logo: 'Globe',
    about: 'The Afro Culture Club aims to share, celebrate, and explore the rich diversity of African cultures, heritage, and history on campus. We build a supportive environment, host food/music mixers, and run cultural showcases.',
    membersList: [
      { name: 'Fatima Al-Sayed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'President' },
      { name: 'Lucas Dubois', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', role: 'Treasurer' }
    ],
    projects: [
      { id: 'proj-lang-cafe', title: 'Weekly Language Café', description: 'Table chats in Spanish, French, Mandarin, and Arabic over snacks.', image: 'https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-3', author: 'Fatima Al-Sayed', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Hey guys! Don\'t forget our International Mixer is this Friday. Come hungry because we ordered foods from 6 different local restaurants!', timestamp: '3 hours ago' }
    ],
    resources: [
      { id: 'res-visa', title: 'F-1 Visa Travel & Work Guidelines Guide', category: 'Document', url: '#' }
    ]
  },
  {
    id: 'comm-business',
    name: 'Entrepreneurship Hub',
    description: 'For future founders, product managers, and builders. We provide startup resources, pitch competitions, mentoring, and networking opportunities.',
    memberCount: 88,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    logo: 'Briefcase',
    about: 'The Entrepreneurship Hub is a community for student builders, founders, and creatives. We foster innovation, host pitch workshops, run mentor sessions with startup founders, and provide resources to take ideas from zero to one.',
    membersList: [
      { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', role: 'President' }
    ],
    projects: [
      { id: 'proj-mentorship', title: 'WIB Mentorship Link', description: 'Pairing senior business students with freshman mentees.', image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-4', author: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', text: 'We have 3 open slots for the McKinsey office visit next Wednesday. Please RSVP in the resources link by tonight!', timestamp: '4 hours ago' }
    ],
    resources: [
      { id: 'res-mckinsey', title: 'Office Tour RSVP Form', category: 'Link', url: '#' }
    ]
  },
  {
    id: 'comm-sports',
    name: 'Debate Society',
    description: 'Develop public speaking, logical reasoning, and debate skills. Weekly friendly debates on current issues and prep for regional debate tournaments.',
    memberCount: 165,
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
    logo: 'Activity',
    about: 'The Debate Society provides a supportive platform for students to practice public speaking and structured debating. We host weekly mock debates on local and global topics, run training workshops, and attend tournaments. All majors are welcome!',
    membersList: [
      { name: 'Tyler Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', role: 'Athletic Lead' }
    ],
    projects: [
      { id: 'proj-lake-run', title: 'Weekly Sunset Lake Run', description: 'A scenic 5k jog around campus lake followed by smoothies.', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-5', author: 'Tyler Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', text: 'Intramural soccer registrations close on Friday! Make sure your team roster is updated on the portal.', timestamp: '2 days ago' }
    ],
    resources: [
      { id: 'res-roster', title: 'Soccer Team Registration Portal', category: 'Portal', url: '#' }
    ]
  },
  {
    id: 'comm-creative',
    name: 'Creative Studio',
    description: 'A collective of artists, designers, writers, photographers, and musicians. Join us for open studio hours, art showcases, and creative collabs.',
    memberCount: 95,
    category: 'Creative',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200',
    logo: 'Palette',
    about: 'Creative Studio is a joyful cross-discipline group for student creatives. We believe in building a safe space where artists, designers, film-makers, musicians, and poets can showcase work, get peer critique, and code visual design interfaces together.',
    membersList: [
      { name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Studio Facilitator' },
      { name: 'Elian Torres', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'Art Showcase Lead' }
    ],
    projects: [
      { id: 'proj-zine', title: 'Evida Zine: Issue #1', description: 'A printed booklet of student illustrations, stories, and photographs of autumn campus life.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400',
      'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-6', author: 'Elian Torres', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', text: 'Submissions for the Evida Autumn Zine close next Friday! Send your high-res illustrations or poetry to the Google Drive link.', timestamp: '1 hour ago' }
    ],
    resources: [
      { id: 'res-zine-sub', title: 'Evida Zine Google Drive Folder', category: 'Drive', url: '#' }
    ]
  },
  {
    id: 'comm-wellness',
    name: 'Wellness Society',
    description: 'Promoting mental, emotional, and physical well-being. Weekly yoga sessions, meditation circles, group walks, and stress-relief events.',
    memberCount: 120,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    logo: 'Heart',
    about: 'The Wellness Society focuses on mental, emotional, and physical health. Through group meditation, stress relief workshops, and walks in nature, we provide active mindfulness tools to navigate academic pressure.',
    membersList: [
      { name: 'Chloe Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Meditation Instructor' }
    ],
    projects: [
      { id: 'proj-zen', title: 'Zen Study Dens', description: 'Pop-up zones in library rooms equipped with tea, low lighting, and stress balls.', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-7', author: 'Chloe Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Join us for a relaxing sunset yoga flow on the quad today at 5:00 PM. No mats needed, just bring your wonderful selves!', timestamp: '5 hours ago' }
    ],
    resources: [
      { id: 'res-med', title: '10-Minute Grounding Audio Guide', category: 'Audio', url: '#' }
    ]
  }
];

export const mockOpportunities: Opportunity[] = [
  {
    id: 'opp-linear-intern',
    title: 'Product Design Intern',
    organizer: 'Linear Systems Group',
    type: 'Internship',
    description: 'We are seeking an undergraduate product designer passionate about clean interfaces and developer workflows. You will design core application features, test layouts with target engineers, and collaborate closely with our engineering team.',
    requirements: 'Familiarity with Figma, a visual portfolio showcasing interface layouts, and basic knowledge of frontend UI systems (HTML/CSS/JS).',
    reward: '$40/hour Stipend • Remote allowed',
    deadline: 'Nov 01, 2026',
    link: '#'
  },
  {
    id: 'opp-stem-scholar',
    title: 'Aspirational Women in STEM Scholarship',
    organizer: 'Tech Foundation Fellowship',
    type: 'Scholarship',
    description: 'A fund supporting undergraduate women studying Computer Science, Mathematics, or engineering fields. Awardees receive funding support plus placement in a formal mentoring circle with senior technology leaders.',
    requirements: 'Full-time undergraduate enrollment, minimum GPA 3.2, 500-word personal essay on campus impact.',
    reward: '$5,000 / Year • Academic Support',
    deadline: 'Oct 30, 2026',
    link: '#'
  },
  {
    id: 'opp-tutor-job',
    title: 'Computer Science Peer Tutor',
    organizer: 'University Center for Academic Success',
    type: 'Campus Job',
    description: 'Help freshman and sophomore students master Python, Java, Data Structures, and basic database design. You will host drop-in tutoring blocks and hold exam prep workshops twice a week.',
    requirements: 'Received A/A- in introductory CS sequence, strong communication skills, recommendation letter from a professor.',
    reward: '$22/hour • 10-15 hrs/week',
    deadline: 'Sep 30, 2026',
    link: '#'
  },
  {
    id: 'opp-hci-research',
    title: 'Undergraduate HCI Lab Assistant',
    organizer: 'Future Human-Computer Interaction Lab',
    type: 'Research',
    description: 'Assist in drafting user study plans, running usability tests for smart-home assistive hardware devices, and tagging interview logs. This research is funded by the National Science Foundation.',
    requirements: 'Curious about accessibility, prompt and detail-oriented, completed introductory statistics.',
    reward: '$18/hour or Course Research Credits',
    deadline: 'Oct 15, 2026',
    link: '#'
  },
  {
    id: 'opp-pitch-comp',
    title: 'Evida Campus Innovation Pitch',
    organizer: 'Entrepreneurship Center',
    type: 'Competition',
    description: 'A collegiate pitch event for side projects, student businesses, and community startups. Pitch your concept to top local angels and entrepreneurs for seed capital to bootstrap your MVP.',
    requirements: 'Teams of 1-4 active students. Must have a clickable prototype or basic landing page built.',
    reward: '$10,000 Grand Prize • Mentorship',
    deadline: 'Nov 15, 2026',
    link: '#'
  }
];

export const initialProfile: UserProfile = {
  name: 'Maya Lin',
  major: 'Communication & Computer Science',
  university: 'Greenwood University',
  bio: 'Sophomore, studying Communication & Computer Science. Loves sunset walks, trying new matcha lattes, and connecting people on campus!',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=300',
  interests: ['Design', 'Community Building', 'Hiking', 'Board Games', 'Creative Tech'],
  achievements: ['Community Catalyst', 'Hackathon Finalist', 'Dean\'s List'],
  savedEventIds: ['evt-coffee-chat'],
  rsvpEventIds: ['evt-mixer'],
  followedCommunityIds: ['comm-tech', 'comm-creative'],
  savedOpportunityIds: ['opp-linear-intern']
};

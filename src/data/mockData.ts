import type { Event, Community, UserProfile, Opportunity, Moment } from '../types';

export const mockEvents: Event[] = [
  {
    id: 'evt-homecoming',
    title: 'Homecoming Concert & Fireworks',
    description: 'The biggest night of the school year! Join us for live student bands, concert lights, free street foods, and a spectacular fireworks show over the campus quad. Bring your friends, celebrate campus culture, and kick off homecoming weekend in style!',
    date: 'Oct 16, 2026',
    time: '7:00 PM - 11:30 PM',
    location: 'Livingstone Stadium Quad',
    organizer: 'Student Government Association',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 420
  },
  {
    id: 'evt-stem-expo',
    title: 'STEM Innovation Expo',
    description: 'Discover cutting-edge research, hands-on student demos, and tech prototypes. Meet industry sponsors from local labs and show off your own builds. Free merchandise, stickers, and pizza for all attendees!',
    date: 'Oct 14, 2026',
    time: '1:00 PM - 5:00 PM',
    location: 'Student Center Main Hall',
    organizer: 'Women in STEM',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 142
  },
  {
    id: 'evt-bball',
    title: 'Intramural Basketball Tournament',
    description: ' Livingstone College annual basketball showdown! Grab a squad or come cheer from the bleachers. DJ music, half-time student contests, and prizes for the winning team. Hydration stations and snacks are free!',
    date: 'Oct 15, 2026',
    time: '5:00 PM - 9:00 PM',
    location: 'Campus Sports Complex',
    organizer: 'Tennis Team',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 98
  },
  {
    id: 'evt-open-mic',
    title: 'Acoustic Open Mic Night',
    description: 'Sing, recite poetry, show off your standup comedy, or just cozy up with a warm apple cider. Student performers get a free custom sticker pack. Open to all students!',
    date: 'Oct 17, 2026',
    time: '8:00 PM - 10:30 PM',
    location: 'Campus Brew Library Café',
    organizer: 'Black Student Union',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 64
  },
  {
    id: 'evt-career-mixer',
    title: 'Startup Career Mixer',
    description: 'Looking for internships or part-time student work? Mingle with local startups and student founders. Bring your resumes, grab a custom coffee, and chat in an informal, low-pressure setting.',
    date: 'Oct 18, 2026',
    time: '3:00 PM - 6:00 PM',
    location: 'Entrepreneurship Hub Center',
    organizer: 'Entrepreneur Society',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 57
  },
  {
    id: 'evt-culture-fest',
    title: 'Campus Cultural Festival',
    description: 'A celebration of our diverse campus! Traditional music performances, dance workshops, student art booths, and local street foods representing over 15 different cultures.',
    date: 'Oct 20, 2026',
    time: '12:00 PM - 6:00 PM',
    location: 'Student Center Lawn',
    organizer: 'Black Student Union',
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 310
  },
  {
    id: 'evt-hackathon',
    title: 'Evida Fall Hackathon',
    description: 'Build projects that solve campus challenges. 24 hours of coding, design, and brainstorming. Mentors will be on standby. Winning teams receive $1,500 and hardware gear.',
    date: 'Oct 23, 2026',
    time: '6:00 PM Friday - 6:00 PM Saturday',
    location: 'Main Library Digital Den',
    organizer: 'NSBE',
    category: 'Academic',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 120
  },
  {
    id: 'evt-game-night',
    title: 'Game Night: Mario Kart & Trivia',
    description: 'Board games, pizza, and Mario Kart 8 Deluxe tournament on the theater screen! Come make new friends, eat free pizza, and take home the tournament champion cup.',
    date: 'Oct 12, 2026',
    time: '6:00 PM - 9:00 PM',
    location: 'Student Center Lounge',
    organizer: 'Student Government Association',
    category: 'Social',
    image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800',
    attendeeCount: 42
  }
];

export const mockCommunities: Community[] = [
  {
    id: 'comm-bsu',
    name: 'Black Student Union',
    description: 'Fostering unity, celebrating culture, and building leadership. We organize social mixers, educational panels, and homecoming events.',
    memberCount: 185,
    category: 'Culture',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=1200',
    logo: 'Users',
    about: 'The Black Student Union aims to empower and connect students of African descent, raising political, social, and cultural awareness on campus.',
    membersList: [
      { name: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', role: 'President' },
      { name: 'Aida Garba', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', role: 'Event Planner' }
    ],
    projects: [
      { id: 'proj-zine', title: 'BSU Campus Voice', description: 'Student publications, reflections, and photography on community.', image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-bsu-1', author: 'Marcus Vance', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', text: 'Who is down to help set up the quad decorations for Open Mic Night tomorrow at 6 PM?', timestamp: '3 hours ago' }
    ],
    resources: [
      { id: 'res-bsu-1', title: 'Homecoming Quad Sign-Up Sheet', category: 'Volunteer', url: '#' }
    ]
  },
  {
    id: 'comm-nsbe',
    name: 'NSBE',
    description: 'National Society of Black Engineers. Promoting academic excellence, professional development, and community impact in STEM.',
    memberCount: 110,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    logo: 'Code',
    about: 'We support and encourage collegiate engineers to excel academically, succeed professionally, and positively impact the community.',
    membersList: [
      { name: 'Tariq Al-Fayed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', role: 'President' }
    ],
    projects: [
      { id: 'proj-nsbe-map', title: 'Interactive Campus Directory', description: 'A sleek visual directory helping freshmen find classes and student labs.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-nsbe-1', author: 'Tariq Al-Fayed', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', text: 'Hackathon schedules are live! Make sure your teams are registered.', timestamp: '1 day ago' }
    ],
    resources: [
      { id: 'res-nsbe-1', title: 'Hackathon Tech Stack Setup Guide', category: 'Tutorial', url: '#' }
    ]
  },
  {
    id: 'comm-sga',
    name: 'Student Government Association',
    description: 'The official voice of the student body. Advocating for campus life initiatives, managing club resources, and planning homecoming.',
    memberCount: 250,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=1200',
    logo: 'Briefcase',
    about: 'Livingstone SGA acts as a bridge between the student body and campus administration, planning campus events and distributing organization funds.',
    membersList: [
      { name: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', role: 'Student President' }
    ],
    projects: [
      { id: 'proj-sga-shuttle', title: 'Campus Sports Night Shuttle', description: 'Coordinating student shuttles to off-site athletic matches.', image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-sga-1', author: 'Sarah Jenkins', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', text: 'Homecoming event schedule has been updated. Join the planning committee session today!', timestamp: '5 hours ago' }
    ],
    resources: [
      { id: 'res-sga-1', title: 'SGA Event Checklist Form', category: 'Document', url: '#' }
    ]
  },
  {
    id: 'comm-wistem',
    name: 'Women in STEM',
    description: 'Empowering women in science, technology, engineering, and math. Monthly mentor circles, tech workshops, and coding meetups.',
    memberCount: 145,
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?auto=format&fit=crop&q=80&w=1200',
    logo: 'Palette',
    about: 'Women in STEM provides professional mentorship, educational resources, and social support networks to women pursuing careers in STEM.',
    membersList: [
      { name: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Event Chair' }
    ],
    projects: [
      { id: 'proj-wistem-code', title: 'Girls Who Code Camp', description: 'Weekly free programming camps for local high school kids.', image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-wistem-1', author: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Thank you to everyone who supported the Innovation Expo! We had an incredible turnout.', timestamp: '2 days ago' }
    ],
    resources: [
      { id: 'res-wistem-1', title: 'STEM Mentor Circle Registration', category: 'Link', url: '#' }
    ]
  },
  {
    id: 'comm-esoc',
    name: 'Entrepreneur Society',
    description: 'Where startup builders, side-project makers, and innovators launch their MVPs. Weekly pitch practice and local founder talks.',
    memberCount: 95,
    category: 'Business',
    image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200',
    logo: 'Code',
    about: 'Entrepreneur Society empowers student builders with mentorship, tech resources, and demo days to take ideas from zero to one.',
    membersList: [
      { name: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', role: 'President' }
    ],
    projects: [
      { id: 'proj-esoc-pitch', title: 'Student Pitch Competition', description: 'Molding collegiate MVPs into investable startup candidates.', image: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-esoc-1', author: 'Alex Rivera', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', text: 'Startup mixer is this Friday! Mingle with student founders and grab custom brews.', timestamp: '1 hour ago' }
    ],
    resources: [
      { id: 'res-esoc-1', title: 'Venture Capital Pitch Deck Template', category: 'Document', url: '#' }
    ]
  },
  {
    id: 'comm-ministry',
    name: 'Campus Ministry',
    description: 'Providing a supportive space for spiritual growth, fellowship, and active campus service projects. Everyone is welcome!',
    memberCount: 78,
    category: 'Wellness',
    image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=1200',
    logo: 'Heart',
    about: 'Campus Ministry cultivates spiritual wellness, supportive study circles, and volunteer activities serving the local community.',
    membersList: [
      { name: 'Chloe Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', role: 'Outreach Leader' }
    ],
    projects: [
      { id: 'proj-min-food', title: 'Livingstone Food Drive', description: 'Weekly student pop-up food stands supplying families in need.', image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-min-1', author: 'Chloe Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Volunteer sign-up sheet for the weekend food pantry is ready. Appreciate the support!', timestamp: '4 hours ago' }
    ],
    resources: [
      { id: 'res-min-1', title: 'Food Drive Coordinator Form', category: 'Link', url: '#' }
    ]
  },
  {
    id: 'comm-tennis',
    name: 'Tennis Team',
    description: 'Livingstone College Tennis Team. Competitive matches, casual student hit nights, and beginner drills. Grab a racket and join!',
    memberCount: 65,
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=800',
    banner: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=1200',
    logo: 'Activity',
    about: 'We promote physical fitness and competitive spirit on campus through weekly tennis tournaments and casual clinic hit nights.',
    membersList: [
      { name: 'Tyler Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', role: 'Team Captain' }
    ],
    projects: [
      { id: 'proj-tennis-court', title: 'Livingstone Open Hit Night', description: 'Friday outdoor courts social, open to all skill levels.', image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&q=80&w=400' }
    ],
    gallery: [
      'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400'
    ],
    discussions: [
      { id: 'disc-ten-1', author: 'Tyler Vance', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200', text: 'Intramural singles register by tonight! Matches kick off this Thursday.', timestamp: '3 hours ago' }
    ],
    resources: [
      { id: 'res-ten-1', title: 'Singles Tournament Roster Sign-up', category: 'Portal', url: '#' }
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
  }
];

export const initialProfile: UserProfile = {
  name: 'Aida Garba',
  graduationYear: 'Class of 2027',
  university: 'Livingstone College',
  major: 'Computer Science & Visual Design',
  bio: 'Livingstone junior, building neat interfaces, capturing student campus moments, and organizing coding socials! BSU and NSBE member.',
  avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=300',
  interests: ['Coding', 'UI Design', 'Homecoming Concerts', 'Basketball', 'Photography'],
  achievements: ['Community Catalyst', 'Hackathon Finalist', 'Dean\'s List'],
  savedEventIds: ['evt-open-mic'],
  rsvpEventIds: ['evt-game-night'],
  followedCommunityIds: ['comm-bsu', 'comm-nsbe'],
  savedOpportunityIds: ['opp-linear-intern']
};

export const mockMoments: Moment[] = [
  {
    id: 'moment-1',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800',
    studentAvatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200',
    studentName: 'Marcus Vance',
    organization: 'Black Student Union',
    likes: 124,
    hasLiked: false,
    comments: [
      { id: 'c-1', author: 'Aida Garba', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200', text: 'This homecoming concert energy was unreal! 🔥', timestamp: '2h ago' },
      { id: 'c-2', author: 'Tariq A.', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', text: 'Laser lights were top-tier!', timestamp: '1h ago' }
    ]
  },
  {
    id: 'moment-2',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&q=80&w=800',
    studentAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200',
    studentName: 'Sarah Jenkins',
    organization: 'Women in STEM',
    likes: 85,
    hasLiked: false,
    comments: [
      { id: 'c-3', author: 'Maya Lin', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200', text: 'Amazing coding circles this week!', timestamp: '5h ago' }
    ]
  },
  {
    id: 'moment-3',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?auto=format&fit=crop&q=80&w=800',
    studentAvatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200',
    studentName: 'Tyler Vance',
    organization: 'Tennis Team',
    likes: 92,
    hasLiked: false,
    comments: [
      { id: 'c-4', author: 'Marcus V.', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200', text: 'Rallied like a pro!', timestamp: '3h ago' }
    ]
  },
  {
    id: 'moment-4',
    image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800',
    studentAvatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200',
    studentName: 'Aida Garba',
    organization: 'Student Government Association',
    likes: 146,
    hasLiked: true,
    comments: [
      { id: 'c-5', author: 'Sarah J.', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200', text: 'Livingstone family vibes 💙', timestamp: '1d ago' }
    ]
  },
  {
    id: 'moment-5',
    image: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800',
    studentAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200',
    studentName: 'Tariq Al-Fayed',
    organization: 'Black Student Union',
    likes: 210,
    hasLiked: false,
    comments: []
  }
];

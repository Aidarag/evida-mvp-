import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Users, Calendar, ArrowLeft, MessageSquare, Briefcase, FileText, Check, Plus, Image, Code, Globe, Activity, Palette, Heart, Sprout } from 'lucide-react';
import Button from '../components/Button';
import EventCard from '../components/EventCard';

const renderCommunityIcon = (logoKey: string, className = "w-6 h-6 text-[#FF7A1A]") => {
  switch (logoKey) {
    case 'Code':
      return <Code className={className} />;
    case 'Globe':
      return <Globe className={className} />;
    case 'Briefcase':
      return <Briefcase className={className} />;
    case 'Activity':
      return <Activity className={className} />;
    case 'Palette':
      return <Palette className={className} />;
    case 'Heart':
      return <Heart className={className} />;
    default:
      return <Sprout className={className} />;
  }
};

export const CommunityProfile: React.FC = () => {
  const { 
    communities, 
    selectedCommunityId, 
    setCurrentPage, 
    profile, 
    toggleFollowCommunity,
    addDiscussionPost,
    events
  } = useApp();

  const [activeTab, setActiveTab] = useState<'about' | 'discussions' | 'members' | 'projects' | 'gallery'>('about');
  const [discussionInput, setDiscussionInput] = useState('');

  // Retrieve community
  const community = communities.find(c => c.id === selectedCommunityId) || communities[0];

  if (!community) {
    return (
      <div className="max-w-md mx-auto text-center py-16 space-y-4">
        <p className="text-[#555555]">Club not found.</p>
        <Button variant="primary" onClick={() => setCurrentPage('communities')}>Back to clubs</Button>
      </div>
    );
  }

  const isFollowing = profile.followedCommunityIds.includes(community.id);

  // Find events organized by this community
  const communityEvents = events.filter(
    e => e.organizer.toLowerCase().includes(community.name.toLowerCase())
  );

  const handlePostDiscussion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!discussionInput.trim()) return;
    addDiscussionPost(community.id, discussionInput);
    setDiscussionInput('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 fade-in pb-24 text-left select-none bg-transparent text-[#111111]">
      {/* Back button */}
      <button 
        onClick={() => setCurrentPage('communities')}
        className="flex items-center space-x-2 text-sm text-[#555555] hover:text-[#FF7A1A] font-bold group transition-colors select-none cursor-pointer"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
        <span>Back to clubs directory</span>
      </button>

      {/* Immersive Community Header Banner */}
      <div className="relative rounded-[2rem] overflow-hidden border border-gray-200/80 bg-[#F7F8FA] shadow-sm">
        {/* Banner image */}
        <div className="h-48 sm:h-64 w-full overflow-hidden relative">
          <img 
            src={community.banner} 
            alt={community.name} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        </div>

        {/* Club Meta Info Overlapping Banner */}
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-6 -mt-10 sm:-mt-14 relative z-10 text-center sm:text-left">
          
          {/* Logo & Name */}
          <div className="flex flex-col sm:flex-row items-center sm:items-end gap-4 sm:gap-5">
            {/* Logo Emblem */}
            <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-3xl border-4 border-gray-100 shadow-2xl flex items-center justify-center select-none">
              {renderCommunityIcon(community.logo, "w-10 h-10 sm:w-12 sm:h-12 text-[#FF7A1A]")}
            </div>
            
            <div className="text-[#111111] sm:pb-1 space-y-1 text-left">
              <h1 className="text-3xl sm:text-5xl font-display tracking-tight leading-none drop-shadow-sm uppercase">
                {community.name}
              </h1>
              <div className="flex items-center justify-start space-x-3 text-xs sm:text-sm text-[#555555] font-semibold pt-1">
                <span className="bg-[#F7F8FA] px-2.5 py-0.5 rounded-full border border-gray-200/50">
                  {community.category}
                </span>
                <span className="flex items-center">
                  <Users className="w-4 h-4 mr-1 flex-shrink-0 text-gray-400" />
                  {community.memberCount} members
                </span>
              </div>
            </div>
          </div>

          {/* Join Club button */}
          <div className="sm:pb-1 flex-shrink-0">
            <Button
              variant={isFollowing ? 'secondary' : 'primary'}
              size="lg"
              onClick={() => toggleFollowCommunity(community.id)}
              className="flex items-center space-x-2 shadow-lg px-8 font-bold"
            >
              {isFollowing ? (
                <>
                  <Check className="w-4.5 h-4.5 stroke-[3px]" />
                  <span>Joined Club</span>
                </>
              ) : (
                <>
                  <Plus className="w-4.5 h-4.5 stroke-[3px]" />
                  <span>Join Club</span>
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        
        {/* Left Side: Tabs Nav Menu */}
        <div className="lg:col-span-1 bg-[#F7F8FA] p-5 rounded-3xl border border-gray-200/60 shadow-sm space-y-1.5 select-none">
          <p className="text-[10px] font-black tracking-wider text-[#555555]/50 px-3 mb-2 text-left uppercase">Club Portal</p>
          
          <button
            onClick={() => setActiveTab('about')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'about'
                ? 'bg-[#FF7A1A]/10 text-[#FF7A1A]'
                : 'text-[#555555] hover:text-[#111111] hover:bg-white border border-transparent hover:border-gray-200/50'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>About Us</span>
          </button>

          <button
            onClick={() => setActiveTab('discussions')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'discussions'
                ? 'bg-[#FF7A1A]/10 text-[#FF7A1A]'
                : 'text-[#555555] hover:text-[#111111] hover:bg-white border border-transparent hover:border-gray-200/50'
            }`}
          >
            <MessageSquare className="w-4.5 h-4.5" />
            <span>Discussions ({community.discussions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('members')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'members'
                ? 'bg-[#FF7A1A]/10 text-[#FF7A1A]'
                : 'text-[#555555] hover:text-[#111111] hover:bg-white border border-transparent hover:border-gray-200/50'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>Members Sheet</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'projects'
                ? 'bg-[#FF7A1A]/10 text-[#FF7A1A]'
                : 'text-[#555555] hover:text-[#111111] hover:bg-white border border-transparent hover:border-gray-200/50'
            }`}
          >
            <Briefcase className="w-4.5 h-4.5" />
            <span>Projects & Resources</span>
          </button>

          <button
            onClick={() => setActiveTab('gallery')}
            className={`w-full text-left px-3.5 py-2.5 rounded-xl text-xs font-bold flex items-center space-x-2 transition-all cursor-pointer ${
              activeTab === 'gallery'
                ? 'bg-[#FF7A1A]/10 text-[#FF7A1A]'
                : 'text-[#555555] hover:text-[#111111] hover:bg-white border border-transparent hover:border-gray-200/50'
            }`}
          >
            <Image className="w-4.5 h-4.5" />
            <span>Gallery</span>
          </button>
        </div>

        {/* Right Side: Tab Contents Panel */}
        <div className="lg:col-span-3 min-h-[300px]">
          
          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div className="space-y-8">
              {/* About description */}
              <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200/80 shadow-sm space-y-4">
                <h3 className="text-2xl font-display text-[#111111] border-b border-gray-100 pb-2 uppercase tracking-tight">About Our Club</h3>
                <p className="text-[#555555] text-sm sm:text-base leading-relaxed font-sans font-medium">
                  {community.about}
                </p>
              </div>

              {/* Upcoming Events Hosted by this Club */}
              <div className="space-y-4">
                <h3 className="text-2xl font-display text-[#111111] border-b border-gray-100 pb-2 uppercase tracking-tight">Upcoming Gatherings</h3>
                {communityEvents.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {communityEvents.map(event => (
                      <EventCard key={`comm-evt-${event.id}`} event={event} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-[#F7F8FA] p-6 rounded-3xl border border-gray-200/60 text-center py-10 shadow-sm">
                    <Calendar className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-xs font-bold text-[#555555]">No custom events posted currently. Check back later!</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* DISCUSSIONS TAB */}
          {activeTab === 'discussions' && (
            <div className="space-y-6">
              
              {/* Discussion post input form */}
              <div className="bg-[#F7F8FA] p-5 rounded-3xl border border-gray-200/60 shadow-sm">
                <form onSubmit={handlePostDiscussion} className="space-y-3">
                  <h4 className="text-xs font-bold text-[#555555] uppercase tracking-wider">Start a Discussion</h4>
                  <textarea
                    value={discussionInput}
                    onChange={(e) => setDiscussionInput(e.target.value)}
                    placeholder={`Write a welcome note, question, or updates to ${community.name}...`}
                    rows={3}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl text-xs font-sans focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all text-[#111111] resize-none shadow-inner"
                  />
                  <div className="flex justify-end">
                    <Button type="submit" variant="primary" size="sm" className="px-6 font-bold text-xs">
                      Post to Board
                    </Button>
                  </div>
                </form>
              </div>

              {/* Message Board Feed */}
              <div className="space-y-4">
                {community.discussions.length > 0 ? (
                  community.discussions.map((disc) => (
                    <div key={disc.id} className="bg-white p-5 rounded-3xl border border-gray-200/80 shadow-sm flex items-start gap-4 text-left">
                      <div className="w-10 h-10 rounded-full overflow-hidden bg-[#F7F8FA] flex-shrink-0 border border-gray-200">
                        <img src={disc.avatar} alt={disc.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="space-y-1 flex-grow min-w-0 font-sans">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-black text-[#111111] truncate">{disc.author}</h4>
                          <span className="text-[9px] text-[#555555]/60 font-semibold whitespace-nowrap">{disc.timestamp}</span>
                        </div>
                        <p className="text-xs text-[#555555] leading-relaxed break-words font-medium">
                          {disc.text}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-xs text-[#555555]/60 italic py-10 font-sans font-semibold">No discussions started yet.</p>
                )}
              </div>
            </div>
          )}

          {/* MEMBERS SHEET TAB */}
          {activeTab === 'members' && (
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200/80 shadow-sm space-y-6">
              <h3 className="text-2xl font-display text-[#111111] border-b border-gray-100 pb-2 uppercase tracking-tight">Active Board Members</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {community.membersList.map((memb, idx) => (
                  <div key={idx} className="flex items-center space-x-3.5 p-3 rounded-2xl border border-gray-200/60 bg-[#F7F8FA] text-left">
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-white flex-shrink-0 border border-gray-200">
                      <img src={memb.avatar} alt={memb.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="min-w-0 font-sans">
                      <h4 className="text-xs font-bold text-[#111111] truncate">{memb.name}</h4>
                      <p className="text-[10px] text-[#FF7A1A] font-black uppercase tracking-wider mt-0.5">{memb.role || 'Member'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* PROJECTS & RESOURCES TAB */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              {/* Projects Grid */}
              <div className="space-y-4">
                <h3 className="text-2xl font-display text-[#111111] border-b border-gray-100 pb-2 uppercase tracking-tight">Featured Projects</h3>
                {community.projects.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {community.projects.map((proj) => (
                      <div key={proj.id} className="bg-white rounded-3xl overflow-hidden border border-gray-200/80 shadow-sm flex flex-col h-full hover:shadow-md transition-all text-left">
                        <div className="h-32 w-full overflow-hidden bg-[#F7F8FA]">
                          <img src={proj.image} alt={proj.title} className="w-full h-full object-cover animate-pulse" />
                        </div>
                        <div className="p-4 space-y-1 font-sans">
                          <h4 className="font-bold text-sm text-[#111111]">{proj.title}</h4>
                          <p className="text-[11px] text-[#555555] leading-relaxed font-medium">{proj.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#555555]/65 italic py-10 font-sans font-semibold">No student projects active at this moment.</p>
                )}
              </div>

              {/* Resources list */}
              <div className="space-y-4 pt-4">
                <h3 className="text-2xl font-display text-[#111111] border-b border-gray-100 pb-2 uppercase tracking-tight">Shared Resources</h3>
                {community.resources.length > 0 ? (
                  <div className="space-y-3">
                    {community.resources.map((res) => (
                      <a 
                        key={res.id}
                        href={res.url}
                        className="bg-white px-5 py-3 rounded-2xl border border-gray-200/80 shadow-sm flex items-center justify-between hover:border-[#FF7A1A]/30 hover:shadow-md transition-all select-none group text-left"
                      >
                        <div className="flex items-center space-x-3">
                          <div className="w-9 h-9 rounded-xl bg-[#FF7A1A]/10 flex items-center justify-center text-[#FF7A1A] border border-[#FF7A1A]/15 flex-shrink-0">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div className="font-sans">
                            <h4 className="text-xs font-bold text-[#111111] group-hover:text-[#FF7A1A] transition-colors">{res.title}</h4>
                            <span className="text-[9px] text-[#FF7A1A] font-black uppercase tracking-wider">{res.category}</span>
                          </div>
                        </div>
                        <span className="text-[11px] text-[#FF7A1A] font-bold">Download ↗</span>
                      </a>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-[#555555]/65 italic py-10 font-sans font-semibold">No shared guidelines/resources posted.</p>
                )}
              </div>

            </div>
          )}

          {/* GALLERY TAB */}
          {activeTab === 'gallery' && (
            <div className="bg-white p-6 sm:p-8 rounded-[2rem] border border-gray-200/80 shadow-sm space-y-6">
              <h3 className="text-2xl font-display text-[#111111] border-b border-gray-100 pb-2 uppercase tracking-tight">Club Gallery</h3>
              {community.gallery.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 select-none">
                  {community.gallery.map((imgUrl, idx) => (
                    <div key={idx} className="aspect-square rounded-2xl overflow-hidden border border-gray-200 bg-[#F7F8FA] relative group">
                      <img src={imgUrl} alt="Club activities" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#555555]/65 italic py-10 font-sans font-semibold">No snapshots uploaded yet.</p>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
export default CommunityProfile;

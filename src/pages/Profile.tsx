import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { Heart, Calendar, Users, Edit3, X, Check, Award, Briefcase, GraduationCap, MapPin, Pin, DollarSign, Terminal } from 'lucide-react';

const getAchievementIcon = (name: string) => {
  if (name.includes('Catalyst')) return <Award className="w-3.5 h-3.5 mr-1 text-[#FF7A1A] flex-shrink-0" />;
  if (name.includes('Finalist')) return <Terminal className="w-3.5 h-3.5 mr-1 text-[#FF7A1A] flex-shrink-0" />;
  return <GraduationCap className="w-3.5 h-3.5 mr-1 text-[#FF7A1A] flex-shrink-0" />;
};

export const Profile: React.FC = () => {
  const { profile, events, communities, opportunities, updateProfile, setCurrentPage, saveOpportunity, setSelectedOpportunityId } = useApp();
  const [activeTab, setActiveTab] = useState<'attending' | 'saved' | 'communities' | 'opportunities'>('attending');
  const [isEditing, setIsEditing] = useState(false);

  const handleViewOpportunity = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setCurrentPage('opportunities');
  };
  
  // Profile edit states
  const [editName, setEditName] = useState(profile.name);
  const [editMajor, setEditMajor] = useState(profile.major);
  const [editGraduationYear, setEditGraduationYear] = useState(profile.graduationYear);
  const [editUniversity, setEditUniversity] = useState(profile.university);
  const [editBio, setEditBio] = useState(profile.bio);
  const [editInterests, setEditInterests] = useState(profile.interests.join(', '));

  // Get matching items from global state
  const rsvpEvents = events.filter(evt => profile.rsvpEventIds.includes(evt.id));
  const savedEvents = events.filter(evt => profile.savedEventIds.includes(evt.id));
  const followedComms = communities.filter(comm => profile.followedCommunityIds.includes(comm.id));
  const savedOpps = opportunities.filter(opp => profile.savedOpportunityIds.includes(opp.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const interestsList = editInterests
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag.length > 0);
    
    updateProfile(editName, editBio, interestsList, editMajor, editGraduationYear, editUniversity);
    setIsEditing(false);
  };

  const handleOpenEdit = () => {
    setEditName(profile.name);
    setEditMajor(profile.major);
    setEditGraduationYear(profile.graduationYear);
    setEditUniversity(profile.university);
    setEditBio(profile.bio);
    setEditInterests(profile.interests.join(', '));
    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 fade-in pb-24 text-left select-none">
      
      {/* Profile Header & Sticky Note Memory Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Profile Card Info */}
        <div className="lg:col-span-2 bg-[#111111] rounded-3xl p-6 sm:p-8 border border-white/5 shadow-2xl space-y-6 relative overflow-hidden text-left">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF7A1A]/5 rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white/5 shadow-md bg-white/5">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleOpenEdit}
                className="absolute bottom-0 right-0 p-2 bg-[#FF7A1A] hover:bg-[#E56717] text-white rounded-full shadow-md transition-transform active:scale-95 cursor-pointer"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-3 flex-grow min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-white">
                  {profile.name}
                </h1>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOpenEdit}
                  className="border-[#FF7A1A]/10 hover:border-[#FF7A1A] hidden sm:inline-flex text-xs py-1.5 font-bold"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5 text-[#FF7A1A]" />
                  <span>Edit Profile</span>
                </Button>
              </div>

              {/* Major & University info */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold text-[#B8B8B8]">
                <span className="flex items-center text-[#FF7A1A]">
                  <GraduationCap className="w-4 h-4 mr-1 flex-shrink-0 text-[#FF7A1A]/80" />
                  {profile.major}
                </span>
                <span className="flex items-center text-[#B8B8B8]/60">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-[#B8B8B8]/40" />
                  {profile.university} • {profile.graduationYear}
                </span>
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-[#B8B8B8] leading-relaxed max-w-xl">
                {profile.bio}
              </p>

              {/* Interests Cloud */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/60 font-display">Interests</h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                  {profile.interests.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-[#FF7A1A] text-[11px] font-bold rounded-full transition-colors font-display border border-[#FF7A1A]/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements Badges Section */}
              <div className="space-y-1.5 pt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-[#B8B8B8]/60 font-display flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-[#FF7A1A]" />
                  Achievements Badges
                </h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {profile.achievements.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-[#FF7A1A]/10 text-[#FF7A1A] text-[11px] font-bold rounded-full border border-[#FF7A1A]/15 font-display flex items-center select-none"
                    >
                      {getAchievementIcon(badge)}
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Polaroid/Sticky Note (Digital Student Life Memory Board piece) */}
        <div className="bg-[#151515] text-[#B8B8B8] rounded-3xl p-6 border border-white/5 shadow-2xl transform rotate-1 hover:rotate-0 transition-transform duration-300 relative select-none">
          <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-[#FF7A1A]/20 rounded-full border border-[#FF7A1A]/40 shadow-md flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-[#FF7A1A] rounded-full" />
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="font-display font-extrabold text-xs border-b border-white/5 pb-2 text-center text-white tracking-wider uppercase flex items-center justify-center space-x-1.5">
              <Pin className="w-4 h-4 text-[#FF7A1A] transform -rotate-45 flex-shrink-0" />
              <span>Fall Goals</span>
            </h3>
            <ul className="space-y-3 font-display font-bold text-xs text-[#B8B8B8] pl-1.5 text-left">
              <li className="flex items-center space-x-2">
                <span className="text-[#FF7A1A] text-sm">✦</span>
                <span>RSVP to at least 5 campus social events</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#FF7A1A] text-sm">✦</span>
                <span>Join BSU and Women in STEM sessions</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#FF7A1A] text-sm">✦</span>
                <span>Post moments from football match and expo</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#FF7A1A] text-sm">✦</span>
                <span>Connect campus developers on Evida!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs segment */}
      <div className="space-y-6">
        
        {/* Tab Buttons bar */}
        <div className="flex border-b border-white/5 max-w-2xl mx-auto sm:mx-0 select-none">
          <button
            onClick={() => setActiveTab('attending')}
            className={`flex-1 pb-3 text-center sm:text-left sm:pr-8 text-sm font-bold font-display tracking-tight transition-all relative cursor-pointer ${
              activeTab === 'attending' 
                ? 'text-[#FF7A1A] font-extrabold' 
                : 'text-[#B8B8B8]/60 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Calendar className="w-4 h-4" />
              <span>Attending ({rsvpEvents.length})</span>
            </span>
            {activeTab === 'attending' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF7A1A] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 pb-3 text-center sm:text-left sm:px-8 text-sm font-bold font-display tracking-tight transition-all relative cursor-pointer ${
              activeTab === 'saved' 
                ? 'text-[#FF7A1A] font-extrabold' 
                : 'text-[#B8B8B8]/60 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Heart className="w-4 h-4" />
              <span>Saved Events ({savedEvents.length})</span>
            </span>
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF7A1A] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('communities')}
            className={`flex-1 pb-3 text-center sm:text-left sm:px-8 text-sm font-bold font-display tracking-tight transition-all relative cursor-pointer ${
              activeTab === 'communities' 
                ? 'text-[#FF7A1A] font-extrabold' 
                : 'text-[#B8B8B8]/60 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Users className="w-4 h-4" />
              <span>Joined Clubs ({followedComms.length})</span>
            </span>
            {activeTab === 'communities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF7A1A] rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex-1 pb-3 text-center sm:text-left sm:pl-8 text-sm font-bold font-display tracking-tight transition-all relative cursor-pointer ${
              activeTab === 'opportunities' 
                ? 'text-[#FF7A1A] font-extrabold' 
                : 'text-[#B8B8B8]/60 hover:text-white'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Saved Careers ({savedOpps.length})</span>
            </span>
            {activeTab === 'opportunities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF7A1A] rounded-t-full" />
            )}
          </button>
        </div>

        {/* Tab content grids */}
        <div className="min-h-[200px]">
          
          {/* RSVP Attending grid */}
          {activeTab === 'attending' && (
            rsvpEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {rsvpEvents.map(event => (
                  <EventCard key={`profile-att-${event.id}`} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-sm mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6 text-[#FF7A1A]" />
                </div>
                <h4 className="font-display font-bold text-base text-white">No RSVPs yet</h4>
                <p className="text-xs text-[#B8B8B8] leading-relaxed">
                  You haven't RSVP'd to any events yet. Check out what is happening on campus and lock in your spots!
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('explore')} className="border-white/5 hover:border-[#FF7A1A]">
                  Browse Campus Events
                </Button>
              </div>
            )
          )}

          {/* Bookmarks Saved grid */}
          {activeTab === 'saved' && (
            savedEvents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {savedEvents.map(event => (
                  <EventCard key={`profile-sav-${event.id}`} event={event} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-sm mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto animate-pulse">
                  <Heart className="w-6 h-6 text-[#FF7A1A]" />
                </div>
                <h4 className="font-display font-bold text-base text-white">No bookmarks saved</h4>
                <p className="text-xs text-[#B8B8B8] leading-relaxed">
                  Bookmark events you might want to attend later by tapping the heart icon on any event card.
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('explore')} className="border-white/5 hover:border-[#FF7A1A]">
                  Browse Campus Events
                </Button>
              </div>
            )
          )}

          {/* Joined Clubs list */}
          {activeTab === 'communities' && (
            followedComms.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {followedComms.map(comm => (
                  <CommunityCard key={`profile-comm-${comm.id}`} community={comm} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-sm mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-[#FF7A1A]" />
                </div>
                <h4 className="font-display font-bold text-base text-white">No joined communities</h4>
                <p className="text-xs text-[#B8B8B8] leading-relaxed">
                  Join student clubs or societies to keep track of their projects, updates, and upcoming custom events.
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('communities')} className="border-white/5 hover:border-[#FF7A1A]">
                  Explore Student Clubs
                </Button>
              </div>
            )
          )}

          {/* Saved Opportunities list */}
          {activeTab === 'opportunities' && (
            savedOpps.length > 0 ? (
              <div className="space-y-3 max-w-3xl mx-auto">
                {savedOpps.map(opp => (
                  <div key={`profile-opp-${opp.id}`} className="bg-[#111111] p-4.5 rounded-2xl border border-white/5 shadow-sm flex items-center justify-between text-left">
                    <div>
                      <span className="bg-[#FF7A1A]/10 text-[#FF7A1A] text-[9px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider font-display select-none border border-[#FF7A1A]/15">
                        {opp.type}
                      </span>
                      <h4 
                        onClick={() => handleViewOpportunity(opp.id)}
                        className="text-sm font-bold text-white font-display pt-1.5 cursor-pointer hover:text-[#FF7A1A] transition-colors"
                      >
                        {opp.title}
                      </h4>
                      <p className="text-xs text-[#B8B8B8] font-semibold">{opp.organizer}</p>
                      <p className="text-xs text-[#FF7A1A] font-bold flex items-center pt-0.5">
                        <DollarSign className="w-3.5 h-3.5 mr-0.5 text-[#FF7A1A] flex-shrink-0" />
                        <span>{opp.reward}</span>
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <button
                        onClick={() => saveOpportunity(opp.id)}
                        className="text-xs text-[#B8B8B8]/50 hover:text-[#FF7A1A] font-bold font-display cursor-pointer"
                      >
                        Remove
                      </button>
                      <Button variant="primary" size="sm" onClick={() => handleViewOpportunity(opp.id)} className="py-1 px-4 text-xs font-bold">
                        Apply
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 max-w-sm mx-auto space-y-4">
                <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mx-auto">
                  <Briefcase className="w-6 h-6 text-[#FF7A1A]" />
                </div>
                <h4 className="font-display font-bold text-base text-white">No saved opportunities</h4>
                <p className="text-xs text-[#B8B8B8] leading-relaxed">
                  Bookmarked internships, research assistantships, or competitions will appear here.
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('opportunities')} className="border-white/5 hover:border-[#FF7A1A]">
                  Browse Opportunities
                </Button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Edit Profile Modal Panel */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#111111] rounded-[2rem] p-6 sm:p-8 max-w-md w-full border border-white/10 shadow-2xl relative space-y-5 animate-fadeIn text-left">
            {/* Close */}
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-display text-white">
              Edit Student Profile
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider font-display">Student Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all font-sans"
                  required
                />
              </div>

              {/* Major */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider font-display">Major of Study</label>
                <input
                  type="text"
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all font-sans"
                  required
                />
              </div>

              {/* Graduation Year */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider font-display">Graduation Year</label>
                <input
                  type="text"
                  value={editGraduationYear}
                  onChange={(e) => setEditGraduationYear(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all font-sans"
                  required
                />
              </div>

              {/* University */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider font-display">University</label>
                <input
                  type="text"
                  value={editUniversity}
                  onChange={(e) => setEditUniversity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all font-sans"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider font-display">Short Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all font-sans resize-none"
                  required
                />
              </div>

              {/* Interests tag inputs */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8]/60 uppercase tracking-wider font-display">Interests (comma separated)</label>
                <input
                  type="text"
                  value={editInterests}
                  onChange={(e) => setEditInterests(e.target.value)}
                  placeholder="e.g. Design, Coding, Outdoors"
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/20 focus:border-[#FF7A1A] transition-all font-sans"
                />
              </div>

              {/* Action Rows */}
              <div className="pt-4 flex gap-3 border-t border-white/5">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsEditing(false)}
                  className="w-full border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full flex items-center justify-center space-x-1.5 font-bold"
                >
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>Save Changes</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
export default Profile;

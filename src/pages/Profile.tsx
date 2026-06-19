import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import EventCard from '../components/EventCard';
import CommunityCard from '../components/CommunityCard';
import Button from '../components/Button';
import { Heart, Calendar, Users, Edit3, X, Check, Award, Briefcase, GraduationCap, MapPin, Pin, DollarSign, Terminal } from 'lucide-react';

const getAchievementIcon = (name: string) => {
  if (name.includes('Catalyst')) return <Award className="w-3.5 h-3.5 mr-1 text-brand-purple flex-shrink-0" />;
  if (name.includes('Finalist')) return <Terminal className="w-3.5 h-3.5 mr-1 text-brand-purple flex-shrink-0" />;
  return <GraduationCap className="w-3.5 h-3.5 mr-1 text-brand-purple flex-shrink-0" />;
};

export const Profile: React.FC = () => {
  const { profile, events, communities, opportunities, updateProfile, setCurrentPage, saveOpportunity, setSelectedOpportunityId } = useApp();
  const [activeTab, setActiveTab] = useState<'attending' | 'saved' | 'communities' | 'opportunities'>('attending');
  const [isEditing, setIsEditing] = useState(false);

  const handleViewOpportunity = (oppId: string) => {
    setSelectedOpportunityId(oppId);
    setCurrentPage('opportunity-details');
  };
  
  // Profile edit states
  const [editName, setEditName] = useState(profile.name);
  const [editMajor, setEditMajor] = useState(profile.major);
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
    
    updateProfile(editName, editBio, interestsList, editMajor, editUniversity);
    setIsEditing(false);
  };

  const handleOpenEdit = () => {
    setEditName(profile.name);
    setEditMajor(profile.major);
    setEditUniversity(profile.university);
    setEditBio(profile.bio);
    setEditInterests(profile.interests.join(', '));
    setIsEditing(true);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 fade-in pb-16">
      
      {/* Profile Header & Sticky Note Memory Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Profile Card Info */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-brand-lavender/30 shadow-sm space-y-6 relative overflow-hidden text-left">
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-peach/10 rounded-bl-full pointer-events-none" />
          
          <div className="flex flex-col sm:flex-row items-center sm:items-start text-center sm:text-left gap-6">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-brand-lavender shadow-md bg-brand-lavender/30">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <button 
                onClick={handleOpenEdit}
                className="absolute bottom-0 right-0 p-2 bg-brand-purple hover:bg-[#5939e6] text-white rounded-full shadow-md transition-transform active:scale-95"
                title="Edit Profile"
              >
                <Edit3 className="w-4 h-4" />
              </button>
            </div>

            {/* Profile Info */}
            <div className="space-y-3 flex-grow min-w-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <h1 className="text-2xl sm:text-3xl font-bold font-display text-brand-text">
                  {profile.name}
                </h1>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={handleOpenEdit}
                  className="border-brand-purple/15 hover:border-brand-purple hidden sm:inline-flex text-xs py-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
                  <span>Edit Profile</span>
                </Button>
              </div>

              {/* Major & University info */}
              <div className="flex flex-wrap justify-center sm:justify-start items-center gap-x-4 gap-y-1 text-xs sm:text-sm font-semibold text-brand-text-sec">
                <span className="flex items-center text-brand-purple">
                  <GraduationCap className="w-4 h-4 mr-1 flex-shrink-0 text-brand-purple/80" />
                  {profile.major}
                </span>
                <span className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1 flex-shrink-0 text-brand-text-sec/40" />
                  {profile.university}
                </span>
              </div>

              {/* Bio */}
              <p className="text-sm sm:text-base text-brand-text-sec leading-relaxed max-w-xl">
                {profile.bio}
              </p>

              {/* Interests Cloud */}
              <div className="space-y-1.5 pt-2">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-text-sec/55 font-display">Interests</h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-1.5">
                  {profile.interests.map((tag, idx) => (
                    <span 
                      key={idx}
                      className="px-2.5 py-1 bg-brand-lavender/30 hover:bg-brand-lavender/50 text-brand-purple text-[11px] font-bold rounded-full transition-colors font-display"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements Badges Section (Required Detail) */}
              <div className="space-y-1.5 pt-3">
                <h4 className="text-[10px] font-bold uppercase tracking-wider text-brand-text-sec/55 font-display flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-brand-purple" />
                  Achievements Badges
                </h4>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {profile.achievements.map((badge, idx) => (
                    <span 
                      key={idx}
                      className="px-3 py-1 bg-brand-blue/5 text-brand-blue text-[11px] font-bold rounded-full border border-brand-blue/15 font-display flex items-center select-none"
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
        <div className="bg-[#FFFCE8] text-brand-text rounded-3xl p-6 border-2 border-[#EEDF9D] shadow-md transform rotate-1 hover:rotate-0 transition-transform duration-300 relative select-none">
          {/* Pushpin pin drawing */}
          <div className="absolute -top-3.5 left-1/2 transform -translate-x-1/2 w-7 h-7 bg-red-400 rounded-full border border-red-500 shadow-sm flex items-center justify-center">
            <div className="w-1.5 h-1.5 bg-white rounded-full opacity-60" />
          </div>
          
          <div className="space-y-4 pt-2">
            <h3 className="font-display font-extrabold text-base border-b-2 border-dashed border-[#EEDF9D] pb-2 text-center text-brand-text-sec tracking-wide uppercase flex items-center justify-center space-x-1.5">
              <Pin className="w-4 h-4 text-brand-purple transform -rotate-45 flex-shrink-0" />
              <span>Fall Goals</span>
            </h3>
            <ul className="space-y-3 font-display font-bold text-xs text-brand-text-sec/90 pl-1.5 text-left">
              <li className="flex items-center space-x-2">
                <span className="text-[#DDD196] text-sm">✦</span>
                <span>RSVP to at least 5 campus social events</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#DDD196] text-sm">✦</span>
                <span>Join a tech circle or creative studio</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#DDD196] text-sm">✦</span>
                <span>Organize a coffee chat for roommates</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-[#DDD196] text-sm">✦</span>
                <span>Keep campus memories positive!</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Tabs segment */}
      <div className="space-y-6">
        
        {/* Tab Buttons bar */}
        <div className="flex border-b border-brand-lavender/35 max-w-2xl mx-auto sm:mx-0 select-none">
          <button
            onClick={() => setActiveTab('attending')}
            className={`flex-1 pb-3 text-center sm:text-left sm:pr-8 text-sm font-bold font-display tracking-tight transition-all relative ${
              activeTab === 'attending' 
                ? 'text-brand-purple font-extrabold' 
                : 'text-brand-text-sec/60 hover:text-brand-text'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Calendar className="w-4 h-4" />
              <span>Attending ({rsvpEvents.length})</span>
            </span>
            {activeTab === 'attending' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('saved')}
            className={`flex-1 pb-3 text-center sm:text-left sm:px-8 text-sm font-bold font-display tracking-tight transition-all relative ${
              activeTab === 'saved' 
                ? 'text-brand-purple font-extrabold' 
                : 'text-brand-text-sec/60 hover:text-brand-text'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Heart className="w-4 h-4" />
              <span>Saved Events ({savedEvents.length})</span>
            </span>
            {activeTab === 'saved' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('communities')}
            className={`flex-1 pb-3 text-center sm:text-left sm:px-8 text-sm font-bold font-display tracking-tight transition-all relative ${
              activeTab === 'communities' 
                ? 'text-brand-purple font-extrabold' 
                : 'text-brand-text-sec/60 hover:text-brand-text'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Users className="w-4 h-4" />
              <span>Joined Clubs ({followedComms.length})</span>
            </span>
            {activeTab === 'communities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple rounded-t-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('opportunities')}
            className={`flex-1 pb-3 text-center sm:text-left sm:pl-8 text-sm font-bold font-display tracking-tight transition-all relative ${
              activeTab === 'opportunities' 
                ? 'text-brand-purple font-extrabold' 
                : 'text-brand-text-sec/60 hover:text-brand-text'
            }`}
          >
            <span className="flex items-center justify-center sm:justify-start space-x-1.5">
              <Briefcase className="w-4 h-4" />
              <span>Saved Careers ({savedOpps.length})</span>
            </span>
            {activeTab === 'opportunities' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-purple rounded-t-full" />
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
                <div className="w-12 h-12 rounded-full bg-brand-lavender/30 flex items-center justify-center mx-auto">
                  <Calendar className="w-6 h-6 text-brand-purple" />
                </div>
                <h4 className="font-display font-bold text-base text-brand-text">No RSVPs yet</h4>
                <p className="text-xs text-brand-text-sec leading-relaxed">
                  You haven't RSVP'd to any events yet. Check out what is happening on campus and lock in your spots!
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('explore')} className="border-brand-purple/15 hover:border-brand-purple">
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
                <div className="w-12 h-12 rounded-full bg-brand-lavender/30 flex items-center justify-center mx-auto">
                  <Heart className="w-6 h-6 text-brand-purple animate-pulse" />
                </div>
                <h4 className="font-display font-bold text-base text-brand-text">No bookmarks saved</h4>
                <p className="text-xs text-brand-text-sec leading-relaxed">
                  Bookmark events you might want to attend later by tapping the heart icon on any event card.
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('explore')} className="border-brand-purple/15 hover:border-brand-purple">
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
                <div className="w-12 h-12 rounded-full bg-brand-lavender/30 flex items-center justify-center mx-auto">
                  <Users className="w-6 h-6 text-brand-purple" />
                </div>
                <h4 className="font-display font-bold text-base text-brand-text">No joined communities</h4>
                <p className="text-xs text-brand-text-sec leading-relaxed">
                  Join student clubs or societies to keep track of their projects, updates, and upcoming custom events.
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('communities')} className="border-brand-purple/15 hover:border-brand-purple">
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
                  <div key={`profile-opp-${opp.id}`} className="bg-white p-4.5 rounded-2xl border border-brand-lavender/25 shadow-sm flex items-center justify-between text-left">
                    <div>
                      <span className="bg-brand-purple/10 text-brand-purple text-[9px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider font-display select-none">
                        {opp.type}
                      </span>
                      <h4 
                        onClick={() => handleViewOpportunity(opp.id)}
                        className="text-sm font-bold text-brand-text font-display pt-1 cursor-pointer hover:text-brand-purple transition-colors"
                      >
                        {opp.title}
                      </h4>
                      <p className="text-xs text-brand-text-sec font-semibold">{opp.organizer}</p>
                      <p className="text-xs text-brand-purple font-bold flex items-center">
                        <DollarSign className="w-3.5 h-3.5 mr-0.5 text-brand-purple flex-shrink-0" />
                        <span>{opp.reward}</span>
                      </p>
                    </div>
                    <div className="flex gap-2 items-center">
                      <button
                        onClick={() => saveOpportunity(opp.id)}
                        className="text-xs text-brand-text-sec/40 hover:text-brand-purple font-bold font-display"
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
                <div className="w-12 h-12 rounded-full bg-brand-lavender/30 flex items-center justify-center mx-auto">
                  <Briefcase className="w-6 h-6 text-brand-purple" />
                </div>
                <h4 className="font-display font-bold text-base text-brand-text">No saved opportunities</h4>
                <p className="text-xs text-brand-text-sec leading-relaxed">
                  Bookmarked internships, research assistantships, or competitions will appear here.
                </p>
                <Button variant="outline" size="sm" onClick={() => setCurrentPage('opportunities')} className="border-brand-purple/15 hover:border-brand-purple">
                  Browse Opportunities
                </Button>
              </div>
            )
          )}
        </div>
      </div>

      {/* Edit Profile Modal Panel */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 bg-brand-text/30 backdrop-blur-sm">
          <div className="bg-brand-bg rounded-[2rem] p-6 sm:p-8 max-w-md w-full border border-brand-lavender shadow-2xl relative space-y-5 animate-fadeIn text-left">
            {/* Close */}
            <button 
              onClick={() => setIsEditing(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full text-brand-text/40 hover:text-brand-text hover:bg-brand-lavender/30 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="text-xl font-bold font-display text-brand-text">
              Edit Student Profile
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              {/* Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-text-sec/60 uppercase tracking-wider font-display">Student Name</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-brand-lavender/65 rounded-xl text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-sans"
                  required
                />
              </div>

              {/* Major */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-text-sec/60 uppercase tracking-wider font-display">Major of Study</label>
                <input
                  type="text"
                  value={editMajor}
                  onChange={(e) => setEditMajor(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-brand-lavender/65 rounded-xl text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-sans"
                  required
                />
              </div>

              {/* University */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-text-sec/60 uppercase tracking-wider font-display">University</label>
                <input
                  type="text"
                  value={editUniversity}
                  onChange={(e) => setEditUniversity(e.target.value)}
                  className="w-full px-4 py-2.5 bg-white border border-brand-lavender/65 rounded-xl text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-sans"
                  required
                />
              </div>

              {/* Bio */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-text-sec/60 uppercase tracking-wider font-display">Short Bio</label>
                <textarea
                  value={editBio}
                  onChange={(e) => setEditBio(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-white border border-brand-lavender/65 rounded-xl text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-sans"
                  required
                />
              </div>

              {/* Interests tag inputs */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-brand-text-sec/60 uppercase tracking-wider font-display">Interests (comma separated)</label>
                <input
                  type="text"
                  value={editInterests}
                  onChange={(e) => setEditInterests(e.target.value)}
                  placeholder="e.g. Design, Coding, Outdoors"
                  className="w-full px-4 py-2.5 bg-white border border-brand-lavender/65 rounded-xl text-sm text-brand-text focus:outline-none focus:ring-2 focus:ring-brand-purple/20 focus:border-brand-purple transition-all font-sans"
                />
              </div>

              {/* Action Rows */}
              <div className="pt-4 flex gap-3 border-t border-brand-lavender/35">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setIsEditing(false)}
                  className="w-full border-brand-purple/15 hover:border-brand-purple"
                >
                  Cancel
                </Button>
                
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full flex items-center justify-center space-x-1.5"
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

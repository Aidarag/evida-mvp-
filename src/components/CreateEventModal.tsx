import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { X, Calendar, MapPin, Users, Sparkles, Check } from 'lucide-react';
import Button from './Button';

export const CreateEventModal: React.FC = () => {
  const { isCreateModalOpen, setCreateModalOpen, createEvent, communities } = useApp();

  // Form states
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<'Social' | 'Career' | 'Sports' | 'Culture' | 'Academic' | 'Wellness' | 'Volunteer'>('Social');
  const [organizer, setOrganizer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [capacity, setCapacity] = useState('100');
  const [image, setImage] = useState('https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800');

  // Preset images matching campus vibes
  const presets = [
    { name: 'Festival Lights', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Social Gathering', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' },
    { name: 'Workshop Tech', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800' },
    { name: 'Game Lounge', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800' },
    { name: 'Outdoor sports', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800' },
  ];

  // Set default organizer to first community when modal opens
  useEffect(() => {
    if (communities.length > 0 && !organizer) {
      setOrganizer(communities[0].name);
    }
  }, [communities, organizer]);

  if (!isCreateModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !date || !time || !location || !description) return;

    createEvent({
      title,
      description,
      date,
      time,
      location,
      organizer: organizer || 'Independent Host',
      category,
      image
    });

    // Reset Form
    setTitle('');
    setDate('');
    setTime('');
    setLocation('');
    setDescription('');
    setCapacity('100');
    setCreateModalOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="bg-[#111111] rounded-[2.5rem] border border-white/10 shadow-2xl w-full max-w-5xl h-[85vh] md:h-auto md:max-h-[90vh] overflow-hidden flex flex-col md:flex-row relative animate-fadeIn select-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={() => setCreateModalOpen(false)}
          className="absolute top-5 right-5 p-2 rounded-full text-white/55 hover:text-white bg-white/5 hover:bg-white/10 transition-colors z-20"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Form scrollable */}
        <div className="w-full md:w-[58%] p-6 md:p-10 overflow-y-auto custom-scrollbar text-left flex flex-col justify-between">
          <div>
            <div className="flex items-center space-x-2.5 mb-6">
              <Sparkles className="w-5 h-5 text-[#FF7A1A]" />
              <h2 className="text-xl md:text-2xl font-bold font-display text-white">Create Campus Event</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Event Name */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Event Name</label>
                <input
                  type="text"
                  placeholder="e.g. BSU Homecoming Barbecue"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white placeholder-[#B8B8B8]/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans"
                  required
                />
              </div>

              {/* Grid Date/Time/Location */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Date</label>
                  <input
                    type="text"
                    placeholder="e.g. Oct 16, 2026"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white placeholder-[#B8B8B8]/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Time</label>
                  <input
                    type="text"
                    placeholder="e.g. 5:00 PM - 8:00 PM"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white placeholder-[#B8B8B8]/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans"
                    required
                  />
                </div>
              </div>

              {/* Location & Capacity */}
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2 space-y-1">
                  <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Location</label>
                  <input
                    type="text"
                    placeholder="e.g. Student Center Lawn"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white placeholder-[#B8B8B8]/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Capacity</label>
                  <input
                    type="number"
                    value={capacity}
                    onChange={(e) => setCapacity(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans"
                  />
                </div>
              </div>

              {/* Organization & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Host Organization</label>
                  <select
                    value={organizer}
                    onChange={(e) => setOrganizer(e.target.value)}
                    className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans cursor-pointer"
                  >
                    {communities.map((comm) => (
                      <option key={comm.id} value={comm.name} className="bg-[#111111]">
                        {comm.name}
                      </option>
                    ))}
                    <option value="Independent Host" className="bg-[#111111]">Independent Host</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value as any)}
                    className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans cursor-pointer"
                  >
                    {['Social', 'Career', 'Sports', 'Culture', 'Academic', 'Wellness', 'Volunteer'].map((cat) => (
                      <option key={cat} value={cat} className="bg-[#111111]">{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Cover Image Preset Selector */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Event Cover Image</label>
                <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
                  {presets.map((preset) => {
                    const isSelected = image === preset.url;
                    return (
                      <button
                        key={preset.name}
                        type="button"
                        onClick={() => setImage(preset.url)}
                        className={`flex-shrink-0 px-3 py-1.5 rounded-full text-[10px] font-bold font-display border transition-all ${
                          isSelected
                            ? 'bg-[#FF7A1A] text-white border-[#FF7A1A]'
                            : 'bg-[#161616] text-[#B8B8B8] border-white/5 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        {preset.name}
                      </button>
                    );
                  })}
                </div>
                {/* Custom URL Input */}
                <input
                  type="text"
                  placeholder="Or paste a custom image Unsplash URL..."
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full px-4 py-2 bg-[#090909] border border-white/5 rounded-xl text-[10px] text-white placeholder-[#B8B8B8]/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans"
                />
              </div>

              {/* Description */}
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-[#B8B8B8] uppercase tracking-wider font-display">Description</label>
                <textarea
                  placeholder="What is happening? Share event rules, food details, or special guest schedules..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full px-4 py-2.5 bg-[#090909] border border-white/5 rounded-xl text-xs text-white placeholder-[#B8B8B8]/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A1A]/35 focus:border-[#FF7A1A] transition-all font-sans resize-none"
                  required
                />
              </div>

              {/* Action Buttons */}
              <div className="pt-3 border-t border-white/5 flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="md"
                  onClick={() => setCreateModalOpen(false)}
                  className="w-full border-white/10 text-white hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="md"
                  className="w-full flex items-center justify-center space-x-1 shadow-lg shadow-[#FF7A1A]/10 font-bold"
                >
                  <Check className="w-4 h-4 stroke-[3px]" />
                  <span>Create Live Event</span>
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Right Column: Live Event Card Preview */}
        <div className="hidden md:flex w-[42%] bg-[#151515] p-10 flex-col items-center justify-center border-l border-white/5 relative">
          {/* Live Badge overlay */}
          <div className="absolute top-6 left-6 flex items-center space-x-1.5 px-3 py-1 bg-[#FF7A1A]/10 text-[9px] font-bold text-[#FF7A1A] rounded-full border border-[#FF7A1A]/15 uppercase tracking-widest font-display animate-pulse">
            <span className="w-1.5 h-1.5 bg-[#FF7A1A] rounded-full" />
            <span>Real-time Preview</span>
          </div>

          {/* Styled Event Preview Card */}
          <div className="w-[300px] bg-[#111111] rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl relative">
            {/* Header Image */}
            <div className="h-44 w-full bg-[#1c1c1c] overflow-hidden relative">
              <img
                src={image}
                alt="Event cover preview"
                className="w-full h-full object-cover opacity-80"
              />
              <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold font-display bg-[#FF7A1A]/15 text-[#FF7A1A] border border-[#FF7A1A]/20">
                {category}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 text-left flex flex-col h-48 justify-between">
              <div>
                <p className="text-[10px] text-[#B8B8B8] font-bold uppercase tracking-wider font-display mb-1 truncate">
                  {organizer || 'Host Organization'}
                </p>
                <h3 className="text-base font-bold text-white font-display line-clamp-1">
                  {title || 'Untitled Campus Event'}
                </h3>

                <div className="space-y-1.5 mt-3">
                  <div className="flex items-center text-[11px] text-[#B8B8B8]">
                    <Calendar className="w-3.5 h-3.5 text-[#FF7A1A] mr-2 flex-shrink-0" />
                    <span className="truncate">{date || 'Scheduled Date'} • {time || 'Time'}</span>
                  </div>
                  <div className="flex items-center text-[11px] text-[#B8B8B8]">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A1A] mr-2 flex-shrink-0" />
                    <span className="truncate">{location || 'Livingstone Campus Location'}</span>
                  </div>
                </div>
              </div>

              {/* RSVP Footer block */}
              <div className="pt-3 border-t border-white/5 flex justify-between items-center mt-auto">
                <div className="flex items-center text-[10px] text-[#B8B8B8] font-semibold bg-[#161616] px-2.5 py-1 rounded-full border border-white/5">
                  <Users className="w-3 h-3 text-[#B8B8B8]/40 mr-1" />
                  <span>1 going</span>
                </div>
                <div className="text-[10px] font-bold text-[#FF7A1A] bg-[#FF7A1A]/10 py-1 px-3.5 rounded-full border border-[#FF7A1A]/15 select-none">
                  RSVP
                </div>
              </div>
            </div>
          </div>

          {/* Motivational Tip below preview */}
          <p className="text-[10px] text-[#B8B8B8]/50 text-center max-w-[260px] leading-relaxed mt-6">
            Your event will immediately broadcast to the explore page for other students to discover and join.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;

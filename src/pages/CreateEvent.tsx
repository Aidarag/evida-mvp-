import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import { Sparkles, Calendar, Clock, MapPin, Tag, User, Users, Image, CheckCircle, ArrowRight } from 'lucide-react';

interface FormErrors {
  title?: string;
  description?: string;
  date?: string;
  time?: string;
  location?: string;
  organizer?: string;
  category?: string;
}

export const CreateEvent: React.FC = () => {
  const { createEvent, communities, setCurrentPage, setExploreActiveTab } = useApp();
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<'Social' | 'Career' | 'Sports' | 'Culture' | 'Academic' | 'Wellness' | 'Volunteer'>('Social');
  const [organizer, setOrganizer] = useState('');
  const [capacity, setCapacity] = useState('100');

  // Preset images matching campus vibes
  const themePresets = [
    { name: 'Social Mixer', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' },
    { name: 'Festival Lights', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=800' },
    { name: 'Game & Play', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800' },
    { name: 'Coffee Chat', url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800' },
    { name: 'Academic Talk', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800' },
    { name: 'Athletics Field', url: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&q=80&w=800' }
  ];

  const [selectedImage, setSelectedImage] = useState(themePresets[0].url);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Set default organizer to first community when page loads
  useEffect(() => {
    if (communities.length > 0 && !organizer) {
      setOrganizer(communities[0].name);
    }
  }, [communities, organizer]);

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!title.trim()) tempErrors.title = 'Event Title is required.';
    if (!description.trim()) tempErrors.description = 'Description is required.';
    if (!date.trim()) tempErrors.date = 'Date is required.';
    if (!time.trim()) tempErrors.time = 'Time is required.';
    if (!location.trim()) tempErrors.location = 'Location is required.';
    if (!organizer.trim()) tempErrors.organizer = 'Organizer is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      createEvent({
        title,
        description,
        date,
        time,
        location,
        category,
        organizer: organizer || 'Independent Host',
        image: selectedImage
      });

      setIsSubmitted(true);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDate('');
    setTime('');
    setLocation('');
    setCategory('Social');
    setCapacity('100');
    if (communities.length > 0) {
      setOrganizer(communities[0].name);
    } else {
      setOrganizer('');
    }
    setSelectedImage(themePresets[0].url);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8 fade-in pb-24">
        <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-brand-text/5 shadow-xl space-y-6">
          <div className="w-20 h-20 bg-emerald-500/10 text-emerald-500 rounded-full mx-auto flex items-center justify-center border border-emerald-500/20 shadow-inner">
            <CheckCircle className="w-10 h-10 stroke-[2.5px]" />
          </div>
          
          <div className="space-y-3 select-none">
            <h2 className="text-3xl font-bold text-brand-text font-display uppercase tracking-tight">
              Event Published!
            </h2>
            <p className="text-brand-text-sec leading-relaxed text-sm sm:text-base font-sans">
              Your experience is now live on the campus square. Other students will be able to RSVP and join you.
            </p>
          </div>

          <div className="bg-brand-bg p-5 rounded-2xl border border-brand-text/5 text-left space-y-1.5 select-none">
            <p className="text-[10px] font-bold tracking-wider text-brand-text-sec/40 uppercase">Live Preview Details</p>
            <p className="text-sm font-bold text-brand-text line-clamp-1">{title}</p>
            <p className="text-xs text-brand-text-sec">{date} • {time}</p>
            <p className="text-xs text-brand-text-sec/80">{location}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => {
                setExploreActiveTab('events');
                setCurrentPage('explore');
              }}
              className="w-full flex items-center justify-center space-x-1.5 font-bold shadow-lg shadow-[#FF7A30]/10"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="md"
              onClick={resetForm}
              className="w-full border-brand-text/10 hover:border-brand-text text-brand-text"
            >
              Organize Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 fade-in pb-24 text-left select-none bg-brand-bg">
      
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-text font-display uppercase tracking-tight">
          Host Experience
        </h1>
        <p className="text-sm sm:text-base text-brand-text-sec leading-relaxed font-sans font-medium">
          Create an event, select a preset banner or paste an Unsplash link, add your details, and preview in real-time.
        </p>
      </div>

      {/* Side-by-Side Builder Layout */}
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        
        {/* Left Side: Creation Form */}
        <div className="w-full lg:w-[58%] bg-white rounded-[2rem] border border-brand-text/5 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="flex items-center space-x-2.5 border-b border-brand-text/5 pb-4 mb-2">
            <Sparkles className="w-5 h-5 text-[#FF7A30]" />
            <h3 className="text-2xl font-display text-brand-text uppercase tracking-tight">Event Specifications</h3>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Organizer Input select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider flex items-center">
                <User className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                Host Organization
              </label>
              <select
                value={organizer}
                onChange={(e) => setOrganizer(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.organizer ? 'border-red-500' : 'border-brand-text/10'
                } rounded-xl text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans cursor-pointer`}
              >
                {communities.map((comm) => (
                  <option key={comm.id} value={comm.name} className="bg-white text-brand-text">
                    {comm.name}
                  </option>
                ))}
                <option value="Independent Host" className="bg-white text-brand-text">Independent Host</option>
              </select>
              {errors.organizer && <p className="text-red-500 text-[10px] font-semibold">{errors.organizer}</p>}
            </div>

            {/* Event Title */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider flex items-center">
                <Sparkles className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                Event Title
              </label>
              <input
                type="text"
                placeholder="e.g. Sunset Matcha Chill & Paint"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.title ? 'border-red-500' : 'border-brand-text/10'
                } rounded-xl text-xs text-brand-text placeholder-brand-text-sec/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans`}
              />
              {errors.title && <p className="text-red-500 text-[10px] font-semibold">{errors.title}</p>}
            </div>

            {/* Grid Date & Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
                  <Calendar className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                  Date
                </label>
                <input
                  type="text"
                  placeholder="e.g. May 24, 2026"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.date ? 'border-red-500' : 'border-brand-text/10'
                  } rounded-xl text-xs text-brand-text placeholder-brand-text-sec/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans`}
                />
                {errors.date && <p className="text-red-500 text-[10px] font-semibold">{errors.date}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
                  <Clock className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                  Time
                </label>
                <input
                  type="text"
                  placeholder="e.g. 7:00 PM - 10:00 PM"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.time ? 'border-red-500' : 'border-brand-text/10'
                  } rounded-xl text-xs text-brand-text placeholder-brand-text-sec/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans`}
                />
                {errors.time && <p className="text-red-500 text-[10px] font-semibold">{errors.time}</p>}
              </div>
            </div>

            {/* Location & Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                  Location
                </label>
                <input
                  type="text"
                  placeholder="e.g. Student Center Lawn"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={`w-full px-4 py-3 bg-white border ${
                    errors.location ? 'border-red-500' : 'border-brand-text/10'
                  } rounded-xl text-xs text-brand-text placeholder-brand-text-sec/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans`}
                />
                {errors.location && <p className="text-red-500 text-[10px] font-semibold">{errors.location}</p>}
              </div>

              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider">Capacity</label>
                <input
                  type="number"
                  value={capacity}
                  onChange={(e) => setCapacity(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-brand-text/10 rounded-xl text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans"
                />
              </div>
            </div>

            {/* Category Select */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider flex items-center">
                <Tag className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full px-4 py-3 bg-white border border-brand-text/10 rounded-xl text-xs text-brand-text focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans cursor-pointer"
              >
                {['Social', 'Career', 'Sports', 'Culture', 'Academic', 'Wellness', 'Volunteer'].map((cat) => (
                  <option key={cat} value={cat} className="bg-white text-brand-text">{cat}</option>
                ))}
              </select>
            </div>

            {/* Cover Image Preset Selector */}
            <div className="space-y-2 pt-2">
              <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider flex items-center">
                <Image className="w-3.5 h-3.5 mr-1.5 text-[#FF7A30]" />
                Select Event Cover Image
              </label>
              <div className="flex gap-2 overflow-x-auto pb-1.5 scrollbar-none -mx-2 px-2">
                {themePresets.map((preset) => {
                  const isSelected = selectedImage === preset.url;
                  return (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => setSelectedImage(preset.url)}
                      className={`flex-shrink-0 px-3.5 py-1.5 rounded-full text-[10px] font-bold border transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#FF7A30] text-white border-[#FF7A30]'
                          : 'bg-brand-bg text-brand-text-sec border border-brand-text/5 hover:text-brand-text hover:bg-brand-bg/80'
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
                value={selectedImage}
                onChange={(e) => setSelectedImage(e.target.value)}
                className="w-full px-4 py-2 bg-white border border-brand-text/10 rounded-xl text-[10px] text-brand-text placeholder-brand-text-sec/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans"
              />
            </div>

            {/* Description */}
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-brand-text-sec uppercase tracking-wider">Description</label>
              <textarea
                placeholder="What is happening? Share event rules, food details, or schedules..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className={`w-full px-4 py-3 bg-white border ${
                  errors.description ? 'border-red-500' : 'border-brand-text/10'
                } rounded-xl text-xs text-brand-text placeholder-brand-text-sec/30 focus:outline-none focus:ring-2 focus:ring-[#FF7A30]/35 focus:border-[#FF7A30] transition-all font-sans resize-none`}
              />
              {errors.description && <p className="text-red-500 text-[10px] font-semibold">{errors.description}</p>}
            </div>

            {/* Submit Action */}
            <div className="pt-4 border-t border-brand-text/5">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                className="w-full flex items-center justify-center space-x-2 font-bold shadow-lg shadow-[#FF7A30]/10 py-3.5"
              >
                <span>Publish Campus Event</span>
              </Button>
            </div>
          </form>
        </div>

        {/* Right Side: Live Interactive Preview */}
        <div className="w-full lg:w-[42%] bg-white/40 p-8 rounded-[2rem] border border-brand-text/5 sticky top-24 flex flex-col items-center justify-center text-center space-y-6 shadow-sm">
          {/* Live indicator tag */}
          <div className="flex items-center space-x-1.5 px-3 py-1 bg-[#FF7A30]/10 text-[9px] font-bold text-[#FF7A30] rounded-full border border-[#FF7A30]/15 uppercase tracking-widest animate-pulse">
            <span className="w-1.5 h-1.5 bg-[#FF7A30] rounded-full" />
            <span>Real-time Preview</span>
          </div>

          {/* Styled Event Preview Card */}
          <div className="w-full max-w-[320px] bg-white rounded-[2rem] overflow-hidden border border-brand-text/5 shadow-2xl relative text-left">
            {/* Header Image */}
            <div className="h-44 w-full bg-brand-bg overflow-hidden relative">
              <img
                src={selectedImage}
                alt="Event cover preview"
                className="w-full h-full object-cover opacity-85"
              />
              <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-[#FF7A30]/15 text-[#FF7A30] border border-[#FF7A30]/20">
                {category}
              </span>
            </div>

            {/* Content Details */}
            <div className="p-5 flex flex-col h-48 justify-between">
              <div>
                <p className="text-[10px] text-brand-text-sec/60 font-bold uppercase tracking-wider mb-1 truncate">
                  {organizer || 'Host Organization'}
                </p>
                <h3 className="text-base font-bold text-brand-text line-clamp-1">
                  {title || 'Untitled Campus Event'}
                </h3>

                <div className="space-y-1.5 mt-3">
                  <div className="flex items-center text-[11px] text-brand-text-sec">
                    <Calendar className="w-3.5 h-3.5 text-[#FF7A30] mr-2 flex-shrink-0" />
                    <span className="truncate">{date || 'Scheduled Date'} • {time || 'Time'}</span>
                  </div>
                  <div className="flex items-center text-[11px] text-brand-text-sec">
                    <MapPin className="w-3.5 h-3.5 text-[#FF7A30] mr-2 flex-shrink-0" />
                    <span className="truncate">{location || 'Livingstone Campus Location'}</span>
                  </div>
                </div>
              </div>

              {/* RSVP Footer */}
              <div className="pt-3 border-t border-brand-text/5 flex justify-between items-center mt-auto">
                <div className="flex items-center text-[10px] text-brand-text-sec font-semibold bg-brand-bg px-2.5 py-1 rounded-full border border-brand-text/5">
                  <Users className="w-3 h-3 text-brand-text-sec/40 mr-1" />
                  <span>1 going</span>
                </div>
                <div className="text-[10px] font-bold text-[#FF7A30] bg-[#FF7A30]/10 py-1 px-3.5 rounded-full border border-[#FF7A30]/15 select-none">
                  RSVP
                </div>
              </div>
            </div>
          </div>

          <p className="text-[10px] text-brand-text-sec/50 text-center max-w-[260px] leading-relaxed font-medium">
            Publishing this event lists it on the campus square under the Explore tab, and auto-invites classmates.
          </p>
        </div>

      </div>
    </div>
  );
};

export default CreateEvent;

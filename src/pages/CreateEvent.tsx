import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import Button from '../components/Button';
import { Sparkles, Calendar, Clock, MapPin, Tag, User, Image, CheckCircle, ArrowRight } from 'lucide-react';

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
  const { createEvent, setCurrentPage } = useApp();
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('Social');
  const [organizer, setOrganizer] = useState('');
  
  // Theme Presets for Image
  const themePresets = [
    { name: 'Social Mixer', url: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=800' },
    { name: 'Game & Play', url: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&q=80&w=800' },
    { name: 'Coffee Chat', url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&q=80&w=800' },
    { name: 'Academic Talk', url: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=800' },
    { name: 'Festival / Art', url: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=800' },
    { name: 'Wellness Walk', url: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=80&w=800' },
  ];
  
  const [selectedImage, setSelectedImage] = useState(themePresets[0].url);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const categories = ['Social', 'Career', 'Sports', 'Culture', 'Academic', 'Wellness', 'Volunteer'];

  const validateForm = (): boolean => {
    const tempErrors: FormErrors = {};
    if (!title.trim()) tempErrors.title = 'Event Title is required.';
    if (!description.trim()) tempErrors.description = 'Description is required.';
    if (!date.trim()) tempErrors.date = 'Date is required.';
    if (!time.trim()) tempErrors.time = 'Time is required.';
    if (!location.trim()) tempErrors.location = 'Location is required.';
    if (!organizer.trim()) tempErrors.organizer = 'Organizer or Club name is required.';
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Map category format correctly
      const finalCategory = category as any;
      
      createEvent({
        title,
        description,
        date,
        time,
        location,
        category: finalCategory,
        organizer,
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
    setOrganizer('');
    setSelectedImage(themePresets[0].url);
    setErrors({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-8 fade-in pb-24">
        <div className="bg-white p-8 sm:p-12 rounded-[2rem] border border-brand-lavender/30 shadow-xl space-y-6">
          <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full mx-auto flex items-center justify-center border border-emerald-100 shadow-inner">
            <CheckCircle className="w-10 h-10 stroke-[2.5px]" />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-brand-text font-display">
              Event Created! 🎉
            </h2>
            <p className="text-brand-text-sec leading-relaxed text-sm sm:text-base">
              Your event is ready to be discovered. We have automatically listed it on the Explore page and RSVP'd you as the organizer.
            </p>
          </div>

          <div className="bg-brand-bg/80 p-5 rounded-2xl border border-brand-lavender/35 text-left space-y-1 select-none">
            <p className="text-[10px] font-bold tracking-wider text-brand-text-sec/50 uppercase font-display">Live Preview Details</p>
            <p className="text-sm font-bold text-brand-text line-clamp-1">{title}</p>
            <p className="text-xs text-brand-text-sec">{date} • {time}</p>
            <p className="text-xs text-brand-text-sec/80">{location}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={() => setCurrentPage('explore')}
              className="w-full flex items-center justify-center space-x-1.5 font-bold"
            >
              <span>Explore All Events</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
            
            <Button
              variant="outline"
              size="md"
              onClick={resetForm}
              className="w-full border-brand-purple/15 hover:border-brand-purple"
            >
              Organize Another
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 fade-in pb-24 text-left">
      {/* Header info */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl sm:text-5xl font-bold text-brand-text font-display">
          Host a New Event
        </h1>
        <p className="text-sm sm:text-base text-brand-text-sec">
          Gather your classmates, project group, or club members. Fill out details to post it on our campus square.
        </p>
      </div>

      <form 
        onSubmit={handleSubmit}
        className="bg-white rounded-[2rem] p-6 sm:p-10 border border-brand-lavender/30 shadow-sm space-y-6 sm:space-y-8"
      >
        {/* Form Inputs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          
          {/* Organizer Input */}
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <User className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
              Organizer / Club Name
            </label>
            <input
              type="text"
              value={organizer}
              onChange={(e) => setOrganizer(e.target.value)}
              placeholder="e.g. Creative Studio Club"
              className={`w-full px-4 py-3 bg-brand-bg/40 border ${errors.organizer ? 'border-red-400 focus:ring-red-200' : 'border-brand-lavender/70 focus:ring-brand-purple/20'} rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple transition-all text-brand-text`}
            />
            {errors.organizer && <p className="text-red-500 text-[11px] font-semibold">{errors.organizer}</p>}
          </div>

          {/* Event Title */}
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <Sparkles className="w-3.5 h-3.5 mr-1.5 text-brand-purple animate-pulse" />
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sunset Matcha Chill & Paint"
              className={`w-full px-4 py-3 bg-brand-bg/40 border ${errors.title ? 'border-red-400 focus:ring-red-200' : 'border-brand-lavender/70 focus:ring-brand-purple/20'} rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple transition-all text-brand-text`}
            />
            {errors.title && <p className="text-red-500 text-[11px] font-semibold">{errors.title}</p>}
          </div>

          {/* Event Description */}
          <div className="space-y-2 sm:col-span-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              Event Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              placeholder="Tell students what this event is about! What should they bring? What will you do? (Keep it welcoming!)"
              className={`w-full px-4 py-3 bg-brand-bg/40 border ${errors.description ? 'border-red-400 focus:ring-red-200' : 'border-brand-lavender/70 focus:ring-brand-purple/20'} rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple transition-all text-brand-text`}
            />
            {errors.description && <p className="text-red-500 text-[11px] font-semibold">{errors.description}</p>}
          </div>

          {/* Date Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
              Date
            </label>
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="e.g. Oct 25, 2026"
              className={`w-full px-4 py-3 bg-brand-bg/40 border ${errors.date ? 'border-red-400 focus:ring-red-200' : 'border-brand-lavender/70 focus:ring-brand-purple/20'} rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple transition-all text-brand-text`}
            />
            {errors.date && <p className="text-red-500 text-[11px] font-semibold">{errors.date}</p>}
          </div>

          {/* Time Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
              Time
            </label>
            <input
              type="text"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              placeholder="e.g. 5:30 PM - 7:30 PM"
              className={`w-full px-4 py-3 bg-brand-bg/40 border ${errors.time ? 'border-red-400 focus:ring-red-200' : 'border-brand-lavender/70 focus:ring-brand-purple/20'} rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple transition-all text-brand-text`}
            />
            {errors.time && <p className="text-red-500 text-[11px] font-semibold">{errors.time}</p>}
          </div>

          {/* Location Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <MapPin className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
              Location
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Quad Pavilion B"
              className={`w-full px-4 py-3 bg-brand-bg/40 border ${errors.location ? 'border-red-400 focus:ring-red-200' : 'border-brand-lavender/70 focus:ring-brand-purple/20'} rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple transition-all text-brand-text`}
            />
            {errors.location && <p className="text-red-500 text-[11px] font-semibold">{errors.location}</p>}
          </div>

          {/* Category Input */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <Tag className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-3 bg-brand-bg/40 border border-brand-lavender/70 focus:ring-brand-purple/20 rounded-xl text-sm font-sans focus:outline-none focus:ring-2 focus:border-brand-purple focus:bg-white transition-all text-brand-text cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Preset Theme Selection Grid */}
          <div className="space-y-3 sm:col-span-2 pt-4">
            <label className="text-xs font-bold text-brand-text-sec uppercase tracking-wider font-display flex items-center">
              <Image className="w-3.5 h-3.5 mr-1.5 text-brand-purple" />
              Select Event Banner Theme
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 select-none">
              {themePresets.map((preset) => {
                const isSelected = selectedImage === preset.url;
                return (
                  <div
                    key={preset.name}
                    onClick={() => setSelectedImage(preset.url)}
                    className={`relative h-20 rounded-2xl overflow-hidden cursor-pointer border-2 transition-all hover:scale-[1.02] ${
                      isSelected 
                        ? 'border-brand-purple scale-[1.02] shadow-md shadow-brand-purple/10' 
                        : 'border-transparent opacity-75 hover:opacity-100'
                    }`}
                  >
                    <img 
                      src={preset.url} 
                      alt={preset.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-end p-2.5">
                      <span className="text-[10px] font-bold text-white font-display leading-tight">{preset.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Submit action */}
        <div className="pt-6 border-t border-brand-lavender/25 flex justify-end">
          <Button
            type="submit"
            variant="primary"
            size="lg"
            className="w-full sm:w-auto shadow-sm shadow-brand-purple/10 font-bold"
          >
            Create Event & Invite
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CreateEvent;

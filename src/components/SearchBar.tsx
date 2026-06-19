import React from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = "Search campus events..."
}) => {
  return (
    <div className="relative w-full max-w-2xl mx-auto shadow-sm focus-within:shadow-md transition-all duration-200 rounded-full">
      <div className="absolute inset-y-0 left-0 pl-4.5 flex items-center pointer-events-none">
        <Search className="h-5 w-5 text-brand-purple/80" />
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="block w-full pl-12 pr-10 py-3.5 bg-white border border-brand-lavender text-brand-text placeholder-brand-text/30 rounded-full focus:outline-none focus:ring-2 focus:ring-brand-purple/30 focus:border-brand-purple transition-all text-sm font-sans"
        placeholder={placeholder}
      />
      {value && (
        <button
          onClick={() => onChange('')}
          className="absolute inset-y-0 right-0 pr-4.5 flex items-center text-brand-text/30 hover:text-brand-text transition-colors"
          title="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
export default SearchBar;

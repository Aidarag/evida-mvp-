import React from 'react';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onChange: (category: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onChange
}) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 pt-1 px-1 custom-scrollbar -mx-4 sm:mx-0 sm:justify-start scrollbar-none">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold font-display transition-all duration-200 border active:scale-95 cursor-pointer ${
              isActive
                ? 'bg-[#FF7A1A] text-white border-[#FF7A1A] shadow-md shadow-[#FF7A1A]/25'
                : 'bg-[#111111] text-[#B8B8B8]/60 hover:text-white border-white/5 hover:bg-white/5 hover:border-white/10'
            }`}
          >
            {category}
          </button>
        );
      })}
    </div>
  );
};
export default CategoryFilter;

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
                ? 'bg-[#FF7A30] text-white border-[#FF7A30] shadow-md shadow-[#FF7A30]/25'
                : 'bg-white text-brand-text-sec hover:text-brand-text border-brand-text/10 hover:bg-brand-bg hover:border-brand-text/20 shadow-sm'
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

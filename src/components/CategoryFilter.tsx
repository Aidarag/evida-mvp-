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
    <div className="flex space-x-2 overflow-x-auto pb-2 pt-1 px-1 custom-scrollbar -mx-4 sm:mx-0 sm:justify-center scrollbar-none">
      {categories.map((category) => {
        const isActive = selectedCategory === category;
        return (
          <button
            key={category}
            onClick={() => onChange(category)}
            className={`flex-shrink-0 px-5 py-2.5 rounded-full text-xs font-bold font-display transition-all duration-200 border-2 active:scale-95 ${
              isActive
                ? 'bg-brand-purple text-white border-brand-purple shadow-sm shadow-brand-purple/25'
                : 'bg-white text-brand-text/60 hover:text-brand-text border-brand-lavender/60 hover:bg-brand-lavender/20'
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

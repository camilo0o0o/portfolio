'use client';

import { Category } from '@/types';

interface CategoryFilterProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categoryColors: Record<string, string> = {
  'All': 'bg-gray-50',
  'UX Design': 'bg-blue-50',
  '3D & Motion': 'bg-purple-50',
  'Coding': 'bg-green-50',
  'Analog Explorations': 'bg-orange-50'
};

export default function CategoryFilter({ 
  categories, 
  activeCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4 mb-8">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`
            px-6 py-2 rounded-full text-sm font-medium transition-all duration-300
            ${activeCategory === category 
              ? 'bg-black text-white shadow-md' 
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
            }
          `}
        >
          {category}
        </button>
      ))}
    </div>
  );
} 
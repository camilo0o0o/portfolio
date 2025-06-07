'use client';

import { useState } from 'react';
import { projects, categories } from '@/data/projects';
import CategoryFilter from '@/components/projects/CategoryFilter';
import ProjectGrid from '@/components/projects/ProjectGrid';

const categoryBackgrounds: Record<string, string> = {
  'All': 'bg-gray-50',
  'UX Design': 'bg-blue-50',
  '3D & Motion': 'bg-purple-50',
  'Coding': 'bg-green-50',
  'Analog Explorations': 'bg-orange-50'
};

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 ${categoryBackgrounds[activeCategory]}`}>
      <div className="container mx-auto px-6 pt-24 pb-12">
        <div className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            Projects
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            A collection of work spanning UX design, 3D motion graphics, coding projects, 
            and analog explorations.
          </p>
        </div>

        <CategoryFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
        />

        <ProjectGrid
          projects={projects}
          activeCategory={activeCategory}
        />
      </div>
    </main>
  );
} 
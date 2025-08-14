'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { projects, categories } from '@/data/projects';
import CategoryFilter from '@/components/projects/CategoryFilter';
import ProjectGrid from '@/components/projects/ProjectGrid';

const categoryBackgrounds: Record<string, string> = {
  'All': 'bg-cg-bg-grey',
  'UX Design': 'bg-cg-ux-bg',
  '3D & Motion': 'bg-cg-motion-bg',
  'Coding': 'bg-cg-code-bg',
  'Analog Explorations': 'bg-cg-analog-bg'
};

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');

  return (
    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className={`min-h-screen transition-colors duration-500 ${categoryBackgrounds[activeCategory]}`}
    >
      <div className="mb-12 flex justify-center items-center">
        <p className="text-lg text-gray-600 max-w-2xl">
          Work in progress...
        </p>
      </div>
    </motion.main>
  );
} 
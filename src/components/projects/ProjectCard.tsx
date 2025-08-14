'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Project } from '@/types';

interface ProjectCardProps {
  project: Project;
  isVisible: boolean;
}

export default function ProjectCard({ project, isVisible }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link href={`/projects/${project.slug}`}>
      <div
        className={`
          relative aspect-square overflow-hidden rounded-lg bg-gray-200 cursor-pointer
          transition-all duration-500 ease-in-out transform
          ${isVisible 
            ? 'opacity-100 scale-100 translate-y-0' 
            : 'opacity-0 scale-95 translate-y-4'
          }
          hover:scale-105 hover:shadow-xl
        `}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Project Image */}
        <div className="w-full h-full relative">
          <Image
            src={project.thumbnailImage}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>

        {/* Hover Overlay */}
        <div
          className={`
            absolute inset-0 bg-black/70 flex flex-col justify-end p-6
            transition-opacity duration-300
            ${isHovered ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <h3 className="text-white text-xl font-bold mb-2">
            {project.title}
          </h3>
          <p className="text-gray-200 text-sm">
            {project.subtitle}
          </p>
          <div className="mt-2 text-xs text-gray-300 uppercase tracking-wide">
            {project.category}
          </div>
        </div>
      </div>
    </Link>
  );
} 
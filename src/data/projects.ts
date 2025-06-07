import { Project } from '@/types';

export const projects: Project[] = [
  {
    id: '1',
    slug: 'sustainable-app-design',
    title: 'EcoTrack',
    subtitle: 'Sustainable Living App',
    category: 'UX Design',
    thumbnailImage: '/images/projects/ecotrack-thumb.jpg',
    images: [
      '/images/projects/ecotrack-1.jpg',
      '/images/projects/ecotrack-2.jpg',
      '/images/projects/ecotrack-3.jpg'
    ],
    description: 'A comprehensive UX design for a sustainable living tracking application that helps users monitor their carbon footprint and adopt eco-friendly habits.',
    details: {
      year: '2024',
      tools: ['Figma', 'Adobe XD', 'Principle', 'After Effects'],
      collaborators: ['Jane Smith', 'Mike Johnson'],
      link: 'https://figma.com/ecotrack-prototype'
    }
  },
  {
    id: '2',
    slug: 'morphing-landscapes',
    title: 'Morphing Landscapes',
    subtitle: '3D Motion Study',
    category: '3D & Motion',
    thumbnailImage: '/images/projects/landscapes-thumb.jpg',
    images: [
      '/images/projects/landscapes-1.jpg',
      '/images/projects/landscapes-2.jpg'
    ],
    description: 'An exploration of organic forms and terrain generation through procedural modeling and dynamic animation sequences.',
    details: {
      year: '2024',
      tools: ['Cinema 4D', 'Octane Render', 'After Effects', 'Houdini'],
      link: 'https://vimeo.com/morphing-landscapes'
    }
  },
  {
    id: '3',
    slug: 'interactive-portfolio',
    title: 'Portfolio Website',
    subtitle: 'Next.js Development',
    category: 'Coding',
    thumbnailImage: '/images/projects/portfolio-thumb.jpg',
    images: [
      '/images/projects/portfolio-1.jpg',
      '/images/projects/portfolio-2.jpg',
      '/images/projects/portfolio-3.jpg'
    ],
    description: 'A responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS featuring smooth animations and modern design patterns.',
    details: {
      year: '2024',
      tools: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion'],
      link: 'https://github.com/username/portfolio'
    }
  },
  {
    id: '4',
    slug: 'typography-experiments',
    title: 'Typography Studies',
    subtitle: 'Analog Letterforms',
    category: 'Analog Explorations',
    thumbnailImage: '/images/projects/typography-thumb.jpg',
    images: [
      '/images/projects/typography-1.jpg',
      '/images/projects/typography-2.jpg',
      '/images/projects/typography-3.jpg',
      '/images/projects/typography-4.jpg'
    ],
    description: 'Hand-drawn typography experiments exploring the relationship between traditional letterforms and contemporary design language.',
    details: {
      year: '2023',
      tools: ['Ink', 'Charcoal', 'Paper', 'Scanner']
    }
  },
  {
    id: '5',
    slug: 'data-visualization',
    title: 'Climate Data Viz',
    subtitle: 'Interactive Dashboard',
    category: 'Coding',
    thumbnailImage: '/images/projects/climate-thumb.jpg',
    images: [
      '/images/projects/climate-1.jpg',
      '/images/projects/climate-2.jpg'
    ],
    description: 'An interactive data visualization dashboard showing climate change trends using D3.js and real-time environmental data.',
    details: {
      year: '2024',
      tools: ['React', 'D3.js', 'Node.js', 'MongoDB'],
      link: 'https://climate-viz-demo.vercel.app'
    }
  }
];

export const categories: string[] = ['All', 'UX Design', '3D & Motion', 'Coding', 'Analog Explorations']; 
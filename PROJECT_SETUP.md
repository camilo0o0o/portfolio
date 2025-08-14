# Portfolio Project Setup

## Overview
This is a Next.js 15.2 portfolio website built with TypeScript and Tailwind CSS v4. The project follows a desktop-first design approach and includes persistent UI elements across all pages.

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with persistent components
│   ├── page.tsx           # Landing page (hero with click-to-proceed)
│   ├── projects/          # Projects section
│   │   ├── page.tsx       # Projects grid with filtering
│   │   └── [slug]/        # Individual project pages
│   │       └── page.tsx   # Dynamic project detail page
│   ├── globals.css        # Global styles
│   └── fonts.ts           # Custom font configurations
├── components/
│   ├── layout/            # Persistent layout components
│   │   ├── Header.tsx     # Logo (top-left, fixed)
│   │   ├── TimeLocation.tsx # Vertical time/location (top-right, fixed)
│   │   └── SpotifyDisplay.tsx # Music player (bottom-left, fixed)
│   └── projects/          # Project-related components
│       ├── CategoryFilter.tsx # Category filtering buttons
│       ├── ProjectCard.tsx    # Individual project cards
│       └── ProjectGrid.tsx    # Grid layout for projects
├── data/
│   └── projects.ts        # Project data and categories
└── types/
    └── index.ts           # TypeScript type definitions
```

## Key Features

### Landing Page
- Full-screen hero with background image
- Text overlay with title and subtitle
- Click anywhere to proceed to projects
- Smooth transition to projects page

### Projects Page
- Category filtering (All, UX Design, 3D & Motion, Coding, Analog Explorations)
- Background color changes based on active category
- Animated project grid with appear/disappear effects
- Hover effects showing project title and subtitle

### Individual Project Pages
- Detailed project information
- Image gallery
- Project metadata (year, tools, collaborators, links)
- Back navigation to projects

### Persistent Elements
- **Header**: Logo in top-left, links to home
- **Time/Location**: Vertical text in top-right showing London time
- **Spotify Display**: Bottom-left music player (display-only, no auth required)

## Data Structure

Projects are defined in `src/data/projects.ts` with the following structure:

```typescript
interface Project {
  id: string;
  slug: string;           // Used for URL: /projects/[slug]
  title: string;
  subtitle: string;
  category: Category;     // 'UX Design' | '3D & Motion' | 'Coding' | 'Analog Explorations'
  thumbnailImage: string; // Path to thumbnail image
  images: string[];       // Array of project images
  description: string;    // Detailed project description
  details: {
    year: string;
    tools: string[];
    collaborators?: string[];
    link?: string;
  };
}
```

## Development Phases

### Phase 1: Foundation ✅
- [x] Basic file structure
- [x] TypeScript types
- [x] Sample project data
- [x] Core pages (landing, projects, individual project)

### Phase 2: Components (Next)
- [ ] Complete styling and animations
- [ ] Project filtering logic
- [ ] Image handling and optimization

### Phase 3: Visual Polish
- [ ] Smooth transitions
- [ ] Hover effects
- [ ] Category-based background changes

### Phase 4: Integrations
- [ ] Real Spotify API integration
- [ ] Image optimization
- [ ] Performance optimization

## Setup Instructions

1. **Dependencies**: Already installed via package.json
2. **Images**: Add project images to `public/images/projects/`
3. **Hero Image**: Add hero background to `public/images/hero-bg.jpg`
4. **Music**: Add album art to `public/images/music/`

## Customization

### Adding New Projects
1. Add project data to `src/data/projects.ts`
2. Add corresponding images to `public/images/projects/`
3. The system automatically generates routes for new projects

### Styling
- Uses Tailwind CSS v4
- Category colors defined in components
- Custom animations via Tailwind classes

### Fonts
- Custom fonts configured in `src/app/fonts.ts`
- Applied globally via root layout

## Technical Notes

- **Next.js App Router**: Uses the new app directory structure
- **Static Generation**: Individual project pages are statically generated
- **Client Components**: Interactive components use 'use client' directive
- **TypeScript**: Full type safety across the application
- **Responsive**: Desktop-first design with mobile considerations

## Next Steps

1. Add actual project images and content
2. Implement real Spotify API integration
3. Add page transitions and animations
4. Optimize for performance and SEO
5. Add error boundaries and loading states 
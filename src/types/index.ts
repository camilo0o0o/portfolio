export type Category = 'UX Design' | '3D & Motion' | 'Coding' | 'Analog Explorations';

export interface ProjectDetails {
  year: string;
  tools: string[];
  collaborators?: string[];
  link?: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: Category;
  thumbnailImage: string;
  images: string[];
  description: string;
  details: ProjectDetails;
}

export interface SpotifyTrack {
  id: string;
  name: string;
  artist: string;
  album: string;
  image: string;
  spotifyUrl: string;
} 
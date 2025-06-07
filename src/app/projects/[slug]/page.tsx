import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { projects } from '@/data/projects';

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white">
      <div className="container mx-auto px-6 pt-24 pb-12">
        <Link 
          href="/projects" 
          className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-8 transition-colors"
        >
          ← Back to Projects
        </Link>

        <div className="mb-12">
          <div className="inline-block px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full mb-4">
            {project.category}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-gray-900">
            {project.title}
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 mb-8">
            {project.subtitle}
          </h2>
          <p className="text-lg text-gray-700 max-w-3xl leading-relaxed">
            {project.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Year
            </h3>
            <p className="text-gray-600">{project.details.year}</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
              Tools
            </h3>
            <p className="text-gray-600">{project.details.tools.join(', ')}</p>
          </div>
          {project.details.collaborators && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                Collaborators
              </h3>
              <p className="text-gray-600">{project.details.collaborators.join(', ')}</p>
            </div>
          )}
          {project.details.link && (
            <div>
              <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">
                Link
              </h3>
              <a 
                href={project.details.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-800 underline"
              >
                View Project
              </a>
            </div>
          )}
        </div>

        <div className="space-y-8">
          {project.images.map((image, index) => (
            <div key={index} className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={image}
                alt={`${project.title} - Image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
              />
            </div>
          ))}
        </div>
      </div>
    </main>
  );
} 
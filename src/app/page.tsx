'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/projects');
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden cursor-pointer bg-black"
      onClick={handleClick}
    >
      {/* Hero Image Background */}
      <div className="absolute inset-0">
        <div className="w-full h-full bg-gradient-to-br from-gray-900 via-gray-800 to-black">
          {/* Placeholder for hero image - you can replace this with an actual image */}
          <div className="absolute inset-0 bg-[url('/images/hero-bg.jpg')] bg-cover bg-center opacity-60" />
        </div>
      </div>

      {/* Text Overlay */}
      <div className="relative z-10 flex flex-col justify-center items-center h-screen text-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 tracking-tight">
          Camilo Giraldo
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl">
          Designer & Developer exploring the intersection of digital and analog creativity
        </p>
        <div className="text-sm text-gray-400 uppercase tracking-wider animate-pulse">
          Click anywhere to explore
        </div>
      </div>

      {/* Subtle gradient overlay for better text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
    </main>
  );
}

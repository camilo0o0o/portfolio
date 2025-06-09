'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { mileins } from './fonts';

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
      {/* Background */}
      <div className="absolute inset-0 bg-cg-bg-grey"></div>

      {/* Centered Hero Image */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <div className="h-2/3 w-full relative flex justify-center items-center">
          <Image
            src="/images/projects/yo_parque.png"
            alt="Hero image"
            fill
            className="object-contain"
            priority
          />
        </div>
      </div>
      
      {/* Text Overlay - Centered on screen, on top of image */}
      <div className="absolute inset-0 flex justify-center items-center z-20">
        <h1 className={`text-8xl font-bold text-center text-cg-ochre px-56 leading-tight ${mileins.className}`}>
          london based colombian designer currently working as digital product designer with a side of frontend 
          interested in the intersection of the digital and analog mediums
        </h1>
      </div>
    </main>
  );
}

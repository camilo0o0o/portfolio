'use client';

import { useRouter } from 'next/navigation';
import { mileins } from './fonts';
import CustomCursor from '@/components/CustomCursor';
import HeroImage from '@/components/HeroImage';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function Home() {
  const router = useRouter();
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleFadeStart = () => {
    setIsFadingOut(true);
  };

  const handleFadeComplete = () => {
    router.push('/projects');
  };

  const handleClick = () => {
    handleFadeStart();
    setTimeout(handleFadeComplete, 1000);
  };

  return (
    <main 
      className="min-h-screen relative overflow-hidden cursor-none bg-black"
      onClick={handleClick}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-cg-bg-grey"></div>

      {/* Click Overlay */}
      <div className="absolute inset-0 z-30" />

      {/* Centered Hero Image */}
      <div className="absolute inset-0 flex justify-center items-center z-10">
        <HeroImage />
      </div>
      
      {/* Text Overlay - Centered on screen, on top of image */}
      <motion.div 
        className="absolute inset-0 flex justify-center items-center z-20"
        animate={{
          opacity: isFadingOut ? 0 : 1
        }}
        transition={{
          duration: 1,
          ease: "easeInOut"
        }}
      >
        <h1 className={`text-8xl font-bold text-center text-cg-ochre px-56 leading-tight ${mileins.className}`}>
          london based colombian designer currently working as digital product designer with a side of frontend 
          interested in the intersection of the digital and analog mediums
        </h1>
      </motion.div>

      {/* Custom Cursor */}
      <CustomCursor />
    </main>
  );
}

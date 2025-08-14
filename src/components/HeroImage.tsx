"use client"

import { motion, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface HeroImageProps {
  onFadeComplete: () => void;
  onFadeStart: () => void;
}

export default function HeroImage({ onFadeComplete, onFadeStart }: HeroImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const [hasMouseMoved, setHasMouseMoved] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const springConfig = { damping: 10, stiffness: 100, restDelta: 0.005 };
  const springX = useSpring(x, springConfig);
  const springY = useSpring(y, springConfig);

  const resetPosition = () => {
    x.set(0);
    y.set(0);
    setHasMouseMoved(false);
  };

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      if (!hasMouseMoved) {
        setHasMouseMoved(true);
      }
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      const windowCenterX = window.innerWidth / 2;
      const windowCenterY = window.innerHeight / 2;
      
      x.set(clientX - windowCenterX);
      y.set(clientY - windowCenterY);

      timeoutRef.current = setTimeout(resetPosition, 3000);
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [hasMouseMoved]);

  return (
    <motion.div
      ref={ref}
      className="relative h-2/3 w-full flex justify-center items-center"
      style={{
        x: springX,
        y: springY,
      }}
      animate={{
        scale: hasMouseMoved ? 0.4 : 1,
        opacity: isFadingOut ? 0 : 1
      }}
      transition={{ 
        scale: { 
          duration: 0.8,
          ease: "easeInOut"
        },
        opacity: {
          duration: 0.5,
          ease: "easeInOut"
        }
      }}
    >
      <Image
        src="/images/projects/yo_parque.png"
        alt="Hero image"
        fill
        className="object-contain"
        priority
      />
    </motion.div>
  );
} 
import React from 'react';
import { mileins } from '@/app/fonts';

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  topRightText: string;
  bottomLeftText: string;
  hoverColor: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, imageAlt, topRightText, bottomLeftText, hoverColor }) => {
  return (
    <div className="relative bg-white p-8 group">
      {/* Top right text */}
      <div className={`${mileins.className} absolute top-1 right-8 font-regular text-dark-grey text-4xl`}>
        {topRightText}
      </div>
      
      {/* Image container */}
      <div className="w-2xs h-auto relative">
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover"
        />
        <div className={`absolute inset-0 bg-${hoverColor} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
      </div>

      {/* Bottom left text */}
      <div className={`${mileins.className} absolute bottom-0 left-8 font-bold text-dark-grey text-2xl`}>
        {bottomLeftText}
      </div>
    </div>
  );
};

export default Card; 
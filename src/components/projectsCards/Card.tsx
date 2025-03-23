import React from 'react';

interface CardProps {
  imageSrc: string;
  imageAlt: string;
  width: string;
}

const Card: React.FC<CardProps> = ({ imageSrc, imageAlt, width }) => {
  return (
    <div className="relative bg-black p-0.5">
      {/* Image container */}
      <div className={`${width} h-auto relative`}>
        <img 
          src={imageSrc} 
          alt={imageAlt} 
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
};

export default Card; 
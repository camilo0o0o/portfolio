'use client'

import HalftoneImage from '@/components/HalftoneImage/HalftoneImage'

interface ImageData {
  src: string
  alt: string
  width?: number
  height?: number
}

interface HalftoneGalleryProps {
  images: ImageData[]
  className?: string
  imageClassName?: string
  layout?: 'center' | 'grid'
  columns?: number
  gap?: string
}

export default function HalftoneGallery({ 
  images, 
  className = '',
  imageClassName = '',
  layout = 'center',
  columns = 3,
  gap = 'gap-8'
}: HalftoneGalleryProps) {
  
  if (layout === 'center') {
    // For single image centered layout
    const firstImage = images[0]
    if (!firstImage) return null
    
    return (
      <div className={`w-full h-screen flex items-center justify-center ${className}`}>
        <HalftoneImage
          src={firstImage.src}
          alt={firstImage.alt}
          width={firstImage.width}
          height={firstImage.height}
          className={imageClassName}
        />
      </div>
    )
  }
  
  // Grid layout for multiple images
  const gridCols = {
    1: 'grid-cols-1',
    2: 'grid-cols-2',
    3: 'grid-cols-3',
    4: 'grid-cols-4',
    5: 'grid-cols-5',
    6: 'grid-cols-6'
  }[columns] || 'grid-cols-3'
  
  return (
    <div className={`w-full min-h-screen flex items-center justify-center p-8 ${className}`}>
      <div className={`grid ${gridCols} ${gap} place-items-center`}>
        {images.map((image, index) => (
          <HalftoneImage
            key={`${image.src}-${index}`}
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            className={imageClassName}
          />
        ))}
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState, useMemo } from 'react'
import { useImageLoader } from '@/hooks/useImageLoader'
import { useCanvasRenderer } from '@/hooks/useCanvasRenderer'

interface HalftoneConfig {
  step: number
  padding: number
  gridOpacity: number
  backgroundColor: string
  circleColor: string
}

interface HalftoneImageProps {
  src: string
  alt: string
  width?: number
  height?: number
  className?: string
  config?: Partial<HalftoneConfig>
  maintainAspectRatio?: boolean
}

const defaultConfig: HalftoneConfig = {
  step: 6,
  padding: 10,
  gridOpacity: 0.2,
  backgroundColor: '#333333',
  circleColor: '#f7f7f7'
}

export default function HalftoneImage({ 
  src, 
  alt, 
  width = 250, 
  height, 
  className = '',
  config: userConfig = {},
  maintainAspectRatio = true
}: HalftoneImageProps) {
  const [isVisible, setIsVisible] = useState(false)
  
  const config = useMemo(() => ({ ...defaultConfig, ...userConfig }), [userConfig])
  
  // Custom hooks for separated concerns
  const { 
    imageRef, 
    isLoaded, 
    calculatedHeight, 
    originalImageData, 
    handleImageLoad 
  } = useImageLoader({ width, height, maintainAspectRatio })
  
  const { 
    canvasRef, 
    drawHalftone, 
    drawOriginal,
    animateToOriginal,
    animateToHalftone
  } = useCanvasRenderer({ 
    width, 
    height: calculatedHeight, 
    config, 
    originalImageData, 
    isLoaded 
  })

  // Mouse interaction handlers with smooth transitions
  const handleMouseEnter = () => {
    if (originalImageData) {
      animateToOriginal()
    }
  }

  const handleMouseLeave = () => {
    if (originalImageData) {
      animateToHalftone()
    }
  }

  // Handle image loading and initial setup
  useEffect(() => {
    const image = imageRef.current
    if (image && image.complete && image.naturalWidth > 0) {
      handleImageLoad()
    }
  }, [handleImageLoad])

  // Draw halftone effect when image data becomes available and trigger fade-in
  useEffect(() => {
    if (originalImageData && isLoaded) {
      drawHalftone()
      
      // Trigger fade-in after a small delay to ensure halftone is rendered
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 250)
      
      return () => clearTimeout(timer)
    }
  }, [originalImageData, isLoaded, drawHalftone])

  return (
    <div className={`relative ${className}`}>
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        onLoad={handleImageLoad}
        className="hidden"
        crossOrigin="anonymous"
      />
      <canvas
        ref={canvasRef}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`halftone-canvas transition-opacity duration-4000 ease-out ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ 
          width: `${width}px`, 
          height: `${calculatedHeight}px`,
          display: isLoaded ? 'block' : 'none'
        }}
      />
    </div>
  )
}
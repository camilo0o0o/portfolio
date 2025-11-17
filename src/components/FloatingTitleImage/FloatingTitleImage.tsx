'use client'

import { useMemo, useState, useRef, useEffect } from 'react'
import { mileins } from '@/app/fonts'

type Zone = 
  | 'top-left' 
  | 'top-center' 
  | 'top-right' 
  | 'left' 
  | 'right' 
  | 'bottom-left' 
  | 'bottom-center' 
  | 'bottom-right'

interface FloatingTitleImageProps {
  title: string
  imageComponent: React.ReactNode
  imageWidth: number
  imageHeight: number
  className?: string
}

const ZONES: Zone[] = [
  'top-left',
  'top-center',
  'top-right',
  'left',
  'right',
  'bottom-left',
  'bottom-center',
  'bottom-right'
]

interface Position {
  top?: number | string
  left?: number | string
  right?: number | string
  bottom?: number | string
}

function calculatePosition(
  zone: Zone,
  imageWidth: number,
  imageHeight: number,
  offset: number,
  titleWidth: number = 0,
  titleHeight: number = 0
): Position {
  switch (zone) {
    case 'top-left':
      return {
        top: offset,
        left: offset
      }
    case 'top-center':
      return {
        top: offset,
        left: `calc(50% - ${titleWidth / 2}px)`
      }
    case 'top-right':
      return {
        top: offset,
        right: offset
      }
    case 'left':
      return {
        top: `calc(50% - ${titleHeight / 2}px)`,
        left: offset
      }
    case 'right':
      return {
        top: `calc(50% - ${titleHeight / 2}px)`,
        right: offset
      }
    case 'bottom-left':
      return {
        bottom: offset,
        left: offset
      }
    case 'bottom-center':
      return {
        bottom: offset,
        left: `calc(50% - ${titleWidth / 2}px)`
      }
    case 'bottom-right':
      return {
        bottom: offset,
        right: offset
      }
    default:
      return { top: 0, left: 0 }
  }
}

export default function FloatingTitleImage({
  title,
  imageComponent,
  imageWidth,
  imageHeight,
  className = ''
}: FloatingTitleImageProps) {
  const [isHovered, setIsHovered] = useState(false)
  const titleRef = useRef<HTMLDivElement>(null)
  const [titleDimensions, setTitleDimensions] = useState({ width: 0, height: 0 })
  
  // Initialize with default values to avoid hydration mismatch
  // Will be set to random values on client-side only
  const [selectedZone, setSelectedZone] = useState<Zone>('top-left')
  const [offset, setOffset] = useState(0)

  // Random zone selection and offset on client-side mount only (deterministic per page load)
  useEffect(() => {
    const zone = ZONES[Math.floor(Math.random() * ZONES.length)]

    const minOffset = -20
    const maxOffset = -70
    const randomOffset = Math.random() * (maxOffset - minOffset) + minOffset
    setSelectedZone(zone)
    setOffset(randomOffset)
  }, [])

  // Measure title dimensions after mount
  useEffect(() => {
    if (titleRef.current) {
      const rect = titleRef.current.getBoundingClientRect()
      setTitleDimensions({ width: rect.width, height: rect.height })
    }
  }, [title])

  // Calculate position based on zone and dimensions
  const position = useMemo(() => {
    return calculatePosition(
      selectedZone,
      imageWidth,
      imageHeight,
      offset,
      titleDimensions.width,
      titleDimensions.height
    )
  }, [selectedZone, imageWidth, imageHeight, offset, titleDimensions.width, titleDimensions.height])

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
  }

  return (
    <div
      className={`relative ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {imageComponent}
      <div
        ref={titleRef}
        className={`${mileins.className} text-[24px] text-dark-grey transition-opacity duration-4000 ease-out absolute whitespace-nowrap ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          ...position
        }}
      >
        {title}
      </div>
    </div>
  )
}


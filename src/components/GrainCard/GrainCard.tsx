'use client'

import { ReactNode, CSSProperties } from 'react'
import styles from './GrainCard.module.css'

interface GrainCardProps {
  children: ReactNode;
  opacity?: number;          // Default: 0.12 (range 0-1)
  grainSize?: number;        // Default: 182 (in pixels)
  backgroundColor?: string;  // Default: 'rgb(15 23 42)'
  className?: string;        // Optional additional classes
  style?: CSSProperties;     // Optional inline styles
}

export default function GrainCard({
  children,
  opacity = 0.5,
  grainSize = 600,
  backgroundColor = 'rgb(15 23 42)',
  className = '',
  style = {}
}: GrainCardProps) {
  // Clamp opacity between 0 and 1
  const clampedOpacity = Math.max(0, Math.min(1, opacity))

  // Merge custom styles with CSS variables
  const containerStyle: CSSProperties = {
    '--grain-opacity': clampedOpacity.toString(),
    '--grain-size': `${grainSize}px`,
    '--bg-color': backgroundColor,
    ...style
  } as CSSProperties

  return (
    <div 
      className={`${styles.grainContainer} ${className}`}
      style={containerStyle}
    >
      <div className={styles.content}>
        {children}
      </div>
    </div>
  )
}

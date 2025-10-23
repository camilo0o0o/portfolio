'use client'

import { ReactNode } from 'react'

interface LayoutContainerProps {
  children: ReactNode
  category?: string
  showBorderElements?: boolean
  className?: string
}

export default function LayoutContainer({ 
  children, 
  category = 'default',
  showBorderElements = true,
  className = '' 
}: LayoutContainerProps) {
  return (
    <div className={`min-h-screen w-full relative ${className}`}>
      {/* Main content area with 40px padding from all sides */}
      <div className="absolute inset-0 p-10">
        {/* Content container */}
        <div className="w-full h-full bg-background-grey relative">
          {/* Top-left paragraph area */}
          <div className="absolute top-6 left-6 z-10">
            {/* This will be where paragraph text can be added */}
          </div>
          
          {/* Main content (centered) */}
          <div className="w-full h-full flex items-center justify-center">
            {children}
          </div>
        </div>
      </div>

    </div>
  )
}

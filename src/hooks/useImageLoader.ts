'use client'

import { useCallback, useRef, useState } from 'react'

interface UseImageLoaderProps {
  width: number
  height?: number
  maintainAspectRatio: boolean
}

interface UseImageLoaderReturn {
  imageRef: React.RefObject<HTMLImageElement | null>
  isLoaded: boolean
  calculatedHeight: number
  originalImageData: ImageData | null
  handleImageLoad: () => void
}

export function useImageLoader({ 
  width, 
  height, 
  maintainAspectRatio 
}: UseImageLoaderProps): UseImageLoaderReturn {
  const imageRef = useRef<HTMLImageElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [calculatedHeight, setCalculatedHeight] = useState(height || width)
  const [originalImageData, setOriginalImageData] = useState<ImageData | null>(null)

  const handleImageLoad = useCallback(() => {
    const image = imageRef.current
    if (!image || image.naturalWidth === 0) return

    // Calculate height based on aspect ratio if not provided
    let finalHeight = height
    if (maintainAspectRatio && !height) {
      const aspectRatio = image.naturalHeight / image.naturalWidth
      finalHeight = Math.round(width * aspectRatio)
    } else if (height) {
      finalHeight = height
    } else {
      finalHeight = width // fallback to square if no height and no aspect ratio
    }

    setCalculatedHeight(finalHeight)

    // Create a temporary canvas to extract image data
    const tempCanvas = document.createElement('canvas')
    const tempCtx = tempCanvas.getContext('2d')
    if (!tempCtx) return

    tempCanvas.width = width
    tempCanvas.height = finalHeight

    // Draw and store original image data
    tempCtx.drawImage(image, 0, 0, width, finalHeight)
    const imageData = tempCtx.getImageData(0, 0, width, finalHeight)
    setOriginalImageData(imageData)
    setIsLoaded(true)
  }, [width, height, maintainAspectRatio])

  return {
    imageRef,
    isLoaded,
    calculatedHeight,
    originalImageData,
    handleImageLoad
  }
}

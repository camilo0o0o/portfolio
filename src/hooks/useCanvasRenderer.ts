'use client'

import { useCallback, useRef, useEffect } from 'react'

interface HalftoneConfig {
  step: number
  padding: number
  gridOpacity: number
  backgroundColor: string
  circleColor: string
}

interface UseCanvasRendererProps {
  width: number
  height: number
  config: HalftoneConfig
  originalImageData: ImageData | null
  isLoaded: boolean
}

interface UseCanvasRendererReturn {
  canvasRef: React.RefObject<HTMLCanvasElement | null>
  drawHalftone: () => void
  drawOriginal: () => void
  animateToOriginal: () => void
  animateToHalftone: () => void
}

// Utility function to calculate brightness
const calculateBrightness = (r: number, g: number, b: number): number => {
  return (0.299 * r + 0.587 * g + 0.114 * b) / 255
}

// Utility function to draw a circle
const drawCircle = (
  ctx: CanvasRenderingContext2D, 
  x: number, 
  y: number, 
  diameter: number, 
  padding: number
) => {
  ctx.beginPath()
  ctx.arc(
    x - padding,
    y - padding,
    diameter / 2,
    0,
    Math.PI * 2
  )
  ctx.fill()
}

export function useCanvasRenderer({ 
  width, 
  height, 
  config, 
  originalImageData, 
  isLoaded 
}: UseCanvasRendererProps): UseCanvasRendererReturn {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const animationRef = useRef<number | null>(null)
  const transitionProgress = useRef<number>(0) // 0 = halftone, 1 = original

  // Cache canvas context
  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas && !ctxRef.current) {
      ctxRef.current = canvas.getContext('2d')
    }
  }, [])

  const drawHalftone = useCallback(() => {
    const canvas = canvasRef.current
    const ctx = ctxRef.current
    if (!canvas || !ctx || !originalImageData) return

    // Clear canvas with background color
    ctx.fillStyle = config.backgroundColor
    ctx.fillRect(0, 0, width, height)
    
    // Set circle color
    ctx.fillStyle = config.circleColor
    const data = originalImageData.data

    // Draw halftone circles
    for (let y = 0; y < height + config.padding * 2; y += config.step) {
      for (let x = 0; x < width + config.padding * 2; x += config.step) {
        // Get pixel position (with padding compensation)
        const pixelX = Math.min(Math.max(x - config.padding, 0), width - 1)
        const pixelY = Math.min(Math.max(y - config.padding, 0), height - 1)
        const i = (pixelY * width + pixelX) * 4
        
        // Calculate circle diameter based on brightness
        const brightness = calculateBrightness(data[i], data[i + 1], data[i + 2])
        const diameter = brightness * config.step
        
        drawCircle(ctx, x, y, diameter, config.padding)
      }
    }
  }, [width, height, config, originalImageData])

  const drawOriginal = useCallback(() => {
    const ctx = ctxRef.current
    if (ctx && originalImageData) {
      ctx.putImageData(originalImageData, 0, 0)
    }
  }, [originalImageData])

  // Smooth transition between halftone and original
  const drawTransition = useCallback((progress: number) => {
    const ctx = ctxRef.current
    if (!ctx || !originalImageData) return

    // Create temporary canvases for each state
    const tempHalftone = document.createElement('canvas')
    const tempOriginal = document.createElement('canvas')
    tempHalftone.width = tempOriginal.width = width
    tempHalftone.height = tempOriginal.height = height

    const halftoneCtx = tempHalftone.getContext('2d')
    const originalCtx = tempOriginal.getContext('2d')
    
    if (!halftoneCtx || !originalCtx) return

    // Draw halftone on temp canvas
    halftoneCtx.fillStyle = config.backgroundColor
    halftoneCtx.fillRect(0, 0, width, height)
    halftoneCtx.fillStyle = config.circleColor
    const data = originalImageData.data

    for (let y = 0; y < height + config.padding * 2; y += config.step) {
      for (let x = 0; x < width + config.padding * 2; x += config.step) {
        const pixelX = Math.min(Math.max(x - config.padding, 0), width - 1)
        const pixelY = Math.min(Math.max(y - config.padding, 0), height - 1)
        const i = (pixelY * width + pixelX) * 4
        
        const brightness = calculateBrightness(data[i], data[i + 1], data[i + 2])
        const diameter = brightness * config.step
        
        drawCircle(halftoneCtx, x, y, diameter, config.padding)
      }
    }

    // Draw original on temp canvas
    originalCtx.putImageData(originalImageData, 0, 0)

    // Clear main canvas and blend the two states
    ctx.clearRect(0, 0, width, height)
    
    // Draw halftone with decreasing opacity
    ctx.globalAlpha = 1 - progress
    ctx.drawImage(tempHalftone, 0, 0)
    
    // Draw original with increasing opacity
    ctx.globalAlpha = progress
    ctx.drawImage(tempOriginal, 0, 0)
    
    // Reset alpha
    ctx.globalAlpha = 1
  }, [width, height, config, originalImageData])

  const animateTransition = useCallback((targetProgress: number, duration: number = 600) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current)
    }

    const startProgress = transitionProgress.current
    const startTime = performance.now()

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / duration, 1)
      
      // Ease-in-out function
      const easeInOut = progress < 0.5 
        ? 2 * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2

      const currentValue = startProgress + (targetProgress - startProgress) * easeInOut
      transitionProgress.current = currentValue
      
      drawTransition(currentValue)

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate)
      } else {
        animationRef.current = null
      }
    }

    animationRef.current = requestAnimationFrame(animate)
  }, [drawTransition])

  // Initialize canvas dimensions
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.width = width
    canvas.height = height

    if (!isLoaded) {
      const ctx = ctxRef.current
      if (ctx) {
        ctx.clearRect(0, 0, width, height)
      }
    }
  }, [width, height, isLoaded])

  // Animation helper functions
  const animateToOriginal = useCallback(() => {
    animateTransition(1, 300) // 600ms duration to original
  }, [animateTransition])

  const animateToHalftone = useCallback(() => {
    animateTransition(0, 300) // 600ms duration to halftone
  }, [animateTransition])

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return {
    canvasRef,
    drawHalftone,
    drawOriginal,
    animateToOriginal,
    animateToHalftone
  }
}

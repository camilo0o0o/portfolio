'use client'

import { splineSansMono } from '@/app/fonts'

interface ChatButtonProps {
  className?: string
  onClick?: () => void
}

export default function ChatButton({ className = '', onClick }: ChatButtonProps) {
  const handleClick = () => {
    if (onClick) {
      onClick()
    } else {
      // Default behavior - could open a contact form or redirect to email
      window.location.href = 'mailto:camilogiraldo31@gmail.com'
    }
  }

  return (
    <button
      onClick={handleClick}
      className={`${splineSansMono.className} text-xs font-light text-default-grey hover:opacity-80 transition-opacity cursor-pointer ${className}`}
    >
      LET'S CHAT
    </button>
  )
}

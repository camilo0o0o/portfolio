'use client'

import { splineSansMono } from '@/app/fonts'

interface ChatButtonProps {
  onClick?: () => void
}

export default function ChatButton({ onClick }: ChatButtonProps) {
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
      className={`${splineSansMono.className} text-sm font-light text-dark-grey hover:opacity-80 transition-opacity cursor-pointer underline`}
    >
      Let&apos;s chat
    </button>
  )
}

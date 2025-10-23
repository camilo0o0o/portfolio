'use client'

import { mileins } from '@/app/fonts'

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
      className={`${mileins.className} text-lg font-bold text-dark-grey hover:opacity-80 transition-opacity cursor-pointer`}
    >
      LET'S CHAT
    </button>
  )
}

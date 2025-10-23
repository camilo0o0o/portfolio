'use client'
import { useState, useEffect } from 'react'
import { mileins } from '@/app/fonts'

// Create formatter once, outside the component
const timeFormatter = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
})

export default function Timezone() {
    const [time, setTime] = useState<string>('')

    useEffect(() => {
        const updateTime = () => {
            setTime(timeFormatter.format(new Date()))
        }

        // Update time immediately
        updateTime()

        // Update time every second
        const interval = setInterval(updateTime, 1000)

        // Cleanup interval on unmount
        return () => clearInterval(interval)
    }, [])

    return (
        <div 
            className={`text-3xl font-bold flex items-center space-x-2 ${mileins.className}`}
            style={{ color: 'var(--color-dark-grey)' }}
        >
            <div className="tracking-wider">
                {time}
            </div>
            <div className="tracking-wider text-2xl font-bold">
                LONDON, UK
            </div>
        </div>
    )
}

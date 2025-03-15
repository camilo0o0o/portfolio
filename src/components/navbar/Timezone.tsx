'use client'
import { useState, useEffect } from 'react'
import { splineSansMono } from '@/app/fonts'

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
        <div className={`${splineSansMono.className} text-right w-36 font-normal text-[#959595] text-xs`}>
            <span>{time}</span>
            <br />
            <span>LONDON, UK</span>
        </div>
    )
}
'use client';

import { useState, useEffect } from 'react';
import { mileins } from '../../app/fonts';

export default function TimeLocation() {
  const [time, setTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const londonTime = new Date().toLocaleTimeString('en-GB', {
        timeZone: 'Europe/London',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(londonTime);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-27 right-5 z-50">
      <div 
        className={`text-3xl text-cg-dark-grey font-bold flex items-center space-x-2 ${mileins.className}`}
        style={{
          transform: 'rotate(-90deg) translateX(50%)',
          transformOrigin: 'right center'
        }}
      >
        <div className="tracking-wider">
          {time}
        </div>
        <div className="tracking-wider text-2xl font-bold">
          LONDON, UK
        </div>
      </div>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';

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
    <div className="fixed top-6 right-6 z-50">
      <div 
        className="text-sm font-mono text-gray-700 space-y-4"
        style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
      >
        <div className="tracking-wider">
          {time}
        </div>
        <div className="tracking-wider text-xs">
          LONDON
        </div>
      </div>
    </div>
  );
} 
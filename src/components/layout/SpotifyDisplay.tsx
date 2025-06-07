'use client';

import { useState, useEffect } from 'react';
import { SpotifyTrack } from '@/types';

// Sample playlist data - in a real implementation, you'd fetch this from Spotify API
const samplePlaylist: SpotifyTrack[] = [
  {
    id: '1',
    name: 'Midnight City',
    artist: 'M83',
    album: 'Hurry Up, We\'re Dreaming',
    image: '/images/music/midnight-city.jpg',
    spotifyUrl: 'https://open.spotify.com/track/midnight-city'
  },
  {
    id: '2',
    name: 'Breathe Me',
    artist: 'Sia',
    album: '1000 Forms of Fear',
    image: '/images/music/breathe-me.jpg',
    spotifyUrl: 'https://open.spotify.com/track/breathe-me'
  },
  {
    id: '3',
    name: 'The Less I Know The Better',
    artist: 'Tame Impala',
    album: 'Currents',
    image: '/images/music/tame-impala.jpg',
    spotifyUrl: 'https://open.spotify.com/track/less-i-know'
  }
];

export default function SpotifyDisplay() {
  const [currentTrack, setCurrentTrack] = useState<SpotifyTrack | null>(null);

  useEffect(() => {
    // Select a random track from the playlist
    const randomTrack = samplePlaylist[Math.floor(Math.random() * samplePlaylist.length)];
    setCurrentTrack(randomTrack);
  }, []);

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50">
      <a
        href={currentTrack.spotifyUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center space-x-3 bg-black/80 backdrop-blur-sm rounded-lg p-3 hover:bg-black/90 transition-all duration-300 group"
      >
        <div className="w-12 h-12 bg-gray-300 rounded-md overflow-hidden flex-shrink-0">
          {/* Placeholder for album art - you can add actual images later */}
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <span className="text-white text-xs">♪</span>
          </div>
        </div>
        <div className="text-white min-w-0">
          <div className="text-sm font-medium truncate group-hover:text-green-400 transition-colors">
            {currentTrack.name}
          </div>
          <div className="text-xs text-gray-300 truncate">
            {currentTrack.artist}
          </div>
        </div>
        <div className="text-green-400 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
          </svg>
        </div>
      </a>
    </div>
  );
} 
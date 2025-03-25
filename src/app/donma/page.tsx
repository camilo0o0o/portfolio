"use client";

import { useEffect, useRef, useState } from 'react';
import Matter from 'matter-js';
import { mileins } from '@/app/fonts';

const prideColors = [
  '#FF0018', // Red
  '#FFA52C', // Orange
  '#FFFF41', // Yellow
  '#008018', // Green
  '#0000F9', // Blue
  '#86007D'  // Purple
];

const emojis = [
  '🎂', // birthday cake
  '🎈', // balloon
  '🎉', // party popper
  '🧑🏻‍🦱', // confetti
  '🎁', // gift
  '👶', // baby
  '🍼', // baby bottle
  '🐴', // heart with ribbon
  '🐕', // sparkles
  '💪🏼', // glowing star
];

export default function Donma() {
  const containerRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const mousePositionRef = useRef({ x: 0, y: 0 });
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    // Set initial cursor position to center of screen
    setCursorPos({ 
      x: window.innerWidth / 2, 
      y: window.innerHeight / 2 
    });
  }, []);
  
  useEffect(() => {
    if (!containerRef.current) return;

    // Create engine
    const engine = Matter.Engine.create();
    engineRef.current = engine;
    
    // Get container dimensions
    const container = containerRef.current;
    const cw = container.clientWidth;
    const ch = container.clientHeight;
    
    // Set initial mouse position to center
    mousePositionRef.current = { x: cw / 2, y: ch / 2 };
    setCursorPos({ x: cw / 2, y: ch / 2 });
    
    const render = Matter.Render.create({
      element: container,
      engine: engine,
      options: {
        width: cw,
        height: ch,
        wireframes: false,
        background: 'transparent'
      }
    });
    
    // Create a canvas element for emoji rendering
    const emojiCanvas = document.createElement('canvas');
    const emojiCtx = emojiCanvas.getContext('2d');
    emojiCanvas.width = 100;  // Size for the emoji texture
    emojiCanvas.height = 100;
    
    // Function to create emoji texture
    const createEmojiTexture = (emoji: string, color: string) => {
      if (!emojiCtx) return '';
      
      // Clear the canvas
      emojiCtx.clearRect(0, 0, 100, 100);
      
      // Draw the colored circle
      emojiCtx.beginPath();
      emojiCtx.arc(50, 50, 45, 0, Math.PI * 2);
      emojiCtx.fillStyle = color;
      emojiCtx.fill();
      
      // Draw the emoji
      emojiCtx.font = '40px Arial';
      emojiCtx.textAlign = 'center';
      emojiCtx.textBaseline = 'middle';
      emojiCtx.fillText(emoji, 50, 50);
      
      return emojiCanvas.toDataURL();
    };
    
    // Add walls
    Matter.World.add(engine.world, [
      Matter.Bodies.rectangle(cw / 2, -10, cw, 20, { 
        isStatic: true,
        render: { fillStyle: '#f7f7f7' }
      }),
      Matter.Bodies.rectangle(-10, ch / 2, 20, ch, { 
        isStatic: true,
        render: { fillStyle: '#f7f7f7' }
      }),
      Matter.Bodies.rectangle(cw / 2, ch + 10, cw, 20, { 
        isStatic: true,
        render: { fillStyle: '#f7f7f7' }
      }),
      Matter.Bodies.rectangle(cw + 10, ch / 2, 20, ch, { 
        isStatic: true,
        render: { fillStyle: '#f7f7f7' }
      })
    ]);

    // Track mouse position
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      mousePositionRef.current = { x, y };
      setCursorPos({ x, y });
    };
    
    container.addEventListener('mousemove', handleMouseMove);
    
    // Function to create a ball at mouse position
    const createBall = () => {
      // Check if we've reached the limit
      if (engine.world.bodies.length - 4 >= 200) { // -4 for the walls
        const oldestBall = engine.world.bodies[4]; // Skip the 4 walls
        Matter.World.remove(engine.world, oldestBall);
      }
      
      const randomColor = prideColors[Math.floor(Math.random() * prideColors.length)];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      const emojiTexture = createEmojiTexture(randomEmoji, randomColor);
      
      const ball = Matter.Bodies.circle(
        mousePositionRef.current.x,
        mousePositionRef.current.y,
        50,
        {
          mass: 10,
          friction: 0.005,
          render: {
            fillStyle: 'transparent',
            sprite: {
              texture: emojiTexture,
              xScale: 1,
              yScale: 1
            }
          }
        }
      );
      
      Matter.World.add(engine.world, [ball]);
    };
    
    // Start the engine and renderer
    Matter.Runner.run(Matter.Runner.create(), engine);
    Matter.Render.run(render);
    
    // Set interval to create balls every second
    const intervalId = setInterval(createBall, 250);
    
    // Cleanup function
    return () => {
      clearInterval(intervalId);
      container.removeEventListener('mousemove', handleMouseMove);
      Matter.Render.stop(render);
      Matter.Engine.clear(engine);
      engineRef.current = null;
      if (render.canvas) {
        render.canvas.remove();
      }
    };
  }, []); // Empty dependency array as we want this to run once
  
  return (
    <div className="w-full h-screen overflow-hidden bg-white relative">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <img 
          src="/images/projects/donma.png" 
          alt="Donma Background" 
          className="max-w-[400px] w-full h-auto object-contain"
        />
        <h1 className={`${mileins.className} absolute text-9xl font-bold text-pink-400 text-center max-w-[1200px]`}>
        FELIZ PUMPLEANOS AL SOON TO BE FATHER DEL GRUPO
        </h1>
      </div>
      <div 
        ref={containerRef} 
        className="w-full h-full cursor-none relative z-10" 
        style={{ cursor: 'none' }}
      >
        <div 
          className="fixed w-16 h-auto pointer-events-none flex items-center justify-center text-2xl"
          style={{ 
            left: cursorPos.x - 16, 
            top: cursorPos.y - 16,
            userSelect: 'none'
          }}
        >
          <img src="/images/projects/cursor.png" alt="Donma" className="w-full h-full" />
        </div>
      </div>
    </div>
  );
}
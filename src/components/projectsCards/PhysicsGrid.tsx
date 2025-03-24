"use client"

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

interface Project {
  id: string;
  title: string;
  image: string;
  url: string;
  width: number;
  height: number;
}

const projects: Project[] = [
  {
    id: 'iceland',
    title: 'Iceland',
    image: '/images/projects/iceland.jpeg',
    url: 'https://example.com/iceland',
    width: 100,
    height: 100
  },
  {
    id: 'mdt',
    title: 'MDT',
    image: '/images/projects/mdt.jpeg',
    url: 'https://example.com/mdt',
    width: 100,
    height: 100
  },
  {
    id: 'mote',
    title: 'Mote',
    image: '/images/projects/mote.jpeg',
    url: 'https://example.com/mote',
    width: 100,
    height: 100
  },
  {
    id: 'polaroid',
    title: 'Polaroid',
    image: '/images/projects/polaroid.jpeg',
    url: 'https://example.com/polaroid',
    width: 100,
    height: 100
  },
  {
    id: 'roca',
    title: 'Roca',
    image: '/images/projects/roca.jpeg',
    url: 'https://example.com/roca',
    width: 100,
    height: 100
  },
  {
    id: 'selfie',
    title: 'Selfie',
    image: '/images/projects/selfie.jpeg',
    url: 'https://example.com/selfie',
    width: 100,
    height: 100
  }
];

const PhysicsGrid = () => {
  // Create refs for the canvas container and engine
  const sceneRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<Matter.Engine | null>(null);
  const renderRef = useRef<Matter.Render | null>(null);
  
  useEffect(() => {
    if (!sceneRef.current) return;
    
    // Destructure Matter.js modules
    const { 
      Engine, 
      Render, 
      World, 
      Bodies, 
      Mouse, 
      MouseConstraint, 
      Events,
      Runner
    } = Matter;
    
    // Create engine
    const engine = Engine.create();
    engineRef.current = engine;
    const world = engine.world;
    
    // Set gravity to zero (horizontal playground)
    engine.gravity.y = 0;
    
    // Get screen dimensions
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Create renderer
    const render = Render.create({
      element: sceneRef.current,
      engine: engine,
      options: {
        width: screenWidth,
        height: screenHeight,
        pixelRatio: 2,
        background: 'transparent',
        wireframes: false,
      }
    });
    renderRef.current = render;
    
    // Create boundaries
    const ground = Bodies.rectangle(
      (screenWidth / 2) + 160, 
      screenHeight + 80, 
      screenWidth + 320, 
      160, 
      { 
        render: { fillStyle: '#f7f7f7' }, 
        isStatic: true 
      }
    );
    
    const wallLeft = Bodies.rectangle(
      -80, 
      screenHeight / 2, 
      160, 
      screenHeight, 
      { 
        render: { fillStyle: '#f7f7f7' },
        isStatic: true 
      }
    );
    
    const wallRight = Bodies.rectangle(
      screenWidth + 80, 
      screenHeight / 2, 
      160, 
      screenHeight, 
      { 
        render: { fillStyle: '#f7f7f7' },
        isStatic: true 
      }
    );
    
    const roof = Bodies.rectangle(
      (screenWidth / 2) + 160, 
      -80, 
      screenWidth + 320, 
      160, 
      { 
        render: { fillStyle: '#f7f7f7' },
        isStatic: true 
      }
    );
    
    // Create interactive objects
    const projectBodies = projects.map((project, index) => {
      const x = (screenWidth / 4) * ((index % 3) + 1);
      const y = (screenHeight / 3) * (Math.floor(index / 3) + 1);
      
      // Calculate physics body size based on sprite scale
      const spriteScale = 0.25;
      const physicsWidth = project.width * 2;  // Make physics body larger than sprite
      const physicsHeight = project.height * 2;
      
      return Bodies.rectangle(
        x,
        y,
        physicsWidth,
        physicsHeight,
        { 
          render: { 
            fillStyle: '#f7f7f7',
            lineWidth: 2,
            strokeStyle: 'black',
            sprite: {
              texture: project.image,
              xScale: spriteScale,
              yScale: spriteScale
            }
          },
          friction: 0.3,
          restitution: 0.2,
          density: 1,
        }
      );
    });

    // Store URLs in a Map for easy lookup
    const bodyUrls = new Map<Matter.Body, string>();
    projectBodies.forEach((body, index) => {
      bodyUrls.set(body, projects[index].url);
    });
    
    // Add all bodies to the world
    World.add(world, [
      ground, wallLeft, wallRight, roof,
      ...projectBodies
    ]);
    
    // Add mouse control
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse: mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false
        }
      }
    });
    
    World.add(world, mouseConstraint);
    
    // Keep the mouse in sync with rendering
    render.mouse = mouse;
    
    // Prevent scrolling on the canvas
    const preventScroll = (e: WheelEvent | Event) => e.preventDefault();
    mouse.element.addEventListener("wheel", preventScroll, { passive: false });
    mouse.element.addEventListener("DOMMouseScroll", preventScroll, { passive: false });
    
    // Click vs. drag detection
    let click = false;
    
    const handleMouseDown = () => click = true;
    const handleMouseMove = () => click = false;
    
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mousemove', handleMouseMove);
    
    // Create click handler for objects
    Events.on(mouseConstraint, 'mouseup', function() {
      if (!mouseConstraint.body) {
        const bodies = engine.world.bodies;
        
        if (click === true) {
          for (let i = 0; i < bodies.length; i++) {
            const body = bodies[i];
            
            if (Matter.Bounds.contains(body.bounds, mouseConstraint.mouse.position)) {
              const bodyUrl = bodyUrls.get(body);
              
              if (bodyUrl) {
                window.open(bodyUrl, '_blank');
                console.log("Hyperlink was opened:", bodyUrl);
              }
              break;
            }
          }
        }
      }
    });
    
    // Run the engine and renderer using Runner
    const runner = Runner.create();
    Runner.run(runner, engine);
    Render.run(render);
    
    // Cleanup function
    return () => {
      // Remove event listeners
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mousemove', handleMouseMove);
      
      // Stop and clean up Matter.js
      Render.stop(render);
      Runner.stop(runner);
      World.clear(world, true);
      Engine.clear(engine);
      
      if (render.canvas) {
        render.canvas.remove();
      }
      
      // Clean up references
      renderRef.current = null;
      engineRef.current = null;
    };
  }, []); // Empty dependency array means this effect runs once on mount
  
  return (
    <div 
      ref={sceneRef} 
      className="w-full h-screen overflow-hidden"
    />
  );
};

export default PhysicsGrid;


// To Do
// - Add a border to the physics bodies
// - Make the animation smoother like the examples
// - Make the bounding area work correctly like the example.
//    - This is somehow related to the sprite scale, look closely.
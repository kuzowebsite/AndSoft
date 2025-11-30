"use client";

import React, { useEffect, useRef } from 'react';

const WinterOverlay = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    // --- CONFIG ---
    const snowflakes: { x: number; y: number; r: number; d: number; vx: number; vy: number }[] = [];
    const maxFlakes = 200; // Цасны ширхэгийн тоо
    const groundHeight: number[] = new Array(width).fill(0); // Цасны зузаан (пиксел бүрээр)
    let wind = 0; // Салхи (Утасны хазайлт)

    // Цас үүсгэх
    for (let i = 0; i < maxFlakes; i++) {
      snowflakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 1, // Радиус
        d: Math.random() * maxFlakes, // Нягтрал
        vx: 0,
        vy: 0
      });
    }

    // --- DEVICE ORIENTATION (Утас хазайлгах) ---
    const handleOrientation = (event: DeviceOrientationEvent) => {
      // gamma is left/right tilt in degrees [-90, 90]
      if (event.gamma) {
        // -30 (left) to 30 (right) -> wind -2 to 2
        wind = Math.max(-3, Math.min(3, event.gamma / 10));
      }
    };
    
    // MOUSE FALLBACK (PC дээр хулганаар салхи удирдах)
    const handleMouseMove = (event: MouseEvent) => {
        const center = width / 2;
        const mouseX = event.clientX;
        wind = (mouseX - center) / center * 2;
    };

    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('mousemove', handleMouseMove);

    // --- ANIMATION LOOP ---
    const draw = () => {
      if(!ctx) return;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw Ground (Accumulated Snow)
      ctx.fillStyle = "rgba(255, 255, 255, 0.9)";
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x < width; x++) {
        // Smooth sliding effect: If wind is strong, shift piles
        if (Math.abs(wind) > 0.5) {
            const shift = Math.sign(wind); // -1 or 1
            const sourceX = x - shift;
            if (sourceX >= 0 && sourceX < width) {
                // Move snow slightly to direction
                if (groundHeight[sourceX] > groundHeight[x] + 2) {
                    groundHeight[x] += 1;
                    groundHeight[sourceX] -= 1;
                }
            }
        }
        ctx.lineTo(x, height - groundHeight[x]);
      }
      ctx.lineTo(width, height);
      ctx.fill();

      // 2. Draw Falling Flakes
      ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
      ctx.beginPath();
      for (let i = 0; i < maxFlakes; i++) {
        const p = snowflakes[i];
        ctx.moveTo(p.x, p.y);
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true);
      }
      ctx.fill();

      update();
      requestAnimationFrame(draw);
    };

    const update = () => {
      for (let i = 0; i < maxFlakes; i++) {
        const p = snowflakes[i];

        // Apply velocities
        p.y += Math.cos(p.d) + 1 + p.r / 2; // Gravity
        p.x += Math.sin(p.d) * 2 + wind;    // Wind/Sway

        // Boundary checks
        if (p.x > width + 5 || p.x < -5 || p.y > height) {
          if (i % 3 > 0) { // 66% flakes respawn at top
            snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, vx: 0, vy: 0 };
          } else {
            // 33% flakes stick to ground
            if (p.x > 0 && p.x < width) {
              const xIdx = Math.floor(p.x);
              // Add to pile (radius * 2 height)
              if (groundHeight[xIdx] < 150) { // Max height limit
                  for(let k = -2; k <= 2; k++) {
                      if(xIdx+k >= 0 && xIdx+k < width) groundHeight[xIdx+k] += p.r * 0.5;
                  }
              }
              snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, vx: 0, vy: 0 };
            }
          }
        }
        
        // Ground Collision Check
        const floorY = height - groundHeight[Math.floor(p.x)] || height;
        if (p.y > floorY) {
             // Landed
             const xIdx = Math.floor(p.x);
             if (xIdx > 0 && xIdx < width && groundHeight[xIdx] < 150) {
                 for(let k = -2; k <= 2; k++) {
                    if(xIdx+k >= 0 && xIdx+k < width) groundHeight[xIdx+k] += p.r * 0.5;
                 }
             }
             // Respawn
             snowflakes[i] = { x: Math.random() * width, y: -10, r: p.r, d: p.d, vx: 0, vy: 0 };
        }
      }
    };

    // Handle Resize
    const handleResize = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    };
    window.addEventListener('resize', handleResize);

    // Start Loop
    draw();

    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-[9998]" />;
};

export default WinterOverlay;
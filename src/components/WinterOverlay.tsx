"use client";

import React, { useEffect, useRef } from 'react';

type Snowflake = {
  x: number; y: number; r: number; d: number;
  type: 'dot' | 'flake' | 'avalanche'; 
  vx: number; vy: number; 
  opacity: number; life: number; 
};

const WinterOverlay = () => {
  const bgCanvasRef = useRef<HTMLCanvasElement>(null); // Арын давхарга (Мод, Товч, Газар)
  const fgCanvasRef = useRef<HTMLCanvasElement>(null); // Урд давхарга (Унаж буй цас, Цонх)

  // Цонх болон Товчны цасны хэмжээг хадгалах
  const windowSnowRef = useRef<Map<string, number>>(new Map());
  const dockSnowRef = useRef<number[]>([]);

  useEffect(() => {
    const bgCanvas = bgCanvasRef.current;
    const fgCanvas = fgCanvasRef.current;
    if (!bgCanvas || !fgCanvas) return;
    
    const bgCtx = bgCanvas.getContext('2d');
    const fgCtx = fgCanvas.getContext('2d');
    if (!bgCtx || !fgCtx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    // --- CONFIG ---
    // FIX 1: 'let' -> 'const' (Array reference never changes)
    const snowflakes: Snowflake[] = [];
    const maxAmbientFlakes = 250; 
    
    // Ground (Background)
    const groundResolution = 2;
    const groundArrSize = Math.ceil(width / groundResolution);
    const groundHeight: number[] = new Array(groundArrSize).fill(0); 
    const maxGroundHeight = 80; 

    // Rects
    let dockRects: DOMRect[] = []; // Tree & Dock buttons
    let windowElements: { id: string, rect: DOMRect }[] = []; // Active Windows

    const BUTTON_RADIUS = 14; 
    const WINDOW_RADIUS = 12;

    // --- INITIALIZATION ---
    const updateWindowRects = () => {
        const wEls = document.querySelectorAll('.window-snow-target');
        windowElements = Array.from(wEls).map(el => ({
            id: el.getAttribute('data-window-id') || 'unknown',
            rect: el.getBoundingClientRect()
        }));
    };

    const updateDimensions = () => {
        width = window.innerWidth;
        height = window.innerHeight;
        bgCanvas.width = width; bgCanvas.height = height;
        fgCanvas.width = width; fgCanvas.height = height;

        // Update Dock Rects
        const dElements = document.querySelectorAll('.dock-item');
        dockRects = Array.from(dElements).map(el => el.getBoundingClientRect());
        
        // Sync dock snow array size
        if (dockSnowRef.current.length !== dockRects.length) {
             const newLevels = new Array(dockRects.length).fill(0);
             for(let i=0; i<Math.min(dockSnowRef.current.length, dockRects.length); i++) {
                 newLevels[i] = dockSnowRef.current[i];
             }
             dockSnowRef.current = newLevels;
        }

        updateWindowRects();
    };

    updateDimensions();

    for (let i = 0; i < maxAmbientFlakes; i++) {
      snowflakes.push(createAmbientFlake(width, height));
    }

    // --- HELPER FUNCTIONS ---
    function createAmbientFlake(w: number, h: number): Snowflake {
        return {
            x: Math.random() * w,
            y: Math.random() * h,
            r: Math.random() * 2.5 + 1,
            d: Math.random() * maxAmbientFlakes,
            type: Math.random() > 0.6 ? 'flake' : 'dot',
            vx: 0, vy: 0, opacity: 0.8, life: 100
        };
    }

    function createAvalancheParticle(rect: DOMRect): Snowflake {
        const startX = rect.left + Math.random() * rect.width;
        const relativePos = (startX - rect.left) / rect.width;
        
        // FIX 2: 'let' -> 'const' (Value is assigned once)
        const velocityX = relativePos < 0.5 ? -(Math.random() * 2 + 1) : (Math.random() * 2 + 1);

        return {
            x: startX,
            y: rect.top + Math.random() * 5, 
            r: Math.random() * 3 + 1, d: 0,
            type: 'avalanche',
            vx: velocityX, vy: -(Math.random() * 2), 
            opacity: 1, life: 60 + Math.random() * 40
        };
    }

    const drawStarFlake = (ctx: CanvasRenderingContext2D, x: number, y: number, r: number, opacity: number) => {
        ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (Math.PI / 3) * i;
            const x_end = x + Math.cos(angle) * r;
            const y_end = y + Math.sin(angle) * r;
            ctx.moveTo(x, y); ctx.lineTo(x_end, y_end);
        }
        ctx.stroke();
    };

    const drawRoundedSnowCap = (ctx: CanvasRenderingContext2D, rect: DOMRect, level: number, radius: number) => {
        if (level <= 0) return;
        ctx.fillStyle = "rgba(255, 255, 255, 0.95)";
        ctx.beginPath();
        ctx.moveTo(rect.left, rect.top + radius);
        ctx.quadraticCurveTo(rect.left, rect.top, rect.left + radius, rect.top);
        ctx.lineTo(rect.right - radius, rect.top);
        ctx.quadraticCurveTo(rect.right, rect.top, rect.right, rect.top + radius);
        
        const pileHeight = Math.min(level, 25);
        ctx.bezierCurveTo(
            rect.right + 2, rect.top - pileHeight,
            rect.left - 2, rect.top - pileHeight,
            rect.left, rect.top + radius
        );
        ctx.fill();

        if (level > 15) {
             ctx.beginPath();
             ctx.arc(rect.left + 5, rect.top + 5, 2, 0, Math.PI * 2);
             ctx.arc(rect.right - 5, rect.top + 5, 2, 0, Math.PI * 2);
             ctx.fill();
        }
    };

    // --- EVENT HANDLERS ---
    let wind = 0;
    const handleOrientation = (event: DeviceOrientationEvent) => { if (event.gamma) wind = Math.max(-3, Math.min(3, event.gamma / 10)); };
    
    const handleMouseMove = (event: MouseEvent) => {
        const center = width / 2;
        wind = (event.clientX - center) / center * 2;
        
        // Check dock hover (Background Layer interaction)
        dockRects.forEach((rect, index) => {
            if (event.clientX >= rect.left - 10 && event.clientX <= rect.right + 10 && 
                event.clientY >= rect.top - 20 && event.clientY <= rect.bottom) {
                
                // Хэрэв цас байгаа бол хайлуулна
                if (dockSnowRef.current[index] > 0) {
                    dockSnowRef.current[index] = Math.max(0, dockSnowRef.current[index] - 0.5);

                    // Нурж унаж буй хэсгийг (Avalanche) үүсгэх
                    if (Math.random() > 0.6) { 
                        snowflakes.push(createAvalancheParticle(rect));
                    }
                }
            }
        });
    };

    const handleShakeDock = () => {
        dockRects.forEach((rect, index) => {
            if (dockSnowRef.current[index] > 0) {
                const amount = dockSnowRef.current[index];
                const particles = Math.min(amount * 2, 30); 
                for(let k=0; k<particles; k++) snowflakes.push(createAvalancheParticle(rect));
                dockSnowRef.current[index] = 0; 
            }
        });
    };

    const handleWindowMove = (e: Event) => {
        const customEvent = e as CustomEvent;
        const targetId = customEvent.detail?.id;
        if (targetId && windowSnowRef.current.has(targetId)) {
            const level = windowSnowRef.current.get(targetId) || 0;
            if (level > 0) {
                const targetWin = windowElements.find(w => w.id === targetId);
                if (targetWin) {
                     const particles = Math.min(level * 2, 40);
                     for(let k=0; k<particles; k++) snowflakes.push(createAvalancheParticle(targetWin.rect));
                }
                windowSnowRef.current.set(targetId, 0);
            }
        }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('shake-dock', handleShakeDock);
    window.addEventListener('window-move', handleWindowMove);
    window.addEventListener('resize', updateDimensions);

    // --- DRAW LOOP ---
    const draw = () => {
      if(!bgCtx || !fgCtx) return;
      bgCtx.clearRect(0, 0, width, height);
      fgCtx.clearRect(0, 0, width, height);

      updateWindowRects();

      // --- BACKGROUND LAYER (z-40) ---
      // 1. Draw Ground Snow
      bgCtx.fillStyle = "rgba(255, 255, 255, 0.95)";
      for (let i = 0; i < groundArrSize; i++) {
          const h = groundHeight[i];
          if (h > 1) {
              const x = i * groundResolution;
              const y = height - h;
              bgCtx.beginPath(); bgCtx.arc(x, y, 6, 0, Math.PI * 2); bgCtx.fill();
              bgCtx.fillRect(x - 1, y, 4, h);
          }
      }

      // 2. Draw Dock & Tree Snow Caps
      dockRects.forEach((rect, index) => {
          drawRoundedSnowCap(bgCtx, rect, dockSnowRef.current[index], BUTTON_RADIUS);
      });

      // --- FOREGROUND LAYER (z-100) ---
      // 3. Draw Window Snow Caps
      windowElements.forEach((win) => {
          const level = windowSnowRef.current.get(win.id) || 0;
          drawRoundedSnowCap(fgCtx, win.rect, level, WINDOW_RADIUS);
      });

      // 4. Draw Falling Snowflakes (Always on Foreground)
      for (let i = 0; i < snowflakes.length; i++) {
        const p = snowflakes[i];
        const ctx = fgCtx; // Цас үргэлж наана харагдана

        if (p.type === 'avalanche') {
            ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
            ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
        } else if (p.type === 'flake' && p.r > 2) {
             drawStarFlake(ctx, p.x, p.y, p.r, p.opacity);
        } else {
             ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
             ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2, true); ctx.fill();
        }
      }

      update();
      requestAnimationFrame(draw);
    };

    const update = () => {
      for (let i = snowflakes.length - 1; i >= 0; i--) {
        const p = snowflakes[i];

        if (p.type === 'avalanche') {
            p.x += p.vx; p.y += p.vy; p.vy += 0.5; p.life--;
            
            // Ground collision check
            const arrIdx = Math.floor(p.x / groundResolution);
            const floorY = height - (groundHeight[arrIdx] || 0);
            if (p.y >= floorY) {
                if (arrIdx > 0 && arrIdx < groundArrSize && groundHeight[arrIdx] < maxGroundHeight) {
                    groundHeight[arrIdx] += p.r * 0.2;
                }
                snowflakes.splice(i, 1); continue;
            }
            if (p.life <= 0 || p.y > height) { snowflakes.splice(i, 1); continue; }
        } else {
            // Ambient Physics
            p.y += Math.cos(p.d) + 1 + p.r / 2; 
            p.x += Math.sin(p.d) * 2 + wind;

            let hitObject = false;

            // 1. Check Window Collision (FOREGROUND PRIORITY)
            for (let j = 0; j < windowElements.length; j++) {
                const win = windowElements[j];
                if (p.x >= win.rect.left + 5 && p.x <= win.rect.right - 5) {
                    const currentPile = windowSnowRef.current.get(win.id) || 0;
                    if (p.y >= win.rect.top - currentPile + 5 && p.y <= win.rect.top + 40) {
                        if (currentPile < 20) {
                            windowSnowRef.current.set(win.id, currentPile + p.r * 0.3);
                        }
                        hitObject = true; break;
                    }
                }
            }

            // 2. Check Dock Collision (BACKGROUND)
            if (!hitObject && p.y < height - 50) { 
                for (let j = 0; j < dockRects.length; j++) {
                    const rect = dockRects[j];
                    if (p.x >= rect.left + 2 && p.x <= rect.right - 2) {
                        const currentPile = dockSnowRef.current[j];
                        if (p.y >= rect.top - currentPile + 5 && p.y <= rect.bottom) {
                            if (currentPile < 25) dockSnowRef.current[j] += p.r * 0.3; 
                            hitObject = true; break;
                        }
                    }
                }
            }

            let shouldRespawn = hitObject;
            const arrIdx = Math.floor(p.x / groundResolution);
            const floorY = height - (groundHeight[arrIdx] || 0);

            if (!hitObject && p.y > floorY) {
                 if (arrIdx > 0 && arrIdx < groundArrSize && groundHeight[arrIdx] < maxGroundHeight) {
                    const spread = 4; 
                    for(let k = -spread; k <= spread; k++) {
                        const targetIdx = arrIdx + k;
                        if(targetIdx >= 0 && targetIdx < groundArrSize && groundHeight[targetIdx] < maxGroundHeight) {
                             groundHeight[targetIdx] += (p.r * 0.3) * (1 - Math.abs(k)/spread);
                        }
                    }
                 }
                 shouldRespawn = true;
            }

            if (p.x > width + 5 || p.x < -5 || p.y > height || shouldRespawn) {
                 snowflakes[i] = createAmbientFlake(width, height);
                 snowflakes[i].y = -10; 
            }
        }
      }
    };

    draw();

    return () => {
        window.removeEventListener('resize', updateDimensions);
        window.removeEventListener('deviceorientation', handleOrientation);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('shake-dock', handleShakeDock);
        window.removeEventListener('window-move', handleWindowMove);
    };
  }, []);

  return (
    <>
      <canvas ref={bgCanvasRef} className="fixed inset-0 pointer-events-none z-[40]" />
      <canvas ref={fgCanvasRef} className="fixed inset-0 pointer-events-none z-[100]" />
    </>
  );
};

export default WinterOverlay;

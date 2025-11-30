"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Component imports
import TerminalContact from '@/components/TerminalContact';
import HelpTerminal from '@/components/HelpTerminal';
import AboutContent from '@/components/AboutContent';
import CareersContent from '@/components/CareersContent';
import GamesContent from '@/components/GamesContent';
import ServicesContent from '@/components/ServicesContent';
import ProjectsContent from '@/components/ProjectsContent';
import WinterOverlay from '@/components/WinterOverlay';

// Icon imports
import { 
  Search, Apple, User, Briefcase, Mail, Layers, LucideIcon, 
  Gamepad2, Terminal as TerminalIcon, X, Minus, Maximize2, Globe, FolderGit2,
  Snowflake, Gift, Trees, Code2, Coffee, Atom, FileCode2, Hash, Braces, 
  Wind, Cpu, Database, Command, Sparkles
} from 'lucide-react';

// --- Types ---
type MenuItemType = {
  label: string;
  shortcut?: string;
  action?: () => void;
};

// --- IMPROVED COMPONENT: Code Fireworks ---
const CodeFireworks = () => {
    const [fireworks, setFireworks] = useState<{id: number, x: number, delay: number}[]>([]);
    
    // Stable constants
    const symbols = useMemo(() => ["{ }", "< >", "</>", "&&", "||", "=>", ";", "$", "01"], []);
    const colors = useMemo(() => ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#06b6d4"], []);
    const locations = useMemo(() => [-350, 0, 350], []);
  
    useEffect(() => {
      const triggerFirework = () => {
        const id = Date.now();
        // Math.random() is safe here because it's inside useEffect
        const randomLocIndex = Math.floor(Math.random() * locations.length);
        const x = locations[randomLocIndex] + (Math.random() * 50 - 25); 
        
        setFireworks(prev => [...prev, { id, x, delay: 0 }]);
        
        if (Math.random() > 0.7) {
             const secondId = Date.now() + 1;
             const secondLoc = locations[(randomLocIndex + 1) % locations.length];
             setFireworks(prev => [...prev, { id: secondId, x: secondLoc, delay: 0.5 }]);
        }

        setTimeout(() => {
            setFireworks(prev => prev.filter(f => f.id !== id));
        }, 5000);
      };
  
      const interval = setInterval(triggerFirework, 8000); 
      return () => clearInterval(interval);
    }, [locations]);
  
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[5]">
          {fireworks.map(fw => (
              <SymbolBurst key={fw.id} x={fw.x} delay={fw.delay} symbols={symbols} colors={colors} />
          ))}
      </div>
    );
};
  
// FIX: Moved random generation to useEffect to fix "Impure Function" error
const SymbolBurst = ({ x, delay, symbols, colors }: { x: number, delay: number, symbols: string[], colors: string[] }) => {
    // State to hold random values
    const [randomColor, setRandomColor] = useState<string>("");
    const [particles, setParticles] = useState<{angle: number, char: string, radius: number}[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        // Generate random values ONLY after mount (client-side)
        // This ensures the render phase is pure
        
        
        const newParticles = Array.from({ length: 16 }).map((_, i) => ({
            angle: (i / 16) * 360,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            radius: 180 + Math.random() * 50
        }));
        
       
        
    }, [colors, symbols]); // Only run once on mount

    // Don't render anything until random values are generated
    if (!ready) return null;

    return (
        <div className="absolute bottom-60" style={{ transform: `translateX(${x}px)` }}>
            {/* Launch Trail */}
            <motion.div
                initial={{ y: 0, height: 0, opacity: 1 }}
                animate={{ y: -350, height: 100, opacity: 0 }}
                transition={{ duration: 1.2, delay: delay, ease: "easeOut" }}
                className="absolute left-0 w-0.5 bg-gradient-to-t from-transparent to-white"
                style={{ backgroundColor: randomColor }}
            />
            
            {/* Explosion */}
            {particles.map((p, i) => (
                 <motion.div
                    key={i}
                    initial={{ y: -350, x: 0, opacity: 0, scale: 0 }}
                    animate={{ 
                        y: -350 + Math.sin(p.angle * Math.PI / 180) * p.radius, 
                        x: Math.cos(p.angle * Math.PI / 180) * p.radius,
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1.2, 0.8]
                    }}
                    transition={{ delay: delay + 1.1, duration: 2.5, ease: "circOut" }}
                    className="absolute font-mono font-bold text-sm md:text-lg"
                    style={{ color: randomColor, textShadow: `0 0 10px ${randomColor}` }}
                >
                    {p.char}
                </motion.div>
            ))}
        </div>
    );
};

// --- COMPONENT: Realistic Code Tree ---
const CodeChristmasTree = () => {
  return (
    <div className="relative flex flex-col items-center z-20 mt-12 group perspective-1000">
      
      {/* Glowing Backdrop */}
      <div className="absolute inset-0 bg-green-900/20 blur-3xl rounded-full scale-150 -z-10 animate-pulse" />

      {/* Star Top */}
      <motion.div 
        animate={{ rotateY: [0, 360], scale: [1, 1.2, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
        className="text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.9)] mb-1 z-50 cursor-pointer hover:text-white"
      >
         <Sparkles size={56} fill="currentColor" />
      </motion.div>

      {/* Tree Body */}
      <div className="relative flex flex-col items-center gap-[-10px]">
        
        {/* Layer 1 */}
        <TreeLayer width="w-32" color="bg-gradient-to-b from-green-400 to-green-600">
            <span className="text-white font-mono font-bold text-xs">{`{init}`}</span>
        </TreeLayer>

        {/* Layer 2 */}
        <TreeLayer width="w-48" color="bg-gradient-to-b from-green-500 to-green-700">
             <div className="flex gap-4 items-center justify-center w-full">
                <Ornament color="bg-red-500" icon={<Hash size={12}/>} />
                <span className="text-green-100 font-mono text-xs font-bold">&lt;HTML/&gt;</span>
                <Ornament color="bg-blue-500" icon={<Braces size={12}/>} />
             </div>
        </TreeLayer>

        {/* Layer 3 */}
        <TreeLayer width="w-64" color="bg-gradient-to-b from-green-600 to-green-800">
            <div className="flex gap-6 items-center justify-center w-full">
                <Ornament color="bg-yellow-400" icon={<Coffee size={12}/>} />
                <code className="text-green-200 text-xs">const xmas = true;</code>
                <Ornament color="bg-purple-500" icon={<Atom size={12}/>} />
            </div>
        </TreeLayer>

        {/* Layer 4 */}
        <TreeLayer width="w-80" color="bg-gradient-to-b from-green-700 to-green-900">
            <div className="flex gap-8 items-center justify-center w-full">
                <Ornament color="bg-cyan-400" icon={<Wind size={12}/>} />
                <div className="flex gap-2 text-[10px] font-mono text-green-300 border border-green-500/30 px-2 rounded bg-black/20">
                    <span>NextJS</span><span>•</span><span>React</span>
                </div>
                <Ornament color="bg-orange-500" icon={<Database size={12}/>} />
            </div>
        </TreeLayer>

        {/* Layer 5 */}
        <TreeLayer width="w-96" color="bg-gradient-to-b from-green-800 to-green-950">
             <div className="flex justify-between px-10 w-full items-center">
                <Ornament color="bg-pink-500" icon={<Cpu size={12}/>} />
                <div className="text-center text-[10px] text-gray-300 font-mono">
                    System.out.println(Merry Christmas);
                </div>
                <Ornament color="bg-indigo-500" icon={<Command size={12}/>} />
             </div>
        </TreeLayer>
      </div>

      {/* Trunk */}
      <div className="w-16 h-12 bg-gradient-to-b from-yellow-900 to-yellow-950 rounded-b-lg border-x-2 border-yellow-800 flex items-center justify-center relative z-20 mt-[-5px]">
          <div className="w-12 h-8 border border-yellow-800/50 rounded bg-black/30" />
      </div>
      
      {/* Base Shadow */}
      <div className="w-64 h-4 bg-black/50 blur-xl rounded-[100%] mt-[-5px]" />
    </div>
  );
};

// Tree Helper Components
const TreeLayer = ({ width, color, children }: { width: string, color: string, children?: React.ReactNode }) => (
    <div className={`${width} relative h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-black/10 z-10 transform hover:scale-105 transition-transform duration-300 clip-path-pyramid dock-item`}>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-2xl pointer-events-none" />
        <div className="absolute -bottom-1 left-2 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_red]" />
        <div className="absolute -bottom-1 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75 shadow-[0_0_5px_blue]" />
        <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping delay-100" />
        {children}
    </div>
);

const Ornament = ({ color, icon }: { color: string, icon: React.ReactNode }) => (
    <div className={`w-8 h-8 rounded-full ${color} shadow-md flex items-center justify-center text-white border border-white/20 relative overflow-hidden group`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        <div className="relative z-10 group-hover:rotate-12 transition-transform">{icon}</div>
        <div className="absolute top-1 left-2 w-2 h-2 bg-white/40 rounded-full blur-[1px]" />
    </div>
);

// --- Top Menu Bar ---
const TopBar = ({ 
  onOpenContact, onOpenAbout, onOpenCareers, 
  onOpenGames, onOpenServices, onOpenProjects,
  onOpenHelp, onCloseAllWindows, onNewWindow, onShutDown,
  language, setLanguage 
}: { 
  onOpenContact: () => void, onOpenAbout: () => void, onOpenCareers: () => void, 
  onOpenGames: () => void, onOpenServices: () => void, onOpenProjects: () => void,
  onOpenHelp: () => void, onCloseAllWindows: () => void, onNewWindow: () => void, onShutDown: () => void,
  language: 'mn' | 'en', setLanguage: (lang: 'mn' | 'en') => void 
}) => {
  const [time, setTime] = useState('');
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateTime = () => {
      const date = new Date();
      const locale = language === 'mn' ? 'mn-MN' : 'en-US';
      const timeString = date.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit', hour12: true });
      setTime(`${timeString}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => { clearInterval(interval); document.removeEventListener("mousedown", handleClickOutside); };
  }, [language]);

  const labels = {
    mn: { file: 'Файл', help: 'Тусламж', openTerm: 'Холбоо барих', openHelp: 'AndSoft Тусламж', newWin: 'Шинэ цонх', closeWin: 'Бүх цонхыг хаах', shutDown: 'Унтраах...', about: 'AndSoft LLC-ийн тухай', sys: 'Системийн тохиргоо...' },
    en: { file: 'File', help: 'Help', openTerm: 'Contact Us', openHelp: 'AndSoft Help', newWin: 'New Window', closeWin: 'Close All Windows', shutDown: 'Shut Down...', about: 'About AndSoft LLC', sys: 'System Settings...' }
  };
  const t = labels[language];

  const menuItems: { [key: string]: MenuItemType[] } = {
    apple: [
      { label: t.about, action: onOpenAbout },
      { label: t.sys },
      { label: t.shutDown, action: onShutDown },
    ],
    File: [ 
        { label: t.newWin, shortcut: '⌘N', action: onNewWindow }, 
        { label: t.closeWin, shortcut: '⌘W', action: onCloseAllWindows } 
    ],
    Help: [ 
        { label: t.openHelp, action: onOpenHelp },
        { label: t.openTerm, shortcut: '⌘T', action: onOpenContact } 
    ]
  };

  const visibleMenus = [{ key: 'File', label: t.file }, { key: 'Help', label: t.help }];

  return (
    <div className="fixed top-0 w-full z-[70]">
        <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x z-[-1] opacity-90" 
             style={{ 
                 background: 'linear-gradient(to bottom, #8b0000, #500000)',
                 borderBottom: '2px solid #d4af37'
             }} 
        />
        <div className="absolute -bottom-2 left-0 w-full flex justify-around px-10 pointer-events-none opacity-80">
             {Array.from({length: 8}).map((_, i) => (
                 <div key={i} className={`w-2 h-2 rounded-full shadow-lg ${i % 2 === 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ marginTop: i % 2 === 0 ? '2px' : '5px' }}></div>
             ))}
        </div>

        <div className="w-full h-8 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-2 md:px-4 text-gray-300 text-xs font-medium border-b border-white/5 shadow-sm select-none relative">
            <div className="flex items-center gap-2 md:gap-4 h-full" ref={menuRef}>
                <div className="relative h-full flex items-center">
                    <div 
                        className={`flex items-center gap-2 cursor-pointer px-2 h-full rounded hover:bg-white/10 ${activeMenu === 'apple' ? 'bg-white/10' : ''}`}
                        onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
                    >
                        <div className="relative">
                            <div className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-500 rounded flex items-center justify-center shadow-lg shadow-red-500/20">
                                <span className="text-[10px] font-bold text-white leading-none">A</span>
                            </div>
                            <div className="absolute -top-2 -right-1.5 transform rotate-12">
                                <span className="text-[10px]">🎅</span>
                            </div>
                        </div>
                        <span className="font-bold text-white tracking-wide hidden md:block">AndSoft LLC</span>
                    </div>
                    {activeMenu === 'apple' && <DropdownMenu items={menuItems.apple} onClose={() => setActiveMenu(null)} />}
                </div>
                {visibleMenus.map((menu) => (
                    <div key={menu.key} className="relative h-full flex items-center">
                        <div className={`flex cursor-default px-2 md:px-3 h-6 items-center rounded hover:bg-white/10 ${activeMenu === menu.key ? 'bg-white/10' : ''}`} onClick={() => setActiveMenu(activeMenu === menu.key ? null : menu.key)}>
                            {menu.label}
                        </div>
                        {activeMenu === menu.key && <DropdownMenu items={menuItems[menu.key]} onClose={() => setActiveMenu(null)} />}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-3 md:gap-4">
                <div className="flex items-center gap-1 md:gap-2 cursor-pointer hover:bg-white/10 px-2 py-1 rounded transition-colors" onClick={() => setLanguage(language === 'mn' ? 'en' : 'mn')}>
                    <Globe size={12} className="text-gray-400" />
                    <span className="uppercase font-bold text-gray-300 text-[10px] md:text-xs">{language}</span>
                </div>
                <div className="hidden md:flex items-center gap-3">
                    <Search size={14} className="text-gray-500" />
                </div>
                <span className="text-gray-200 hidden md:block">{time}</span>
            </div>
        </div>
    </div>
  );
};

const DropdownMenu = ({ items, onClose }: { items: MenuItemType[], onClose: () => void }) => (
    <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} className="absolute top-8 left-0 min-w-[200px] bg-[#1a1a1a]/95 backdrop-blur-xl border border-white/10 rounded-lg shadow-2xl py-1 z-50">
        {items.map((item, idx) => (
            <div key={idx} className="px-4 py-1.5 hover:bg-red-600 hover:text-white text-gray-300 flex justify-between group cursor-default transition-colors" onClick={() => { if (item.action) item.action(); onClose(); }}>
                <span>{item.label}</span>
                {item.shortcut && <span className="text-gray-500 group-hover:text-white text-[10px] ml-4">{item.shortcut}</span>}
            </div>
        ))}
    </motion.div>
);

// --- Dock Icon ---
const DockIcon = ({ icon: Icon, label, onClick, color, isActive }: { icon: LucideIcon, label: string, onClick?: () => void, color: string, isActive?: boolean }) => {
  const handleClick = () => {
    // Custom event to shake snow
    if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('shake-dock'));
    }
    if (onClick) onClick();
  };

  return (
      <motion.div 
        className="dock-item group relative flex flex-col items-center gap-1 cursor-pointer" 
        whileHover={{ scale: 1.2, y: -10 }} 
        whileTap={{ scale: 0.9 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20 }} 
        onClick={handleClick}
      >
        {/* Z-Index 10 for button, snow will be handled by WinterOverlay */}
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/10 ${color} relative overflow-hidden z-10`}>
           <Icon color="white" size={24} strokeWidth={1.5} />
           <div className="absolute top-0 right-0 p-0.5 opacity-80 animate-pulse">
              <Snowflake size={10} className="text-white fill-white" />
           </div>
        </div>
        <div className={`w-1 h-1 bg-white rounded-full mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
        <span className="absolute -top-10 bg-[#1a1a1a]/90 backdrop-blur text-gray-200 text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[90]">
          {label}
        </span>
      </motion.div>
  );
};

// --- MacWindow ---
const MacWindow = ({ title, onClose, onMinimize, onFocus, isActive, children, isOpen, isMinimized }: { title: string, onClose: () => void, onMinimize: () => void, onFocus: () => void, isActive: boolean, children: React.ReactNode, isOpen: boolean, isMinimized: boolean }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [winState, setWinState] = useState({ x: 20, y: 80, width: 350, height: 500 });
    const dragRef = useRef<{ startX: number, startY: number, initialWinState: typeof winState } | null>(null);

    // Create a stable window ID for the snow system
    const windowId = useMemo(() => `win-${title.replace(/\s+/g, '-')}`, [title]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const timer = setTimeout(() => {
                const initialWidth = Math.min(800, window.innerWidth - 20);
                const initialHeight = Math.min(600, window.innerHeight - 150);
                setWinState({ x: (window.innerWidth - initialWidth) / 2, y: 80, width: initialWidth, height: initialHeight });
            }, 0);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
        onFocus();
        if (isMaximized) return;
        
        dispatchMoveEvent();

        const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
        const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
        dragRef.current = { startX: clientX, startY: clientY, initialWinState: { ...winState } };
        if ('touches' in e) {
            document.addEventListener('touchmove', handleTouchMove, { passive: false });
            document.addEventListener('touchend', handleDragEnd);
        } else {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleDragEnd);
        }
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!dragRef.current) return;
        const deltaX = e.clientX - dragRef.current.startX;
        const deltaY = e.clientY - dragRef.current.startY;
        updatePosition(deltaX, deltaY);
        dispatchMoveEvent();
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!dragRef.current) return;
        if (e.cancelable) e.preventDefault(); 
        const deltaX = e.touches[0].clientX - dragRef.current.startX;
        const deltaY = e.touches[0].clientY - dragRef.current.startY;
        updatePosition(deltaX, deltaY);
        dispatchMoveEvent();
    };

    const dispatchMoveEvent = () => {
        if (typeof window !== 'undefined') {
            const event = new CustomEvent('window-move', { detail: { id: windowId } });
            window.dispatchEvent(event);
        }
    };

    const updatePosition = (dx: number, dy: number) => {
        const currentDrag = dragRef.current;
        if (!currentDrag) return;
        setWinState(prev => ({ ...prev, x: currentDrag.initialWinState.x + dx, y: currentDrag.initialWinState.y + dy }));
    };

    const handleDragEnd = () => {
        dragRef.current = null;
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleDragEnd);
        document.removeEventListener('touchmove', handleTouchMove);
        document.removeEventListener('touchend', handleDragEnd);
    };
    
    if (!isOpen) return null;
    const zIndex = isMaximized ? 9999 : (isActive ? 60 : 50);
    const windowStyle = isMaximized ? { top: 0, left: 0, width: '100vw', height: '100vh', borderRadius: 0 } : { top: winState.y, left: winState.x, width: winState.width, height: winState.height, borderRadius: '0.75rem' };

    return (
        <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={isMinimized ? { scale: 0, opacity: 0, y: 500, pointerEvents: "none" } : { scale: 1, opacity: 1, y: 0, pointerEvents: "auto" }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{ position: 'fixed', ...windowStyle, zIndex }} 
            className={`window-snow-target shadow-2xl overflow-hidden flex flex-col bg-[#0F0F0F] border ${isActive ? 'border-white/20' : 'border-[#333]'}`}
            data-window-id={windowId}
            onMouseDownCapture={onFocus} onTouchStartCapture={onFocus}
        >
             <div className="h-9 bg-[#1a1a1a] flex items-center px-4 border-b border-[#333] select-none shrink-0" style={{ touchAction: 'none' }} onDoubleClick={() => setIsMaximized(!isMaximized)} onMouseDown={handleDragStart} onTouchStart={handleDragStart}>
                <div className="flex gap-2 mr-4 group" onMouseDown={(e) => e.stopPropagation()} onTouchStart={(e) => e.stopPropagation()}>
                    <div onClick={onClose} className="w-5 h-5 rounded-[4px] bg-white/5 hover:bg-red-600 border border-white/10 hover:border-red-500 transition-all cursor-pointer flex items-center justify-center group/btn"><X size={10} className="text-gray-400 group-hover/btn:text-white" /></div>
                    <div onClick={onMinimize} className="w-5 h-5 rounded-[4px] bg-white/5 hover:bg-yellow-500 border border-white/10 hover:border-yellow-400 transition-all cursor-pointer flex items-center justify-center group/btn"><Minus size={10} className="text-gray-400 group-hover/btn:text-white" /></div>
                    <div onClick={() => setIsMaximized(!isMaximized)} className="w-5 h-5 rounded-[4px] bg-white/5 hover:bg-green-600 border border-white/10 hover:border-green-500 transition-all cursor-pointer flex items-center justify-center group/btn">
                        {isMaximized ? <Minus size={10} className="text-gray-400 group-hover/btn:text-white rotate-45" /> : <Maximize2 size={10} className="text-gray-400 group-hover/btn:text-white" />}
                    </div>
                </div>
                <div className="flex-1 text-center text-xs text-gray-400 font-mono tracking-wide flex items-center justify-center gap-2 cursor-grab active:cursor-grabbing opacity-70">
                    <TerminalIcon size={12} className="text-red-500" /> {title}
                </div>
                <div className="w-20"></div>
            </div>
            <div className="flex-1 overflow-hidden relative bg-black cursor-default">
                {children}
            </div>
        </motion.div>
    );
};

// --- Main Page ---
export default function Home() {
  const pathname = usePathname();
  const [language, setLanguage] = useState<'mn' | 'en'>('mn');

  // Window States
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isContactMinimized, setIsContactMinimized] = useState(false);
  const [isAboutOpen, setIsAboutOpen] = useState(false);
  const [isAboutMinimized, setIsAboutMinimized] = useState(false);
  const [isCareersOpen, setIsCareersOpen] = useState(false);
  const [isCareersMinimized, setIsCareersMinimized] = useState(false);
  const [isGamesOpen, setIsGamesOpen] = useState(false);
  const [isGamesMinimized, setIsGamesMinimized] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isServicesMinimized, setIsServicesMinimized] = useState(false);
  const [isProjectsOpen, setIsProjectsOpen] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isHelpMinimized, setIsHelpMinimized] = useState(false);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isShutDown, setIsShutDown] = useState(false);

  // Toggle Handlers
  const toggleContact = () => { setActiveWindow('contact'); if (!isContactOpen) { setIsContactOpen(true); setIsContactMinimized(false); } else { isContactMinimized ? setIsContactMinimized(false) : setIsContactMinimized(true); } };
  const toggleAbout = () => { setActiveWindow('about'); if (!isAboutOpen) { setIsAboutOpen(true); setIsAboutMinimized(false); } else { isAboutMinimized ? setIsAboutMinimized(false) : setIsAboutMinimized(true); } };
  const toggleCareers = () => { setActiveWindow('careers'); if (!isCareersOpen) { setIsCareersOpen(true); setIsCareersMinimized(false); } else { isCareersMinimized ? setIsCareersMinimized(false) : setIsCareersMinimized(true); } };
  const toggleGames = () => { setActiveWindow('games'); if (!isGamesOpen) { setIsGamesOpen(true); setIsGamesMinimized(false); } else { isGamesMinimized ? setIsGamesMinimized(false) : setIsGamesMinimized(true); } };
  const toggleServices = () => { setActiveWindow('services'); if (!isServicesOpen) { setIsServicesOpen(true); setIsServicesMinimized(false); } else { isServicesMinimized ? setIsServicesMinimized(false) : setIsServicesMinimized(true); } };
  const toggleProjects = () => { setActiveWindow('projects'); if (!isProjectsOpen) { setIsProjectsOpen(true); setIsProjectsMinimized(false); } else { isProjectsMinimized ? setIsProjectsMinimized(false) : setIsProjectsMinimized(true); } };
  const toggleHelp = () => { setActiveWindow('help'); if (!isHelpOpen) { setIsHelpOpen(true); setIsHelpMinimized(false); } else { isHelpMinimized ? setIsHelpMinimized(false) : setIsHelpMinimized(true); } };

  const handleNewWindow = () => window.open('/', '_blank');
  
  const handleCloseAllWindows = () => {
      setIsContactOpen(false);
      setIsAboutOpen(false);
      setIsCareersOpen(false);
      setIsGamesOpen(false);
      setIsServicesOpen(false);
      setIsProjectsOpen(false);
      setIsHelpOpen(false);
  };
  const handleShutDown = () => setIsShutDown(true);

  // Audio Logic
  const hasPlayedRef = useRef(false);

  const playGreeting = () => {
      const audioFile = language === 'mn' ? '/mn.m4a' : '/en.m4a';
      const audio = new Audio(audioFile);
      audio.volume = 0.5;
      audio.play().catch(e => {
          console.log("Autoplay blocked, waiting for user interaction.", e);
      });
  };

  useEffect(() => {
    playGreeting();
  }, [language]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-center bg-cover font-sans selection:bg-red-500/30 selection:text-white"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1577046848358-4623c085f0ea?q=80&w=2670&auto=format&fit=crop')` }} 
    >
      {/* WINTER OVERLAY (Snow logic: z-40 and z-100) */}
      <WinterOverlay />

      {/* FIREWORKS (Behind the tree: z-5) */}
      <CodeFireworks />

      {/* SHUTDOWN OVERLAY */}
      {isShutDown && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} 
            className="fixed inset-0 z-[9999] bg-black flex items-center justify-center text-white"
          >
              <div className="text-center">
                  <Apple size={48} className="mx-auto mb-4 text-gray-500" />
                  <p>Shutting Down...</p>
                  <p className="text-xs text-gray-600 mt-2">See you next year!</p>
              </div>
          </motion.div>
      )}

      <div className="absolute inset-0 bg-black/40 pointer-events-none" />

      <TopBar 
        onOpenContact={toggleContact} onOpenAbout={toggleAbout} onOpenCareers={toggleCareers} onOpenGames={toggleGames} onOpenServices={toggleServices} onOpenProjects={toggleProjects}
        onOpenHelp={toggleHelp} onNewWindow={handleNewWindow} onCloseAllWindows={handleCloseAllWindows} onShutDown={handleShutDown}
        language={language} setLanguage={setLanguage}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-20 gap-2">
        
        {/* Adjusted Margin Top (mt-10) */}
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden relative mt-10 z-10">
           <div className="absolute top-0 right-0 p-2"><Snowflake className="text-white/20" size={40} /></div>
           <div className="p-6 text-center">
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg flex items-center justify-center gap-3">
               AndSoft LLC
            </h1>
            <p className="text-gray-300 font-light">
                {language === 'mn' ? 'Ирээдүйн системийг' : 'Build'} <span className="text-red-400 font-semibold">{language === 'mn' ? 'Бүтээцгээе.' : 'Future'}</span> {language === 'en' && 'Systems.'}
            </p>
            <div 
                className="mt-4 inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-600/30 animate-pulse cursor-pointer hover:bg-red-600/30 transition-colors"
                onClick={playGreeting} 
            >
                <Trees size={12} /> {language === 'mn' ? 'Шинэ жилийн мэнд!' : 'Happy New Year!'} <Gift size={12} />
            </div>
          </div>
        </motion.div>
        
        {/* --- IMPROVED TREE POSITION --- */}
        <div className="relative z-20 scale-100 md:scale-100 -mt-10 md:-mt-22 mb-12">
            <CodeChristmasTree />
        </div>

      </div>

      {/* --- WINDOWS --- */}
      <AnimatePresence>
        {isContactOpen && <MacWindow title={language === 'mn' ? "Холбоо барих" : "Contact Us"} isOpen={isContactOpen} isMinimized={isContactMinimized} isActive={activeWindow === 'contact'} onFocus={() => setActiveWindow('contact')} onClose={() => setIsContactOpen(false)} onMinimize={() => setIsContactMinimized(true)}><div className="w-full h-full overflow-y-auto"><TerminalContact language={language} /></div></MacWindow>}
        {isAboutOpen && <MacWindow title={language === 'mn' ? "Бидний тухай" : "About Us"} isOpen={isAboutOpen} isMinimized={isAboutMinimized} isActive={activeWindow === 'about'} onFocus={() => setActiveWindow('about')} onClose={() => setIsAboutOpen(false)} onMinimize={() => setIsAboutMinimized(true)}><div className="w-full h-full overflow-hidden"><AboutContent language={language} /></div></MacWindow>}
        {isCareersOpen && <MacWindow title={language === 'mn' ? "Ажлын байр" : "Careers"} isOpen={isCareersOpen} isMinimized={isCareersMinimized} isActive={activeWindow === 'careers'} onFocus={() => setActiveWindow('careers')} onClose={() => setIsCareersOpen(false)} onMinimize={() => setIsCareersMinimized(true)}><div className="w-full h-full overflow-hidden"><CareersContent language={language} /></div></MacWindow>}
        {isGamesOpen && <MacWindow title={language === 'mn' ? "Тоглоом" : "Games Arcade"} isOpen={isGamesOpen} isMinimized={isGamesMinimized} isActive={activeWindow === 'games'} onFocus={() => setActiveWindow('games')} onClose={() => setIsGamesOpen(false)} onMinimize={() => setIsGamesMinimized(true)}><div className="w-full h-full overflow-hidden"><GamesContent language={language} /></div></MacWindow>}
        {isServicesOpen && <MacWindow title={language === 'mn' ? "Үйлчилгээ" : "Services"} isOpen={isServicesOpen} isMinimized={isServicesMinimized} isActive={activeWindow === 'services'} onFocus={() => setActiveWindow('services')} onClose={() => setIsServicesOpen(false)} onMinimize={() => setIsServicesMinimized(true)}><div className="w-full h-full overflow-hidden"><ServicesContent language={language} /></div></MacWindow>}
        {isProjectsOpen && <MacWindow title={language === 'mn' ? "Төслүүд" : "Projects"} isOpen={isProjectsOpen} isMinimized={isProjectsMinimized} isActive={activeWindow === 'projects'} onFocus={() => setActiveWindow('projects')} onClose={() => setIsProjectsOpen(false)} onMinimize={() => setIsProjectsMinimized(true)}><div className="w-full h-full overflow-hidden"><ProjectsContent language={language} /></div></MacWindow>}
        {isHelpOpen && <MacWindow title={language === 'mn' ? "Тусламж" : "Help Center"} isOpen={isHelpOpen} isMinimized={isHelpMinimized} isActive={activeWindow === 'help'} onFocus={() => setActiveWindow('help')} onClose={() => setIsHelpOpen(false)} onMinimize={() => setIsHelpMinimized(true)}><div className="w-full h-full overflow-hidden"><HelpTerminal language={language} /></div></MacWindow>}
      </AnimatePresence>

      {/* --- DOCK --- */}
      {/* Z-30: Put behind WinterOverlay(z-40) and Windows(z-50) */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[30]">
        <div className="flex items-end gap-2 md:gap-3 px-3 pb-2 pt-2 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <DockIcon icon={User} label={language === 'mn' ? 'Бидний тухай' : 'About Us'} color="bg-gradient-to-br from-indigo-500 to-blue-600" onClick={toggleAbout} isActive={isAboutOpen} />
          <DockIcon icon={FolderGit2} label={language === 'mn' ? 'Төслүүд' : 'Projects'} color="bg-gradient-to-br from-blue-500 to-cyan-500" onClick={toggleProjects} isActive={isProjectsOpen} />
          <DockIcon icon={Gamepad2} label={language === 'mn' ? 'Тоглоом' : 'Games'} color="bg-gradient-to-br from-purple-500 to-pink-500" onClick={toggleGames} isActive={isGamesOpen} />
          <DockIcon icon={Layers} label={language === 'mn' ? 'Үйлчилгээ' : 'Services'} color="bg-gradient-to-br from-orange-400 to-red-500" onClick={toggleServices} isActive={isServicesOpen} />
          <div className="w-[1px] h-8 bg-white/20 mx-1 mb-2" />
          <DockIcon icon={Briefcase} label={language === 'mn' ? 'Ажлын байр' : 'Careers'} color="bg-gradient-to-br from-teal-400 to-teal-600" onClick={toggleCareers} isActive={isCareersOpen} />
          <DockIcon icon={Mail} label={language === 'mn' ? 'Холбоо барих' : 'Contact'} color="bg-gradient-to-br from-green-400 to-emerald-600" onClick={toggleContact} isActive={isContactOpen} />
        </div>
      </div>
    </main>
  );
}

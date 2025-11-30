"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { usePathname } from 'next/navigation'; // <--- ЭНИЙГ НЭМСЭН (Алдаа засагдсан)
import Keypad from '@/components/Keypad';
import TerminalContact from '@/components/TerminalContact';
import HelpTerminal from '@/components/HelpTerminal';
import AboutContent from '@/components/AboutContent';
import CareersContent from '@/components/CareersContent';
import GamesContent from '@/components/GamesContent';
import ServicesContent from '@/components/ServicesContent';
import ProjectsContent from '@/components/ProjectsContent';
import WinterOverlay from '@/components/WinterOverlay'; // Цасны эффект
import { 
  Search, Command, Apple, User, Briefcase, Mail, Layers, LucideIcon, 
  Gamepad2, Terminal as TerminalIcon, X, Minus, Maximize2, Globe, FolderGit2,
  Snowflake, Gift, Trees 
} from 'lucide-react';

// --- Types ---
type MenuItemType = {
  label: string;
  shortcut?: string;
  action?: () => void;
};

// --- 1. Top Menu Bar (Festive Edition) ---
const TopBar = ({ 
  onOpenContact, onOpenAbout, onOpenCareers, onOpenGames, onOpenServices, onOpenProjects,
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
        {/* --- DECORATION: Holiday Garland --- */}
        <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x z-[-1] opacity-90" 
             style={{ 
                 background: 'linear-gradient(to bottom, #8b0000, #500000)',
                 borderBottom: '2px solid #d4af37'
             }} 
        />
        {/* Decorative Hanging Balls */}
        <div className="absolute -bottom-2 left-0 w-full flex justify-around px-10 pointer-events-none opacity-80">
             {Array.from({length: 8}).map((_, i) => (
                 <div key={i} className={`w-2 h-2 rounded-full shadow-lg ${i % 2 === 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ marginTop: i % 2 === 0 ? '2px' : '5px' }}></div>
             ))}
        </div>

        {/* --- MAIN BAR --- */}
        <div className="w-full h-8 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-2 md:px-4 text-gray-300 text-xs font-medium border-b border-white/5 shadow-sm select-none relative">
            <div className="flex items-center gap-2 md:gap-4 h-full" ref={menuRef}>
                <div className="relative h-full flex items-center">
                    <div 
                        className={`flex items-center gap-2 cursor-pointer px-2 h-full rounded hover:bg-white/10 ${activeMenu === 'apple' ? 'bg-white/10' : ''}`}
                        onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}
                    >
                        {/* --- LOGO: Santa Hat Style --- */}
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

const DockIcon = ({ icon: Icon, label, onClick, color, isActive }: { icon: LucideIcon, label: string, onClick?: () => void, color: string, isActive?: boolean }) => {
  return (
      <motion.div 
        className="group relative flex flex-col items-center gap-1 cursor-pointer" 
        whileHover={{ scale: 1.2, y: -10 }} 
        whileTap={{ scale: 0.9 }} 
        transition={{ type: "spring", stiffness: 300, damping: 20 }} 
        onClick={onClick}
      >
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/10 ${color} relative overflow-hidden`}>
           <Icon color="white" size={24} strokeWidth={1.5} />
           {/* --- HOLIDAY DECORATION ON ICON --- */}
           <div className="absolute top-0 right-0 p-0.5 opacity-80 animate-pulse">
              <Snowflake size={10} className="text-white fill-white" />
           </div>
        </div>
        <div className={`w-1 h-1 bg-white rounded-full mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
        <span className="absolute -top-10 bg-[#1a1a1a]/90 backdrop-blur text-gray-200 text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50">
          {label}
        </span>
      </motion.div>
  );
};

// --- 3. MacWindow ---
const MacWindow = ({ title, onClose, onMinimize, onFocus, isActive, children, isOpen, isMinimized }: { title: string, onClose: () => void, onMinimize: () => void, onFocus: () => void, isActive: boolean, children: React.ReactNode, isOpen: boolean, isMinimized: boolean }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [winState, setWinState] = useState({ x: 20, y: 80, width: 350, height: 500 });
    const dragRef = useRef<{ startX: number, startY: number, initialWinState: typeof winState } | null>(null);

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
    };

    const handleTouchMove = (e: TouchEvent) => {
        if (!dragRef.current) return;
        if (e.cancelable) e.preventDefault(); 
        const deltaX = e.touches[0].clientX - dragRef.current.startX;
        const deltaY = e.touches[0].clientY - dragRef.current.startY;
        updatePosition(deltaX, deltaY);
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

    const handleResizeStart = (e: React.MouseEvent, direction: string) => {
        if (isMaximized) return; 
        e.preventDefault(); e.stopPropagation();
        onFocus(); 
        const startX = e.clientX; const startY = e.clientY; const startRect = { ...winState };
        const onResizeMove = (moveEvent: MouseEvent) => {
            const deltaX = moveEvent.clientX - startX; const deltaY = moveEvent.clientY - startY;
            let newWidth = startRect.width; let newHeight = startRect.height; let newX = startRect.x; let newY = startRect.y;
            if (direction.includes('e')) newWidth = Math.max(300, startRect.width + deltaX);
            if (direction.includes('s')) newHeight = Math.max(200, startRect.height + deltaY);
            if (direction.includes('w')) { const w = Math.max(300, startRect.width - deltaX); newX = startRect.x + (startRect.width - w); newWidth = w; }
            if (direction.includes('n')) { const h = Math.max(200, startRect.height - deltaY); newY = startRect.y + (startRect.height - h); newHeight = h; }
            setWinState({ x: newX, y: newY, width: newWidth, height: newHeight });
        };
        const onResizeUp = () => { document.removeEventListener('mousemove', onResizeMove); document.removeEventListener('mouseup', onResizeUp); };
        document.addEventListener('mousemove', onResizeMove); document.addEventListener('mouseup', onResizeUp);
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
            className={`shadow-2xl overflow-hidden flex flex-col bg-[#0F0F0F] border ${isActive ? 'border-white/20' : 'border-[#333]'}`}
            onMouseDownCapture={onFocus} onTouchStartCapture={onFocus}
        >
            {!isMaximized && (
                <>
                    <div className="absolute top-0 left-0 w-full h-4 cursor-n-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'n')} />
                    <div className="absolute bottom-0 left-0 w-full h-4 cursor-s-resize z-50" onMouseDown={(e) => handleResizeStart(e, 's')} />
                    <div className="absolute top-0 left-0 h-full w-4 cursor-w-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'w')} />
                    <div className="absolute top-0 right-0 h-full w-4 cursor-e-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'e')} />
                    <div className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'nw')} />
                    <div className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'ne')} />
                    <div className="absolute bottom-0 left-0 w-6 h-6 cursor-sw-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'sw')} />
                    <div className="absolute bottom-0 right-0 w-6 h-6 cursor-se-resize z-50" onMouseDown={(e) => handleResizeStart(e, 'se')} />
                </>
            )}
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
}

// --- Main Page ---
export default function Home() {
  const pathname = usePathname(); // <--- ALDAA ZASAGDSAN
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

  // Actions
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

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-center bg-cover font-sans selection:bg-red-500/30 selection:text-white"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1577046848358-4623c085f0ea?q=80&w=2670&auto=format&fit=crop')` }} 
    >
      {/* WINTER OVERLAY 
         (Энэ компонент нь таны хүссэн цас зузаарах болон гулсах эффектийг үзүүлнэ)
      */}
      <WinterOverlay />

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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-20 gap-10">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden pointer-events-none relative">
           <div className="absolute top-0 right-0 p-2"><Snowflake className="text-white/20" size={40} /></div>
           <div className="p-6 text-center">
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg flex items-center justify-center gap-3">
               AndSoft LLC
            </h1>
            <p className="text-gray-300 font-light">
                {language === 'mn' ? 'Ирээдүйн системийг' : 'Build'} <span className="text-red-400 font-semibold">{language === 'mn' ? 'Бүтээцгээе.' : 'Future'}</span> {language === 'en' && 'Systems.'}
            </p>
            <div className="mt-4 inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-600/30 animate-pulse">
                <Trees size={12} /> {language === 'mn' ? 'Шинэ жилийн мэнд!' : 'Happy New Year!'} <Gift size={12} />
            </div>
          </div>
        </motion.div>
        <div className="relative z-10 scale-90 md:scale-100">
            <Keypad />
            <p className="text-center text-white/50 text-xs mt-6 font-mono tracking-widest uppercase">
                {language === 'mn' ? 'Удирдах хэсэг' : 'Navigation Control'}
            </p>
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
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[70]">
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
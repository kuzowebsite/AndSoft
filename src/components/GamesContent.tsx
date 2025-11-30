"use client";

import React, { useState, useRef, useEffect } from 'react';
import { 
  Gamepad2, Play, Star, ChevronLeft, Search, 
  Trophy, Flame, Zap, LayoutGrid, Maximize, Minimize, Brain 
} from 'lucide-react';

// --- Types ---
type Game = {
  id: number;
  title: string;
  category: string;
  image: string;
  url: string; 
  rating: number;
  players: string;
};

// --- Mock Data (UPDATED WITH MORE GAMES) ---
const GAMES_DATA: Game[] = [
  // 1. Зугтаагаарай
  { 
    id: 2, 
    title: "Зугтаагаарай", 
    category: "Arcade", 
    image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=500&h=300&fit=crop", 
    url: "/games/zugtaagaarai/index.html", 
    rating: 5.0, 
    players: "HOT"
  },
  // 3. LITTLE ALCHEMY 2
  { 
    id: 3, 
    title: "Little Alchemy 2", 
    category: "Simulation", 
    image: "https://images.unsplash.com/photo-1614294149010-950b698f72c0?w=500&h=300&fit=crop", 
    url: "https://littlealchemy2.com/", 
    rating: 4.9, 
    players: "3M+" 
  },

  // 5. TETRIS (React Version)
  { 
    id: 5, 
    title: "Tetris", 
    category: "Puzzle", 
    image: "https://images.unsplash.com/photo-1574360790664-672049533f81?w=500&h=300&fit=crop", 
    url: "https://chvin.github.io/react-tetris/", 
    rating: 4.7, 
    players: "Legend" 
  },
  // 6. FLAPPY BIRD
  { 
    id: 6, 
    title: "Flappy Bird", 
    category: "Arcade", 
    image: "https://images.unsplash.com/photo-1555864326-5cf22ef123cf?w=500&h=300&fit=crop", 
    url: "https://nebezb.com/floppybird/", 
    rating: 4.6, 
    players: "Hard" 
  },
  // 7. CHROME DINO
  { 
    id: 7, 
    title: "Chrome Dino", 
    category: "Arcade", 
    image: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?w=500&h=300&fit=crop", 
    url: "https://chromedino.com/", 
    rating: 4.9, 
    players: "Offline" 
  },
];

const CATEGORIES = [
  { id: 'all', label: { mn: 'Бүгд', en: 'All' }, icon: LayoutGrid },
  { id: 'Action', label: { mn: 'Тулаант', en: 'Action' }, icon: Flame },
  { id: 'Puzzle', label: { mn: 'Оюун ухаан', en: 'Puzzle' }, icon: Zap },
  { id: 'Arcade', label: { mn: 'Аркад', en: 'Arcade' }, icon: Gamepad2 },
  { id: 'Simulation', label: { mn: 'Симуляци', en: 'Simulation' }, icon: Brain },
  { id: 'Sports', label: { mn: 'Спорт', en: 'Sports' }, icon: Trophy },
];

const GamesContent = ({ language }: { language: 'mn' | 'en' }) => {
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Game Container Ref for Fullscreen
  const gameContainerRef = useRef<HTMLDivElement>(null);

  const filteredGames = GAMES_DATA.filter(game => {
    const matchesCategory = activeCategory === 'all' || game.category === activeCategory;
    const matchesSearch = game.title.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const t = {
    mn: { search: "Тоглоом хайх...", popular: "Эрэлттэй тоглоомууд", play: "Тоглох", playing: "Тоглож байна:", back: "Буцах", loading: "Тоглоомыг ачааллаж байна..." },
    en: { search: "Search games...", popular: "Popular Games", play: "Play Now", playing: "Playing:", back: "Back to Store", loading: "Loading Game..." }
  };
  const txt = language === 'mn' ? t.mn : t.en;

  // --- Fullscreen Logic ---
  const toggleFullScreen = () => {
    if (!gameContainerRef.current) return;

    if (!document.fullscreenElement) {
      gameContainerRef.current.requestFullscreen().then(() => {
        setIsFullscreen(true);
      }).catch(err => {
        console.error(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
      });
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  return (
    <>
      <style jsx global>{`
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
      `}</style>

      <div className="flex h-full w-full bg-[#0b0b0b] text-gray-300 font-sans selection:bg-purple-500/30 selection:text-white">
        
        {/* 1. SIDEBAR */}
        <div className={`w-64 bg-[#111] border-r border-[#222] flex-col hidden md:flex ${selectedGame ? 'hidden' : 'flex'}`}>
          <div className="p-6 border-b border-[#222]">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Gamepad2 className="text-purple-500" /> Arcade
            </h2>
          </div>
          <div className="p-4 space-y-2 overflow-y-auto mac-scrollbar">
            {CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                  activeCategory === cat.id 
                    ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/20' 
                    : 'text-gray-400 hover:bg-[#1a1a1a] hover:text-white'
                }`}
              >
                <cat.icon size={18} />
                <span className="font-medium">{language === 'mn' ? cat.label.mn : cat.label.en}</span>
              </button>
            ))}
          </div>
        </div>

        {/* 2. MAIN CONTENT */}
        <div className="flex-1 flex flex-col h-full overflow-hidden relative">
          
          {!selectedGame ? (
            <>
              {/* Store Header */}
              <div className="p-6 border-b border-[#222] flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0F0F0F]/95 backdrop-blur z-10 sticky top-0">
                <h2 className="text-lg font-bold text-white md:hidden flex items-center gap-2">
                   <Gamepad2 className="text-purple-500" /> Arcade
                </h2>
                <div className="flex md:hidden w-full overflow-x-auto gap-2 pb-2 mac-scrollbar">
                   {CATEGORIES.map(cat => (
                      <button 
                          key={cat.id} 
                          onClick={() => setActiveCategory(cat.id)}
                          className={`whitespace-nowrap px-3 py-1 rounded-full text-xs font-bold border ${
                              activeCategory === cat.id ? 'bg-purple-600 border-purple-500 text-white' : 'border-[#333] text-gray-400'
                          }`}
                      >
                          {language === 'mn' ? cat.label.mn : cat.label.en}
                      </button>
                   ))}
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input 
                    type="text" 
                    placeholder={txt.search}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-[#1a1a1a] border border-[#333] rounded-full py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-purple-500 transition-colors"
                  />
                </div>
              </div>

              {/* Game Grid */}
              <div className="flex-1 overflow-y-auto p-6 mac-scrollbar">
                <h3 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
                  <Star className="text-yellow-500 fill-yellow-500" size={18} /> {txt.popular}
                </h3>
                
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {filteredGames.map((game) => (
                    <div 
                      key={game.id}
                      className="group bg-[#161616] rounded-xl overflow-hidden border border-[#222] hover:border-purple-500/50 hover:shadow-[0_0_20px_rgba(168,85,247,0.2)] transition-all cursor-pointer relative"
                      onClick={() => setSelectedGame(game)}
                    >
                      <div className="aspect-video w-full overflow-hidden relative">
                        <img src={game.image} alt={game.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center shadow-lg transform scale-50 group-hover:scale-100 transition-transform">
                              <Play fill="white" className="ml-1 text-white" />
                          </div>
                        </div>
                      </div>
                      <div className="p-3 md:p-4">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="text-white font-bold truncate pr-2 group-hover:text-purple-400 transition-colors">{game.title}</h4>
                          <span className="text-xs bg-[#222] px-1.5 py-0.5 rounded text-gray-400">{game.rating}★</span>
                        </div>
                        <p className="text-xs text-gray-500 mb-2">{game.category}</p>
                        <div className="text-[10px] text-gray-600 flex items-center gap-1">
                          <div className={`w-1.5 h-1.5 rounded-full ${game.id < 3 ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
                          {game.players} playing
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {filteredGames.length === 0 && <div className="text-center py-20 opacity-50">No games found.</div>}
              </div>
            </>
          ) : (
            /* --- GAME PLAYER VIEW --- */
            <div ref={gameContainerRef} className="flex flex-col h-full bg-black w-full relative">
              
              {/* Player Header */}
              <div className={`h-12 bg-[#111] border-b border-[#222] flex items-center justify-between px-4 shrink-0 transition-opacity ${isFullscreen ? 'opacity-0 hover:opacity-100 absolute top-0 left-0 w-full z-50 bg-black/80 backdrop-blur' : ''}`}>
                  <div className="flex items-center gap-4">
                      <button onClick={() => { 
                          if (isFullscreen && document.exitFullscreen) document.exitFullscreen();
                          setSelectedGame(null); 
                      }} className="flex items-center gap-2 text-sm font-bold text-gray-400 hover:text-white transition-colors">
                          <ChevronLeft size={18} /> {txt.back}
                      </button>
                      <div className="h-4 w-[1px] bg-[#333]" />
                      <span className="text-white font-bold flex items-center gap-2">
                          <Gamepad2 size={16} className="text-purple-500" />
                          {selectedGame.title}
                      </span>
                  </div>

                  {/* Fullscreen Button */}
                  <button 
                    onClick={toggleFullScreen}
                    className="p-2 hover:bg-white/10 rounded-lg text-gray-400 hover:text-white transition-colors"
                    title="Toggle Fullscreen"
                  >
                    {isFullscreen ? <Minimize size={20} /> : <Maximize size={20} />}
                  </button>
              </div>
              
              {/* --- GAME AREA (Iframe) --- */}
              <div className="flex-1 relative bg-[#050505] flex items-center justify-center overflow-hidden w-full h-full">
                  <iframe 
                    src={selectedGame.url} 
                    title={selectedGame.title} 
                    className="w-full h-full border-none" 
                    allow="autoplay; fullscreen; gamepad; accelerometer; gyroscope" 
                  />
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default GamesContent;
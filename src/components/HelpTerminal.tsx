"use client";

import React, { useState, useRef, useEffect } from 'react';

// --- Types ---
// "error" төрлийг энд нэмж өгснөөр алдаа арилна
type LogType = 'system' | 'user' | 'admin' | 'info' | 'error';

const HelpTerminal = ({ language }: { language: 'mn' | 'en' }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [inputVal, setInputVal] = useState('');
  // State төрлийг шинэчилсэн
  const [history, setHistory] = useState<{ type: LogType, text: string }[]>([]);
  const [mode, setMode] = useState<'command' | 'chat'>('command');

  const t = {
    mn: {
      welcome: "AndSoft Help Center v1.0",
      intro: "Тусламжын төвд тавтай морил. Доорх командуудыг ашиглана уу.",
      commandsList: "Командууд: 'guide' (Заавар), 'faq' (Асуулт), 'chat' (Админтай холбогдох), 'clear'",
      guide: "ЗААВАР:\n1. 'Start' цэс болон 'Dock' ашиглан цонхнуудыг нээнэ.\n2. Цонхыг чирж, зөөж, хэмжээг өөрчилж болно.\n3. 'Help' цэснээс холбоо барих боломжтой.",
      faq: "ТҮГЭЭМЭЛ АСУУЛТ:\nQ: Танайх ямар үйлчилгээ үзүүлдэг вэ?\nA: Вэб, Апп, Систем хөгжүүлэлт.\nQ: Үнийн санал яаж авах вэ?\nA: 'Холбоо барих' цонхыг ашиглан мэдээллээ илгээнэ үү.",
      chatStart: "--- АДМИНТАЙ ЧАТЛАХ ГОРИМ ИДЭВХЖЛЭЭ ---\n(Гарах бол 'exit' гэж бичнэ үү)\nСайн байна уу? Танд юугаар туслах вэ?",
      chatExit: "--- ЧАТ ДУУСЛАА ---",
      adminName: "Админ"
    },
    en: {
      welcome: "AndSoft Help Center v1.0",
      intro: "Welcome to Help Center. Use commands below.",
      commandsList: "Commands: 'guide', 'faq', 'chat' (Live Support), 'clear'",
      guide: "GUIDE:\n1. Use TopBar and Dock to navigate.\n2. Windows are draggable and resizable.\n3. Contact us via 'Contact' app.",
      faq: "FAQ:\nQ: What services do you offer?\nA: Web, App, and System development.\nQ: How to get a quote?\nA: Use the 'Contact' window.",
      chatStart: "--- LIVE CHAT ACTIVATED ---\n(Type 'exit' to quit)\nHello! How can I help you today?",
      chatExit: "--- CHAT ENDED ---",
      adminName: "Admin"
    }
  };
  const txt = language === 'mn' ? t.mn : t.en;

  // Auto Scroll
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  // Init
  useEffect(() => {
    const initTimer = setTimeout(() => {
        setHistory([
            { type: 'info', text: txt.welcome },
            { type: 'system', text: txt.intro },
            { type: 'info', text: txt.commandsList },
        ]);
        inputRef.current?.focus();
    }, 500);
    return () => clearTimeout(initTimer);
  }, [language, txt]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!inputVal.trim()) return;
      
      const val = inputVal.trim();
      const lowerVal = val.toLowerCase();
      
      setHistory(prev => [...prev, { type: 'user', text: val }]);
      setInputVal('');

      // --- CHAT MODE ---
      if (mode === 'chat') {
        if (lowerVal === 'exit' || lowerVal === 'гарах') {
            setMode('command');
            setHistory(prev => [...prev, { type: 'system', text: txt.chatExit }]);
        } else {
            setTimeout(() => {
                setHistory(prev => [...prev, { type: 'admin', text: language === 'mn' ? "Ойлголоо, бид шалгаж байна..." : "Understood, let me check that..." }]);
            }, 1000);
        }
        return;
      }

      // --- COMMAND MODE ---
      if (lowerVal === 'clear') {
        setHistory([]);
      } else if (lowerVal === 'guide' || lowerVal === 'заавар') {
        setHistory(prev => [...prev, { type: 'system', text: txt.guide }]);
      } else if (lowerVal === 'faq' || lowerVal === 'асуулт') {
        setHistory(prev => [...prev, { type: 'system', text: txt.faq }]);
      } else if (lowerVal === 'chat' || lowerVal === 'чат') {
        setMode('chat');
        setHistory(prev => [...prev, { type: 'system', text: txt.chatStart }]);
      } else {
        // Одоо 'error' төрлийг зөвшөөрнө
        setHistory(prev => [...prev, { type: 'error', text: `Command not found: ${val}` }]);
      }
    }
  };

  return (
    <>
      <style jsx global>{`
        /* Mac Scrollbar Style (Consistent with others) */
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
      `}</style>

      <div className="flex flex-col w-full h-full bg-[#1a1a1a] text-sm font-mono p-4" onClick={() => inputRef.current?.focus()}>
        {/* Added mac-scrollbar class here */}
        <div className="flex-1 overflow-y-auto space-y-2 pb-4 mac-scrollbar" ref={scrollRef}>
          {history.map((h, i) => (
              <div key={i} className={`whitespace-pre-wrap break-words ${
                  h.type === 'error' ? 'text-red-400' :
                  h.type === 'info' ? 'text-blue-400' :
                  h.type === 'admin' ? 'text-yellow-400' :
                  h.type === 'user' ? 'text-white' : 'text-green-400'
              }`}>
                  {h.type === 'user' && <span className="text-gray-500 mr-2">guest@andsoft:~$</span>}
                  {h.type === 'admin' && <span className="text-yellow-500 mr-2 font-bold">{txt.adminName}:</span>}
                  {h.text}
              </div>
          ))}
        </div>
        <div className="flex items-center border-t border-gray-700 pt-2 shrink-0">
          <span className="text-gray-500 mr-2">{mode === 'chat' ? 'chat@admin:~$' : 'guest@andsoft:~$'}</span>
          <input 
              ref={inputRef}
              type="text" 
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none text-white font-mono"
              autoFocus
              spellCheck={false}
              autoComplete="off"
          />
        </div>
      </div>
    </>
  );
};

export default HelpTerminal;
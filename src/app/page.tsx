"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

// Component imports
import TerminalContact from '@/components/TerminalContact';
import HelpTerminal from '@/components/HelpTerminal';
import CareersContent from '@/components/CareersContent';
import GamesContent from '@/components/GamesContent';
import ServicesContent from '@/components/ServicesContent';
import ProjectsContent from '@/components/ProjectsContent';
import WinterOverlay from '@/components/WinterOverlay';

// Icon imports
import { 
  Apple, User, Briefcase, Mail, Layers, LucideIcon, 
  Gamepad2, Terminal as TerminalIcon, X, Minus, Maximize2, Globe, FolderGit2,
  Snowflake, Gift, Trees, Code2, Coffee, Atom, FileCode2, Hash, Braces, 
  Wind, Cpu, Database, Command, Sparkles, Clock,
  Download, Search, Calendar, Server, Rocket, Palette, LineChart, ExternalLink,
  Cloud, TerminalSquare, Layout
} from 'lucide-react';

// --- DATA CONSTANTS ---
const TEAM_MEMBERS = [
  { id: 1, role: "Frontend Dev", img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop" },
  { id: 2, role: "Backend Dev", img: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop" },
  { id: 3, role: "Data Analyst", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop" },
  { id: 4, role: "UI/UX Designer", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop" },
];

const PARTNERS = [
  { id: 1, name: "Бичил Глобус ББСБ", logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3dab?w=300&h=300&fit=crop", url: "https://bichilglobus.mn" },
  { id: 2, name: "Nexora LLC", logo: "https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=300&h=300&fit=crop", url: "#" },
  { id: 3, name: "Mind LLC", logo: "https://images.unsplash.com/photo-1516876437184-593fda40c7ce?w=300&h=300&fit=crop", url: "#" },
  { id: 4, name: "Huchtn LLC", logo: "https://images.unsplash.com/photo-1568952433726-3896e3881c65?w=300&h=300&fit=crop", url: "#" },
];

const TECH_STACK = [
    { name: "React", icon: Atom },
    { name: "Next.js", icon: Wind },
    { name: "TypeScript", icon: FileCode2 },
    { name: "Node.js", icon: Server },
    { name: "Python", icon: Code2 },
    { name: "PostgreSQL", icon: Database },
    { name: "AWS", icon: Cloud },
    { name: "Tailwind", icon: Palette },
];

// --- Types ---
type MenuItemType = {
  label: string;
  shortcut?: string;
  action?: () => void;
};

// --- COMPONENT: About Content ---
const AboutContent = ({ language }: { language: 'mn' | 'en' }) => {
  const t = {
    mn: {
      subtitle: "Технологийн шийдлээр ирээдүйг бүтээнэ.",
      historyTitle: "Бидний түүх",
      historyText: "AndSoft LLC нь 2023 онд технологийн салбарт шинэлэг шийдэл нэвтрүүлэх зорилготойгоор анх үйл ажиллагаагаа эхлүүлсэн. 2025 онд Монгол Улсын хуулийн дагуу албан ёсны бүртгэлтэй компани болон өргөжиж, харилцагчиддаа илүү найдвартай үйлчилгээг үзүүлж байна.",
      leadersTitle: "Удирдлага",
      teamTitle: "Манай баг",
      techTitle: "Технологийн Чадамж",
      partnersTitle: "Хамтрагч байгууллагууд",
      roleCEO: "Гүйцтгэх захирал",
      roleDeputy: "Дэд захирал",
      founder: "Үүсгэн байгуулагч"
    },
    en: {
      subtitle: "Building the future with technology.",
      historyTitle: "Our History",
      historyText: "AndSoft LLC started in 2023 with a mission to bring innovative tech solutions. In 2025, we became an officially registered company in Mongolia, expanding our services to deliver reliability and quality.",
      leadersTitle: "Leadership",
      teamTitle: "Our Team",
      techTitle: "Tech Capabilities",
      partnersTitle: "Partners",
      roleCEO: "CEO",
      roleDeputy: "Deputy Director",
      founder: "Co-Founder"
    }
  };

  const content = language === 'mn' ? t.mn : t.en;

  return (
    <>
      <style jsx global>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          display: flex;
          width: max-content;
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
      `}</style>

      <div className="bg-[#0a0a0a] text-gray-300 h-full w-full overflow-y-auto font-sans selection:bg-blue-500/30 selection:text-white mac-scrollbar">
        
        <div className="relative py-16 flex flex-col items-center text-center border-b border-white/5 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] mb-6">
              <span className="text-5xl font-bold text-white">A</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">AndSoft LLC</h1>
          <p className="text-blue-400 font-medium tracking-wide text-sm uppercase">{content.subtitle}</p>
        </div>

        <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-16">

          {/* History Section */}
          <section className="glass-card p-8 rounded-2xl relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-1 h-full bg-blue-600/50 group-hover:bg-blue-500 transition-colors" />
            <div className="flex items-center gap-3 mb-4">
                <Rocket className="text-blue-500" size={24} />
                <h2 className="text-xl font-bold text-white">{content.historyTitle}</h2>
            </div>
            <p className="leading-relaxed text-gray-400 text-sm md:text-base text-justify">
                {content.historyText}
            </p>
          </section>

          {/* Leadership Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
                <Briefcase className="text-cyan-500" size={24} />
                <h2 className="text-xl font-bold text-white">{content.leadersTitle}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:bg-white/5 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden border-2 border-blue-500/30 group-hover:border-blue-500 transition-colors">
                        <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400" alt="CEO" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Серикбай</h3>
                        <p className="text-xs text-blue-400 uppercase font-bold mb-1">{content.roleCEO}</p>
                        <p className="text-xs text-gray-500">{content.founder}</p>
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl flex items-center gap-5 hover:bg-white/5 transition-all group">
                    <div className="w-16 h-16 rounded-full bg-gray-800 overflow-hidden border-2 border-cyan-500/30 group-hover:border-cyan-500 transition-colors">
                        <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400" alt="Deputy" className="w-full h-full object-cover" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-white">Бат-Ирээдүй</h3>
                        <p className="text-xs text-cyan-400 uppercase font-bold mb-1">{content.roleDeputy}</p>
                        <p className="text-xs text-gray-500">{content.founder}</p>
                    </div>
                </div>
            </div>
          </section>

          {/* Tech Stack Section (Integrated Cleanly) */}
          <section>
            <div className="flex items-center gap-3 mb-8">
                <Cpu className="text-orange-500" size={24} />
                <h2 className="text-xl font-bold text-white">{content.techTitle}</h2>
            </div>
            <div className="glass-card p-6 rounded-2xl grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {TECH_STACK.map((tech, idx) => (
                    <div key={idx} className="flex flex-col items-center justify-center p-4 bg-white/5 rounded-xl hover:bg-white/10 hover:scale-105 transition-all cursor-default group">
                        <tech.icon className="text-gray-400 group-hover:text-white transition-colors mb-2" size={24} />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">{tech.name}</span>
                    </div>
                ))}
            </div>
          </section>

          {/* Team Section */}
          <section>
            <div className="flex items-center gap-3 mb-8">
                <Code2 className="text-purple-500" size={24} />
                <h2 className="text-xl font-bold text-white">{content.teamTitle}</h2>
            </div>
            
            <div className="w-full overflow-hidden relative">
                <div className="absolute left-0 top-0 w-10 h-full bg-gradient-to-r from-[#0a0a0a] to-transparent z-10" />
                <div className="absolute right-0 top-0 w-10 h-full bg-gradient-to-l from-[#0a0a0a] to-transparent z-10" />
                
                <div className="animate-scroll flex gap-6">
                    {[...TEAM_MEMBERS, ...TEAM_MEMBERS, ...TEAM_MEMBERS].map((member, i) => (
                        <div key={i} className="flex-shrink-0 w-48 glass-card p-4 rounded-xl flex flex-col items-center gap-3 group cursor-pointer hover:bg-white/5 transition-colors">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-white/10 group-hover:border-purple-500 transition-all">
                                <img src={member.img} alt={member.role} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500" />
                            </div>
                            <div className="text-center">
                                <p className="text-sm font-bold text-white group-hover:text-purple-400 transition-colors">{member.role}</p>
                                <p className="text-[10px] text-gray-500 uppercase tracking-wider">Expert</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
          </section>

          {/* Partners Section */}
          <section className="pb-10">
            <div className="flex items-center gap-3 mb-8">
                <LineChart className="text-green-500" size={24} />
                <h2 className="text-xl font-bold text-white">{content.partnersTitle}</h2>
            </div>

            <div className="w-full overflow-hidden relative bg-white/5 rounded-2xl py-6">
                <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-[#0a0a0a]/50 to-transparent z-10" />
                <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-[#0a0a0a]/50 to-transparent z-10" />

                <div className="animate-scroll flex gap-12 items-center px-4">
                    {[...PARTNERS, ...PARTNERS, ...PARTNERS].map((partner, i) => (
                        <a key={i} href={partner.url} target="_blank" rel="noopener noreferrer" className="flex-shrink-0 w-32 h-32 relative group flex items-center justify-center">
                            <img src={partner.logo} alt={partner.name} className="w-20 h-20 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 group-hover:blur-sm" />
                            <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                                <span className="text-white font-bold text-sm text-center drop-shadow-lg">{partner.name}</span>
                                <ExternalLink size={12} className="text-blue-400 mt-1" />
                            </div>
                        </a>
                    ))}
                </div>
            </div>
          </section>

          <div className="text-center text-xs text-gray-600 pt-8 border-t border-white/5">
            <p>&copy; 2025 AndSoft LLC. Ulaanbaatar, Mongolia.</p>
          </div>

        </div>
      </div>
    </>
  );
};

// --- COMPONENT: Meeting Schedule Content ---
const MeetingContent = ({ language }: { language: 'mn' | 'en' }) => {
    return (
        <div className="p-6 bg-[#0f172a] text-white h-full flex flex-col overflow-y-auto mac-scrollbar">
            <h2 className="text-xl font-bold mb-4 text-green-400">{language === 'mn' ? 'Уулзалт Товлох' : 'Schedule a Meeting'}</h2>
            <div className="flex-1 flex flex-col gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                    <div className="flex justify-between items-center mb-4">
                        <span className="font-bold">December 2025</span>
                        <div className="flex gap-2">
                            <span className="w-2 h-2 rounded-full bg-red-500"></span>
                            <span className="w-2 h-2 rounded-full bg-yellow-500"></span>
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                        </div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-xs mb-2 text-gray-400">
                        <div>Su</div><div>Mo</div><div>Tu</div><div>We</div><div>Th</div><div>Fr</div><div>Sa</div>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-center text-sm">
                        {[...Array(31)].map((_, i) => (
                            <div key={i} className={`p-1 rounded-full w-8 h-8 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors ${i === 24 ? 'bg-blue-500 text-white font-bold' : 'text-gray-300'}`}>
                                {i + 1}
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">{language === 'mn' ? 'Хурал' : 'Meeting Type'}</label>
                        <div className="flex gap-2">
                            <button className="flex-1 bg-blue-600/20 border border-blue-500/50 rounded py-2 text-xs hover:bg-blue-600/40 text-blue-200">Online</button>
                            <button className="flex-1 bg-white/5 border border-white/10 rounded py-2 text-xs hover:bg-white/10 text-gray-300">In-Person</button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">{language === 'mn' ? 'Цаг сонгох' : 'Select Time'}</label>
                        <select className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500">
                            <option>10:00 AM</option>
                            <option>11:30 AM</option>
                            <option>02:00 PM</option>
                            <option>04:00 PM</option>
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-xs text-gray-400">{language === 'mn' ? 'И-мэйл' : 'Email Address'}</label>
                        <input type="email" placeholder="name@company.com" className="w-full bg-black/30 border border-white/20 rounded px-3 py-2 text-sm focus:outline-none focus:border-green-500" />
                    </div>
                </div>

                <button className="bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-lg transition-colors shadow-lg mt-6 flex items-center justify-center gap-2">
                    <Calendar size={16} />
                    {language === 'mn' ? 'Баталгаажуулах' : 'Confirm Booking'}
                </button>
            </div>
        </div>
    );
};

// --- COMPONENT: Greeting Card Generator (Window Version) ---
const GreetingCardGeneratorContent = ({ language }: { language: 'mn' | 'en' }) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [senderName, setSenderName] = useState("");
    const [message, setMessage] = useState("");

    const generateCard = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        gradient.addColorStop(0, "#0f172a");
        gradient.addColorStop(1, "#334155");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
        for(let i=0; i<30; i++) {
            const x = Math.random() * canvas.width;
            const y = Math.random() * canvas.height;
            const r = Math.random() * 3;
            ctx.beginPath();
            ctx.arc(x, y, r, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.fillStyle = "#166534";
        ctx.beginPath();
        ctx.moveTo(canvas.width / 2, 80);
        ctx.lineTo(canvas.width / 2 - 60, 200);
        ctx.lineTo(canvas.width / 2 + 60, 200);
        ctx.fill();

        ctx.fillStyle = "#fbbf24"; 
        ctx.font = "bold 24px monospace";
        ctx.textAlign = "center";
        ctx.fillText("Happy New Year 2025", canvas.width / 2, 50);

        ctx.fillStyle = "#ffffff";
        ctx.font = "16px sans-serif";
        ctx.fillText(message || (language === 'mn' ? "Шинэ жилийн мэнд хүргэе!" : "Best wishes for the holidays!"), canvas.width / 2, 240);

        ctx.fillStyle = "#94a3b8";
        ctx.font = "italic 14px sans-serif";
        ctx.fillText(`- ${senderName || (language === 'mn' ? "Найзаас нь" : "From a friend")}`, canvas.width / 2, 270);
        
        ctx.fillStyle = "rgba(255,255,255,0.3)";
        ctx.font = "10px monospace";
        ctx.fillText("AndSoft LLC", canvas.width - 40, canvas.height - 10);
    };

    const downloadCard = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const link = document.createElement('a');
        link.download = 'greeting-card.png';
        link.href = canvas.toDataURL();
        link.click();
    };

    useEffect(() => {
        generateCard();
    }, [senderName, message]);

    return (
        <div className="flex flex-col md:flex-row gap-6 w-full h-full p-6 bg-[#1e293b] text-white">
            <div className="flex-1 space-y-4">
                <h3 className="text-white font-bold text-lg mb-2">{language === 'mn' ? 'Мэндчилгээний Карт Үүсгэх' : 'Create Greeting Card'}</h3>
                <input type="text" placeholder={language === 'mn' ? 'Таны нэр' : 'Your Name'} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-white text-sm focus:outline-none focus:border-green-500" value={senderName} onChange={e => setSenderName(e.target.value)} />
                <textarea placeholder={language === 'mn' ? 'Мэндчилгээний үг' : 'Your Message'} className="w-full bg-black/30 border border-white/10 rounded px-3 py-2 text-white text-sm h-32 resize-none focus:outline-none focus:border-green-500" value={message} onChange={e => setMessage(e.target.value)} />
                <button onClick={downloadCard} className="w-full bg-green-600 hover:bg-green-500 text-white py-2 rounded flex items-center justify-center gap-2 transition-colors font-semibold"><Download size={16} /> {language === 'mn' ? 'Зураг болгон татах' : 'Download Image'}</button>
            </div>
            <div className="flex-1 flex items-center justify-center bg-black/20 rounded-lg p-4">
                <canvas ref={canvasRef} width={300} height={300} className="rounded shadow-lg bg-white/5 max-w-full h-auto" />
            </div>
        </div>
    );
};

// --- COMPONENT: Interactive Snowman ---
const Snowman = () => {
    const [isDancing, setIsDancing] = useState(false);
    return (
        <motion.div className="fixed bottom-20 right-10 z-[35] cursor-pointer group hidden md:block" whileHover={{ scale: 1.1, rotate: 5 }} onClick={() => setIsDancing(!isDancing)} animate={isDancing ? { y: [0, -20, 0], rotate: [0, -10, 10, 0] } : {}} transition={{ duration: 0.5, repeat: isDancing ? Infinity : 0 }}>
            <div className="relative flex flex-col items-center">
                <div className="w-12 h-8 bg-black mb-[-5px] z-10 rounded-t-sm relative group-hover:-translate-y-2 transition-transform"><div className="absolute bottom-0 left-[-5px] w-14 h-2 bg-red-600 rounded-full" /></div>
                <div className="w-10 h-10 bg-white rounded-full shadow-inner flex items-center justify-center relative">
                    <div className="flex gap-2"><div className="w-1.5 h-1.5 bg-black rounded-full" /><div className="w-1.5 h-1.5 bg-black rounded-full" /></div>
                    <div className="absolute top-6 w-2 h-2 bg-orange-500 rounded-full" /><div className="absolute top-6 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-b-[12px] border-b-orange-500 rotate-90 translate-x-2" />
                </div>
                <div className="w-16 h-16 bg-white rounded-full -mt-2 shadow-inner flex flex-col items-center justify-center gap-2 pt-2"><div className="w-2 h-2 bg-black rounded-full" /><div className="w-2 h-2 bg-black rounded-full" /></div>
                <div className="absolute top-14 -left-8 w-10 h-1 bg-amber-800 rotate-[-20deg] rounded-full group-hover:rotate-[-40deg] transition-transform origin-right" /><div className="absolute top-14 -right-8 w-10 h-1 bg-amber-800 rotate-[20deg] rounded-full group-hover:rotate-[40deg] transition-transform origin-left" />
            </div>
        </motion.div>
    );
};

// --- COMPONENT: Typing Easter Egg ---
const TypingEasterEgg = () => {
    const [text, setText] = useState("");
    const fullText = "console.log('Merry Christmas!'); // AndSoft";
    useEffect(() => {
        let idx = 0;
        const interval = setInterval(() => { setText(fullText.slice(0, idx)); idx++; if (idx > fullText.length) { setTimeout(() => { idx = 0; }, 3000); } }, 150);
        return () => clearInterval(interval);
    }, []);
    return ( <div className="absolute bottom-32 left-10 md:left-32 z-20 font-mono text-xs md:text-sm text-green-400 opacity-70 bg-black/40 px-2 py-1 rounded hidden md:block">{text}<span className="animate-pulse">|</span></div> );
};

// --- COMPONENT: Mouse Trail ---
const MouseTrail = () => {
    const [trail, setTrail] = useState<{id: number, x: number, y: number}[]>([]);
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const newParticle = { id: Date.now(), x: e.clientX, y: e.clientY };
            setTrail(prev => [...prev.slice(-15), newParticle]); 
        };
        window.addEventListener('mousemove', handleMouseMove);
        const interval = setInterval(() => { setTrail(prev => prev.filter(p => Date.now() - p.id < 500)); }, 100);
        return () => { window.removeEventListener('mousemove', handleMouseMove); clearInterval(interval); };
    }, []);
    return (
        <div className="pointer-events-none fixed inset-0 z-[9999]">
            <AnimatePresence>{trail.map((p) => (
                <motion.div key={p.id} initial={{ opacity: 1, scale: 1 }} animate={{ opacity: 0, scale: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="absolute w-2 h-2 bg-yellow-300 rounded-full shadow-[0_0_10px_gold]" style={{ left: p.x, top: p.y }} />
            ))}</AnimatePresence>
        </div>
    );
};

// --- COMPONENT: Secret Terminal ---
const SecretTerminal = ({ onClose, onToggleSnow, isSnowOn, language, onOpenCard, onOpenMeeting }: { onClose: () => void, onToggleSnow: (val: boolean) => void, isSnowOn: boolean, language: 'mn' | 'en', onOpenCard: () => void, onOpenMeeting: () => void }) => {
    const [input, setInput] = useState("");
    const [history, setHistory] = useState<string[]>([]);
    const inputRef = useRef<HTMLInputElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => { inputRef.current?.focus(); bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [history]);
    useEffect(() => { setHistory([language === 'mn' ? "AndSoft Нууц Терминал... 'тусламж' гэж бичнэ үү." : "AndSoft Terminal... Type 'help'."]); }, [language]);

    const handleCommand = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            const cmd = input.trim().toLowerCase();
            const newHistory = [...history, `> ${input}`];
            if (cmd === 'help' || cmd === 'тусламж') newHistory.push("Commands: help, clear, snow on/off, card, meeting, about, exit");
            else if (cmd === 'clear' || cmd === 'цэвэрлэх') { setHistory([]); setInput(""); return; }
            else if (cmd === 'snow off') { onToggleSnow(false); newHistory.push("Snow disabled."); }
            else if (cmd === 'snow on') { onToggleSnow(true); newHistory.push("Snow enabled."); }
            else if (cmd === 'card') { onOpenCard(); newHistory.push("Opening card generator..."); }
            else if (cmd === 'meeting') { onOpenMeeting(); newHistory.push("Opening meeting schedule..."); }
            else if (cmd === 'about') newHistory.push("AndSoft LLC - Building Future Systems.");
            else if (cmd === 'exit') onClose();
            else newHistory.push("Unknown command.");
            setHistory(newHistory); setInput("");
        }
    };

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm" onClick={onClose}>
            <div className="w-[600px] h-[400px] bg-black border border-green-500 rounded-lg shadow-2xl p-4 font-mono text-green-500 flex flex-col" onClick={e => e.stopPropagation()}>
                <div className="flex justify-between items-center border-b border-green-500/30 pb-2 mb-2"><span>user@andsoft:~</span><button onClick={onClose}><X size={16} /></button></div>
                <div className="flex-1 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-green-900">{history.map((line, i) => <div key={i}>{line}</div>)}<div ref={bottomRef} /></div>
                <div className="flex items-center mt-2"><span className="mr-2">$</span><input ref={inputRef} type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleCommand} className="flex-1 bg-transparent border-none outline-none text-green-400 focus:ring-0" autoFocus /></div>
            </div>
        </div>
    );
};

// --- COMPONENT: New Year Countdown ---
const NewYearCountdown = ({ language }: { language: 'mn' | 'en' }) => {
    const [timeLeft, setTimeLeft] = useState("");
    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const nextYear = now.getFullYear() + 1;
            const diff = new Date(`January 1, ${nextYear} 00:00:00`).getTime() - now.getTime();
            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            setTimeLeft(language === 'mn' ? `${days}ө ${hours}ц ${minutes}м ${seconds}с` : `${days}d ${hours}h ${minutes}m ${seconds}s`);
        }, 1000);
        return () => clearInterval(interval);
    }, [language]);
    return (
        <div className="flex items-center gap-1 text-gray-300 font-mono text-[10px] md:text-xs">
            <Clock size={12} className="text-yellow-400" />
            <span className="hidden md:inline">{language === 'mn' ? 'Шинэ он:' : 'New Year:'}</span>
            <span className="text-yellow-200 w-[120px] text-right">{timeLeft}</span>
        </div>
    );
};

// --- COMPONENT: Code Fireworks & SymbolBurst ---
const CodeFireworks = () => {
    const [fireworks, setFireworks] = useState<{id: number, x: number, delay: number}[]>([]);
    const symbols = useMemo(() => ["{ }", "< >", "</>", "&&", "||", "=>", ";", "$", "01"], []);
    const colors = useMemo(() => ["#ef4444", "#3b82f6", "#22c55e", "#eab308", "#a855f7", "#06b6d4"], []);
    const locations = useMemo(() => [-350, 0, 350], []);
  
    useEffect(() => {
      const triggerFirework = () => {
        const id = Date.now();
        const randomLocIndex = Math.floor(Math.random() * locations.length);
        const x = locations[randomLocIndex] + (Math.random() * 50 - 25); 
        setFireworks(prev => [...prev, { id, x, delay: 0 }]);
        if (Math.random() > 0.7) {
             const secondId = Date.now() + 1;
             const secondLoc = locations[(randomLocIndex + 1) % locations.length];
             setFireworks(prev => [...prev, { id: secondId, x: secondLoc, delay: 0.5 }]);
        }
        setTimeout(() => { setFireworks(prev => prev.filter(f => f.id !== id)); }, 5000);
      };
      const interval = setInterval(triggerFirework, 8000); 
      return () => clearInterval(interval);
    }, [locations]);
  
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center overflow-hidden z-[5]">
          {fireworks.map(fw => <SymbolBurst key={fw.id} x={fw.x} delay={fw.delay} symbols={symbols} colors={colors} />)}
      </div>
    );
};
  
const SymbolBurst = ({ x, delay, symbols, colors }: { x: number, delay: number, symbols: string[], colors: string[] }) => {
    const [randomColor, setRandomColor] = useState<string>("");
    const [particles, setParticles] = useState<{angle: number, char: string, radius: number}[]>([]);
    const [ready, setReady] = useState(false);

    useEffect(() => {
        setRandomColor(colors[Math.floor(Math.random() * colors.length)]);
        const newParticles = Array.from({ length: 16 }).map((_, i) => ({
            angle: (i / 16) * 360,
            char: symbols[Math.floor(Math.random() * symbols.length)],
            radius: 180 + Math.random() * 50
        }));
        setParticles(newParticles);
        setReady(true);
    }, [colors, symbols]); 

    if (!ready) return null;

    return (
        <div className="absolute bottom-60" style={{ transform: `translateX(${x}px)` }}>
            <motion.div initial={{ y: 0, height: 0, opacity: 1 }} animate={{ y: -350, height: 100, opacity: 0 }} transition={{ duration: 1.2, delay: delay, ease: "easeOut" }} className="absolute left-0 w-0.5 bg-gradient-to-t from-transparent to-white" style={{ backgroundColor: randomColor }} />
            {particles.map((p, i) => (
                 <motion.div key={i} initial={{ y: -350, x: 0, opacity: 0, scale: 0 }} animate={{ y: -350 + Math.sin(p.angle * Math.PI / 180) * p.radius, x: Math.cos(p.angle * Math.PI / 180) * p.radius, opacity: [0, 1, 1, 0], scale: [0.5, 1.2, 0.8] }} transition={{ delay: delay + 1.1, duration: 2.5, ease: "circOut" }} className="absolute font-mono font-bold text-sm md:text-lg" style={{ color: randomColor, textShadow: `0 0 10px ${randomColor}` }}>{p.char}</motion.div>
            ))}
        </div>
    );
};

// --- COMPONENT: Realistic Code Tree ---
const CodeChristmasTree = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('sounds/shinejiliinduu.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    return () => { if (audioRef.current) { audioRef.current.pause(); audioRef.current = null; } };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) { audioRef.current.pause(); setIsPlaying(false); } 
    else { audioRef.current.play().catch(e => console.log("Audio error:", e)); setIsPlaying(true); }
  };

  return (
    <div className="relative flex flex-col items-center z-20 mt-12 group perspective-1000">
      <div className="absolute inset-0 bg-green-900/20 blur-3xl rounded-full scale-150 -z-10 animate-pulse" />
      <motion.div animate={{ rotateY: [0, 360], scale: [1, 1.2, 1] }} transition={{ duration: 5, repeat: Infinity, ease: "linear" }} className={`mb-1 z-50 cursor-pointer transition-all duration-500 ${isPlaying ? 'text-white drop-shadow-[0_0_35px_rgba(255,255,255,1)] scale-110' : 'text-yellow-300 drop-shadow-[0_0_25px_rgba(253,224,71,0.9)] hover:text-white'}`} onClick={toggleMusic}>
         <Sparkles size={56} fill="currentColor" />
      </motion.div>

      <div className="relative flex flex-col items-center gap-[-10px]">
        {/* Layer 1 */}
        <TreeLayer width="w-32" color="bg-gradient-to-b from-green-400 to-green-600"><span className="text-white font-mono font-bold text-xs">{`{init}`}</span></TreeLayer>
        {/* Layer 2 */}
        <TreeLayer width="w-48" color="bg-gradient-to-b from-green-500 to-green-700">
             <div className="flex gap-4 items-center justify-center w-full">
                <Ornament color="bg-red-500" icon={<Hash size={12}/>} label="C#" />
                <span className="text-green-100 font-mono text-xs font-bold">&lt;HTML/&gt;</span>
                <Ornament color="bg-blue-500" icon={<Braces size={12}/>} label="CSS" />
             </div>
        </TreeLayer>
        <TreeLayer width="w-64" color="bg-gradient-to-b from-green-600 to-green-800">
            <div className="flex gap-6 items-center justify-center w-full">
                <Ornament color="bg-yellow-400" icon={<Coffee size={12}/>} label="Java" />
                <code className="text-green-200 text-xs">const xmas = true;</code>
                <Ornament color="bg-purple-500" icon={<Atom size={12}/>} label="React" />
            </div>
        </TreeLayer>
        <TreeLayer width="w-80" color="bg-gradient-to-b from-green-700 to-green-900">
            <div className="flex gap-8 items-center justify-center w-full">
                <Ornament color="bg-cyan-400" icon={<Wind size={12}/>} label="Tailwind" />
                <div className="flex gap-2 text-[10px] font-mono text-green-300 border border-green-500/30 px-2 rounded bg-black/20"><span>NextJS</span><span>•</span><span>React</span></div>
                <Ornament color="bg-orange-500" icon={<Database size={12}/>} label="SQL" />
            </div>
        </TreeLayer>
        <TreeLayer width="w-96" color="bg-gradient-to-b from-green-800 to-green-950">
             <div className="flex justify-between px-10 w-full items-center">
                <Ornament color="bg-pink-500" icon={<Cpu size={12}/>} label="Hardware" />
                <div className="text-center text-[10px] text-gray-300 font-mono">System.out.println(Merry Christmas);</div>
                <Ornament color="bg-indigo-500" icon={<Command size={12}/>} label="MacOS" />
             </div>
        </TreeLayer>
      </div>
      <div className="w-16 h-12 bg-gradient-to-b from-yellow-900 to-yellow-950 rounded-b-lg border-x-2 border-yellow-800 flex items-center justify-center relative z-20 mt-[-5px]"><div className="w-12 h-8 border border-yellow-800/50 rounded bg-black/30" /></div>
      <div className="w-64 h-4 bg-black/50 blur-xl rounded-[100%] mt-[-5px]" />
    </div>
  );
};

const TreeLayer = ({ width, color, children }: { width: string, color: string, children?: React.ReactNode }) => (
    <div className={`${width} relative h-14 ${color} rounded-2xl flex items-center justify-center shadow-lg border-b-4 border-black/10 z-10 transform hover:scale-105 transition-transform duration-300 clip-path-pyramid dock-item`}>
        <div className="absolute top-0 left-0 w-full h-1/2 bg-white/10 rounded-t-2xl pointer-events-none" />
        <div className="absolute -bottom-1 left-2 w-2 h-2 rounded-full bg-red-500 animate-pulse shadow-[0_0_5px_red]" />
        <div className="absolute -bottom-1 right-2 w-2 h-2 rounded-full bg-blue-500 animate-pulse delay-75 shadow-[0_0_5px_blue]" />
        <div className="absolute top-2 left-6 w-1.5 h-1.5 rounded-full bg-yellow-300 animate-ping delay-100" />
        {children}
    </div>
);

const Ornament = ({ color, icon, label }: { color: string, icon: React.ReactNode, label?: string }) => (
    <div className={`w-8 h-8 rounded-full ${color} shadow-md flex items-center justify-center text-white border border-white/20 relative overflow-hidden group cursor-pointer`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent" />
        <div className="relative z-10 group-hover:rotate-12 transition-transform">{icon}</div>
        <div className="absolute top-1 left-2 w-2 h-2 bg-white/40 rounded-full blur-[1px]" />
        {label && (
            <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap pointer-events-none border border-white/10 z-[60]">
                {label}
            </div>
        )}
    </div>
);

// --- Top Menu Bar ---
const TopBar = ({ 
  onOpenContact, onOpenAbout, onOpenCareers, 
  onOpenGames, onOpenServices, onOpenProjects,
  onOpenHelp, onCloseAllWindows, onNewWindow, onShutDown,
  language, setLanguage,
}: { 
  onOpenContact: () => void, onOpenAbout: () => void, onOpenCareers: () => void, 
  onOpenGames: () => void, onOpenServices: () => void, onOpenProjects: () => void,
  onOpenHelp: () => void, onCloseAllWindows: () => void, onNewWindow: () => void, onShutDown: () => void,
  language: 'mn' | 'en', setLanguage: (lang: 'mn' | 'en') => void,
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
        <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x z-[-1] opacity-90" style={{ background: 'linear-gradient(to bottom, #8b0000, #500000)', borderBottom: '2px solid #d4af37' }} />
        <div className="absolute -bottom-2 left-0 w-full flex justify-around px-10 pointer-events-none opacity-80">
             {Array.from({length: 8}).map((_, i) => (
                 <div key={i} className={`w-2 h-2 rounded-full shadow-lg ${i % 2 === 0 ? 'bg-red-500' : 'bg-green-500'}`} style={{ marginTop: i % 2 === 0 ? '2px' : '5px' }}></div>
             ))}
        </div>

        <div className="w-full h-8 bg-[#0a0a0a]/90 backdrop-blur-md flex items-center justify-between px-2 md:px-4 text-gray-300 text-xs font-medium border-b border-white/5 shadow-sm select-none relative">
            <div className="flex items-center gap-2 md:gap-4 h-full" ref={menuRef}>
                <div className="relative h-full flex items-center">
                    <div className={`flex items-center gap-2 cursor-pointer px-2 h-full rounded hover:bg-white/10 ${activeMenu === 'apple' ? 'bg-white/10' : ''}`} onClick={() => setActiveMenu(activeMenu === 'apple' ? null : 'apple')}>
                        <div className="relative">
                            <div className="w-4 h-4 bg-gradient-to-br from-red-600 to-red-500 rounded flex items-center justify-center shadow-lg shadow-red-500/20">
                                <span className="text-[10px] font-bold text-white leading-none">A</span>
                            </div>
                            <div className="absolute -top-2 -right-1.5 transform rotate-12"><span className="text-[10px]">🎅</span></div>
                        </div>
                        <span className="font-bold text-white tracking-wide hidden md:block">AndSoft LLC</span>
                    </div>
                    {activeMenu === 'apple' && <DropdownMenu items={menuItems.apple} onClose={() => setActiveMenu(null)} />}
                </div>
                {visibleMenus.map((menu) => (
                    <div key={menu.key} className="relative h-full flex items-center">
                        <div className={`flex cursor-default px-2 md:px-3 h-6 items-center rounded hover:bg-white/10 ${activeMenu === menu.key ? 'bg-white/10' : ''}`} onClick={() => setActiveMenu(activeMenu === menu.key ? null : menu.key)}>{menu.label}</div>
                        {activeMenu === menu.key && <DropdownMenu items={menuItems[menu.key]} onClose={() => setActiveMenu(null)} />}
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-2 md:gap-3">
                <NewYearCountdown language={language} />
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
  const handleClick = () => {
    if (typeof window !== 'undefined') window.dispatchEvent(new CustomEvent('shake-dock'));
    if (onClick) onClick();
  };

  return (
      <motion.div className="dock-item group relative flex flex-col items-center gap-1 cursor-pointer" whileHover={{ scale: 1.2, y: -10 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onClick={handleClick}>
        <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl flex items-center justify-center shadow-lg border border-white/10 ${color} relative overflow-hidden z-10`}>
           <Icon color="white" size={24} strokeWidth={1.5} />
           <div className="absolute top-0 right-0 p-0.5 opacity-80 animate-pulse"><Snowflake size={10} className="text-white fill-white" /></div>
        </div>
        <div className={`w-1 h-1 bg-white rounded-full mt-1 transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`} />
        <span className="absolute -top-10 bg-[#1a1a1a]/90 backdrop-blur text-gray-200 text-[10px] px-2 py-1 rounded border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-[90]">{label}</span>
      </motion.div>
  );
};

const MacWindow = ({ title, onClose, onMinimize, onFocus, isActive, children, isOpen, isMinimized }: { title: string, onClose: () => void, onMinimize: () => void, onFocus: () => void, isActive: boolean, children: React.ReactNode, isOpen: boolean, isMinimized: boolean }) => {
    const [isMaximized, setIsMaximized] = useState(false);
    const [winState, setWinState] = useState({ x: 20, y: 80, width: 350, height: 500 });
    const dragRef = useRef<{ startX: number, startY: number, initialWinState: typeof winState } | null>(null);
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
  const [greeting, setGreeting] = useState("");

  // States
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

  // New Windows
  const [isMeetingOpen, setIsMeetingOpen] = useState(false);
  const [isMeetingMinimized, setIsMeetingMinimized] = useState(false);

  const [activeWindow, setActiveWindow] = useState<string | null>(null);
  const [isShutDown, setIsShutDown] = useState(false);
  
  // New Feature States
  const [showTerminal, setShowTerminal] = useState(false);
  const [showSnow, setShowSnow] = useState(true);
  const [isCardGenOpen, setIsCardGenOpen] = useState(false);
  const [isCardGenMinimized, setIsCardGenMinimized] = useState(false);

  // Toggle Handlers
  const toggleContact = () => { setActiveWindow('contact'); if (!isContactOpen) { setIsContactOpen(true); setIsContactMinimized(false); } else { isContactMinimized ? setIsContactMinimized(false) : setIsContactMinimized(true); } };
  const toggleAbout = () => { setActiveWindow('about'); if (!isAboutOpen) { setIsAboutOpen(true); setIsAboutMinimized(false); } else { isAboutMinimized ? setIsAboutMinimized(false) : setIsAboutMinimized(true); } };
  const toggleCareers = () => { setActiveWindow('careers'); if (!isCareersOpen) { setIsCareersOpen(true); setIsCareersMinimized(false); } else { isCareersMinimized ? setIsCareersMinimized(false) : setIsCareersMinimized(true); } };
  const toggleGames = () => { setActiveWindow('games'); if (!isGamesOpen) { setIsGamesOpen(true); setIsGamesMinimized(false); } else { isGamesMinimized ? setIsGamesMinimized(false) : setIsGamesMinimized(true); } };
  const toggleServices = () => { setActiveWindow('services'); if (!isServicesOpen) { setIsServicesOpen(true); setIsServicesMinimized(false); } else { isServicesMinimized ? setIsServicesMinimized(false) : setIsServicesMinimized(true); } };
  const toggleProjects = () => { setActiveWindow('projects'); if (!isProjectsOpen) { setIsProjectsOpen(true); setIsProjectsMinimized(false); } else { isProjectsMinimized ? setIsProjectsMinimized(false) : setIsProjectsMinimized(true); } };
  const toggleHelp = () => { setActiveWindow('help'); if (!isHelpOpen) { setIsHelpOpen(true); setIsHelpMinimized(false); } else { isHelpMinimized ? setIsHelpMinimized(false) : setIsHelpMinimized(true); } };
  
  const toggleMeeting = () => { setActiveWindow('meeting'); if (!isMeetingOpen) { setIsMeetingOpen(true); setIsMeetingMinimized(false); } else { isMeetingMinimized ? setIsMeetingMinimized(false) : setIsMeetingMinimized(true); } };

  // Toggle Card Generator Window
  const toggleCardGen = () => { 
      setActiveWindow('card'); 
      if (!isCardGenOpen) { setIsCardGenOpen(true); setIsCardGenMinimized(false); } 
      else { isCardGenMinimized ? setIsCardGenMinimized(false) : setIsCardGenMinimized(true); } 
  };

  const handleNewWindow = () => window.open('/', '_blank');
  
  const handleCloseAllWindows = () => {
      setIsContactOpen(false); setIsAboutOpen(false); setIsCareersOpen(false); setIsGamesOpen(false);
      setIsServicesOpen(false); setIsProjectsOpen(false); setIsHelpOpen(false); setIsCardGenOpen(false);
      setIsMeetingOpen(false);
  };
  const handleShutDown = () => setIsShutDown(true);

  // Audio Logic
  const playGreeting = () => {
      const audioFile = language === 'mn' ? '/mn.m4a' : '/en.m4a';
      const audio = new Audio(audioFile);
      audio.volume = 0.5;
      audio.play().catch(e => console.log("Autoplay blocked, waiting for user interaction.", e));
  };

  useEffect(() => {
    playGreeting();
  }, [language]);

  // Terminal Key Listener
  useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === '`' || (e.ctrlKey && e.key === 'k')) {
              e.preventDefault();
              setShowTerminal(prev => !prev);
          }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Dynamic Greeting Logic
  useEffect(() => {
      const hour = new Date().getHours();
      let text = "";
      if (hour >= 6 && hour < 12) text = language === 'mn' ? "Өглөөний мэнд" : "Good Morning";
      else if (hour >= 12 && hour < 18) text = language === 'mn' ? "Өдрийн мэнд" : "Good Afternoon";
      else if (hour >= 18 && hour < 23) text = language === 'mn' ? "Оройн мэнд" : "Good Evening";
      else text = language === 'mn' ? "Шөнийн мэнд" : "Good Night";
      setGreeting(text);
  }, [language]);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-center bg-cover font-sans selection:bg-red-500/30 selection:text-white"
      style={{ backgroundImage: `url('https://images.unsplash.com/photo-1577046848358-4623c085f0ea?q=80&w=2670&auto=format&fit=crop')` }} 
    >
      <MouseTrail />
      {showSnow && <WinterOverlay />}
      <CodeFireworks />
      
      {/* Secret Terminal updated with new commands */}
      {showTerminal && <SecretTerminal 
          onClose={() => setShowTerminal(false)} 
          onToggleSnow={setShowSnow} 
          isSnowOn={showSnow} 
          language={language} 
          onOpenCard={toggleCardGen}
          onOpenTech={() => {}} // Removed as tech stack is now in about
          onOpenMeeting={toggleMeeting}
      />}
      
      <Snowman />
      <TypingEasterEgg />

      {isShutDown && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 z-[9999] bg-black flex items-center justify-center text-white">
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

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen pb-20 gap-8">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-xl bg-[#0a0a0a]/60 backdrop-blur-md border border-white/10 rounded-xl shadow-lg overflow-hidden relative mt-10 z-10">
           <div className="absolute top-0 right-0 p-2 cursor-pointer hover:text-white transition-colors group z-20" onClick={() => setShowTerminal(true)} title={language === 'mn' ? "Терминал нээх" : "Open Terminal"}>
             <Snowflake className="text-white/20 group-hover:text-white/80 group-hover:rotate-180 transition-all duration-700" size={40} />
           </div>
           <div className="p-6 text-center">
            <p className="text-green-400 text-xs font-mono mb-2 uppercase tracking-widest">{greeting}</p>
            <h1 className="text-5xl font-bold text-white mb-2 tracking-tight drop-shadow-lg flex items-center justify-center gap-3">AndSoft LLC</h1>
            <p className="text-gray-300 font-light">{language === 'mn' ? 'Ирээдүйн системийг' : 'Build'} <span className="text-red-400 font-semibold">{language === 'mn' ? 'Бүтээцгээе.' : 'Future'}</span> {language === 'en' && 'Systems.'}</p>
            <div className="mt-4 inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-3 py-1 rounded-full text-xs font-bold border border-red-600/30 animate-pulse cursor-pointer hover:bg-red-600/30 transition-colors" onClick={playGreeting}>
                <Trees size={12} /> {language === 'mn' ? 'Шинэ жилийн мэнд!' : 'Happy New Year!'} <Gift size={12} />
            </div>
          </div>
        </motion.div>
        
        {/* Adjusted Tree Size */}
        <div className="relative z-20 scale-75 md:scale-90 -mt-22 md:-mt-32 mb-12">
            <CodeChristmasTree />
        </div>
      </div>

      <AnimatePresence>
        {isContactOpen && <MacWindow title={language === 'mn' ? "Холбоо барих" : "Contact Us"} isOpen={isContactOpen} isMinimized={isContactMinimized} isActive={activeWindow === 'contact'} onFocus={() => setActiveWindow('contact')} onClose={() => setIsContactOpen(false)} onMinimize={() => setIsContactMinimized(true)}><div className="w-full h-full overflow-y-auto"><TerminalContact language={language} /></div></MacWindow>}
        
        {/* Updated About Content */}
        {isAboutOpen && <MacWindow title={language === 'mn' ? "Бидний тухай" : "About Us"} isOpen={isAboutOpen} isMinimized={isAboutMinimized} isActive={activeWindow === 'about'} onFocus={() => setActiveWindow('about')} onClose={() => setIsAboutOpen(false)} onMinimize={() => setIsAboutMinimized(true)}><AboutContent language={language} /></MacWindow>}
        
        {isCareersOpen && <MacWindow title={language === 'mn' ? "Ажлын байр" : "Careers"} isOpen={isCareersOpen} isMinimized={isCareersMinimized} isActive={activeWindow === 'careers'} onFocus={() => setActiveWindow('careers')} onClose={() => setIsCareersOpen(false)} onMinimize={() => setIsCareersMinimized(true)}><div className="w-full h-full overflow-hidden"><CareersContent language={language} /></div></MacWindow>}
        {isGamesOpen && <MacWindow title={language === 'mn' ? "Тоглоом" : "Games Arcade"} isOpen={isGamesOpen} isMinimized={isGamesMinimized} isActive={activeWindow === 'games'} onFocus={() => setActiveWindow('games')} onClose={() => setIsGamesOpen(false)} onMinimize={() => setIsGamesMinimized(true)}><div className="w-full h-full overflow-hidden"><GamesContent language={language} /></div></MacWindow>}
        {isServicesOpen && <MacWindow title={language === 'mn' ? "Үйлчилгээ" : "Services"} isOpen={isServicesOpen} isMinimized={isServicesMinimized} isActive={activeWindow === 'services'} onFocus={() => setActiveWindow('services')} onClose={() => setIsServicesOpen(false)} onMinimize={() => setIsServicesMinimized(true)}><div className="w-full h-full overflow-hidden"><ServicesContent language={language} /></div></MacWindow>}
        {isProjectsOpen && <MacWindow title={language === 'mn' ? "Төслүүд" : "Projects"} isOpen={isProjectsOpen} isMinimized={isProjectsMinimized} isActive={activeWindow === 'projects'} onFocus={() => setActiveWindow('projects')} onClose={() => setIsProjectsOpen(false)} onMinimize={() => setIsProjectsMinimized(true)}><div className="w-full h-full overflow-hidden"><ProjectsContent language={language} /></div></MacWindow>}
        {isHelpOpen && <MacWindow title={language === 'mn' ? "Тусламж" : "Help Center"} isOpen={isHelpOpen} isMinimized={isHelpMinimized} isActive={activeWindow === 'help'} onFocus={() => setActiveWindow('help')} onClose={() => setIsHelpOpen(false)} onMinimize={() => setIsHelpMinimized(true)}><div className="w-full h-full overflow-hidden"><HelpTerminal language={language} /></div></MacWindow>}
        
        {/* Card Generator */}
        {isCardGenOpen && <MacWindow title={language === 'mn' ? "Карт Үүсгэгч" : "Card Generator"} isOpen={isCardGenOpen} isMinimized={isCardGenMinimized} isActive={activeWindow === 'card'} onFocus={() => setActiveWindow('card')} onClose={() => setIsCardGenOpen(false)} onMinimize={() => setIsCardGenMinimized(true)}><GreetingCardGeneratorContent language={language} /></MacWindow>}
        
        {/* Meeting Window */}
        {isMeetingOpen && <MacWindow title={language === 'mn' ? "Уулзалт" : "Meeting"} isOpen={isMeetingOpen} isMinimized={isMeetingMinimized} isActive={activeWindow === 'meeting'} onFocus={() => setActiveWindow('meeting')} onClose={() => setIsMeetingOpen(false)} onMinimize={() => setIsMeetingMinimized(true)}><MeetingContent language={language} /></MacWindow>}
      </AnimatePresence>

      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-[30]">
        <div className="flex items-end gap-2 md:gap-3 px-3 pb-2 pt-2 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl">
          <DockIcon icon={User} label={language === 'mn' ? 'Бидний тухай' : 'About Us'} color="bg-gradient-to-br from-indigo-500 to-blue-600" onClick={toggleAbout} isActive={isAboutOpen} />
          <DockIcon icon={FolderGit2} label={language === 'mn' ? 'Төслүүд' : 'Projects'} color="bg-gradient-to-br from-blue-500 to-cyan-500" onClick={toggleProjects} isActive={isProjectsOpen} />
          <DockIcon icon={Gamepad2} label={language === 'mn' ? 'Тоглоом' : 'Games'} color="bg-gradient-to-br from-purple-500 to-pink-500" onClick={toggleGames} isActive={isGamesOpen} />
          
          {/* Icons */}
          <DockIcon icon={Calendar} label={language === 'mn' ? 'Уулзалт' : 'Meeting'} color="bg-gradient-to-br from-green-500 to-emerald-500" onClick={toggleMeeting} isActive={isMeetingOpen} />
         

          <DockIcon icon={Layers} label={language === 'mn' ? 'Үйлчилгээ' : 'Services'} color="bg-gradient-to-br from-orange-400 to-red-500" onClick={toggleServices} isActive={isServicesOpen} />
          <div className="w-[1px] h-8 bg-white/20 mx-1 mb-2" />
          <DockIcon icon={Briefcase} label={language === 'mn' ? 'Ажлын байр' : 'Careers'} color="bg-gradient-to-br from-teal-400 to-teal-600" onClick={toggleCareers} isActive={isCareersOpen} />
          <DockIcon icon={Mail} label={language === 'mn' ? 'Холбоо барих' : 'Contact'} color="bg-gradient-to-br from-green-400 to-emerald-600" onClick={toggleContact} isActive={isContactOpen} />
        </div>
      </div>
    </main>
  );
}

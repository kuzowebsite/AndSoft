"use client";

import React from 'react';
import { 
  Rocket, Briefcase, Code2, Database, Palette, 
  LineChart, ExternalLink, LucideIcon 
} from 'lucide-react';

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

const AboutContent = ({ language }: { language: 'mn' | 'en' }) => {
  
  const t = {
    mn: {
      subtitle: "Технологийн шийдлээр ирээдүйг бүтээнэ.",
      historyTitle: "Бидний түүх",
      historyText: "AndSoft LLC нь 2023 онд технологийн салбарт шинэлэг шийдэл нэвтрүүлэх зорилготойгоор анх үйл ажиллагаагаа эхлүүлсэн. 2025 онд Монгол Улсын хуулийн дагуу албан ёсны бүртгэлтэй компани болон өргөжиж, харилцагчиддаа илүү найдвартай үйлчилгээг үзүүлж байна.",
      leadersTitle: "Удирдлага",
      teamTitle: "Манай баг",
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
        /* MAC SCROLLBAR STYLES (Added Here) */
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
      `}</style>

      {/* Added 'mac-scrollbar' class to the main container */}
      <div className="bg-[#0a0a0a] text-gray-300 h-full w-full overflow-y-auto font-sans selection:bg-blue-500/30 selection:text-white mac-scrollbar">
        
        <div className="relative py-16 flex flex-col items-center text-center border-b border-white/5 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.3)] mb-6">
              <span className="text-5xl font-bold text-white">A</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2 tracking-tight">AndSoft LLC</h1>
          <p className="text-blue-400 font-medium tracking-wide text-sm uppercase">{content.subtitle}</p>
        </div>

        <div className="p-6 md:p-10 max-w-5xl mx-auto space-y-16">

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

export default AboutContent;
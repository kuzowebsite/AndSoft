"use client";

import React, { useState } from 'react';
import { 
  Globe, Smartphone, Server, ExternalLink, 
  Code2, ShoppingBag, Briefcase, Tag, Calendar, 
  UserCheck, ChevronLeft, ChevronRight, LayoutGrid, CheckCircle, Layers 
} from 'lucide-react';

// --- Types ---
type ProjectType = 'internal' | 'client'; 
type Category = 'all' | 'web' | 'app' | 'system';

type Project = {
  id: number;
  type: ProjectType;
  title: string;
  category: Exclude<Category, 'all'>;
  gallery: string[];
  shortDesc: string;
  fullDesc: string;
  tags: string[];
  price?: string;
  status?: 'Available' | 'In Development' | 'Sold';
  clientName?: string;
  year?: string;
  link?: string;
};

// --- Mock Data ---
const PROJECTS_DATA: Project[] = [
  // --- INTERNAL (Бэлэн Төсөл) ---
  {
    id: 1,
    type: 'internal',
    title: "AndPOS System",
    category: 'system',
    gallery: ["https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?w=800&h=500&fit=crop"],
    shortDesc: "Үүлэн технологид суурилсан кассын систем.",
    fullDesc: "AndPOS нь дэлгүүр, ресторан, үйлчилгээний газруудад зориулсан орчин үеийн шийдэл юм.",
    tags: ["React", "Electron", "Node.js"],
    price: "5,000,000₮",
    status: "Available",
    link: "#"
  },
  {
    id: 2,
    type: 'internal',
    title: "Delivery App Kit",
    category: 'app',
    gallery: ["https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?w=800&h=500&fit=crop"],
    shortDesc: "Хүргэлтийн үйлчилгээний бэлэн апп.",
    fullDesc: "Хоол хүргэлт, бараа хүргэлтийн бизнест зориулсан бэлэн шийдэл.",
    tags: ["Flutter", "Firebase"],
    price: "15,000,000₮",
    status: "In Development",
    link: "#"
  },
  // --- CLIENT (Захиалгат Төсөл) ---
  {
    id: 4,
    type: 'client',
    title: "Mining Dashboard",
    category: 'web',
    gallery: ["https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop"],
    shortDesc: "Уул уурхайн компанийн дата аналитик.",
    fullDesc: "Erdenes Tavan Tolgoi компанийн захиалгаар хийгдсэн төсөл.",
    tags: ["React", "D3.js", "Python"],
    clientName: "Erdenes Tavan Tolgoi",
    year: "2024",
    link: "#"
  },
  {
    id: 5,
    type: 'client',
    title: "Smart Residence",
    category: 'system',
    gallery: ["https://images.unsplash.com/photo-1558002038-1091a166111c?w=800&h=500&fit=crop"],
    shortDesc: "Тансаг зэрэглэлийн орон сууцны IoT.",
    fullDesc: "Shangri-La Residence-ийн захиалгаар хийгдсэн гэр автоматжуулалт.",
    tags: ["IoT", "C++"],
    clientName: "Shangri-La Residence",
    year: "2023",
    link: "#"
  }
];

const CATEGORIES = [
  { id: 'all', label: { mn: 'Бүгд', en: 'All' }, icon: LayoutGrid },
  { id: 'web', label: { mn: 'Вэб', en: 'Web' }, icon: Globe },
  { id: 'app', label: { mn: 'Апп', en: 'App' }, icon: Smartphone },
  { id: 'system', label: { mn: 'Систем', en: 'System' }, icon: Server },
];

const ProjectsContent = ({ language }: { language: 'mn' | 'en' }) => {
  const [activeTab, setActiveTab] = useState<ProjectType>('internal');
  const [activeCategory, setActiveCategory] = useState<Category>('all');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const filteredProjects = PROJECTS_DATA.filter(project => 
    project.type === activeTab && 
    (activeCategory === 'all' || project.category === activeCategory)
  );

  const t = {
    mn: {
      tabs: { internal: "Бэлэн Төсөл", client: "Захиалгат Төсөл" },
      status: { Available: "Бэлэн", "In Development": "Хөгжүүлж буй", Sold: "Зарагдсан" },
      // ЭНД 'about' гэсэн түлхүүр үгийг нэмж, алдааг зассан
      labels: { client: "Захиалагч", year: "Он", price: "Үнэ", tech: "Технологи", back: "Буцах", about: "Төслийн тухай" },
      buttons: { view: "Үзэх", visit: "Вэбсайт" }
    },
    en: {
      tabs: { internal: "Products", client: "Portfolio" },
      status: { Available: "Available", "In Development": "In Dev", Sold: "Sold" },
      // ЭНД 'about' гэсэн түлхүүр үгийг нэмж, алдааг зассан
      labels: { client: "Client", year: "Year", price: "Price", tech: "Tech Stack", back: "Back", about: "About Project" },
      buttons: { view: "View", visit: "Visit" }
    }
  };
  const txt = language === 'mn' ? t.mn : t.en;

  // Handlers
  const handleProjectClick = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
  };

  const nextImage = () => selectedProject && setCurrentImageIndex((prev) => (prev + 1) % selectedProject.gallery.length);
  const prevImage = () => selectedProject && setCurrentImageIndex((prev) => (prev - 1 + selectedProject.gallery.length) % selectedProject.gallery.length);

  return (
    <>
      <style jsx global>{`
        .mac-scrollbar::-webkit-scrollbar { width: 4px; height: 4px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #333; border-radius: 99px; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="bg-[#0a0a0a] text-gray-300 h-full w-full overflow-y-auto font-sans selection:bg-blue-500/30 selection:text-white mac-scrollbar relative">
        
        {/* ==================== 1. LIST VIEW ==================== */}
        {!selectedProject && (
          <div className="animate-in fade-in zoom-in-95 duration-300 pb-10">
            
            {/* Sticky Header */}
            <div className="sticky top-0 z-20 bg-[#0a0a0a]/95 backdrop-blur border-b border-white/5 pb-2">
              <div className="flex flex-col gap-3 p-4">
                
                {/* 1. Main Tab Switcher */}
                <div className="flex w-full bg-[#161616] p-1 rounded-xl border border-[#333]">
                  <button
                    onClick={() => setActiveTab('internal')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeTab === 'internal' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <ShoppingBag size={16} className={activeTab === 'internal' ? 'text-blue-400' : ''} />
                    {txt.tabs.internal}
                  </button>
                  <button
                    onClick={() => setActiveTab('client')}
                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-bold transition-all ${
                      activeTab === 'client' ? 'bg-[#333] text-white shadow-sm' : 'text-gray-500 hover:text-gray-300'
                    }`}
                  >
                    <Briefcase size={16} className={activeTab === 'client' ? 'text-green-400' : ''} />
                    {txt.tabs.client}
                  </button>
                </div>

                {/* 2. Horizontal Category Scroll */}
                <div className="w-full overflow-x-auto hide-scrollbar">
                  <div className="flex gap-2 min-w-max px-1">
                    {CATEGORIES.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => setActiveCategory(cat.id as Category)}
                        className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium transition-all border whitespace-nowrap ${
                          activeCategory === cat.id 
                            ? 'bg-white text-black border-white' 
                            : 'bg-[#161616] text-gray-400 border-[#333]'
                        }`}
                      >
                        <cat.icon size={12} />
                        {language === 'mn' ? cat.label.mn : cat.label.en}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="p-4 md:p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {filteredProjects.map((project) => (
                  <div 
                    key={project.id}
                    onClick={() => handleProjectClick(project)}
                    className="group bg-[#111] rounded-xl border border-white/5 overflow-hidden hover:border-white/20 active:scale-98 transition-all duration-200 shadow-md cursor-pointer flex flex-row sm:flex-col h-28 sm:h-auto"
                  >
                    <div className="w-28 sm:w-full sm:h-40 shrink-0 overflow-hidden relative bg-[#1a1a1a]">
                      <img src={project.gallery[0]} alt={project.title} className="w-full h-full object-cover sm:group-hover:scale-105 transition-transform duration-500" />
                      {project.type === 'internal' && (
                        <div className={`absolute top-2 right-2 w-2 h-2 rounded-full z-10 ${
                            project.status === 'Available' ? 'bg-green-500' : 'bg-blue-500'
                        }`} />
                      )}
                    </div>
                    <div className="flex-1 p-3 flex flex-col justify-between sm:p-4">
                      <div>
                        <div className="flex justify-between items-start">
                            <h3 className="text-sm sm:text-lg font-bold text-white leading-tight mb-1 line-clamp-1 group-hover:text-blue-400 transition-colors">{project.title}</h3>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{project.shortDesc}</p>
                      </div>
                      <div className="flex items-center justify-between mt-2">
                        <div className="flex items-center gap-2">
                            {project.type === 'internal' ? (
                                <span className="text-xs font-mono font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded">{project.price}</span>
                            ) : (
                                <span className="text-[10px] font-bold text-gray-400 bg-[#222] px-1.5 py-0.5 rounded border border-[#333]">{project.year}</span>
                            )}
                        </div>
                        <ChevronRight size={16} className="text-gray-600 group-hover:text-white transition-colors" />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filteredProjects.length === 0 && (
                  <div className="flex flex-col items-center justify-center py-20 text-gray-600">
                      <LayoutGrid size={40} strokeWidth={1} className="mb-2 opacity-50"/>
                      <p className="text-sm">Төсөл олдсонгүй.</p>
                  </div>
              )}
            </div>
          </div>
        )}

        {/* ==================== 2. DETAIL VIEW ==================== */}
        {selectedProject && (
          <div className="absolute inset-0 bg-[#0a0a0a] z-30 overflow-y-auto mac-scrollbar animate-in slide-in-from-right-10 duration-300 flex flex-col">
            
            {/* Header Nav */}
            <div className="sticky top-0 z-40 bg-[#0a0a0a]/90 backdrop-blur border-b border-white/10 px-4 py-3 flex items-center gap-3">
                <button onClick={() => setSelectedProject(null)} className="p-2 -ml-2 rounded-full hover:bg-white/10 text-gray-300 transition-colors">
                    <ChevronLeft size={24} />
                </button>
                <h2 className="text-white font-bold text-base truncate flex-1">{selectedProject.title}</h2>
                {selectedProject.link && (
                    <a href={selectedProject.link} target="_blank" className="p-2 rounded-full hover:bg-white/10 text-blue-400">
                        <ExternalLink size={20} />
                    </a>
                )}
            </div>

            <div className="flex-1 p-0 pb-10">
                <div className="relative w-full aspect-video bg-[#111] overflow-hidden">
                    <img src={selectedProject.gallery[currentImageIndex]} alt={selectedProject.title} className="w-full h-full object-cover" />
                    {selectedProject.gallery.length > 1 && (
                        <>
                            <button onClick={prevImage} className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"><ChevronLeft size={20} /></button>
                            <button onClick={nextImage} className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-black/50 rounded-full text-white"><ChevronRight size={20} /></button>
                            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                {selectedProject.gallery.map((_, idx) => (
                                    <div key={idx} className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImageIndex ? 'bg-white w-3' : 'bg-white/40'}`} />
                                ))}
                            </div>
                        </>
                    )}
                </div>

                <div className="p-5 space-y-6">
                    <div className="flex justify-between items-start">
                        <div>
                            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 mb-1 block">{selectedProject.category.toUpperCase()}</span>
                            <h1 className="text-2xl font-bold text-white mb-2">{selectedProject.title}</h1>
                        </div>
                        {selectedProject.type === 'internal' ? (
                            <div className="text-right">
                                <span className="block text-[10px] text-gray-500 uppercase">{txt.labels.price}</span>
                                <span className="text-xl font-mono font-bold text-green-400">{selectedProject.price}</span>
                            </div>
                        ) : (
                            <div className="text-right">
                                <span className="block text-[10px] text-gray-500 uppercase">{txt.labels.year}</span>
                                <span className="text-lg font-bold text-white">{selectedProject.year}</span>
                            </div>
                        )}
                    </div>

                    <div className="p-3 bg-[#161616] rounded-xl border border-white/5 flex items-center justify-between">
                        {selectedProject.type === 'internal' ? (
                            <>
                                <span className="text-xs text-gray-400">Төлөв:</span>
                                <span className={`text-xs font-bold px-2 py-1 rounded ${
                                    selectedProject.status === 'Available' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                                }`}>{selectedProject.status && txt.status[selectedProject.status]}</span>
                            </>
                        ) : (
                            <>
                                <span className="text-xs text-gray-400">{txt.labels.client}:</span>
                                <span className="text-sm font-bold text-white flex items-center gap-1"><UserCheck size={14} className="text-blue-500" /> {selectedProject.clientName}</span>
                            </>
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white mb-2">{txt.labels.about}</h3>
                        <p className="text-sm text-gray-400 leading-relaxed text-justify">{selectedProject.fullDesc}</p>
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-white mb-2 flex items-center gap-2 border-b border-white/5 pb-2">
                            <Code2 size={16} className="text-purple-500" /> {txt.labels.tech}
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {selectedProject.tags.map((tag, i) => (
                                <span key={i} className="px-3 py-1.5 bg-[#1a1a1a] border border-[#333] rounded-lg text-xs text-gray-300">{tag}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ProjectsContent;
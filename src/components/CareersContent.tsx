"use client";

import React, { useState, useRef } from 'react';
import { 
  Briefcase, DollarSign, Clock, CheckCircle, 
  MapPin, Star, Upload, ChevronLeft, Send, Check 
} from 'lucide-react';

// --- Mock Data ---
const JOB_DATA = {
  mn: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      type: "Бүтэн цаг",
      salary: "4,000,000₮ - 6,000,000₮",
      experience: "3+ жил",
      requirements: ["React.js, Next.js, TypeScript", "Tailwind CSS", "RESTful API / GraphQL", "Багаар ажиллах"],
      responsibilities: ["Frontend хөгжүүлэлт", "UI/UX дизайн", "Кодны чанар", "Ментор хийх"],
      benefits: ["Сургалт", "Өдрийн хоол, Унаа", "НДШ, ЭМД", "Спорт тэмцээн", "Уян хатан цаг"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      type: "Бүтэн цаг",
      salary: "2,500,000₮ - 3,500,000₮",
      experience: "2+ жил",
      requirements: ["Маркетинг, Бизнес удирдлага", "Digital Marketing", "Content writing", "Англи хэл"],
      responsibilities: ["Стратеги боловсруулах", "Сошиал медиа", "Судалгаа хийх"],
      benefits: ["Нэмэгдэл цалин", "Гадаад томилолт", "Бүтээлч баг", "Уян хатан цаг"]
    }
  ],
  en: [
    {
      id: 1,
      title: "Senior Frontend Developer",
      type: "Full-time",
      salary: "4M₮ - 6M₮",
      experience: "3+ years",
      requirements: ["React.js, Next.js, TypeScript", "Tailwind CSS", "API / GraphQL", "Teamwork"],
      responsibilities: ["Frontend dev", "UI/UX collab", "Code quality", "Mentoring"],
      benefits: ["Training", "Food & Transport", "Insurance", "Events", "Flexible hours"]
    },
    {
      id: 2,
      title: "Marketing Manager",
      type: "Full-time",
      salary: "2.5M₮ - 3.5M₮",
      experience: "2+ years",
      requirements: ["Marketing Degree", "Digital Marketing", "Copywriting", "English"],
      responsibilities: ["Strategy", "Social Media", "Research"],
      benefits: ["Bonuses", "Travel", "Creative Team", "Flexibility"]
    }
  ]
};

const CareersContent = ({ language }: { language: 'mn' | 'en' }) => {
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [isApplying, setIsApplying] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState("");

  const jobs = language === 'mn' ? JOB_DATA.mn : JOB_DATA.en;
  const selectedJob = jobs.find(j => j.id === selectedJobId);

  const t = {
    mn: { listTitle: "Нээлттэй ажлын байр", selectPlaceholder: "Та жагсаалтаас ажлын байр сонгоно уу.", applyBtn: "Анкет илгээх", backBtn: "Буцах", backToList: "Жагсаалт руу", reqTitle: "Тавигдах шаардлага", respTitle: "Гүйцэтгэх үүрэг", benTitle: "Бидний санал болгох зүйлс", formTitle: "Анкет бөглөх", formName: "Таны нэр", formEmail: "Имэйл хаяг", formPhone: "Утасны дугаар", formCV: "CV хавсаргах", formSubmit: "Илгээх", successMsg: "Амжилттай илгээгдлээ!", uploadText: "Файл сонгох" },
    en: { listTitle: "Open Positions", selectPlaceholder: "Select a job to view details.", applyBtn: "Apply Now", backBtn: "Back", backToList: "Back to List", reqTitle: "Requirements", respTitle: "Responsibilities", benTitle: "Benefits", formTitle: "Application Form", formName: "Full Name", formEmail: "Email", formPhone: "Phone", formCV: "Attach CV", formSubmit: "Submit", successMsg: "Application sent!", uploadText: "Choose File" }
  };
  const labels = language === 'mn' ? t.mn : t.en;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) setFileName(e.target.files[0].name);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => setFormSuccess(true), 1000);
  };

  return (
    <>
      <style jsx global>{`
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
      `}</style>

      <div className="flex flex-col md:flex-row h-full w-full bg-[#0F0F0F] text-gray-300 font-sans selection:bg-blue-500/30 selection:text-white">
        
        {/* --- LEFT SIDEBAR (Job List) --- */}
        {/* Гар утсан дээр: Хэрэв ажил сонгогдсон бол (selectedJobId != null) энэ хэсэг нуугдана */}
        <div className={`w-full md:w-1/3 min-w-[250px] border-r border-[#333] flex-col bg-[#111] ${selectedJobId ? 'hidden md:flex' : 'flex'}`}>
          <div className="p-4 border-b border-[#333] bg-[#161616] shrink-0">
            <h2 className="font-bold text-white flex items-center gap-2">
              <Briefcase size={18} className="text-blue-500" />
              {labels.listTitle}
            </h2>
          </div>
          <div className="overflow-y-auto flex-1 p-2 space-y-2 mac-scrollbar">
            {jobs.map((job) => (
              <div 
                key={job.id}
                onClick={() => { setSelectedJobId(job.id); setIsApplying(false); setFormSuccess(false); }}
                className={`p-4 rounded-lg cursor-pointer transition-all border ${
                  selectedJobId === job.id 
                    ? 'bg-blue-600/10 border-blue-500/50' 
                    : 'bg-[#1a1a1a] border-transparent hover:bg-[#222] hover:border-[#333]'
                }`}
              >
                <h3 className={`font-bold text-sm mb-1 ${selectedJobId === job.id ? 'text-blue-400' : 'text-white'}`}>
                  {job.title}
                </h3>
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><Clock size={10} /> {job.type}</span>
                  <span className="flex items-center gap-1"><Star size={10} /> {job.experience}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- RIGHT MAIN CONTENT --- */}
        {/* Гар утсан дээр: Хэрэв ажил сонгогдоогүй бол энэ хэсэг нуугдана */}
        <div className={`flex-1 overflow-y-auto mac-scrollbar relative bg-[#0F0F0F] ${!selectedJobId ? 'hidden md:block' : 'block'}`}>
          
          {!selectedJob && (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 opacity-50 p-10 text-center">
              <Briefcase size={64} className="mb-4" strokeWidth={1} />
              <p>{labels.selectPlaceholder}</p>
            </div>
          )}

          {selectedJob && !isApplying && (
            <div className="p-6 md:p-8 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
              
              {/* MOBILE BACK BUTTON */}
              <button 
                onClick={() => setSelectedJobId(null)}
                className="md:hidden flex items-center gap-2 text-sm text-gray-400 hover:text-white mb-6"
              >
                <ChevronLeft size={16} /> {labels.backToList}
              </button>

              <div className="mb-8 border-b border-[#333] pb-6">
                  <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">{selectedJob.title}</h1>
                  <div className="flex flex-wrap gap-3 text-sm">
                      <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 flex items-center gap-2"><DollarSign size={14} /> {selectedJob.salary}</span>
                      <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-2"><MapPin size={14} /> Ulaanbaatar</span>
                      <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20 flex items-center gap-2"><Clock size={14} /> {selectedJob.type}</span>
                  </div>
              </div>

              <div className="space-y-8">
                  <section>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><CheckCircle size={18} className="text-blue-500" /> {labels.reqTitle}</h3>
                      <ul className="space-y-2">{selectedJob.requirements.map((req, i) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-300"><span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />{req}</li>))}</ul>
                  </section>
                  <section>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Briefcase size={18} className="text-orange-500" /> {labels.respTitle}</h3>
                      <ul className="space-y-2">{selectedJob.responsibilities.map((res, i) => (<li key={i} className="flex items-start gap-3 text-sm text-gray-300"><span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 shrink-0" />{res}</li>))}</ul>
                  </section>
                  <section>
                      <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2"><Star size={18} className="text-yellow-500" /> {labels.benTitle}</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">{selectedJob.benefits.map((ben, i) => (<div key={i} className="p-3 bg-[#1a1a1a] rounded-lg border border-[#333] text-sm text-gray-300 flex items-center gap-3 hover:border-yellow-500/50 transition-colors"><span className="text-yellow-500">★</span> {ben}</div>))}</div>
                  </section>
              </div>

              <div className="mt-10 pt-6 border-t border-[#333] sticky bottom-0 bg-[#0F0F0F]/95 backdrop-blur py-4">
                  <button onClick={() => setIsApplying(true)} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 active:scale-95">{labels.applyBtn}</button>
              </div>
            </div>
          )}

          {selectedJob && isApplying && (
              <div className="p-6 md:p-8 max-w-2xl mx-auto h-full flex flex-col justify-center animate-in fade-in zoom-in-95 duration-300">
                  {!formSuccess ? (
                      <form onSubmit={handleSubmit} className="space-y-6">
                          <button type="button" onClick={() => setIsApplying(false)} className="text-gray-500 hover:text-white flex items-center gap-2 text-sm mb-4"><ChevronLeft size={16} /> {labels.backBtn}</button>
                          <div><h2 className="text-2xl font-bold text-white">{labels.formTitle}</h2><p className="text-blue-400 text-sm mt-1">{selectedJob.title}</p></div>
                          <div className="space-y-4">
                              <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{labels.formName}</label><input required type="text" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" /></div>
                              <div className="grid grid-cols-2 gap-4">
                                  <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{labels.formEmail}</label><input required type="email" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" /></div>
                                  <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{labels.formPhone}</label><input required type="tel" className="w-full bg-[#1a1a1a] border border-[#333] rounded-lg p-3 text-white focus:border-blue-500 focus:outline-none transition-colors" /></div>
                              </div>
                              <div><label className="block text-xs font-bold text-gray-500 mb-1 uppercase">{labels.formCV}</label><div onClick={() => fileInputRef.current?.click()} className="border-2 border-dashed border-[#333] hover:border-blue-500 hover:bg-blue-500/5 rounded-xl p-8 cursor-pointer transition-all flex flex-col items-center justify-center gap-2 group"><Upload size={24} className="text-gray-500 group-hover:text-blue-500" /><span className="text-sm text-gray-400 group-hover:text-white">{fileName || labels.uploadText}</span></div><input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleFileUpload} /></div>
                          </div>
                          <button type="submit" className="w-full bg-green-600 hover:bg-green-500 text-white font-bold py-3 rounded-xl transition-all shadow-lg shadow-green-600/20 flex items-center justify-center gap-2"><Send size={18} /> {labels.formSubmit}</button>
                      </form>
                  ) : (
                      <div className="text-center space-y-4 animate-in zoom-in duration-500">
                          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(34,197,94,0.4)]"><Check size={40} className="text-white" /></div>
                          <h2 className="text-2xl font-bold text-white">Амжилттай!</h2>
                          <p className="text-gray-400">{labels.successMsg}</p>
                          <button onClick={() => { setFormSuccess(false); setIsApplying(false); }} className="mt-6 text-blue-400 hover:text-white text-sm underline">Буцах</button>
                      </div>
                  )}
              </div>
          )}

        </div>
      </div>
    </>
  );
};

export default CareersContent;
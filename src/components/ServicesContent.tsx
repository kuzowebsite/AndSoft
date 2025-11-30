"use client";

import React from 'react';
import { 
  Globe, Smartphone, Server, Cpu, 
  Settings, PenTool, ShieldCheck, BarChart 
} from 'lucide-react';

const SERVICES_DATA = {
  mn: [
    {
      id: 1,
      icon: Globe,
      title: "Вэбсайт Хөгжүүлэлт",
      desc: "Таны бизнесийн нүүр царай болох орчин үеийн, хурдан, SEO оновчлолтой вэбсайтыг бид бүтээнэ. Энгийн танилцуулга сайтаас эхлээд нарийн төвөгтэй E-Commerce платформ хүртэл хийнэ.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: 2,
      icon: Smartphone,
      title: "Мобайл Аппликейшн",
      desc: "iOS болон Android үйлдлийн системд зориулсан өндөр гүйцэтгэлтэй аппликейшн хөгжүүлэлт. Хэрэглэгчдэд ээлтэй UI/UX дизайнтай, найдвартай ажиллагааг санал болгоно.",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      id: 3,
      icon: Server,
      title: "Систем Хөгжүүлэлт",
      desc: "Байгууллагын дотоод үйл ажиллагааг автоматжуулах ERP, CRM, HRM зэрэг цогц системүүд. Том өгөгдөлтэй ажиллах, өргөжүүлэх боломжтой архитектур.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      id: 4,
      icon: Cpu,
      title: "AI & Автоматжуулалт",
      desc: "Хиймэл оюун ухаанд суурилсан шийдлүүд (Chatbot, Data Analysis) болон бизнесийн процессийн автоматжуулалт. Цаг хугацаа, зардлыг хэмнэх ухаалаг технологи.",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      id: 5,
      icon: Settings,
      title: "IT Тусламж & Аутсорсинг",
      desc: "Мэргэжлийн IT инженерийн баг таны системийн тасралтгүй ажиллагааг 24/7 хянаж, техникийн саатал, аюулгүй байдлыг бүрэн хариуцна.",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
    {
      id: 6,
      icon: BarChart,
      title: "IT Зөвлөх Үйлчилгээ",
      desc: "Дижитал шилжилт хийх стратеги, технологийн сонголт, төслийн менежмент болон аудитын үйлчилгээ. Бид таны технологийн түнш байх болно.",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    }
  ],
  en: [
    {
      id: 1,
      icon: Globe,
      title: "Web Development",
      desc: "Modern, fast, and SEO-optimized websites that serve as the face of your business. From simple landing pages to complex E-Commerce platforms.",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20"
    },
    {
      id: 2,
      icon: Smartphone,
      title: "Mobile App Development",
      desc: "High-performance applications for iOS and Android. We offer user-friendly UI/UX design and reliable functionality.",
      color: "text-green-400",
      bg: "bg-green-500/10",
      border: "border-green-500/20"
    },
    {
      id: 3,
      icon: Server,
      title: "Enterprise Systems",
      desc: "Comprehensive systems like ERP, CRM, and HRM to automate internal operations. Scalable architecture capable of handling big data.",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      border: "border-purple-500/20"
    },
    {
      id: 4,
      icon: Cpu,
      title: "AI & Automation",
      desc: "AI-based solutions (Chatbots, Data Analysis) and business process automation. Smart technologies to save time and costs.",
      color: "text-red-400",
      bg: "bg-red-500/10",
      border: "border-red-500/20"
    },
    {
      id: 5,
      icon: Settings,
      title: "IT Support & Outsourcing",
      desc: "Our professional engineering team monitors your systems 24/7, ensuring technical stability and full security coverage.",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      border: "border-orange-500/20"
    },
    {
      id: 6,
      icon: BarChart,
      title: "IT Consulting",
      desc: "Digital transformation strategy, technology selection, project management, and auditing services. We are your technology partner.",
      color: "text-yellow-400",
      bg: "bg-yellow-500/10",
      border: "border-yellow-500/20"
    }
  ]
};

const ServicesContent = ({ language }: { language: 'mn' | 'en' }) => {
  const data = language === 'mn' ? SERVICES_DATA.mn : SERVICES_DATA.en;

  const t = {
    mn: {
      headerTitle: "Манай Үйлчилгээ",
      headerDesc: "Бид таны бизнесийг дараагийн түвшинд гаргах дижитал шийдлүүдийг санал болгож байна.",
      whyUs: "Яагаад AndSoft гэж?",
      whyUsDesc: "Бид зөвхөн код бичдэггүй, бид үнэ цэнийг бүтээдэг.",
      reasons: [
        { title: "Туршлагатай Баг", desc: "Олон жилийн туршлагатай мэргэжилтнүүд." },
        { title: "Чанарын Баталгаа", desc: "Олон улсын стандартад нийцсэн шийдэл." },
        { title: "Цаг Баримтлал", desc: "Төслийг тохирсон хугацаанд хүлээлгэн өгнө." },
        { title: "Найдвартай Байдал", desc: "Урт хугацааны тогтвортой хамтын ажиллагаа." }
      ]
    },
    en: {
      headerTitle: "Our Services",
      headerDesc: "We offer digital solutions to take your business to the next level.",
      whyUs: "Why AndSoft?",
      whyUsDesc: "We don't just write code, we create value.",
      reasons: [
        { title: "Expert Team", desc: "Professionals with years of experience." },
        { title: "Quality Assurance", desc: "Solutions meeting international standards." },
        { title: "Punctuality", desc: "Delivering projects on agreed timelines." },
        { title: "Reliability", desc: "Long-term sustainable partnership." }
      ]
    }
  };
  const txt = language === 'mn' ? t.mn : t.en;

  return (
    <>
      <style jsx global>{`
        /* Mac Scrollbar Style */
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
      `}</style>

      <div className="bg-[#0a0a0a] text-gray-300 h-full w-full overflow-y-auto font-sans selection:bg-blue-500/30 selection:text-white mac-scrollbar">
        
        {/* --- Header Section --- */}
        <div className="relative py-16 px-6 text-center border-b border-white/5 bg-gradient-to-b from-[#111] to-[#0a0a0a]">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 relative z-10">{txt.headerTitle}</h1>
          <p className="text-gray-400 max-w-2xl mx-auto relative z-10 text-sm md:text-base">
            {txt.headerDesc}
          </p>
        </div>

        <div className="p-6 md:p-10 max-w-6xl mx-auto space-y-16">
          
          {/* --- Services Grid --- */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {data.map((service) => (
              <div 
                key={service.id} 
                className={`group p-6 rounded-2xl border ${service.border} bg-[#111] hover:bg-[#161616] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
              >
                <div className={`w-12 h-12 rounded-xl ${service.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <service.icon className={service.color} size={24} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {service.desc}
                </p>
              </div>
            ))}
          </div>

          {/* --- Why Us Section --- */}
          <div className="bg-[#111] rounded-3xl p-8 md:p-12 border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full pointer-events-none" />
            
            <div className="text-center mb-10 relative z-10">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">{txt.whyUs}</h2>
              <p className="text-blue-400">{txt.whyUsDesc}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
              {txt.reasons.map((reason, i) => (
                <div key={i} className="text-center">
                  <div className="w-10 h-10 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4 text-green-400">
                    <ShieldCheck size={20} />
                  </div>
                  <h4 className="text-white font-bold mb-2">{reason.title}</h4>
                  <p className="text-xs text-gray-500">{reason.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* --- Footer --- */}
          <div className="text-center text-xs text-gray-600 pt-8 border-t border-white/5">
            <p>&copy; 2025 AndSoft LLC. Enterprise Solutions.</p>
          </div>

        </div>
      </div>
    </>
  );
};

export default ServicesContent;

"use client";

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

// --- Types ---
type Step = 'EMAIL' | 'PHONE' | 'CATEGORY' | 'MESSAGE' | 'DONE';

// Translations
const TRANS = {
  mn: {
    categories: [
      { id: 1, label: 'Захиалга өгөх' },
      { id: 2, label: 'Бэлэн төсөл авах' },
      { id: 3, label: 'Хамтран ажиллах' },
      { id: 4, label: 'Тусламж' },
      { id: 5, label: 'Санал хүсэлт' },
      { id: 6, label: 'Ажилд орох' },
    ],
    welcome: 'AndSoft LLC Terminal-д тавтай морил.',
    typeHelp: '"тусламж" гэж бичээд тусламж авна уу.',
    startProtocol: '--- ХОЛБОО БАРИХ ПРОТОКОЛ ЭХЭЛЛЭЭ ---',
    enterEmail: 'Өөрийн GMAIL хаягийг оруулна уу:',
    enterPhone: 'Утасны дугаараа оруулна уу:',
    enterMsg: 'Мессежээ бичнэ үү (эсвэл FILE гэж бичиж файл хавсаргана уу):',
    selectCategoryHeader: '--- ТӨРӨЛ СОНГОХ ---',
    selectCat: 'Төрөл сонгоно уу (1-6):',
    invalidEmail: 'Алдаа: Gmail хаяг буруу байна.',
    invalidPhone: 'Алдаа: Утасны дугаар буруу байна (Зөвхөн тоо, 4-12 орон).',
    commandNotFound: 'Команд олдсонгүй.',
    sending: 'Мэдээллийг илгээж байна...',
    success: '✔ Амжилттай илгээлээ.',
    completed: 'Процесс амжилттай дууслаа.',
    exitPrompt: 'Дахин эхлэх бол "дахин" гэж бичнэ үү.',
    backInfo: '<< Буцсан: ',
    selected: 'Сонгосон: ',
    commands: {
        back: 'БУЦАХ',
        home: 'НҮҮР',
        clear: 'ЦЭВЭРЛЭХ',
        sound: 'ДУУ',
        help: 'ТУСЛАМЖ',
        again: 'ДАХИН',
        file: 'FILE'
    },
    helpList: 'Боломжит командууд: буцах, цэвэрлэх, нүүр, дуу, дахин'
  },
  en: {
    categories: [
      { id: 1, label: 'Place Order' },
      { id: 2, label: 'Buy Project' },
      { id: 3, label: 'Partnership' },
      { id: 4, label: 'Support' },
      { id: 5, label: 'Feedback' },
      { id: 6, label: 'Job Application' },
    ],
    welcome: 'Welcome to AndSoft LLC Terminal.',
    typeHelp: 'Type "help" for a list of commands.',
    startProtocol: '--- STARTING CONTACT PROTOCOL ---',
    enterEmail: 'Please enter your GMAIL address to proceed:',
    enterPhone: 'Enter Phone Number:',
    enterMsg: 'Enter your Message (or type FILE to attach):',
    selectCategoryHeader: '--- SELECT CATEGORY ---',
    selectCat: 'Select option (1-6):',
    invalidEmail: '-bash: error: invalid email format',
    invalidPhone: '-bash: error: invalid phone number (digits only, 4-12 chars)',
    commandNotFound: '-bash: command not found:',
    sending: 'Sending data packets...',
    success: '✔ Transmission Successful.',
    completed: 'Process completed with exit code 0.',
    exitPrompt: 'Type "home" to exit or "again" to restart.',
    backInfo: '<< Back: ',
    selected: 'Selected: ',
    commands: {
        back: 'BACK',
        home: 'HOME',
        clear: 'CLEAR',
        sound: 'SOUND',
        help: 'HELP',
        again: 'AGAIN',
        file: 'FILE'
    },
    helpList: 'Available commands: back, clear, home, sound'
  }
};

// --- FIX APPLIED HERE: Default language added ---
const TerminalContact = ({ language = 'mn' }: { language?: 'mn' | 'en' }) => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- FIX APPLIED HERE: Safety Check ---
  // If language is somehow undefined, fallback to 'mn'
  const t = TRANS[language] || TRANS.mn;

  // --- States ---
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<{ type: 'system' | 'user' | 'error' | 'success' | 'info', text: string }[]>([]);
  const [currentStep, setCurrentStep] = useState<Step>('EMAIL');
  const [formData, setFormData] = useState({ email: '', phone: '', category: '', message: '' });
  const [attachedFile, setAttachedFile] = useState<File | null>(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const [loginTime, setLoginTime] = useState('');

  const playKeySound = () => {
    if (!isSoundEnabled) return;
    const audio = new Audio('/sounds/key.mp3'); 
    audio.playbackRate = 0.9 + Math.random() * 0.4; 
    audio.volume = 0.5;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  };

  const addToHistory = useCallback((type: 'system' | 'user' | 'error' | 'success' | 'info', text: string) => {
    setHistory(prev => [...prev, { type, text }]);
  }, []);

  // Initialize & Language Change Logic
  useEffect(() => {
    const timer = setTimeout(() => {
        setHistory([]); 
        setCurrentStep('EMAIL');
        setFormData({ email: '', phone: '', category: '', message: '' });
        setIsSuccess(false);

        inputRef.current?.focus();
        
        const now = new Date();
        const loginTimeString = now.toDateString(); 
        setLoginTime(now.toString().split(' GMT')[0]);

        addToHistory('info', `Last login: ${loginTimeString} on ttys001`);
        addToHistory('system', `Restored session: ${now.toLocaleTimeString()}`);
        addToHistory('info', '');
        
        // Safety check inside effect just in case
        if (t) {
            addToHistory('system', t.welcome);
            addToHistory('system', t.typeHelp);
            addToHistory('info', '');
            addToHistory('success', t.startProtocol);
            addToHistory('system', t.enterEmail);
        }
    }, 100);

    return () => clearTimeout(timer);
  }, [addToHistory, language, t]); 

  // --- Logic Flow ---
  const goBack = () => {
    if (currentStep === 'PHONE') {
      setCurrentStep('EMAIL');
      addToHistory('info', `${t.backInfo}${t.enterEmail}`);
      setInputVal(formData.email); 
    } else if (currentStep === 'CATEGORY') {
      setCurrentStep('PHONE');
      addToHistory('info', `${t.backInfo}${t.enterPhone}`);
      setInputVal(formData.phone);
    } else if (currentStep === 'MESSAGE') {
      setCurrentStep('CATEGORY');
      addToHistory('info', `${t.backInfo}${t.selectCat}`);
      t.categories.forEach(cat => {
        addToHistory('system', `   ${cat.id}. ${cat.label}`);
      });
    }
  };

  const processInput = (value: string) => {
    const cleanVal = value.trim();
    const upperVal = cleanVal.toUpperCase();

    // Check commands based on current language
    const cmds = t.commands;

    if (upperVal === cmds.clear || upperVal === 'CLEAR') { setHistory([]); return; }
    if (upperVal === cmds.help || upperVal === 'HELP') {
        addToHistory('info', t.helpList);
        return;
    }
    if (upperVal === cmds.sound || upperVal === 'SOUND') {
        setIsSoundEnabled(!isSoundEnabled);
        addToHistory('info', `Audio: ${!isSoundEnabled ? 'ON' : 'OFF'}`);
        return;
    }
    if (upperVal === cmds.back || upperVal === 'BACK') {
      if (currentStep === 'EMAIL') addToHistory('error', 'Error: cannot go back from start');
      else goBack();
      return;
    }
    if (upperVal === cmds.home || upperVal === 'HOME') {
        addToHistory('info', 'Logout...');
        setTimeout(() => router.push('/'), 500);
        return;
    }

    if (currentStep === 'EMAIL') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(cleanVal)) {
        addToHistory('error', t.invalidEmail);
        return;
      }
      setFormData(prev => ({ ...prev, email: cleanVal }));
      addToHistory('system', t.enterPhone);
      setCurrentStep('PHONE');
    } else if (currentStep === 'PHONE') {
      const isNum = /^\d+$/.test(cleanVal);
      if (!isNum || cleanVal.length < 4 || cleanVal.length > 12) {
        addToHistory('error', t.invalidPhone);
        return;
      }
      setFormData(prev => ({ ...prev, phone: cleanVal }));
      addToHistory('info', '');
      
      addToHistory('success', t.selectCategoryHeader);
      
      t.categories.forEach(cat => {
        addToHistory('system', `   ${cat.id}. ${cat.label}`);
      });
      addToHistory('system', t.selectCat);
      setCurrentStep('CATEGORY');
    } else if (currentStep === 'CATEGORY') {
      const choice = parseInt(cleanVal);
      const selected = t.categories.find(c => c.id === choice);
      if (!selected) {
        addToHistory('error', `${t.commandNotFound} ${cleanVal}`);
        return;
      }
      setFormData(prev => ({ ...prev, category: selected.label }));
      addToHistory('info', `${t.selected}"${selected.label}"`);
      addToHistory('system', t.enterMsg);
      setCurrentStep('MESSAGE');
    } else if (currentStep === 'MESSAGE') {
      if (cleanVal.toUpperCase() === 'FILE') {
        fileInputRef.current?.click();
        return;
      }
      setFormData(prev => ({ ...prev, message: cleanVal }));
      finishForm();
    }
  };

  const finishForm = () => {
    setCurrentStep('DONE');
    setIsSuccess(true);
    addToHistory('info', t.sending);
    setTimeout(() => {
        addToHistory('success', t.success);
        addToHistory('system', t.completed);
        addToHistory('info', '');
        addToHistory('system', t.exitPrompt);
    }, 800);
  };

  const resetTerminal = () => {
    setIsSuccess(false);
    setHistory([]);
    setFormData({ email: '', phone: '', category: '', message: '' });
    setAttachedFile(null);
    setCurrentStep('EMAIL');
    addToHistory('system', 'Session reset.');
    addToHistory('system', t.enterEmail);
    setInputVal('');
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputVal(e.target.value);
    playKeySound();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      playKeySound();
      e.preventDefault();
      const cmds = t.commands;
      const upperVal = inputVal.trim().toUpperCase();

      if (isSuccess) {
        if (upperVal === cmds.home || upperVal === 'HOME') router.push('/');
        else if (upperVal === cmds.again || upperVal === 'AGAIN') resetTerminal();
        else addToHistory('error', `${t.commandNotFound} ${inputVal}`);
        setInputVal('');
        return;
      }
      if (!inputVal.trim()) return;
      addToHistory('user', inputVal);
      processInput(inputVal);
      setInputVal('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setAttachedFile(file);
      addToHistory('info', `Attached: ${file.name} (${(file.size / 1024).toFixed(1)} KB)`);
      addToHistory('system', t.enterMsg);
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [history]);

  const getPrompt = () => {
    let dir = '~';
    if (currentStep === 'PHONE') dir = '~/contact';
    if (currentStep === 'CATEGORY') dir = '~/contact/type';
    if (currentStep === 'MESSAGE') dir = '~/contact/msg';
    
    return (
        <span className="mr-2 whitespace-nowrap">
            <span className="text-green-400 font-bold">guest@andsoft</span>
            <span className="text-white"> </span>
            <span className="text-blue-400 font-bold">{dir}</span>
            <span className="text-gray-400"> %</span>
        </span>
    );
  };

  return (
    <>
    <style jsx global>{`
        .mac-scrollbar::-webkit-scrollbar { width: 8px; height: 8px; }
        .mac-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .mac-scrollbar::-webkit-scrollbar-thumb { background-color: #4b5563; border-radius: 9999px; border: 2px solid transparent; background-clip: content-box; }
        .mac-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #6b7280; }
    `}</style>

    <div className="flex flex-col w-full h-full bg-black/95 text-[13px] md:text-[14px] font-mono p-1 selection:bg-white/20 selection:text-white"
         style={{ fontFamily: "Menlo, Monaco, 'Courier New', monospace" }}
         onClick={() => inputRef.current?.focus()}
    >
      <div 
        className="absolute top-2 right-4 z-20 cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
        onClick={() => setIsSoundEnabled(!isSoundEnabled)}
      >
        {isSoundEnabled ? <Volume2 size={16} className="text-gray-400" /> : <VolumeX size={16} className="text-gray-600" />}
      </div>

      <div className="flex-1 overflow-y-auto p-2 md:p-3 space-y-1 mac-scrollbar" ref={scrollRef}>
        {history.map((line, index) => {
          if (line.type === 'user') {
            return (
              <div key={index} className="break-words">
                <span className="text-green-400 font-bold">guest@andsoft</span>
                <span className="text-white"> </span>
                <span className="text-blue-400 font-bold">~</span>
                <span className="text-gray-400"> % </span>
                <span className="text-white">{line.text}</span>
              </div>
            );
          }
          return (
            <div key={index} className={`break-words leading-relaxed ${
                line.type === 'error' ? 'text-red-400' : 
                line.type === 'success' ? 'text-green-400 font-bold' : 
                line.type === 'info' ? 'text-gray-500' : 'text-gray-300'
              }`}>
              {line.text}
            </div>
          );
        })}

        {!isSuccess && (
          <div className="flex items-center">
             {getPrompt()}
             <div className="flex-1 relative">
                <span className="text-white whitespace-pre-wrap break-all">{inputVal}</span>
                <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-4 bg-gray-500 ml-0.5 align-middle" />
             </div>
          </div>
        )}

        {isSuccess && (
            <div className="flex items-center mt-2">
                <span className="text-green-400 font-bold">guest@andsoft</span>
                <span className="text-blue-400 font-bold"> ~/done</span>
                <span className="text-gray-400"> % </span>
                <div className="flex-1 relative">
                    <span className="text-white">{inputVal}</span>
                    <motion.span animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }} className="inline-block w-2.5 h-4 bg-gray-500 ml-0.5 align-middle" />
                </div>
            </div>
        )}
      </div>
      <input ref={inputRef} type="text" className="opacity-0 absolute top-0 left-0 h-0 w-0" value={inputVal} onChange={handleInput} onKeyDown={handleKeyDown} autoComplete="off" />
      <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileChange} />
    </div>
    </>
  );
};

export default TerminalContact;
"use client";

import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Keypad.module.css';

// Дууны эффект (Click sound)
const playClickSound = () => {
  const audio = new Audio('https://cdn.freesound.org/previews/378/378085_6260145-lq.mp3');
  audio.volume = 0.5;
  audio.play().catch(e => console.log("Audio play failed", e));
};

const Keypad = () => {
  const router = useRouter();

  // Хуудас шилжих функц
  const handlePress = (path: string) => {
    playClickSound();
    // Animation дуусахыг хүлээгээд шилжих (optional)
    setTimeout(() => {
      router.push(path);
    }, 300);
  };

  return (
    <div className={styles.keypad}>
      {/* Суурь (Base) */}
      <div className={styles.keypadBase}>
        <img src="https://assets.codepen.io/605876/keypad-base.png?format=auto&quality=86" alt="Base" />
      </div>

      {/* Товч 1: OK (Зүүн дээд - Улбар шар) -> Бидний тухай */}
      <button 
        className={`${styles.key} ${styles.keySingle} ${styles.posLeft}`}
        onClick={() => handlePress('/projects')}
      >
        <div className={styles.keyMask}>
          <div className={styles.keyContent}>
            <span className={styles.keyText}>ok</span>
            <img 
              src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" 
              alt="key" 
              className={styles.keyImage}
              style={{ filter: 'hue-rotate(114deg) saturate(1.4) brightness(1.2)' }} // Улбар шар эффект
            />
          </div>
        </div>
      </button>

      {/* Товч 2: GO (Баруун дээд - Цагаан) -> Төсөл */}
      <button 
        className={`${styles.key} ${styles.keySingle} ${styles.posRight}`}
        onClick={() => handlePress('/projects')}
      >
        <div className={styles.keyMask}>
          <div className={styles.keyContent}>
            <span className={styles.keyText}>go</span>
            <img 
              src="https://assets.codepen.io/605876/keypad-single.png?format=auto&quality=86" 
              alt="key" 
              className={styles.keyImage}
              style={{ filter: 'hue-rotate(0deg) saturate(0) brightness(1.4)' }} // Цагаан мөнгөлөг эффект
            />
          </div>
        </div>
      </button>

      {/* Товч 3: CREATE (Том доод - Хар) -> Холбоо барих */}
      <button 
        className={`${styles.key} ${styles.keyDouble}`}
        onClick={() => handlePress('/contact')}
      >
        <div className={styles.keyMask}>
          <div className={styles.keyContent}>
            <span className={styles.keyText}>create.</span>
            <img 
              src="https://assets.codepen.io/605876/keypad-double.png?format=auto&quality=86" 
              alt="key" 
              className={styles.keyImage}
              style={{ filter: 'hue-rotate(0deg) saturate(0) brightness(0.4)' }} // Хар эффект
            />
          </div>
        </div>
      </button>

    </div>
  );
};

export default Keypad;
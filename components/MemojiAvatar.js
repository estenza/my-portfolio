import { useState, useEffect } from 'react';
import Image from 'next/image';

const ALL_MEMOJIS = [
  '/images/memoji/memoji-default.png',
  '/images/memoji/memoji-1.png',
  '/images/memoji/memoji-2.png',
  '/images/memoji/memoji-3.png',
  '/images/memoji/memoji-4.png',
  '/images/memoji/memoji-5.png',
  '/images/memoji/memoji-6.png',,
];

const DEFAULT_MEMOJI = ALL_MEMOJIS[0];

export default function MemojiAvatar() {
  const [currentSrc, setCurrentSrc] = useState(DEFAULT_MEMOJI);

  // Функция, которая вызывается при наведении курсора
  const handleMouseEnter = () => {
    // 1. Создаём новый массив без текущего эмодзи
    const availableMemojis = ALL_MEMOJIS.filter(src => src !== currentSrc);
    
    // 2. Выбираем случайный индекс из этого нового массива
    const randomIndex = Math.floor(Math.random() * availableMemojis.length);
    
    // 3. Обновляем состояние на новый случайный эмодзи
    setCurrentSrc(availableMemojis[randomIndex]);
  };

  // Функция handleMouseLeave полностью удалена

  // Предварительная загрузка изображений остаётся без изменений
  useEffect(() => {
    ALL_MEMOJIS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  return (
    <div 
      onMouseEnter={handleMouseEnter} 
    >
      <Image
        src={currentSrc}
        alt="Vadim Zaripov Memoji"
        width={96}
        height={64}
        priority
      />
    </div>
  );
}
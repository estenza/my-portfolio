import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const ALL_MEMOJIS = [
  { src: '/images/memoji/memoji-default.png', bg: '#ffffff' },
  { src: '/images/memoji/memoji-1.png', bg: '#fcf194' },
  { src: '/images/memoji/memoji-2.png', bg: '#ffc1b9' },
  { src: '/images/memoji/memoji-3.png', bg: '#c2e5fc' },
  { src: '/images/memoji/memoji-4.png', bg: '#dff9a4' },
  { src: '/images/memoji/memoji-5.png', bg: '#e5c2fc' },
  { src: '/images/memoji/memoji-6.png', bg: '#f9cfa4' },
];

const DEFAULT_MEMOJI = ALL_MEMOJIS[0];

export default function MemojiAvatar({ href, label, className = '' }) {
  const [currentMemoji, setCurrentMemoji] = useState(DEFAULT_MEMOJI);

  const handleMouseEnter = () => {
    const availableMemojis = ALL_MEMOJIS.filter(({ src }) => src !== currentMemoji.src);
    const randomIndex = Math.floor(Math.random() * availableMemojis.length);
    setCurrentMemoji(availableMemojis[randomIndex]);
  };

  useEffect(() => {
    ALL_MEMOJIS.forEach(({ src }) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const avatar = (
    <span className="flex h-16 w-16 shrink-0 items-center justify-center">
      <Image
        src={currentMemoji.src}
        alt="Vadim Zaripov Memoji"
        width={64}
        height={64}
        priority
        className="h-16 w-16 object-contain"
      />
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={handleMouseEnter}
        className={`group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-xl leading-none whitespace-nowrap text-black transition-colors hover:bg-neutral-200 ${className}`}
        style={{ backgroundColor: currentMemoji.bg }}
      >
        <span className="-my-1 -ml-1">
          {avatar}
        </span>
        {label ? (
          <span className="transition-colors">
            {label}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className={className}
      style={{ backgroundColor: currentMemoji.bg }}
    >
      {avatar}
    </div>
  );
}

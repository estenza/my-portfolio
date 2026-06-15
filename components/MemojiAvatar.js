import { useEffect, useState } from 'react';
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

const FACE_SIZE = 60;
const FACE_COUNT = ALL_MEMOJIS.length;
const FACE_ANGLE = 360 / FACE_COUNT;
const WHEEL_RADIUS = 92;

export default function MemojiAvatar({ href, label, className = '' }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const wheelRotation = `rotateX(-${currentIndex * FACE_ANGLE}deg)`;

  const rotateWheel = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % FACE_COUNT);
  };

  useEffect(() => {
    ALL_MEMOJIS.forEach(({ src }) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const avatar = (
    <span
      className="relative flex h-full w-[96px] shrink-0 items-center justify-center"
      style={{ perspective: '1400px' }}
    >
      <span className="relative h-full w-full overflow-hidden">
        <span
          className="absolute inset-0"
          style={{
            transform: wheelRotation,
            transformStyle: 'preserve-3d',
            transition: 'transform 820ms cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {ALL_MEMOJIS.map((memoji, index) => (
            <span
              key={memoji.src}
              className="absolute left-1/2 top-1/2 flex h-[60px] w-[60px] -translate-x-1/2 -translate-y-1/2 items-center justify-center"
              style={{
                transform: `rotateX(${index * FACE_ANGLE}deg) translateZ(${WHEEL_RADIUS}px)`,
                backfaceVisibility: 'hidden',
                opacity: currentIndex === index ? 1 : 0,
                transition: 'opacity 410ms ease-out',
              }}
            >
              <Image
                src={memoji.src}
                alt="Vadim Zaripov Memoji"
                width={FACE_SIZE}
                height={FACE_SIZE}
                priority={index === 0}
                className="h-16 w-16 object-contain"
              />
            </span>
          ))}
        </span>
      </span>
    </span>
  );

  if (href) {
    return (
      <Link
        href={href}
        onMouseEnter={rotateWheel}
        className={`group inline-flex min-h-[72px] items-stretch gap-0 overflow-hidden rounded-full bg-neutral-100 pr-8 text-lg leading-none whitespace-nowrap text-black transition-colors duration-700 ease-out hover:bg-neutral-200 ${className}`}
      >
        <span className="self-stretch">
          {avatar}
        </span>
        {label ? (
          <span className="flex items-center transition-colors">
            {label}
          </span>
        ) : null}
      </Link>
    );
  }

  return (
    <div
      onMouseEnter={rotateWheel}
      className={className}
      style={{ backgroundColor: '#ffffff' }}
    >
      {avatar}
    </div>
  );
}

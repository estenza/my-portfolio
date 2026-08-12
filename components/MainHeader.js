import Link from 'next/link';
import CopyEmailLink from './CopyEmailLink';
import ProgressiveHeaderBlur from './ProgressiveHeaderBlur';
import styles from '@/styles/Home.module.css';

const navigation = [
  { label: 'telegram', href: 'https://t.me/estenza', external: true },
  { label: 'email' },
  { label: 'linkedin', href: 'https://www.linkedin.com/in/вадим-зарипов-40448317a', external: true },
];

export default function MainHeader({ fullBleed = false }) {
  return (
    <header className={`${styles.mainHeader} site-header h-[72px] w-full ${fullBleed ? 'w-[calc(100%+32px)] -mx-4' : ''}`}>
      <ProgressiveHeaderBlur />
      <div className={`${styles.mainHeaderInner} mx-auto flex h-full w-full max-w-[1440px] items-center justify-between px-5 sm:px-10`}>
        <Link href="/" className={styles.bodyNarrow}>главная</Link>
        <nav aria-label="Контакты" className={`${styles.bodyNarrow} flex items-center gap-3 sm:gap-10`}>
          {navigation.map((item) => item.label === 'email' ? (
            <CopyEmailLink key={item.label} className="hidden transition-colors focus:outline-none sm:inline" />
          ) : (
            <a
              key={item.label}
              href={item.href}
              target={item.external ? '_blank' : undefined}
              rel={item.external ? 'noopener noreferrer' : undefined}
              className={`transition-colors focus:outline-none ${item.label === 'telegram' ? '' : 'hidden sm:inline'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}

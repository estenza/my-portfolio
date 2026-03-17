import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

export default function BackButton({ href = '/', text, variant = 'mobile' }) {
  const { t } = useTranslation('common');
  const label = text || t('backToHome');

  if (variant === 'desktop' || variant === 'mobile-compact') {
    return (
      <Link
        href={href}
        aria-label={label}
        title={label}
        className={`group inline-flex items-center justify-center rounded-full text-white/80 transition-colors hover:bg-neutral-900 hover:text-white ${
          variant === 'mobile-compact' ? 'mb-12 h-11 w-11' : 'h-12 w-12'
        }`}
      >
        <Image
          src="/arrow-left.svg"
          alt={label}
          width={32}
          height={32}
          className="opacity-70 transition group-hover:opacity-100"
        />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className="mb-12 inline-flex items-center rounded-full bg-neutral-900 px-4 py-2 text-s text-white transition-colors group hover:bg-neutral-800"
    >
      <Image
        src="/arrow-left.svg"
        alt={label}
        width={32}
        height={32}
        className="mr-2 opacity-70 group-hover:opacity-100 transition"
      />
      <span>{label}</span>
    </Link>
  );
}

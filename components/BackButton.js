import Link from 'next/link';
import Image from 'next/image';
import { useTranslation } from 'next-i18next';

// Мы создаём компонент, который может принимать пропсы (props) href и text.
// Задаём им значения по умолчанию: href будет '/', а text будет пустой.
export default function BackButton({ href = '/', text }) {
  // Компонент сам будет отвечать за получение нужного перевода
  const { t } = useTranslation('common');

  return (
    <Link
      href={href}
      className="bg-neutral-900 hover:bg-neutral-800 rounded-full inline-flex items-center text-s text-white transition-colors group py-2 px-4 mb-12"
    >
      <Image
        src="/arrow-left.svg"
        alt="Back"
        width={32}
        height={32}
        className="mr-2 opacity-70 group-hover:opacity-100 transition"
      />
      {/* Если в компонент передали пропс text, используем его.
        Если нет — используем перевод 'backToHome' по умолчанию.
      */}
      <span>{text || t('backToHome')}</span>
    </Link>
  );
}
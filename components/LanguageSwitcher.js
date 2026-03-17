import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const changeLanguage = (lng) => {
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <div className="flex items-center gap-4 text-xl">
      <button
        type="button"
        onClick={() => changeLanguage('ru')}
        className={`transition-colors ${
          locale === 'ru' ? 'text-white' : 'text-neutral-500 hover:text-white'
        }`}
      >
        Rus
      </button>
      <button
        type="button"
        onClick={() => changeLanguage('en')}
        className={`transition-colors ${
          locale === 'en' ? 'text-white' : 'text-neutral-500 hover:text-white'
        }`}
      >
        Eng
      </button>
    </div>
  );
}

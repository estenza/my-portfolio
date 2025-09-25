import { useRouter } from 'next/router';

export default function LanguageSwitcher() {
  const router = useRouter();
  const { locale, pathname, query, asPath } = router;

  const changeLanguage = (lng) => {
    router.push({ pathname, query }, asPath, { locale: lng });
  };

  return (
    <div className="space-x-4">
      <button
        onClick={() => changeLanguage('ru')}
        className={`transition 
           ${locale === 'ru' ? 'text-white font-regular' : 'text-neutral-500 hover:text-white cursor-pointer text-regular'}`} 
      >
        Rus
      </button>
      <button
        onClick={() => changeLanguage('en')}
        className={`transition 
          ${locale === 'en' ? 'text-white font-regular' : 'text-neutral-500 hover:text-white cursor-pointer text-regular'}`}
      >
        Eng
      </button>
    </div>
  );
}
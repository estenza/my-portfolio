import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import i18nConfig from '../next-i18next.config.js';
import BackButton from '../components/BackButton.js';

export default function AboutPage() {
  const { t } = useTranslation('common');

  return (
    <div className="w-full px-6 py-12 flex justify-center text-neutral-300 tracking-wide">
      <div className="w-full max-w-screen-xl mx-auto">
        <div className="w-full max-w-[700px]">
          <BackButton />

          <h1 className="text-4xl font-semibold mb-8">{t('aboutMe.title')}</h1>

          <div className="flex flex-col md:flex-row gap-8 md:gap-10 mb-12">
            <div className="shrink-0 w-48 h-64 relative rounded-xl overflow-hidden">
              <Image
                src="/images/my-photo.png"
                alt={t('aboutMe.photoAlt')}
                fill
                className="object-cover"
                sizes="(max-width: 768px)"
              />
            </div>

            <div className="text-neutral-400 space-y-5 text-base leading-relaxed tracking-wide">
              <p>{t('aboutMe.p1')}</p>
              <p>{t('aboutMe.p2')}</p>
            </div>
          </div>
          
          <h2 className="text-3xl font-semibold mb-8">{t('aboutMe.cvTitle')}</h2>

          <div className="space-y-12">
            {/* --- Учи.ру --- */}
            <div className="flex flex-col md:flex-row gap-x-8">
              <div className="w-full md:w-2/7 shrink-0">
                <h3 className="font-semibold text-white text-xl mb-1">
                  <a href="https://uchi.ru/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-blue-300 transition-all">
                    {t('aboutMe.uchi.name')}
                  </a>
                </h3>
                <p className="text-base text-neutral-400 mb-1">{t('jobTitle.productDesigner')}</p>
                <p className="text-base text-neutral-400">{t('aboutMe.uchi.dates')}</p>
              </div>
              <div className="w-full md:w-5/7 mt-4 md:mt-0">
                <ul className="list-disc list-inside text-neutral-400 text-base leading-relaxed space-y-2">
                  <li>{t('aboutMe.uchi.d1')}</li>
                  <li>{t('aboutMe.uchi.d2')}</li>
                  <li>{t('aboutMe.uchi.d3')}</li>
                  <li>{t('aboutMe.uchi.d4')}</li>
                  <li>{t('aboutMe.uchi.d5')}</li>
                </ul>
              </div>
            </div>

            {/* --- Паркли --- */}
            <div className="flex flex-col md:flex-row gap-x-8">
              <div className="w-full md:w-2/7 shrink-0">
                <h3 className="font-semibold text-white text-xl mb-1">
                  <a href="https://apps.apple.com/ru/app/%D0%BF%D0%B0%D1%80%D0%BA%D0%BB%D0%B8-%D0%BF%D0%B0%D1%80%D0%BA%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D1%8B-%D0%B8-%D1%81%D0%BF%D0%B1/id1530278550?referrer=appmetrica_tracking_id%3D1181069930796221196%26ym_tracking_id%3D8144508877423365345" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-blue-300">
                    {t('aboutMe.parkly.name')}
                  </a>
                </h3>
                <p className="text-base text-neutral-400 mb-1">{t('jobTitle.productDesigner')}</p>
                <p className="text-base text-neutral-400">{t('aboutMe.parkly.dates')}</p>
              </div>
              <div className="w-full md:w-5/7 mt-4 md:mt-0">
                <ul className="list-disc list-inside text-neutral-400 text-base leading-relaxed space-y-2">
                  <li>{t('aboutMe.parkly.d1')}</li>
                  <li>{t('aboutMe.parkly.d2')}</li>
                  <li>{t('aboutMe.parkly.d3')}</li>
                  <li>{t('aboutMe.parkly.d4')}</li>
                  <li>{t('aboutMe.parkly.d5')}</li>
                </ul>
              </div>
            </div>

            {/* --- Athanor --- */}
            <div className="flex flex-col md:flex-row gap-x-8">
              <div className="w-full md:w-2/7 shrink-0">
                <h3 className="font-semibold text-white text-xl mb-1">
                  <a href="https://www.linkedin.com/company/atnrpro/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="underline hover:text-blue-300">
                    {t('aboutMe.athanor.name')}
                  </a>
                </h3>
                <p className="text-base text-neutral-400 mb-1">{t('jobTitle.uxUiDesigner')}</p>
                <p className="text-base text-neutral-400">{t('aboutMe.athanor.dates')}</p>
              </div>
              <div className="w-full md:w-5/7 mt-4 md:mt-0">
                <ul className="list-disc list-inside text-neutral-400 text-base leading-relaxed space-y-2">
                  {/* Предполагается, что текст для Athanor будет уникальным */}
                  <li>{t('aboutMe.athanor.d1')}</li>
                  <li>{t('aboutMe.athanor.d2')}</li>
                  <li>{t('aboutMe.athanor.d3')}</li>
                  <li>{t('aboutMe.athanor.d4')}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Загрузка переводов для страницы
export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'], i18nConfig)),
    },
  };
}
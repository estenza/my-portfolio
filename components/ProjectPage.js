import Image from 'next/image';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import BackButton from './BackButton'

export default function ProjectPage({ title, type, year, description, images, videos }) {
  const { t } = useTranslation('common');


  const paragraphs = typeof description === 'string' ? description.split('\n') : [];

  return (
    <div className="w-full px-6 py-12 flex justify-center text-neutral-300 tracking-wide">
      {/* ВНЕШНИЙ КОНТЕЙНЕР */}
      <div className="w-full max-w-screen-xl mx-auto">
        {/* ВНУТРЕННЯЯ КОЛОНКА */}
        <div className="w-full max-w-[700px]">
          <BackButton />

          <h1 className="text-4xl font-semibold text-white mb-2">{title}</h1>
          <p className="text-neutral-400 mb-8">{type} · {year}</p>

          {/* 2. Встраиваем рендеринг параграфов прямо в основной JSX */}
          {paragraphs.map((para, idx) => (
            <p key={idx} className="mb-4">{para}</p> // Добавил mb-4 для отступа
          ))}

          {/* Видео, если передано */}
          {videos && videos.length > 0 && videos.map((video, index) => (
            <figure key={index} className="w-full mt-10">
              <video
                src={video.src}
                controls
                className="w-full h-auto rounded-2xl"
              >
                {t('videoNotSupported')}
              </video>
              {video.caption && (
                <figcaption className="text-sm text-neutral-500 mt-2">
                  {video.caption}
                </figcaption>
              )}
            </figure>
          ))}

          {/* Изображения с подписями */}
          {images.map((block, idx) => (
            <div key={idx} className="mt-10">
              {Array.isArray(block.imgs) && block.imgs.map((img, i) => (
                <div key={i} className="w-full mb-4">
                  <Image
                    src={img.src}
                    alt={img.alt || `${t('imageAlt')} ${i + 1}`}
                    width={0}
                    height={0}
                    sizes="100vw"
                    className="w-full h-auto rounded-2xl"
                    priority={idx === 0}
                  />
                </div>
              ))}
              {block.caption && (
                <p className="text-sm text-neutral-500 mt-2">{block.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
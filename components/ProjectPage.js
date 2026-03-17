import Image from 'next/image';
import { useTranslation } from 'next-i18next';
import BackButton from './BackButton'

export default function ProjectPage({ title, type, year, description, images, videos }) {
  const { t } = useTranslation('common');

  const paragraphs = typeof description === 'string' ? description.split('\n') : [];

  return (
    <div className="flex w-full justify-center px-6 py-12 text-neutral-400 tracking-wide">
      <div className="relative mx-auto w-full max-w-screen-xl">
        <div className="absolute right-[calc(50%+414px)] top-0 hidden md:block">
          <BackButton variant="desktop" />
        </div>

        <div className="mx-auto flex w-full max-w-[700px] flex-col items-start text-left">
          <div className="md:hidden">
            <BackButton variant="mobile-compact" />
          </div>

          <h1 className="text-4xl font-semibold text-white mb-2">{title}</h1>
          <p className="text-neutral-400 mb-8">{type} · {year}</p>

          {paragraphs.map((para, idx) => (
            <p key={idx} className="mb-4">{para}</p>
          ))}

          {videos && videos.length > 0 && videos.map((video, index) => (
            <figure key={index} className="mt-10 flex w-full flex-col items-start">
              <video
                src={video.src}
                controls
                className="w-full h-auto rounded-2xl"
              >
                {t('videoNotSupported')}
              </video>
              {video.caption && (
                <figcaption className="mt-2 text-sm text-neutral-500">
                  {video.caption}
                </figcaption>
              )}
            </figure>
          ))}

          {images.map((block, idx) => (
            <div key={idx} className="mt-10 flex w-full flex-col items-start">
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
                <p className="mt-2 text-sm text-neutral-500">{block.caption}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

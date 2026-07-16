import Image from 'next/image';
import Head from 'next/head';
import { useCallback, useEffect, useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import BackButton from './BackButton'
import ZoomableImage from './ZoomableImage';

function TextBlock({ description, className = '' }) {
  const lines = typeof description === 'string' ? description.split('\n') : [];
  const blocks = [];

  lines.forEach((line) => {
    const trimmedLine = line.trim();
    const bulletMatch = trimmedLine.match(/^\*\s+(.+)/);

    if (!trimmedLine) {
      return;
    }

    if (bulletMatch) {
      const previousBlock = blocks[blocks.length - 1];

      if (previousBlock?.type === 'list') {
        previousBlock.items.push(bulletMatch[1]);
      } else {
        blocks.push({
          type: 'list',
          items: [bulletMatch[1]]
        });
      }

      return;
    }

    blocks.push({
      type: 'paragraph',
      text: trimmedLine
    });
  });

  return (
    <div className={`w-full text-base leading-relaxed text-label-primary sm:text-base ${className}`}>
      {blocks.map((block, idx) => {
        if (block.type === 'list') {
          return (
            <ul key={idx} className="mb-5 space-y-2 last:mb-0">
              {block.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span aria-hidden="true" className="shrink-0 text-label-tertiary">—</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p key={idx} className="mb-5 last:mb-0">{block.text}</p>
        );
      })}
    </div>
  );
}

function FactList({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full flex-wrap gap-x-10 gap-y-3 text-base leading-normal text-label-primary sm:mt-10 sm:text-base">
      {items.map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>
  );
}

function SummaryList({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-4 text-base leading-relaxed text-label-primary sm:mt-10 sm:text-base">
      {items.map((item) => (
        <p key={item.label} className="m-0">
          <span className="font-semibold text-neutral-950">{item.label}:</span>
          <span> {item.value}</span>
        </p>
      ))}
    </div>
  );
}

function CardGrid({ cards = [], columns = 3 }) {
  if (!cards.length) {
    return null;
  }

  const gridClassName = columns === 2
    ? 'md:grid-cols-2'
    : 'md:grid-cols-3';

  return (
    <div className={`mt-8 grid w-full grid-cols-1 gap-4 sm:mt-10 ${gridClassName}`}>
      {cards.map((card) => (
        <article key={card.title} className="rounded-2xl bg-neutral-100 p-6">
          <div className="flex items-start gap-4">
            {card.icon === 'check' && (
              <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-label-tertiary text-label-tertiary">
                <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M3.5 8.25L6.5 11.25L12.5 4.75" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            )}
            {card.number && (
              <span className="shrink-0 text-base font-semibold leading-normal text-label-tertiary sm:text-base">
                {card.number}
              </span>
            )}
            <div className="min-w-0">
              <h3 className="mb-3 text-base font-semibold leading-normal text-neutral-950 sm:text-base">
                {card.title}
              </h3>
              <p className="text-base leading-relaxed text-label-primary sm:text-base">
                {card.description}
              </p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function HeroImage({ image }) {
  if (!image?.src) {
    return null;
  }

  return (
    <div className="mb-6 mt-4 w-full overflow-hidden rounded-xl sm:mb-8 sm:mt-6 sm:rounded-2xl">
      <Image
        src={image.src}
        alt={image.alt || ''}
        width={3040}
        height={604}
        sizes="(min-width: 1024px) 920px, calc(100vw - 2.5rem)"
        className="h-auto w-full"
        priority
      />
    </div>
  );
}

function StatusNote({ text }) {
  if (!text) {
    return null;
  }

  return (
    <p className="mb-6 inline-flex rounded-2xl bg-[#E8EDFF] px-4 py-2 text-sm leading-normal text-[#155EEF] sm:mb-8">
      {text}
    </p>
  );
}

function MediaBlocks({ images = [], videos = [] }) {
  return (
    <>
      {videos.length > 0 && videos.map((video, index) => (
        <figure key={index} className="mt-8 flex w-full flex-col items-start sm:mt-10">
          <video
            src={video.src}
            controls
            className="h-auto w-full rounded-xl sm:rounded-2xl"
          >
            Видео не поддерживается вашим браузером
          </video>
          {video.caption && (
            <figcaption className="mt-2 text-sm text-neutral-500">
              {video.caption}
            </figcaption>
          )}
        </figure>
      ))}

      {images.map((block, idx) => (
        <div key={idx} className="mt-8 flex w-full flex-col items-center sm:mt-10">
          <div className="w-full">
            {Array.isArray(block.imgs) && block.imgs.map((img, i) => (
              <div key={i} className={img.wrapperClassName || 'w-full mb-4'}>
                <ZoomableImage
                  zoomSrc={img.src}
                  alt={img.alt || `Изображение ${i + 1}`}
                  wrapperClassName={img.zoomWrapperClassName || 'block w-full'}
                  triggerClassName={img.triggerClassName || 'block w-full cursor-zoom-in overflow-hidden rounded-xl border-0 bg-transparent p-0 sm:rounded-2xl'}
                >
                  <Image
                    src={img.src}
                    alt={img.alt || `Изображение ${i + 1}`}
                    width={img.width || 0}
                    height={img.height || 0}
                    sizes={img.sizes || '(min-width: 1024px) 920px, calc(100vw - 2.5rem)'}
                    className={img.imageClassName || 'w-full h-auto'}
                    priority={idx === 0}
                  />
                </ZoomableImage>
                {img.caption && (
                  <p className="mt-2 text-sm leading-relaxed text-neutral-500">{img.caption}</p>
                )}
              </div>
            ))}
          </div>
          {block.caption && (
            <p className="w-full pb-6 text-sm text-neutral-500">{block.caption}</p>
          )}
        </div>
      ))}
    </>
  );
}

function EvolutionBlocks({ items = [] }) {
  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-8 flex w-full flex-col gap-10 sm:mt-10 sm:gap-12">
      {items.map((item) => (
        <div key={item.title} className="grid w-full grid-cols-1 gap-6 md:grid-cols-[minmax(220px,320px)_minmax(0,1fr)] md:items-start md:gap-10">
          <div className="w-full max-w-[320px] justify-self-center overflow-hidden rounded-xl sm:rounded-2xl md:justify-self-start">
            <Image
              src={item.image.src}
              alt={item.image.alt || item.title}
              width={item.image.width || 649}
              height={item.image.height || 1600}
              sizes="(min-width: 1024px) 320px, min(320px, calc(100vw - 2.5rem))"
              className="h-auto w-full"
            />
          </div>
          <div className="max-w-[560px] pt-0 md:sticky md:top-8 md:pt-8">
            <h3 className="mb-5 text-xl font-semibold leading-tight text-neutral-950 sm:text-2xl">{item.title}</h3>
            <TextBlock description={item.description} className="text-base sm:text-base" />
          </div>
        </div>
      ))}
    </div>
  );
}

function StoriesCarousel({ items = [] }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: 'start', loop: false });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState([]);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  const updateCarouselState = useCallback((api) => {
    setSelectedIndex(api.selectedScrollSnap());
    setCanScrollPrev(api.canScrollPrev());
    setCanScrollNext(api.canScrollNext());
  }, []);

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback((index) => {
    emblaApi?.scrollTo(index);
  }, [emblaApi]);

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollPrev();
    }

    if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollNext();
    }
  }, [scrollNext, scrollPrev]);

  useEffect(() => {
    if (!emblaApi) {
      return undefined;
    }

    setScrollSnaps(emblaApi.scrollSnapList());
    updateCarouselState(emblaApi);
    emblaApi.on('select', updateCarouselState);
    emblaApi.on('reInit', updateCarouselState);

    return () => {
      emblaApi.off('select', updateCarouselState);
      emblaApi.off('reInit', updateCarouselState);
    };
  }, [emblaApi, updateCarouselState]);

  if (!items.length) {
    return null;
  }

  return (
    <div className="mt-8 w-full sm:mt-10" onKeyDown={handleKeyDown}>
      <div className="relative pb-14">
        <div ref={emblaRef} className="overflow-hidden" tabIndex={0} aria-label="Карусель Stories-инструкций">
          <div className="flex">
            {items.map((item) => (
              <article key={item.title} className="min-w-0 flex-[0_0_100%]">
                <ZoomableImage
                  zoomSrc={item.image.src}
                  alt={item.image.alt}
                  triggerClassName="block w-full cursor-zoom-in overflow-hidden rounded-xl border-0 bg-transparent p-0 sm:rounded-2xl"
                >
                  <Image
                    src={item.image.src}
                    alt={item.image.alt}
                    width={item.image.width}
                    height={item.image.height}
                    sizes="(min-width: 1024px) 920px, calc(100vw - 2.5rem)"
                    className="h-auto w-full"
                  />
                </ZoomableImage>
                <div className="mt-2 max-w-[760px] text-sm leading-relaxed text-neutral-500">
                  {item.description}
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="pointer-events-none absolute inset-y-0 left-0 right-0 hidden items-center justify-between px-3 pb-14 md:flex">
          <button
            type="button"
            onClick={scrollPrev}
            disabled={!canScrollPrev}
            className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-label-primary shadow-sm transition disabled:cursor-default disabled:opacity-30"
            aria-label="Предыдущий слайд"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M15 4L7 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <button
            type="button"
            onClick={scrollNext}
            disabled={!canScrollNext}
            className="pointer-events-auto flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white/90 text-label-primary shadow-sm transition disabled:cursor-default disabled:opacity-30"
            aria-label="Следующий слайд"
          >
            <svg aria-hidden="true" width="24" height="24" viewBox="0 0 24 24" fill="none" className="rotate-180">
              <path d="M15 4L7 12L15 20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <div className="absolute bottom-6 left-0 right-0 z-10 flex justify-center gap-2">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => scrollTo(index)}
              className={`h-2 cursor-pointer rounded-full transition-all ${index === selectedIndex ? 'w-6 bg-neutral-950' : 'w-2 bg-neutral-300'}`}
              aria-label={`Перейти к слайду ${index + 1}`}
              aria-current={index === selectedIndex ? 'true' : undefined}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ProjectPage({ title, productLogo, heroImage, statusNote, type, year, description, facts = [], summary = [], introSections = [], images = [], videos = [], sections = [] }) {
  return (
    <>
      <Head>
        <title>{`Кейс — ${title}`}</title>
      </Head>
      <div className="w-full px-5 py-8 text-label-primary sm:px-6 sm:py-10 lg:px-10 lg:py-12">
        <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-y-6 lg:grid-cols-[48px_minmax(0,920px)] lg:justify-center lg:gap-x-10">
          <div className="hidden lg:block">
            <BackButton variant="desktop" />
          </div>

          <div className="flex w-full min-w-0 flex-col items-start text-left">
            <div className="mb-6 lg:hidden">
              <BackButton variant="mobile-compact" />
            </div>

          <div className="mb-2 flex max-w-[760px] items-center gap-4">
            {productLogo?.src && (
              <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl bg-[#135BFF] sm:h-14 sm:w-14">
                <Image
                  src={productLogo.src}
                  alt={productLogo.alt || ''}
                  fill
                  className="object-contain"
                  sizes="56px"
                  priority
                />
              </div>
            )}
            <h1 className="text-3xl font-semibold leading-tight text-neutral-950 sm:text-4xl">{title}</h1>
          </div>
          <StatusNote text={statusNote} />
          {type && year && (
            <p className="mb-6 max-w-[760px] text-[16px] leading-normal text-label-tertiary sm:mb-8">{type} · {year}</p>
          )}

          <SummaryList items={summary} />
          <FactList items={facts} />
          <HeroImage image={heroImage} />
          {introSections.map((section) => (
            <section key={section.title} className="mt-12 w-full sm:mt-16">
              {section.title && (
                <h2 className="mb-5 max-w-[760px] text-2xl font-semibold leading-tight text-neutral-950 sm:mb-6 sm:text-3xl">{section.title}</h2>
              )}
              <TextBlock description={section.description} />
              <CardGrid cards={section.cards} columns={section.cardColumns} />
              <MediaBlocks images={section.images} videos={section.videos} />
              <EvolutionBlocks items={section.evolutionItems} />
              <StoriesCarousel items={section.carouselItems} />
              <TextBlock description={section.descriptionAfter} className={section.descriptionAfterClassName || ''} />
              <MediaBlocks images={section.extraImages} videos={section.extraVideos} />
              <TextBlock description={section.extraDescription} />
            </section>
          ))}
          <MediaBlocks images={images} videos={videos} />

          {sections.map((section) => (
            <section key={section.title} className="mt-12 w-full sm:mt-16">
              <h2 className="mb-5 max-w-[760px] text-2xl font-semibold leading-tight text-neutral-950 sm:mb-6 sm:text-3xl">{section.title}</h2>
              <TextBlock description={section.description} />
              <MediaBlocks images={section.images} videos={section.videos} />
            </section>
          ))}
          </div>
      </div>
      </div>
    </>
  );
}

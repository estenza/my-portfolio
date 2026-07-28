import Image from 'next/image';
import Head from 'next/head';
import { Fragment, useCallback, useEffect, useState } from 'react';
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
    <div className={`w-full text-base leading-relaxed text-label-secondary sm:text-base ${className}`}>
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
    <div className="mt-8 flex w-full flex-wrap gap-x-10 gap-y-3 text-base leading-normal text-label-secondary sm:mt-10 sm:text-base">
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
    <div className="mt-8 flex w-full flex-col gap-4 text-base leading-relaxed text-label-secondary sm:mt-10 sm:text-base">
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
              <p className="text-base leading-relaxed text-label-secondary sm:text-base">
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

function CaseHeader({ title, description, pills = [], heroImage }) {
  return (
    <>
      <header className="mx-auto w-full max-w-[920px] px-5 pb-10 pt-14 sm:px-6 sm:pb-12 sm:pt-16 lg:px-0">
        <h1 className="max-w-[900px] text-[40px] font-semibold leading-[48px] text-label-primary sm:text-[56px] sm:leading-[64px]">
          {title}
        </h1>
        {description && (
          <p className="mt-8 max-w-[800px] text-base leading-6 text-label-secondary">
            {description}
          </p>
        )}
        {pills.length > 0 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {pills.map((pill) => (
              <span key={pill} className="rounded-full bg-neutral-100 px-4 py-2 text-base font-normal leading-6 text-label-primary">
                {pill}
              </span>
            ))}
          </div>
        )}
      </header>
      {heroImage?.src && (
        <div className="relative left-1/2 mb-14 aspect-[5/1] w-screen -translate-x-1/2 overflow-hidden lg:left-auto lg:mb-16 lg:h-[292px] lg:w-full lg:translate-x-0 lg:aspect-auto">
          <Image
            src={heroImage.src}
            alt={heroImage.alt || ''}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
      )}
    </>
  );
}

function ProductOverview({ section }) {
  if (!section) {
    return null;
  }

  return (
    <section className="mt-16 w-full sm:mt-24">
      <h2 className="mb-10 text-[32px] font-semibold leading-[40px] text-label-primary">
        {section.title}
      </h2>
      <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_400px] md:items-center">
        <div className="max-w-[520px] space-y-5 text-base leading-6 text-label-secondary">
          {section.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          {section.audiencesTitle && (
            <div className="space-y-3 pt-5">
              <h3 className="text-[18px] font-bold leading-6 text-label-primary">{section.audiencesTitle}</h3>
              <p>{section.audiencesText}</p>
            </div>
          )}
        </div>
        <Image
          src={section.image.src}
          alt={section.image.alt}
          width={1104}
          height={704}
          className="h-auto w-full"
          sizes="(min-width: 768px) 400px, calc(100vw - 2.5rem)"
        />
      </div>
    </section>
  );
}

function CourseShowcase({ section }) {
  if (!section?.items?.length) {
    return null;
  }

  const content = (
    <>
      {section.title && (
        <h2 className="mb-10 max-w-[800px] text-[32px] font-semibold leading-[40px] text-label-primary">
          {section.title}
        </h2>
      )}
      <div className="flex flex-col items-center gap-y-12 md:flex-row md:flex-wrap md:items-start md:justify-center md:gap-x-6 md:gap-y-16">
        {section.items.map((item) => (
          <figure key={item.title} className={`flex min-w-0 max-w-full self-start flex-col ${item.figureClassName || ''}`}>
            <div className={`flex overflow-hidden rounded-[24px] ${item.previewClassName || 'w-full'}`}>
              <Image
                src={item.image.src}
                alt={item.image.alt || item.title}
                width={item.image.width}
                height={item.image.height}
                sizes={item.image.sizes || '(min-width: 768px) 440px, calc(100vw - 2.5rem)'}
                className={item.imageClassName || 'h-auto w-full'}
              />
            </div>
            <figcaption className={`mt-4 text-center ${item.captionClassName || ''}`}>
              <h3 className="text-[18px] font-semibold leading-6 text-label-primary">{item.title}</h3>
              <p className="mt-1 text-base leading-6 text-label-secondary">{item.description}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </>
  );

  if (section.fullBleed) {
    return (
      <section
        className="relative left-1/2 mt-16 w-screen -translate-x-1/2 bg-[#4CB7FF] py-16 sm:mt-24 sm:py-24"
        aria-label={section.label || 'Примеры курсов'}
        style={{
          backgroundImage: "url('/uchi/showcase/pattern.svg')",
          backgroundPosition: 'center bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: '1691px 1177px',
        }}
      >
        <div className="mx-auto w-full max-w-[1440px] px-5 sm:px-8 lg:px-12">
          {content}
        </div>
      </section>
    );
  }

  return (
    <section className="mt-16 w-full sm:mt-24" aria-label={section.label || 'Примеры курсов'}>
      {content}
    </section>
  );
}

function ProductGoals({ section }) {
  if (!section?.items?.length) {
    return null;
  }

  return (
    <section className="mt-20 w-full sm:mt-28">
      <h2 className="max-w-[800px] text-[32px] font-bold leading-10 text-label-primary">
        {section.title}
      </h2>
      <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3">
        {section.items.map((item) => (
          <article key={item.title} className="flex flex-col gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FF6170]">
              <Image
                src={item.icon}
                alt=""
                aria-hidden="true"
                width={item.iconWidth || 30}
                height={item.iconHeight || 30}
              />
            </div>
            <div className="space-y-1 text-base leading-6 text-label-secondary">
              <h3 className="font-bold text-label-primary">{item.title}</h3>
              <p>{item.description}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function UXContextVisual({ type }) {
  if (type === 'sound') {
    return (
      <div className="relative h-[136px] overflow-hidden rounded-[24px] bg-[#00B87E]">
        <div className="absolute left-[7%] top-1/2 h-[88px] w-[155px] -translate-y-1/2">
          <Image src="/uchi/ux-context/sound-left.svg" alt="" aria-hidden="true" width={12} height={52} className="absolute left-2 top-5 h-[50px] w-[12px]" />
          <Image src="/uchi/ux-context/sound-left-small.svg" alt="" aria-hidden="true" width={6} height={30} className="absolute left-5 top-7 h-[28px] w-[5px]" />
          <Image src="/uchi/ux-context/sound-right.svg" alt="" aria-hidden="true" width={12} height={52} className="absolute right-2 top-5 h-[50px] w-[12px]" />
          <Image src="/uchi/ux-context/sound-right-small.svg" alt="" aria-hidden="true" width={6} height={30} className="absolute right-5 top-7 h-[28px] w-[5px]" />
          <Image src="/uchi/ux-context/fox.svg" alt="" aria-hidden="true" width={95} height={88} className="absolute left-1/2 top-0 h-[88px] w-[95px] -translate-x-1/2" />
        </div>
        <p className="absolute left-[45%] top-1/2 w-[180px] -translate-y-1/2 text-[18px] font-bold leading-[22px] text-white">
          Убедись, что у тебя<br />включен звук
        </p>
      </div>
    );
  }

  const image = type === 'feedback'
    ? '/uchi/ux-context/feedback.png'
    : '/uchi/ux-context/devices.png';
  const background = type === 'feedback' ? 'bg-[#7665E5]' : 'bg-[#4CB7FF]';
  const imageClassName = type === 'feedback'
    ? 'h-full w-[366px] max-w-none object-cover'
    : 'h-[159px] w-[351px] max-w-none object-contain';

  return (
    <div className={`flex h-[136px] items-center justify-center overflow-hidden rounded-[24px] ${background}`}>
      <Image
        src={image}
        alt=""
        aria-hidden="true"
        width={type === 'feedback' ? 800 : 1774}
        height={type === 'feedback' ? 297 : 887}
        unoptimized={type === 'feedback'}
        className={imageClassName}
      />
    </div>
  );
}

function UXContext({ section }) {
  if (!section?.items?.length) {
    return null;
  }

  return (
    <section className="mt-20 w-full sm:mt-28">
      <h2 className="max-w-[800px] text-[32px] font-bold leading-10 text-label-primary">
        {section.title}
      </h2>
      <div className="mt-12 space-y-10 sm:space-y-14">
        {section.items.map((item) => (
          <article key={item.title} className="grid grid-cols-1 items-center gap-6 md:grid-cols-2 md:gap-8">
            <div className="px-1 text-label-secondary">
              <h3 className="text-[18px] font-bold leading-6">{item.title}</h3>
              <p className="mt-3 text-base leading-6">{item.description}</p>
            </div>
            <UXContextVisual type={item.visual} />
          </article>
        ))}
      </div>
    </section>
  );
}

function ProductModel({ section }) {
  if (!section) {
    return null;
  }

  return (
    <section className="mt-20 w-full sm:mt-28">
      <h2 className="max-w-[800px] text-[32px] font-bold leading-10 text-label-primary">
        {section.title}
      </h2>
      <div className="mt-12">
        <h3 className="text-xl font-bold leading-7 text-label-primary">{section.subtitle}</h3>
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {section.users.map((user) => (
            <article key={user.title} className="flex min-w-0 gap-5">
              <span className={`w-1 shrink-0 rounded-lg ${user.colorClassName}`} />
              <p className="text-base leading-6 text-label-secondary">
                <strong className="font-bold">{user.title}</strong>{' '}
                {user.description}
              </p>
            </article>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-start gap-3 py-7 md:flex-row md:flex-wrap md:items-center md:gap-0">
          {section.steps.map((step, index) => (
            <Fragment key={step.label}>
              <div className="flex items-start md:self-stretch">
                <span className={`flex shrink-0 items-start rounded-2xl px-4 pb-4 pt-3 text-base font-normal leading-5 text-white md:h-[120px] ${step.widthClassName || 'w-32'} ${step.colorClassName}`}>
                  {step.label}
                </span>
              </div>
              {index < section.steps.length - 1 && (
                <Image
                  src="/uchi/icons/model-arrow.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="h-6 w-6 rotate-90 md:rotate-0"
                />
              )}
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}

function PurchaseTransition({ section }) {
  if (!section?.items?.length) {
    return null;
  }

  return (
    <section className="mt-20 w-full sm:mt-28">
      <h2 className="max-w-[800px] text-[32px] font-bold leading-10 text-label-primary">
        {section.title}
      </h2>
      {section.description && (
        <p className="mt-6 max-w-[800px] text-base leading-6 text-label-secondary">
          {section.description}
        </p>
      )}
      <div className="mt-12 grid grid-cols-1 gap-x-6 gap-y-12 md:grid-cols-2">
        {section.items.map((item, index) => (
          <article key={item.title} className={index === section.items.length - 1 ? 'md:col-span-2' : ''}>
            <Image
              src={item.image.src}
              alt={item.image.alt || item.title}
              width={item.image.width}
              height={item.image.height}
              sizes={index === section.items.length - 1 ? '(min-width: 768px) 920px, calc(100vw - 2.5rem)' : '(min-width: 768px) 448px, calc(100vw - 2.5rem)'}
              className="h-auto w-full"
            />
            <h3 className="mt-4 text-[18px] font-bold leading-6 text-label-primary">{item.title}</h3>
            <p className="mt-2 max-w-[800px] text-base leading-6 text-label-secondary">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function TeamRole({ section }) {
  if (!section?.roles?.length) {
    return null;
  }

  return (
    <section className="mt-20 w-full sm:mt-28">
      <h2 className="max-w-[800px] text-[32px] font-bold leading-10 text-label-primary">
        {section.title}
      </h2>
      <p className="mt-6 max-w-[800px] text-base leading-6 text-label-secondary">
        {section.description}
      </p>
      <div className="mt-8 flex flex-wrap gap-3 py-6">
        {section.roles.map((role) => (
          <span
            key={role.label}
            className={`rounded-full px-4 py-2 text-base leading-[21px] ${role.highlighted ? 'bg-[#A362FC] font-medium text-white' : 'bg-[#F5F5F5] font-normal text-label-primary'}`}
          >
            {role.label}
          </span>
        ))}
      </div>
    </section>
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

export default function ProjectPage({ title, productLogo, heroImage, statusNote, type, year, description, facts = [], summary = [], introSections = [], images = [], videos = [], sections = [], caseHeader, productOverview, showcase, productGoals, uxContext, productModel, purchaseTransition, teamRole }) {
  if (caseHeader) {
    return (
      <>
        <Head>
          <title>{`Кейс — ${title}`}</title>
        </Head>
        <main className="min-h-screen bg-white pb-16 text-label-primary">
          <CaseHeader title={title} description={caseHeader.description} pills={caseHeader.pills} heroImage={heroImage} />
          <div className="mx-auto w-full max-w-[920px] px-5 sm:px-6 lg:px-0">
            <ProductOverview section={productOverview} />
            <CourseShowcase section={showcase} />
            <ProductGoals section={productGoals} />
            <UXContext section={uxContext} />
            <ProductModel section={productModel} />
            <PurchaseTransition section={purchaseTransition} />
            <TeamRole section={teamRole} />
            {introSections.map((section) => (
              <section key={section.title} className="mt-16 w-full sm:mt-24">
                {section.title && (
                  <h2 className="mb-6 max-w-[800px] text-[32px] font-semibold leading-[40px] text-label-primary">
                    {section.title}
                  </h2>
                )}
                <TextBlock description={section.description} className="max-w-[800px]" />
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
              <section key={section.title} className="mt-16 w-full sm:mt-24">
                <h2 className="mb-6 max-w-[800px] text-[32px] font-semibold leading-[40px] text-label-primary">{section.title}</h2>
                <TextBlock description={section.description} className="max-w-[800px]" />
                <MediaBlocks images={section.images} videos={section.videos} />
              </section>
            ))}
          </div>
        </main>
      </>
    );
  }

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
              <div
                className="ios-squircle relative h-12 w-12 shrink-0 overflow-hidden bg-[#135BFF] sm:h-14 sm:w-14"
              >
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

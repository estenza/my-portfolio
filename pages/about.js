import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import BackButton from '../components/BackButton.js';
import content from '../data/content.json';

const COLLAPSED_EXPERIENCE_HEIGHT = 640;

function capitalizeRussianTag(tag) {
  return tag.replace(/^(\s*)([а-яё])/u, (_, prefix, letter) => `${prefix}${letter.toUpperCase()}`);
}

function RichText({ blocks, className = '' }) {
  return (
    <div className={className}>
      {blocks.map((block, index) => {
        const hasNextBlock = index < blocks.length - 1;

        if (block.type === 'list') {
          return (
            <ul
              key={`${block.type}-${index}`}
              className={`list-disc list-outside space-y-2 pl-6 ${hasNextBlock ? 'mb-4' : ''}`}
            >
              {block.items.map((item) => (
                <li key={item} className="pl-3">{item}</li>
              ))}
            </ul>
          );
        }

        return (
          <p key={`${block.type}-${index}`} className={hasNextBlock ? 'mb-4' : ''}>
            {block.text}
          </p>
        );
      })}
    </div>
  );
}

function ChevronIcon({ isExpanded }) {
  return (
    <svg
      aria-hidden="true"
      className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

function ExperienceItem({ name, href, logo, dates, summary, details }) {
  const contentRef = useRef(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isExpandable, setIsExpandable] = useState(false);
  const blocks = [
    { type: 'paragraph', text: summary },
    ...(details.length > 0 ? [{ type: 'list', items: details }] : []),
  ];

  useEffect(() => {
    const content = contentRef.current;
    if (!content) {
      return undefined;
    }

    const updateExpandableState = () => {
      const hasOverflow = content.scrollHeight > COLLAPSED_EXPERIENCE_HEIGHT + 1;
      setIsExpandable(hasOverflow);

      if (!hasOverflow) {
        setIsExpanded(false);
      }
    };

    updateExpandableState();
    window.addEventListener('resize', updateExpandableState);

    const resizeObserver = new ResizeObserver(updateExpandableState);
    resizeObserver.observe(content);

    return () => {
      window.removeEventListener('resize', updateExpandableState);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <div className="grid grid-cols-1 gap-y-5 gap-x-8 py-8 first:pt-0 last:pb-0 lg:grid-cols-[180px_minmax(0,1fr)]">
      <div className="grid w-full grid-cols-[64px_minmax(0,1fr)] items-start gap-4 lg:block lg:pt-6">
        {logo && (
          <div className="relative h-16 w-16 overflow-hidden rounded-full bg-neutral-100 lg:mb-5 lg:h-[72px] lg:w-[72px]">
            <Image
              src={logo}
              alt=""
              fill
              className="object-cover"
              sizes="72px"
            />
          </div>
        )}
        <div>
          <h3 className="mb-1 text-xl font-semibold text-neutral-950">
            {href ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="underline transition-all hover:text-blue-600"
              >
                {name}
              </a>
            ) : (
              name
            )}
          </h3>
          <p className="text-base text-label-tertiary">{dates}</p>
        </div>
      </div>
      <div className="w-full max-w-[700px] lg:pt-6">
        <div
          ref={contentRef}
          className={`relative overflow-hidden ${isExpanded ? '' : 'max-h-[640px]'}`}
        >
          <RichText
            blocks={blocks}
            className="w-full text-lg leading-relaxed text-label-primary"
          />
          {isExpandable && !isExpanded && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-white/0 to-white"
            />
          )}
        </div>

        {isExpandable && (
          <button
            type="button"
            className="mt-5 inline-flex cursor-pointer items-center gap-1.5 text-base font-medium text-neutral-950 transition-colors hover:text-blue-600"
            onClick={() => setIsExpanded((value) => !value)}
            aria-expanded={isExpanded}
          >
            {isExpanded ? 'Свернуть' : 'Развернуть'}
            <ChevronIcon isExpanded={isExpanded} />
          </button>
        )}
      </div>
    </div>
  );
}

export default function AboutPage() {
  const { aboutMe } = content;
  const aboutBlocks = ['p1', 'p2', 'p3', 'p4', 'p5'].map((key) => ({
    type: 'paragraph',
    text: aboutMe[key],
  }));
  const getDetails = (key) => {
    const details = aboutMe[key]?.details;
    return Array.isArray(details) ? details : [];
  };
  const skills = aboutMe.skills;
  const skillTags = Array.isArray(skills) ? skills : [];
  const experiences = [
    {
      key: 'uchi',
      href: 'https://uchi.ru/',
      logo: '/workplaces/uchi.svg',
    },
    {
      key: 'parkly',
      href: 'https://apps.apple.com/ru/app/%D0%BF%D0%B0%D1%80%D0%BA%D0%BB%D0%B8-%D0%BF%D0%B0%D1%80%D0%BA%D0%BE%D0%B2%D0%BA%D0%B8-%D0%BC%D0%BE%D1%81%D0%BA%D0%B2%D1%8B-%D0%B8-%D1%81%D0%BF%D0%B1/id1530278550?referrer=appmetrica_tracking_id%3D1181069930796221196%26ym_tracking_id%3D8144508877423365345',
      logo: '/workplaces/parkly.svg',
    },
    {
      key: 'noomad',
      logo: '/workplaces/noomad.svg',
    },
    {
      key: 'athanor',
      href: 'https://www.linkedin.com/company/atnrpro/',
      logo: '/workplaces/athanor.png',
    },
  ];

  return (
    <div className="w-full px-5 py-8 text-label-primary tracking-wide sm:px-6 sm:py-10 lg:px-10 lg:py-12">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 gap-y-6 lg:grid-cols-[48px_minmax(0,964px)] lg:justify-center lg:gap-x-10">
        <div className="hidden lg:block">
          <BackButton variant="desktop" />
        </div>

        <div className="flex w-full min-w-0 flex-col items-start gap-10 text-left sm:gap-12 lg:gap-16">
          <div className="-mb-4 lg:hidden">
            <BackButton variant="mobile-compact" />
          </div>

          <section className="flex w-full flex-col gap-6 sm:gap-8">
            <h1 className="text-3xl font-semibold leading-tight sm:text-4xl">{aboutMe.title}</h1>

            <div className="grid w-full grid-cols-1 gap-8 lg:grid-cols-[180px_minmax(0,700px)] lg:gap-10">
              <div className="w-full shrink-0">
                <div className="relative h-40 w-40 overflow-hidden rounded-full sm:h-48 sm:w-48 lg:h-44 lg:w-44">
                  <Image
                    src="/images/my-photo.png"
                    alt={aboutMe.photoAlt}
                    fill
                    className="object-cover"
                    sizes="192px"
                  />
                </div>
              </div>

              <RichText
                blocks={aboutBlocks}
                className="w-full max-w-[700px] text-lg leading-relaxed tracking-wide text-label-primary"
              />
            </div>
          </section>

          <section className="flex w-full flex-col gap-4">
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{aboutMe.cvTitle}</h2>

            <div className="divide-y divide-neutral-200">
              {experiences.map((experience) => (
                <ExperienceItem
                  key={experience.key}
                  name={aboutMe[experience.key].name}
                  href={experience.href}
                  logo={experience.logo}
                  dates={aboutMe[experience.key].dates}
                  summary={aboutMe[experience.key].summary}
                  details={getDetails(experience.key)}
                />
              ))}
            </div>
          </section>

          <section className="flex w-full flex-col gap-6 sm:gap-8">
            <h2 className="text-2xl font-semibold leading-tight sm:text-3xl">{aboutMe.skillsTitle}</h2>

            <div className="flex flex-wrap gap-2">
              {skillTags.map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-neutral-100 px-4 py-2 text-base leading-none text-label-primary"
                >
                  {capitalizeRussianTag(skill)}
                </span>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

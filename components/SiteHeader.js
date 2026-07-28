import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const contactLinks = [
  {
    href: 'https://t.me/estenza',
    label: 'Телеграм',
  },
  {
    href: 'https://linkedin.com/in/vadim-zaripov-40448317a',
    label: 'LinkedIn',
  },
];

function ContactLinkButton({ href, label }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-10 items-center justify-center rounded-xl bg-[#135BFF]/8 px-4 text-base font-medium leading-6 text-[#135BFF] transition-colors hover:bg-[#135BFF]/12"
    >
      {label}
    </a>
  );
}

export default function SiteHeader() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  useEffect(() => {
    if (!isContactOpen) {
      return undefined;
    }

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsContactOpen(false);
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isContactOpen]);

  return (
    <>
      <header className="sticky top-0 z-50 h-[72px] w-full bg-white text-label-primary shadow-[0_2px_12px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-full w-full max-w-[920px] items-center justify-between px-6 py-3 lg:px-0">
          <Link href="/" className="flex min-w-0 items-center gap-6">
            <span className="relative h-12 w-12 shrink-0 overflow-hidden">
              <Image
                src="/vz-logo.svg"
                alt=""
                fill
                priority
                className="object-contain"
                sizes="48px"
              />
            </span>
            <span className="truncate text-2xl font-semibold leading-9 text-label-primary max-[543px]:hidden">
              Вадим Зарипов
            </span>
          </Link>

          <button
            type="button"
            className="shrink-0 cursor-pointer"
            onClick={() => setIsContactOpen(true)}
          >
            <span className="inline-flex h-10 items-center justify-center rounded-xl bg-[#0A0A0A] px-6 text-base font-medium leading-none text-white transition-colors hover:bg-neutral-800">
              Связаться со мной
            </span>
          </button>
        </div>
      </header>

      {isContactOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-black/32 p-0 backdrop-blur-md md:items-center md:p-6"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setIsContactOpen(false);
            }
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-modal-title"
            className="relative flex w-full flex-col rounded-t-[24px] bg-white p-6 pb-8 shadow-[0_24px_80px_rgba(0,0,0,0.18)] md:max-w-[480px] md:rounded-[24px] md:p-8"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              aria-label="Закрыть"
              className="absolute right-4 top-4 inline-flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[#F5F5F5] text-2xl font-normal leading-none text-label-primary transition-colors hover:bg-neutral-200"
              onClick={() => setIsContactOpen(false)}
            >
              ×
            </button>

            <div className="pr-12">
              <h2
                id="contact-modal-title"
                className="text-[32px] font-semibold leading-10 text-label-primary"
              >
                Связаться со мной
              </h2>
              <p className="mt-2 flex items-center gap-2 text-base font-normal leading-6 text-label-primary">
                <span className="relative inline-flex h-3 w-3 items-center justify-center" aria-hidden="true">
                  <span className="absolute inline-flex h-3 w-3 animate-ping rounded-full bg-emerald-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-emerald-100" />
                </span>
                Доступен для новых проектов
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {contactLinks.map((item) => (
                <ContactLinkButton key={item.label} href={item.href} label={item.label} />
              ))}
            </div>

            <a
              href="mailto:estenza@gmail.com"
              className="mt-6 w-fit text-base font-normal leading-6 text-label-primary transition-colors hover:text-[#135BFF]"
            >
              estenza@gmail.com
            </a>
          </section>
        </div>
      )}
    </>
  );
}

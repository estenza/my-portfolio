import ProjectCard from '../components/ProjectCard';
import MemojiAvatar from '../components/MemojiAvatar';
import Link from 'next/link';
import content from '../data/content.json';

export default function Home() {
  const { projects } = content;

  const contactLinks = [
    {
      href: '/about',
      label: content.about,
      isInternal: true,
      isAvatar: true,
    },
    {
      href: 'https://t.me/estenza',
      label: 'Telegram',
      className: 'bg-neutral-100 text-neutral-950 hover:bg-neutral-200'
    },
    {
      href: 'https://linkedin.com/in/vadim-zaripov-40448317a',
      label: 'LinkedIn',
      className: 'bg-neutral-100 text-neutral-950 hover:bg-neutral-200'
    },
    {
      href: 'mailto:estenza@gmail.com',
      label: content.email,
      className: 'bg-neutral-100 text-neutral-950 hover:bg-neutral-200'
    },
    {
      href: `/${content.cv.fileName}`,
      label: content.cv.buttonText,
      className: 'bg-neutral-100 text-neutral-950 hover:bg-neutral-200'
    }
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-white px-5 pt-10 pb-0 text-neutral-950 tracking-wide sm:px-6 sm:pt-12 lg:px-10">
      <div className="mx-auto flex w-full max-w-screen-xl flex-col gap-12 sm:gap-14 lg:gap-16">
        <section className="mx-auto flex w-full max-w-5xl flex-col items-center text-center">
          <h1 className="max-w-5xl text-3xl font-semibold leading-tight sm:text-4xl">
            {content.name}
          </h1>

          <p className="mt-6 max-w-[680px] text-base leading-relaxed text-label-primary sm:mt-8 sm:text-lg">
            {content.description}
          </p>

          <div className="mt-8 flex w-full flex-wrap justify-center gap-2 text-lg leading-normal sm:mt-10">
            {contactLinks.map((item) => {
              if (item.isAvatar) {
                return <MemojiAvatar key={item.label} href={item.href} label={item.label} className="max-w-full" />;
              }

              const className = `inline-flex h-[72px] items-center justify-center rounded-full px-5 leading-none whitespace-nowrap transition-colors sm:px-8 ${item.className}`;

              if (item.isInternal) {
                return (
                  <Link key={item.label} href={item.href} className={className}>
                    {item.label}
                  </Link>
                );
              }

              return (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
                  className={className}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </section>

        <section className="grid grid-cols-1 items-stretch gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-3 lg:gap-x-8 xl:gap-x-10">
          <ProjectCard
            title={projects.parkly.title}
            description={projects.parkly['description-short']}
            image="/previews/parkly-2x.png"
            href="/parkly"
          />
          <ProjectCard
            title={projects.noomad.title}
            description={projects.noomad['description-short']}
            image="/previews/noomad-2x.png"
            href="/noomad"
          />
          <ProjectCard
            title={projects.uchiCase.title}
            description={projects.uchiCase['description-short']}
            image="/previews/uchi-2x.png"
            href="/uchi"
          />
          <ProjectCard
            title={projects.meeet.title}
            description={projects.meeet['description-short']}
            image="/meeet/meeet.png"
            href="/meeet"
          />
        </section>
      </div>

      <footer className="mx-auto flex max-w-screen-xl flex-col items-center justify-between gap-3 pt-20 pb-6 text-center md:flex-row md:text-left lg:pt-24">
        <p className="text-base text-label-quarternary">
          {content.footer.lastUpdated}
        </p>
        <p className="text-base text-label-quarternary md:text-right">
          {content.footer.builtWith}
        </p>  
      </footer>
    </main>
  );
}

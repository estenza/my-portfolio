import Link from 'next/link';

export default function ErrorPage({ code, title, description }) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6 py-12 text-label-primary tracking-wide">
      <section className="w-full max-w-[544px] text-left">
        <p className="mb-4 text-lg font-semibold text-label-tertiary">{code}</p>
        <h1 className="mb-6 text-4xl font-semibold text-neutral-950">{title}</h1>
        <p className="mb-10 text-lg leading-relaxed text-label-primary">{description}</p>
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-full bg-neutral-100 px-8 py-3 text-lg leading-none text-neutral-950 transition-colors hover:bg-neutral-200"
        >
          На главную
        </Link>
      </section>
    </main>
  );
}

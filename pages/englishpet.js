import Head from 'next/head';
import Link from 'next/link';

export default function EnglishPetRedirectPage() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/uchi/" />
        <link rel="canonical" href="/uchi/" />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-white px-5 text-center text-label-primary">
        <p className="text-base">
          Кейс переехал на страницу{' '}
          <Link href="/uchi/" className="underline transition-opacity hover:opacity-[0.64]">
            Учи.ру
          </Link>
          .
        </p>
      </main>
    </>
  );
}

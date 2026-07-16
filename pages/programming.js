import Head from 'next/head';
import Link from 'next/link';

export default function ProgrammingRedirectPage() {
  return (
    <>
      <Head>
        <meta httpEquiv="refresh" content="0; url=/uchi/" />
        <link rel="canonical" href="/uchi/" />
      </Head>

      <main className="flex min-h-screen items-center justify-center bg-white px-5 text-center text-label-primary">
        <p className="text-base">
          Кейс переехал на страницу{' '}
          <Link href="/uchi/" className="underline hover:text-blue-600">
            Учи.ру
          </Link>
          .
        </p>
      </main>
    </>
  );
}

import Head from 'next/head';

export default function Meta({ title, description }) {
  const defaultDescription = "Портфолио продуктового дизайнера Вадима Зарипова. Опыт в Edtech, Fintech, SaaS.";
  const siteUrl = "https://vadimzaripov.ru"; // Укажите ваш основной домен

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      
      {/* Favicon links */}
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="manifest" href="/site.webmanifest" />

      {/* --- Open Graph Meta Tags --- */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} /> {/* <-- ВАЖНО: полный URL */}
      <meta property="og:url" content={siteUrl} />
      <meta property="og:type" content="website" />

      {/* --- Twitter Card Tags (опционально, но рекомендуется) --- */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={`${siteUrl}/og-image.png`} /> {/* <-- ВАЖНО: полный URL */}

    </Head>
  );
}
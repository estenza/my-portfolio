import Head from 'next/head';

const defaultTitle = 'Вадим Зарипов — продуктовый дизайнер';
const defaultDescription = 'Портфолио продуктового дизайнера Вадима Зарипова. B2C, edtech, стартапы и продукты 0 → 1.';
const siteUrl = 'https://vadimzaripov.ru';
const previewUrl = `${siteUrl}/images/portfolio-preview-2026.png`;

export default function Meta({ title = defaultTitle, description = defaultDescription }) {

  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      
      <link rel="icon" href="/favicons/favicon.svg" type="image/svg+xml" />
      <link rel="apple-touch-icon" href="/favicons/apple-touch-icon.png" />
      <link rel="manifest" href="/favicons/site.webmanifest" />

      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={`${siteUrl}/`} />
      <meta property="og:site_name" content="Портфолио Вадима Зарипова" />
      <meta property="og:locale" content="ru_RU" />
      <meta property="og:image" content={previewUrl} />
      <meta property="og:image:secure_url" content={previewUrl} />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="Вадим Зарипов — продуктовый дизайнер" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={previewUrl} />
      <meta name="twitter:image:alt" content="Вадим Зарипов — продуктовый дизайнер" />
    </Head>
  );
}

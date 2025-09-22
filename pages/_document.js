import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Geist:wght@100..900&family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="bg-black text-white font-sans">
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
import { Html, Head, Main, NextScript } from "next/document";
import { i18n } from 'next-i18next';

export default function Document() {
  // Gunakan bahasa dari i18n atau default ke 'id'
  const lang = i18n?.language || 'id';
  
  return (
    <Html lang={lang}>
      <Head>
        {/* Favicon */}
        <link rel="shortcut icon" href="/assets/logo-kpf.png" type="image/png" />
        <link rel="icon" href="/assets/logo-kpf.png" type="image/png" />
        
        {/* Fonts */}
        <link
          href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body className="antialiased">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

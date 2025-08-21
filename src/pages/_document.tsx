import { Html, Head, Main, NextScript, DocumentContext } from "next/document";

export default function Document() {
  // Default language
  const lang = 'id';
  
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

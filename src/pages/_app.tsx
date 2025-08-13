import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { appWithTranslation, useTranslation } from 'next-i18next';
import nextI18NextConfig from '../../next-i18next.config';
import LoadingScreen from "@/components/organisms/LoadingScreen";

function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { i18n } = useTranslation();
  const { pathname, asPath, query, locale } = router;

  // Handle loading state
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    };
  }, [router]);

  // Handle route changes and sync i18n
  useEffect(() => {
    if (!router.isReady) return;

    const handleRouteChange = (url: string, { shallow }: { shallow: boolean }) => {
      // Skip if this is a shallow route change
      if (shallow) return;

      // Extract locale from URL
      const localeMatch = url.match(/^\/(en|id)(\/|$)/);
      const newLocale = localeMatch ? localeMatch[1] : 'id';
      
      // Always update i18n to ensure consistency
      if (i18n.language !== newLocale) {
        i18n.changeLanguage(newLocale).catch(console.error);
      }

      // Ensure URL has correct locale prefix for non-default language
      if (newLocale !== 'id' && !url.startsWith(`/${newLocale}`)) {
        const cleanPath = url.startsWith('/id/') ? url.replace(/^\/id/, '') : url;
        const newPath = `/${newLocale}${cleanPath === '/' ? '' : cleanPath}`;
        
        if (newPath !== url) {
          router.replace(
            newPath,
            undefined,
            { locale: newLocale, shallow: true }
          );
        }
      }
    };

    // Sync on initial load
    handleRouteChange(router.asPath, { shallow: false });
    
    // Sync on route changes
    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router.isReady, router.events, router.asPath, i18n]);

  // Handle initial locale setup - only runs once on mount
  useEffect(() => {
    if (!router.isReady) return;

    const currentPath = router.asPath;
    const currentLocale = locale || 'id';
    
    // For default locale (id), ensure no /id prefix
    if (currentLocale === 'id' && currentPath.startsWith('/id')) {
      const newPath = currentPath.replace(/^\/id(\/|$)/, '/') || '/';
      if (newPath !== currentPath) {
        router.replace(
          { pathname: newPath, query },
          undefined,
          { locale: 'id', shallow: true }
        );
      }
    }
    // For non-default locales, ensure they have the correct prefix
    else if (currentLocale !== 'id') {
      // Only add prefix if it's not already there
      if (!currentPath.startsWith(`/${currentLocale}`)) {
        const cleanPath = currentPath.startsWith('/id/') 
          ? currentPath.replace(/^\/id/, '') 
          : currentPath;
        const newPath = `/${currentLocale}${cleanPath === '/' ? '' : cleanPath}`;
        
        // Only update if path actually needs to change
        if (newPath !== currentPath) {
          router.replace(
            { pathname: newPath, query },
            undefined,
            { locale: currentLocale, shallow: true }
          );
        }
      }
    }
  }, [router.isReady]); // Only run once when router is ready

  // Handle loading screen
  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleStop = () => setLoading(false);

    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    const initialLoad = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
      clearTimeout(initialLoad);
    };
  }, [router]);

  return (
    <>
      <LoadingScreen show={loading} />
      {!loading && <Component {...pageProps} />}
    </>
  );
}

export default appWithTranslation(App, nextI18NextConfig);

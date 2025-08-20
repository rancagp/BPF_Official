// Halaman Home

"use client";

import React, { ReactNode } from "react";
import Head from "next/head";
import NavBar from "@/components/organisms/NavBar";
import Footer from "@/components/organisms/Footer";
import DateTimeDisplay from "@/components/organisms/DateTimeDisplay";

interface PageTemplateProps {
    title?: string;
    description?: string;
    children: ReactNode;
}

export default function PageTemplate({ title, description, children }: PageTemplateProps) {
    const pageTitle = title ? `${title} - PT. Kontak Perkasa Futures` : "PT. Kontak Perkasa Futures";
    const pageDescription = description || "PT. Kontak Perkasa Futures adalah perusahaan pialang berjangka terpercaya di Indonesia.";
    
    return (
        <>
            <Head>
                <title>{pageTitle}</title>
                <meta name="description" content={pageDescription} />
                <meta property="og:title" content={pageTitle} />
                <meta property="og:description" content={pageDescription} />
                <meta name="twitter:title" content={pageTitle} />
                <meta name="twitter:description" content={pageDescription} />

                {/* Favicon & Icons */}
                <link rel="icon" href="/assets/logo-kpf.png" type="image/png" />
                <link rel="shortcut icon" href="/assets/logo-kpf.png" type="image/png" />
                <link rel="apple-touch-icon" href="/assets/logo-kpf.png" />
                <meta name="apple-mobile-web-app-title" content="KPF" />

                {/* Font: Montserrat */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </Head>

            <DateTimeDisplay />
            <NavBar />

            <main>{children}</main>
            <Footer />
        </>
    );
}

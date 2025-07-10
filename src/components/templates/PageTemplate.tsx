// Halaman Home

"use client";

import React, { ReactNode } from "react";
import Head from "next/head";
import NavBar from "@/components/organisms/NavBar";
import Footer from "@/components/organisms/Footer";
import DateTimeDisplay from "@/components/organisms/DateTimeDisplay";

interface PageTemplateProps {
    title?: string;
    children: ReactNode;
}

export default function PageTemplate({ title, children }: PageTemplateProps) {
    return (
        <>
            <Head>
                <title>{title ? `${title} - PT. Kontak Perkasa Futures` : "PT. Kontak Perkasa Futures"}</title>

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

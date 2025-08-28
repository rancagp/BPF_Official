"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import MarketUpdate from "./MarketUpdate";

interface MenuItem {
  key: string;
  label: string;
  href?: string;
  submenu?: MenuItem[];
  icon?: string;
  disabled?: boolean;
}

interface NavItem extends Omit<MenuItem, "submenu"> {
  submenu?: NavItem[];
  target?: string;
}

const baseMenuItems: NavItem[] = [
  { key: "home", label: "Beranda", href: "/" },
  {
    key: "about",
    label: "Tentang Kami",
    submenu: [
      { key: "about_companyProfile", label: "Profil Perusahaan", href: "/profil/perusahaan" },
      { key: "about_businessLicense", label: "Legalitas Bisnis", href: "/profil/legalitas-bisnis" },
      { key: "about_brokerRepresentative", label: "Wakil Pialang", href: "/profil/wakil-pialang" },
      { key: "about_regulatoryBody", label: "Badan Regulasi", href: "/profil/badan-regulasi" },
      { key: "about_facilitiesServices", label: "Fasilitas & Layanan", href: "/umum/fasilitas-layanan" },
      {
        key: "about_achievements",
        label: "Pencapaian",
        submenu: [
          { key: "about_achievements_awards", label: "Penghargaan", href: "/profil/pencapaian/penghargaan" },
          { key: "about_achievements_certificates", label: "Sertifikat", href: "/profil/pencapaian/sertifikat" },
        ],
      },
      {
        key: "about_general",
        label: "Umum",
        submenu: [
          { key: "about_general_information", label: "Informasi", href: "/umum/informasi" },
          { key: "about_general_videos", label: "Video", href: "/umum/video" },
        ],
      },
    ],
  },
  {
    key: "products",
    label: "Produk",
    submenu: [
      { key: "products_allProducts", label: "Semua Produk", href: "/produk" },
      { key: "products_jfxProducts", label: "Produk JFX", href: "/produk/jfx" },
      { key: "products_spaProducts", label: "Produk SPA", href: "/produk/spa" },
      { key: "products_productAdvantages", label: "Keunggulan Produk", href: "/produk/keunggulan-produk" },
      { key: "products_transactionIllustration", label: "Ilustrasi Transaksi", href: "/prosedur/ilustrasi-transaksi" },
    ],
  },
  {
    key: "procedures",
    label: "Prosedur",
    submenu: [
      { key: "procedures_onlineRegistration", label: "Pendaftaran Online", href: "/prosedur/registrasi-online" },
      { key: "procedures_withdrawal", label: "Penarikan Dana", href: "/prosedur/penarikan" },
      { key: "procedures_transactionGuide", label: "Panduan Transaksi", href: "/prosedur/petunjuk-transaksi" },
    ],
  },
  {
    key: "analysis",
    label: "Analisis",
    submenu: [
      { key: "analysis_news", label: "Berita", href: "/analisis/berita" },
      { key: "analysis_economicCalendar", label: "Kalender Ekonomi", href: "/analisis/economic-calendar" },
      { key: "analysis_historicalData", label: "Data Historis", href: "/analisis/historical-data" },
      { key: "analysis_pivotFibonacci", label: "Pivot & Fibonacci", href: "/analisis/pivot-fibonacci" },
    ],
  },
  {
    key: "education",
    label: "Edukasi",
    submenu: [
      { key: "education_tradingMechanism", label: "Mekanisme Trading", href: "/edukasi/mekanisme-perdagangan" },
      { key: "education_indexSymbols", label: "Simbol Indeks", href: "/edukasi/symbol-indeks" },
      { key: "education_locoLondonGold", label: "Loco London Gold", href: "/edukasi/loco-london-gold" },
      { key: "education_summerWinter", label: "Summer & Winter", href: "/edukasi/summer-winter" },
      { key: "education_articles", label: "Artikel", href: "/edukasi/artikel" },
      {
        key: "education_marketingTools",
        label: "Alat Pemasaran",
        href: "https://digitalmarketing.kp-futures.com/",
        target: "_blank",
      },
    ],
  },
];

const NavBar: React.FC = () => {
  const { t, i18n } = useTranslation("common");
  const [menuItems, setMenuItems] = useState<NavItem[]>(baseMenuItems);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({});
  const [isClient, setIsClient] = useState(false);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
    const translatedMenuItems = baseMenuItems.map((item) => ({
      ...item,
      label: t(item.key, item.label),
      submenu: item.submenu?.map((sub) => ({
        ...sub,
        label: t(sub.key, sub.label),
        submenu: sub.submenu?.map((child) => ({
          ...child,
          label: t(child.key, child.label),
        })),
      })),
    }));
    setMenuItems(translatedMenuItems);
  }, [i18n.language, t]);

  const toggleDropdown = (key: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const closeAllMenus = () => {
    setMenuOpen(false);
    setOpenDropdowns({});
  };

  const renderMobileMenu = (items: NavItem[], level = 0) => {
    return (
      <div className={`${level > 0 ? `pl-4` : ""} mt-1 space-y-1`}>
        {items.map((item) => (
          <div key={item.key}>
            {item.href && !item.submenu ? (
              <Link
                href={item.href}
                locale={i18n.language}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50"
                onClick={closeAllMenus}
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
              >
                {item.label}
              </Link>
            ) : (
              <div>
                <button
                  onClick={() => toggleDropdown(item.key)}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-700 hover:bg-gray-50 flex justify-between items-center"
                >
                  {item.label}
                  {item.submenu && (
                    <i
                      className={`fas fa-chevron-${openDropdowns[item.key] ? "up" : "down"} text-xs`}
                    />
                  )}
                </button>
                {item.submenu && openDropdowns[item.key] && renderMobileMenu(item.submenu, level + 1)}
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  if (!isClient) return null;

  return (
    <div className="sticky top-0 z-50 bg-white">
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between h-16">
            {/* Logo */}
            <Link href="/" locale={i18n.language} className="flex items-center gap-1 group">
              <img
                src="/assets/logo-kpf-full.png"
                alt="Logo KPF"
                width={120}
                height={40}
                className="h-8 w-auto md:h-10 transition-transform duration-300 group-hover:scale-105"
              />
            </Link>

            {/* Desktop nav */}
            <div className="hidden md:flex items-center space-x-1">
              {menuItems.map((item, index) => (
                <div key={item.key} className="relative group">
                  <Link
                    href={item.href || "#"}
                    locale={i18n.language}
                    className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-green-700 transition-colors flex items-center"
                    target={item.target}
                    rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  >
                    {item.label}
                    {item.submenu && (
                      <i className="fas fa-chevron-down text-xs ml-1 transition-transform duration-200 group-hover:rotate-180" />
                    )}
                  </Link>
                  {item.submenu && (
                    <div
                      className={`absolute mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform ${
                        index >= menuItems.length - 2 ? "right-0" : "left-0"
                      }`}
                    >
                      {item.submenu.map((sub) => (
                        <div key={sub.key} className="relative group/sub">
                          <Link
                            href={sub.href || "#"}
                            locale={i18n.language}
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex justify-between items-center"
                            target={sub.target}
                            rel={sub.target === "_blank" ? "noopener noreferrer" : undefined}
                          >
                            {sub.label}
                            {sub.submenu && (
                              <i className="fas fa-chevron-right text-xs group-hover/sub:rotate-90 transition-transform duration-200" />
                            )}
                          </Link>
                          {sub.submenu && (
                            <div
                              className={`absolute top-0 w-56 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover/sub:opacity-100 group-hover/sub:visible transition-all duration-200 transform ${
                                index >= menuItems.length - 2
                                  ? "right-full mr-1"
                                  : "left-full ml-1"
                              }`}
                            >
                              {sub.submenu.map((child) => (
                                <Link
                                  key={child.key}
                                  href={child.href || "#"}
                                  locale={i18n.language}
                                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Mobile button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-green-700"
              >
                <i className={`fas ${menuOpen ? "fa-times" : "fa-bars"} text-xl`} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && <div className="md:hidden animate-slideDown bg-white">{renderMobileMenu(menuItems)}</div>}
      </nav>

      <MarketUpdate />
    </div>
  );
};

export default NavBar;

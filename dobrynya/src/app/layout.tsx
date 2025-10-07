import type { Metadata } from "next";
import Script from "next/script";
import Image from "next/image";
import Link from "next/link";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

const siteUrl = "https://dobrynya-stroy.online";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Добрыня — вентилируемые фасады",
    template: "%s — Добрыня",
  },
  description:
    "Расчёт и монтаж вентилируемых фасадов под ключ. Москва и МО. Выезд инженера — 24 часа.",
  applicationName: "Добрыня",
  keywords: [
    "вентилируемые фасады",
    "вентфасад",
    "монтаж фасадов",
    "фасад под ключ",
    "Москва",
    "МО",
  ],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    url: siteUrl,
    siteName: "Добрыня",
    title: "Добрыня — вентилируемые фасады",
    description:
      "Расчёт и монтаж вентилируемых фасадов под ключ. Москва и МО. Выезд инженера — 24 часа.",
    images: [
      {
        url: "/img/hero.png",
        width: 1200,
        height: 630,
        alt: "Добрыня — вентилируемые фасады",
      },
    ],
  },
  alternates: { canonical: siteUrl },
  icons: { icon: "/favicon.ico" },
};

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/5 bg-[color-mix(in_oklch,var(--background),transparent_20%)] backdrop-blur supports-[backdrop-filter]:bg-[color-mix(in_oklch,var(--background),transparent_35%)]">
      <div className="container-page flex items-center gap-6 py-3">
        <Link href="#home" className="flex items-center gap-3" aria-label="На главную">
          <Image src="/img/dobrynya_logo.png" alt="Добрыня" width={32} height={32} />
          <span className="font-bold tracking-tight">Добрыня</span>
        </Link>
        <nav className="ml-auto hidden md:flex gap-4 text-sm" aria-label="Основная навигация">
          <a href="#materials" className="hover:opacity-80">Материалы</a>
          <a href="#benefits" className="hover:opacity-80">Преимущества</a>
          <a href="#trust" className="hover:opacity-80">Почему доверяют</a>
          <a href="#projects" className="hover:opacity-80">Объекты</a>
          <a href="#reviews" className="hover:opacity-80">Отзывы</a>
          <a href="#faq" className="hover:opacity-80">FAQ</a>
          <a href="#calc" className="hover:opacity-80">Калькулятор</a>
          <a href="#contacts" className="hover:opacity-80">Контакты</a>
        </nav>
        <div className="ml-auto md:ml-0 flex items-center gap-2">
          <a href="tel:+74957778899" className="btn btn-outline">+7 (495) 777-88-99</a>
          <a
            href="https://wa.me/?text=Здравствуйте! Хочу рассчитать фасад."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
          >
            WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer id="contacts" className="border-t border-black/5 mt-16">
      <div className="container-page py-10 grid gap-4 sm:grid-cols-2 items-start">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <Image src="/img/dobrynya_icon.png" alt="Добрыня" width={28} height={28} />
            <span className="font-bold">Добрыня</span>
          </div>
          <p className="text-sm opacity-80">
            Москва и МО, выезд инженера — 24 часа
          </p>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <a href="tel:+74957778899" className="hover:opacity-80">+7 (495) 777-88-99</a>
          <a href="mailto:info@dobrynya-stroy.online" className="hover:opacity-80">info@dobrynya-stroy.online</a>
          <div className="flex gap-2 mt-2">
            <a
              className="btn btn-outline"
              href="https://t.me/share/url?url=https%3A%2F%2Fdobrynya-stroy.online&text=Здравствуйте! Хочу рассчитать фасад."
              target="_blank"
              rel="noopener noreferrer"
            >Telegram</a>
            <a
              className="btn btn-primary"
              href="https://wa.me/?text=Здравствуйте! Хочу рассчитать фасад."
              target="_blank"
              rel="noopener noreferrer"
            >WhatsApp</a>
          </div>
          <Link href="/privacy-policy" className="text-sm opacity-70 hover:opacity-100">Политика конфиденциальности</Link>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const ymId = process.env.NEXT_PUBLIC_YM_ID;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Добрыня",
    url: siteUrl,
    telephone: "+7 (495) 777-88-99",
    email: "info@dobrynya-stroy.online",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Москва",
      addressRegion: "Московская область",
      addressCountry: "RU",
    },
    areaServed: "Москва и МО",
    image: [`${siteUrl}/img/hero.png`],
    sameAs: [],
  };

  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased font-sans scroll-smooth`}>
        <Header />
        {children}
        <Footer />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {gaId && (
          <>
            <Script
              id="ga"
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', '${gaId}');`}
            </Script>
          </>
        )}

        {ymId && (
          <Script id="ym-init" strategy="afterInteractive">
            {`(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();k=e.createElement(t),a=e.getElementsByTagName(t)[0];k.async=1;k.src=r;a.parentNode.insertBefore(k,a)})(window, document, 'script', 'https://mc.yandex.ru/metrika/tag.js', 'ym'); ym(${ymId}, 'init', {clickmap:true, trackLinks:true, accurateTrackBounce:true, webvisor:true});`}
          </Script>
        )}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const roboto = Roboto({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Dubai Property Investment | Tax-Free 25% ROI | Wemark Real Estate',
  description: 'Secure prime Dubai property investments with guaranteed 25% ROI. Tax-free returns, flexible payment plans, and exclusive off-plan deals in Marina, Downtown & Palm Jumeirah. Licensed RERA agents.',
  keywords: 'Dubai property investment, tax-free investment, Dubai real estate, high ROI property, off-plan Dubai, luxury property investment, Dubai Marina, Downtown Dubai, Palm Jumeirah',
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Dubai Property Investment | Tax-Free 25% ROI | Wemark Real Estate',
    description: 'Secure prime Dubai property investments with guaranteed 25% ROI. Tax-free returns and exclusive off-plan deals.',
    url: 'https://www.wemark.ae',
    siteName: 'Wemark Real Estate',
    images: [
      {
        url: 'https://images.pexels.com/photos/19756845/pexels-photo-19756845.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630',
        width: 1200,
        height: 630,
        alt: 'Dubai luxury skyline - Premium real estate investment opportunities',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Property Investment | Tax-Free 25% ROI | Wemark Real Estate',
    description: 'Secure prime Dubai property investments with guaranteed 25% ROI. Tax-free returns and exclusive off-plan deals.',
    images: ['https://images.pexels.com/photos/19756845/pexels-photo-19756845.jpeg?auto=compress&cs=tinysrgb&w=1200&h=630'],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://wemark.ae",
    name: "Wemark Real Estate",
    alternateName: "Wemark Dubai Real Estate",
    description: "Dubai's premier luxury real estate investment company specializing in high-return property investments. Licensed RERA agents offering tax-free investment opportunities in Dubai Marina, Downtown, Palm Jumeirah, and Business Bay.",
    url: "https://wemark.ae",
    telephone: "+61426786664",
    email: "dubai@wemark.ae",
    foundingDate: "2008",
    priceRange: "$$$$",
    currenciesAccepted: "AED, USD, AUD",
    paymentAccepted: "Cash, Bank Transfer, Cryptocurrency",
    areaServed: [
      {
        "@type": "City",
        name: "Dubai"
      },
      {
        "@type": "Country",
        name: "United Arab Emirates"
      },
      {
        "@type": "Country",
        name: "Australia"
      }
    ],
    address: [
      {
        "@type": "PostalAddress",
        streetAddress: "OF401 - 50, Bardab - Mankhool",
        addressLocality: "Dubai",
        addressCountry: "AE"
      },
      {
        "@type": "PostalAddress",
        streetAddress: "3/392 Main N Rd, Blair Athol",
        addressLocality: "Adelaide",
        addressRegion: "SA",
        postalCode: "5084",
        addressCountry: "AU"
      }
    ],
    geo: {
      "@type": "GeoCoordinates",
      latitude: 25.2048,
      longitude: 55.2708
    },
    openingHours: "Mo-Su 00:00-23:59",
    image: "https://images.pexels.com/photos/19756845/pexels-photo-19756845.jpeg",
    logo: "https://wemark.ae/logo.png",
    sameAs: [
      "https://www.linkedin.com/company/wemark-real-estate"
    ],
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "127",
      bestRating: "5",
      worstRating: "1"
    },
    review: [
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "Sarah Al-Mansouri"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5"
        },
        reviewBody: "Wemark delivered exceptional results on our Downtown Dubai investment. 22% ROI in just 18 months. Professional, transparent, and highly recommended for serious property investors."
      },
      {
        "@type": "Review",
        author: {
          "@type": "Person",
          name: "James Mitchell"
        },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5"
        },
        reviewBody: "Outstanding service and market insight. Our Palm Jumeirah villa exceeded all expectations with 28% capital appreciation. Best investment decision we ever made."
      }
    ],
    makesOffer: [
      {
        "@type": "Offer",
        name: "Off-Plan Property Investment",
        description: "Early access to Dubai's newest developments at pre-launch prices with up to 30% below market value",
        category: "Real Estate Investment"
      },
      {
        "@type": "Offer",
        name: "Ready-to-Move Property Investment",
        description: "Immediate rental income from luxury properties in prime locations with 8-12% annual rental yields",
        category: "Real Estate Investment"
      }
    ],
    employee: [
      {
        "@type": "Person",
        name: "Parm Singh",
        jobTitle: "Principal & Founder",
        email: "parm@wemark.ae"
      },
      {
        "@type": "Person",
        name: "Kamal Singh",
        jobTitle: "Director (Dubai)",
        email: "kamal@wemark.ae"
      }
    ]
  };

  return (
    <html lang="en">
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'GA_MEASUREMENT_ID');
          `}
        </Script>
      </head>
      <body className={`${roboto.className} antialiased`}>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
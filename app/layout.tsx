import type { Metadata } from "next";
import "./globals.css";
import { site } from "./lib/data";

// Fonts are loaded via a standard <link> tag (see <head> below) rather
// than next/font/google. This keeps `next build` fully offline-capable
// (no network call to Google Fonts at build time) and matches how the
// fonts were already being loaded in the original page.

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Premium 4BHK Villas in ${site.city} by ${site.developer}`,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  keywords: [
    "Eloria villas",
    "Hyderabad villas",
    "4BHK villas Hyderabad",
    "gated villa community Hyderabad",
    "Myra Infra Developers",
    "independent villas Hyderabad",
    "luxury villas for sale Hyderabad",
  ],
  authors: [{ name: site.developer }],
  creator: site.developer,
  publisher: site.developer,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: `${site.name} by ${site.developer}`,
    title: `${site.name} — Premium 4BHK Villas in ${site.city}`,
    description: site.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 1000,
        alt: `${site.name} — tree-lined villa avenue at dusk`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — Premium 4BHK Villas in ${site.city}`,
    description: site.description,
    images: ["/images/hero.jpg"],
  },
};

// JSON-LD structured data: helps both classic search engines and
// generative / AI answer engines (ChatGPT, Perplexity, Google AI
// Overviews, Claude) understand and cite this page accurately (GEO).
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "RealEstateAgent",
        "@id": `${site.url}/#organization`,
        name: site.developer,
        url: site.url,
        image: `${site.url}/images/logo.jpg`,
        areaServed: {
          "@type": "City",
          name: site.city,
        },
      },
      {
        "@type": "Residence",
        "@id": `${site.url}/#residence`,
        name: `${site.name} — ${site.developer}`,
        description: site.description,
        url: site.url,
        image: [
          `${site.url}/images/hero.jpg`,
          `${site.url}/images/view_aerial.jpg`,
          `${site.url}/images/clubhouse.jpg`,
        ],
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: site.lat,
          longitude: site.lng,
        },
        numberOfRooms: 4,
        petsAllowed: true,
        amenityFeature: [
          "Clubhouse",
          "Swimming pool",
          "Tennis court",
          "Basketball court",
          "Yoga lawn",
          "Amphitheatre",
          "Children's play area",
          "Jogging track",
        ].map((name) => ({ "@type": "LocationFeatureSpecification", name })),
        containedInPlace: {
          "@type": "Place",
          name: `${site.name} — 24 acre gated community, 269 villas`,
        },
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "INR",
          lowPrice: 21000000,
          highPrice: 37650000,
          offerCount: 269,
          availability: "https://schema.org/InStock",
        },
      },
      {
        "@type": "FAQPage",
        "@id": `${site.url}/#faq`,
        mainEntity: [
          {
            "@type": "Question",
            name: "What is Eloria and where is it located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Eloria is a 24-acre gated villa community by Myra Infra & Developers, located in Hyderabad's western growth corridor. It comprises 269 independent G+2 villas around a G+4 clubhouse.",
            },
          },
          {
            "@type": "Question",
            name: "What is the starting price of villas at Eloria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Villas at Eloria start at ₹2.10 Cr onwards at launch pricing (₹6,999 per sft for a 200 Sq. Yds / 3,238 SFT unit). An all-inclusive rate of ₹8,500 per sft is also available.",
            },
          },
          {
            "@type": "Question",
            name: "What villa configurations are available at Eloria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All villas at Eloria are G+2, 4BHK homes with a dedicated home theatre, across five plot sizes from 200 to 300 Sq. Yds (3,238 to 4,427 SFT built-up).",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: `${site.name} — ${site.developer}`,
        publisher: { "@id": `${site.url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line react/no-danger
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-IN">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500;1,600&family=Jost:wght@300;400;500;600&display=swap"
        />
        <StructuredData />
      </head>
      <body className="bg-paper font-sans text-olive antialiased">
        {children}
      </body>
    </html>
  );
}

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
    default: "Myra Eloria | Myra Homes — Luxury 4BHK Villas in Hyderabad",
    template: "%s — Myra Eloria | Myra Homes",
  },
  description: site.description,
  keywords: [
    "Myra Homes",
    "Myra",
    "Myra Eloria",
    "Myra Infra",
    "Myra Infra & Developers",
    "Myra Homes Hyderabad",
    "Myra villas",
    "Myra Eloria villas",
    "Eloria by Myra",
    "Eloria Villas",
    "Eloria Hyderabad",
    "4BHK luxury villas Hyderabad",
    "gated villa community Hyderabad",
    "villas near ORR exit 5",
    "dundigal luxury villas",
    "independent luxury villas Hyderabad",
  ],
  authors: [{ name: "Myra Homes (Myra Infra & Developers)" }],
  creator: "Myra Homes",
  publisher: "Myra Infra & Developers",
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
      "max-video-preview": -1,
    },
  },
  other: {
    "geo.region": "IN-TG",
    "geo.placename": "Hyderabad",
    "geo.position": `${site.lat};${site.lng}`,
    ICBM: `${site.lat}, ${site.lng}`,
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: site.url,
    siteName: "Myra Homes — Myra Eloria Villas",
    title: "Myra Eloria | Luxury 4BHK Villas in Hyderabad by Myra Homes",
    description: site.description,
    images: [
      {
        url: "/images/hero.jpg",
        width: 1600,
        height: 1000,
        alt: "Myra Eloria by Myra Homes — tree-lined villa avenue at dusk",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Myra Eloria | Luxury 4BHK Villas in Hyderabad by Myra Homes",
    description: site.description,
    images: ["/images/hero.jpg"],
  },
};

// JSON-LD structured data: helps both classic search engines and
// generative / AI answer engines (ChatGPT, Perplexity, Google AI
// Overviews, Claude) understand and rank this page for Myra Homes, Myra & Myra Eloria.
function StructuredData() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Organization", "RealEstateAgent"],
        "@id": `${site.url}/#organization`,
        name: "Myra Homes",
        legalName: "Myra Infra & Developers",
        alternateName: [
          "Myra",
          "Myra Homes Hyderabad",
          "Myra Infra",
          "Myra Infra & Developers",
          "Myra Developers",
        ],
        url: site.url,
        logo: `${site.url}/images/logo.jpg`,
        image: `${site.url}/images/logo.jpg`,
        description:
          "Myra Homes (Myra Infra & Developers) — leading luxury residential property developer in Hyderabad, creators of Myra Eloria gated villa community.",
        areaServed: {
          "@type": "City",
          name: site.city,
        },
        address: {
          "@type": "PostalAddress",
          addressLocality: site.city,
          addressRegion: "Telangana",
          addressCountry: "IN",
        },
      },
      {
        "@type": "Residence",
        "@id": `${site.url}/#residence`,
        name: "Myra Eloria",
        alternateName: [
          "Myra Eloria Villas",
          "Eloria by Myra Homes",
          "Eloria Villas",
          "Myra Homes Eloria",
        ],
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
          name: "Myra Eloria — 24 acre gated community, 269 villas",
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
            name: "What is Myra Eloria by Myra Homes?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Myra Eloria is an ultra-luxury 24-acre gated villa community in Hyderabad developed by Myra Homes (Myra Infra & Developers), comprising 269 independent G+2 4BHK standalone villas with a private home theatre and a G+4 clubhouse.",
            },
          },
          {
            "@type": "Question",
            name: "Who is the developer of Eloria Villas?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Eloria is developed by Myra Homes (Myra Infra & Developers), one of Hyderabad's prominent luxury real estate developers.",
            },
          },
          {
            "@type": "Question",
            name: "Where is Myra Eloria located?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Myra Eloria is situated in Hyderabad's western growth corridor, just minutes from ORR Exit 5, offering smooth connectivity to Miyapur, Hitec City and the Financial District.",
            },
          },
          {
            "@type": "Question",
            name: "What is the starting price of villas at Myra Eloria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "Villas at Myra Eloria start at ₹2.10 Cr onwards at launch pricing (₹6,999 per sft for a 200 Sq. Yds / 3,238 SFT unit).",
            },
          },
          {
            "@type": "Question",
            name: "What villa configurations are available at Myra Eloria?",
            acceptedAnswer: {
              "@type": "Answer",
              text: "All villas at Myra Eloria are G+2, 4BHK homes with a dedicated private home theatre, across plot sizes from 200 to 300 Sq. Yds (3,238 to 4,427 SFT built-up).",
            },
          },
        ],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url: site.url,
        name: "Myra Homes — Myra Eloria Official Website",
        alternateName: ["Myra Homes", "Myra Eloria", "Myra", "Myra Infra"],
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
      <body className="bg-paper font-sans text-olive antialiased">
        <StructuredData />
        {children}
      </body>
    </html>
  );
}

"use client";

import Image from "next/image";
import { site } from "../lib/data";
import { useEnquiry } from "./EnquiryProvider";

const links = [
  { href: "#overview", label: "Overview" },
  { href: "#plans", label: "Plans" },
  { href: "#amenities", label: "Amenities" },
  { href: "#floorplans", label: "Floor plans" },
  { href: "#pricing", label: "Pricing" },
  { href: "#location", label: "Location" },
];

export default function Header() {
  const { open } = useEnquiry();

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between gap-6 border-b border-olive/[0.14] bg-paper/90 px-4 py-3.5 backdrop-blur-md sm:px-8 md:px-16">
      <div className="flex items-center gap-4">
        <Image
          src="/images/logo.jpg"
          alt={site.developer}
          width={46}
          height={46}
          className="h-[46px] w-auto rounded-sm"
          priority
        />
        <div className="flex flex-col gap-0.5">
          <span className="font-display text-[26px] uppercase leading-none tracking-[0.16em]">
            {site.name}
          </span>
          <span className="text-[9px] uppercase tracking-[0.3em] text-olive-mid">
            {site.tagline}
          </span>
        </div>
      </div>
      <nav className="hidden items-center gap-[clamp(12px,1.8vw,30px)] text-xs uppercase tracking-[0.16em] lg:flex">
        {links.map((l) => (
          <a key={l.href} href={l.href}>
            {l.label}
          </a>
        ))}
        <button
          type="button"
          onClick={() => open()}
          className="whitespace-nowrap rounded-full border border-olive bg-olive px-[22px] py-3 text-xs uppercase tracking-[0.16em] text-paper transition-colors hover:bg-olive-dark"
        >
          Enquire now
        </button>
      </nav>
      <button
        type="button"
        onClick={() => open()}
        className="whitespace-nowrap rounded-full border border-olive bg-olive px-5 py-2.5 text-[11px] uppercase tracking-[0.16em] text-paper transition-colors hover:bg-olive-dark lg:hidden"
      >
        Enquire
      </button>
    </header>
  );
}

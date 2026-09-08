"use client";

import Image from "next/image";
import { site } from "../lib/data";
import { useEnquiry } from "./EnquiryProvider";

const stats = [
  { value: "24 Acres", label: "Total land parcel" },
  { value: "269", label: "G+2 villas" },
  { value: "G+4", label: "Clubhouse" },
  { value: "100+", label: "Amenities" },
];

export default function Hero() {
  const { open } = useEnquiry();

  return (
    <section className="relative flex min-h-[min(90vh,860px)] items-end overflow-hidden">
      <Image
        src="/images/hero.jpg"
        alt={`${site.name} tree-lined avenue at dusk`}
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#1e2016]/[0.88] via-[#1e2016]/45 to-[#1e2016]/25" />

      <div className="relative flex max-w-[1100px] animate-rise flex-col gap-6 px-5 py-9 text-paper sm:px-9 sm:py-14 lg:px-[72px] lg:py-[84px]">
        <div className="flex items-center gap-3.5">
          <span className="block h-px w-[46px] bg-paper" />
          <span className="text-[11px] uppercase tracking-[0.34em]">
            Myra Homes · {site.city} · Dundigal
          </span>
        </div>

        <h1 className="font-display text-[clamp(48px,7vw,108px)] font-light leading-[0.94] text-paper">
          A gated life,
          <br />
          <em className="italic">quietly</em> grand.
        </h1>

        <p className="max-w-[52ch] text-[clamp(15px,1.2vw,19px)] leading-[1.7] text-paper/[0.92]">
          Myra Eloria by Myra Homes — 269 independent G+2 villas across 24 acres in {site.city},
          each with 4BHK and a private home theatre, paired with a G+4 clubhouse and 100+ amenities.
        </p>

        <div className="flex max-w-[640px] flex-wrap items-stretch bg-paper text-olive">
          <div className="flex flex-1 flex-col gap-1 px-[24px] py-[18px]" style={{ flex: "1 1 240px" }}>
            <span className="text-[10px] uppercase tracking-[0.28em] text-olive-mid">
              Villas starting at
            </span>
            <span className="font-sans text-[clamp(32px,3.8vw,46px)] font-light leading-none [font-feature-settings:'lnum'_1,'tnum'_1]">
              ₹2.10 Cr
              <span className="ml-2.5 text-xs uppercase tracking-[0.16em] text-olive-mid">
                onwards
              </span>
            </span>
          </div>
          <div
            className="flex flex-col justify-center gap-1 bg-olive px-[24px] py-[18px] text-paper"
            style={{ flex: "0 1 220px" }}
          >
            <span className="text-[10px] uppercase tracking-[0.28em] text-paper/[0.72]">
              Limited period
            </span>
            <span className="text-sm leading-snug">
              Amenity charges free at launching price
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-3.5">
          <button
            type="button"
            onClick={() => open()}
            className="rounded-full bg-paper px-8 py-[17px] text-xs uppercase tracking-[0.2em] text-olive transition-colors hover:bg-clay"
          >
            Enquire now
          </button>
          <a
            href="#villas"
            className="rounded-full border border-paper/60 px-[30px] py-4 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper/[0.14]"
          >
            Villa configurations
          </a>
          <a
            href="#pricing"
            className="rounded-full border border-paper/60 px-[30px] py-4 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper/[0.14]"
          >
            Pricing &amp; plans
          </a>
        </div>

        <div className="grid max-w-[720px] grid-cols-2 gap-[22px] border-t border-paper/30 pt-[22px] sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <div className="font-sans text-[38px] font-light leading-none text-paper [font-feature-settings:'lnum'_1,'tnum'_1]">
                {s.value}
              </div>
              <div className="mt-1.5 text-[10px] uppercase tracking-[0.22em] text-paper/80">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

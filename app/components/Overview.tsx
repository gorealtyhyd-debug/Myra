"use client";

import Image from "next/image";
import { highlights } from "../lib/data";
import { useEnquiry } from "./EnquiryProvider";

export default function Overview() {
  const { open } = useEnquiry();

  return (
    <section
      id="overview"
      className="flex flex-col gap-9 px-5 py-14 sm:px-9 sm:py-20 lg:px-[72px] lg:py-[120px]"
    >
      <div className="grid grid-cols-1 items-end gap-8 md:grid-cols-2 lg:gap-16">
        <h2 className="font-display text-[clamp(38px,5vw,76px)] font-light leading-[1.02] tracking-[-0.01em]">
          Built for the way
          <br />
          families <em className="italic">actually</em> live.
        </h2>
        <p className="max-w-[46ch] text-[clamp(15px,1.15vw,18px)] leading-[1.75] text-olive-mid [text-wrap:pretty]">
          Twenty-four acres planned as one address — villas held apart by
          planting, streets that slow traffic down, and the whole amenity
          programme within a walk of every door.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-12">
        {highlights.map((h) => (
          <div
            key={h.title}
            className="flex flex-col gap-3 border-t border-olive/[0.28] pt-[22px]"
          >
            <span className="block h-[7px] w-[7px] rounded-full bg-olive" />
            <span className="font-display text-[clamp(26px,2.4vw,34px)] leading-[1.1]">
              {h.title}
            </span>
            <span className="max-w-[34ch] text-sm leading-[1.7] text-olive-mid">
              {h.body}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex min-h-[clamp(280px,34vw,420px)] items-end overflow-hidden">
        <Image
          src="/images/clubhouse.jpg"
          alt="G+4 clubhouse and central amenity green"
          fill
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e2016]/[0.82] to-[#1e2016]/[0.05] to-70%" />
        <div className="relative flex w-full flex-wrap items-end justify-between gap-5 p-6 sm:p-11">
          <div className="flex max-w-[46ch] flex-col gap-2">
            <span className="text-[11px] uppercase tracking-[0.3em] text-paper/[0.78]">
              The clubhouse
            </span>
            <span className="font-display text-[clamp(28px,3vw,44px)] leading-[1.08] text-paper">
              Five levels of indoor life, at the centre of the green.
            </span>
          </div>
          <button
            type="button"
            onClick={() => open()}
            className="whitespace-nowrap rounded-full border border-paper/70 bg-transparent px-7 py-3.5 text-xs uppercase tracking-[0.2em] text-paper transition-colors hover:bg-paper hover:text-olive"
          >
            Request the brochure
          </button>
        </div>
      </div>
    </section>
  );
}

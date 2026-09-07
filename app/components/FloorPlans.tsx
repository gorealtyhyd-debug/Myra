"use client";

import Image from "next/image";
import { floorPlans } from "../lib/data";
import { useEnquiry } from "./EnquiryProvider";

export default function FloorPlans() {
  const { open } = useEnquiry();

  return (
    <section
      id="floorplans"
      className="px-5 py-14 sm:px-9 sm:py-20 lg:px-[72px] lg:py-[120px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-[22px]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.34em] text-olive-mid">
            Floor plans
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(34px,4vw,60px)] font-light leading-[1.05]">
            Villa floor plans,
            <br />
            on request.
          </h2>
        </div>
        <p className="max-w-[34ch] text-sm leading-[1.7] text-olive-mid">
          Unit-level plans are shared with prospective buyers only. Submit
          an enquiry to unlock the full set with dimensions.
        </p>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-[22px] sm:grid-cols-2">
        {floorPlans.map((fp) => (
          <button
            key={fp.title}
            type="button"
            onClick={() => open()}
            className="block w-full overflow-hidden border border-olive/20 bg-sand text-left transition-colors hover:border-olive"
          >
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={`/images/${fp.img}.jpg`}
                alt={`${fp.title} floor plan preview`}
                fill
                sizes="(min-width: 640px) 50vw, 100vw"
                className="scale-125 object-cover [filter:blur(18px)_saturate(0.9)]"
              />
              <div className="absolute inset-0 bg-olive/[0.42]" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-3.5 p-6 text-center">
                <span className="flex h-[58px] w-[58px] items-center justify-center rounded-full border border-paper/70 text-xl text-paper">
                  ☼
                </span>
                <span className="text-[11px] uppercase tracking-[0.28em] text-paper">
                  Locked — enquire to view
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-2 bg-paper px-[26px] py-6">
              <span className="text-[25px] font-light leading-[1.25] [font-feature-settings:'lnum'_1,'tnum'_1]">
                {fp.title}
              </span>
              <span className="text-[13px] leading-relaxed text-olive-mid">
                {fp.meta}
              </span>
              <span className="mt-2.5 text-[11px] uppercase tracking-[0.2em] text-olive">
                Enquire now →
              </span>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

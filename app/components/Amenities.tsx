"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { amenities, featuredAmenities } from "../lib/data";

export default function Amenities({
  autoplay = true,
}: {
  autoplay?: boolean;
}) {
  const [feat, setFeat] = useState(0);

  useEffect(() => {
    if (!autoplay) return;
    const id = setInterval(() => {
      setFeat((f) => (f + 1) % featuredAmenities.length);
    }, 4500);
    return () => clearInterval(id);
  }, [autoplay]);

  const current = featuredAmenities[feat];
  const counter = `0${feat + 1} / 0${featuredAmenities.length}`;

  return (
    <section
      id="amenities"
      className="px-5 py-14 sm:px-9 sm:py-20 lg:px-[72px] lg:py-[120px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-[22px]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.34em] text-olive-mid">
            Amenities
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(34px,4vw,60px)] font-light leading-[1.05]">
            Over a hundred reasons
            <br />
            to stay in.
          </h2>
        </div>
        <p className="max-w-[32ch] text-sm leading-[1.7] text-olive-mid">
          Reference imagery from the approved landscape concept — sport,
          water, wellness, play and quiet gardens across the community.
        </p>
      </div>

      <div className="mt-11 grid grid-cols-2 gap-[18px] sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {amenities.map((a) => (
          <figure key={a.name} className="group m-0 flex flex-col gap-2.5">
            <div className="relative aspect-square overflow-hidden border border-olive/[0.16] bg-clay">
              <Image
                src={`/images/${a.img}.jpg`}
                alt={a.name}
                fill
                sizes="(min-width: 1024px) 16vw, (min-width: 640px) 25vw, 50vw"
                className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
              />
            </div>
            <figcaption className="text-[11px] uppercase leading-normal tracking-[0.16em] text-olive">
              {a.name}
            </figcaption>
          </figure>
        ))}
      </div>

      <div className="mt-12 grid grid-cols-1 items-stretch gap-6 bg-olive p-5 text-paper sm:p-8 lg:grid-cols-[1.35fr_1fr]">
        <div className="relative min-h-[320px] overflow-hidden">
          {featuredAmenities.map((f, i) => (
            <Image
              key={f.img}
              src={`/images/${f.img}.jpg`}
              alt={f.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-opacity duration-[900ms] ease-in-out"
              style={{ opacity: i === feat ? 1 : 0 }}
            />
          ))}
          <div className="absolute left-[18px] top-[18px] rounded-full bg-[#1e2016]/70 px-3.5 py-2 text-[10px] uppercase tracking-[0.24em] text-paper">
            {counter}
          </div>
        </div>
        <div className="flex flex-col justify-between gap-6 py-1 sm:py-3">
          <div className="flex flex-col gap-4">
            <span className="text-[11px] uppercase tracking-[0.3em] text-paper/[0.72]">
              Signature amenity
            </span>
            <h3 className="font-display text-[clamp(32px,3.4vw,52px)] font-light leading-[1.05] text-paper">
              {current.name}
            </h3>
            <p className="max-w-[40ch] text-[15px] leading-[1.75] text-paper/[0.88]">
              {current.body}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-[18px]">
            <div className="flex gap-2">
              {featuredAmenities.map((f, i) => (
                <button
                  key={f.img}
                  type="button"
                  aria-label={`Show ${f.name}`}
                  onClick={() => setFeat(i)}
                  className="h-1 w-[34px] border-none p-0"
                  style={{
                    background: i === feat ? "#FEFBF6" : "rgba(254,251,246,0.35)",
                  }}
                />
              ))}
            </div>
            <div className="flex gap-2.5">
              <button
                type="button"
                aria-label="Previous amenity"
                onClick={() =>
                  setFeat(
                    (f) => (f + featuredAmenities.length - 1) % featuredAmenities.length
                  )
                }
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-paper/50 font-sans text-lg leading-none text-paper transition-colors hover:bg-paper hover:text-olive"
              >
                ←
              </button>
              <button
                type="button"
                aria-label="Next amenity"
                onClick={() => setFeat((f) => (f + 1) % featuredAmenities.length)}
                className="flex h-[52px] w-[52px] items-center justify-center rounded-full border border-paper/50 font-sans text-lg leading-none text-paper transition-colors hover:bg-paper hover:text-olive"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

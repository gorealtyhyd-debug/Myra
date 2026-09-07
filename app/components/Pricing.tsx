"use client";

import { useMemo, useState } from "react";
import { paymentSteps, villas, rates } from "../lib/data";
import { useEnquiry } from "./EnquiryProvider";

function formatCr(n: number) {
  if (n >= 1e7) return "₹" + (n / 1e7).toFixed(2) + " Cr";
  return "₹" + (n / 1e5).toFixed(2) + " L";
}

const pricingPlans = [
  {
    label: "Launching price",
    tag: "Limited period",
    price: "₹6,999",
    from: "Launch entry price ₹2.10 Cr · limited inventory",
    points: [
      "Amenities charges: FREE",
      "Limited period offer for early buyers",
      "Alternate payment options discussed at the site visit",
    ],
    variant: "light" as const,
  },
  {
    label: "All-inclusive price",
    tag: "All inclusive",
    price: "₹8,500",
    from: `From ${formatCr(8500 * 3238)} · 200 Sq. Yds`,
    points: [
      "Includes all additional charges",
      "No separate amenity or infrastructure levy",
      "Single-rate pricing, nothing to reconcile later",
    ],
    variant: "outline" as const,
  },
];

export default function Pricing() {
  const { open } = useEnquiry();
  const [cfg, setCfg] = useState(0);
  const [rate, setRate] = useState(0);

  const total = useMemo(
    () => villas[cfg].sft * rates[rate].rate,
    [cfg, rate]
  );

  return (
    <section
      id="pricing"
      className="bg-olive px-5 py-14 text-paper sm:px-9 sm:py-20 lg:px-[72px] lg:py-[120px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-5">
        <div>
          <div className="text-[11px] uppercase tracking-[0.34em] text-paper/[0.72]">
            Pricing
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(34px,4vw,60px)] font-light leading-[1.05] text-paper">
            Two clear ways to buy.
          </h2>
        </div>
        <span className="text-[11px] uppercase tracking-[0.2em] text-paper/[0.72]">
          Limited period offer
        </span>
      </div>

      <div className="mt-11 grid grid-cols-1 gap-5 md:grid-cols-3">
        {pricingPlans.map((p) => {
          const isLight = p.variant === "light";
          return (
            <div
              key={p.label}
              className={`flex min-h-[400px] flex-col gap-[22px] p-6 sm:p-9 ${
                isLight
                  ? "border border-paper bg-paper text-olive"
                  : "border border-paper/[0.28] bg-transparent text-paper"
              }`}
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-[11px] uppercase tracking-[0.28em] opacity-80">
                  {p.label}
                </span>
                <span
                  className={`whitespace-nowrap rounded-full border px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] ${
                    isLight ? "border-olive/40" : "border-paper/40"
                  }`}
                >
                  {p.tag}
                </span>
              </div>
              <div className="flex items-baseline gap-2.5">
                <span className="text-[clamp(46px,5.4vw,74px)] font-light leading-[0.95] [font-feature-settings:'lnum'_1,'tnum'_1]">
                  {p.price}
                </span>
                <span className="text-[13px] uppercase tracking-[0.14em] opacity-[0.78]">
                  per sft
                </span>
              </div>
              <div className="text-[13px] uppercase tracking-[0.1em] opacity-[0.78]">
                {p.from}
              </div>
              <div
                className={`flex flex-col gap-3 border-t pt-5 ${
                  isLight ? "border-olive/20" : "border-paper/[0.22]"
                }`}
              >
                {p.points.map((pt) => (
                  <div key={pt} className="flex items-start gap-3 text-sm leading-relaxed">
                    <span className="mt-2 h-[5px] w-[5px] flex-none rounded-full bg-current opacity-70" />
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => open()}
                className={`mt-auto self-start rounded-full px-7 py-3.5 text-xs uppercase tracking-[0.2em] transition-opacity hover:opacity-[0.86] ${
                  isLight ? "bg-olive text-paper" : "bg-paper text-olive"
                }`}
              >
                Book a site visit
              </button>
            </div>
          );
        })}

        <div className="flex min-h-[400px] flex-col gap-[22px] border border-paper/[0.28] bg-paper/5 p-6 sm:p-8">
          <span className="text-[11px] uppercase tracking-[0.28em] text-paper/[0.78]">
            Estimate
          </span>

          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-paper/[0.66]">
              Configuration
            </span>
            <div className="flex flex-wrap gap-2">
              {villas.map((v, i) => {
                const isActive = i === cfg;
                return (
                  <button
                    key={v.code}
                    type="button"
                    onClick={() => setCfg(i)}
                    className="whitespace-nowrap rounded-full border border-paper/40 px-3.5 py-2 text-xs"
                    style={{
                      background: isActive ? "#FEFBF6" : "transparent",
                      color: isActive ? "#4B4D39" : "#FEFBF6",
                    }}
                  >
                    {v.plot}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <span className="text-[10px] uppercase tracking-[0.22em] text-paper/[0.66]">
              Rate option
            </span>
            <div className="flex flex-wrap gap-2">
              {rates.map((r, i) => {
                const isActive = i === rate;
                return (
                  <button
                    key={r.label}
                    type="button"
                    onClick={() => setRate(i)}
                    className="whitespace-nowrap rounded-full border border-paper/40 px-3.5 py-2 text-xs"
                    style={{
                      background: isActive ? "#FEFBF6" : "transparent",
                      color: isActive ? "#4B4D39" : "#FEFBF6",
                    }}
                  >
                    {r.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-[14px] border-t border-paper/[0.24] pt-[22px]">
            <div className="flex items-baseline gap-2.5">
              <span className="text-[clamp(38px,4.4vw,58px)] font-light leading-[0.95] text-paper [font-feature-settings:'lnum'_1,'tnum'_1]">
                {formatCr(total)}
              </span>
              <span className="text-xs uppercase tracking-[0.16em] text-paper/[0.72]">
                indicative
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3.5 text-[13px] text-paper/[0.86]">
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-paper/60">
                  20% booking
                </span>
                <span>{formatCr(total * 0.2)}</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[10px] uppercase tracking-[0.2em] text-paper/60">
                  80% on construction
                </span>
                <span>{formatCr(total * 0.8)}</span>
              </div>
            </div>
            <span className="text-[11px] leading-relaxed text-paper/[0.62]">
              Built-up area × rate only — the ₹2.10 Cr launch entry price
              applies to limited inventory. Registration, GST and statutory
              charges extra unless stated.
            </span>
          </div>
        </div>
      </div>

      <div className="mt-14 border-t border-paper/[0.24] pt-10">
        <div className="text-[11px] uppercase tracking-[0.34em] text-paper/[0.72]">
          Payment plan · 20:80
        </div>
        <div className="mt-[30px] grid grid-cols-1 gap-[26px] sm:grid-cols-2 lg:grid-cols-4">
          {paymentSteps.map((s) => (
            <div
              key={s.no}
              className="flex flex-col gap-3 border-t border-paper/[0.32] pt-5"
            >
              <span className="font-mono text-[11px] text-paper/70">
                {s.no}
              </span>
              <span className="font-display text-[26px] leading-[1.15] text-paper">
                {s.title}
              </span>
              <span className="text-[13px] leading-relaxed text-paper/[0.82]">
                {s.body}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

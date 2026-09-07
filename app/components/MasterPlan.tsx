"use client";

import Image from "next/image";
import { useState } from "react";
import { plansMaster } from "../lib/data";

export default function MasterPlan() {
  const [active, setActive] = useState(0);
  const plan = plansMaster[active];

  return (
    <section
      id="plans"
      className="border-y border-olive/[0.14] bg-sand px-5 py-14 sm:px-9 sm:py-20 lg:px-[72px] lg:py-[120px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-[22px]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.34em] text-olive-mid">
            Master plan &amp; layouts
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(34px,4vw,60px)] font-light leading-[1.05]">
            Every plot planned
            <br />
            around the landscape.
          </h2>
        </div>
        <p className="max-w-[34ch] text-sm leading-[1.7] text-olive-mid">
          Site master plan, the four designed open spaces, and typical plot
          and street sections. Individual villa floor plans are shared on
          request.
        </p>
      </div>

      <div className="my-9 flex flex-wrap gap-2.5">
        {plansMaster.map((t, i) => {
          const isActive = i === active;
          return (
            <button
              key={t.label}
              type="button"
              onClick={() => setActive(i)}
              className={`whitespace-nowrap rounded-full border px-[22px] py-2.5 text-xs uppercase tracking-[0.16em] transition-colors ${
                isActive
                  ? "border-olive bg-olive text-paper"
                  : "border-olive/30 bg-transparent text-olive"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="border border-olive/20 bg-paper p-3 sm:p-[26px]">
        <div className="relative aspect-[16/10] max-h-[76vh] w-full bg-paper">
          <Image
            src={`/images/${plan.img}.jpg`}
            alt={plan.label}
            fill
            sizes="(min-width: 1024px) 70vw, 100vw"
            className="object-contain"
          />
        </div>
        <div className="mt-3.5 flex flex-wrap justify-between gap-3 border-t border-olive/[0.16] pt-[18px]">
          <span className="font-display text-2xl">{plan.label}</span>
          <span className="max-w-[60ch] text-xs leading-relaxed text-olive-mid">
            {plan.note}
          </span>
        </div>
      </div>
    </section>
  );
}

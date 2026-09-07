import { villas } from "../lib/data";

export default function Villas() {
  return (
    <section
      id="villas"
      className="border-y border-olive/[0.14] bg-sand px-5 py-14 sm:px-9 sm:py-[70px] lg:px-[72px] lg:py-[110px]"
    >
      <div className="flex flex-wrap items-end justify-between gap-[22px]">
        <div>
          <div className="text-[11px] uppercase tracking-[0.34em] text-olive-mid">
            Configurations
          </div>
          <h2 className="mt-[18px] font-display text-[clamp(34px,4vw,60px)] font-light leading-[1.05]">
            Five plot sizes.
            <br />
            One standard of finish.
          </h2>
        </div>
        <p className="max-w-[34ch] text-sm leading-[1.7] text-olive-mid">
          Every villa is G+2, 4BHK with a dedicated home theater. Built-up
          areas indicative and subject to final approval.
        </p>
      </div>

      <div className="mt-11 overflow-x-auto border-t border-olive/30">
        <div className="min-w-[560px]">
          <div className="grid grid-cols-[0.5fr_1.2fr_1.2fr_1fr] gap-4 border-b border-olive/30 px-1 py-3.5 text-[10px] uppercase tracking-[0.24em] text-olive-mid">
            <span>Type</span>
            <span>Plot size (sq. yds)</span>
            <span>Built-up area (sft)</span>
            <span className="text-right">Configuration</span>
          </div>
          {villas.map((v) => (
            <div
              key={v.code}
              className="grid grid-cols-[0.5fr_1.2fr_1.2fr_1fr] items-center gap-4 border-b border-olive/[0.18] px-1 py-[22px] transition-colors hover:bg-olive/[0.05]"
            >
              <span className="font-mono text-xs text-olive-mid">
                {v.code}
              </span>
              <span className="text-[clamp(21px,2.1vw,29px)] font-light [font-feature-settings:'lnum'_1,'tnum'_1]">
                {v.plot}
              </span>
              <span className="text-[clamp(21px,2.1vw,29px)] font-light [font-feature-settings:'lnum'_1,'tnum'_1]">
                {v.area}
              </span>
              <span className="text-right text-xs uppercase tracking-[0.14em] text-olive-mid">
                4BHK + Theater
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

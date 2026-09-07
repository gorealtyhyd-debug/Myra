import { faqs, site } from "../lib/data";

export default function FAQ() {
  return (
    <section
      id="faq"
      className="border-t border-olive/[0.14] bg-sand px-5 py-14 sm:px-9 sm:py-20 lg:px-[72px] lg:py-[120px]"
    >
      <div className="max-w-[720px]">
        <div className="text-[11px] uppercase tracking-[0.34em] text-olive-mid">
          Frequently asked
        </div>
        <h2 className="mt-[18px] font-display text-[clamp(34px,4vw,60px)] font-light leading-[1.05]">
          Questions, answered plainly.
        </h2>
        <p className="mt-4 max-w-[46ch] text-sm leading-[1.7] text-olive-mid">
          The essentials about {site.name} — pricing, configurations,
          amenities and how to book a visit.
        </p>
      </div>

      <div className="mt-11 flex flex-col divide-y divide-olive/[0.16] border-t border-olive/[0.16]">
        {faqs.map((f) => (
          <details key={f.q} className="group" style={{ paddingBlock: 22 }}>
            <summary className="flex cursor-pointer list-none items-start justify-between gap-6 font-display text-[20px] leading-[1.3] marker:content-none sm:text-[24px]">
              <span>{f.q}</span>
              <span className="mt-1.5 flex h-6 w-6 flex-none items-center justify-center text-sm text-olive-mid transition-transform group-open:rotate-45">
                +
              </span>
            </summary>
            <p className="mt-3.5 max-w-[68ch] text-sm leading-[1.75] text-olive-mid">
              {f.a}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}

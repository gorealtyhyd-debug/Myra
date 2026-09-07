import { locationFacts, site } from "../lib/data";

export default function Location() {
  return (
    <section
      id="location"
      className="grid grid-cols-1 items-start gap-8 px-5 py-14 sm:px-9 sm:py-20 lg:grid-cols-[0.9fr_1.5fr] lg:gap-16 lg:px-[72px] lg:py-[120px]"
    >
      <div className="flex flex-col gap-[22px]">
        <div className="text-[11px] uppercase tracking-[0.34em] text-olive-mid">
          Location
        </div>
        <h2 className="font-display text-[clamp(34px,4vw,58px)] font-light leading-[1.05]">
          Hyderabad,
          <br />
          on the growth side.
        </h2>
        <p className="max-w-[42ch] text-[15px] leading-[1.7] text-olive-mid [text-wrap:pretty]">
          Eloria sits within Hyderabad&apos;s western growth corridor. Exact
          site coordinates, approach roads and drive times are shared at
          the point of enquiry.
        </p>
        <div className="flex flex-col border-t border-olive/20">
          {locationFacts.map((l) => (
            <div
              key={l.k}
              className="flex justify-between gap-4 border-b border-olive/[0.14] py-3.5 text-[13px]"
            >
              <span className="text-[11px] uppercase tracking-[0.14em] text-olive-mid">
                {l.k}
              </span>
              <span className="text-right">{l.v}</span>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 pt-2.5 text-[13px] text-olive-mid">
          <span className="text-[11px] uppercase tracking-[0.16em] text-olive">
            {site.developer}
          </span>
          <span>Site visits daily, 10:00 – 18:30</span>
        </div>
      </div>

      <div className="border border-olive/20 bg-sand p-2.5">
        <iframe
          title={`${site.name} location — ${site.city}`}
          src={`https://maps.google.com/maps?q=${site.lat},${site.lng}&z=14&output=embed`}
          className="block h-[min(62vh,560px)] w-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
        <div className="flex flex-wrap justify-between gap-2.5 px-1.5 pb-1 pt-3.5 text-[11px] uppercase tracking-[0.16em] text-olive-mid">
          <span>
            Site location · {site.lat}° N, {site.lng}° E
          </span>
          <a
            href={`https://maps.google.com/?q=${site.lat},${site.lng}`}
            target="_blank"
            rel="noopener"
          >
            Open larger map ↗
          </a>
        </div>
      </div>
    </section>
  );
}

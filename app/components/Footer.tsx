import { site } from "../lib/data";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="flex flex-col gap-7 border-t border-olive/[0.16] px-5 pb-10 pt-9 sm:px-9 lg:px-[72px] lg:pt-[60px]">
      <div className="grid grid-cols-1 items-start gap-8 sm:grid-cols-2 lg:gap-14">
        <div className="flex flex-col gap-2.5">
          <span className="font-display text-[30px] uppercase leading-none tracking-[0.14em]">
            {site.name}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-olive-mid">
            {site.developer}
          </span>
          <span className="text-[11px] uppercase tracking-[0.2em] text-olive-mid">
            {site.city} · Landscape concept, May 2026
          </span>
        </div>
        <p className="max-w-[56ch] text-[13px] leading-[1.75] text-olive-mid [text-wrap:pretty]">
          Disclaimer: This website is meant only for information purposes.
          It should not be considered/ claimed as an official site. This
          website belongs to authorized channel partner.
        </p>
      </div>
      <div className="flex flex-wrap justify-between gap-[18px] border-t border-olive/[0.14] pt-5 text-[11px] uppercase tracking-[0.18em] text-olive-mid">
        <span>
          © {year} {site.developer}
        </span>
        <span>All images, plans and areas indicative</span>
      </div>
    </footer>
  );
}

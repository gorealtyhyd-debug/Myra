const items = [
  "Gated community",
  "Landscape by design",
  "Early-buyer customization",
  "20:80 payment plan",
  "Amenity charges free",
];

export default function Marquee() {
  const doubled = [...items, ...items];
  return (
    <div className="overflow-hidden whitespace-nowrap bg-olive py-4 text-paper">
      <div className="inline-flex animate-marquee gap-[46px] text-[11px] uppercase tracking-[0.3em]">
        {doubled.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-[46px]">
            {item}
            <span aria-hidden>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

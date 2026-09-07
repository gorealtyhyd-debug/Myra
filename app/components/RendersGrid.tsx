import Image from "next/image";
import { renders } from "../lib/data";

export default function RendersGrid() {
  return (
    <section className="grid grid-cols-1 gap-0.5 bg-olive/[0.18] sm:grid-cols-2 lg:grid-cols-4">
      {renders.map((r) => (
        <figure
          key={r.img}
          className="relative m-0 aspect-[4/3] overflow-hidden bg-clay"
        >
          <Image
            src={`/images/${r.img}.jpg`}
            alt={r.label}
            fill
            sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#1e2016]/85 to-transparent px-[18px] py-4 text-[11px] uppercase tracking-[0.22em] text-paper">
            {r.label}
          </figcaption>
        </figure>
      ))}
    </section>
  );
}

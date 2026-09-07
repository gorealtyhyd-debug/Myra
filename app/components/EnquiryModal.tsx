"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { budgetOptions, site, unitTypeOptions } from "../lib/data";

type Props = {
  isOpen: boolean;
  sent: boolean;
  prefillUnit?: string;
  onClose: () => void;
  onSubmitted: () => void;
};

export default function EnquiryModal({
  isOpen,
  sent,
  prefillUnit,
  onClose,
  onSubmitted,
}: Props) {
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-[#1e2016]/60 p-4 backdrop-blur-sm sm:p-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquiry-heading"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        className="relative max-h-[92vh] w-full max-w-[520px] animate-rise-fast overflow-y-auto border border-olive/25 bg-paper p-6 sm:p-10"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3.5 top-3.5 flex h-9 w-9 items-center justify-center rounded-full border border-olive/30 text-olive transition-colors hover:bg-olive hover:text-paper"
        >
          ✕
        </button>

        <div className="mb-6 flex items-center gap-4 border-b border-olive/20 pb-5">
          <Image
            src="/images/logo.jpg"
            alt={site.developer}
            width={54}
            height={54}
            className="h-[54px] w-auto rounded-sm"
          />
          <div className="flex flex-col gap-1">
            <span
              id="enquiry-heading"
              className="font-display text-[28px] uppercase leading-none tracking-[0.16em]"
            >
              {site.name}
            </span>
            <span className="text-[9px] uppercase tracking-[0.3em] text-olive-mid">
              Enquiry
            </span>
          </div>
        </div>

        {sent ? (
          <div className="flex flex-col gap-4">
            <div className="border border-olive/25 bg-sand p-5 text-sm leading-relaxed text-olive">
              Thank you — our sales team will call you within one working
              day to confirm a site visit slot.
            </div>
            <button
              type="button"
              onClick={onClose}
              className="self-start rounded-full bg-olive px-7 py-3.5 text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-olive-dark"
            >
              Close
            </button>
          </div>
        ) : (
          <form
            className="flex flex-col gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              onSubmitted();
            }}
          >
            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Name
              <input
                type="text"
                required
                placeholder="Your full name"
                className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
              />
            </label>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
                Number
                <input
                  type="tel"
                  required
                  placeholder="+91 00000 00000"
                  className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
                />
              </label>
              <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
                Mail
                <input
                  type="email"
                  required
                  placeholder="you@example.com"
                  className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Unit type
              <select
                defaultValue={prefillUnit ?? unitTypeOptions[0]}
                className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
              >
                {unitTypeOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Budget range
              <select className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive">
                {budgetOptions.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Message
              <textarea
                rows={3}
                placeholder="Anything you'd like us to know"
                className="w-full resize-y border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
              />
            </label>

            <button
              type="submit"
              className="mt-2 rounded-full bg-olive px-7 py-4 text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-olive-dark"
            >
              Submit enquiry
            </button>
            <span className="text-[11px] leading-relaxed text-olive-mid">
              By submitting you agree to be contacted by {site.developer}{" "}
              about {site.name}.
            </span>
          </form>
        )}
      </div>
    </div>
  );
}

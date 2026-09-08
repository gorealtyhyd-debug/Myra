"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { budgetOptions, site, unitTypeOptions } from "../lib/data";
import { submitLeadToPrivyr } from "../lib/privyr";

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
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");
  const [mail, setMail] = useState("");
  const [unitType, setUnitType] = useState(prefillUnit ?? unitTypeOptions[0]);
  const [budget, setBudget] = useState(budgetOptions[0]);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (prefillUnit) {
      setUnitType(prefillUnit);
    }
  }, [prefillUnit]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const urlParams = typeof window !== "undefined" ? new URLSearchParams(window.location.search) : null;
      const result = await submitLeadToPrivyr({
        name,
        phone: number,
        email: mail,
        unitType,
        budgetRange: budget,
        message,
        source: "Eloria Website - Enquiry Modal",
        utm_source: urlParams?.get("utm_source") || "",
        utm_medium: urlParams?.get("utm_medium") || "",
        utm_campaign: urlParams?.get("utm_campaign") || "",
      });

      if (result.success) {
        onSubmitted();
      } else {
        setErrorMessage(result.message || "Could not submit enquiry. Please check your network and try again.");
      }
    } catch (err) {
      console.error("Submission failed:", err);
      setErrorMessage("Could not submit enquiry. Please check your network and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            {errorMessage && (
              <div className="border border-red-500/40 bg-red-50 p-3 text-xs text-red-700">
                {errorMessage}
              </div>
            )}
            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Name
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
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
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                  placeholder="+91 00000 00000"
                  className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
                />
              </label>
              <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
                Mail
                <input
                  type="email"
                  required
                  value={mail}
                  onChange={(e) => setMail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
                />
              </label>
            </div>

            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Unit type
              <select
                value={unitType}
                onChange={(e) => setUnitType(e.target.value)}
                className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
              >
                {unitTypeOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Budget range
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="w-full border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
              >
                {budgetOptions.map((o) => (
                  <option key={o} value={o}>{o}</option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-[10px] uppercase tracking-[0.22em] text-olive-mid">
              Message
              <textarea
                rows={3}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Anything you'd like us to know"
                className="w-full resize-y border border-olive/28 bg-paper px-3.5 py-3 font-sans text-[15px] normal-case tracking-normal text-olive outline-none focus:border-olive"
              />
            </label>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-2 flex items-center justify-center rounded-full bg-olive px-7 py-4 text-xs uppercase tracking-widest2 text-paper transition-colors hover:bg-olive-dark disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit enquiry"}
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

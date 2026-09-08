"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-olive">
      <h1 className="font-display text-4xl font-light">Something went wrong</h1>
      <p className="mt-3 text-sm text-olive-mid font-sans">
        An error occurred while loading this page.
      </p>
      <button
        onClick={() => reset()}
        className="mt-6 border border-olive px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-olive hover:text-paper transition-colors"
      >
        Try Again
      </button>
    </div>
  );
}

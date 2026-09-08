import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-6 text-center text-olive">
      <h1 className="font-display text-5xl font-light">404</h1>
      <p className="mt-3 text-lg font-sans">Page Not Found</p>
      <Link
        href="/"
        className="mt-6 inline-block border border-olive px-6 py-2.5 text-xs uppercase tracking-widest hover:bg-olive hover:text-paper transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
}

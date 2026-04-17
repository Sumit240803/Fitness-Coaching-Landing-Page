import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-6xl font-heading font-bold text-[#d4a8a4] mb-4">
          404
        </p>
        <h1 className="font-heading text-3xl font-bold text-[#111111] mb-3">
          Page Not Found
        </h1>
        <p className="text-[#666666] text-base mb-8">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center px-8 py-4 rounded-full bg-[#111111] text-white font-medium text-base hover:bg-[#333333] transition-colors"
        >
          Back to Home
        </Link>
      </div>
    </main>
  );
}

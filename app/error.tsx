"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-[#fafaf8] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        <p className="text-5xl font-heading font-bold text-[#d4a8a4] mb-4">
          Oops
        </p>
        <h1 className="font-heading text-3xl font-bold text-[#111111] mb-3">
          Something went wrong
        </h1>
        <p className="text-[#666666] text-base mb-8">
          An unexpected error occurred. Please try again.
        </p>
        <button
          onClick={reset}
          className="inline-flex items-center px-8 py-4 rounded-full bg-[#111111] text-white font-medium text-base hover:bg-[#333333] transition-colors"
        >
          Try Again
        </button>
      </div>
    </main>
  );
}

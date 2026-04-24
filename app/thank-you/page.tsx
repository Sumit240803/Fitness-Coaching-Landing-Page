"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import * as fbq from "@/lib/fbpixel";

export default function ThankYou() {
  useEffect(() => {
    fbq.completeRegistration();
  }, []);

  return (
    <section className="min-h-screen bg-[#111111] flex items-center justify-center px-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-white rounded-3xl shadow-xl p-10 lg:p-14 max-w-lg w-full text-center"
      >
        <CheckCircle2 size={64} className="text-[#d4a8a4] mx-auto mb-6" />

        <h1 className="font-heading text-3xl lg:text-4xl font-bold text-[#111111] mb-4">
          Application Received!
        </h1>

        <p className="text-[#111111] text-lg lg:text-xl font-semibold leading-relaxed mb-3">
          Next step: book your free call below.
        </p>

        <p className="text-[#666666] text-sm leading-relaxed mb-8">
          Pick a time that works for you — this call is required to move forward.
        </p>

        <a
          href="https://calendly.com/shwetasetia16"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => fbq.schedule("Clarity Call")}
          className="inline-flex items-center px-8 py-4 rounded-full bg-[#d4a8a4] text-white font-semibold text-base hover:bg-[#c4918d] transition-colors shadow-lg animate-pulse"
        >
          Book My Free Call →
        </a>

        <div className="mt-6">
          <Link
            href="/"
            className="text-sm text-[#999999] hover:text-[#111111] transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

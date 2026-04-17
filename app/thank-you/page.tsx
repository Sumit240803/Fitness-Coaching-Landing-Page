"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankYou() {
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
          Thank You!
        </h1>

        <p className="text-[#666666] text-base leading-relaxed mb-3">
          Your application has been received. We will review it and get
          back to you on WhatsApp within 24–48 hours.
        </p>

        <p className="text-[#555555] text-base leading-relaxed mb-10">
          In the meantime, book your{" "}
          <span className="font-semibold text-[#111111]">
            free clarity call
          </span>{" "}
          to discuss your fitness goals.
        </p>

        <a
          href="https://calendly.com/YOUR_CALENDLY_LINK"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-8 py-4 rounded-full bg-[#d4a8a4] text-white font-medium text-base hover:bg-[#c4918d] transition-colors"
        >
          Book Your Free Clarity Call
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

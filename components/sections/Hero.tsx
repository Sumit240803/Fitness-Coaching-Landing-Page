"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";
import { benefits } from "@/lib/data";
import * as fbq from "@/lib/fbpixel";

export default function Hero() {
  return (
    <section className="bg-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            {/* Tag */}
            <p className="text-xs font-medium tracking-widest uppercase text-[#2a2a2a] mb-6">
              For busy Indian women all over the world
            </p>

            {/* Headline */}
            <h1 className="font-heading text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-[#111111] mb-6">
              Lose{" "}
              <span className="text-[#d4a8a4]">5–8 kg</span>
              <br />
              in 12 Weeks
              <br />
              <span className="font-light italic">Without Extreme Dieting</span>
            </h1>

            {/* Benefits checklist */}
            <ul className="space-y-3 mb-10">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-[#1a1a1a]">
                  <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#f2e8e7] flex items-center justify-center">
                    <Check size={11} className="text-[#d4a8a4]" strokeWidth={3} />
                  </span>
                  <span className="text-base">{b}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <a
                href="#apply"
                onClick={() => fbq.initiateCheckout("Hero CTA")}
                className="inline-flex items-center px-8 py-4 rounded-full bg-[#111111] text-white font-medium text-base hover:bg-[#333333] transition-colors"
              >
                Apply for 1:1 Coaching
              </a>
              <p className="self-center text-xs tracking-widest uppercase text-[#1a1a1a]">
                Limited spots available
              </p>
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-6 rounded-[3rem] bg-[#fafaf8]" />
              <div className="relative w-full aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg">
                <Image
                  src="/assets/shweta/1.jpeg"
                  alt="Coach Shweta"
                  fill
                  sizes="(max-width: 768px) 100vw, 448px"
                  className="object-cover"
                  priority
                />
                {/* Overlay badge */}
                <div className="absolute bottom-6 left-6 right-6 bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-4">
                  <p className="font-heading text-lg font-semibold text-[#111111]">
                    Real Women. Real Results.
                  </p>
                  <p className="text-sm text-[#2a2a2a] mt-0.5">
                    500+ women transformed all over the world
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

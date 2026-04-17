"use client";

import { motion } from "framer-motion";
import { Ban, UserX, CalendarX } from "lucide-react";
import { problems } from "@/lib/data";

const iconMap: Record<string, React.ElementType> = {
  ban: Ban,
  "user-x": UserX,
  "calendar-x": CalendarX,
};

export default function WhyDietsFail() {
  return (
    <section className="bg-[#fafaf8] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Heading */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
              The Problem
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111] leading-tight">
              Why Most
              <br />
              <span className="italic font-light">Diets Fail</span>
            </h2>
            <p className="text-[#666666] mt-6 text-base leading-relaxed max-w-sm">
              The issue isn&apos;t your willpower. It&apos;s the plan. Here&apos;s why
              generic diets never last - and what we do differently.
            </p>
            <div className="mt-10 pt-10 border-t border-[#e8e8e8]">
              <p className="font-script text-2xl text-[#d4a8a4]">
                You could be next
              </p>
              <a
                href="#apply"
                className="inline-flex mt-4 items-center px-6 py-3 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
              >
                Start your transformation
              </a>
            </div>
          </motion.div>

          {/* Right: Problem cards */}
          <div className="space-y-4">
            {problems.map((p, i) => {
              const Icon = iconMap[p.icon];
              return (
                <motion.div
                  key={p.title}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.12 }}
                  className="bg-white border border-[#e8e8e8] rounded-2xl p-6 flex gap-5 items-start"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[#f2e8e7] flex items-center justify-center">
                    <Icon size={18} className="text-[#d4a8a4]" />
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-[#111111]">
                      {p.title}
                    </h3>
                    <p className="text-sm text-[#666666] mt-1 leading-relaxed">
                      {p.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const canApply = [
  "Busy professionals who struggle to find time for workouts and meal prep",
  "Women who have tried multiple diets but still can't lose weight",
  "Those dealing with low energy, inconsistency, or lack of routine",
  "Individuals looking for a sustainable fat loss approach, not quick fixes",
  "People who want structured guidance instead of guessing what to do",
  "Anyone tired of losing and regaining weight again and again",
  "Those who want to improve confidence, strength, and overall fitness",
  "Individuals ready to invest time and effort into real transformation",
  "People who are coachable and willing to follow a proven system",
];

const notFor = [
  "Those looking for shortcuts, detoxes, or extreme crash diets",
  "Anyone not ready to stay consistent or follow guidance",
  "People expecting overnight results without effort",
  "Individuals not serious about long-term change",
];

export default function WhoCanApply() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
            Is This For You?
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111] leading-tight">
            Who Can Apply
            <br />
            <span className="italic font-light">for This Program</span>
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Can Apply */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#fafaf8] border border-[#e8e8e8] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center">
                <Check size={18} className="text-emerald-600" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#111111]">
                This Program Is For You If…
              </h3>
            </div>
            <ul className="space-y-4">
              {canApply.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-3 items-start"
                >
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center">
                    <Check size={12} className="text-emerald-600" />
                  </span>
                  <span className="text-sm text-[#1a1a1a] leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Not For */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-[#fafaf8] border border-[#e8e8e8] rounded-2xl p-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <X size={18} className="text-red-500" />
              </div>
              <h3 className="font-heading text-xl font-semibold text-[#111111]">
                This Is NOT For You If…
              </h3>
            </div>
            <ul className="space-y-4">
              {notFor.map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.06 }}
                  className="flex gap-3 items-start"
                >
                  <span className="flex-shrink-0 mt-1 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center">
                    <X size={12} className="text-red-500" />
                  </span>
                  <span className="text-sm text-[#1a1a1a] leading-relaxed">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>

            {/* CTA inside the "not for" card */}
            <div className="mt-8 pt-6 border-t border-[#e8e8e8]">
              <p className="text-sm text-[#2a2a2a] mb-4">
                If you see yourself in the left column, you&apos;re exactly who
                this program was built for.
              </p>
              <a
                href="#apply"
                className="inline-flex items-center px-6 py-3 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
              >
                Apply Now
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

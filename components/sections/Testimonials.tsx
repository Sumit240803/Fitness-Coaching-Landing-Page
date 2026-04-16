"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { testimonials } from "@/lib/data";

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
            Testimonials
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111]">
            What My Clients Say
          </h2>
        </motion.div>

        {/* Testimonials grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-white border border-[#e8e8e8] rounded-2xl p-6 flex flex-col gap-4"
            >
              {/* Rating */}
              <div className="flex items-center gap-1.5">
                {[...Array(5)].map((_, j) => (
                  <Star
                    key={j}
                    size={14}
                    className="fill-[#d4a8a4] text-[#d4a8a4]"
                  />
                ))}
                <span className="text-xs text-[#999999] ml-1">{t.rating}/5</span>
              </div>

              {/* Category badge */}
              <span className="self-start text-xs font-medium bg-[#f2e8e7] text-[#d4a8a4] px-3 py-1 rounded-full">
                {t.category}
              </span>

              {/* Quote */}
              <blockquote className="text-sm text-[#444444] leading-relaxed flex-1">
                &ldquo;{t.quote}&rdquo;
              </blockquote>

              {/* Client info */}
              <div className="pt-4 border-t border-[#f0f0f0]">
                <p className="font-heading text-base font-semibold text-[#111111]">
                  {t.name}
                </p>
                <p className="text-xs text-[#d4a8a4] mt-0.5">{t.result}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

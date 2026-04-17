"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { clientDiaries } from "@/lib/data";

export default function ClientDiaries() {
  return (
    <section className="bg-[#111111] py-24 lg:py-32">
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
            Client Diaries
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-white">
            Lessons on Weight Loss
          </h2>
          <p className="text-white/50 mt-4 text-base">
            No compromise on taste — eating real food and still losing weight
          </p>
        </motion.div>

        {/* Food card grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {clientDiaries.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-[#1c1c1c] rounded-2xl overflow-hidden border border-white/10"
            >
              <div className="relative aspect-square">
                <Image
                  src={item.image}
                  alt={item.meal}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="px-5 py-4">
                <p className="font-heading text-base font-semibold text-white">
                  {item.meal}
                </p>
                <div className="flex items-center gap-3 mt-2">
                  <span className="text-xs text-white/50 bg-white/10 px-2.5 py-1 rounded-full">
                    {item.calories}
                  </span>
                  <span className="text-xs text-[#d4a8a4] bg-[#d4a8a4]/10 px-2.5 py-1 rounded-full">
                    {item.protein}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

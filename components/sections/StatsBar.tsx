"use client";

import { motion } from "framer-motion";
import { stats } from "@/lib/data";

export default function StatsBar() {
  return (
    <section className="bg-[#111111] py-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="text-center"
            >
              <p className="font-heading text-3xl lg:text-4xl font-bold text-white">
                {stat.value}
              </p>
              <p className="text-xs lg:text-sm uppercase tracking-widest text-white/50 mt-1">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

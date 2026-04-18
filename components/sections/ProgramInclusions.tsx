"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { programFeatures } from "@/lib/data";

export default function ProgramInclusions() {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Features */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
              The Program
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111] mb-12">
              What&apos;s Included in
              <br />
              <span className="italic font-light">My Program</span>
            </h2>

            <div className="space-y-10">
              {programFeatures.map((f, i) => (
                <motion.div
                  key={f.number}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-6 items-start"
                >
                  <span className="font-heading text-4xl font-bold text-[#e8e8e8] leading-none flex-shrink-0 w-10">
                    {f.number}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold text-[#111111]">
                      {f.title}
                    </h3>
                    <p className="text-[#2a2a2a] mt-1.5 text-sm leading-relaxed">
                      {f.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <a
              href="#apply"
              className="inline-flex mt-12 items-center px-8 py-4 rounded-full bg-[#111111] text-white font-medium text-base hover:bg-[#333333] transition-colors"
            >
              Apply for 1:1 Coaching
            </a>
          </motion.div>

          {/* Right: Transformation image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#fafaf8] rounded-[2rem] -m-4" />
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden shadow-lg">
              <Image
                src="/assets/images/program-inclusions.jpeg"
                alt="Client transformation"
                fill
                className="object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

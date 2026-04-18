"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { transformations } from "@/lib/data";

type Transformation = (typeof transformations)[number];

function isComposite(t: Transformation): t is Transformation & { composite: string } {
  return "composite" in t && typeof (t as Record<string, unknown>).composite === "string";
}

export default function Transformations() {
  return (
    <section id="results" className="bg-white py-24 lg:py-32">
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
            Client Transformations
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111]">
            Real Women. Real Results.
          </h2>
          <p className="text-[#2a2a2a] mt-4 max-w-lg mx-auto">
            No extreme diets. No unsustainable routines. Just consistent effort
            with a plan built for your life.
          </p>
        </motion.div>

        {/* Transformation Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {transformations.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="group"
            >
              <div className="rounded-2xl overflow-hidden bg-[#fafaf8] border border-[#e8e8e8]">
                {/* Before / After images */}
                {isComposite(t) ? (
                  <div className="relative aspect-[3/4]">
                    <Image
                      src={t.composite}
                      alt="Before and after transformation"
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="grid grid-cols-2 gap-0.5 bg-[#e8e8e8]">
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={t.before}
                        alt="Before transformation"
                        fill
                        sizes="(max-width: 768px) 50vw, 17vw"
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 text-xs font-medium bg-white/80 backdrop-blur-sm px-2 py-1 rounded-full text-[#111111]">
                        Before
                      </span>
                    </div>
                    <div className="relative aspect-[3/4]">
                      <Image
                        src={t.after}
                        alt="After transformation"
                        fill
                        sizes="(max-width: 768px) 50vw, 17vw"
                        className="object-cover"
                      />
                      <span className="absolute top-3 left-3 text-xs font-medium bg-[#111111]/80 backdrop-blur-sm px-2 py-1 rounded-full text-white">
                        After
                      </span>
                    </div>
                  </div>
                )}

                {/* Result info */}
                <div className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="font-heading text-lg font-semibold text-[#111111]">
                      {t.result}
                    </p>
                    <p className="text-xs text-[#1a1a1a] mt-0.5">{t.caption}</p>
                  </div>
                  <span className="text-xs font-medium bg-[#111111] text-white px-3 py-1.5 rounded-full">
                    {t.duration}
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

"use client";

import { motion } from "framer-motion";

export default function ResetProgram() {
  return (
    <section className="bg-[#fafaf8] py-24 lg:py-32">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
            About the Program
          </p>
          <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111]">
            The Reset Program
          </h2>
          <p className="text-[#2a2a2a] mt-4 text-base max-w-2xl mx-auto">
            Learn more about how the program works, what&apos;s included, and the
            results you can expect.
          </p>
        </motion.div>

        {/* YouTube embed */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.youtube.com/embed/ufbDX7grN28?si=D0NuEq_O4AX4c7LQ"
            title="The Reset Program - Coached by Shweta"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function MeetCoach() {
  return (
    <section id="about" className="bg-[#fafaf8] py-24 lg:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Coach images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative max-w-md mx-auto lg:mx-0"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Portrait photo */}
              <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-lg col-span-2">
                <Image
                  src="/assets/shweta/2.jpeg"
                  alt="Coach Shweta"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-top"
                />
              </div>
              {/* Gym photo */}
              <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-lg">
                <Image
                  src="/assets/shweta/1.jpeg"
                  alt="Coach Shweta at the gym"
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
              {/* Gym photo - black outfit */}
              <div className="relative aspect-[3/4] rounded-[1.5rem] overflow-hidden shadow-lg">
                <Image
                  src="/assets/shweta/3.jpeg"
                  alt="Coach Shweta at the gym"
                  fill
                  sizes="(max-width: 1024px) 50vw, 20vw"
                  className="object-cover"
                />
              </div>
            </div>
            {/* Floating stat badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="absolute -bottom-4 -right-4 lg:right-8 bg-white border border-[#e8e8e8] rounded-2xl px-5 py-4 shadow-md"
            >
              <p className="font-heading text-2xl font-bold text-[#111111]">
                5+ Years
              </p>
              <p className="text-xs text-[#666666] mt-0.5">
                Coaching experience
              </p>
            </motion.div>
          </motion.div>

          {/* Right: Bio */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-medium tracking-widest uppercase text-[#d4a8a4] mb-4">
              Your Coach
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111] mb-6">
              Meet Coach
              <br />
              <span className="italic font-light">Shweta</span>
            </h2>

            <div className="space-y-4 text-[#555555] text-base leading-relaxed">
              <p>
                I&apos;m Shweta - an online fitness coach who has helped hundreds of
                women lose weight, build strength, and create sustainable
                healthy habits.
              </p>
              <p>
                I specialise in working with busy Indian women in USA &amp; Canada
                who want real results without giving up their culture, their
                food, or their lifestyle. My approach is rooted in science,
                personalised to you, and flexible enough for real life.
              </p>
              <p>
                I&apos;ve seen countless women get burned by extreme diets that work
                short-term but fail long-term. That&apos;s exactly what I help you
                avoid.
              </p>
            </div>

            <a
              href="#apply"
              className="inline-flex mt-10 items-center px-8 py-4 rounded-full bg-[#111111] text-white font-medium text-base hover:bg-[#333333] transition-colors"
            >
              Apply Now for 1:1 Coaching
            </a>
            <p className="text-xs tracking-widest uppercase text-[#999999] mt-3">
              Limited spots available
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

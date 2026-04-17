"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, X } from "lucide-react";

const videos = [
  {
    title: "Session 1",
    id: "1gk1z0KHz29QQ7Kk55sUB0YnPSzxGpgHr",
  },
  {
    title: "Session 2",
    id: "17iv4Skv-hocj6LnlDp7TVbWhgkdyAWUb",
  },
  {
    title: "Session 3",
    id: "1amyjDetx0yLtkotWWRiU0ROI_KFNOU7w",
  },
  {
    title: "Session 4",
    id: "1Xxd3RyjJ2JM4PIPT405tl0-e3rfS8XGc",
  },
];

export default function OnlineClasses() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <>
      <section id="online-classes" className="bg-off-white py-24 lg:py-32">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <p className="text-xs font-medium tracking-widest uppercase text-rose mb-4">
              Learn From Anywhere
            </p>
            <h2 className="font-heading text-4xl lg:text-5xl font-bold text-dark">
              Online Classes
            </h2>
            <p className="mt-4 text-text-muted max-w-2xl mx-auto text-base">
              Get a glimpse of our live online sessions - expert guidance,
              real-time interaction, and results-driven coaching from the comfort
              of your home.
            </p>
          </motion.div>

          {/* Video grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
            {videos.map((video, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="bg-white border border-border rounded-2xl overflow-hidden shadow-sm cursor-pointer group"
                onClick={() => setActiveVideo(video.id)}
              >
                <div className="relative w-full aspect-[4/5] bg-dark/5">
                  {/* Thumbnail */}
                  <img
                    src={`https://drive.google.com/thumbnail?id=${video.id}&sz=w600`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/35 transition-colors duration-300">
                    <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <Play
                        size={22}
                        className="text-dark ml-1 fill-dark"
                      />
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3">
                  <h3 className="font-heading text-base font-semibold text-dark">
                    {video.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden bg-black"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={`https://drive.google.com/file/d/${activeVideo}/preview`}
                title="Video Player"
                className="w-full h-full border-0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                sandbox="allow-same-origin allow-scripts allow-popups"
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 hover:bg-black/80 flex items-center justify-center transition-colors"
              >
                <X size={18} className="text-white" />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

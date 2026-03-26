"use client";

import Link from "next/link";
import { motion } from "motion/react";

export function SoftwareSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Dark gradient background */}
      <div className="bg-gradient-to-b from-[#1a1a1a] via-[#111] to-black px-6 py-32">
        <div className="mx-auto max-w-4xl text-center">
          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-6 text-[48px] md:text-[72px] lg:text-[88px] font-bold leading-[1.05] tracking-[-3px] text-white"
          >
            Designed to get better
            <br />
            with time
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
            className="mx-auto mb-10 max-w-[700px] text-lg leading-relaxed text-white/70"
          >
            As software-defined vehicles, Rivians are designed to evolve. We can
            add new features with software updates (just like a phone) so your
            vehicle actually improves over time.
          </motion.p>

          {/* Explore button */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <Link
              href="/software"
              className="inline-block rounded-full bg-white px-10 py-5 text-base font-semibold text-black transition-opacity hover:opacity-90"
            >
              Explore
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Dashboard video */}
      <div className="bg-black px-6 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mx-auto max-w-6xl overflow-hidden rounded-3xl"
        >
          <video
            src="/videos/yohvdyi3ylodqipqo6vu.mp4"
            autoPlay
            muted
            loop
            playsInline
            className="h-auto w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}

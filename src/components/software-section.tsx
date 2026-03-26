"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { LampContainer } from "@/components/ui/lamp";

export function SoftwareSection() {
  return (
    <section className="relative w-full overflow-hidden">
      <LampContainer className="min-h-[auto] py-24">
        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0.5, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: "easeInOut",
          }}
          className="mb-4 text-center text-[56px] font-semibold leading-tight tracking-[-2.5px] text-white"
        >
          Designed to get better with time
        </motion.h2>

        {/* Subtext */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.5,
            duration: 0.7,
            ease: "easeInOut",
          }}
          className="mx-auto mb-8 max-w-[700px] text-center text-base leading-relaxed text-white/70"
        >
          As software-defined vehicles, Rivians are designed to evolve. We can
          add new features with software updates (just like a phone) so your
          vehicle actually improves over time.
        </motion.p>

        {/* Explore button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex justify-center"
        >
          <Link
            href="/software"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Explore
          </Link>
        </motion.div>
      </LampContainer>
    </section>
  );
}

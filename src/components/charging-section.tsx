"use client";

import Link from "next/link";
import { motion } from "motion/react";

const chargingFeatures = [
  {
    text: "Access to over 50,000 chargers — including Tesla Superchargers.",
  },
  {
    text: "Built-in technology takes the guesswork out of trip planning.",
  },
  {
    text: "With a Wall Charger at home, you'll always wake up ready to go.",
  },
];

export function ChargingSection() {
  return (
    <section className="bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Top content */}
        <div className="mb-16">
          {/* Heading slides in from left */}
          <motion.h2
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="mb-6 text-[56px] font-semibold leading-tight tracking-[-2.5px] text-white"
          >
            Ready for electric exploration
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            className="mb-8 max-w-[500px] text-base leading-relaxed text-white/70"
          >
            With up to 420 miles of range and a NACS charge port so you can
            charge in more places, Rivian makes it easy to get out and explore.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Link
              href="/charging"
              className="inline-block rounded-full border border-white bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
            >
              Explore charging
            </Link>
          </motion.div>
        </div>

        {/* Feature items — stagger in from bottom */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {chargingFeatures.map((feature, index) => (
            <motion.div
              key={feature.text}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.5,
                ease: "easeOut",
                delay: index * 0.15,
              }}
              className="flex items-start gap-4"
            >
              {/* Circular image placeholder */}
              <div className="h-16 w-16 shrink-0 rounded-full bg-gray-700" />

              {/* Text */}
              <p className="text-sm leading-relaxed text-white/70">
                {feature.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

const chargingFeatures = [
  {
    text: "Access to over 50,000 chargers — including Tesla Superchargers.",
    image: "/images/charging-3.webp",
  },
  {
    text: "Built-in technology takes the guesswork out of trip planning.",
    image: "/images/charging-4.webp",
  },
  {
    text: "With a Wall Charger at home, you'll always wake up ready to go.",
    image: "/images/charging-5.webp",
  },
];

export function ChargingSection() {
  return (
    <section className="relative overflow-hidden bg-[#1a1a1a]">
      {/* Top: charging station image with smooth gradient fade to dark */}
      <div className="relative h-[75vh] min-h-[500px] w-full">
        <Image
          src="/images/charging-2.webp"
          alt="Rivian charging station"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Smooth gradient: transparent at top → dark at bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-40% to-[#1a1a1a]" />
      </div>

      {/* Text content — overlaps the bottom of the image */}
      <div className="relative z-10 -mt-40 px-6 pb-20">
        <div className="mx-auto max-w-7xl">
          {/* Two-column layout: heading left, description + button right */}
          <div className="mb-16 grid grid-cols-1 gap-8 md:grid-cols-2 md:items-end">
            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-[56px] md:text-[72px] font-semibold leading-[1.05] tracking-[-2.5px] text-white"
            >
              Ready for electric
              <br />
              exploration
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 }}
            >
              <p className="mb-6 text-lg leading-relaxed text-white/80">
                With up to 420 miles of range and a NACS charge port so you can
                charge in more places, Rivian makes it easy to get out and explore.
              </p>
              <Link
                href="/charging"
                className="inline-block rounded-full bg-white px-8 py-4 text-base font-medium text-black transition-opacity hover:opacity-90"
              >
                Explore charging
              </Link>
            </motion.div>
          </div>

          {/* Feature cards — Apple-style tall cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
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
                className="flex flex-col"
              >
                <div className="relative mb-6 aspect-[3/4] w-full overflow-hidden rounded-3xl">
                  <Image
                    src={feature.image}
                    alt=""
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <p className="text-center text-lg font-semibold leading-snug text-white">
                  {feature.text}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

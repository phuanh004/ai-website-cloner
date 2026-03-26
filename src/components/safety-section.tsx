"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export function SafetySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Background moves slower than scroll (parallax)
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  // Foreground moves slightly faster
  const fgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full overflow-hidden"
    >
      {/* Background image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: bgY }}
      >
        <div className="relative h-[120%] w-full">
          <Image
            src="/images/safety-bg.webp"
            alt="Snowy mountain background"
            fill
            sizes="100vw"
            className="object-cover object-center"
            priority
          />
        </div>
      </motion.div>

      {/* Content overlay */}
      <div className="relative z-20 flex flex-col items-center px-6 pt-32">
        {/* IIHS badge */}
        <Image
          src="/images/iihs-badge.svg"
          alt="IIHS Top Safety Pick+ badge"
          width={117}
          height={80}
          className="mb-6"
          style={{ width: "auto", height: "auto" }}
          unoptimized
        />

        {/* Heading */}
        <h2 className="mb-4 text-center text-[56px] font-semibold leading-tight tracking-[-2.5px] text-white">
          Award-winning safety
        </h2>

        {/* Subtext */}
        <p className="mx-auto max-w-[600px] text-center text-base leading-relaxed text-white">
          The R1S continues to earn awards for safety — most recently, a 2026
          TOP SAFETY PICK+ from the IIHS for the 2026 R1S.
        </p>
      </div>

      {/* Foreground car image with parallax */}
      <motion.div
        className="absolute inset-0"
        style={{ y: fgY, zIndex: 5 }}
      >
        <div className="relative h-full w-full">
          <Image
            src="/images/safety-fg.webp"
            alt="Rivian R1S driving in snow"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
        </div>
      </motion.div>
    </section>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";

interface VehicleShowcaseProps {
  name: string;
  shadowSrc: string;
  baseSrc: string;
  tagline: string;
  price: string;
  priceIsAmber?: boolean;
  exploreHref: string;
  ctaText: string;
  ctaHref: string;
  bg: string;
}

export function VehicleShowcase({
  name,
  shadowSrc,
  baseSrc,
  tagline,
  price,
  priceIsAmber = false,
  exploreHref,
  ctaText,
  ctaHref,
  bg,
}: VehicleShowcaseProps) {
  return (
    <section
      className="flex flex-col items-center justify-center px-6 py-16 md:py-24"
      style={{ backgroundColor: bg }}
    >
      {/* Giant vehicle name — fade in from below */}
      <motion.h2
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="font-liga text-center font-medium leading-none tracking-[-0.02em] text-black"
        style={{ fontSize: "clamp(120px, 25vw, 360px)" }}
      >
        {name}
      </motion.h2>

      {/* Vehicle image with shadow layer — scale-up on scroll */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
        className="relative flex w-[65%] items-center justify-center"
      >
        {/* Shadow layer */}
        <Image
          src={shadowSrc}
          alt=""
          width={1200}
          height={600}
          style={{ width: "100%", height: "auto" }}
          className="absolute top-2 object-contain"
          aria-hidden="true"
          priority
        />
        {/* Base vehicle image */}
        <Image
          src={baseSrc}
          alt={`Rivian ${name}`}
          width={1200}
          height={600}
          style={{ width: "100%", height: "auto" }}
          className="relative object-contain"
          priority
        />
      </motion.div>

      {/* Description — stagger fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
        className="mt-6 max-w-[500px] text-center text-xl font-normal text-rivian-dark"
      >
        {tagline}
      </motion.p>

      {/* Price line — stagger fade-in */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
        className="mt-2 text-center text-xs"
        style={{ color: priceIsAmber ? "#ffac00" : "#636363" }}
      >
        {price}
      </motion.p>

      {/* Buttons — stagger fade-in */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.6, ease: "easeOut", delay: 0.5 }}
        className="mt-5 flex items-center gap-3"
      >
        <Link
          href={exploreHref}
          className="rounded-full bg-black px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          Explore
        </Link>
        <Link
          href={ctaHref}
          className="rounded-full border border-black bg-transparent px-4 py-2 text-sm font-medium text-black transition-opacity hover:opacity-80"
        >
          {ctaText}
        </Link>
      </motion.div>
    </section>
  );
}

const vehicleData: VehicleShowcaseProps[] = [
  {
    name: "R1S",
    shadowSrc: "/images/r1s-shadow.webp",
    baseSrc: "/images/r1s-base.webp",
    tagline: "All-electric, 7-seat SUV built for making memories.",
    price: "From $75,900. Est. $899/mo\u2020 | EPA est. range 415 mi*",
    exploreHref: "/r1s",
    ctaText: "Buy",
    ctaHref: "/configurations/r1s",
    bg: "#f0f1f0",
  },
  {
    name: "R2",
    shadowSrc: "/images/r2-shadow.webp",
    baseSrc: "/images/r2-base.webp",
    tagline:
      "Everything you need to get out there and say yes to new things.",
    price: "Available spring 2026",
    priceIsAmber: true,
    exploreHref: "/r2",
    ctaText: "Reserve",
    ctaHref: "/reserve/r2",
    bg: "#ececec",
  },
  {
    name: "R1T",
    shadowSrc: "/images/r1t-shadow.webp",
    baseSrc: "/images/r1t-base.webp",
    tagline: "All-electric truck built for whatever you call a road.",
    price: "From $72,900. Est. $899/mo\u2020 | EPA est. range 420 mi*",
    exploreHref: "/r1t",
    ctaText: "Buy",
    ctaHref: "/configurations/r1t",
    bg: "#f0f1f0",
  },
];

export function VehicleShowcaseList() {
  return (
    <div>
      {vehicleData.map((vehicle) => (
        <VehicleShowcase key={vehicle.name} {...vehicle} />
      ))}
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface VehicleShowcaseProps {
  name: string;
  shadowSrc: string;
  baseSrc: string;
  wheelsSrc: string;
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
  wheelsSrc,
  tagline,
  price,
  priceIsAmber = false,
  exploreHref,
  ctaText,
  ctaHref,
  bg,
}: VehicleShowcaseProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Text parallax — moves slower than scroll, slight upward drift
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-60px"]);
  // Car parallax — slides in from right to left as user scrolls
  const carX = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden px-6 py-16 md:py-24"
      style={{ backgroundColor: bg }}
    >
      {/* Giant vehicle name — positioned behind car */}
      <div className="relative z-0 flex justify-center">
        <motion.h2
          className="font-liga text-center font-medium leading-none tracking-[-0.02em] text-black"
          style={{ fontSize: "clamp(120px, 25vw, 360px)", y: textY }}
        >
          {name}
        </motion.h2>
      </div>

      {/* Vehicle image — overlaps text with higher z-index */}
      <motion.div
        style={{ x: carX }}
        className="relative z-10 -mt-[15vw] flex justify-center"
      >
        {/* Shadow layer */}
        <div className="relative" style={{ width: "80%" }}>
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
          {/* Wheels layer — between shadow and base */}
          <Image
            src={wheelsSrc}
            alt=""
            width={1920}
            height={339}
            style={{ width: "100%", height: "auto" }}
            className="absolute bottom-0 z-[1] object-contain"
            aria-hidden="true"
          />
          {/* Base vehicle image */}
          <Image
            src={baseSrc}
            alt={`Rivian ${name}`}
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
            className="relative z-[2] object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Info below — tagline, price, buttons */}
      <div className="relative z-20 mt-6 flex flex-col items-center">
        <p className="max-w-[500px] text-center text-xl font-normal text-rivian-dark">
          {tagline}
        </p>

        <p
          className="mt-2 text-center text-xs"
          style={{ color: priceIsAmber ? "#ffac00" : "#636363" }}
        >
          {price}
        </p>

        <div className="mt-5 flex items-center gap-3">
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
        </div>
      </div>
    </section>
  );
}

const vehicleData: VehicleShowcaseProps[] = [
  {
    name: "R1S",
    shadowSrc: "/images/r1s-shadow.webp",
    baseSrc: "/images/r1s-base.webp",
    wheelsSrc: "/images/r1s-wheels.webp",
    tagline: "All-electric, 7-seat SUV built for making memories.",
    price: "From $75,900. Est. $899/mo† | EPA est. range 415 mi*",
    exploreHref: "/r1s",
    ctaText: "Buy",
    ctaHref: "/configurations/r1s",
    bg: "#f0f1f0",
  },
  {
    name: "R2",
    shadowSrc: "/images/r2-shadow.webp",
    baseSrc: "/images/r2-base.webp",
    wheelsSrc: "/images/r2-wheels.webp",
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
    wheelsSrc: "/images/r1t-wheels.webp",
    tagline: "All-electric truck built for whatever you call a road.",
    price: "From $72,900. Est. $899/mo† | EPA est. range 420 mi*",
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

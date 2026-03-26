"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

interface VehicleData {
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
}

const vehicleData: VehicleData[] = [
  {
    name: "R1S",
    shadowSrc: "/images/r1s-shadow.webp",
    baseSrc: "/images/r1s-base.webp",
    wheelsSrc: "/images/r1s-wheels.webp",
    tagline: "All-electric, 7-seat SUV built for making memories.",
    price: "From $75,900. Est. $899/mo\u2020 | EPA est. range 415 mi*",
    exploreHref: "/r1s",
    ctaText: "Buy",
    ctaHref: "/configurations/r1s",
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
  },
  {
    name: "R1T",
    shadowSrc: "/images/r1t-shadow.webp",
    baseSrc: "/images/r1t-base.webp",
    wheelsSrc: "/images/r1t-wheels.webp",
    tagline: "All-electric truck built for whatever you call a road.",
    price: "From $72,900. Est. $899/mo\u2020 | EPA est. range 420 mi*",
    exploreHref: "/r1t",
    ctaText: "Buy",
    ctaHref: "/configurations/r1t",
  },
];

const PANEL_COUNT = vehicleData.length;

/* ------------------------------------------------------------------ */
/*  Scroll budget (in viewport-heights):                               */
/*    - 1.5vh for R1S vertical parallax intro                         */
/*    - 2vh per horizontal panel transition (slower = more scroll)     */
/*    Total: 1.5 + (PANEL_COUNT - 1) * 2 + 0.5 buffer = 6vh          */
/* ------------------------------------------------------------------ */
const INTRO_VH = 2.5;
const PER_PANEL_VH = 2;
const TOTAL_VH = INTRO_VH + (PANEL_COUNT - 1) * PER_PANEL_VH + 0.5;

function VehiclePanel({
  vehicle,
  index,
  scrollYProgress,
}: {
  vehicle: VehicleData;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  /* Normalized progress boundaries for this panel's horizontal entry */
  const introFraction = INTRO_VH / TOTAL_VH;
  const panelFraction = PER_PANEL_VH / TOTAL_VH;

  /* ----- First panel (R1S): vertical parallax intro ----- */
  // Text starts above and scrolls down into position as user scrolls
  const introTextY = useTransform(
    scrollYProgress,
    [0, introFraction * 0.5, introFraction],
    ["0%", "10%", "18%"]
  );

  /* ----- Horizontal scroll: text moves faster than the car ----- */
  const panelStart = introFraction + index * panelFraction;
  const panelEnd = panelStart + panelFraction;

  // During this panel's exit, text translates further left (faster)
  const textExitX = useTransform(
    scrollYProgress,
    [panelStart, panelEnd],
    ["0%", "-130%"]
  );
  // Car translates left at normal speed (handled by the parent x)
  // But we add a small extra push so text visibly leads
  const carExitX = useTransform(
    scrollYProgress,
    [panelStart, panelEnd],
    ["0%", "-20%"]
  );

  const isFirst = index === 0;

  return (
    <div className="relative flex h-full w-screen flex-shrink-0 items-center justify-center">
      {/* Giant vehicle name — absolutely centered behind the car */}
      <motion.h2
        className="font-liga pointer-events-none absolute text-center font-medium leading-none tracking-[-0.02em] text-black"
        style={{
          fontSize: "clamp(150px, 30vw, 450px)",
          top: "8%",
          y: isFirst ? introTextY : undefined,
          x: textExitX,
        }}
      >
        {vehicle.name}
      </motion.h2>

      {/* Vehicle image + info — vertically centered */}
      <div className="flex flex-col items-center pt-[30vh]">
        {/* Vehicle image */}
        <motion.div
          className="relative flex w-full justify-center px-4"
          style={{
            maxWidth: "1400px",
            x: carExitX,
          }}
        >
        <div className="relative w-full">
          {/* Shadow layer */}
          <Image
            src={vehicle.shadowSrc}
            alt=""
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
            className="absolute top-2 object-contain"
            aria-hidden="true"
          />
          {/* Wheels layer */}
          <Image
            src={vehicle.wheelsSrc}
            alt=""
            width={1920}
            height={339}
            style={{ width: "100%", height: "auto" }}
            className="absolute bottom-0 z-[1] object-contain"
            aria-hidden="true"
          />
          {/* Base vehicle image */}
          <Image
            src={vehicle.baseSrc}
            alt={`Rivian ${vehicle.name}`}
            width={1200}
            height={600}
            style={{ width: "100%", height: "auto" }}
            className="relative z-[2] object-contain"
            priority
          />
        </div>
      </motion.div>

      {/* Info below — tagline, price, buttons */}
      <motion.div
        className="relative z-20 mt-4 flex flex-col items-center"
        style={{ x: textExitX }}
      >
        <p className="max-w-[600px] text-center text-2xl font-normal text-rivian-dark">
          {vehicle.tagline}
        </p>

        <p
          className="mt-2 text-center text-sm"
          style={{ color: vehicle.priceIsAmber ? "#ffac00" : "#636363" }}
        >
          {vehicle.price}
        </p>

        <div className="mt-5 flex items-center gap-3">
          <Link
            href={vehicle.exploreHref}
            className="rounded-full bg-black px-8 py-4 text-base font-medium text-white transition-opacity hover:opacity-90"
          >
            Explore
          </Link>
          <Link
            href={vehicle.ctaHref}
            className="rounded-full border border-black bg-transparent px-8 py-4 text-base font-medium text-black transition-opacity hover:opacity-80"
          >
            {vehicle.ctaText}
          </Link>
        </div>
      </motion.div>
      </div>
    </div>
  );
}

export function VehicleShowcaseList() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  /* Horizontal translation: starts after the intro phase */
  const introFraction = INTRO_VH / TOTAL_VH;
  const x = useTransform(
    scrollYProgress,
    [introFraction, 1],
    ["0vw", `-${(PANEL_COUNT - 1) * 100}vw`]
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL_VH * 100}vh` }}
      className="relative"
    >
      {/* Sticky wrapper pins the viewport-sized area */}
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f0f1f0]">
        <motion.div
          className="flex h-full"
          style={{ x }}
        >
          {vehicleData.map((vehicle, index) => (
            <VehiclePanel
              key={vehicle.name}
              vehicle={vehicle}
              index={index}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

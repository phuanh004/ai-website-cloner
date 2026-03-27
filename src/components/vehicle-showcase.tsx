"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, MotionValue } from "motion/react";

interface WheelDef {
  /** Center X in the strip image (px, out of 1920) */
  sx: number;
  /** Center Y in the strip image (px, out of 339) */
  sy: number;
  /** Radius in the strip image (px) */
  sr: number;
}

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
  wheels: [WheelDef, WheelDef]; // [front, rear]
}

// Wheel strip images are 1920x339. Each has two wheels.
// We crop each wheel from the strip and draw it on a canvas at the same position.
// The canvas is sized to match the strip dimensions (same width as car, bottom-aligned).
// Measured wheel centers and radii from actual strip images via PIL/numpy
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
    wheels: [
      { sx: 416, sy: 164, sr: 139 },
      { sx: 1408, sy: 164, sr: 138 },
    ],
  },
  {
    name: "R2",
    shadowSrc: "/images/r2-shadow.webp",
    baseSrc: "/images/r2-base.webp",
    wheelsSrc: "/images/r2-wheels.webp",
    tagline: "Everything you need to get out there and say yes to new things.",
    price: "Available spring 2026",
    priceIsAmber: true,
    exploreHref: "/r2",
    ctaText: "Reserve",
    ctaHref: "/reserve/r2",
    wheels: [
      { sx: 467, sy: 166, sr: 134 },
      { sx: 1420, sy: 165, sr: 133 },
    ],
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
    wheels: [
      { sx: 362, sy: 156, sr: 143 },
      { sx: 1468, sy: 156, sr: 142 },
    ],
  },
];

const PANEL_COUNT = vehicleData.length;
const INTRO_VH = 2.5;
const PER_PANEL_VH = 2;
const TOTAL_VH = INTRO_VH + (PANEL_COUNT - 1) * PER_PANEL_VH + 0.5;
const END_FRACTION = 1;

/** Strip image native dimensions */
const STRIP_W = 1920;
const STRIP_H = 339;

/**
 * Canvas that draws spinning wheels from the wheel strip image.
 * Positioned to overlay the wheel strip area (bottom of car).
 * Draws each wheel as a circular crop from the strip, then rotates it.
 */
function WheelCanvas({
  wheelsSrc,
  wheels,
  rotation,
}: {
  wheelsSrc: string;
  wheels: [WheelDef, WheelDef];
  rotation: MotionValue<number>;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const rotRef = useRef(0);
  const rafRef = useRef<number>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const img = imgRef.current;
    if (!canvas || !img || !img.complete || !img.naturalWidth) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, STRIP_W, STRIP_H);

    const rot = rotRef.current * (Math.PI / 180);

    for (const wheel of wheels) {
      ctx.save();
      // Move to wheel center position (same position as in the strip)
      ctx.translate(wheel.sx, wheel.sy);
      ctx.rotate(rot);

      // Clip to circle
      ctx.beginPath();
      ctx.arc(0, 0, wheel.sr, 0, Math.PI * 2);
      ctx.clip();

      // Draw the wheel from the strip, centered on origin
      ctx.drawImage(
        img,
        wheel.sx - wheel.sr, wheel.sy - wheel.sr,
        wheel.sr * 2, wheel.sr * 2,
        -wheel.sr, -wheel.sr,
        wheel.sr * 2, wheel.sr * 2
      );

      ctx.restore();
    }
  }, [wheels]);

  useEffect(() => {
    const img = new window.Image();
    img.crossOrigin = "anonymous";
    img.src = wheelsSrc;
    img.onload = () => {
      imgRef.current = img;
      draw();
    };
  }, [wheelsSrc, draw]);

  useMotionValueEvent(rotation, "change", (v) => {
    rotRef.current = v;
    cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(draw);
  });

  return (
    <canvas
      ref={canvasRef}
      width={STRIP_W}
      height={STRIP_H}
      className="absolute bottom-0 left-0 z-[3]"
      style={{ width: "100%", aspectRatio: `${STRIP_W} / ${STRIP_H}` }}
    />
  );
}

function VehiclePanel({
  vehicle,
  index,
  scrollYProgress,
}: {
  vehicle: VehicleData;
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const introFraction = INTRO_VH / TOTAL_VH;
  const panelFraction = PER_PANEL_VH / TOTAL_VH;

  // Vertical parallax intro: title slides down, car rises up (px-based for viewport consistency)
  const introTextY = useTransform(
    scrollYProgress,
    [0, introFraction * 0.6, introFraction],
    [-120, -40, -30]
  );

  // Car + info block rises from below into place during intro
  const introContentY = useTransform(
    scrollYProgress,
    [0, introFraction],
    [150, 0]
  );

  const isLast = index === PANEL_COUNT - 1;
  const panelStart = introFraction + index * panelFraction;
  const panelEnd = panelStart + panelFraction;

  // Last panel doesn't exit — it stays centered
  // Text exits earlier (starts at 30% into the panel instead of 50%)
  const textExitStart = panelStart + panelFraction * 0.15;
  const textExitEnd = panelStart + panelFraction * 0.65;
  const textExitX = useTransform(
    scrollYProgress,
    [textExitStart, textExitEnd],
    ["0%", isLast ? "0%" : "-130%"]
  );

  const carExitStart = panelStart + panelFraction * 0.15;
  const carExitEnd = panelStart + panelFraction * 0.65;
  const carExitX = useTransform(
    scrollYProgress,
    [carExitStart, carExitEnd],
    ["0%", isLast ? "0%" : "-20%"]
  );

  // Wheel rotation — stops when horizontal scroll ends
  const wheelRotation = useTransform(
    scrollYProgress,
    [introFraction, END_FRACTION],
    [0, -360 * (PANEL_COUNT - 1) * 3]
  );

  const isFirst = index === 0;

  return (
    <div className="relative flex h-full w-screen flex-shrink-0 items-center justify-center">
      {/* Giant vehicle name */}
      <motion.h2
        className="font-liga pointer-events-none absolute text-center font-medium leading-none tracking-[-0.02em] text-black"
        style={{
          fontSize: "clamp(150px, 30vw, 450px)",
          top: "2%",
          y: isFirst ? introTextY : -60,
          x: textExitX,
        }}
      >
        {vehicle.name}
      </motion.h2>

      {/* Vehicle image + info */}
      <motion.div
        className="flex h-full flex-col items-center justify-end pb-[8vh]"
        style={{ y: isFirst ? introContentY : undefined }}
      >
        <motion.div
          className="relative flex w-full justify-center"
          style={{ maxWidth: "1440px", x: carExitX }}
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

            {/* Spinning wheel canvas — same size/position as the old strip image */}
            <WheelCanvas
              wheelsSrc={vehicle.wheelsSrc}
              wheels={vehicle.wheels}
              rotation={wheelRotation}
            />

            {/* Base vehicle (z-2 on top — transparent wheel wells let canvas show through) */}
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

        {/* Info below */}
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
      </motion.div>
    </div>
  );
}

export function VehicleShowcaseList() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const introFraction = INTRO_VH / TOTAL_VH;
  const x = useTransform(
    scrollYProgress,
    [introFraction, END_FRACTION],
    ["0vw", `-${(PANEL_COUNT - 1) * 100}vw`]
  );

  return (
    <div
      ref={containerRef}
      style={{ height: `${TOTAL_VH * 100}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#f0f1f0]">
        <motion.div className="flex h-full" style={{ x }}>
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

"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ArrowLeftIcon, ArrowRightIcon } from "@/components/icons";

interface Slide {
  image: string;
  imageAlt: string;
  heading: string;
  headingTag: "h1" | "h2";
  headingClassName: string;
  description: string;
  descriptionClassName: string;
  buttons: { label: string; variant: "filled" | "outlined" }[];
}

const slides: Slide[] = [
  {
    image: "/images/hero-r2-forest.jpg",
    imageAlt: "Rivian R2 driving through a forest",
    heading: "Meet R2",
    headingTag: "h1",
    headingClassName:
      "text-[60px] md:text-[90px] lg:text-[120px] font-semibold text-white tracking-[-3px] leading-[0.93]",
    description: "Explore the lineup and reserve yours today.",
    descriptionClassName: "text-[20px] md:text-[28px] lg:text-[36px] font-semibold text-white leading-tight",
    buttons: [
      { label: "Reserve", variant: "filled" },
      { label: "Explore", variant: "outlined" },
    ],
  },
  {
    image: "/images/hero-r1s-bridge.jpg",
    imageAlt: "Rivian R1S crossing a bridge",
    heading: "Select 2026 R1 starting at 1.99% APR\u00B9",
    headingTag: "h2",
    headingClassName:
      "text-[32px] md:text-[44px] lg:text-[56px] font-semibold text-white tracking-[-2.5px] leading-tight max-w-4xl",
    description:
      "Available for a limited time on select new R1 vehicles financed through our lending partners.",
    descriptionClassName: "text-[14px] md:text-[16px] font-medium text-white max-w-2xl",
    buttons: [
      { label: "Shop R1S", variant: "filled" },
      { label: "Shop R1T", variant: "outlined" },
    ],
  },
  {
    image: "/images/hero-r1s-field.jpg",
    imageAlt: "Rivian R1S in an open field",
    heading: "Save $3,000 on select R1 Dual leases\u00B2",
    headingTag: "h2",
    headingClassName:
      "text-[32px] md:text-[44px] lg:text-[56px] font-semibold text-white tracking-[-2.5px] leading-tight max-w-4xl",
    description:
      "Available when you lease a new R1 Dual-Motor vehicle through our lending partners.",
    descriptionClassName: "text-[14px] md:text-[16px] font-medium text-white max-w-2xl",
    buttons: [
      { label: "Shop R1S", variant: "filled" },
      { label: "Shop R1T", variant: "outlined" },
    ],
  },
];

export function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const goTo = useCallback((index: number) => {
    setCurrent(((index % slides.length) + slides.length) % slides.length);
  }, []);

  const next = useCallback(() => {
    goTo(current + 1);
  }, [current, goTo]);

  const prev = useCallback(() => {
    goTo(current - 1);
  }, [current, goTo]);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      className="relative w-full overflow-hidden bg-[#ececec] h-[90svh] min-h-[650px] md:h-[85vh]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.image}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: index === current ? 1 : 0 }}
          aria-hidden={index !== current}
        >
          <Image
            src={slide.image}
            alt={slide.imageAlt}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />

          {/* Content overlay */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
            {slide.headingTag === "h1" ? (
              <h1 className={slide.headingClassName}>{slide.heading}</h1>
            ) : (
              <h2 className={slide.headingClassName}>{slide.heading}</h2>
            )}

            <p className={`mt-4 ${slide.descriptionClassName}`}>
              {slide.description}
            </p>

            <div className="mt-8 flex items-center gap-3">
              {slide.buttons.map((btn) => (
                <button
                  key={btn.label}
                  type="button"
                  className={
                    btn.variant === "filled"
                      ? "rounded-full bg-white px-4 py-2 text-[14px] font-medium text-black transition-opacity hover:opacity-90"
                      : "rounded-full border border-white px-4 py-2 text-[14px] font-medium text-white transition-opacity hover:opacity-80"
                  }
                >
                  {btn.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Left arrow */}
      <button
        type="button"
        onClick={prev}
        aria-label="Previous slide"
        className="absolute left-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white"
      >
        <ArrowLeftIcon className="h-5 w-5" />
      </button>

      {/* Right arrow */}
      <button
        type="button"
        onClick={next}
        aria-label="Next slide"
        className="absolute right-4 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-black transition-colors hover:bg-white"
      >
        <ArrowRightIcon className="h-5 w-5" />
      </button>

      {/* Dot indicators */}
      <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            type="button"
            onClick={() => goTo(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              index === current
                ? "w-6 bg-white"
                : "w-2 bg-white/60 hover:bg-white/80"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

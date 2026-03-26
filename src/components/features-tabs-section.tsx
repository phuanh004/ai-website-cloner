"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

const tabs = ["Technology", "Performance", "Design"] as const;
type Tab = (typeof tabs)[number];

interface FeatureCard {
  title: string;
  description: string;
}

const tabContent: Record<Tab, FeatureCard[]> = {
  Technology: [
    {
      title: "Intuitive software",
      description:
        "From intuitive software to smart headlights that illuminate the road ahead — and even around corners — Rivian vehicles are packed with technology designed to enhance every drive.",
    },
    {
      title: "Over-the-air updates",
      description:
        "Your Rivian gets better over time with regular over-the-air software updates that add new features, improve performance, and refine the driving experience.",
    },
    {
      title: "Driver assistance",
      description:
        "Advanced driver-assistance features help you stay safe and comfortable on the highway and in stop-and-go traffic. Explore Driver+.",
    },
  ],
  Performance: [
    {
      title: "Powerful and efficient",
      description:
        "Powerful, efficient, truly a joy to drive. With instant torque from dual motors and a low center of gravity, every Rivian delivers a thrilling driving experience.",
    },
    {
      title: "All-wheel drive",
      description:
        "Standard all-wheel drive with independent motors means precise torque control for incredible traction and handling in any condition.",
    },
    {
      title: "Range and efficiency",
      description:
        "Up to 420 miles of range with industry-leading efficiency, so you can go further on every charge. Explore range options.",
    },
  ],
  Design: [
    {
      title: "Innovative storage",
      description:
        "From innovative storage (yes, there's a tunnel for gear in the truck) to a panoramic roof that lets the outside in, every detail is designed with purpose.",
    },
    {
      title: "Premium interior",
      description:
        "Sustainable materials meet premium craftsmanship in a cabin designed for comfort on any adventure. Explore the interior.",
    },
    {
      title: "Signature lighting",
      description:
        "The iconic stadium headlight design is instantly recognizable and provides exceptional illumination for any driving condition.",
    },
  ],
};

export function FeaturesTabsSection() {
  const [activeTab, setActiveTab] = useState<Tab>("Technology");

  return (
    <section className="bg-gradient-to-b from-white to-gray-50 px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-10 text-center text-[56px] font-semibold leading-tight tracking-[-2.5px] text-black">
          Electric vehicles designed for adventure
        </h2>

        {/* Tab selector */}
        <div className="mb-12 flex justify-center">
          <div className="flex gap-2 rounded-full border border-[#ececec] p-1">
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm font-medium transition-colors",
                  activeTab === tab
                    ? "bg-black text-white"
                    : "bg-white text-black border border-[#ececec] hover:bg-gray-50"
                )}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {tabContent[activeTab].map((card) => (
            <div
              key={card.title}
              className="overflow-hidden rounded-2xl bg-[#e5e0ce]"
            >
              {/* Placeholder image */}
              <div className="h-[300px] bg-gradient-to-br from-blue-200 to-gray-300" />

              {/* Text content */}
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold text-black">
                  {card.title}
                </h3>
                <p className="text-sm leading-relaxed text-black/70">
                  {card.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

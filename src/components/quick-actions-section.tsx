"use client";

import { ArrowRight } from "lucide-react";
import { useState } from "react";

const actions = [
  { label: "Shop", bg: "bg-[#ffac00]" },
  { label: "Get updates", bg: "bg-[#98b582]" },
  { label: "Trade in", bg: "bg-[#e84826]" },
  { label: "Service", bg: "bg-[#8ba8bd]" },
] as const;

export function QuickActionsSection() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-gradient-to-b from-black via-[#252525] to-[#2a2a2a] px-4 pt-20 pb-8 lg:px-16 lg:pt-28 lg:pb-12">
      {/* Heading */}
      <h2 className="mx-auto mb-12 max-w-[1400px] text-center text-[48px] font-bold leading-tight tracking-[-2px] text-white lg:mb-16 lg:text-[72px] lg:tracking-[-3px]">
        Keep exploring
      </h2>

      {/* Action cards */}
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map((action) => (
          <a
            key={action.label}
            href="#"
            className={`${action.bg} group relative flex min-h-[180px] flex-col justify-end overflow-hidden rounded-2xl p-6 transition-opacity hover:opacity-90`}
          >
            <span className="text-[28px] font-bold leading-tight text-black">
              {action.label}
            </span>
            <div className="absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </a>
        ))}
      </div>

      {/* Email signup form — directly below action cards */}
      <div className="mx-auto mt-8 max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 rounded-2xl bg-black p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
          {/* Left — heading */}
          <h3 className="text-[28px] font-bold leading-snug text-white lg:text-[36px]">
            More fully electric adventure is on the way. Sign up to follow
            along.
          </h3>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email *"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#2a2a2a] px-4 py-3.5 text-[15px] text-white placeholder:text-white/50 transition-colors focus:border-white/50 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Zip code *"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-[#2a2a2a] px-4 py-3.5 text-[15px] text-white placeholder:text-white/50 transition-colors focus:border-white/50 focus:outline-none"
            />
            <div>
              <button
                type="submit"
                className="rounded-full bg-[#ffac00] px-8 py-3.5 text-[15px] font-semibold text-black transition-colors hover:bg-[#ffac00]/90"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs leading-relaxed text-white/50">
              By submitting, I agree to receive future communications from Rivian
              and I have read and agree to{" "}
              <a href="#" className="underline">
                Rivian&apos;s Terms
              </a>{" "}
              and acknowledge the{" "}
              <a href="#" className="underline">
                Data Privacy Notice
              </a>
              .
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

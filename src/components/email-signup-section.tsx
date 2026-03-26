"use client";

import { useState } from "react";

export function EmailSignupSection() {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <section className="bg-[#171717] px-4 pb-8 lg:px-16 lg:pb-8">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 gap-8 rounded-2xl bg-black p-8 lg:grid-cols-2 lg:gap-12 lg:p-12">
          {/* Left — heading */}
          <h2 className="text-[32px] font-semibold leading-snug text-white">
            More fully electric adventure is on the way. Sign up to follow
            along.
          </h2>

          {/* Right — form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email*"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-[14px] text-white placeholder:text-white/50 transition-colors focus:border-white/50 focus:outline-none"
            />
            <input
              type="text"
              placeholder="Zip code"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              className="w-full rounded-xl border border-white/20 bg-transparent px-4 py-3 text-[14px] text-white placeholder:text-white/50 transition-colors focus:border-white/50 focus:outline-none"
            />
            <div>
              <button
                type="submit"
                className="rounded-full bg-[#ffac00] px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-[#ffac00]/90"
              >
                Subscribe
              </button>
            </div>
            <p className="text-xs leading-relaxed text-white/50">
              By clicking &ldquo;Subscribe&rdquo; you agree to receive Rivian
              marketing emails. See our{" "}
              <a href="#" className="underline">
                Privacy Policy
              </a>{" "}
              and{" "}
              <a href="#" className="underline">
                Terms
              </a>
              . You may unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}

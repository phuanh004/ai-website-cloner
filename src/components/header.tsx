"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { RivianLogo, HamburgerIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

const vehicleLinks = [
  { label: "R1S", href: "/r1s" },
  { label: "R1T", href: "/r1t" },
  { label: "R2", href: "/r2" },
  { label: "R3", href: "/r3" },
  { label: "Fleet", href: "/fleet" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setScrolled(window.scrollY > 50);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="absolute inset-x-0 top-0 z-50 w-full">
      {/* Announcement Bar — scrolls with page */}
      <div className="flex h-[54px] items-center justify-center bg-[#e5e0ce] px-4">
        <p className="text-center text-xs text-black">
          Want to see what we&apos;re up to?{" "}
          <Link
            href="/connect/tell-us-more"
            className="underline underline-offset-2 hover:no-underline"
          >
            Get updates from Rivian
          </Link>
        </p>
      </div>

      {/* Navigation Bar */}
      <nav
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300 ease-in-out",
          scrolled
            ? "bg-white shadow-[0_1px_3px_rgba(0,0,0,0.08)]"
            : "bg-transparent"
        )}
      >
        <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 lg:px-10">
          {/* Left section */}
          <div className="flex items-center gap-1">
            {/* Hamburger — mobile/tablet only */}
            <button
              type="button"
              aria-label="Open menu"
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-300 lg:hidden",
                scrolled
                  ? "bg-gray-100 text-black"
                  : "bg-white/20 text-white"
              )}
            >
              <HamburgerIcon className="h-5 w-5" />
            </button>

            {/* Vehicle links — desktop only */}
            <ul className="hidden items-center lg:flex">
              {vehicleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={cn(
                      "px-3 py-2 text-sm font-medium transition-colors duration-300",
                      scrolled
                        ? "text-black hover:text-black/70"
                        : "text-white hover:text-white/70"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Center — Logo */}
          <Link
            href="/"
            className="absolute left-1/2 -translate-x-1/2"
            aria-label="Rivian home"
          >
            <RivianLogo
              className={cn(
                "h-[18px] w-auto transition-colors duration-300 lg:h-5",
                scrolled ? "text-black" : "text-white"
              )}
            />
          </Link>

          {/* Right section */}
          <div className="flex items-center gap-3">
            <Link
              href="/demo-drive/book"
              className="rounded-full bg-[#ffac00] px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-[#e69b00]"
            >
              Demo Drive
            </Link>
            <Link
              href="/account"
              className={cn(
                "hidden text-sm font-medium transition-colors duration-300 sm:inline-block",
                scrolled
                  ? "text-black hover:text-black/70"
                  : "text-white hover:text-white/70"
              )}
            >
              Sign In
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

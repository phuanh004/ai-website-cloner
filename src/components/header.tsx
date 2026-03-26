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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
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

      {/* Mobile menu panel */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[60] bg-white lg:hidden">
          <div className="flex h-[72px] items-center justify-between px-6">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileMenuOpen(false)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-black"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            <Link
              href="/"
              className="absolute left-1/2 -translate-x-1/2"
              aria-label="Rivian home"
              onClick={() => setMobileMenuOpen(false)}
            >
              <RivianLogo className="h-[18px] w-auto text-black" />
            </Link>

            <div className="w-10" />
          </div>

          <nav className="px-6 pt-4">
            <ul className="flex flex-col gap-1">
              {vehicleLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="block rounded-lg px-4 py-3 text-lg font-medium text-black transition-colors hover:bg-gray-100"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="mt-6 border-t border-gray-200 pt-6">
              <Link
                href="/demo-drive/book"
                onClick={() => setMobileMenuOpen(false)}
                className="block rounded-full bg-[#ffac00] px-6 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-[#e69b00]"
              >
                Demo Drive
              </Link>
              <Link
                href="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-3 block rounded-full border border-gray-300 px-6 py-3 text-center text-sm font-medium text-black transition-colors hover:bg-gray-100"
              >
                Sign In
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

import Link from "next/link";

export function SoftwareSection() {
  return (
    <section className="bg-[#212121] px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Heading */}
        <h2 className="mb-4 text-center text-[56px] font-semibold leading-tight tracking-[-2.5px] text-white">
          Designed to get better with time
        </h2>

        {/* Subtext */}
        <p className="mx-auto mb-8 max-w-[700px] text-center text-base leading-relaxed text-white/70">
          As software-defined vehicles, Rivians are designed to evolve. We can
          add new features with software updates (just like a phone) so your
          vehicle actually improves over time.
        </p>

        {/* Explore button */}
        <div className="mb-16 flex justify-center">
          <Link
            href="/software"
            className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-opacity hover:opacity-90"
          >
            Explore
          </Link>
        </div>

        {/* Laptop/phone mockup placeholder */}
        <div className="h-[400px] rounded-2xl bg-gradient-to-b from-[#212121] to-[#111]" />
      </div>
    </section>
  );
}

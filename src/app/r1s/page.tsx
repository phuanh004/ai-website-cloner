import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const specs = [
  { label: "Range", value: "415", unit: "mi" },
  { label: "0–60 mph", value: "2.9", unit: "sec" },
  { label: "Towing", value: "7,700", unit: "lbs" },
  { label: "Seating", value: "7", unit: "seats" },
];

export default function R1SPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex flex-col items-center bg-rivian-black text-white pt-28 pb-0 overflow-hidden">
          <h1 className="font-liga text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-center">
            R1S
          </h1>
          <p className="mt-4 text-lg md:text-xl text-rivian-gray-400 text-center max-w-xl px-4">
            All-electric, 7-seat SUV built for making memories.
          </p>

          <div className="flex gap-4 mt-8 px-4">
            <Link
              href="/configurations/builder?MODEL=R1S"
              className="rounded-full bg-rivian-amber px-8 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Configure yours
            </Link>
            <Link
              href="/demo-drive/book"
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Demo drive
            </Link>
          </div>

          <div className="w-full max-w-5xl mt-12 px-4">
            <Image
              src="/images/r1s-base.webp"
              alt="Rivian R1S electric SUV"
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </section>

        {/* Specs */}
        <section className="bg-rivian-dark py-20 px-4">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-3xl md:text-5xl font-liga font-medium text-white">
                  {spec.value}
                </p>
                <p className="text-xs text-rivian-gray-500 uppercase tracking-widest mt-1">
                  {spec.unit}
                </p>
                <p className="text-sm text-rivian-gray-400 mt-2">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Feature highlight */}
        <section className="bg-rivian-black text-white py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-liga text-3xl md:text-5xl mb-6">
              Adventure in every detail
            </h2>
            <p className="text-rivian-gray-400 text-lg leading-relaxed">
              R1S is built to carry your family, your gear, and your sense of
              adventure. With a spacious three-row interior, a 4-motor
              all-wheel-drive system, and up to 415 miles of range, the R1S is
              ready for the long way there — and back.
            </p>
          </div>
        </section>

        {/* Interior gallery placeholder */}
        <section className="relative h-[60vh] bg-rivian-dark flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-r1s-field.jpg"
              alt="R1S in the field"
              fill
              className="object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="font-liga text-3xl md:text-5xl mb-4">
              Room for the whole crew
            </h2>
            <p className="text-rivian-gray-300 text-lg max-w-lg mx-auto">
              Three rows of seating with flexible cargo configurations. Fold
              flat the second and third rows for up to 104 cubic feet of cargo
              space.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-rivian-black text-white py-24 px-4 text-center">
          <h2 className="font-liga text-3xl md:text-5xl mb-6">
            Ready to explore?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/configurations/builder?MODEL=R1S"
              className="rounded-full bg-rivian-amber px-10 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Configure yours
            </Link>
            <Link
              href="/demo-drive/book"
              className="rounded-full border border-white/30 px-10 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Book a demo drive
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

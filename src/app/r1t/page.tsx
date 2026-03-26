import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const specs = [
  { label: "Range", value: "420", unit: "mi" },
  { label: "0–60 mph", value: "2.9", unit: "sec" },
  { label: "Towing", value: "11,000", unit: "lbs" },
  { label: "Payload", value: "1,760", unit: "lbs" },
];

export default function R1TPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex flex-col items-center bg-rivian-black text-white pt-28 pb-0 overflow-hidden">
          <h1 className="font-liga text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-center">
            R1T
          </h1>
          <p className="mt-4 text-lg md:text-xl text-rivian-gray-400 text-center max-w-xl px-4">
            All-electric truck built for whatever you call a road.
          </p>

          <div className="flex gap-4 mt-8 px-4">
            <Link
              href="/configurations/builder?MODEL=R1T"
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
              src="/images/r1t-base.webp"
              alt="Rivian R1T electric truck"
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
              Work hard. Play harder.
            </h2>
            <p className="text-rivian-gray-400 text-lg leading-relaxed">
              R1T redefines what a truck can be. With a powered tonneau cover,
              gear tunnel, integrated air compressor, and up to 11,000 lbs of
              towing capacity — it&apos;s built to handle the job site and the
              trailhead.
            </p>
          </div>
        </section>

        {/* Gear tunnel section */}
        <section className="bg-rivian-dark text-white py-24 px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-liga text-3xl md:text-4xl mb-6">
                The Gear Tunnel
              </h2>
              <p className="text-rivian-gray-400 text-lg leading-relaxed">
                A lockable, 67.8&quot; long storage compartment that runs the
                full width of the truck between the cab and the bed. Stash skis,
                golf bags, or camping chairs out of sight and out of the
                elements.
              </p>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden bg-rivian-black">
              <Image
                src="/images/r1t-base.webp"
                alt="R1T Gear Tunnel"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-rivian-black text-white py-24 px-4 text-center">
          <h2 className="font-liga text-3xl md:text-5xl mb-6">
            Ready to hit the trail?
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/configurations/builder?MODEL=R1T"
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

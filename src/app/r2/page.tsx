import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const specs = [
  { label: "Starting at", value: "$45,000" },
  { label: "Seating", value: "5 seats" },
  { label: "Drivetrain", value: "All-wheel drive" },
];

export default function R2Page() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="relative flex flex-col items-center bg-rivian-black text-white pt-28 pb-0 overflow-hidden">
          <h1 className="font-liga text-[clamp(4rem,12vw,10rem)] leading-none tracking-tight text-center">
            R2
          </h1>
          <p className="mt-4 text-lg md:text-xl text-rivian-gray-400 text-center max-w-xl px-4">
            Everything you need to get out there and say yes to new things.
          </p>
          <p className="mt-2 text-sm text-rivian-amber font-semibold uppercase tracking-widest">
            Available spring 2026
          </p>

          <div className="mt-8 px-4">
            <Link
              href="#reserve"
              className="rounded-full bg-rivian-amber px-10 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Reserve yours
            </Link>
          </div>

          <div className="w-full max-w-5xl mt-12 px-4">
            <Image
              src="/images/r2-base.webp"
              alt="Rivian R2 electric SUV"
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
        </section>

        {/* Specs */}
        <section className="bg-rivian-dark py-20 px-4">
          <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {specs.map((spec) => (
              <div key={spec.label}>
                <p className="text-2xl md:text-4xl font-liga font-medium text-white">
                  {spec.value}
                </p>
                <p className="text-sm text-rivian-gray-400 mt-2">
                  {spec.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="bg-rivian-black text-white py-24 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="font-liga text-3xl md:text-5xl mb-6">
              Adventure, accessible
            </h2>
            <p className="text-rivian-gray-400 text-lg leading-relaxed">
              R2 brings Rivian&apos;s adventure-ready DNA to a more accessible
              price point. With a compact footprint, impressive range, and the
              same rugged capability you expect from Rivian — R2 is built for
              everyone who wants to explore without compromise.
            </p>
          </div>
        </section>

        {/* Forest image section */}
        <section className="relative h-[60vh] bg-rivian-dark flex items-center justify-center">
          <div className="absolute inset-0">
            <Image
              src="/images/hero-r2-forest.jpg"
              alt="R2 in the forest"
              fill
              className="object-cover opacity-60"
            />
          </div>
          <div className="relative z-10 text-center text-white px-4">
            <h2 className="font-liga text-3xl md:text-5xl mb-4">
              Born for the outdoors
            </h2>
            <p className="text-rivian-gray-300 text-lg max-w-lg mx-auto">
              Standard all-wheel drive, generous ground clearance, and an
              adventure-ready suspension — R2 goes where the road ends and the
              fun begins.
            </p>
          </div>
        </section>

        {/* Reserve CTA */}
        <section
          id="reserve"
          className="bg-rivian-black text-white py-24 px-4 text-center"
        >
          <h2 className="font-liga text-3xl md:text-5xl mb-4">
            Be among the first
          </h2>
          <p className="text-rivian-gray-400 mb-8 max-w-md mx-auto">
            Reserve your R2 today with a fully refundable $100 deposit. Expected
            deliveries begin spring 2026.
          </p>
          <Link
            href="#reserve"
            className="rounded-full bg-rivian-amber px-10 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
          >
            Reserve yours
          </Link>
        </section>
      </main>
      <Footer />
    </>
  );
}

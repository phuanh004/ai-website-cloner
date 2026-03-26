import Link from "next/link";

const chargingFeatures = [
  {
    text: "Access to over 50,000 chargers — including Tesla Superchargers.",
  },
  {
    text: "Built-in technology takes the guesswork out of trip planning.",
  },
  {
    text: "With a Wall Charger at home, you'll always wake up ready to go.",
  },
];

export function ChargingSection() {
  return (
    <section className="bg-black px-6 py-24">
      <div className="mx-auto max-w-7xl">
        {/* Top content */}
        <div className="mb-16">
          <h2 className="mb-6 text-[56px] font-semibold leading-tight tracking-[-2.5px] text-white">
            Ready for electric exploration
          </h2>

          <p className="mb-8 max-w-[500px] text-base leading-relaxed text-white/70">
            With up to 420 miles of range and a NACS charge port so you can
            charge in more places, Rivian makes it easy to get out and explore.
          </p>

          <Link
            href="/charging"
            className="inline-block rounded-full border border-white bg-transparent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-white/10"
          >
            Explore charging
          </Link>
        </div>

        {/* Feature items */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {chargingFeatures.map((feature) => (
            <div key={feature.text} className="flex items-start gap-4">
              {/* Circular image placeholder */}
              <div className="h-16 w-16 shrink-0 rounded-full bg-gray-700" />

              {/* Text */}
              <p className="text-sm leading-relaxed text-white/70">
                {feature.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

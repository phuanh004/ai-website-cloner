import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const vehicleData: Record<
  string,
  { name: string; image: string; basePrice: number }
> = {
  r1s: {
    name: "R1S",
    image: "/images/r1s-base.webp",
    basePrice: 75900,
  },
  r1t: {
    name: "R1T",
    image: "/images/r1t-base.webp",
    basePrice: 69900,
  },
  r2: {
    name: "R2",
    image: "/images/r2-base.webp",
    basePrice: 45000,
  },
};

function fmt(price: number) {
  return "$" + price.toLocaleString("en-US");
}

const summaryRows = [
  { label: "Drivetrain", value: "Dual Motor" },
  { label: "Battery", value: "Standard" },
  { label: "Exterior color", value: "Rivian Blue" },
  { label: "Interior color", value: "Black Mountain" },
  { label: "Wheels", value: '21" Road' },
];

export default async function SummaryPage({
  params,
  searchParams,
}: {
  params: Promise<{ model: string }>;
  searchParams: Promise<{ CONFIG?: string }>;
}) {
  const { model } = await params;
  const sp = await searchParams;
  const config = sp.CONFIG ?? "";

  const vehicle = vehicleData[model] ?? vehicleData.r1s;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-rivian-black text-white pt-24 pb-20">
        <div className="max-w-4xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="font-liga text-4xl md:text-6xl tracking-tight">
              Your {vehicle.name} Summary
            </h1>
          </div>

          {/* Vehicle image */}
          <div className="max-w-3xl mx-auto mb-14">
            <Image
              src={vehicle.image}
              alt={`Rivian ${vehicle.name}`}
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>

          {/* Configuration summary */}
          <div className="max-w-lg mx-auto">
            <div className="rounded-2xl border border-white/10 bg-white/5 divide-y divide-white/10">
              <div className="px-6 py-4 flex justify-between">
                <span className="text-rivian-gray-400">Model</span>
                <span className="font-semibold">{vehicle.name}</span>
              </div>
              {summaryRows.map((row) => (
                <div key={row.label} className="px-6 py-4 flex justify-between">
                  <span className="text-rivian-gray-400">{row.label}</span>
                  <span className="font-semibold">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="mt-8 text-center">
              <p className="text-sm text-rivian-gray-500">Total price</p>
              <p className="text-3xl font-semibold mt-1">
                {fmt(vehicle.basePrice)}
              </p>
            </div>

            {/* CTA */}
            <div className="mt-10 flex justify-center">
              <Link
                href={`/configurations/builder/${model}/checkout?CONFIG=${config}`}
                className="rounded-full bg-rivian-amber px-12 py-3.5 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
              >
                Proceed to checkout
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

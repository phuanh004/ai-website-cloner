import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ColorPicker } from "@/components/color-picker";

const models = [
  {
    id: "R1S",
    name: "R1S",
    tagline: "Adventure SUV",
    price: "$75,900",
    image: "/images/r1s-base.webp",
  },
  {
    id: "R1T",
    name: "R1T",
    tagline: "Adventure Truck",
    price: "$69,900",
    image: "/images/r1t-base.webp",
  },
  {
    id: "R2",
    name: "R2",
    tagline: "Everyday Adventure",
    price: "$45,000",
    image: "/images/r2-base.webp",
  },
];

export default async function ConfiguratorPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;
  const modelParam =
    typeof params.MODEL === "string" ? params.MODEL : "R1S";
  const selected =
    models.find((m) => m.id === modelParam) ?? models[0];

  return (
    <>
      <Header />
      <main className="min-h-screen bg-rivian-black text-white pt-24 pb-20">
        {/* Page heading */}
        <div className="text-center px-4 mb-12">
          <h1 className="font-liga text-4xl md:text-6xl tracking-tight">
            Build your Rivian
          </h1>
          <p className="mt-3 text-rivian-gray-400 text-lg">
            Choose your model and make it yours.
          </p>
        </div>

        {/* Model selector tabs */}
        <div className="flex justify-center gap-2 px-4 mb-16">
          {models.map((model) => (
            <Link
              key={model.id}
              href={`/configurations/builder?MODEL=${model.id}`}
              className={`rounded-full px-6 py-2 text-sm font-semibold transition-colors ${
                model.id === selected.id
                  ? "bg-white text-rivian-black"
                  : "border border-white/20 text-white hover:bg-white/10"
              }`}
            >
              {model.name}
            </Link>
          ))}
        </div>

        {/* Vehicle display */}
        <div className="max-w-4xl mx-auto px-4 mb-12">
          <div className="relative flex items-center justify-center">
            <Image
              src={selected.image}
              alt={`Rivian ${selected.name}`}
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>
          <div className="text-center mt-6">
            <h2 className="font-liga text-3xl md:text-5xl">
              {selected.name}
            </h2>
            <p className="text-rivian-gray-400 mt-1">{selected.tagline}</p>
            <p className="mt-4 text-sm text-rivian-gray-500">
              Starting at{" "}
              <span className="text-white font-semibold text-lg">
                {selected.price}
              </span>
            </p>
          </div>
        </div>

        {/* Color picker */}
        <div className="max-w-md mx-auto px-4 mb-16">
          <h3 className="text-center text-sm uppercase tracking-widest text-rivian-gray-500 mb-4">
            Exterior color
          </h3>
          <ColorPicker />
        </div>

        {/* Next button */}
        <div className="flex justify-center px-4">
          <Link
            href={`/configurations/builder/${selected.id.toLowerCase()}/build?CONFIG=BLD-DS${selected.id}`}
            className="rounded-full bg-rivian-amber px-12 py-3.5 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
          >
            Next
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}

import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const values = [
  {
    title: "Sustainability",
    description:
      "We believe the transition to sustainable energy is the most important challenge of our time. Every decision we make — from vehicle design to manufacturing — is guided by our commitment to the planet.",
  },
  {
    title: "Innovation",
    description:
      "We develop our own motors, battery packs, vehicle software, and electronics in-house. This vertical integration allows us to move fast and deliver a better product.",
  },
  {
    title: "Adventure",
    description:
      "We design our vehicles for people who love the outdoors. From the gear tunnel to the camp kitchen, every feature is purpose-built for real-world adventure.",
  },
  {
    title: "Community",
    description:
      "Rivian owners are explorers, conservationists, and changemakers. We build tools and experiences that bring this community together.",
  },
];

export default function OurCompanyPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-rivian-black text-white pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-liga text-4xl md:text-6xl mb-6">
              Our Company
            </h1>
            <p className="text-rivian-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              We&apos;re building vehicles, energy solutions, and technology to
              support a more sustainable future.
            </p>
          </div>
        </section>

        {/* Mission image */}
        <section className="relative h-[50vh] md:h-[60vh]">
          <Image
            src="/images/hero-r1s-bridge.jpg"
            alt="Rivian vehicle on a bridge in nature"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 flex items-center justify-center px-4">
            <p className="text-white font-liga text-2xl md:text-4xl text-center max-w-3xl leading-snug">
              &ldquo;Our mission is to keep the world adventurous forever.&rdquo;
            </p>
          </div>
        </section>

        {/* Story */}
        <section className="bg-rivian-dark text-white py-24 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-liga text-3xl md:text-4xl mb-8 text-center">
              Our story
            </h2>
            <div className="space-y-6 text-rivian-gray-400 text-lg leading-relaxed">
              <p>
                Founded in 2009, Rivian set out to create vehicles that combine
                performance, utility, and sustainability. After more than a
                decade of development, we delivered our first vehicles in 2021 —
                the R1T pickup truck and R1S SUV.
              </p>
              <p>
                We design and manufacture our vehicles at our factory in Normal,
                Illinois, where we&apos;ve transformed a former automotive plant
                into a state-of-the-art production facility. Our second factory
                in Georgia will expand production to meet growing demand.
              </p>
              <p>
                Beyond consumer vehicles, we&apos;re building electric delivery
                vans for Amazon, contributing to the decarbonization of
                last-mile logistics. We also operate the Rivian Adventure
                Network — a growing network of fast chargers at trailheads,
                parks, and popular destinations.
              </p>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="bg-rivian-black text-white py-24 px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="font-liga text-3xl md:text-4xl mb-12 text-center">
              What drives us
            </h2>
            <div className="grid md:grid-cols-2 gap-10">
              {values.map((value) => (
                <div key={value.title} className="bg-rivian-dark rounded-2xl p-8">
                  <h3 className="font-liga text-xl text-rivian-amber mb-3">
                    {value.title}
                  </h3>
                  <p className="text-rivian-gray-400 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers CTA */}
        <section className="bg-rivian-dark text-white py-24 px-4 text-center">
          <h2 className="font-liga text-3xl md:text-4xl mb-4">
            Join our team
          </h2>
          <p className="text-rivian-gray-400 max-w-md mx-auto mb-8">
            We&apos;re hiring engineers, designers, and operators who want to
            build the future of transportation.
          </p>
          <a
            href="https://rivian.com/careers"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-rivian-amber px-10 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
          >
            View open positions
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}

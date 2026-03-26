import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const benefits = [
  {
    title: "Lower total cost of ownership",
    description:
      "Eliminate fuel costs and reduce maintenance with fewer moving parts. Rivian fleet vehicles are engineered for maximum uptime.",
  },
  {
    title: "Purpose-built commercial vehicles",
    description:
      "From last-mile delivery to field services, our vehicles are designed for the demands of commercial operations.",
  },
  {
    title: "Fleet management tools",
    description:
      "Real-time telematics, route optimization, and centralized charging management — all from a single dashboard.",
  },
  {
    title: "Sustainability reporting",
    description:
      "Track emissions reductions and generate ESG reports to meet your corporate sustainability goals.",
  },
];

export default function FleetPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-rivian-black text-white pt-32 pb-20 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-liga text-4xl md:text-6xl mb-6">
              Rivian for Fleet
            </h1>
            <p className="text-rivian-gray-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
              Electrify your fleet with purpose-built commercial vehicles,
              integrated charging infrastructure, and fleet management software —
              all from Rivian.
            </p>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-rivian-dark text-white py-20 px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-10">
            {benefits.map((benefit) => (
              <div
                key={benefit.title}
                className="bg-rivian-black rounded-2xl p-8"
              >
                <h3 className="font-liga text-xl mb-3">{benefit.title}</h3>
                <p className="text-rivian-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact form */}
        <section className="bg-rivian-black text-white py-24 px-4">
          <div className="max-w-lg mx-auto">
            <h2 className="font-liga text-3xl md:text-4xl mb-4 text-center">
              Get in touch
            </h2>
            <p className="text-rivian-gray-400 text-center mb-10">
              Tell us about your fleet needs and a Rivian representative will
              follow up.
            </p>
            <form className="space-y-5">
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Company name
                </label>
                <input
                  type="text"
                  className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                  placeholder="Acme Corp"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-rivian-gray-400 mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm text-rivian-gray-400 mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Work email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                  placeholder="jane@acme.com"
                />
              </div>
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Fleet size
                </label>
                <select className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-rivian-amber transition-colors">
                  <option value="">Select fleet size</option>
                  <option value="1-10">1 – 10 vehicles</option>
                  <option value="11-50">11 – 50 vehicles</option>
                  <option value="51-200">51 – 200 vehicles</option>
                  <option value="200+">200+ vehicles</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Message
                </label>
                <textarea
                  rows={4}
                  className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors resize-none"
                  placeholder="Tell us about your fleet needs..."
                />
              </div>
              <button
                type="button"
                className="w-full rounded-full bg-rivian-amber py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
              >
                Submit
              </button>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

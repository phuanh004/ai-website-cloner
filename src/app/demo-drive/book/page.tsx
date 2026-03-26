import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const locations = [
  "New York, NY",
  "Los Angeles, CA",
  "Chicago, IL",
  "San Francisco, CA",
  "Seattle, WA",
  "Austin, TX",
  "Miami, FL",
  "Denver, CO",
  "Atlanta, GA",
  "Normal, IL",
];

export default function DemoDriveBookPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero */}
        <section className="bg-rivian-black text-white pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-liga text-4xl md:text-6xl mb-4">
              Book a demo drive
            </h1>
            <p className="text-rivian-gray-400 text-lg max-w-xl mx-auto">
              Experience the thrill of electric adventure firsthand. Choose a
              vehicle, pick a location, and we&apos;ll handle the rest.
            </p>
          </div>
        </section>

        {/* Booking form */}
        <section className="bg-rivian-dark text-white py-20 px-4">
          <div className="max-w-lg mx-auto">
            <form className="space-y-6">
              {/* Vehicle */}
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-2">
                  Which vehicle would you like to drive?
                </label>
                <div className="grid grid-cols-2 gap-3">
                  {["R1S", "R1T", "R2", "R3"].map((vehicle) => (
                    <label
                      key={vehicle}
                      className="flex items-center justify-center rounded-xl bg-rivian-black border border-white/15 px-4 py-4 text-center cursor-pointer hover:border-rivian-amber/50 transition-colors"
                    >
                      <input
                        type="radio"
                        name="vehicle"
                        value={vehicle}
                        className="sr-only"
                      />
                      <span className="font-liga text-lg">{vehicle}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Location
                </label>
                <select className="w-full rounded-lg bg-rivian-black border border-white/15 px-4 py-3 text-sm text-white focus:outline-none focus:border-rivian-amber transition-colors">
                  <option value="">Select a location</option>
                  {locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </div>

              {/* Name */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-rivian-gray-400 mb-1.5">
                    First name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-rivian-black border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                    placeholder="Jane"
                  />
                </div>
                <div>
                  <label className="block text-sm text-rivian-gray-400 mb-1.5">
                    Last name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-lg bg-rivian-black border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                    placeholder="Doe"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  className="w-full rounded-lg bg-rivian-black border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                  placeholder="jane@email.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm text-rivian-gray-400 mb-1.5">
                  Phone
                </label>
                <input
                  type="tel"
                  className="w-full rounded-lg bg-rivian-black border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                  placeholder="(555) 123-4567"
                />
              </div>

              <button
                type="button"
                className="w-full rounded-full bg-rivian-amber py-3.5 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
              >
                Book demo drive
              </button>

              <p className="text-xs text-rivian-gray-600 text-center">
                By submitting, you agree to receive communications from Rivian.
                You can opt out at any time.
              </p>
            </form>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

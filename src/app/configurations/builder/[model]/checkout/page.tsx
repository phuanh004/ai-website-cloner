import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const vehicleData: Record<
  string,
  { name: string; basePrice: number }
> = {
  r1s: { name: "R1S", basePrice: 75900 },
  r1t: { name: "R1T", basePrice: 69900 },
  r2: { name: "R2", basePrice: 45000 },
};

function fmt(price: number) {
  return "$" + price.toLocaleString("en-US");
}

export default async function CheckoutPage({
  params,
  searchParams,
}: {
  params: Promise<{ model: string }>;
  searchParams: Promise<{ CONFIG?: string }>;
}) {
  const { model } = await params;
  const _sp = await searchParams;

  const vehicle = vehicleData[model] ?? vehicleData.r1s;

  return (
    <>
      <Header />
      <main className="min-h-screen bg-rivian-black text-white pt-24 pb-20">
        <div className="max-w-5xl mx-auto px-4">
          <h1 className="font-liga text-4xl md:text-5xl tracking-tight text-center mb-14">
            Complete your order
          </h1>

          <div className="grid md:grid-cols-[1fr_360px] gap-12">
            {/* Left: Contact & payment form */}
            <div className="space-y-10">
              {/* Contact info */}
              <section>
                <h2 className="text-lg font-semibold mb-5">
                  Contact information
                </h2>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label
                        htmlFor="firstName"
                        className="block text-sm text-rivian-gray-400 mb-1"
                      >
                        First name
                      </label>
                      <input
                        id="firstName"
                        type="text"
                        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-rivian-gray-500 focus:outline-none focus:ring-2 focus:ring-rivian-amber"
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="lastName"
                        className="block text-sm text-rivian-gray-400 mb-1"
                      >
                        Last name
                      </label>
                      <input
                        id="lastName"
                        type="text"
                        className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-rivian-gray-500 focus:outline-none focus:ring-2 focus:ring-rivian-amber"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm text-rivian-gray-400 mb-1"
                    >
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-rivian-gray-500 focus:outline-none focus:ring-2 focus:ring-rivian-amber"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm text-rivian-gray-400 mb-1"
                    >
                      Phone
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-rivian-gray-500 focus:outline-none focus:ring-2 focus:ring-rivian-amber"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="address"
                      className="block text-sm text-rivian-gray-400 mb-1"
                    >
                      Address
                    </label>
                    <input
                      id="address"
                      type="text"
                      className="w-full rounded-lg bg-white/10 border border-white/20 px-4 py-3 text-white placeholder:text-rivian-gray-500 focus:outline-none focus:ring-2 focus:ring-rivian-amber"
                    />
                  </div>
                </div>
              </section>

              {/* Payment placeholder */}
              <section>
                <h2 className="text-lg font-semibold mb-5">Payment</h2>
                <div className="rounded-xl border border-white/10 bg-white/5 px-6 py-10 text-center text-rivian-gray-400">
                  Payment processing will be available soon.
                </div>
              </section>

              {/* Place order button */}
              <button
                type="button"
                className="w-full rounded-full bg-rivian-amber px-8 py-3.5 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
              >
                Place order
              </button>
            </div>

            {/* Right: Order summary sidebar */}
            <aside className="rounded-2xl border border-white/10 bg-white/5 p-6 h-fit sticky top-28">
              <h2 className="text-lg font-semibold mb-6">Order summary</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-rivian-gray-400">Vehicle</span>
                  <span>{vehicle.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rivian-gray-400">Drivetrain</span>
                  <span>Dual Motor</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rivian-gray-400">Battery</span>
                  <span>Standard</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rivian-gray-400">Exterior</span>
                  <span>Rivian Blue</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-rivian-gray-400">Interior</span>
                  <span>Black Mountain</span>
                </div>
              </div>
              <div className="border-t border-white/10 mt-6 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>{fmt(vehicle.basePrice)}</span>
              </div>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

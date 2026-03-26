import Image from "next/image";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function ReserveR2Page() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-rivian-black text-white pt-24 pb-20">
        <div className="max-w-3xl mx-auto px-4">
          {/* Heading */}
          <div className="text-center mb-10">
            <h1 className="font-liga text-4xl md:text-6xl tracking-tight">
              Reserve your R2
            </h1>
            <p className="mt-4 text-amber-400 text-lg font-semibold">
              Available spring 2026
            </p>
          </div>

          {/* Vehicle image */}
          <div className="mb-12">
            <Image
              src="/images/r2-base.webp"
              alt="Rivian R2"
              width={1200}
              height={600}
              style={{ width: "100%", height: "auto" }}
              priority
            />
          </div>

          {/* Reservation form */}
          <form className="max-w-md mx-auto space-y-6">
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
                  placeholder="First name"
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
                  placeholder="Last name"
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
                placeholder="email@example.com"
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
                placeholder="(555) 555-5555"
              />
            </div>

            <p className="text-center text-sm text-rivian-gray-400">
              $100 refundable deposit
            </p>

            <button
              type="submit"
              className="w-full rounded-full bg-rivian-amber px-8 py-3.5 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Reserve now
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}

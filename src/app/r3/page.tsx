import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function R3Page() {
  return (
    <>
      <Header />
      <main>
        <section className="bg-rivian-black text-white min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
          <h1 className="font-liga text-[clamp(4rem,14vw,12rem)] leading-none tracking-tight">
            R3
          </h1>
          <p className="mt-6 text-xl md:text-2xl text-rivian-gray-400 max-w-md">
            A new way to go electric.
          </p>
          <div className="mt-3 inline-block rounded-full bg-rivian-dark px-5 py-2">
            <span className="text-sm text-rivian-amber font-semibold uppercase tracking-widest">
              Coming soon
            </span>
          </div>
          <p className="mt-10 text-rivian-gray-500 text-base max-w-lg leading-relaxed">
            R3 is Rivian&apos;s most compact vehicle yet — designed for city
            streets and weekend getaways alike. More details will be announced
            soon.
          </p>
          <Link
            href="#stay-updated"
            className="mt-8 rounded-full border border-white/30 px-10 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            Stay updated
          </Link>
        </section>

        {/* Email signup */}
        <section
          id="stay-updated"
          className="bg-rivian-dark text-white py-24 px-4 text-center"
        >
          <h2 className="font-liga text-2xl md:text-4xl mb-4">
            Get the latest on R3
          </h2>
          <p className="text-rivian-gray-400 mb-8 max-w-md mx-auto">
            Sign up to receive updates about availability, specs, and pricing as
            we get closer to launch.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 rounded-full bg-rivian-black border border-white/20 px-5 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
            />
            <button
              type="button"
              className="rounded-full bg-rivian-amber px-8 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Sign up
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

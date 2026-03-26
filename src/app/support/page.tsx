import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

const categories = [
  {
    title: "Ordering",
    description: "Pricing, configurations, financing, and trade-ins.",
    icon: "🛒",
    href: "#ordering",
  },
  {
    title: "Delivery",
    description: "Scheduling, preparation, and what to expect on delivery day.",
    icon: "📦",
    href: "#delivery",
  },
  {
    title: "Charging",
    description:
      "Home charging setup, Rivian Adventure Network, and third-party networks.",
    icon: "⚡",
    href: "#charging",
  },
  {
    title: "Service",
    description:
      "Maintenance schedules, mobile service, and service center locations.",
    icon: "🔧",
    href: "#service",
  },
  {
    title: "Account",
    description: "Profile settings, payment methods, and account security.",
    icon: "👤",
    href: "#account",
  },
];

const popularArticles = [
  "How do I charge my Rivian at home?",
  "What is the Rivian Adventure Network?",
  "How do I schedule a service appointment?",
  "What financing options are available?",
  "How do I track my vehicle delivery?",
  "What is included in the warranty?",
];

export default function SupportPage() {
  return (
    <>
      <Header />
      <main>
        {/* Hero + search */}
        <section className="bg-rivian-black text-white pt-32 pb-16 px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="font-liga text-4xl md:text-6xl mb-6">
              How can we help?
            </h1>
            <div className="relative max-w-xl mx-auto">
              <input
                type="text"
                placeholder="Search for answers..."
                className="w-full rounded-full bg-rivian-dark border border-white/15 px-6 py-4 text-base text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
              />
              <span className="absolute right-5 top-1/2 -translate-y-1/2 text-rivian-gray-500">
                ⌘K
              </span>
            </div>
          </div>
        </section>

        {/* Categories */}
        <section className="bg-rivian-dark text-white py-20 px-4">
          <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.title}
                href={cat.href}
                className="bg-rivian-black rounded-2xl p-6 hover:ring-1 hover:ring-rivian-amber/40 transition-all group"
              >
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="font-liga text-lg mt-3 mb-2 group-hover:text-rivian-amber transition-colors">
                  {cat.title}
                </h3>
                <p className="text-rivian-gray-400 text-sm leading-relaxed">
                  {cat.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        {/* Popular articles */}
        <section className="bg-rivian-black text-white py-20 px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-liga text-2xl md:text-3xl mb-8 text-center">
              Popular articles
            </h2>
            <ul className="divide-y divide-white/10">
              {popularArticles.map((article) => (
                <li key={article}>
                  <Link
                    href="#"
                    className="flex items-center justify-between py-4 text-rivian-gray-300 hover:text-white transition-colors group"
                  >
                    <span>{article}</span>
                    <span className="text-rivian-gray-600 group-hover:text-rivian-amber transition-colors">
                      →
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Contact */}
        <section className="bg-rivian-dark text-white py-20 px-4 text-center">
          <h2 className="font-liga text-2xl md:text-3xl mb-4">
            Still need help?
          </h2>
          <p className="text-rivian-gray-400 mb-8 max-w-md mx-auto">
            Our support team is available 7 days a week to help you with
            anything you need.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+18888490104"
              className="rounded-full bg-rivian-amber px-8 py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Call us
            </a>
            <Link
              href="#"
              className="rounded-full border border-white/30 px-8 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
            >
              Live chat
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

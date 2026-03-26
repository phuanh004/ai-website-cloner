import Link from "next/link";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { RivianLogo } from "@/components/icons";

export default function ForgotPasswordPage() {
  return (
    <>
      <Header />
      <main className="bg-rivian-black text-white min-h-[80vh] flex items-center justify-center px-4 py-32">
        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-10">
            <RivianLogo className="h-8 text-white" />
          </div>

          <h1 className="font-liga text-2xl text-center mb-4">
            Reset your password
          </h1>
          <p className="text-sm text-rivian-gray-400 text-center mb-8">
            Enter the email associated with your account and we&apos;ll send you
            a link to reset your password.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm text-rivian-gray-400 mb-1.5">
                Email
              </label>
              <input
                type="email"
                className="w-full rounded-lg bg-rivian-dark border border-white/15 px-4 py-3 text-sm text-white placeholder:text-rivian-gray-600 focus:outline-none focus:border-rivian-amber transition-colors"
                placeholder="you@email.com"
              />
            </div>

            <button
              type="button"
              className="w-full rounded-full bg-rivian-amber py-3 text-sm font-semibold text-rivian-black hover:bg-rivian-amber-hover transition-colors"
            >
              Send reset link
            </button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/auth/login"
              className="text-sm text-rivian-gray-400 hover:text-white transition-colors"
            >
              ← Back to sign in
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

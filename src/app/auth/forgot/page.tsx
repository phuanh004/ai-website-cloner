import Link from "next/link";
import { RivianLogo } from "@/components/icons";

export default function ForgotPasswordPage() {
  return (
    <main className="bg-white min-h-screen flex flex-col items-center px-4 pt-16 pb-12">
      <Link href="/" className="mb-10">
        <RivianLogo className="h-7 text-black" />
      </Link>

      <div className="w-full max-w-[440px]">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-4">
          Reset your password
        </h1>
        <p className="text-sm text-gray-500 text-center mb-8">
          Enter your email and we&apos;ll send you a link to reset your
          password.
        </p>

        <form className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Email
            </label>
            <input
              type="email"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#ffac00] focus:ring-1 focus:ring-[#ffac00] focus:outline-none transition-colors"
              placeholder="you@email.com"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-[#ffac00] py-3 text-sm font-medium text-black hover:bg-[#e69d00] transition-colors"
          >
            Send reset link
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            href="/auth/login"
            className="text-sm text-gray-500 underline hover:text-black transition-colors"
          >
            Back to sign in
          </Link>
        </div>
      </div>
    </main>
  );
}

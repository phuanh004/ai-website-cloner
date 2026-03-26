"use client";

import { useState } from "react";
import Link from "next/link";
import { RivianLogo } from "@/components/icons";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="bg-white min-h-screen flex flex-col items-center px-4 pt-16 pb-12">
      <Link href="/" className="mb-10">
        <RivianLogo className="h-7 text-black" />
      </Link>

      <div className="w-full max-w-[440px]">
        <h1 className="text-2xl font-semibold text-center text-gray-900 mb-8">
          Sign in
        </h1>

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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 pr-12 text-sm text-gray-900 placeholder:text-gray-400 focus:border-[#ffac00] focus:ring-1 focus:ring-[#ffac00] focus:outline-none transition-colors"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <button
            type="button"
            className="w-full rounded-full bg-[#ffac00] py-3 text-sm font-medium text-black hover:bg-[#e69d00] transition-colors"
          >
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center space-y-3">
          <Link
            href="/auth/forgot"
            className="block text-sm text-gray-500 underline hover:text-black transition-colors"
          >
            Forgot password?
          </Link>
          <p className="text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="#"
              className="text-[#ffac00] hover:text-[#e69d00] font-medium transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>
    </main>
  );
}

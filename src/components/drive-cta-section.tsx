import Image from "next/image";
import { ArrowRight } from "lucide-react";

export function DriveCTASection() {
  return (
    <section className="bg-[#c4c4c4] px-4 pb-4 lg:px-16 lg:pb-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="relative overflow-hidden rounded-2xl min-h-[400px] lg:min-h-[480px]">
          {/* Background image */}
          <Image
            src="/images/test2_xnylbk.jpeg"
            alt="Get behind the wheel — driver's perspective inside a Rivian"
            fill
            className="object-cover"
            sizes="100vw"
          />
          {/* Bottom gradient for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Content — bottom-left aligned */}
          <div className="absolute inset-0 flex flex-col justify-end p-8 lg:p-12">
            <h2 className="text-[48px] font-bold leading-[1.05] tracking-[-1.5px] text-white lg:text-[64px] lg:tracking-[-2.5px]">
              Get behind<br />the wheel
            </h2>
            <div className="mt-6">
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Book a drive
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

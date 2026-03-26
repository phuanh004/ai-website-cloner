import { ArrowRight } from "lucide-react";

export function DriveCTASection() {
  return (
    <section className="bg-[#c4c4c4] px-4 pb-4 lg:px-16 lg:pb-4">
      <div className="mx-auto max-w-[1400px]">
        <div className="grid grid-cols-1 overflow-hidden rounded-2xl bg-[#1a1a1a] md:grid-cols-2">
          {/* Left — text + CTA */}
          <div className="flex flex-col justify-center gap-6 p-8 lg:p-12">
            <h2 className="text-[32px] font-bold leading-tight text-white">
              Get behind the wheel
            </h2>
            <div>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full border border-white px-6 py-3 text-[14px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
              >
                Book a drive
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Right — video */}
          <div className="relative min-h-[240px] md:min-h-[320px]">
            <video
              src="/videos/drive-cta.mp4"
              autoPlay
              muted
              loop
              playsInline
              className="h-full w-full object-cover rounded-r-2xl"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

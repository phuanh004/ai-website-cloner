import Image from "next/image";
import { Play } from "lucide-react";

export function AdventureMissionSection() {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Full-bleed background image */}
      <div className="relative flex min-h-screen flex-col items-center justify-center">
        <Image
          src="/images/forever_section_bg.jpeg"
          alt="Desert sunset with Rivian vehicles"
          fill
          className="object-cover object-top"
          priority
        />
        {/* Top gradient: smooth blend from dark sections above into the image */}
        <div className="absolute inset-x-0 top-0 z-[1] h-[35%] bg-gradient-to-b from-[#2a2a2a] via-[#2a2a2a]/60 to-transparent" />
        {/* Subtle overall overlay for text readability */}
        <div className="absolute inset-0 bg-black/15" />

        {/* Content */}
        <div className="relative z-10 flex max-w-[800px] flex-col items-center px-6 text-center">
          <h2 className="mb-6 text-[40px] font-semibold leading-[1.05] tracking-[-1.5px] text-white lg:text-[72px] lg:tracking-[-3px]">
            Keep the world adventurous forever
          </h2>
          <p className="mb-10 max-w-[550px] text-base leading-relaxed text-white/80 lg:text-lg">
            Everything we do is in service of building the future that our
            kids&apos; kids&apos; kids deserve and preserving the natural world
            for generations to come.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#212121]/90 px-8 py-4 text-sm font-medium text-white backdrop-blur-sm transition-opacity hover:opacity-90"
          >
            <Play className="h-4 w-4 fill-white" />
            Watch the video
          </a>
        </div>
      </div>
    </section>
  );
}

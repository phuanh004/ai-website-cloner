import Image from "next/image";

export function SafetySection() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden">
      {/* Background image */}
      <Image
        src="/images/safety-bg.webp"
        alt="Snowy mountain background"
        fill
        className="object-cover object-center"
        priority
      />

      {/* Content overlay */}
      <div className="relative z-10 flex flex-col items-center px-6 pt-32">
        {/* IIHS badge */}
        <Image
          src="/images/iihs-badge.svg"
          alt="IIHS Top Safety Pick+ badge"
          width={80}
          height={80}
          className="mb-6"
        />

        {/* Heading */}
        <h2 className="mb-4 text-center text-[56px] font-semibold leading-tight tracking-[-2.5px] text-white">
          Award-winning safety
        </h2>

        {/* Subtext */}
        <p className="mx-auto max-w-[600px] text-center text-base leading-relaxed text-white">
          The R1S continues to earn awards for safety — most recently, a 2026
          TOP SAFETY PICK+ from the IIHS for the 2026 R1S.
        </p>
      </div>

      {/* Foreground car image */}
      <Image
        src="/images/safety-fg.webp"
        alt="Rivian R1S driving in snow"
        fill
        className="object-cover object-bottom"
        style={{ zIndex: 5 }}
      />
    </section>
  );
}

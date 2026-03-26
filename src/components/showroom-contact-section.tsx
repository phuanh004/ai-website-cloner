"use client";

import { useState } from "react";
import Image from "next/image";

const showroomImages = [
  { src: "/images/showroom-1.webp", alt: "Rivian showroom interior view 1" },
  { src: "/images/showroom-2.webp", alt: "Rivian showroom interior view 2" },
];

function ShowroomCard() {
  const [currentImage, setCurrentImage] = useState(0);

  return (
    <div className="overflow-hidden rounded-2xl bg-white">
      {/* Image carousel — taller to match Rivian proportions */}
      <div className="relative aspect-[4/3]">
        <Image
          src={showroomImages[currentImage].src}
          alt={showroomImages[currentImage].alt}
          fill
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="rounded-t-2xl object-cover"
        />
        {/* Dot indicators */}
        <div className="absolute bottom-5 left-1/2 flex -translate-x-1/2 gap-2.5">
          {showroomImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`h-2.5 w-2.5 rounded-full transition-colors ${
                index === currentImage
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Location info — bigger text and more padding */}
      <div className="p-8 lg:p-10">
        <h3 className="text-[32px] font-bold tracking-[-0.5px] text-black lg:text-[40px]">
          Seattle, WA
        </h3>
        <div className="mt-4 flex flex-col gap-4 text-[15px] text-gray-600 sm:flex-row sm:gap-12 lg:text-[16px]">
          <div className="space-y-0.5">
            <p>2617 NE 46th Street</p>
            <p>Seattle, WA 98105</p>
          </div>
          <div className="space-y-0.5">
            <p>Mon&ndash;Sat: 10:00am&ndash;8:00pm</p>
            <p>Sun: 11:00am&ndash;6:00pm</p>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-5">
          <button className="rounded-full bg-black px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-black/85">
            Explore
          </button>
          <a
            href="#"
            className="text-[15px] font-medium text-black underline underline-offset-4 hover:text-gray-700"
          >
            See all locations
          </a>
        </div>
      </div>
    </div>
  );
}

function ContactFormCard() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const inputClassName =
    "w-full rounded-xl border border-white/20 bg-transparent px-5 py-4 text-[15px] text-white placeholder:text-white/50 focus:border-white/50 focus:outline-none transition-colors";

  return (
    <div className="flex h-full flex-col rounded-2xl bg-black px-8 pt-10 pb-10 lg:px-12 lg:pt-14 lg:pb-12">
      <h3 className="text-[36px] font-bold tracking-[-0.5px] text-white lg:text-[44px]">
        Keep up with Rivian
      </h3>
      <form onSubmit={handleSubmit} className="mt-8 flex flex-1 flex-col gap-5">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <input
            type="text"
            placeholder="First name*"
            required
            value={formData.firstName}
            onChange={(e) => handleChange("firstName", e.target.value)}
            className={inputClassName}
          />
          <input
            type="text"
            placeholder="Last name*"
            required
            value={formData.lastName}
            onChange={(e) => handleChange("lastName", e.target.value)}
            className={inputClassName}
          />
        </div>
        <input
          type="email"
          placeholder="Email*"
          required
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
          className={inputClassName}
        />
        <input
          type="tel"
          placeholder="Phone number*"
          required
          value={formData.phone}
          onChange={(e) => handleChange("phone", e.target.value)}
          className={inputClassName}
        />
        <p className="text-[13px] leading-relaxed text-white/50">
          By clicking the &ldquo;Submit&rdquo; button below, I authorize Rivian
          to contact me via the phone number provided to give me more information
          about Rivian products, news, and events using automated texts and
          calls. I understand message frequency varies, data rates may apply and
          this is not a condition of purchase. Opt-out anytime by texting
          &ldquo;STOP.&rdquo;
        </p>
        <p className="text-[13px] leading-relaxed text-white/50">
          By submitting, I agree to receive future communications from Rivian and
          I have read and agree to{" "}
          <a href="#" className="underline">
            Rivian&apos;s Terms
          </a>{" "}
          and acknowledge the{" "}
          <a href="#" className="underline">
            Data Privacy Notice
          </a>
          .
        </p>
        <div className="mt-auto pt-4">
          <button
            type="submit"
            className="rounded-full border border-white px-8 py-3.5 text-[15px] font-semibold text-white transition-colors hover:bg-white hover:text-black"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export function ShowroomContactSection() {
  return (
    <section className="bg-[#c4c4c4] px-4 py-8 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-4 lg:grid-cols-2">
        <ShowroomCard />
        <ContactFormCard />
      </div>
    </section>
  );
}

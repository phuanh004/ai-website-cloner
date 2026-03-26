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
      {/* Image carousel */}
      <div className="relative">
        <Image
          src={showroomImages[currentImage].src}
          alt={showroomImages[currentImage].alt}
          width={630}
          height={420}
          style={{ width: "100%", height: "auto" }}
          className="object-cover"
        />
        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {showroomImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              aria-label={`Go to image ${index + 1}`}
              className={`h-2 w-2 rounded-full transition-colors ${
                index === currentImage
                  ? "bg-white"
                  : "bg-white/50 hover:bg-white/75"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Location info */}
      <div className="p-6">
        <h3 className="text-[24px] font-semibold text-black">Seattle, WA</h3>
        <div className="mt-2 space-y-0.5 text-[14px] text-gray-500">
          <p>2617 NE 46th Street</p>
          <p>Seattle, WA 98105</p>
        </div>
        <div className="mt-3 space-y-0.5 text-[14px] text-gray-500">
          <p>Mon&ndash;Sat: 10:00am&ndash;8:00pm</p>
          <p>Sun: 11:00am&ndash;6:00pm</p>
        </div>
        <div className="mt-5 flex items-center gap-4">
          <button className="rounded-full bg-amber-500 px-6 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-amber-600">
            Explore
          </button>
          <a
            href="#"
            className="text-[14px] font-medium text-black underline underline-offset-2 hover:text-gray-700"
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
    "w-full rounded-lg border border-white/20 bg-transparent px-4 py-3 text-[14px] text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none transition-colors";

  return (
    <div className="flex h-full flex-col justify-center rounded-2xl bg-black p-8 lg:p-10">
      <h3 className="text-[32px] font-semibold text-white">
        Keep up with Rivian
      </h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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
        <p className="text-[12px] leading-relaxed text-white/60">
          By submitting this form, you agree to receive marketing communications
          from Rivian. You can unsubscribe at any time. See our{" "}
          <a href="#" className="underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="#" className="underline">
            Terms of Service
          </a>
          .
        </p>
        <button
          type="submit"
          className="rounded-full bg-white px-6 py-3 text-[14px] font-semibold text-black transition-colors hover:bg-white/90"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export function ShowroomContactSection() {
  return (
    <section className="bg-[#c4c4c4] px-6 py-8 lg:px-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-6 lg:grid-cols-2">
        <ShowroomCard />
        <ContactFormCard />
      </div>
    </section>
  );
}

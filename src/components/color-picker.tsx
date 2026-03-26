"use client";

import { useState } from "react";

const colors = [
  { name: "Rivian Blue", value: "#3a5a78" },
  { name: "Forest Green", value: "#2d3a2e" },
  { name: "Glacier White", value: "#e8e8e8" },
  { name: "El Cap Granite", value: "#4a4a4a" },
  { name: "Midnight Black", value: "#1a1a1a" },
];

export function ColorPicker() {
  const [selected, setSelected] = useState(0);

  return (
    <div>
      <div className="flex justify-center gap-4">
        {colors.map((color, i) => (
          <button
            key={color.name}
            type="button"
            title={color.name}
            onClick={() => setSelected(i)}
            className={`h-10 w-10 rounded-full transition-transform hover:scale-110 focus:outline-none ${
              selected === i
                ? "ring-2 ring-rivian-amber ring-offset-2 ring-offset-rivian-black scale-110"
                : "border-2 border-white/20"
            }`}
            style={{ backgroundColor: color.value }}
          />
        ))}
      </div>
      <p className="text-center text-sm text-rivian-gray-400 mt-3">
        {colors[selected].name}
      </p>
    </div>
  );
}

import { ArrowRight } from "lucide-react";

const actions = [
  { label: "Shop", bg: "bg-[#ffac00]" },
  { label: "Get updates", bg: "bg-[#98b582]" },
  { label: "Trade in", bg: "bg-[#e84826]" },
  { label: "Service", bg: "bg-[#8ba8bd]" },
] as const;

export function QuickActionsSection() {
  return (
    <section className="bg-[#c4c4c4] px-4 pb-4 lg:px-16 lg:pb-4">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-4 md:grid-cols-4">
        {actions.map((action) => (
          <a
            key={action.label}
            href="#"
            className={`${action.bg} group relative flex min-h-[200px] flex-col justify-end overflow-hidden rounded-2xl p-5 transition-opacity hover:opacity-90`}
          >
            <span className="text-[24px] font-bold leading-tight text-black">
              {action.label}
            </span>
            {/* Arrow circle */}
            <div className="absolute right-5 bottom-5 flex h-10 w-10 items-center justify-center rounded-full bg-black transition-transform group-hover:scale-110">
              <ArrowRight className="h-5 w-5 text-white" />
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

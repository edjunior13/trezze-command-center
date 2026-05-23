import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  gold?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({ children, className, hover, gold, padding = "md" }: CardProps) {
  const paddings = {
    none: "",
    sm: "p-4",
    md: "p-5",
    lg: "p-6",
  };

  return (
    <div
      className={cn(
        "rounded-xl border",
        "bg-navy-800/80 backdrop-blur-sm",
        gold
          ? "border-gold-500/20 shadow-[0_4px_24px_rgba(2,8,20,0.5),0_0_0_1px_rgba(201,168,76,0.08)_inset]"
          : "border-white/06 shadow-card",
        hover && "card-lift cursor-pointer",
        paddings[padding],
        className
      )}
    >
      {children}
    </div>
  );
}

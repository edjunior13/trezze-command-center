import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "gold" | "success" | "warning" | "danger" | "info";
  className?: string;
  dot?: boolean;
}

const variantClasses = {
  default: "bg-white/08 text-white/70 border-white/10",
  gold: "bg-gold-500/15 text-gold-400 border-gold-500/25",
  success: "bg-emerald-500/12 text-emerald-400 border-emerald-500/20",
  warning: "bg-amber-500/12 text-amber-400 border-amber-500/20",
  danger: "bg-red-500/12 text-red-400 border-red-500/20",
  info: "bg-blue-500/12 text-blue-400 border-blue-500/20",
};

const dotClasses = {
  default: "bg-white/50",
  gold: "bg-gold-400",
  success: "bg-emerald-400",
  warning: "bg-amber-400",
  danger: "bg-red-400",
  info: "bg-blue-400",
};

export default function Badge({ children, variant = "default", className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full border",
        variantClasses[variant],
        className
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotClasses[variant])} />
      )}
      {children}
    </span>
  );
}

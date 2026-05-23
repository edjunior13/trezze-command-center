import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, Minus, type LucideIcon } from "lucide-react";

interface StatCardProps {
  label: string;
  value: string;
  change?: number;
  description?: string;
  icon: LucideIcon;
  className?: string;
  gold?: boolean;
}

export default function StatCard({
  label,
  value,
  change,
  description,
  icon: Icon,
  className,
  gold,
}: StatCardProps) {
  const isPositive = change !== undefined && change > 0;
  const isNegative = change !== undefined && change < 0;

  return (
    <div
      className={cn(
        "rounded-xl border p-5 group card-lift",
        "bg-gradient-to-br from-navy-800/90 to-navy-900/90 backdrop-blur-sm",
        gold
          ? "border-gold-500/25 shadow-[0_4px_24px_rgba(2,8,20,0.6),0_0_0_1px_rgba(201,168,76,0.06)_inset]"
          : "border-white/06 shadow-card",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <div
          className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center",
            gold
              ? "bg-gold-500/15 text-gold-400"
              : "bg-white/06 text-white/50 group-hover:bg-white/10 group-hover:text-white/70 transition-colors duration-200"
          )}
        >
          <Icon size={18} />
        </div>

        {change !== undefined && (
          <div
            className={cn(
              "flex items-center gap-1 text-xs font-medium",
              isPositive && "text-emerald-400",
              isNegative && "text-red-400",
              !isPositive && !isNegative && "text-white/40"
            )}
          >
            {isPositive ? (
              <TrendingUp size={12} />
            ) : isNegative ? (
              <TrendingDown size={12} />
            ) : (
              <Minus size={12} />
            )}
            {Math.abs(change).toFixed(1)}%
          </div>
        )}
      </div>

      <p className="text-white/50 text-xs font-medium uppercase tracking-widest mb-1.5">
        {label}
      </p>
      <p
        className={cn(
          "text-2xl font-display font-semibold",
          gold ? "text-gold-400" : "text-white"
        )}
      >
        {value}
      </p>
      {description && (
        <p className="text-white/35 text-xs mt-1.5 font-body">{description}</p>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";

interface DividerProps {
  className?: string;
  gold?: boolean;
}

export default function Divider({ className, gold }: DividerProps) {
  if (gold) return <div className={cn("gold-divider my-4", className)} />;
  return <div className={cn("h-px bg-white/06 my-4", className)} />;
}

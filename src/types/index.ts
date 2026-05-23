import type { LucideIcon } from "lucide-react";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export interface MetricCard {
  label: string;
  value: string;
  change: number;
  trend: "up" | "down" | "neutral";
  icon: LucideIcon;
  description?: string;
}

export interface Client {
  id: string;
  name: string;
  sector: string;
  status: "active" | "paused" | "at-risk";
  since: string;
  lastActivity: string;
}

export interface AlertItem {
  id: string;
  title: string;
  source: string;
  severity: "critical" | "warning" | "info";
  time: string;
}

export interface Activity {
  id: string;
  action: string;
  user: string;
  time: string;
  type: "content" | "client" | "report" | "crisis" | "system";
}

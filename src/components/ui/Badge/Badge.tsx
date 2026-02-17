import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "primary" | "secondary" | "outline" | "success" | "warning" | "error";

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-neutral-100 text-neutral-800",
  primary: "bg-btfc-gold text-btfc-navy",
  secondary: "bg-btfc-navy text-white",
  outline: "border border-btfc-gold text-btfc-gold bg-transparent",
  success: "bg-green-100 text-green-800",
  warning: "bg-amber-100 text-amber-800",
  error: "bg-red-100 text-red-800",
};

export function Badge({ variant = "default", children, className }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

// Category-specific badges for news
const categoryColors: Record<string, BadgeVariant> = {
  "match-report": "primary",
  "club-news": "secondary",
  transfers: "warning",
  youth: "default",
  announcements: "error",
};

interface CategoryBadgeProps {
  category: string;
  className?: string;
}

export function CategoryBadge({ category, className }: CategoryBadgeProps) {
  const variant = categoryColors[category] || "default";
  const label = category.replace(/-/g, " ");

  return (
    <Badge variant={variant} className={className}>
      {label}
    </Badge>
  );
}

// Position badges for players
const positionColors: Record<string, string> = {
  goalkeeper: "bg-yellow-500 text-black",
  defender: "bg-blue-600 text-white",
  midfielder: "bg-green-600 text-white",
  forward: "bg-red-600 text-white",
};

interface PositionBadgeProps {
  position: string;
  className?: string;
}

export function PositionBadge({ position, className }: PositionBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded text-xs font-bold uppercase tracking-wider",
        positionColors[position] || "bg-neutral-500 text-white",
        className
      )}
    >
      {position}
    </span>
  );
}

// Match status badges
const statusStyles: Record<string, string> = {
  scheduled: "bg-blue-100 text-blue-800",
  live: "bg-red-500 text-white animate-pulse",
  halftime: "bg-orange-100 text-orange-800",
  fulltime: "bg-green-100 text-green-800",
  postponed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
};

interface StatusBadgeProps {
  status: string;
  className?: string;
}

export function StatusBadge({ status, className }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wider",
        statusStyles[status] || "bg-neutral-100 text-neutral-800",
        className
      )}
    >
      {status.replace("-", " ")}
    </span>
  );
}

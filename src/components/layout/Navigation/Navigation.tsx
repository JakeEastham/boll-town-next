"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavItem {
  label: string;
  href: string;
  children?: {
    label: string;
    href: string;
    external?: boolean;
  }[];
}

const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "Matches",
    href: "/matches",
    children: [
      { label: "Fixtures & Results", href: "/matches" },
      {
        label: "First Team (FA Full-Time)",
        href: "https://fulltime.thefa.com/displayTeam.html?divisionseason=793240729&teamID=312011849",
        external: true,
      },
    ],
  },
  { label: "News", href: "/news" },
  { label: "Club History", href: "/club-history" },
  { label: "Get Involved", href: "/get-involved" },
  { label: "Club Documents", href: "/club-documents" },
];

export function Navigation() {
  const pathname = usePathname();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="flex items-center gap-1">
      {navItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.children && setOpenDropdown(item.label)}
          onMouseLeave={() => setOpenDropdown(null)}
        >
          <Link
            href={item.href}
            className={cn(
              "flex items-center gap-1 px-4 py-2 text-sm font-medium tracking-wide uppercase transition-colors",
              isActive(item.href)
                ? "text-btfc-gold"
                : "text-white hover:text-btfc-gold"
            )}
          >
            {item.label}
            {item.children && (
              <ChevronDown
                className={cn(
                  "w-4 h-4 transition-transform",
                  openDropdown === item.label && "rotate-180"
                )}
              />
            )}
          </Link>

          {/* Dropdown */}
          {item.children && (
            <div
              className={cn(
                "absolute top-full left-0 min-w-[220px] py-2 bg-btfc-navy-dark rounded-lg shadow-xl border border-white/10 transition-all duration-200",
                openDropdown === item.label
                  ? "opacity-100 visible translate-y-0"
                  : "opacity-0 invisible -translate-y-2"
              )}
            >
              {item.children.map((child) => (
                <Link
                  key={child.label}
                  href={child.href}
                  target={child.external ? "_blank" : undefined}
                  rel={child.external ? "noopener noreferrer" : undefined}
                  className="flex items-center justify-between px-4 py-2.5 text-sm text-white/80 hover:text-btfc-gold hover:bg-white/5 transition-colors"
                >
                  {child.label}
                  {child.external && (
                    <ExternalLink className="w-3.5 h-3.5 opacity-50" />
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}

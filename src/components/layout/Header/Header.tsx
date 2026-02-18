"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Navigation } from "../Navigation/Navigation";
import { MobileMenu } from "../MobileMenu/MobileMenu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isMobileMenuOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          isScrolled || !isHomePage
            ? "bg-btfc-navy/95 backdrop-blur-md shadow-lg py-2"
            : "bg-transparent py-4"
        )}
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10 flex items-center gap-3">
            <div className={cn(
              "relative transition-all duration-300",
              isScrolled || !isHomePage ? "w-12 h-12" : "w-16 h-16"
            )}>
              <Image
                src="/images/logo.png"
                alt="Bollington Town FC"
                fill
                sizes="64px"
                className="object-contain"
                priority
              />
            </div>
            <div className={cn(
              "hidden sm:block transition-all duration-300",
              isScrolled || !isHomePage ? "opacity-0 w-0" : "opacity-100"
            )}>
              <span className="text-white font-display text-xl tracking-wide">
                Bollington Town FC
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:block">
            <Navigation />
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden relative z-10 p-2 text-white hover:text-btfc-gold transition-colors"
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMobileMenuOpen ? (
              <X className="w-8 h-8" />
            ) : (
              <Menu className="w-8 h-8" />
            )}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
}

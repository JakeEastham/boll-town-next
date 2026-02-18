import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

const footerLinks = {
  quickLinks: [
    { label: "Fixtures & Results", href: "/matches" },
    { label: "News", href: "/news" },
    { label: "Club Documents", href: "/club-documents" },
  ],
  getInvolved: [
    { label: "Play For Us", href: "/get-involved#play" },
    { label: "Volunteer", href: "/get-involved#volunteer" },
    { label: "Sponsorship", href: "/get-involved#sponsor" },
    { label: "Contact Us", href: "/get-involved#contact" },
  ],
};

const socialLinks = [
  {
    name: "Instagram",
    href: "https://instagram.com/bollingtontownfc",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://facebook.com/bollingtontownfc",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://twitter.com/bollingtontownfc",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
      </svg>
    ),
  },
];

export function Footer() {
  return (
    <footer className="bg-btfc-navy-dark text-white">
      {/* Main Footer */}
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo & Info */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-flex items-center gap-3 mb-6">
              <div className="relative w-16 h-16">
                <Image
                  src="/images/logo.png"
                  alt="Bollington Town FC"
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>
              <span className="font-display text-xl tracking-wide">
                Bollington Town FC
              </span>
            </Link>
            <p className="text-white/70 mb-6 max-w-sm">
              A community football club based in Bollington, Macclesfield, Cheshire.
              Established 2021, playing in the Cheshire Football League.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3 text-white/70">
                <MapPin className="w-5 h-5 shrink-0 mt-0.5" />
                <span>All Hallows Catholic College, Macclesfield, Cheshire</span>
              </div>
              <a
                href="mailto:secretary@bollingtontownfc.co.uk"
                className="flex items-center gap-3 text-white/70 hover:text-btfc-gold transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>secretary@bollingtontownfc.co.uk</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="flex gap-3 mt-6">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-btfc-gold hover:text-btfc-navy transition-colors"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-btfc-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Get Involved Links */}
          <div>
            <h3 className="font-display text-lg uppercase tracking-wider mb-4">
              Get Involved
            </h3>
            <ul className="space-y-2">
              {footerLinks.getInvolved.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-btfc-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="container py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-white/50 text-sm">
            &copy; {new Date().getFullYear()} Bollington Town FC. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-white/50 text-sm">
            <Link href="/club-documents" className="hover:text-btfc-gold transition-colors">
              Club Documents
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

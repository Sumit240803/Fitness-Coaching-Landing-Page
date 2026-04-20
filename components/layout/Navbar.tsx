"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import * as fbq from "@/lib/fbpixel";

const navLinks = [
  { label: "About", target: "about" },
  { label: "Results", target: "results" },
  { label: "Testimonials", target: "testimonials" },
];

function scrollTo(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? "bg-white/95 backdrop-blur-md border-b border-[#e8e8e8] shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/assets/logo.jpeg"
            alt="Coached by Shweta"
            width={565}
            height={373}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.target);
              }}
              className="text-sm font-medium text-[#2a2a2a] hover:text-[#111111] transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* CTA Button */}
          <a
            href="#apply"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("apply");
              setMenuOpen(false);
              fbq.event("InitiateCheckout", { content_name: "Navbar CTA" });
            }}
            className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
          >
            Apply Now
          </a>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="md:hidden p-2 rounded-xl hover:bg-[#f5f5f5] transition-colors"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <nav className="md:hidden bg-white border-t border-[#e8e8e8] px-6 pb-6 pt-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => {
                e.preventDefault();
                setMenuOpen(false);
                setTimeout(() => scrollTo(link.target), 100);
              }}
              className="block py-3 text-base font-medium text-[#1a1a1a] hover:text-[#111111] border-b border-[#f0f0f0] last:border-0 transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}

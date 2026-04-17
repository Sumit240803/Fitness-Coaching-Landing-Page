"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
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

        {/* Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a
            href="#about"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            About
          </a>
          <a
            href="#results"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("results")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            Results
          </a>
          <a
            href="#testimonials"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("testimonials")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="text-sm font-medium text-[#666666] hover:text-[#111111] transition-colors"
          >
            Testimonials
          </a>
        </nav>

        {/* CTA Button */}
        <a
          href="#apply"
          onClick={(e) => {
            e.preventDefault();
            document.getElementById("apply")?.scrollIntoView({ behavior: "smooth" });
          }}
          className="inline-flex items-center px-5 py-2.5 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#333333] transition-colors"
        >
          Apply Now
        </a>
      </div>
    </header>
  );
}

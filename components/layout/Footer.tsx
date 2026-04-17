import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#e8e8e8]">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <Image
          src="/assets/logo.jpeg"
          alt="Coached by Shweta"
          width={565}
          height={373}
          className="h-12 w-auto object-contain"
        />
        <a
          href="https://www.instagram.com/coachedbyshweta"
          target="_blank"
          rel="noopener noreferrer"
          className="font-script text-base text-[#666666] hover:text-[#111111] transition-colors"
        >
          @CoachedbyShweta
        </a>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <Link
            href="/privacy-policy"
            className="text-xs text-[#999999] hover:text-[#111111] transition-colors"
          >
            Privacy Policy
          </Link>
          <span className="hidden sm:inline text-[#e8e8e8]">|</span>
          <p className="text-xs text-[#999999]">
            &copy; {new Date().getFullYear()} Coached by Shweta. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

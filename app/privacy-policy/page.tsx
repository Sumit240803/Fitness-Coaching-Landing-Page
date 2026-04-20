import Link from "next/link";
import type { Metadata } from "next";
import PageViewTracker from "@/components/PageViewTracker";

export const metadata: Metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPolicy() {
  return (
    <main className="min-h-screen bg-white py-24 lg:py-32">
      <PageViewTracker contentName="Privacy Policy" contentCategory="Legal" />
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        <Link
          href="/"
          className="text-sm text-[#999999] hover:text-[#111111] transition-colors"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-heading text-4xl lg:text-5xl font-bold text-[#111111] mt-8 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-[#999999] mb-12">
          Last updated: {new Date().toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
        </p>

        <div className="prose prose-neutral max-w-none text-[#444444] space-y-8 text-base leading-relaxed">
          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] mb-3">
              1. Information We Collect
            </h2>
            <p>
              When you fill out the coaching application form on our website, we
              collect the following personal information:
            </p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Full name</li>
              <li>WhatsApp phone number</li>
              <li>Age, height, and weight</li>
              <li>Profession and daily routine</li>
              <li>Fitness goals and preferences</li>
              <li>Investment preference</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] mb-3">
              2. How We Use Your Information
            </h2>
            <p>Your personal information is used solely to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Review your coaching application</li>
              <li>Contact you via WhatsApp regarding your application</li>
              <li>Personalise your coaching program if you enroll</li>
            </ul>
            <p className="mt-2">
              We do <strong>not</strong> sell, rent, or share your personal
              information with any third parties for marketing purposes.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] mb-3">
              3. Data Storage & Security
            </h2>
            <p>
              Your data is stored securely using Google Firebase with
              industry-standard encryption. Access to your data is restricted to
              authorised personnel only.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] mb-3">
              4. Data Retention
            </h2>
            <p>
              We retain your application data for as long as necessary to
              process your application and provide our services. You may request
              deletion of your data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] mb-3">
              5. Your Rights
            </h2>
            <p>You have the right to:</p>
            <ul className="list-disc pl-6 space-y-1 mt-2">
              <li>Request access to your personal data</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Withdraw consent at any time</li>
            </ul>
          </section>

          <section>
            <h2 className="font-heading text-2xl font-semibold text-[#111111] mb-3">
              6. Contact Us
            </h2>
            <p>
              If you have any questions about this Privacy Policy, please reach
              out to us on Instagram at{" "}
              <a
                href="https://www.instagram.com/coachedbyshweta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#d4a8a4] hover:underline"
              >
                @CoachedbyShweta
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

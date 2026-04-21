export const FB_PIXEL_ID = "2131327440986867";

declare global {
  interface Window {
    fbq: (...args: unknown[]) => void;
  }
}

export function pageview() {
  window.fbq("track", "PageView");
}

export function event(name: string, options: Record<string, unknown> = {}) {
  window.fbq("track", name, options);
}

// ── Standard event helpers ──

/** User views a key page (landing, privacy policy, etc.) */
export function viewContent(contentName: string, contentCategory?: string) {
  window.fbq("track", "ViewContent", {
    content_name: contentName,
    ...(contentCategory && { content_category: contentCategory }),
  });
}

/** User clicks an "Apply Now" CTA */
export function initiateCheckout(contentName: string) {
  window.fbq("track", "InitiateCheckout", { content_name: contentName });
}

/** User submits the coaching application form */
export function submitApplication() {
  window.fbq("track", "SubmitApplication", {
    content_name: "Coaching Application",
    content_category: "1:1 Coaching",
  });
}

/** User submits info and may be contacted (form submission) */
export function lead() {
  window.fbq("track", "Lead", {
    content_name: "Application Form",
    content_category: "1:1 Coaching",
  });
}

/** User lands on the thank-you page after applying */
export function completeRegistration() {
  window.fbq("track", "CompleteRegistration", {
    content_name: "Application Submitted",
    status: true,
  });
}

/** User clicks a scheduling/Calendly link */
export function schedule(contentName: string) {
  window.fbq("track", "Schedule", { content_name: contentName });
}

/** User clicks a contact link (Instagram, WhatsApp, etc.) */
export function contact(method: string) {
  window.fbq("track", "Contact", { content_name: method });
}

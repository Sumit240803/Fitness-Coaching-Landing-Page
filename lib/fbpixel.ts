export const FB_PIXEL_ID = "4037908023019501";

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

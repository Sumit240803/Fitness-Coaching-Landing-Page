import { randomUUID } from "crypto";

const FB_PIXEL_ID = "1656013225576369";
const FB_API_VERSION = "v21.0";
const FB_API_URL = `https://graph.facebook.com/${FB_API_VERSION}/${FB_PIXEL_ID}/events`;

interface UserData {
  email?: string;
  phone?: string;
  firstName?: string;
  clientIpAddress?: string;
  clientUserAgent?: string;
}

interface EventParams {
  eventName: string;
  eventId?: string;
  userData: UserData;
  customData?: Record<string, unknown>;
  eventSourceUrl?: string;
}

async function hashSHA256(value: string): Promise<string> {
  const { createHash } = await import("crypto");
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

async function buildUserData(user: UserData) {
  const data: Record<string, string> = {};

  if (user.email) data.em = await hashSHA256(user.email);
  if (user.phone) {
    // Normalize: strip non-digits, ensure it's just digits
    const digits = user.phone.replace(/[^0-9]/g, "");
    if (digits) data.ph = await hashSHA256(digits);
  }
  if (user.firstName) data.fn = await hashSHA256(user.firstName.split(" ")[0]);
  if (user.clientIpAddress) data.client_ip_address = user.clientIpAddress;
  if (user.clientUserAgent) data.client_user_agent = user.clientUserAgent;

  return data;
}

export async function sendConversionEvent(params: EventParams) {
  const accessToken = process.env.FB_CONVERSIONS_API_TOKEN;
  if (!accessToken) {
    console.warn("FB Conversions API token not configured, skipping server event");
    return;
  }

  const eventId = params.eventId || randomUUID();
  const userData = await buildUserData(params.userData);

  const payload = {
    data: [
      {
        event_name: params.eventName,
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        event_source_url: params.eventSourceUrl || "https://coachedbyshweta.co",
        user_data: userData,
        ...(params.customData && { custom_data: params.customData }),
      },
    ],
  };

  try {
    const response = await fetch(`${FB_API_URL}?access_token=${accessToken}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("FB Conversions API error:", error);
    }
  } catch (err) {
    console.error("FB Conversions API request failed:", err);
  }
}

/** Fire Lead + SubmitApplication events for a form submission */
export async function trackFormSubmission(user: {
  email: string;
  phone: string;
  name: string;
}) {
  const eventId = randomUUID();
  const userData: UserData = {
    email: user.email,
    phone: user.phone,
    firstName: user.name,
  };

  await Promise.all([
    sendConversionEvent({
      eventName: "Lead",
      eventId: `lead_${eventId}`,
      userData,
      customData: {
        content_name: "Application Form",
        content_category: "1:1 Coaching",
      },
      eventSourceUrl: "https://coachedbyshweta.co/#apply",
    }),
    sendConversionEvent({
      eventName: "SubmitApplication",
      eventId: `submit_${eventId}`,
      userData,
      customData: {
        content_name: "Coaching Application",
        content_category: "1:1 Coaching",
      },
      eventSourceUrl: "https://coachedbyshweta.co/#apply",
    }),
    sendConversionEvent({
      eventName: "CompleteRegistration",
      eventId: `reg_${eventId}`,
      userData,
      customData: {
        content_name: "Application Submitted",
        status: true,
      },
      eventSourceUrl: "https://coachedbyshweta.co/thank-you",
    }),
  ]);

  return { leadEventId: `lead_${eventId}`, submitEventId: `submit_${eventId}`, regEventId: `reg_${eventId}` };
}

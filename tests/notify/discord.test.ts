import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import {
  sendIntakeToDiscord,
  sendBookingToDiscord,
  sendCareerToDiscord,
  sendWaitlistToDiscord,
} from "@/lib/notify/discord";

const WEBHOOK = "https://discord.com/api/webhooks/123/abc";

const intake = {
  type: "intake" as const,
  company: "Acme Corp",
  yourName: "Jane Founder",
  email: "jane@acme.com",
  basedIn: "Lisbon, Portugal",
  stage: "€5–50M" as const,
  bottleneck: "x".repeat(120),
  triedSoFar: "hired two agencies",
  whyNow: "board pressure to ship this quarter",
  budget: "Yes" as const,
  startWindow: "Within 30 days" as const,
  source: "LinkedIn",
  turnstileToken: "t",
};

const booking = {
  type: "booking" as const,
  fullName: "Marco Bianchi",
  email: "marco@bianchi.it",
  countryCode: "+39",
  whatsapp: "812345678",
  selectedDate: "2026-06-02",
  selectedTime: "14:00",
  timezone: "Europe/Rome",
  turnstileToken: "t",
};

const career = {
  type: "career" as const,
  fullName: "Ada Lovelace",
  email: "ada@analytical.engine",
  linkedin: "https://linkedin.com/in/ada",
  position: "AI Product Engineer" as const,
  portfolio: "https://ada.dev",
  basedIn: "London, UK",
  cvUrl: "https://x.supabase.co/cvs/ada.pdf",
  turnstileToken: "t",
};

const waitlist = {
  type: "waitlist" as const,
  email: "fan@example.com",
  sourceFeature: "Express Site" as const,
  turnstileToken: "t",
};

// Full submission details that should now be mirrored into the Discord message.
const DETAILS = [
  intake.company, intake.yourName, intake.email, intake.bottleneck, intake.whyNow, intake.budget,
  booking.fullName, booking.email, booking.whatsapp, booking.selectedDate, booking.timezone,
  career.fullName, career.email, career.position, career.linkedin, career.cvUrl,
  waitlist.email, waitlist.sourceFeature,
];

let fetchMock: ReturnType<typeof vi.fn>;

beforeEach(() => {
  fetchMock = vi.fn().mockResolvedValue({ ok: true, status: 204, statusText: "No Content" });
  vi.stubGlobal("fetch", fetchMock);
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});

describe("discord notifications", () => {
  it("posts an embed to the configured webhook for each form", async () => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", WEBHOOK);

    await sendIntakeToDiscord(intake);
    await sendBookingToDiscord(booking);
    await sendCareerToDiscord(career);
    await sendWaitlistToDiscord(waitlist);

    expect(fetchMock).toHaveBeenCalledTimes(4);
    for (const [url, init] of fetchMock.mock.calls) {
      expect(url).toBe(WEBHOOK);
      expect(init.method).toBe("POST");
      const body = JSON.parse(init.body as string);
      expect(Array.isArray(body.embeds)).toBe(true);
      expect(body.embeds[0].title).toBeTruthy();
    }
  });

  it("includes full submission details mirroring the email", async () => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", WEBHOOK);

    await sendIntakeToDiscord(intake);
    await sendBookingToDiscord(booking);
    await sendCareerToDiscord(career);
    await sendWaitlistToDiscord(waitlist);

    const allBodies = fetchMock.mock.calls.map(([, init]) => init.body as string).join("\n");
    for (const detail of DETAILS) {
      expect(allBodies).toContain(detail);
    }
  });

  it("no-ops (no fetch) when DISCORD_WEBHOOK_URL is unset", async () => {
    vi.stubEnv("DISCORD_WEBHOOK_URL", "");

    await sendIntakeToDiscord(intake);

    expect(fetchMock).not.toHaveBeenCalled();
  });
});

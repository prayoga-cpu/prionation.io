import type {
  IntakePayload,
  BookingPayload,
  CareerPayload,
  WaitlistPayload,
} from "@/lib/forms/types";

// Discord blurple — same accent used by the email templates.
const COLOR = 0x5865f2;

type DiscordField = { name: string; value: string; inline?: boolean };

type DiscordEmbed = {
  title: string;
  color: number;
  fields: DiscordField[];
  footer: { text: string };
  timestamp: string;
};

// Heads-up only: redacted, no PII. Full submission data goes to the team inbox
// via the email notification. No-ops silently when DISCORD_WEBHOOK_URL is unset
// (e.g. local dev), and throws on a failed POST so callers can log it.
async function postEmbed(embed: DiscordEmbed): Promise<void> {
  const url = process.env.DISCORD_WEBHOOK_URL;
  if (!url) return;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username: "PRIONATION.io", embeds: [embed] }),
  });

  if (!res.ok) {
    throw new Error(`Discord webhook failed: ${res.status} ${res.statusText}`);
  }
}

function embed(title: string, fields: DiscordField[]): DiscordEmbed {
  return {
    title,
    color: COLOR,
    fields,
    footer: { text: "Full details sent to the team inbox" },
    timestamp: new Date().toISOString(),
  };
}

export function sendIntakeToDiscord(p: IntakePayload) {
  return postEmbed(
    embed("🩺 New Diagnostic Intake", [
      { name: "Company", value: p.company, inline: true },
      { name: "Revenue Stage", value: p.stage, inline: true },
      { name: "Start Window", value: p.startWindow, inline: true },
    ]),
  );
}

export function sendBookingToDiscord(p: BookingPayload) {
  return postEmbed(
    embed("📅 New Booking Request", [
      { name: "Date", value: p.selectedDate, inline: true },
      { name: "Time", value: p.selectedTime, inline: true },
      { name: "Timezone", value: p.timezone, inline: true },
    ]),
  );
}

export function sendCareerToDiscord(p: CareerPayload) {
  return postEmbed(
    embed("💼 New Career Application", [
      { name: "Position", value: p.position, inline: true },
      { name: "Location", value: p.basedIn, inline: true },
    ]),
  );
}

export function sendWaitlistToDiscord(p: WaitlistPayload) {
  return postEmbed(
    embed("✨ New Waitlist Signup", [
      { name: "Feature", value: p.sourceFeature, inline: true },
    ]),
  );
}

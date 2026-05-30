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
  url?: string;
  description?: string;
  color: number;
  fields: DiscordField[];
  footer: { text: string };
  timestamp: string;
};

// Discord caps embed field values at 1024 chars and the description at 4096.
// Free-text form fields (bottleneck, whyNow) can be up to 2000 chars each, so
// trim long blocks to stay within the description budget. Full untruncated text
// always remains in the team email and Notion.
function truncate(text: string, max = 1200): string {
  return text.length > max ? `${text.slice(0, max - 1)}…` : text;
}

// Mirrors the team email notifications with full submission detail. No-ops
// silently when DISCORD_WEBHOOK_URL is unset (e.g. local dev), and throws on a
// failed POST so callers can log it.
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

function base(
  title: string,
  fields: DiscordField[],
  extra?: Partial<DiscordEmbed>,
): DiscordEmbed {
  return {
    title,
    color: COLOR,
    fields,
    footer: { text: "PRIONATION.io · internal notification" },
    timestamp: new Date().toISOString(),
    ...extra,
  };
}

export function sendIntakeToDiscord(p: IntakePayload) {
  const context = [
    `**Bottleneck**\n${truncate(p.bottleneck)}`,
    `**Why Now**\n${truncate(p.whyNow)}`,
    p.triedSoFar ? `**Tried So Far**\n${truncate(p.triedSoFar)}` : "",
  ]
    .filter(Boolean)
    .join("\n\n");

  return postEmbed(
    base(
      "🩺 New Diagnostic Intake",
      [
        { name: "Company", value: p.company, inline: true },
        { name: "Location", value: p.basedIn, inline: true },
        { name: "Contact", value: `${p.yourName} · ${p.email}` },
        { name: "Revenue Stage", value: p.stage, inline: true },
        { name: "Budget", value: p.budget, inline: true },
        { name: "Start Window", value: p.startWindow, inline: true },
        { name: "Source", value: p.source || "n/a", inline: true },
      ],
      {
        url: `https://notion.so/${process.env.NOTION_DB_INTAKE}`,
        description: context,
      },
    ),
  );
}

export function sendBookingToDiscord(p: BookingPayload) {
  return postEmbed(
    base(
      "📅 New Booking Request",
      [
        { name: "Name", value: p.fullName, inline: true },
        { name: "Email", value: p.email, inline: true },
        { name: "WhatsApp", value: `${p.countryCode}${p.whatsapp}`, inline: true },
        { name: "Date", value: p.selectedDate, inline: true },
        { name: "Time", value: p.selectedTime, inline: true },
        { name: "Timezone", value: p.timezone, inline: true },
      ],
      {
        description:
          "Confirm by replying to the email or messaging WhatsApp directly.",
      },
    ),
  );
}

export function sendCareerToDiscord(p: CareerPayload) {
  const fields: DiscordField[] = [
    { name: "Name", value: p.fullName, inline: true },
    { name: "Email", value: p.email, inline: true },
    { name: "Position", value: p.position, inline: true },
    { name: "Location", value: p.basedIn, inline: true },
    { name: "LinkedIn", value: `[${p.linkedin}](${p.linkedin})` },
  ];
  if (p.portfolio) {
    fields.push({ name: "Portfolio", value: `[${p.portfolio}](${p.portfolio})` });
  }
  fields.push({ name: "CV / Resume", value: `[Download CV](${p.cvUrl})` });

  return postEmbed(base("💼 New Career Application", fields));
}

export function sendWaitlistToDiscord(p: WaitlistPayload) {
  return postEmbed(
    base(
      "✨ New Waitlist Signup",
      [
        { name: "Email", value: p.email, inline: true },
        { name: "Feature", value: p.sourceFeature, inline: true },
      ],
      {
        description:
          "Notify manually on launch. Mark **Notified On Launch** in Notion once done.",
      },
    ),
  );
}

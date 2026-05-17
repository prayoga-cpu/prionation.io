import { resend, FROM, FROM_NOTIFY, REPLY_TO, TO } from "./resend";
import type {
  IntakePayload,
  BookingPayload,
  CareerPayload,
  WaitlistPayload,
} from "@/lib/forms/types";

// ─── design tokens (email-safe, all inline, no CSS vars) ──────────────────
const T = {
  bg: "#08090d",
  card: "#0c0d12",
  cardSoft: "#11131a",
  line: "#1c1d22",
  muted: "#73767d",
  soft: "#babbbe",
  white: "#ffffff",
  accent: "#5865f2",
  accentDim: "rgba(88,101,242,0.12)",
  accentBdr: "rgba(88,101,242,0.3)",
};

// ─── primitives ────────────────────────────────────────────────────────────

function eyebrow(label: string) {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
      <tr>
        <td>
          <span style="display:inline-block;padding:6px 12px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:999px;font-family:monospace;font-size:9px;letter-spacing:0.12em;color:${T.soft};text-transform:uppercase;">
            ● AI PRODUCT ENGINEERING
          </span>
        </td>
        <td align="right">
          <span style="display:inline-block;padding:5px 12px;background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:999px;font-family:monospace;font-size:9px;letter-spacing:0.12em;color:${T.accent};text-transform:uppercase;">${label}</span>
        </td>
      </tr>
    </table>`;
}

function brand() {
  return `
    <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
      <tr>
        <td>
          <h1 style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:28px;font-weight:800;letter-spacing:-0.02em;color:${T.white};line-height:1;">
            PRIONATION<span style="color:${T.accent};">.</span>io
          </h1>
          <p style="margin:6px 0 0;font-family:monospace;font-size:8px;letter-spacing:0.15em;color:${T.muted};text-transform:uppercase;">// INTERNAL NOTIFICATION · v.3.1.0</p>
        </td>
      </tr>
    </table>`;
}

function sectionHead(text: string) {
  return `
    <tr>
      <td colspan="2" style="padding:0 0 14px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:11px;font-weight:700;letter-spacing:0.08em;color:${T.white};text-transform:uppercase;">
          <span style="display:inline-block;width:6px;height:6px;border-radius:50%;background:${T.accent};margin-right:8px;vertical-align:middle;"></span>${text}
        </p>
      </td>
    </tr>`;
}

function field(label: string, value: string, accentValue = false) {
  return `
    <tr>
      <td style="padding:0 0 14px;vertical-align:top;width:140px;">
        <p style="margin:0;font-family:monospace;font-size:8px;letter-spacing:0.12em;color:${T.muted};text-transform:uppercase;white-space:nowrap;">${label}</p>
      </td>
      <td style="padding:0 0 14px;vertical-align:top;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;font-weight:500;color:${accentValue ? T.accent : T.white};word-break:break-word;">${value}</p>
      </td>
    </tr>`;
}

function blockField(label: string, value: string) {
  return `
    <tr>
      <td colspan="2" style="padding:0 0 16px;">
        <p style="margin:0 0 6px;font-family:monospace;font-size:8px;letter-spacing:0.12em;color:${T.muted};text-transform:uppercase;">${label}</p>
        <div style="background:${T.cardSoft};border:1px solid ${T.line};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};line-height:1.65;white-space:pre-wrap;">${value}</p>
        </div>
      </td>
    </tr>`;
}

function divider() {
  return `
    <tr>
      <td colspan="2" style="padding:4px 0 20px;">
        <div style="height:1px;background:${T.line};"></div>
      </td>
    </tr>`;
}

function ctaBtn(text: string, href: string) {
  return `
    <tr>
      <td colspan="2" style="padding:12px 0 0;" align="center">
        <a href="${href}" style="display:inline-block;padding:13px 28px;background:${T.accent};color:${T.white};border-radius:999px;font-family:'Rubik',system-ui,sans-serif;font-size:13px;font-weight:600;text-decoration:none;letter-spacing:0.01em;">${text} →</a>
      </td>
    </tr>`;
}

function footer() {
  return `
    <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;">
      <tr>
        <td style="border-top:1px solid ${T.line};padding-top:24px;text-align:center;">
          <p style="margin:0 0 10px;font-family:'Rubik',system-ui,sans-serif;font-style:italic;font-size:12px;color:${T.soft};">
            <em>Control over dependency.</em>
            <span style="color:${T.accent};margin:0 8px;">·</span>
            <em>Leverage over labor.</em>
            <span style="color:${T.accent};margin:0 8px;">·</span>
            <em>Systems over manual execution.</em>
          </p>
          <p style="margin:0;font-family:monospace;font-size:8px;letter-spacing:0.15em;color:${T.muted};text-transform:uppercase;">© 2026 PRIORITY FOUNDATION · MANAGED REMOTELY</p>
        </td>
      </tr>
    </table>`;
}

function shell(badge: string, cardRows: string) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&display=swap');
  body{margin:0;padding:0;background:${T.bg};}
  a{color:${T.accent};text-decoration:none;}
</style>
</head>
<body style="margin:0;padding:40px 20px;background:${T.bg};font-family:'Rubik',system-ui,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" border="0" style="max-width:600px;width:100%;">
        <tr><td>
          ${eyebrow(badge)}
          ${brand()}
          <!-- CARD -->
          <div style="background:${T.card};border:1px solid ${T.line};border-radius:16px;padding:28px 32px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              ${cardRows}
            </table>
          </div>
          ${footer()}
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;
}

// ─── plain-text fallback builder ───────────────────────────────────────────

function txt(lines: string[]) {
  return lines.join("\n");
}

// ─── 4 notification functions ──────────────────────────────────────────────

export async function sendIntakeNotification(p: IntakePayload) {
  const html = shell(
    "[INTAKE]",
    `
    ${sectionHead("Lead")}
    ${field("Company", p.company, true)}
    ${field("Contact", `${p.yourName} · ${p.email}`)}
    ${field("Location", p.basedIn)}
    ${divider()}
    ${sectionHead("Qualification")}
    ${field("Revenue Stage", p.stage)}
    ${field("Budget", p.budget)}
    ${field("Start Window", p.startWindow)}
    ${field("Source", p.source || "n/a")}
    ${divider()}
    ${sectionHead("Context")}
    ${blockField("Bottleneck", p.bottleneck)}
    ${blockField("Why Now", p.whyNow)}
    ${p.triedSoFar ? blockField("Tried So Far", p.triedSoFar) : ""}
    ${ctaBtn("Open in Notion", `https://notion.so/${process.env.NOTION_DB_INTAKE}`)}
  `,
  );

  return resend.emails.send({
    from: FROM_NOTIFY,
    to: TO,
    replyTo: REPLY_TO,
    subject: `[Intake] ${p.company}, ${p.stage}`,
    html,
    text: txt([
      "New diagnostic intake submission.",
      "",
      `Company: ${p.company}`,
      `Lead: ${p.yourName} <${p.email}>`,
      `Location: ${p.basedIn}`,
      `Revenue: ${p.stage}`,
      `Budget: ${p.budget}`,
      `Start: ${p.startWindow}`,
      "",
      "Bottleneck:",
      p.bottleneck,
      "",
      "Why now:",
      p.whyNow,
      "",
      `Tried so far: ${p.triedSoFar || "n/a"}`,
      `Source: ${p.source || "n/a"}`,
      "",
      `Open in Notion: https://notion.so/${process.env.NOTION_DB_INTAKE}`,
    ]),
  });
}

export async function sendBookingNotification(p: BookingPayload) {
  const html = shell(
    "[BOOKING]",
    `
    ${sectionHead("Request")}
    ${field("Name", p.fullName, true)}
    ${field("Email", p.email)}
    ${field("WhatsApp", `${p.countryCode}${p.whatsapp}`)}
    ${divider()}
    ${sectionHead("Session")}
    ${field("Date", p.selectedDate)}
    ${field("Time", p.selectedTime)}
    ${field("Timezone", p.timezone)}
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <div style="background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};">Action: confirm by replying to this email or messaging WhatsApp directly.</p>
        </div>
      </td>
    </tr>
  `,
  );

  return resend.emails.send({
    from: FROM_NOTIFY,
    to: TO,
    replyTo: REPLY_TO,
    subject: `[Booking] ${p.fullName}, ${p.selectedDate} ${p.selectedTime}`,
    html,
    text: txt([
      "New booking request.",
      "",
      `Name: ${p.fullName} <${p.email}>`,
      `WhatsApp: ${p.countryCode}${p.whatsapp}`,
      `When: ${p.selectedDate} at ${p.selectedTime} (${p.timezone})`,
      "",
      "Action: confirm by replying or messaging WhatsApp.",
    ]),
  });
}

export async function sendCareerNotification(p: CareerPayload) {
  const html = shell(
    "[CAREER]",
    `
    ${sectionHead("Applicant")}
    ${field("Name", p.fullName, true)}
    ${field("Email", p.email)}
    ${field("Position", p.position)}
    ${field("Location", p.basedIn)}
    ${divider()}
    ${sectionHead("Links")}
    ${field("LinkedIn", `<a href="${p.linkedin}" style="color:${T.accent};">${p.linkedin}</a>`)}
    ${p.portfolio ? field("Portfolio", `<a href="${p.portfolio}" style="color:${T.accent};">${p.portfolio}</a>`) : ""}
    ${field("CV / Resume", `<a href="${p.cvUrl}" style="color:${T.accent};">Download CV →</a>`)}
  `,
  );

  return resend.emails.send({
    from: FROM_NOTIFY,
    to: TO,
    replyTo: REPLY_TO,
    subject: `[Career] ${p.fullName}, ${p.position}`,
    html,
    text: txt([
      "New career application.",
      "",
      `Applicant: ${p.fullName} <${p.email}>`,
      `Position: ${p.position}`,
      `LinkedIn: ${p.linkedin}`,
      `Portfolio: ${p.portfolio || "n/a"}`,
      `Location: ${p.basedIn}`,
      `CV: ${p.cvUrl}`,
    ]),
  });
}

export async function sendWaitlistNotification(p: WaitlistPayload) {
  const html = shell(
    "[WAITLIST]",
    `
    ${sectionHead("Signup")}
    ${field("Email", p.email, true)}
    ${field("Feature", p.sourceFeature)}
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <div style="background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};">Notify manually on launch. Mark <strong style="color:${T.white};">Notified On Launch</strong> in Notion once done.</p>
        </div>
      </td>
    </tr>
  `,
  );

  return resend.emails.send({
    from: FROM_NOTIFY,
    to: TO,
    replyTo: REPLY_TO,
    subject: `[Waitlist] ${p.email}, ${p.sourceFeature}`,
    html,
    text: `${p.email} signed up for ${p.sourceFeature} waitlist.`,
  });
}

// ─── 4 submitter confirmation functions ────────────────────────────────────

export async function sendIntakeConfirmation(p: IntakePayload) {
  const html = shell(
    "[RECEIVED]",
    `
    ${sectionHead("Thank you")}
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:15px;color:${T.white};line-height:1.6;">
          Hi <strong>${p.yourName}</strong>, we've received your diagnostic submission for <strong style="color:${T.accent};">${p.company}</strong>.
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};line-height:1.7;">
          We review every submission personally. If there's a strong fit, you'll hear from us within <strong style="color:${T.white};">24 hours</strong>, directly from the founder, not a template.
        </p>
      </td>
    </tr>
    ${divider()}
    ${field("Submitted for", p.company)}
    ${field("Revenue stage", p.stage)}
    ${field("Start window", p.startWindow)}
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <div style="background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:12px;color:${T.muted};line-height:1.6;">Questions in the meantime? Reply to this email or reach us at <a href="mailto:consult@prionation.io" style="color:${T.accent};">consult@prionation.io</a></p>
        </div>
      </td>
    </tr>
  `,
  );

  return resend.emails.send({
    from: FROM,
    to: p.email,
    replyTo: REPLY_TO,
    subject: `We received your Diagnostic, PRIONATION.io`,
    headers: { 'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=Unsubscribe>` },
    html,
    text: txt([
      `Hi ${p.yourName},`,
      "",
      `We've received your diagnostic submission for ${p.company}.`,
      "",
      "We review every submission personally. If there's a strong fit, you'll hear from us within 24 hours, directly from the founder, not a template.",
      "",
      `Submitted for: ${p.company}`,
      `Revenue stage: ${p.stage}`,
      `Start window: ${p.startWindow}`,
      "",
      "Questions? Reply to this email or reach us at consult@prionation.io",
      "",
      "— PRIONATION.io",
    ]),
  });
}

export async function sendBookingConfirmation(p: BookingPayload) {
  const html = shell(
    "[CONFIRMED]",
    `
    ${sectionHead("Request received")}
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:15px;color:${T.white};line-height:1.6;">
          Hi <strong>${p.fullName}</strong>, your meeting request is in.
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};line-height:1.7;">
          We'll confirm your session shortly. If the time needs adjusting, we'll reach out via email or WhatsApp before the scheduled date.
        </p>
      </td>
    </tr>
    ${divider()}
    ${field("Date", p.selectedDate)}
    ${field("Time", `${p.selectedTime} (${p.timezone})`)}
    ${field("WhatsApp", `${p.countryCode}${p.whatsapp}`)}
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <div style="background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:12px;color:${T.muted};line-height:1.6;">Need to reschedule? Reply to this email or message us on WhatsApp at <strong style="color:${T.white};">${p.countryCode}${p.whatsapp}</strong></p>
        </div>
      </td>
    </tr>
  `,
  );

  return resend.emails.send({
    from: FROM,
    to: p.email,
    replyTo: REPLY_TO,
    subject: `Booking request received, ${p.selectedDate} ${p.selectedTime}`,
    headers: { 'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=Unsubscribe>` },
    html,
    text: txt([
      `Hi ${p.fullName},`,
      "",
      "Your meeting request is in.",
      "",
      `Date: ${p.selectedDate} at ${p.selectedTime} (${p.timezone})`,
      "",
      "We'll confirm your session shortly. If the time needs adjusting, we'll reach out via email or WhatsApp.",
      "",
      "— PRIONATION.io",
    ]),
  });
}

export async function sendCareerConfirmation(p: CareerPayload) {
  const html = shell(
    "[RECEIVED]",
    `
    ${sectionHead("Application received")}
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:15px;color:${T.white};line-height:1.6;">
          Hi <strong>${p.fullName}</strong>, we've received your application for <strong style="color:${T.accent};">${p.position}</strong>.
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};line-height:1.7;">
          We review every application personally, no ATS, no automated screening. If there's a strong fit, we'll reach out directly to set up a conversation.
        </p>
      </td>
    </tr>
    ${divider()}
    ${field("Position", p.position)}
    ${field("Location", p.basedIn)}
    ${field("LinkedIn", `<a href="${p.linkedin}" style="color:${T.accent};">${p.linkedin}</a>`)}
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <div style="background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:12px;color:${T.muted};line-height:1.6;">Questions? Reply to this email, it reaches the founding team directly.</p>
        </div>
      </td>
    </tr>
  `,
  );

  return resend.emails.send({
    from: FROM,
    to: p.email,
    replyTo: REPLY_TO,
    subject: `Application received, ${p.position} · PRIONATION.io`,
    headers: { 'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=Unsubscribe>` },
    html,
    text: txt([
      `Hi ${p.fullName},`,
      "",
      `We've received your application for ${p.position}.`,
      "",
      "We review every application personally, no ATS, no automated screening. If there's a strong fit, we'll reach out directly.",
      "",
      `Position: ${p.position}`,
      `Location: ${p.basedIn}`,
      "",
      "— PRIONATION.io",
    ]),
  });
}

export async function sendWaitlistConfirmation(p: WaitlistPayload) {
  const html = shell(
    "[WAITLISTED]",
    `
    ${sectionHead("You're in")}
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:15px;color:${T.white};line-height:1.6;">
          <strong>${p.email}</strong>, you're on the <strong style="color:${T.accent};">${p.sourceFeature}</strong> waitlist.
        </p>
      </td>
    </tr>
    <tr>
      <td colspan="2" style="padding:0 0 20px;">
        <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};line-height:1.7;">
          We'll notify you personally when it launches, no bulk blast, just a direct message when it's ready for you.
        </p>
      </td>
    </tr>
    ${divider()}
    ${field("Feature", p.sourceFeature)}
    <tr>
      <td colspan="2" style="padding:16px 0 0;">
        <div style="background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:10px;padding:14px 16px;">
          <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:12px;color:${T.muted};line-height:1.6;">Want to remove yourself from the list? Reply to this email and we'll take care of it.</p>
        </div>
      </td>
    </tr>
  `,
  );

  return resend.emails.send({
    from: FROM,
    to: p.email,
    replyTo: REPLY_TO,
    subject: `You're on the waitlist, ${p.sourceFeature} · PRIONATION.io`,
    headers: { 'List-Unsubscribe': `<mailto:${REPLY_TO}?subject=Unsubscribe>` },
    html,
    text: txt([
      `You're on the ${p.sourceFeature} waitlist.`,
      "",
      "We'll notify you personally when it launches, no bulk blast, just a direct message when it's ready.",
      "",
      "Want to remove yourself? Reply to this email.",
      "",
      "— PRIONATION.io",
    ]),
  });
}

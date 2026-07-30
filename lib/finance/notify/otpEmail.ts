import "server-only";
import { resend, FROM_NOTIFY, REPLY_TO } from "@/lib/notify/resend";
import { CURRENT_VERSION } from "@/lib/content/changelog";
import type { FinanceRole } from "@/lib/finance/auth/otp";

const T = {
  bg: "#08090d",
  card: "#0c0d12",
  line: "#1c1d22",
  muted: "#73767d",
  soft: "#babbbe",
  white: "#ffffff",
  accent: "#5865f2",
  accentDim: "rgba(88,101,242,0.12)",
  accentBdr: "rgba(88,101,242,0.3)",
};

export async function sendFinanceOtpEmail(
  role: FinanceRole,
  email: string,
  code: string,
) {
  const roleLabel = role === "ceo" ? "Founder & CEO" : "CRO";
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600;700;800&family=Press+Start+2P&display=swap');
  body{margin:0;padding:0;background:${T.bg};}
</style>
</head>
<body style="margin:0;padding:40px 20px;background:${T.bg};font-family:'Rubik',system-ui,sans-serif;-webkit-font-smoothing:antialiased;">
  <table width="100%" cellpadding="0" cellspacing="0" border="0">
    <tr><td align="center">
      <table width="480" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;width:100%;">
        <tr><td>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-bottom:24px;">
            <tr><td>
              <span style="display:inline-block;padding:6px 12px;background:${T.accentDim};border:1px solid ${T.accentBdr};border-radius:999px;font-family:monospace;font-size:9px;letter-spacing:0.12em;color:${T.accent};text-transform:uppercase;">FINANCE ACCESS · ${roleLabel}</span>
            </td></tr>
          </table>
          <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:28px;">
            <tr><td>
              <h1 style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:24px;font-weight:800;letter-spacing:-0.02em;color:${T.white};line-height:1;">PRIONATION<span style="color:${T.accent};">.</span>io</h1>
              <p style="margin:6px 0 0;font-family:monospace;font-size:8px;letter-spacing:0.15em;color:${T.muted};text-transform:uppercase;">// INTERNAL FINANCE DASHBOARD · v.${CURRENT_VERSION}</p>
            </td></tr>
          </table>
          <div style="background:${T.card};border:1px solid ${T.line};border-radius:16px;padding:32px 28px;text-align:center;">
            <p style="margin:0 0 18px;font-family:monospace;font-size:9px;letter-spacing:0.12em;color:${T.muted};text-transform:uppercase;">YOUR ACCESS CODE</p>
            <p style="margin:0 0 18px;font-family:'Press Start 2P','Courier New',monospace;font-size:32px;letter-spacing:0.25em;color:${T.white};">${code}</p>
            <div style="height:1px;background:${T.line};margin:0 0 18px;"></div>
            <p style="margin:0 0 8px;font-family:'Rubik',system-ui,sans-serif;font-size:13px;color:${T.soft};">Expires in 10 minutes.</p>
            <p style="margin:0;font-family:'Rubik',system-ui,sans-serif;font-size:12px;color:${T.muted};">If you didn't request this, someone has your address. Tell Darwin.</p>
          </div>
          <table cellpadding="0" cellspacing="0" border="0" width="100%" style="margin-top:28px;">
            <tr><td style="border-top:1px solid ${T.line};padding-top:20px;text-align:center;">
              <p style="margin:0;font-family:monospace;font-size:8px;letter-spacing:0.15em;color:${T.muted};text-transform:uppercase;">© 2026 PRIORITY FOUNDATION · v.${CURRENT_VERSION}</p>
            </td></tr>
          </table>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

  return resend.emails.send({
    from: FROM_NOTIFY,
    to: email,
    replyTo: REPLY_TO,
    subject: `${code} is your PRIONATION finance access code`,
    html,
    text: `Your PRIONATION finance access code: ${code}\nExpires in 10 minutes.\nIf you didn't request this, tell Darwin.`,
  });
}

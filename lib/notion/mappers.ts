import type { IntakePayload, BookingPayload, CareerPayload, WaitlistPayload } from '@/lib/forms/types';

// Combine the human self-reported source with auto-captured machine attribution
// into the existing "Referral Source" rich_text (no new Notion column needed, so
// the live intake sync can never break on a missing property). Format:
//   "<human source> · [auto] channel=organic; utm_source=google; ref=…; landing=/en"
function referralSourceText(p: IntakePayload): string {
  const human = (p.source ?? '').trim();
  const auto: string[] = [];
  if (p.channel) auto.push(`channel=${p.channel}`);
  if (p.utmSource) auto.push(`utm_source=${p.utmSource}`);
  if (p.utmMedium) auto.push(`utm_medium=${p.utmMedium}`);
  if (p.utmCampaign) auto.push(`utm_campaign=${p.utmCampaign}`);
  if (p.utmTerm) auto.push(`utm_term=${p.utmTerm}`);
  if (p.utmContent) auto.push(`utm_content=${p.utmContent}`);
  if (p.referrer) auto.push(`ref=${p.referrer}`);
  if (p.landingPath) auto.push(`landing=${p.landingPath}`);
  const machine = auto.length ? `[auto] ${auto.join('; ')}` : '';
  return [human, machine].filter(Boolean).join(' · ');
}

export function intakeToNotionProperties(p: IntakePayload) {
  return {
    'Company': { title: [{ text: { content: p.company } }] },
    'Lead Name': { rich_text: [{ text: { content: p.yourName } }] },
    'Email': { email: p.email },
    'Location': { rich_text: [{ text: { content: p.basedIn } }] },
    'Revenue Stage': { select: { name: p.stage } },
    'Bottleneck': { rich_text: [{ text: { content: p.bottleneck } }] },
    'Tried So Far': { rich_text: [{ text: { content: p.triedSoFar ?? '' } }] },
    'Why Now': { rich_text: [{ text: { content: p.whyNow } }] },
    'Budget Confirmed': { select: { name: p.budget } },
    'Start Window': { select: { name: p.startWindow } },
    'Referral Source': { rich_text: [{ text: { content: referralSourceText(p) } }] },
    'Sync Status': { select: { name: 'Pending' } },
  };
}

export function bookingToNotionProperties(p: BookingPayload) {
  return {
    'Full Name': { title: [{ text: { content: p.fullName } }] },
    'Email': { email: p.email },
    'WhatsApp': { phone_number: `${p.countryCode}${p.whatsapp}` },
    'Session Date': { date: { start: p.selectedDate } },
    'Session Time': { rich_text: [{ text: { content: p.selectedTime } }] },
    'Timezone': { rich_text: [{ text: { content: p.timezone } }] },
    'Status': { select: { name: 'New' } },
  };
}

export function careerToNotionProperties(p: CareerPayload) {
  return {
    'Applicant Name': { title: [{ text: { content: p.fullName } }] },
    'Email': { email: p.email },
    'LinkedIn': { url: p.linkedin },
    'Position': { select: { name: p.position } },
    'Portfolio': { url: p.portfolio ?? null },
    'Location': { rich_text: [{ text: { content: p.basedIn } }] },
    'CV/Resume': { url: p.cvUrl },
    'Status': { select: { name: 'New' } },
  };
}

export function waitlistToNotionProperties(p: WaitlistPayload) {
  return {
    'Email': { title: [{ text: { content: p.email } }] },
    'Status': { select: { name: 'Subscribed' } },
    'Source Feature': { select: { name: p.sourceFeature } },
    'Notified On Launch': { checkbox: false },
  };
}

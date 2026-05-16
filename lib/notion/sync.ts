import { notion } from './client';
import { DB } from './databases';
import type { IntakePayload } from '@/lib/forms/types';

export async function syncIntakeToSalesPipeline(
  payload: IntakePayload,
  intakePageId: string
): Promise<string> {
  const geography = inferGeography(payload.basedIn);

  const notes = [
    `Auto-synced from PN_Intake (${intakePageId}).`,
    `Why now: ${payload.whyNow}`,
    `Tried: ${payload.triedSoFar || 'n/a'}`,
    `Budget: ${payload.budget}`,
    `Start: ${payload.startWindow}`,
  ].join('\n');

  const page = await notion.pages.create({
    parent: { database_id: DB.SALES_PIPELINE },
    properties: {
      'Company': { title: [{ text: { content: payload.company } }] },
      'Contact': {
        rich_text: [{ text: { content: `${payload.yourName} · ${payload.email}` } }],
      },
      'Geography': { select: { name: geography } },
      'Stage': { select: { name: 'Prospect' } },
      'Bottleneck': { rich_text: [{ text: { content: payload.bottleneck } }] },
      'Source': { select: { name: 'Intake Form' } },
      'Notes': { rich_text: [{ text: { content: notes } }] },
    },
  });

  return `https://www.notion.so/${page.id.replace(/-/g, '')}`;
}

function inferGeography(location: string): 'EU' | 'ID' | 'Other' {
  const lower = location.toLowerCase();
  const idMarkers = ['indonesia', 'jakarta', 'bali', 'bandung', 'surabaya', 'tarakan'];
  const euMarkers = [
    'france', 'germany', 'netherlands', 'paris', 'berlin', 'amsterdam',
    'spain', 'italy', 'belgium', 'austria', 'portugal', 'sweden',
    'denmark', 'finland', 'poland', 'czech', 'ireland',
  ];
  if (idMarkers.some((m) => lower.includes(m))) return 'ID';
  if (euMarkers.some((m) => lower.includes(m))) return 'EU';
  return 'Other';
}

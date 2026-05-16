import type { IntakePayload } from './types';

export function evaluateDisqualification(p: IntakePayload): {
  disqualified: boolean;
  reason: string;
} {
  if (p.stage === '<€1M revenue' && p.budget === 'Not yet') {
    return {
      disqualified: true,
      reason:
        'Revenue stage and budget combination signal not-yet-ready buyer. Recommend manual review for soft-pass templated response.',
    };
  }

  if (p.bottleneck.trim().length < 100) {
    return {
      disqualified: true,
      reason: 'Bottleneck description below 100 characters. May not be a qualified buyer.',
    };
  }

  return { disqualified: false, reason: '' };
}

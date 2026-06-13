import type { ChangelogEntry } from "./types.js";

/**
 * Published dataset changes, oldest first. APPEND ONLY — never edit or reorder a
 * shipped entry. Corrections add a new entry with `supersedes`.
 *
 * Entry 1 is the baseline: it marks the dataset's first tracked state
 * (DATA_VERSION 2026.06) rather than describing one specific change. Every change
 * shipped from here on gets its own sequenced entry listing the exact areas it
 * touches and an accurate bilingual summary.
 */
export const changelog: ChangelogEntry[] = [
  {
    seq: 1,
    releasedAt: "2026-06-13",
    dataVersion: "2026.06",
    areaIds: [],
    type: "added",
    summary: {
      en: "Baseline: initial published accommodation-tax dataset (DATA_VERSION 2026.06).",
      ja: "ベースライン：宿泊税データセットの初回公開（DATA_VERSION 2026.06）。",
    },
    effectiveFrom: null,
    sources: [],
  },
];

/** Return entries with seq strictly greater than `sinceSeq`, ascending. */
export function getChangelogSince(sinceSeq: number): ChangelogEntry[] {
  return changelog.filter((e) => e.seq > sinceSeq);
}

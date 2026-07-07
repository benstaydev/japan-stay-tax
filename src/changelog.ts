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
  {
    seq: 2,
    releasedAt: "2026-07-08",
    dataVersion: "2026.07",
    areaIds: ["tokyo"],
    type: "revised",
    summary: {
      en: "Tokyo: from 2027-04-01 the accommodation tax becomes a flat 3% of the nightly charge (no cap); the exempt threshold rises from under ¥10,000 to under ¥13,000 per person per night; hostels and minpaku join the scope (Minister of Internal Affairs consent 2026-06-30).",
      ja: "東京都：2027年4月1日から宿泊税は宿泊料金の3％（上限なし）の定率制に。免税点は1人1泊10,000円未満から13,000円未満に引き上げ、簡易宿所・民泊も課税対象に追加（2026年6月30日総務大臣同意）。",
    },
    effectiveFrom: "2027-04-01",
    sources: [
      "https://www.metro.tokyo.lg.jp/information/press/2026/06/2026063004",
      "https://www.tax.metro.tokyo.lg.jp/kazei/leisure/shuk/shuk_minaoshi",
    ],
  },
];

/** Return entries with seq strictly greater than `sinceSeq`, ascending. */
export function getChangelogSince(sinceSeq: number): ChangelogEntry[] {
  return changelog.filter((e) => e.seq > sinceSeq);
}

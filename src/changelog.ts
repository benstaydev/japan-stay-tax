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
  {
    seq: 3,
    releasedAt: "2026-07-16",
    dataVersion: "2026.07",
    areaIds: ["tomakomai", "kitahiroshima", "wakkanai", "yamagata", "fujiyoshida", "fujikawaguchiko"],
    type: "added",
    summary: {
      en: "Six new municipal taxes (MIC consent 2026-06-30): Tomakomai 3% from 2027-04-01 and Kitahiroshima 3% from 2027-10-01 (each replacing the Hokkaido prefectural tiers there), Wakkanai flat ¥200 stacking on the prefectural tax from 2027-03-01, Yamagata City 3% from 2027-04-01 (prefecture's first), and Fujiyoshida + Fujikawaguchiko flat ¥200 from 2027-04-01 (Yamanashi's first).",
      ja: "2026年6月30日総務大臣同意の新税6件を追加：苫小牧市3％（2027年4月1日〜、道税は適用終了）・北広島市3％（2027年10月1日〜、同）・稚内市定額200円（2027年3月1日〜、道税と併課）・山形市3％（2027年4月1日〜、山形県初）・富士吉田市／富士河口湖町定額200円（2027年4月1日〜、山梨県初）。",
    },
    effectiveFrom: null,
    sources: ["https://www.soumu.go.jp/menu_news/s-news/01zeimu02_02000445.html"],
  },
];

/** Return entries with seq strictly greater than `sinceSeq`, ascending. */
export function getChangelogSince(sinceSeq: number): ChangelogEntry[] {
  return changelog.filter((e) => e.seq > sinceSeq);
}

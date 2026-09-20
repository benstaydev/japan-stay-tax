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
  {
    seq: 4,
    releasedAt: "2026-09-20",
    dataVersion: "2026.09",
    areaIds: ["nago", "unzen"],
    type: "added",
    summary: {
      en: "Two new municipal taxes: Nago City (Okinawa) 1.2% capped at ¥1,200, stacking on the prefecture's 0.8%/¥800, from 2027-02-01 (MIC consent 2026-06-30; the sixth Okinawa municipality with its own tax), and Unzen City (Nagasaki) ¥100 under ¥5,000 / ¥350 from ¥5,000 per person per night from 2027-04-01 (MIC consent 2026-08-28).",
      ja: "新税2件を追加：名護市（沖縄県）は2027年2月1日から市税1.2％（上限1,200円）を県税0.8％（上限800円）と併課（2026年6月30日総務大臣同意、県内6番目の市町村税）。雲仙市（長崎県）は2027年4月1日から1人1泊5,000円未満100円・5,000円以上350円（2026年8月28日総務大臣同意）。",
    },
    effectiveFrom: null,
    sources: [
      "https://www.soumu.go.jp/main_content/001080177.pdf",
      "https://www.soumu.go.jp/main_content/001088923.pdf",
      "https://www.city.unzen.nagasaki.jp/kiji0038529/index.html",
    ],
  },
  {
    seq: 5,
    releasedAt: "2026-09-20",
    dataVersion: "2026.09",
    areaIds: ["tomakomai", "kitahiroshima", "wakkanai", "yamagata", "fujiyoshida", "fujikawaguchiko"],
    type: "corrected",
    supersedes: 3,
    summary: {
      en: "Correction to seq 3 — rates and dates unchanged. The 2026-06-30 consent batch is MIC release 01zeimu02_02000463 (02000445 is the 2026-02-13 Okinawa batch); Kitahiroshima and Fujikawaguchiko source links updated. Tomakomai/Kitahiroshima wording corrected: the Hokkaido prefectural tiers remain in force there but are embedded in the 3% (city tax = 3% minus the prefectural amount, 道税控除方式), so the single 3% rule and the totals stand.",
      ja: "seq 3の訂正（税率・施行日に変更なし）。2026年6月30日同意分の総務省報道資料は01zeimu02_02000463（02000445は2026年2月13日の沖縄分）。北広島市・富士河口湖町の出典リンクを更新。苫小牧市・北広島市の説明を訂正：道税の定額区分は法的に存続するが3％に内包される（市税＝3％－道税額の道税控除方式）ため、単一の3％ルールと税額は従来どおり。",
    },
    effectiveFrom: null,
    sources: [
      "https://www.soumu.go.jp/menu_news/s-news/01zeimu02_02000463.html",
      "https://www.city.kitahiroshima.hokkaido.jp/hotnews/detail/00158839.html",
    ],
  },
  {
    seq: 6,
    releasedAt: "2026-09-20",
    dataVersion: "2026.09",
    areaIds: ["kutchan", "niseko"],
    type: "corrected",
    summary: {
      en: "Notes clarified, no rate or date change: in Kutchan, and in Niseko from 2026-11-01, the Hokkaido prefectural tiers legally still apply but the town tax is 3% minus the prefectural amount, collected as one 3% charge by the town. The dataset keeps a single 3% town rule, so the breakdown does not split out the prefectural share.",
      ja: "注記の明確化（税率・施行日に変更なし）：倶知安町、および2026年11月1日以降のニセコ町では道税の定額区分が法的に存続するが、町税＝3％－道税額として町が3％を一括徴収する。データは単一の3％町ルールを維持し、内訳は道税分を分離しない。",
    },
    effectiveFrom: null,
    sources: [
      "https://www.town.kutchan.hokkaido.jp/town_administration/AccommodationTax/3108/",
      "https://www.pref.hokkaido.lg.jp/kz/kkd/191976.html",
    ],
  },
];

/** Return entries with seq strictly greater than `sinceSeq`, ascending. */
export function getChangelogSince(sinceSeq: number): ChangelogEntry[] {
  return changelog.filter((e) => e.seq > sinceSeq);
}

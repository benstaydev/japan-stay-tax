import type { TaxArea } from "./types.js";

export const DATA_VERSION = "2026.06";
export const LAST_UPDATED = "2026-06-13";

export const taxAreas: TaxArea[] = [
  // ============================================================
  // TOKYO
  // ============================================================
  {
    id: "tokyo",
    name: { en: "Tokyo", ja: "東京都" },
    prefecture: { en: "Tokyo", ja: "東京都" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Tokyo Metropolitan Government", ja: "東京都" },
        effectiveFrom: "2002-10-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 9999, amount: 0 },
          { min: 10000, max: 14999, amount: 100 },
          { min: 15000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Revision ordinance passed 2026-03-27: switches to 3% rate-based (no cap), raises the exempt threshold to stays under 13,000 yen, and adds hostels/minpaku to the scope. NOT yet in effect — start date pending Minister of Internal Affairs consent, targeted within FY2027.",
    source: "https://www.tax.metro.tokyo.lg.jp/kazei/leisure/shuk",
  },

  // ============================================================
  // OSAKA
  // ============================================================
  {
    id: "osaka",
    name: { en: "Osaka", ja: "大阪府" },
    prefecture: { en: "Osaka", ja: "大阪府" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Osaka Prefecture", ja: "大阪府" },
        effectiveFrom: "2025-09-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 4999, amount: 0 },
          { min: 5000, max: 14999, amount: 200 },
          { min: 15000, max: 19999, amount: 400 },
          { min: 20000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes: "Rates revised September 2025. Previous rates were lower.",
    source:
      "https://www.pref.osaka.lg.jp/o050040/zei/alacarte/shukuhakuzei-kaisei.html",
  },

  // ============================================================
  // KYOTO
  // ============================================================
  {
    id: "kyoto",
    name: { en: "Kyoto", ja: "京都市" },
    prefecture: { en: "Kyoto", ja: "京都府" },
    level: "city",
    rules: [
      {
        authority: { en: "Kyoto City", ja: "京都市" },
        effectiveFrom: "2018-10-01",
        effectiveUntil: "2026-02-28",
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 500 },
          { min: 50000, max: null, amount: 1000 },
        ],
      },
      {
        authority: { en: "Kyoto City", ja: "京都市" },
        effectiveFrom: "2026-03-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 200 },
          { min: 6000, max: 19999, amount: 400 },
          { min: 20000, max: 49999, amount: 1000 },
          { min: 50000, max: 99999, amount: 4000 },
          { min: 100000, max: null, amount: 10000 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Revised March 2026 from 3 tiers to 5 tiers with higher rates. No exempt threshold — all guests pay at least 200 yen.",
    source: "https://www.city.kyoto.lg.jp/gyozai/page/0000345893.html",
  },

  // ============================================================
  // KANAZAWA
  // ============================================================
  {
    id: "kanazawa",
    name: { en: "Kanazawa", ja: "金沢市" },
    prefecture: { en: "Ishikawa", ja: "石川県" },
    level: "city",
    rules: [
      {
        authority: { en: "Kanazawa City", ja: "金沢市" },
        effectiveFrom: "2024-10-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 4999, amount: 0 },
          { min: 5000, max: 19999, amount: 200 },
          { min: 20000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: [],
    notes: "Revised October 2024. Added 5,000 yen exemption threshold.",
    source:
      "https://www4.city.kanazawa.lg.jp/soshikikarasagasu/shiminzeika/gyomuannai/1/4/26669.html",
  },

  // ============================================================
  // KUTCHAN (Niseko area)
  // ============================================================
  {
    id: "kutchan",
    name: { en: "Kutchan", ja: "倶知安町" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "town",
    rules: [
      {
        authority: { en: "Kutchan Town", ja: "倶知安町" },
        effectiveFrom: "2019-11-01",
        effectiveUntil: "2026-03-31",
        type: "percentage",
        rate: 0.02,
        cap: null,
      },
      {
        authority: { en: "Kutchan Town", ja: "倶知安町" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.03,
        cap: null,
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Percentage-based tax. Increased from 2% to 3% on 2026-04-01 (confirmed in effect). The 3% includes both town and Hokkaido prefecture portions, so the prefectural tax is not levied separately in Kutchan. Unlike all other municipalities, Kutchan allows the tax base to be per person (1人当たり), per room (1部屋当たり), or per building (1棟当たり), matching how the facility prices its accommodation. Pass the applicable unit price as ratePerNight.",
    source:
      "https://www.town.kutchan.hokkaido.jp/town_administration/AccommodationTax/",
  },

  // ============================================================
  // FUKUOKA CITY (dual tax: prefecture + city)
  // ============================================================
  {
    id: "fukuoka_city",
    name: { en: "Fukuoka City", ja: "福岡市" },
    prefecture: { en: "Fukuoka", ja: "福岡県" },
    level: "city",
    rules: [
      {
        authority: { en: "Fukuoka Prefecture", ja: "福岡県" },
        effectiveFrom: "2020-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 50 }],
      },
      {
        authority: { en: "Fukuoka City", ja: "福岡市" },
        effectiveFrom: "2020-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 150 },
          { min: 20000, max: null, amount: 450 },
        ],
      },
    ],
    exemptions: [],
    notes: "Dual tax: prefecture (50 yen flat) + city (150/450 yen by tier).",
    source:
      "https://www.city.fukuoka.lg.jp/zaisei/zeisei/life/syuku001.html",
  },

  // ============================================================
  // KITAKYUSHU (dual tax: prefecture + city)
  // ============================================================
  {
    id: "kitakyushu",
    name: { en: "Kitakyushu", ja: "北九州市" },
    prefecture: { en: "Fukuoka", ja: "福岡県" },
    level: "city",
    rules: [
      {
        authority: { en: "Fukuoka Prefecture", ja: "福岡県" },
        effectiveFrom: "2020-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 50 }],
      },
      {
        authority: { en: "Kitakyushu City", ja: "北九州市" },
        effectiveFrom: "2020-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 150 }],
      },
    ],
    exemptions: [],
    notes: "Dual tax: prefecture (50 yen) + city (150 yen) = 200 yen flat.",
    source:
      "https://www.city.kitakyushu.lg.jp/contents/08801084.html",
  },

  // ============================================================
  // FUKUOKA PREFECTURE (other areas outside Fukuoka City / Kitakyushu)
  // ============================================================
  {
    id: "fukuoka_other",
    name: { en: "Fukuoka Prefecture (other areas)", ja: "福岡県（その他地域）" },
    prefecture: { en: "Fukuoka", ja: "福岡県" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Fukuoka Prefecture", ja: "福岡県" },
        effectiveFrom: "2020-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: [],
    notes:
      "Areas in Fukuoka Prefecture outside Fukuoka City and Kitakyushu. Flat 200 yen prefecture tax only.",
    source: "https://www.pref.fukuoka.lg.jp/contents/syukuhakuzei.html",
  },

  // ============================================================
  // NAGASAKI
  // ============================================================
  {
    id: "nagasaki",
    name: { en: "Nagasaki", ja: "長崎市" },
    prefecture: { en: "Nagasaki", ja: "長崎県" },
    level: "city",
    rules: [
      {
        authority: { en: "Nagasaki City", ja: "長崎市" },
        effectiveFrom: "2023-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 9999, amount: 100 },
          { min: 10000, max: 19999, amount: 200 },
          { min: 20000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "A revision passed the city council 2026-03-12 (under ¥6,000 = 100 yen / ¥6,000-19,999 = 300 yen / ¥20,000+ = 500 yen) targeting 2027-04-01, but the start date is not yet fixed (pending Minister of Internal Affairs consent). Current rates remain in effect.",
    source: "https://www.city.nagasaki.lg.jp/page/5301.html",
  },

  // ============================================================
  // NISEKO TOWN
  // ============================================================
  {
    id: "niseko",
    name: { en: "Niseko", ja: "ニセコ町" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "town",
    rules: [
      {
        authority: { en: "Niseko Town", ja: "ニセコ町" },
        effectiveFrom: "2024-11-01",
        effectiveUntil: "2026-10-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5000, amount: 100 },
          { min: 5001, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 500 },
          { min: 50000, max: 99999, amount: 1000 },
          { min: 100000, max: null, amount: 2000 },
        ],
      },
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: "2026-10-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Niseko Town", ja: "ニセコ町" },
        effectiveFrom: "2026-11-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.03,
        cap: null,
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Town tier boundary is exactly ¥5,000 inclusive (5,001 starts the ¥200 tier). From 2026-04-01 to 2026-10-31 the Hokkaido prefecture tax stacks on top of the town tiers (combined 200/300/700/1,500/2,500). From 2026-11-01 (enacted, ministerial consent 2026-03-27) Niseko switches to a flat 3% of the per-person room rate with no floor or cap; like Kutchan, the 3% includes the Hokkaido prefecture share, which is no longer levied separately.",
    source: "https://www.town.niseko.lg.jp/kurashi/tax/syukuhakuzei",
  },

  // ============================================================
  // TOKONAME
  // ============================================================
  {
    id: "tokoname",
    name: { en: "Tokoname", ja: "常滑市" },
    prefecture: { en: "Aichi", ja: "愛知県" },
    level: "city",
    rules: [
      {
        authority: { en: "Tokoname City", ja: "常滑市" },
        effectiveFrom: "2025-01-06",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: [],
    notes: null,
    source:
      "https://www.city.tokoname.aichi.jp/kurashi/zeikin/1007444/1007785.html",
  },

  // ============================================================
  // ATAMI
  // ============================================================
  {
    id: "atami",
    name: { en: "Atami", ja: "熱海市" },
    prefecture: { en: "Shizuoka", ja: "静岡県" },
    level: "city",
    rules: [
      {
        authority: { en: "Atami City", ja: "熱海市" },
        effectiveFrom: "2025-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips", "children_under_12", "disaster_evacuees"],
    notes: null,
    source:
      "https://www.city.atami.lg.jp/kurashi/zeikin/1015193/1015196.html",
  },

  // ============================================================
  // TAKAYAMA
  // ============================================================
  {
    id: "takayama",
    name: { en: "Takayama", ja: "高山市" },
    prefecture: { en: "Gifu", ja: "岐阜県" },
    level: "city",
    rules: [
      {
        authority: { en: "Takayama City", ja: "高山市" },
        effectiveFrom: "2025-10-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 9999, amount: 100 },
          { min: 10000, max: 29999, amount: 200 },
          { min: 30000, max: null, amount: 300 },
        ],
      },
    ],
    exemptions: ["school_trips", "children_under_12"],
    notes: null,
    source:
      "https://www.city.takayama.lg.jp/shisei/1000061/1022608/1022609.html",
  },

  // ============================================================
  // GERO
  // ============================================================
  {
    id: "gero",
    name: { en: "Gero", ja: "下呂市" },
    prefecture: { en: "Gifu", ja: "岐阜県" },
    level: "city",
    rules: [
      {
        authority: { en: "Gero City", ja: "下呂市" },
        effectiveFrom: "2025-10-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 4999, amount: 100 },
          { min: 5000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips", "children_under_12"],
    notes: null,
    source: "https://www.city.gero.lg.jp/soshiki/5/31593.html",
  },

  // ============================================================
  // MATSUE
  // ============================================================
  {
    id: "matsue",
    name: { en: "Matsue", ja: "松江市" },
    prefecture: { en: "Shimane", ja: "島根県" },
    level: "city",
    rules: [
      {
        authority: { en: "Matsue City", ja: "松江市" },
        effectiveFrom: "2025-12-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 4999, amount: 0 },
          { min: 5000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes: null,
    source:
      "https://www.city.matsue.lg.jp/kurashi_tetsuzuki/zeikin/shukuhakuzei/22627.html",
  },

  // ============================================================
  // HIROSAKI
  // ============================================================
  {
    id: "hirosaki",
    name: { en: "Hirosaki", ja: "弘前市" },
    prefecture: { en: "Aomori", ja: "青森県" },
    level: "city",
    rules: [
      {
        authority: { en: "Hirosaki City", ja: "弘前市" },
        effectiveFrom: "2025-12-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes: null,
    source:
      "https://city.hirosaki.aomori.jp/kurashi/zeikin/syukuhakuzeinogaiyou.html",
  },

  // ============================================================
  // SENDAI (dual tax: Miyagi Prefecture + Sendai City)
  // ============================================================
  {
    id: "sendai",
    name: { en: "Sendai", ja: "仙台市" },
    prefecture: { en: "Miyagi", ja: "宮城県" },
    level: "city",
    rules: [
      {
        authority: { en: "Miyagi Prefecture", ja: "宮城県" },
        effectiveFrom: "2026-01-13",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Sendai City", ja: "仙台市" },
        effectiveFrom: "2026-01-13",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Dual tax: Miyagi Prefecture (100 yen) + Sendai City (200 yen) = 300 yen for stays 6,000+ yen.",
    source: "https://www.pref.miyagi.jp/site/shukuhakuzei/index.html",
  },

  // ============================================================
  // MIYAGI PREFECTURE (areas outside Sendai)
  // ============================================================
  {
    id: "miyagi_other",
    name: {
      en: "Miyagi Prefecture (outside Sendai)",
      ja: "宮城県（仙台市以外）",
    },
    prefecture: { en: "Miyagi", ja: "宮城県" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Miyagi Prefecture", ja: "宮城県" },
        effectiveFrom: "2026-01-13",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 300 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes: "Areas in Miyagi Prefecture outside Sendai City.",
    source: "https://www.pref.miyagi.jp/site/shukuhakuzei/index.html",
  },

  // ============================================================
  // HIROSHIMA PREFECTURE (launching April 2026)
  // ============================================================
  {
    id: "hiroshima",
    name: { en: "Hiroshima Prefecture", ja: "広島県" },
    prefecture: { en: "Hiroshima", ja: "広島県" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Hiroshima Prefecture", ja: "広島県" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes: null,
    source:
      "https://www.pref.hiroshima.lg.jp/site/zei/hiroshima-syukuhakuzei00.html",
  },

  // ============================================================
  // HOKKAIDO PREFECTURE (launching April 2026) - for areas without own city tax
  // ============================================================
  {
    id: "hokkaido_other",
    name: {
      en: "Hokkaido (other areas)",
      ja: "北海道（その他地域）",
    },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Hokkaido prefecture tax for areas without their own municipal accommodation tax. 18 municipalities levy their own tax on top of the prefectural tax — use their dedicated area entries. In Kutchan (and Niseko from 2026-11-01) the prefectural share is embedded in the municipal 3% and not levied separately. No exemption floor.",
    source: "https://www.pref.hokkaido.lg.jp/kz/kkd/191976.html",
  },

  // ============================================================
  // SAPPORO (Hokkaido pref + city, launching April 2026)
  // ============================================================
  {
    id: "sapporo",
    name: { en: "Sapporo", ja: "札幌市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Sapporo City", ja: "札幌市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 1,000 yen.",
    source: "https://www.city.sapporo.jp/citytax/shukuhakuzei/index.html",
  },

  // ============================================================
  // HAKODATE (Hokkaido pref + city, launching April 2026)
  // ============================================================
  {
    id: "hakodate",
    name: { en: "Hakodate", ja: "函館市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Hakodate City", ja: "函館市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: 99999, amount: 500 },
          { min: 100000, max: null, amount: 2000 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Combined: under 20k = 200 yen, 20-50k = 400 yen, 50-100k = 1,000 yen, 100k+ = 2,500 yen.",
    source: "https://www.pref.hokkaido.lg.jp/kz/kkd/191976.html",
  },

  // ============================================================
  // OTARU (Hokkaido pref + city, launching April 2026)
  // ============================================================
  {
    id: "otaru",
    name: { en: "Otaru", ja: "小樽市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Otaru City", ja: "小樽市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes: "Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source: "https://www.pref.hokkaido.lg.jp/kz/kkd/191976.html",
  },

  // ============================================================
  // FURANO (Hokkaido pref + city, launching April 2026)
  // ============================================================
  {
    id: "furano",
    name: { en: "Furano", ja: "富良野市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Furano City", ja: "富良野市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 300 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Combined: under 20k = 300 yen, 20-50k = 500 yen, 50k+ = 1,000 yen.",
    source: "https://www.pref.hokkaido.lg.jp/kz/kkd/191976.html",
  },

  // ============================================================
  // AKAIGAWA (Kiroro area, Hokkaido — village tax since Nov 2025)
  // ============================================================
  {
    id: "akaigawa",
    name: { en: "Akaigawa", ja: "赤井川村" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "village",
    rules: [
      {
        authority: { en: "Akaigawa Village", ja: "赤井川村" },
        effectiveFrom: "2025-11-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 7999, amount: 0 },
          { min: 8000, max: 19999, amount: 200 },
          { min: 20000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Kiroro resort area. Village tax in effect since 2025-11-01 with an ¥8,000 exemption floor (village portion only — the prefectural tax still applies below ¥8,000 from April 2026). Combined from April 2026: under 8k = 100, 8k-19,999 = 300, 20-50k = 700, 50k+ = 1,000 yen.",
    source:
      "https://www.akaigawa.com/%E5%AE%BF%E6%B3%8A%E7%A8%8E%E3%81%AB%E3%81%A4%E3%81%84%E3%81%A6/",
  },

  // ============================================================
  // RUSUTSU (Hokkaido pref + village, from April 2026)
  // ============================================================
  {
    id: "rusutsu",
    name: { en: "Rusutsu", ja: "留寿都村" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "village",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Rusutsu Village", ja: "留寿都村" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes: "Combined: under 20k = 200 yen, 20-50k = 400 yen, 50k+ = 1,000 yen.",
    source: "https://www.vill.rusutsu.lg.jp/hotnews/detail/00004263.html",
  },

  // ============================================================
  // TOYAKO (Hokkaido pref + town, from April 2026)
  // ============================================================
  {
    id: "toyako",
    name: { en: "Toyako", ja: "洞爺湖町" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "town",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Toyako Town", ja: "洞爺湖町" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 500 },
          { min: 50000, max: null, amount: 1000 },
        ],
      },
    ],
    exemptions: ["school_trips", "children_under_12"],
    notes:
      "Combined: under 20k = 300 yen, 20-50k = 700 yen, 50k+ = 1,500 yen. Children through elementary school are exempt (broader than most Hokkaido municipalities). The bathing tax (入湯税) was cut to 100 yen at the same time.",
    source:
      "http://www.town.toyako.lg.jp/town_guide/tax_insurance_pension/tax/syukuhakuzei/",
  },

  // ============================================================
  // ASAHIKAWA (Hokkaido pref + city, from April 2026)
  // ============================================================
  {
    id: "asahikawa",
    name: { en: "Asahikawa", ja: "旭川市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Asahikawa City", ja: "旭川市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "City portion is a flat 200 yen with no exemption floor. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source:
      "https://www.city.asahikawa.hokkaido.jp/kurashi/112/113/1145/d081760.html",
  },

  // ============================================================
  // SHIMUKAPPU (Tomamu area, Hokkaido pref + village, from April 2026)
  // ============================================================
  {
    id: "shimukappu",
    name: { en: "Shimukappu", ja: "占冠村" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "village",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Shimukappu Village", ja: "占冠村" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Tomamu resort area. Combined: under 20k = 200 yen, 20-50k = 400 yen, 50k+ = 1,000 yen.",
    source:
      "https://www.vill.shimukappu.lg.jp/shimukappu/section/kikaku/dnoqph0000000l0u.html",
  },

  // ============================================================
  // KITAMI (Hokkaido pref + city, from April 2026)
  // ============================================================
  {
    id: "kitami",
    name: { en: "Kitami", ja: "北見市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Kitami City", ja: "北見市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "City portion is a flat 200 yen. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source:
      "https://www.city.kitami.lg.jp/administration/life/detail.php?content=13525",
  },

  // ============================================================
  // ABASHIRI (Hokkaido pref + city, from April 2026)
  // ============================================================
  {
    id: "abashiri",
    name: { en: "Abashiri", ja: "網走市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Abashiri City", ja: "網走市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "City portion is a flat 200 yen. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source: "https://www.city.abashiri.hokkaido.jp/soshiki/7/17782.html",
  },

  // ============================================================
  // KOSHIMIZU (Hokkaido pref + town, from April 2026)
  // ============================================================
  {
    id: "koshimizu",
    name: { en: "Koshimizu", ja: "小清水町" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "town",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Koshimizu Town", ja: "小清水町" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Town portion is a flat 200 yen. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source: "https://www.town.koshimizu.hokkaido.jp/hotnews/detail/00010695.html",
  },

  // ============================================================
  // OBIHIRO (Hokkaido pref + city, from April 2026)
  // ============================================================
  {
    id: "obihiro",
    name: { en: "Obihiro", ja: "帯広市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Obihiro City", ja: "帯広市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "City portion is a flat 200 yen. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source:
      "https://www.city.obihiro.hokkaido.jp/kurashi/zeikin/1019186/1020958.html",
  },

  // ============================================================
  // OTOFUKE (Tokachigawa Onsen, Hokkaido pref + town, from April 2026)
  // ============================================================
  {
    id: "otofuke",
    name: { en: "Otofuke", ja: "音更町" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "town",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Otofuke Town", ja: "音更町" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Tokachigawa Onsen area. Town portion is a flat 200 yen. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source:
      "https://www.town.otofuke.hokkaido.jp/kurashi/zei/shozei/shukuhakuzei.html",
  },

  // ============================================================
  // SHINTOKU (Sahoro area, Hokkaido pref + town, from April 2026)
  // ============================================================
  {
    id: "shintoku",
    name: { en: "Shintoku", ja: "新得町" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "town",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Shintoku Town", ja: "新得町" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 4999, amount: 50 },
          { min: 5000, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Sahoro resort area. Unusual 4-tier town schedule including a 50 yen tier. Combined: under 5k = 150 yen, 5k-19,999 = 200 yen, 20-50k = 400 yen, 50k+ = 1,000 yen.",
    source: "https://www.shintoku-town.jp/kurashi-tetuduki/zeikin/syukuhakuzei/",
  },

  // ============================================================
  // KUSHIRO (Hokkaido pref + city, from April 2026)
  // ============================================================
  {
    id: "kushiro",
    name: { en: "Kushiro", ja: "釧路市" },
    prefecture: { en: "Hokkaido", ja: "北海道" },
    level: "city",
    rules: [
      {
        authority: { en: "Hokkaido Prefecture", ja: "北海道" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 200 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
      {
        authority: { en: "Kushiro City", ja: "釧路市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "City portion is a flat 200 yen with no exemption floor. Combined: under 20k = 300 yen, 20-50k = 400 yen, 50k+ = 700 yen.",
    source:
      "https://www.city.kushiro.lg.jp/kurashi/zeikin/1010710/1016119.html",
  },

  // ============================================================
  // TOBA (launching April 2026)
  // ============================================================
  {
    id: "toba",
    name: { en: "Toba", ja: "鳥羽市" },
    prefecture: { en: "Mie", ja: "三重県" },
    level: "city",
    rules: [
      {
        authority: { en: "Toba City", ja: "鳥羽市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: [],
    notes: null,
    source:
      "https://www.city.toba.mie.jp/soshiki/shiminzei/gyomu/zeikin/syukuhakuzei/index.html",
  },

  // ============================================================
  // GIFU CITY (launching April 2026)
  // ============================================================
  {
    id: "gifu",
    name: { en: "Gifu", ja: "岐阜市" },
    prefecture: { en: "Gifu", ja: "岐阜県" },
    level: "city",
    rules: [
      {
        authority: { en: "Gifu City", ja: "岐阜市" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: ["school_trips", "children_under_12"],
    notes: null,
    source:
      "https://www.city.gifu.lg.jp/kurashi/zeikin/1034237/1034238.html",
  },

  // ============================================================
  // YUGAWARA (launching April 2026)
  // ============================================================
  {
    id: "yugawara",
    name: { en: "Yugawara", ja: "湯河原町" },
    prefecture: { en: "Kanagawa", ja: "神奈川県" },
    level: "town",
    rules: [
      {
        authority: { en: "Yugawara Town", ja: "湯河原町" },
        effectiveFrom: "2026-04-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 49999, amount: 300 },
          { min: 50000, max: null, amount: 500 },
        ],
      },
    ],
    exemptions: ["school_trips", "children_under_12"],
    notes: null,
    source: "https://www.town.yugawara.kanagawa.jp/site/shukuhakuzei/26707.html",
  },

  // ============================================================
  // NAGANO PREFECTURE (other areas, from June 2026)
  // ============================================================
  {
    id: "nagano_other",
    name: {
      en: "Nagano Prefecture (other areas)",
      ja: "長野県（その他地域）",
    },
    prefecture: { en: "Nagano", ja: "長野県" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 200 },
        ],
      },
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 300 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Introductory 200 yen for the first 3 years (2026-06-01 to 2029-05-31), then 300 yen. Stays under 6,000 yen (room-only, pre-tax) are exempt. Matsumoto, Karuizawa, Achi, Hakuba and Nozawaonsen levy their own municipal tax with a reduced prefectural portion — use their dedicated entries.",
    source: "https://www.pref.nagano.lg.jp/kankoki/syukuhakuzei/zei_gaiyou.html",
  },

  // ============================================================
  // MATSUMOTO (Nagano pref + city, from June 2026)
  // ============================================================
  {
    id: "matsumoto",
    name: { en: "Matsumoto", ja: "松本市" },
    prefecture: { en: "Nagano", ja: "長野県" },
    level: "city",
    rules: [
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 150 },
        ],
      },
      {
        authority: { en: "Matsumoto City", ja: "松本市" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Matsumoto City", ja: "松本市" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 150 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Combined 200 yen (city 100 + prefecture 100) for the first 3 years, then 300 yen (150 + 150) from 2029-06-01. Stays under 6,000 yen exempt.",
    source: "https://www.city.matsumoto.nagano.jp/soshiki/14/194906.html",
  },

  // ============================================================
  // KARUIZAWA (Nagano pref + town, from June 2026)
  // ============================================================
  {
    id: "karuizawa",
    name: { en: "Karuizawa", ja: "軽井沢町" },
    prefecture: { en: "Nagano", ja: "長野県" },
    level: "town",
    rules: [
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 150 },
        ],
      },
      {
        authority: { en: "Karuizawa Town", ja: "軽井沢町" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: 9999, amount: 100 },
          { min: 10000, max: 99999, amount: 150 },
          { min: 100000, max: null, amount: 600 },
        ],
      },
      {
        authority: { en: "Karuizawa Town", ja: "軽井沢町" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: 9999, amount: 150 },
          { min: 10000, max: 99999, amount: 200 },
          { min: 100000, max: null, amount: 650 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Combined (town + prefecture), first 3 years: 6,000-9,999 = 200 yen, 10,000-99,999 = 250 yen, 100,000+ = 700 yen. From 2029-06-01: 300 / 350 / 800 yen. Stays under 6,000 yen exempt.",
    source: "https://www.town.karuizawa.lg.jp/site/syukuhakuzei/17149.html",
  },

  // ============================================================
  // ACHI (Nagano pref + village, from June 2026)
  // ============================================================
  {
    id: "achi",
    name: { en: "Achi", ja: "阿智村" },
    prefecture: { en: "Nagano", ja: "長野県" },
    level: "village",
    rules: [
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 150 },
        ],
      },
      {
        authority: { en: "Achi Village", ja: "阿智村" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 200 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Hirugami Onsen area. Combined 300 yen (village 200 + prefecture 100) for the first 3 years, then 350 yen (200 + 150) from 2029-06-01. Stays under 6,000 yen exempt.",
    source: "https://www.vill.achi.lg.jp/site/syukuhakuzei/",
  },

  // ============================================================
  // HAKUBA (Nagano pref + village, from June 2026)
  // ============================================================
  {
    id: "hakuba",
    name: { en: "Hakuba", ja: "白馬村" },
    prefecture: { en: "Nagano", ja: "長野県" },
    level: "village",
    rules: [
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 150 },
        ],
      },
      {
        authority: { en: "Hakuba Village", ja: "白馬村" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: 19999, amount: 100 },
          { min: 20000, max: 49999, amount: 300 },
          { min: 50000, max: 99999, amount: 800 },
          { min: 100000, max: null, amount: 1800 },
        ],
      },
      {
        authority: { en: "Hakuba Village", ja: "白馬村" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: 19999, amount: 150 },
          { min: 20000, max: 49999, amount: 350 },
          { min: 50000, max: 99999, amount: 850 },
          { min: 100000, max: null, amount: 1850 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Combined totals (as published by the village, incl. the stated prefecture portion of 100 yen, 150 from 2029-06-01), first 3 years: 6,000-19,999 = 200 yen, 20-50k = 400 yen, 50-100k = 900 yen, 100k+ = 1,900 yen. From 2029-06-01: 300 / 500 / 1,000 / 2,000 yen. Village portions derived as combined minus prefecture. Stays under 6,000 yen exempt.",
    source:
      "https://www.vill.hakuba.lg.jp/gyosei/soshikikarasagasu/zeimuka/kazeigakari/2/syukuhakuzei/13525.html",
  },

  // ============================================================
  // NOZAWAONSEN (Nagano pref + village percentage tax, from June 2026)
  // ============================================================
  {
    id: "nozawaonsen",
    name: { en: "Nozawaonsen", ja: "野沢温泉村" },
    prefecture: { en: "Nagano", ja: "長野県" },
    level: "village",
    rules: [
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 100 },
        ],
      },
      {
        authority: { en: "Nagano Prefecture", ja: "長野県" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 5999, amount: 0 },
          { min: 6000, max: null, amount: 150 },
        ],
      },
      {
        authority: { en: "Nozawaonsen Village", ja: "野沢温泉村" },
        effectiveFrom: "2026-06-01",
        effectiveUntil: "2029-05-31",
        type: "percentage",
        rate: 0.035,
        cap: null,
        threshold: 6000,
      },
      {
        authority: { en: "Nozawaonsen Village", ja: "野沢温泉村" },
        effectiveFrom: "2029-06-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.05,
        cap: null,
        threshold: 6000,
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Village levies 3.5% of the per-person room-only rate (5% from 2029-06-01) with no cap, plus the reduced prefectural fixed amount. Stays under 6,000 yen are exempt from both portions.",
    source:
      "https://www.vill.nozawaonsen.nagano.jp/www/contents/1768268767405/index.html",
  },

  // ============================================================
  // KUMAMOTO CITY (from July 2026)
  // ============================================================
  {
    id: "kumamoto",
    name: { en: "Kumamoto", ja: "熊本市" },
    prefecture: { en: "Kumamoto", ja: "熊本県" },
    level: "city",
    rules: [
      {
        authority: { en: "Kumamoto City", ja: "熊本市" },
        effectiveFrom: "2026-07-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: [],
    notes:
      "Flat 200 yen with no exemption floor and no school-trip or child exemptions (first accommodation tax in Kumamoto Prefecture).",
    source: "https://www.city.kumamoto.jp/kiji00368347/",
  },

  // ============================================================
  // MIYAZAKI CITY (from July 2026)
  // ============================================================
  {
    id: "miyazaki",
    name: { en: "Miyazaki", ja: "宮崎市" },
    prefecture: { en: "Miyazaki", ja: "宮崎県" },
    level: "city",
    rules: [
      {
        authority: { en: "Miyazaki City", ja: "宮崎市" },
        effectiveFrom: "2026-07-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: [],
    notes:
      "Flat 200 yen with no exemption floor and no school-trip or child exemptions.",
    source:
      "https://www.city.miyazaki.miyazaki.jp/city/policy/tourism/408678.html",
  },

  // ============================================================
  // MORIOKA (from October 2026)
  // ============================================================
  {
    id: "morioka",
    name: { en: "Morioka", ja: "盛岡市" },
    prefecture: { en: "Iwate", ja: "岩手県" },
    level: "city",
    rules: [
      {
        authority: { en: "Morioka City", ja: "盛岡市" },
        effectiveFrom: "2026-10-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [{ min: 0, max: null, amount: 200 }],
      },
    ],
    exemptions: [],
    notes:
      "Flat 200 yen with no exemption floor and no school-trip or child exemptions (first accommodation tax in Iwate Prefecture).",
    source: "https://www.city.morioka.iwate.jp/kurashi/zeikin/1054638/1054408.html",
  },

  // ============================================================
  // NASU (from October 2026)
  // ============================================================
  {
    id: "nasu",
    name: { en: "Nasu", ja: "那須町" },
    prefecture: { en: "Tochigi", ja: "栃木県" },
    level: "town",
    rules: [
      {
        authority: { en: "Nasu Town", ja: "那須町" },
        effectiveFrom: "2026-10-01",
        effectiveUntil: null,
        type: "fixed",
        tiers: [
          { min: 0, max: 9999, amount: 100 },
          { min: 10000, max: 19999, amount: 300 },
          { min: 20000, max: 29999, amount: 500 },
          { min: 30000, max: 49999, amount: 800 },
          { min: 50000, max: 99999, amount: 1500 },
          { min: 100000, max: null, amount: 3000 },
        ],
      },
    ],
    exemptions: ["school_trips", "children_under_12"],
    notes:
      "Six-tier schedule, the most granular fixed schedule in Japan (first accommodation tax in Tochigi Prefecture).",
    source: "https://www.town.nasu.lg.jp/0040/info-0000004060-1.html",
  },

  // ============================================================
  // OKINAWA PREFECTURE (other areas, from February 2027)
  // ============================================================
  {
    id: "okinawa_other",
    name: {
      en: "Okinawa Prefecture (other areas)",
      ja: "沖縄県（その他地域）",
    },
    prefecture: { en: "Okinawa", ja: "沖縄県" },
    level: "prefecture",
    rules: [
      {
        authority: { en: "Okinawa Prefecture", ja: "沖縄県" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.02,
        cap: 2000,
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "Japan's first prefecture-level percentage tax: 2% of the per-person room-only rate, capped at 2,000 yen (tax base capped at 100,000 yen). In Miyakojima, Ishigaki, Onna, Motobu and Chatan the prefectural rate is 0.8% plus a municipal 1.2% — use their dedicated entries. Official guidance rounds the tax base down to the nearest 1,000 yen; this calculator applies the rate to the raw rate per night.",
    source:
      "https://www.pref.okinawa.jp/kurashikankyo/zeikin/1003660/1036559/1036550.html",
  },

  // ============================================================
  // MIYAKOJIMA (Okinawa pref + city, from February 2027)
  // ============================================================
  {
    id: "miyakojima",
    name: { en: "Miyakojima", ja: "宮古島市" },
    prefecture: { en: "Okinawa", ja: "沖縄県" },
    level: "city",
    rules: [
      {
        authority: { en: "Okinawa Prefecture", ja: "沖縄県" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.008,
        cap: 800,
      },
      {
        authority: { en: "Miyakojima City", ja: "宮古島市" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.012,
        cap: 1200,
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "Combined 2% capped at 2,000 yen (prefecture 0.8%/800 + city 1.2%/1,200). Official guidance rounds the tax base down to the nearest 1,000 yen; this calculator applies the rates to the raw rate per night.",
    source:
      "https://www.city.miyakojima.lg.jp/soshiki/shityo/soumubu/zeimu/oshirase/2026-0310-2107-48.html",
  },

  // ============================================================
  // ISHIGAKI (Okinawa pref + city, from February 2027)
  // ============================================================
  {
    id: "ishigaki",
    name: { en: "Ishigaki", ja: "石垣市" },
    prefecture: { en: "Okinawa", ja: "沖縄県" },
    level: "city",
    rules: [
      {
        authority: { en: "Okinawa Prefecture", ja: "沖縄県" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.008,
        cap: 800,
      },
      {
        authority: { en: "Ishigaki City", ja: "石垣市" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.012,
        cap: 1200,
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "Combined 2% capped at 2,000 yen (prefecture 0.8%/800 + city 1.2%/1,200).",
    source:
      "https://www.city.ishigaki.okinawa.jp/soshiki/kanko_bunka/ishigakicityaccommodationtax/index.html",
  },

  // ============================================================
  // ONNA (Okinawa pref + village, from February 2027)
  // ============================================================
  {
    id: "onna",
    name: { en: "Onna", ja: "恩納村" },
    prefecture: { en: "Okinawa", ja: "沖縄県" },
    level: "village",
    rules: [
      {
        authority: { en: "Okinawa Prefecture", ja: "沖縄県" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.008,
        cap: 800,
      },
      {
        authority: { en: "Onna Village", ja: "恩納村" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.012,
        cap: 1200,
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "Combined 2% capped at 2,000 yen (prefecture 0.8%/800 + village 1.2%/1,200).",
    source: "https://www.soumu.go.jp/main_content/001055676.pdf",
  },

  // ============================================================
  // MOTOBU (Okinawa pref + town, from February 2027)
  // ============================================================
  {
    id: "motobu",
    name: { en: "Motobu", ja: "本部町" },
    prefecture: { en: "Okinawa", ja: "沖縄県" },
    level: "town",
    rules: [
      {
        authority: { en: "Okinawa Prefecture", ja: "沖縄県" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.008,
        cap: 800,
      },
      {
        authority: { en: "Motobu Town", ja: "本部町" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.012,
        cap: 1200,
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "Combined 2% capped at 2,000 yen (prefecture 0.8%/800 + town 1.2%/1,200).",
    source: "https://www.soumu.go.jp/main_content/001055675.pdf",
  },

  // ============================================================
  // CHATAN (Okinawa pref + town, from February 2027)
  // ============================================================
  {
    id: "chatan",
    name: { en: "Chatan", ja: "北谷町" },
    prefecture: { en: "Okinawa", ja: "沖縄県" },
    level: "town",
    rules: [
      {
        authority: { en: "Okinawa Prefecture", ja: "沖縄県" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.008,
        cap: 800,
      },
      {
        authority: { en: "Chatan Town", ja: "北谷町" },
        effectiveFrom: "2027-02-01",
        effectiveUntil: null,
        type: "percentage",
        rate: 0.012,
        cap: 1200,
      },
    ],
    exemptions: ["school_trips", "student_competitions"],
    notes:
      "Combined 2% capped at 2,000 yen (prefecture 0.8%/800 + town 1.2%/1,200).",
    source: "https://www.soumu.go.jp/main_content/001055677.pdf",
  },
];

import type { TaxArea } from "./types.js";

export const DATA_VERSION = "2026.03";
export const LAST_UPDATED = "2026-03-13";

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
      "A revision to 3% rate-based system is expected in FY2027 but is NOT yet in effect.",
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
      "Revised March 2026 with 5 tiers. No exempt threshold — all guests pay at least 200 yen. University/vocational students NOT exempt.",
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
      "Percentage-based tax. Increases from 2% to 3% in April 2026. The 3% includes both town and Hokkaido prefecture portions.",
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
    notes: null,
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
          { min: 0, max: 4999, amount: 100 },
          { min: 5000, max: 19999, amount: 200 },
          { min: 20000, max: 49999, amount: 500 },
          { min: 50000, max: 99999, amount: 1000 },
          { min: 100000, max: null, amount: 2000 },
        ],
      },
    ],
    exemptions: ["school_trips"],
    notes:
      "Fixed tiers until October 2026, then switching to 3% rate-based. Hokkaido prefecture tax applies additionally from April 2026.",
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
      "https://www.city.tokoname.aichi.jp/kurashi/zeikin/1007444/index.html",
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
      "https://city.hirosaki.aomori.jp/kurashi/zeikin/syukuhakuzei_top.html",
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
      "Hokkaido prefecture tax for areas without their own municipal accommodation tax. Kutchan is excluded (absorbed into town rate).",
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
    source: "https://www.town.yugawara.kanagawa.jp/",
  },
];

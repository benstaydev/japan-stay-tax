# japan-stay-tax

> Japan accommodation tax (宿泊税) calculator for Tokyo, Osaka, Kyoto, Niseko & 50+ municipalities

Calculate Japan's accommodation tax for any municipality. Zero dependencies. Fully typed. Bilingual (EN/JA).

日本の宿泊税を自治体ごとに計算できるTypeScript/JavaScriptライブラリ。依存関係ゼロ、完全型付き、日英バイリンガル対応。

---

Japan's accommodation tax varies by municipality — Tokyo, Osaka, Kyoto, and 50+ other jurisdictions each have different rates, tiers, and rules. This package provides a single, accurate, programmatic source for all of them.

Built for PMS developers, channel managers, booking engines, and accommodation operators who need to calculate 宿泊税 correctly across Japan.

日本の宿泊税は自治体ごとに税率・段階・ルールが異なります。東京、大阪、京都をはじめ50以上の自治体に対応。PMS開発者、チャネルマネージャー、予約エンジン、宿泊事業者向けに、正確な宿泊税データを一元的に提供します。

## Install / インストール

```bash
npm install japan-stay-tax
```

## Quick Start / クイックスタート

```typescript
import { calculateTax, searchAreas } from "japan-stay-tax";

// Calculate tax for a guest in Tokyo paying 15,000 yen/person/night
// 東京で1人1泊15,000円の宿泊税を計算
const result = calculateTax({
  areaId: "tokyo",
  ratePerNight: 15000,  // per person, per night
});
// → { total: 200, currency: "JPY", breakdown: [...] }

// Kyoto's 5-tier system (revised March 2026)
// 京都市の5段階制（2026年3月改定）
calculateTax({ areaId: "kyoto", ratePerNight: 75000 });
// → { total: 4000, ... }

// Fukuoka City has dual tax (prefecture + city)
// 福岡市は県税＋市税の二重課税
const fuk = calculateTax({ areaId: "fukuoka_city", ratePerNight: 25000 });
// → { total: 500, breakdown: [
//     { authority: { en: "Fukuoka Prefecture", ja: "福岡県" }, amount: 50 },
//     { authority: { en: "Fukuoka City", ja: "福岡市" }, amount: 450 }
//   ]}

// Kutchan (Niseko) uses percentage-based tax
// 倶知安町（ニセコ）は定率制
calculateTax({ areaId: "kutchan", ratePerNight: 30000, date: "2026-04-15" });
// → { total: 900 } (3% from April 2026 / 2026年4月から3%)

// Search areas by name (English or Japanese)
// エリア名で検索（英語・日本語対応）
searchAreas("hokkaido");
// → [{ id: "kutchan", ... }, { id: "niseko", ... }, { id: "sapporo", ... }, ...]

searchAreas("京都");
// → [{ id: "kyoto", ... }]
```

## Important: Per-Person Pricing / 重要：1人あたりの料金

**In most municipalities, accommodation tax is levied per person per night.** The `ratePerNight` parameter should be the price **per person per night** for these areas.

**ほとんどの自治体では、宿泊税は1人1泊あたりに課税されます。** これらのエリアでは `ratePerNight` に **1人1泊あたりの料金** を指定してください。

Each area exposes this as a `taxBase` field, so you can branch on it programmatically instead of hard-coding the Kutchan exception:

`taxBase` フィールドで課税標準の種類を判別できるため、倶知安の例外をハードコードせずにプログラムで分岐できます：

- `"per_person"` — tax is per guest per night (almost all of Japan); multiply the per-night result by the guest count for a stay total. / 1人1泊あたり（日本のほぼ全域）。1泊分の結果に人数を掛けると宿泊全体の税額になります。
- `"per_unit"` — tax is per room/building regardless of guests (none currently). / 人数に関係なく1室・1棟あたり（現在該当なし）。
- `"variable"` — the facility chooses the base (currently only Kutchan); pass the applicable charge and do **not** auto-multiply by guest count. / 施設が課税標準を選択（現在は倶知安のみ）。該当する料金を渡し、人数で自動的に掛けないでください。

### Exception: Kutchan (Niseko) / 例外：倶知安町（ニセコ）

Kutchan is the only municipality that allows the tax base to be **per person, per room, or per building** — whichever matches how the facility prices its accommodation. This is because ~70% of Kutchan's accommodation stock is condominiums and whole-unit rentals that price per room/building, not per person. Pass the applicable unit price as `ratePerNight`.

倶知安町は唯一、課税標準を **1人当たり・1部屋当たり・1棟当たり** のいずれかで計算できる自治体です。これは倶知安の宿泊施設の約70%がコンドミニアムや一棟貸しであり、1室・1棟単位で料金設定されているためです。施設の料金単位に合わせた金額を `ratePerNight` に指定してください。

```typescript
// Kutchan: pass the price per whatever unit the facility uses
// 倶知安：施設の料金単位に合わせた金額を渡す
calculateTax({ areaId: "kutchan", ratePerNight: 50000, date: "2026-04-15" });
// → { total: 1500 } (3% of ¥50,000 — whether that's per person, per room, or per building)
```

### Handling per-room prices from OTAs / OTAの1室あたり料金を扱う場合

Most foreign OTAs (Airbnb, Booking.com, Expedia, etc.) provide per-room prices, not per-person. **For all municipalities except Kutchan**, you must divide by the number of guests before calling `calculateTax`.

Airbnb・Booking.com・Expediaなどの海外OTAは1室あたりの料金を提供します。**倶知安以外の全自治体** では、`calculateTax` を呼ぶ前に宿泊人数で割ってください。

```typescript
// Example: Booking.com sends ¥30,000/room/night for 2 guests in Tokyo
// 例：Booking.comから東京の1室1泊30,000円、2名の場合
const roomRate = 30000;
const guests = 2;
const perPerson = Math.floor(roomRate / guests); // ¥15,000

const tax = calculateTax({
  areaId: "tokyo",
  ratePerNight: perPerson,  // ¥15,000 per person
});
// → { total: 200 } (per person — multiply by guests for total)

const totalTax = tax.total * guests;
// → ¥400 total for the room
```

> **Note:** A ¥30,000 room with 1 guest is taxed differently than the same room with 2 guests — this is how all Japanese municipalities (except Kutchan) define the tax base.
>
> **注意：** 同じ30,000円の部屋でも、1名利用と2名利用では宿泊税が異なります。これは倶知安を除く全自治体共通の課税基準です。

### What to exclude from the rate / 料金から除外すべきもの

The rate must exclude the following (this is defined by municipal ordinance):

以下は料金から除外してください（各自治体の条例で定められた課税標準）：

- Meals (食事代)
- Consumption tax (消費税)
- Service charges (サービス料)

This matches the Japanese legal definition: 素泊まり料金 (room charge only, tax-exclusive).

## API

### `calculateTax(options): TaxResult`

Calculate the accommodation tax for a stay. / 宿泊税を計算します。

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `areaId` | `string` | Yes | Area ID (e.g. `"tokyo"`, `"kyoto"`, `"fukuoka_city"`) |
| `ratePerNight` | `number` | Yes | **Per person per night** in JPY (1人1泊あたり) for most areas. For Kutchan: per person, per room, or per building. Excluding meals/tax/service. |
| `date` | `string` | No | ISO date string (e.g. `"2026-04-01"`). Defaults to today. Used to select applicable rules for areas with date-dependent rates. |

Returns a `TaxResult`:

```typescript
{
  total: number;          // Tax per person in JPY / 1人あたりの税額（円）
  currency: "JPY";
  areaId: string;
  areaName: { en: string; ja: string };
  breakdown: Array<{      // Breakdown by authority / 課税主体ごとの内訳
    authority: { en: string; ja: string };
    amount: number;
    type: "fixed" | "percentage";
  }>;
  ratePerNight: number;
  date: string;
}
```

### `getArea(areaId): TaxArea | undefined`

Get detailed tax area info including rate tiers, exemptions, and source URLs.

エリアの詳細情報（税率段階、免税対象、公式URL等）を取得します。

### `getAreaIds(): string[]`

List all available area IDs. / 対応エリアIDの一覧を返します。

### `searchAreas(query): TaxArea[]`

Search areas by name (English or Japanese) or prefecture.

エリア名（英語・日本語）や都道府県名で検索します。

### `getAllAreas(): TaxArea[]`

Get all tax areas with full details. / 全エリアの詳細情報を返します。

### `getChangelogSince(sinceSeq): ChangelogEntry[]`

Return dataset changes with a sequence number greater than `sinceSeq`, oldest first. Each release appends immutable, sequenced entries describing exactly which areas changed and why, so a consumer can store the last `seq` it saw and pull only what's new (corrections add a new entry that `supersedes` the old `seq` rather than editing it). Pass `0` for the full history.

`sinceSeq` より大きい連番を持つデータ変更を古い順に返します。各リリースで「どのエリアが・なぜ変わったか」を表す不変の連番エントリを追記するため、最後に取得した `seq` を保存しておけば差分だけを取得できます（修正は既存エントリを編集せず、`supersedes` 付きの新エントリを追加します）。全履歴を取得するには `0` を渡してください。

```typescript
import { getChangelogSince, changelog } from "japan-stay-tax";

// Everything since the version you last synced
// 前回同期したバージョン以降の全変更
const updates = getChangelogSince(lastSeenSeq);
// → [{ seq, releasedAt, dataVersion, areaIds, type, summary: { en, ja }, effectiveFrom, sources }, ...]

// Or read the full log directly / 全ログを直接参照
changelog.length; // current number of entries / 現在のエントリ数
```

The `changelog` array is also exported directly for the full, ordered history. / 全履歴は `changelog` 配列としても直接エクスポートされています。

## Covered Municipalities / 対応自治体一覧

Currently covers **50+ municipalities (55 areas)** across Japan:

| Area ID | Name / 名称 | Tax Type / 課税方式 |
|---------|-------------|-------------------|
| `tokyo` | Tokyo / 東京都 | Fixed tiers / 定額段階制 |
| `osaka` | Osaka / 大阪府 | Fixed tiers / 定額段階制 |
| `kyoto` | Kyoto / 京都市 | Fixed 5 tiers / 定額5段階制 |
| `kanazawa` | Kanazawa / 金沢市 | Fixed tiers / 定額段階制 |
| `kutchan` | Kutchan (Niseko) / 倶知安町 | Percentage / 定率制 |
| `fukuoka_city` | Fukuoka City / 福岡市 | Dual tax / 二重課税（県＋市） |
| `fukuoka_other` | Fukuoka Pref. (other) / 福岡県（その他） | Fixed / 定額制 |
| `kitakyushu` | Kitakyushu / 北九州市 | Dual tax / 二重課税（県＋市） |
| `nagasaki` | Nagasaki / 長崎市 | Fixed tiers / 定額段階制 |
| `niseko` | Niseko Town / ニセコ町 | Fixed tiers → 3% from Nov 2026 / 定額段階制→定率3%（2026年11月〜） |
| `sendai` | Sendai / 仙台市 | Dual tax / 二重課税（県＋市） |
| `miyagi_other` | Miyagi Pref. (outside Sendai) / 宮城県（仙台市以外） | Fixed / 定額制 |
| `sapporo` | Sapporo / 札幌市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `hakodate` | Hakodate / 函館市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `otaru` | Otaru / 小樽市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `furano` | Furano / 富良野市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `akaigawa` | Akaigawa (Kiroro) / 赤井川村 | Dual tax (Nov 2025~) / 二重課税（2025年11月〜） |
| `rusutsu` | Rusutsu / 留寿都村 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `toyako` | Toyako / 洞爺湖町 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `asahikawa` | Asahikawa / 旭川市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `shimukappu` | Shimukappu (Tomamu) / 占冠村 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `kitami` | Kitami / 北見市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `abashiri` | Abashiri / 網走市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `koshimizu` | Koshimizu / 小清水町 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `obihiro` | Obihiro / 帯広市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `otofuke` | Otofuke (Tokachigawa) / 音更町 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `shintoku` | Shintoku (Sahoro) / 新得町 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `kushiro` | Kushiro / 釧路市 | Dual tax (Apr 2026~) / 二重課税（2026年4月〜） |
| `hokkaido_other` | Hokkaido (other) / 北海道（その他） | Fixed tiers (Apr 2026~) / 定額段階制（2026年4月〜） |
| `hiroshima` | Hiroshima Pref. / 広島県 | Fixed (Apr 2026~) / 定額制（2026年4月〜） |
| `tokoname` | Tokoname / 常滑市 | Fixed / 定額制 |
| `atami` | Atami / 熱海市 | Fixed / 定額制 |
| `takayama` | Takayama / 高山市 | Fixed tiers / 定額段階制 |
| `gero` | Gero / 下呂市 | Fixed tiers / 定額段階制 |
| `matsue` | Matsue / 松江市 | Fixed tiers / 定額段階制 |
| `hirosaki` | Hirosaki / 弘前市 | Fixed / 定額制 |
| `toba` | Toba / 鳥羽市 | Fixed (Apr 2026~) / 定額制（2026年4月〜） |
| `gifu` | Gifu / 岐阜市 | Fixed (Apr 2026~) / 定額制（2026年4月〜） |
| `yugawara` | Yugawara / 湯河原町 | Fixed tiers (Apr 2026~) / 定額段階制（2026年4月〜） |
| `nagano_other` | Nagano Pref. (other) / 長野県（その他） | Fixed (Jun 2026~) / 定額制（2026年6月〜） |
| `matsumoto` | Matsumoto / 松本市 | Dual tax (Jun 2026~) / 二重課税（2026年6月〜） |
| `karuizawa` | Karuizawa / 軽井沢町 | Dual tax (Jun 2026~) / 二重課税（2026年6月〜） |
| `achi` | Achi / 阿智村 | Dual tax (Jun 2026~) / 二重課税（2026年6月〜） |
| `hakuba` | Hakuba / 白馬村 | Dual tax (Jun 2026~) / 二重課税（2026年6月〜） |
| `nozawaonsen` | Nozawaonsen / 野沢温泉村 | Percentage + fixed (Jun 2026~) / 定率＋定額（2026年6月〜） |
| `kumamoto` | Kumamoto / 熊本市 | Fixed (Jul 2026~) / 定額制（2026年7月〜） |
| `miyazaki` | Miyazaki / 宮崎市 | Fixed (Jul 2026~) / 定額制（2026年7月〜） |
| `morioka` | Morioka / 盛岡市 | Fixed (Oct 2026~) / 定額制（2026年10月〜） |
| `nasu` | Nasu / 那須町 | Fixed 6 tiers (Oct 2026~) / 定額6段階制（2026年10月〜） |
| `okinawa_other` | Okinawa Pref. (other) / 沖縄県（その他） | Percentage 2% (Feb 2027~) / 定率2%（2027年2月〜） |
| `miyakojima` | Miyakojima / 宮古島市 | Dual percentage (Feb 2027~) / 二重定率（2027年2月〜） |
| `ishigaki` | Ishigaki / 石垣市 | Dual percentage (Feb 2027~) / 二重定率（2027年2月〜） |
| `onna` | Onna / 恩納村 | Dual percentage (Feb 2027~) / 二重定率（2027年2月〜） |
| `motobu` | Motobu / 本部町 | Dual percentage (Feb 2027~) / 二重定率（2027年2月〜） |
| `chatan` | Chatan / 北谷町 | Dual percentage (Feb 2027~) / 二重定率（2027年2月〜） |

Run `getAreaIds()` for the programmatic list. / `getAreaIds()` で全エリアIDを取得できます。

## Data Sources / データソース

All tax rates are sourced from official municipal government websites. Each `TaxArea` includes a `source` field linking to the authoritative page. See [src/data.ts](./src/data.ts) for all sources.

全税率データは各自治体の公式サイトを出典としています。各 `TaxArea` の `source` フィールドに公式ページへのリンクがあります。詳細は [src/data.ts](./src/data.ts) をご覧ください。

Data is current as of **June 2026**. Contributions to keep rates up-to-date are welcome.

データは **2026年6月時点** の情報です。最新情報への更新PRを歓迎します。

## Contributing / コントリビューション

Found an outdated rate or a missing municipality? PRs welcome!

税率の変更や未対応の自治体を見つけた場合、PRをお待ちしています。

### Adding a new area / 新しいエリアの追加手順

1. Add the entry to `src/data.ts` / `src/data.ts` にエントリを追加
2. Add tests in `tests/calculator.test.ts` / `tests/calculator.test.ts` にテストを追加
3. Run `npm test` to verify / `npm test` で検証
4. Submit a PR with a link to the official municipal source / 公式出典リンク付きでPRを提出

## Use Cases / ユースケース

- **PMS (Property Management Systems)** — auto-calculate tax at checkout / チェックアウト時の自動計算
- **Channel managers** — sync correct tax amounts to OTAs / OTAへの正確な税額連携
- **Booking engines** — show tax breakdown during reservation / 予約時の税額内訳表示
- **Accounting software** — validate collected accommodation tax / 徴収済み宿泊税の検証
- **Travel apps** — display estimated tax for trip planning / 旅行計画時の税額目安表示

## License / ライセンス

MIT

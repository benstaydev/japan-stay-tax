# japan-stay-tax

Calculate Japan's accommodation tax (宿泊税) for any municipality. Zero dependencies. Fully typed.

Japan's accommodation tax varies by municipality — Tokyo, Osaka, Kyoto, and 20+ other cities each have different rates, tiers, and rules. This package provides a single, accurate source for all of them.

## Install

```bash
npm install japan-stay-tax
```

## Usage

```typescript
import { calculateTax, searchAreas } from "japan-stay-tax";

// Calculate tax for a guest in Tokyo paying 15,000 yen/night
const result = calculateTax({
  areaId: "tokyo",
  ratePerNight: 15000,
});
// → { total: 200, currency: "JPY", breakdown: [...] }

// Kyoto's 5-tier system (revised March 2026)
calculateTax({ areaId: "kyoto", ratePerNight: 75000 });
// → { total: 4000, ... }

// Fukuoka City has dual tax (prefecture + city)
const fuk = calculateTax({ areaId: "fukuoka_city", ratePerNight: 25000 });
// → { total: 500, breakdown: [
//     { authority: { en: "Fukuoka Prefecture" }, amount: 50 },
//     { authority: { en: "Fukuoka City" }, amount: 450 }
//   ]}

// Kutchan (Niseko) uses percentage-based tax
calculateTax({ areaId: "kutchan", ratePerNight: 30000, date: "2026-04-15" });
// → { total: 900 } (3% from April 2026)

// Search areas by name (English or Japanese)
searchAreas("hokkaido");
// → [{ id: "kutchan", ... }, { id: "niseko", ... }, { id: "sapporo", ... }, ...]

searchAreas("京都");
// → [{ id: "kyoto", ... }]
```

## API

### `calculateTax(options): TaxResult`

Calculate the accommodation tax for a stay.

| Option | Type | Required | Description |
|--------|------|----------|-------------|
| `areaId` | `string` | Yes | Area ID (e.g. `"tokyo"`, `"kyoto"`, `"fukuoka_city"`) |
| `ratePerNight` | `number` | Yes | Room rate per person per night in JPY, excluding meals, consumption tax, and service charges |
| `date` | `string` | No | ISO date string (e.g. `"2026-04-01"`). Defaults to today. Used to select applicable rules for areas with date-dependent rates. |

Returns a `TaxResult`:

```typescript
{
  total: number;          // Total tax in JPY
  currency: "JPY";
  areaId: string;
  areaName: { en: string; ja: string };
  breakdown: Array<{
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

### `getAreaIds(): string[]`

List all available area IDs.

### `searchAreas(query): TaxArea[]`

Search areas by name (English or Japanese) or prefecture.

### `getAllAreas(): TaxArea[]`

Get all tax areas with full details.

## Available Areas

Currently covers **25+ municipalities** including:

| Area ID | Name | Tax Type |
|---------|------|----------|
| `tokyo` | Tokyo (東京都) | Fixed tiers |
| `osaka` | Osaka (大阪府) | Fixed tiers |
| `kyoto` | Kyoto (京都市) | Fixed 5 tiers |
| `kanazawa` | Kanazawa (金沢市) | Fixed tiers |
| `kutchan` | Kutchan/Niseko (倶知安町) | Percentage |
| `fukuoka_city` | Fukuoka City (福岡市) | Dual tax |
| `kitakyushu` | Kitakyushu (北九州市) | Dual tax |
| `nagasaki` | Nagasaki (長崎市) | Fixed tiers |
| `niseko` | Niseko Town (ニセコ町) | Fixed tiers |
| `sendai` | Sendai (仙台市) | Dual tax |
| `sapporo` | Sapporo (札幌市) | Dual tax (from Apr 2026) |
| `hakodate` | Hakodate (函館市) | Dual tax (from Apr 2026) |
| `hiroshima` | Hiroshima (広島県) | Fixed (from Apr 2026) |
| ... | [and more](./src/data.ts) | |

Run `getAreaIds()` for the complete list.

## Room Rate Definition

The `ratePerNight` parameter should be the **per-person-per-night room charge** excluding:

- Meals (食事代)
- Consumption tax (消費税)
- Service charges (サービス料)

This matches the standard definition used by all Japanese municipalities (素泊まり料金).

## Data Sources

All tax rates are sourced from official municipal government websites. Each `TaxArea` includes a `source` field linking to the authoritative page. See [src/data.ts](./src/data.ts) for all sources.

Data is current as of **March 2026**. Contributions to keep rates up-to-date are welcome.

## Contributing

Found an outdated rate or a missing municipality? PRs welcome! To add a new area:

1. Add the entry to `src/data.ts`
2. Add tests in `tests/calculator.test.ts`
3. Run `npm test` to verify
4. Submit a PR with a link to the official municipal source

## License

MIT

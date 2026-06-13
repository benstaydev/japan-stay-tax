/** A tier in a fixed-amount tax schedule */
export interface TaxTier {
  /** Minimum room rate (inclusive) in JPY */
  min: number;
  /** Maximum room rate (inclusive) in JPY. null = no upper limit */
  max: number | null;
  /** Tax amount in JPY */
  amount: number;
}

/** A single tax rule applied by one authority */
export interface TaxRule {
  /** The taxing authority */
  authority: { en: string; ja: string };
  /** When this rule took effect (ISO date) */
  effectiveFrom: string;
  /** When this rule expires (ISO date), null = still in effect */
  effectiveUntil: string | null;
  /** Fixed amount per tier, or percentage of room rate */
  type: "fixed" | "percentage";
  /** Tiers for fixed-type taxes */
  tiers?: TaxTier[];
  /** Rate as decimal for percentage-type taxes (e.g. 0.02 = 2%) */
  rate?: number;
  /** Maximum amount in JPY for percentage-type taxes, null = no cap */
  cap?: number | null;
  /**
   * Exemption floor (免税点) in JPY for percentage-type taxes.
   * Stays priced below this are exempt from this rule.
   * (Fixed-type rules encode this as a 0-amount tier instead.)
   */
  threshold?: number;
  /**
   * For percentage-type taxes: round the tax base down to the nearest
   * multiple of this value before applying the rate
   * (e.g. 1000 for Okinawa's 1,000円未満切捨て).
   */
  baseRoundDownTo?: number;
}

/** A geographic area where accommodation tax applies */
export interface TaxArea {
  /** Unique identifier (e.g. "tokyo", "fukuoka_city") */
  id: string;
  /** Display names */
  name: { en: string; ja: string };
  /** Prefecture this area belongs to */
  prefecture: { en: string; ja: string };
  /** Administrative level */
  level: "prefecture" | "city" | "town" | "village" | "ward";
  /**
   * Tax base unit — tells a consumer how the taxable charge relates to guests, so
   * it knows whether to multiply a per-night result by guest count for a stay total.
   *
   * - "per_person" (default for almost all of Japan): tax is levied per guest per
   *   night; `ratePerNight` is the per-person charge, and a multi-guest stay total
   *   multiplies the per-night tax by the number of guests.
   * - "per_unit": tax is levied per room/building regardless of guest count.
   * - "variable": the facility chooses the base — per person, per room, or per
   *   building — and prices accordingly (currently only Kutchan). The caller passes
   *   the applicable taxable charge as `ratePerNight`; a consumer must not assume
   *   per-person and must not auto-multiply by guest count.
   */
  taxBase: "per_person" | "per_unit" | "variable";
  /** All tax rules that apply in this area (may include prefecture + city taxes) */
  rules: TaxRule[];
  /** Known exemption categories */
  exemptions: string[];
  /** Additional notes */
  notes: string | null;
  /** Official source URL */
  source: string;
}

/** Result of a tax calculation */
export interface TaxResult {
  /** Total tax amount in JPY */
  total: number;
  /** Currency (always JPY) */
  currency: "JPY";
  /** The area used for calculation */
  areaId: string;
  /** Name of the area */
  areaName: { en: string; ja: string };
  /** Breakdown by taxing authority */
  breakdown: Array<{
    authority: { en: string; ja: string };
    amount: number;
    type: "fixed" | "percentage";
  }>;
  /** The room rate used for calculation */
  ratePerNight: number;
  /** Date used for determining applicable rules */
  date: string;
}

/** Options for calculating tax */
export interface CalculateOptions {
  /** Area ID (e.g. "tokyo", "kyoto", "fukuoka_city") */
  areaId: string;
  /** Room rate per person per night in JPY (excluding meals, consumption tax, service charges) */
  ratePerNight: number;
  /** Date of stay (ISO date string). Defaults to today. Used to select applicable rules. */
  date?: string;
}

/** One published change to the tax dataset. Entries are immutable once shipped. */
export interface ChangelogEntry {
  /** Monotonic integer assigned at release; the stable cursor for change feeds. */
  seq: number;
  /** Release date (JST, ISO date) — when this entry shipped, not when the law changes. */
  releasedAt: string;
  /** DATA_VERSION this entry was part of (coarse; seq is the precise cursor). */
  dataVersion: string;
  /** Areas affected by this change. */
  areaIds: string[];
  /** Nature of the change. */
  type: "added" | "revised" | "corrected";
  /** If a correction, the seq of the entry it supersedes. */
  supersedes?: number;
  /** Human summary in both languages. */
  summary: { en: string; ja: string };
  /** When the underlying rule takes effect (ISO date), if applicable. */
  effectiveFrom: string | null;
  /** Official source URLs backing the change. */
  sources: string[];
}

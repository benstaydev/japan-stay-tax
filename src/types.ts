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

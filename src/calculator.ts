import { taxAreas } from "./data.js";
import type {
  CalculateOptions,
  TaxArea,
  TaxResult,
  TaxRule,
  TaxTier,
} from "./types.js";

/**
 * Get all available tax area IDs.
 */
export function getAreaIds(): string[] {
  return taxAreas.map((a) => a.id);
}

/**
 * Get tax area info by ID.
 * Returns undefined if not found.
 */
export function getArea(areaId: string): TaxArea | undefined {
  return taxAreas.find((a) => a.id === areaId);
}

/**
 * Search tax areas by name (English or Japanese, case-insensitive).
 */
export function searchAreas(query: string): TaxArea[] {
  const q = query.toLowerCase();
  return taxAreas.filter(
    (a) =>
      a.id.includes(q) ||
      a.name.en.toLowerCase().includes(q) ||
      a.name.ja.includes(query) ||
      a.prefecture.en.toLowerCase().includes(q) ||
      a.prefecture.ja.includes(query),
  );
}

/**
 * Get all tax areas.
 */
export function getAllAreas(): TaxArea[] {
  return [...taxAreas];
}

function isRuleActive(rule: TaxRule, dateStr: string): boolean {
  const date = dateStr;
  if (rule.effectiveFrom > date) return false;
  if (rule.effectiveUntil && rule.effectiveUntil < date) return false;
  return true;
}

function calculateRuleAmount(rule: TaxRule, ratePerNight: number): number {
  if (rule.type === "percentage") {
    const amount = Math.floor(ratePerNight * (rule.rate ?? 0));
    if (rule.cap != null) return Math.min(amount, rule.cap);
    return amount;
  }

  // Fixed tiers
  if (!rule.tiers || rule.tiers.length === 0) return 0;

  for (const tier of rule.tiers) {
    if (ratePerNight >= tier.min && (tier.max === null || ratePerNight <= tier.max)) {
      return tier.amount;
    }
  }

  return 0;
}

/**
 * Calculate accommodation tax for a stay.
 *
 * @param options - Area ID, room rate per person per night (JPY), and optional date
 * @returns Tax calculation result with total and breakdown
 * @throws Error if area ID is not found
 *
 * @example
 * ```ts
 * const result = calculateTax({
 *   areaId: "tokyo",
 *   ratePerNight: 15000,
 * });
 * // result.total === 200
 * ```
 */
export function calculateTax(options: CalculateOptions): TaxResult {
  const { areaId, ratePerNight, date } = options;

  const area = getArea(areaId);
  if (!area) {
    const available = getAreaIds().join(", ");
    throw new Error(
      `Unknown area ID: "${areaId}". Available areas: ${available}`,
    );
  }

  const dateStr = date ?? new Date().toISOString().split("T")[0];

  const activeRules = area.rules.filter((r) => isRuleActive(r, dateStr));

  const breakdown = activeRules.map((rule) => ({
    authority: rule.authority,
    amount: calculateRuleAmount(rule, ratePerNight),
    type: rule.type,
  }));

  const total = breakdown.reduce((sum, b) => sum + b.amount, 0);

  return {
    total,
    currency: "JPY",
    areaId: area.id,
    areaName: area.name,
    breakdown,
    ratePerNight,
    date: dateStr,
  };
}

export {
  calculateTax,
  getArea,
  getAreaIds,
  getAllAreas,
  searchAreas,
} from "./calculator.js";

export { taxAreas, DATA_VERSION, LAST_UPDATED } from "./data.js";

export { changelog, getChangelogSince } from "./changelog.js";

export type {
  TaxArea,
  TaxRule,
  TaxTier,
  TaxResult,
  CalculateOptions,
  ChangelogEntry,
} from "./types.js";

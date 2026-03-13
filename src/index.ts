export {
  calculateTax,
  getArea,
  getAreaIds,
  getAllAreas,
  searchAreas,
} from "./calculator.js";

export { taxAreas, DATA_VERSION, LAST_UPDATED } from "./data.js";

export type {
  TaxArea,
  TaxRule,
  TaxTier,
  TaxResult,
  CalculateOptions,
} from "./types.js";

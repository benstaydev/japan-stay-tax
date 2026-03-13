import { describe, it, expect } from "vitest";
import {
  calculateTax,
  getArea,
  getAreaIds,
  searchAreas,
  getAllAreas,
} from "../src/index.js";

describe("getAreaIds", () => {
  it("returns all area IDs", () => {
    const ids = getAreaIds();
    expect(ids).toContain("tokyo");
    expect(ids).toContain("kyoto");
    expect(ids).toContain("osaka");
    expect(ids).toContain("fukuoka_city");
    expect(ids.length).toBeGreaterThan(10);
  });
});

describe("getArea", () => {
  it("returns area by ID", () => {
    const area = getArea("tokyo");
    expect(area).toBeDefined();
    expect(area!.name.en).toBe("Tokyo");
    expect(area!.name.ja).toBe("東京都");
  });

  it("returns undefined for unknown area", () => {
    expect(getArea("narnia")).toBeUndefined();
  });
});

describe("searchAreas", () => {
  it("finds by English name", () => {
    const results = searchAreas("kyoto");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("kyoto");
  });

  it("finds by Japanese name", () => {
    const results = searchAreas("東京");
    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe("tokyo");
  });

  it("finds by prefecture", () => {
    const results = searchAreas("hokkaido");
    expect(results.length).toBeGreaterThan(0);
    results.forEach((r) => expect(r.prefecture.en).toBe("Hokkaido"));
  });
});

describe("getAllAreas", () => {
  it("returns a copy of all areas", () => {
    const areas = getAllAreas();
    expect(areas.length).toBeGreaterThan(10);
  });
});

describe("calculateTax", () => {
  // ===========================================
  // TOKYO
  // ===========================================
  describe("Tokyo", () => {
    it("exempt under 10,000 yen", () => {
      const r = calculateTax({ areaId: "tokyo", ratePerNight: 8000 });
      expect(r.total).toBe(0);
    });

    it("100 yen for 10,000-14,999 yen", () => {
      const r = calculateTax({ areaId: "tokyo", ratePerNight: 12000 });
      expect(r.total).toBe(100);
    });

    it("200 yen for 15,000+ yen", () => {
      const r = calculateTax({ areaId: "tokyo", ratePerNight: 25000 });
      expect(r.total).toBe(200);
    });

    it("boundary: exactly 10,000 yen", () => {
      const r = calculateTax({ areaId: "tokyo", ratePerNight: 10000 });
      expect(r.total).toBe(100);
    });

    it("boundary: exactly 15,000 yen", () => {
      const r = calculateTax({ areaId: "tokyo", ratePerNight: 15000 });
      expect(r.total).toBe(200);
    });
  });

  // ===========================================
  // OSAKA
  // ===========================================
  describe("Osaka (post Sep 2025)", () => {
    const date = "2025-10-01";

    it("exempt under 5,000 yen", () => {
      const r = calculateTax({ areaId: "osaka", ratePerNight: 3000, date });
      expect(r.total).toBe(0);
    });

    it("200 yen for 5,000-14,999 yen", () => {
      const r = calculateTax({ areaId: "osaka", ratePerNight: 8000, date });
      expect(r.total).toBe(200);
    });

    it("400 yen for 15,000-19,999 yen", () => {
      const r = calculateTax({ areaId: "osaka", ratePerNight: 17000, date });
      expect(r.total).toBe(400);
    });

    it("500 yen for 20,000+ yen", () => {
      const r = calculateTax({ areaId: "osaka", ratePerNight: 30000, date });
      expect(r.total).toBe(500);
    });
  });

  // ===========================================
  // KYOTO (post Mar 2026)
  // ===========================================
  describe("Kyoto (post Mar 2026)", () => {
    const date = "2026-03-15";

    it("200 yen under 6,000 yen (no exempt threshold)", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 3000, date });
      expect(r.total).toBe(200);
    });

    it("400 yen for 6,000-19,999 yen", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 10000, date });
      expect(r.total).toBe(400);
    });

    it("1,000 yen for 20,000-49,999 yen", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 35000, date });
      expect(r.total).toBe(1000);
    });

    it("4,000 yen for 50,000-99,999 yen", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 75000, date });
      expect(r.total).toBe(4000);
    });

    it("10,000 yen for 100,000+ yen", () => {
      const r = calculateTax({
        areaId: "kyoto",
        ratePerNight: 150000,
        date,
      });
      expect(r.total).toBe(10000);
    });
  });

  // ===========================================
  // FUKUOKA CITY (dual tax)
  // ===========================================
  describe("Fukuoka City (dual tax)", () => {
    it("200 yen total for under 20,000 yen (50 pref + 150 city)", () => {
      const r = calculateTax({ areaId: "fukuoka_city", ratePerNight: 10000 });
      expect(r.total).toBe(200);
      expect(r.breakdown).toHaveLength(2);
      expect(r.breakdown[0].amount).toBe(50); // prefecture
      expect(r.breakdown[1].amount).toBe(150); // city
    });

    it("500 yen total for 20,000+ yen (50 pref + 450 city)", () => {
      const r = calculateTax({ areaId: "fukuoka_city", ratePerNight: 25000 });
      expect(r.total).toBe(500);
      expect(r.breakdown[0].amount).toBe(50);
      expect(r.breakdown[1].amount).toBe(450);
    });
  });

  // ===========================================
  // KITAKYUSHU (dual tax, flat)
  // ===========================================
  describe("Kitakyushu", () => {
    it("200 yen flat (50 pref + 150 city)", () => {
      const r = calculateTax({ areaId: "kitakyushu", ratePerNight: 50000 });
      expect(r.total).toBe(200);
    });
  });

  // ===========================================
  // KUTCHAN (percentage-based)
  // ===========================================
  describe("Kutchan (percentage-based)", () => {
    it("2% before April 2026", () => {
      const r = calculateTax({
        areaId: "kutchan",
        ratePerNight: 30000,
        date: "2026-03-01",
      });
      expect(r.total).toBe(600); // 30000 * 0.02
    });

    it("3% from April 2026", () => {
      const r = calculateTax({
        areaId: "kutchan",
        ratePerNight: 30000,
        date: "2026-04-15",
      });
      expect(r.total).toBe(900); // 30000 * 0.03
    });
  });

  // ===========================================
  // SENDAI (dual tax with threshold)
  // ===========================================
  describe("Sendai (dual tax)", () => {
    it("exempt under 6,000 yen", () => {
      const r = calculateTax({
        areaId: "sendai",
        ratePerNight: 4000,
        date: "2026-02-01",
      });
      expect(r.total).toBe(0);
    });

    it("300 yen for 6,000+ yen (100 pref + 200 city)", () => {
      const r = calculateTax({
        areaId: "sendai",
        ratePerNight: 10000,
        date: "2026-02-01",
      });
      expect(r.total).toBe(300);
    });
  });

  // ===========================================
  // SAPPORO (launching April 2026)
  // ===========================================
  describe("Sapporo (from April 2026)", () => {
    const date = "2026-04-15";

    it("300 yen for under 20,000 yen", () => {
      const r = calculateTax({ areaId: "sapporo", ratePerNight: 10000, date });
      expect(r.total).toBe(300);
    });

    it("400 yen for 20,000-49,999 yen", () => {
      const r = calculateTax({ areaId: "sapporo", ratePerNight: 30000, date });
      expect(r.total).toBe(400);
    });

    it("1,000 yen for 50,000+ yen", () => {
      const r = calculateTax({ areaId: "sapporo", ratePerNight: 60000, date });
      expect(r.total).toBe(1000);
    });

    it("no tax before effective date", () => {
      const r = calculateTax({
        areaId: "sapporo",
        ratePerNight: 10000,
        date: "2026-03-15",
      });
      expect(r.total).toBe(0);
    });
  });

  // ===========================================
  // ERROR HANDLING
  // ===========================================
  describe("error handling", () => {
    it("throws for unknown area ID", () => {
      expect(() =>
        calculateTax({ areaId: "atlantis", ratePerNight: 10000 }),
      ).toThrow('Unknown area ID: "atlantis"');
    });
  });

  // ===========================================
  // RESULT STRUCTURE
  // ===========================================
  describe("result structure", () => {
    it("returns correct structure", () => {
      const r = calculateTax({
        areaId: "tokyo",
        ratePerNight: 12000,
        date: "2026-01-01",
      });
      expect(r.currency).toBe("JPY");
      expect(r.areaId).toBe("tokyo");
      expect(r.areaName.en).toBe("Tokyo");
      expect(r.areaName.ja).toBe("東京都");
      expect(r.ratePerNight).toBe(12000);
      expect(r.date).toBe("2026-01-01");
      expect(r.breakdown).toBeInstanceOf(Array);
      expect(r.breakdown.length).toBeGreaterThan(0);
    });
  });
});

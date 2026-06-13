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
  // KYOTO (pre Mar 2026)
  // ===========================================
  describe("Kyoto (pre Mar 2026)", () => {
    const date = "2025-12-01";

    it("200 yen under 20,000 yen", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 10000, date });
      expect(r.total).toBe(200);
    });

    it("500 yen for 20,000-49,999 yen", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 35000, date });
      expect(r.total).toBe(500);
    });

    it("1,000 yen for 50,000+ yen", () => {
      const r = calculateTax({ areaId: "kyoto", ratePerNight: 75000, date });
      expect(r.total).toBe(1000);
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
  // NISEKO (boundary fix + prefecture stacking + Nov 2026 switch)
  // ===========================================
  describe("Niseko", () => {
    it("town tax only before April 2026", () => {
      const r = calculateTax({
        areaId: "niseko",
        ratePerNight: 10000,
        date: "2026-03-01",
      });
      expect(r.total).toBe(200);
      expect(r.breakdown).toHaveLength(1);
    });

    it("exactly 5,000 yen is in the 100 yen town tier", () => {
      const r = calculateTax({
        areaId: "niseko",
        ratePerNight: 5000,
        date: "2026-03-01",
      });
      expect(r.total).toBe(100);
    });

    it("prefecture tax stacks Apr-Oct 2026 (10,000 yen → 200 + 100)", () => {
      const r = calculateTax({
        areaId: "niseko",
        ratePerNight: 10000,
        date: "2026-05-01",
      });
      expect(r.total).toBe(300);
      expect(r.breakdown).toHaveLength(2);
    });

    it("combined 2,500 yen for 100,000+ during stacking period", () => {
      const r = calculateTax({
        areaId: "niseko",
        ratePerNight: 120000,
        date: "2026-05-01",
      });
      expect(r.total).toBe(2500);
    });

    it("flat 3% (incl. prefecture share) from November 2026", () => {
      const r = calculateTax({
        areaId: "niseko",
        ratePerNight: 30000,
        date: "2026-11-15",
      });
      expect(r.total).toBe(900);
      expect(r.breakdown).toHaveLength(1);
      expect(r.breakdown[0].type).toBe("percentage");
    });
  });

  // ===========================================
  // NEW HOKKAIDO MUNICIPALITIES (April 2026)
  // ===========================================
  describe("new Hokkaido municipalities", () => {
    const date = "2026-05-01";

    it("Akaigawa: village tax alone before April 2026", () => {
      const r = calculateTax({
        areaId: "akaigawa",
        ratePerNight: 10000,
        date: "2025-12-01",
      });
      expect(r.total).toBe(200);
    });

    it("Akaigawa: below 8,000 only prefecture tax applies", () => {
      const r = calculateTax({ areaId: "akaigawa", ratePerNight: 7000, date });
      expect(r.total).toBe(100);
    });

    it("Akaigawa: 50,000+ combined 1,000 yen", () => {
      const r = calculateTax({ areaId: "akaigawa", ratePerNight: 60000, date });
      expect(r.total).toBe(1000);
    });

    it("Rusutsu: combined 200/400/1,000", () => {
      expect(calculateTax({ areaId: "rusutsu", ratePerNight: 10000, date }).total).toBe(200);
      expect(calculateTax({ areaId: "rusutsu", ratePerNight: 30000, date }).total).toBe(400);
      expect(calculateTax({ areaId: "rusutsu", ratePerNight: 60000, date }).total).toBe(1000);
    });

    it("Toyako: combined 300/700/1,500", () => {
      expect(calculateTax({ areaId: "toyako", ratePerNight: 10000, date }).total).toBe(300);
      expect(calculateTax({ areaId: "toyako", ratePerNight: 30000, date }).total).toBe(700);
      expect(calculateTax({ areaId: "toyako", ratePerNight: 60000, date }).total).toBe(1500);
    });

    it("Shintoku: 50 yen tier exists (under 5,000 combined 150)", () => {
      const r = calculateTax({ areaId: "shintoku", ratePerNight: 4000, date });
      expect(r.total).toBe(150);
    });

    it("flat-200 cities: combined 300/400/700 (Kushiro)", () => {
      expect(calculateTax({ areaId: "kushiro", ratePerNight: 10000, date }).total).toBe(300);
      expect(calculateTax({ areaId: "kushiro", ratePerNight: 30000, date }).total).toBe(400);
      expect(calculateTax({ areaId: "kushiro", ratePerNight: 60000, date }).total).toBe(700);
    });
  });

  // ===========================================
  // NAGANO (June 2026, introductory vs standard rates)
  // ===========================================
  describe("Nagano", () => {
    it("prefecture (other areas): exempt under 6,000, 200 yen introductory", () => {
      expect(
        calculateTax({ areaId: "nagano_other", ratePerNight: 5999, date: "2026-07-01" }).total,
      ).toBe(0);
      expect(
        calculateTax({ areaId: "nagano_other", ratePerNight: 10000, date: "2026-07-01" }).total,
      ).toBe(200);
    });

    it("prefecture (other areas): 300 yen from June 2029", () => {
      const r = calculateTax({
        areaId: "nagano_other",
        ratePerNight: 10000,
        date: "2029-06-01",
      });
      expect(r.total).toBe(300);
    });

    it("Matsumoto: combined 200 introductory, 300 standard", () => {
      expect(
        calculateTax({ areaId: "matsumoto", ratePerNight: 10000, date: "2026-07-01" }).total,
      ).toBe(200);
      expect(
        calculateTax({ areaId: "matsumoto", ratePerNight: 10000, date: "2029-07-01" }).total,
      ).toBe(300);
    });

    it("Karuizawa: combined 200/250/700 introductory", () => {
      const date = "2026-07-01";
      expect(calculateTax({ areaId: "karuizawa", ratePerNight: 8000, date }).total).toBe(200);
      expect(calculateTax({ areaId: "karuizawa", ratePerNight: 50000, date }).total).toBe(250);
      expect(calculateTax({ areaId: "karuizawa", ratePerNight: 150000, date }).total).toBe(700);
    });

    it("Karuizawa: combined 300/350/800 from June 2029", () => {
      const date = "2029-07-01";
      expect(calculateTax({ areaId: "karuizawa", ratePerNight: 8000, date }).total).toBe(300);
      expect(calculateTax({ areaId: "karuizawa", ratePerNight: 50000, date }).total).toBe(350);
      expect(calculateTax({ areaId: "karuizawa", ratePerNight: 150000, date }).total).toBe(800);
    });

    it("Hakuba: combined 200/400/900/1,900 introductory", () => {
      const date = "2026-07-01";
      expect(calculateTax({ areaId: "hakuba", ratePerNight: 10000, date }).total).toBe(200);
      expect(calculateTax({ areaId: "hakuba", ratePerNight: 30000, date }).total).toBe(400);
      expect(calculateTax({ areaId: "hakuba", ratePerNight: 70000, date }).total).toBe(900);
      expect(calculateTax({ areaId: "hakuba", ratePerNight: 120000, date }).total).toBe(1900);
    });

    it("Nozawaonsen: 3.5% + prefecture 100 introductory", () => {
      const r = calculateTax({
        areaId: "nozawaonsen",
        ratePerNight: 10000,
        date: "2026-07-01",
      });
      // 10,000 * 3.5% = 350 village + 100 prefecture
      expect(r.total).toBe(450);
    });

    it("Nozawaonsen: exempt under 6,000 (percentage threshold)", () => {
      const r = calculateTax({
        areaId: "nozawaonsen",
        ratePerNight: 5000,
        date: "2026-07-01",
      });
      expect(r.total).toBe(0);
    });

    it("Nozawaonsen: 5% + prefecture 150 from June 2029", () => {
      const r = calculateTax({
        areaId: "nozawaonsen",
        ratePerNight: 10000,
        date: "2029-07-01",
      });
      expect(r.total).toBe(650);
    });
  });

  // ===========================================
  // KUMAMOTO / MIYAZAKI (July 2026), MORIOKA / NASU (October 2026)
  // ===========================================
  describe("July and October 2026 launches", () => {
    it("Kumamoto: no tax before July 2026, then flat 200", () => {
      expect(
        calculateTax({ areaId: "kumamoto", ratePerNight: 10000, date: "2026-06-30" }).total,
      ).toBe(0);
      expect(
        calculateTax({ areaId: "kumamoto", ratePerNight: 3000, date: "2026-07-01" }).total,
      ).toBe(200);
    });

    it("Miyazaki: flat 200 from July 2026", () => {
      expect(
        calculateTax({ areaId: "miyazaki", ratePerNight: 50000, date: "2026-07-01" }).total,
      ).toBe(200);
    });

    it("Morioka: flat 200 from October 2026", () => {
      expect(
        calculateTax({ areaId: "morioka", ratePerNight: 8000, date: "2026-09-30" }).total,
      ).toBe(0);
      expect(
        calculateTax({ areaId: "morioka", ratePerNight: 8000, date: "2026-10-01" }).total,
      ).toBe(200);
    });

    it("Nasu: six tiers", () => {
      const date = "2026-10-15";
      expect(calculateTax({ areaId: "nasu", ratePerNight: 9999, date }).total).toBe(100);
      expect(calculateTax({ areaId: "nasu", ratePerNight: 15000, date }).total).toBe(300);
      expect(calculateTax({ areaId: "nasu", ratePerNight: 25000, date }).total).toBe(500);
      expect(calculateTax({ areaId: "nasu", ratePerNight: 40000, date }).total).toBe(800);
      expect(calculateTax({ areaId: "nasu", ratePerNight: 75000, date }).total).toBe(1500);
      expect(calculateTax({ areaId: "nasu", ratePerNight: 100000, date }).total).toBe(3000);
    });
  });

  // ===========================================
  // OKINAWA (February 2027, percentage with caps)
  // ===========================================
  describe("Okinawa (from February 2027)", () => {
    const date = "2027-03-01";

    it("no tax before February 2027", () => {
      const r = calculateTax({
        areaId: "okinawa_other",
        ratePerNight: 10000,
        date: "2026-12-01",
      });
      expect(r.total).toBe(0);
    });

    it("prefecture: 2% of rate", () => {
      const r = calculateTax({ areaId: "okinawa_other", ratePerNight: 10000, date });
      expect(r.total).toBe(200);
    });

    it("prefecture: capped at 2,000 yen", () => {
      const r = calculateTax({ areaId: "okinawa_other", ratePerNight: 150000, date });
      expect(r.total).toBe(2000);
    });

    it("tax base rounds down to nearest 1,000 yen (official example: 8,500 → 160)", () => {
      const r = calculateTax({ areaId: "okinawa_other", ratePerNight: 8500, date });
      expect(r.total).toBe(160);
    });

    it("tax base rounding: 10,999 taxed as 10,000 → 200", () => {
      const r = calculateTax({ areaId: "okinawa_other", ratePerNight: 10999, date });
      expect(r.total).toBe(200);
    });

    it("municipal split also rounds the base (Miyakojima 8,500 → 64 + 96)", () => {
      const r = calculateTax({ areaId: "miyakojima", ratePerNight: 8500, date });
      expect(r.breakdown[0].amount).toBe(64);
      expect(r.breakdown[1].amount).toBe(96);
      expect(r.total).toBe(160);
    });

    it("Miyakojima: 0.8% + 1.2% = 2% split across authorities", () => {
      const r = calculateTax({ areaId: "miyakojima", ratePerNight: 10000, date });
      expect(r.total).toBe(200);
      expect(r.breakdown).toHaveLength(2);
      expect(r.breakdown[0].amount).toBe(80); // prefecture 0.8%
      expect(r.breakdown[1].amount).toBe(120); // city 1.2%
    });

    it("Miyakojima: caps at 800 + 1,200 = 2,000 yen", () => {
      const r = calculateTax({ areaId: "miyakojima", ratePerNight: 200000, date });
      expect(r.total).toBe(2000);
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

describe("taxBase", () => {
  it("every area declares a valid taxBase", () => {
    for (const area of getAllAreas()) {
      expect(
        area.taxBase,
        `area "${area.id}" is missing taxBase`,
      ).toMatch(/^(per_person|per_unit|variable)$/);
    }
  });

  it("Kutchan is the variable-base exception; mainstream areas are per-person", () => {
    // Kutchan uniquely lets the facility choose per-person / per-room / per-building
    // (see data.ts notes), so its base is "variable". Niseko switched to a flat 3% of
    // the per-person rate, so it is "per_person" like the rest of the country.
    expect(getArea("kutchan")!.taxBase).toBe("variable");
    expect(getArea("niseko")!.taxBase).toBe("per_person");
    expect(getArea("tokyo")!.taxBase).toBe("per_person");
    expect(getArea("kyoto")!.taxBase).toBe("per_person");
    expect(getArea("osaka")!.taxBase).toBe("per_person");
  });
});

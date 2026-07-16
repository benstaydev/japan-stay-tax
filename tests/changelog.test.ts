import { describe, it, expect } from "vitest";
import { changelog, getChangelogSince, DATA_VERSION } from "../src/index.js";

describe("changelog", () => {
  it("has monotonically increasing seq starting at 1", () => {
    expect(changelog.length).toBeGreaterThan(0);
    changelog.forEach((entry, i) => {
      expect(entry.seq).toBe(i + 1);
    });
  });

  it("every entry is shaped correctly", () => {
    for (const e of changelog) {
      expect(e.type).toMatch(/^(added|revised|corrected)$/);
      expect(typeof e.summary.en).toBe("string");
      expect(typeof e.summary.ja).toBe("string");
      expect(Array.isArray(e.areaIds)).toBe(true);
      expect(e.releasedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });

  it("getChangelogSince returns only entries after the cursor, ascending", () => {
    const all = getChangelogSince(0);
    expect(all.length).toBe(changelog.length);
    const tail = getChangelogSince(changelog.length - 1);
    expect(tail.length).toBe(1);
    expect(tail[0].seq).toBe(changelog.length);
    expect(getChangelogSince(changelog.length)).toEqual([]);
  });
});

describe("seq 2 — tokyo 2027 revision (MIC consent 2026-06-30)", () => {
  it("records the consented Tokyo revision with its effective date and sources", () => {
    const e = changelog.find((c) => c.seq === 2);
    expect(e).toBeTruthy();
    expect(e!.areaIds).toEqual(["tokyo"]);
    expect(e!.type).toBe("revised");
    expect(e!.effectiveFrom).toBe("2027-04-01");
    expect(e!.sources.length).toBeGreaterThan(0);
    expect(e!.dataVersion).toBe("2026.07");
  });
});

describe("DATA_VERSION", () => {
  it("is bumped to 2026.07 for the tokyo revision release", () => {
    expect(DATA_VERSION).toBe("2026.07");
  });
});

describe("seq 3 — six municipal taxes from the 2026-06-30 consent batch", () => {
  it("records all six areas with the MIC source", () => {
    const e = changelog.find((c) => c.seq === 3);
    expect(e).toBeTruthy();
    expect(e!.type).toBe("added");
    expect([...e!.areaIds].sort()).toEqual(
      ["fujikawaguchiko", "fujiyoshida", "kitahiroshima", "tomakomai", "wakkanai", "yamagata"],
    );
    expect(e!.sources.length).toBeGreaterThan(0);
  });
});

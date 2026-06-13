import { describe, it, expect } from "vitest";
import { changelog, getChangelogSince } from "../src/index.js";

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

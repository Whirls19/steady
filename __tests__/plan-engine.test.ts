import { describe, it, expect } from "vitest";
import { addDays, milestones, stageOf, trialCost, triage, expertQuestions } from "../lib/plan-engine";

describe("milestones", () => {
  it("dates milestones from the start date", () => {
    const m = milestones("2026-01-01", 12);
    expect(m.map((x) => x.week)).toEqual([3, 6, 12]);
    expect(m[2].date).toBe(addDays("2026-01-01", 84));
  });
  it("handles very short review windows", () => expect(milestones("2026-01-01", 2).map((x) => x.week)).toEqual([1, 2, 2]));
});
describe("stageOf", () => {
  it("before start", () => expect(stageOf("2026-02-01", "2026-01-30", 12)).toBe("not_started"));
  it("early, mid and review boundaries", () => {
    expect(stageOf("2026-01-01", "2026-01-10", 12)).toBe("early");
    expect(stageOf("2026-01-01", "2026-02-12", 12)).toBe("mid");
    expect(stageOf("2026-01-01", "2026-03-26", 12)).toBe("review");
  });
});
describe("trialCost", () => {
  it("counts whole bottles for the full trial", () => expect(trialCost(600, 30, 12)).toEqual({ bottles: 3, total: 1800, perMonth: 600 }));
  it("never returns zero bottles", () => expect(trialCost(500, 90, 2).bottles).toBe(1));
});
describe("triage: safety beats reassurance", () => {
  it("reaction -> seek_care in any stage", () => (["early", "mid", "review"] as const).forEach((s) => expect(triage({ date: "", hairFall: "same", reaction: true }, s)).toBe("seek_care")));
  it("heavy shedding -> seek_care", () => expect(triage({ date: "", hairFall: "heavy", reaction: false }, "early")).toBe("seek_care"));
  it("more shedding early -> watch", () => expect(triage({ date: "", hairFall: "more", reaction: false }, "early")).toBe("watch"));
  it("more shedding late is not waved off as normal", () => expect(triage({ date: "", hairFall: "more", reaction: false }, "review")).toBe("none"));
  it("reaction wins over a good hair-fall answer", () => expect(triage({ date: "", hairFall: "less", reaction: true }, "mid")).toBe("seek_care"));
});
describe("expertQuestions", () => {
  it("adds product-specific questions", () => {
    const q = expertQuestions(["Hair Growth Serum Roll-On", "Biotin Gummies"], true).join(" ");
    expect(q).toMatch(/all of these together/);
    expect(q).toMatch(/roll-on/);
  });
  it("keeps the base questions for one product", () => expect(expertQuestions(["Biotin Gummies"], false)).toHaveLength(3));
});

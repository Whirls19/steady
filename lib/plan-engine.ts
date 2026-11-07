// Pure functions: dates, stages, cost and safety. No UI, no storage.
export const PRODUCTS = ["Advanced Hair Growth Serum", "Hair Growth Serum", "Hair Growth Serum Roll-On", "Biotin Gummies"] as const;
export type Stage = "not_started" | "early" | "mid" | "review";
export type HairFall = "less" | "same" | "more" | "heavy";
export interface Entry { date: string; hairFall: HairFall; reaction: boolean }
export interface Milestone { week: number; date: string; title: string; text: string }

const DAY = 864e5;
export const addDays = (iso: string, n: number) => new Date(Date.parse(iso) + n * DAY).toISOString().slice(0, 10);
export const daysBetween = (a: string, b: string) => Math.floor((Date.parse(b) - Date.parse(a)) / DAY);

export function milestones(start: string, reviewWeeks: number): Milestone[] {
  const early = Math.max(1, Math.ceil(reviewWeeks / 4)), mid = Math.max(early + 1, Math.ceil(reviewWeeks / 2));
  return [
    { week: early, title: "Early check", text: "Too soon to judge results. Check that the routine is easy to keep and your scalp is comfortable." },
    { week: mid, title: "Halfway", text: "Compare photos from the same spot in the same light. Small or no change is still common at this point." },
    { week: reviewWeeks, title: "Fair review", text: "Compare your photos with the first ones. If you can see nothing, ask an expert whether this product suits you before buying more." },
  ].map((m) => ({ ...m, date: addDays(start, m.week * 7) }));
}

export function stageOf(start: string, today: string, reviewWeeks: number): Stage {
  const d = daysBetween(start, today);
  if (d < 0) return "not_started";
  if (d < (reviewWeeks * 7) / 2) return "early";
  return d < reviewWeeks * 7 ? "mid" : "review";
}

export function trialCost(price: number, daysPerBottle: number, reviewWeeks: number) {
  const bottles = Math.max(1, Math.ceil((reviewWeeks * 7) / daysPerBottle));
  return { bottles, total: bottles * price, perMonth: Math.round((price * 30) / daysPerBottle) };
}

export type Triage = "seek_care" | "watch" | "none";
// Safety first: a reaction or heavy shedding always beats any "keep going" message.
export function triage(e: Entry, stage: Stage): Triage {
  if (e.reaction || e.hairFall === "heavy") return "seek_care";
  if (e.hairFall === "more" && (stage === "early" || stage === "not_started")) return "watch";
  return "none";
}

export function expertQuestions(products: string[], rollOn: boolean): string[] {
  const q = ["How long should I use this before judging it, and what happens if I stop?", "What does each ingredient do, and who should not use it?", "Is this suited to my kind of hair concern?"];
  if (products.length > 1) q.push("Do I need all of these together, or would one be enough?");
  if (rollOn) q.push("Is the roll-on meant for the whole scalp or only specific areas?");
  return q;
}

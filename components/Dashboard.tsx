"use client";
import { useState } from "react";
import { AlertTriangle, CalendarCheck, MessageCircleQuestion, Save, Trash2, Eye, CheckCircle2, Circle } from "lucide-react";
import { HairFall, daysBetween, milestones, stageOf, trialCost, triage, expertQuestions } from "@/lib/plan-engine";
import type { Plan } from "./Setup";
const STAGE = { not_started: "Your trial hasn’t started yet.", early: "You’re in the early stretch. Little change is normal here.", mid: "You’re past halfway. A photo comparison is worthwhile.", review: "You’ve reached your review point. Compare photos and decide with expert input." };
const card = "rounded-2xl bg-white p-6 shadow-sm ring-1 ring-ink/5";
const fmt = (d: string) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", timeZone: "UTC" });
export default function Dashboard({ plan, setPlan, saved, onSave, onDelete, onReset }: { plan: Plan; setPlan: (p: Plan) => void; saved: boolean; onSave: () => void; onDelete: () => void; onReset: () => void }) {
  const today = new Date().toISOString().slice(0, 10), stage = stageOf(plan.start, today, plan.reviewWeeks);
  const [hf, setHf] = useState<HairFall>("same"), [rx, setRx] = useState(false);
  const last = plan.log[plan.log.length - 1], t = last ? triage(last, stage) : "none", cost = trialCost(plan.price, plan.days, plan.reviewWeeks);
  const total = plan.reviewWeeks * 7, d = daysBetween(plan.start, today), pct = Math.max(0, Math.min(100, (d / total) * 100)), ms = milestones(plan.start, plan.reviewWeeks);
  const add = (e: React.FormEvent) => { e.preventDefault(); setPlan({ ...plan, log: [...plan.log, { date: today, hairFall: hf, reaction: rx }] }); setRx(false); };
  const tile = (n: string, l: string) => (<div className="rounded-2xl bg-teal-soft p-4"><p className="font-display text-2xl font-bold sm:text-3xl">{n}</p><p className="text-sm text-ink/65">{l}</p></div>);
  return (
    <div className="space-y-6">
      {t === "seek_care" && <div role="alert" className="rounded-2xl border-2 border-alert bg-alert-soft p-6 text-alert"><h2 className="flex items-center gap-2 font-display text-2xl font-bold"><AlertTriangle aria-hidden />Stop and get advice</h2><p className="mt-2">Your last check-in reported a reaction or heavy shedding. Stop using the product you think is responsible and see a doctor or dermatologist. Keeping to the timeline is not the priority now.</p></div>}
      {t === "watch" && <div className="rounded-2xl border-2 border-teal/40 bg-teal-soft p-6"><h2 className="flex items-center gap-2 font-display text-xl font-bold"><Eye aria-hidden />Keep watching</h2><p className="mt-2">Some people report more shedding in the first weeks. We can’t tell if that’s what this is. Get advice if it gets heavy, comes with scalp symptoms, or doesn’t settle.</p></div>}
      <section aria-label="Trial progress">
        <h2 className="font-display text-3xl font-bold">{d < 0 ? `Starts in ${-d} ${-d === 1 ? "day" : "days"}` : `Day ${Math.min(d + 1, total)} of ${total}`}</h2>
        <p className="mt-1 text-ink/65">{STAGE[stage]}</p>
        <div className="relative mb-12 mt-6 h-3 rounded-full bg-ink/10" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(pct)} aria-label="Trial progress">
          <div className="h-full rounded-full bg-gradient-to-r from-teal/70 to-teal transition-all duration-700" style={{ width: `${pct}%` }} />
          {ms.map((m) => (<div key={m.week} className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ left: `${(m.week / plan.reviewWeeks) * 100}%` }}><span className={`block h-5 w-5 rounded-full border-4 ${m.date <= today ? "border-teal bg-white" : "border-ink/20 bg-white"}`} /><span className="absolute left-1/2 top-7 -translate-x-1/2 whitespace-nowrap text-xs font-semibold text-ink/70">Week {m.week}</span></div>))}
        </div>
        <div className="grid grid-cols-3 gap-3">{tile(`₹${cost.perMonth}`, "per month")}{tile(`₹${cost.total}`, `${cost.bottles} ${cost.bottles === 1 ? "pack" : "packs"} for a full trial`)}{tile(String(plan.log.length), "check-ins")}</div>
        <p className="mt-3 text-sm text-ink/60">Decide the cost of a full trial up front, not pack by pack.</p>
      </section>
      <section className={card}><h2 className="flex items-center gap-2 font-display text-2xl font-bold"><CalendarCheck aria-hidden className="text-teal" />Your check-in dates</h2>
        <ol className="mt-4 space-y-4">{ms.map((m) => { const done = m.date <= today; return (<li key={m.week} className="flex gap-3">{done ? <CheckCircle2 aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-teal" /> : <Circle aria-hidden className="mt-0.5 h-6 w-6 shrink-0 text-ink/25" />}<div><h3 className="font-semibold">{m.title}, week {m.week} ({fmt(m.date)}){done ? ", reached" : ""}</h3><p className="text-ink/70">{m.text}</p></div></li>); })}</ol>
        <p className="mt-4 text-sm text-ink/60">Many hair products only keep working while you keep using them. Check your label.</p></section>
      <section className={card}><h2 className="font-display text-2xl font-bold">Check in</h2>
        <form onSubmit={add} className="mt-3 space-y-4"><div><label htmlFor="hf" className="mb-1 block font-semibold">Hair fall compared with before</label>
          <select id="hf" value={hf} onChange={(e) => setHf(e.target.value as HairFall)} className="w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 transition focus:border-teal"><option value="less">Less</option><option value="same">About the same</option><option value="more">More than usual</option><option value="heavy">A lot more, it worries me</option></select></div>
          <label className="flex items-center gap-3"><input type="checkbox" className="h-5 w-5 accent-teal" checked={rx} onChange={(e) => setRx(e.target.checked)} />Scalp pain, burning, itching, redness, or a sharp change in my hair</label>
          <button className="min-h-[48px] rounded-full bg-teal px-6 font-semibold text-white shadow-sm transition hover:brightness-110 active:scale-[.98]">Save check-in</button></form>
        {plan.log.length > 0 && <ul className="mt-4 space-y-1 text-sm text-ink/70">{plan.log.slice(-5).reverse().map((e, i) => <li key={i}>{fmt(e.date)}: hair fall {e.hairFall}{e.reaction ? ", reaction reported" : ""}</li>)}</ul>}</section>
      <section className={card}><h2 className="flex items-center gap-2 font-display text-2xl font-bold"><MessageCircleQuestion aria-hidden className="text-teal" />Questions for an expert</h2>
        <ul className="mt-3 list-disc space-y-1.5 pl-5">{expertQuestions(plan.products, plan.products.some((p) => p.includes("Roll-On"))).map((q) => <li key={q}>{q}</li>)}</ul></section>
      <div className="flex flex-wrap gap-3">
        <button onClick={onSave} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-ink/15 px-5 font-semibold transition hover:bg-teal-soft"><Save aria-hidden className="h-4 w-4" />{saved ? "Saved on this device" : "Save on this device"}</button>
        <button onClick={onDelete} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-alert px-5 font-semibold text-alert transition hover:bg-alert-soft"><Trash2 aria-hidden className="h-4 w-4" />Delete my data</button>
        <button onClick={onReset} className="min-h-[48px] rounded-full px-5 font-semibold underline">Start a new plan</button></div>
    </div>
  );
}

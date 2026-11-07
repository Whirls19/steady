"use client";
import { useState } from "react";
import { Droplets, Sprout, Target, Pill, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { PRODUCTS } from "@/lib/plan-engine";
import type { Entry } from "@/lib/plan-engine";
export interface Plan { products: string[]; start: string; reviewWeeks: number; price: number; days: number; log: Entry[] }
const ICON = [Sprout, Droplets, Target, Pill];
const NOTE = ["Serum", "Serum", "Roll-on applicator", "Gummies"];
const field = "w-full rounded-xl border-2 border-ink/10 bg-white px-4 py-3 transition focus:border-teal";
const STEPS = ["Products", "Dates", "Cost"];
export default function Setup({ onDone }: { onDone: (p: Plan) => void }) {
  const [step, setStep] = useState(0), [products, setProducts] = useState<string[]>([]);
  const [v, setV] = useState({ start: "", weeks: "12", price: "", days: "" }), [err, setErr] = useState("");
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement>) => setV({ ...v, [k]: e.target.value });
  const [weeks, price, days] = [Number(v.weeks), Number(v.price), Number(v.days)];
  function next(e: React.FormEvent) {
    e.preventDefault();
    const bad = step === 0 ? (!products.length && "Choose at least one product.") : step === 1 ? ((!v.start || !(weeks >= 1 && weeks <= 52)) && "Enter a start date and review weeks from 1 to 52.") : ((!(price > 0) || !(days >= 1)) && "Enter a price and how many days one pack lasts.");
    if (bad) { setErr(bad); return; }
    setErr("");
    if (step < 2) setStep(step + 1); else onDone({ products, start: v.start, reviewWeeks: Math.floor(weeks), price, days, log: [] });
  }
  const h = "font-display text-2xl font-bold";
  return (
    <form onSubmit={next} noValidate>
      <ol className="mb-6 flex gap-2" aria-label="Progress">{STEPS.map((s, i) => (<li key={s} aria-current={i === step ? "step" : undefined} className="flex-1"><div className={`h-1.5 rounded-full transition-all ${i <= step ? "bg-teal" : "bg-ink/10"}`} /><span className={`mt-1 flex items-center gap-1 text-sm ${i === step ? "font-semibold" : "text-ink/50"}`}>{i < step && <Check aria-hidden className="h-3.5 w-3.5 text-teal" />}{s}</span></li>))}</ol>
      {step === 0 && <fieldset><legend className={h + " mb-1"}>What are you using or about to buy?</legend><p className="mb-4 text-ink/60">Pick all that apply.</p>
        <div className="grid gap-3 sm:grid-cols-2">{PRODUCTS.map((p, i) => { const I = ICON[i], on = products.includes(p); return (
          <label key={p} className={`flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition hover:-translate-y-0.5 hover:shadow-md ${on ? "border-teal bg-teal-soft" : "border-ink/10 bg-white"}`}>
            <input type="checkbox" className="sr-only" checked={on} onChange={() => setProducts(on ? products.filter((x) => x !== p) : [...products, p])} />
            <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${on ? "bg-teal text-white" : "bg-teal-soft text-teal"}`}><I aria-hidden className="h-5 w-5" /></span>
            <span><span className="block font-semibold leading-snug">{p}</span><span className="text-sm text-ink/55">{NOTE[i]}</span></span></label>); })}</div></fieldset>}
      {step === 1 && <div className="space-y-6"><h2 className={h}>When do you start, and when will you judge?</h2>
        <div><label htmlFor="s" className="mb-2 block font-semibold">Start date</label><input id="s" type="date" className={field} value={v.start} onChange={set("start")} /></div>
        <div><label htmlFor="w" className="mb-1 block font-semibold">Weeks before you judge it</label><p className="mb-2 text-sm text-ink/60">Use the time on your label or from an expert. If you don’t know yet, 12 is a placeholder.</p>
          <input id="w" inputMode="numeric" className={field} value={v.weeks} onChange={set("weeks")} />
          <div className="mt-2 flex gap-2">{[8, 12, 16, 24].map((n) => (<button type="button" key={n} onClick={() => setV({ ...v, weeks: String(n) })} className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${weeks === n ? "bg-teal text-white" : "bg-teal-soft text-ink hover:bg-teal/20"}`}>{n} weeks</button>))}</div></div></div>}
      {step === 2 && <div className="space-y-6"><h2 className={h}>What does a pack cost you?</h2>
        <div className="grid gap-5 sm:grid-cols-2"><div><label htmlFor="p" className="mb-2 block font-semibold">Price per bottle or pack (₹)</label><input id="p" inputMode="decimal" className={field} value={v.price} onChange={set("price")} /></div>
          <div><label htmlFor="d" className="mb-2 block font-semibold">Days one lasts you</label><input id="d" inputMode="numeric" className={field} value={v.days} onChange={set("days")} /></div></div></div>}
      <div role="alert" className="mt-4 min-h-6 font-semibold text-alert">{err}</div>
      <div className="mt-4 flex gap-3">
        {step > 0 && <button type="button" onClick={() => { setErr(""); setStep(step - 1); }} className="inline-flex min-h-[48px] items-center gap-2 rounded-full border-2 border-ink/15 px-5 font-semibold transition hover:bg-teal-soft"><ArrowLeft aria-hidden className="h-4 w-4" />Back</button>}
        <button className="inline-flex min-h-[48px] items-center gap-2 rounded-full bg-teal px-7 font-semibold text-white shadow-sm transition hover:brightness-110 active:scale-[.98]">{step < 2 ? "Next" : "Build my timeline"}<ArrowRight aria-hidden className="h-4 w-4" /></button></div>
    </form>
  );
}

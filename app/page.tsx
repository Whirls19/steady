import { CalendarClock, ClipboardCheck, Wallet } from "lucide-react";
import App from "@/components/App";
const HOW = [
  [CalendarClock, "See your timeline", "Dated check-ins from your start date, so you know when a fair judgement is possible."],
  [Wallet, "Know the cost first", "What the full trial costs, before you buy pack after pack."],
  [ClipboardCheck, "Ask better questions", "A short list to take to an expert, based on what you use."],
] as const;
export default function Home() {
  return (
    <>
      <div className="bg-gradient-to-b from-teal-soft via-teal-soft/60 to-paper">
        <header className="mx-auto max-w-2xl px-5 pb-10 pt-10">
          <p className="font-display text-xl font-bold text-teal">Mosaic Wellness</p>
          <h1 className="mt-8 font-display text-4xl font-bold leading-[1.1] sm:text-6xl">Give your hair product a fair trial.</h1>
          <p className="mt-5 max-w-prose text-lg text-ink/70">Hair changes slowly. This app turns your start date into a clear timeline, shows what the trial will cost, and tells you when to ask an expert.</p>
          <svg aria-hidden viewBox="-12 -8 590 124" className="mt-8 w-full overflow-visible text-teal"><path d="M8 62 C120 62 160 30 300 34 S480 10 592 14" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeDasharray="2 10" />
            {[[8, 62, "Start"], [190, 39, "Week 3"], [380, 32, "Week 6"], [592, 14, "Week 12"]].map(([x, y, t]) => (<g key={String(t)}><circle cx={x as number} cy={y as number} r="9" fill="currentColor" /><text x={Math.min(x as number, 560)} y={(y as number) + 34} fontSize="14" fontWeight="600" fill="#14263F" textAnchor={x === 8 ? "start" : "middle"}>{t as string}</text></g>))}</svg>
        </header>
      </div>
      <main className="mx-auto max-w-2xl px-5 pb-16">
        <ul className="-mt-2 mb-10 grid gap-3 sm:grid-cols-3">
          {HOW.map(([Icon, t, d]) => (<li key={t} className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-ink/5"><Icon aria-hidden className="h-6 w-6 text-teal" /><h2 className="mt-3 font-display text-lg font-bold">{t}</h2><p className="mt-1 text-sm text-ink/65">{d}</p></li>))}
        </ul>
        <section aria-label="Your plan" className="rounded-3xl bg-white p-6 shadow-md ring-1 ring-ink/5 sm:p-8"><App /></section>
        <footer className="mt-12 border-t border-ink/10 pt-5 text-sm text-ink/60">Concept prototype. Not a Be Bodywise or Mosaic product. It does not diagnose, recommend products, or promise results, and it is not medical advice. Nothing is stored unless you choose Save on this device.</footer>
      </main>
    </>
  );
}

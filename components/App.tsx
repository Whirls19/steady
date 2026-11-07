"use client";
import { useEffect, useState } from "react";
import Setup, { Plan } from "./Setup";
import Dashboard from "./Dashboard";
const KEY = "steady:v1";
export default function App() {
  const [plan, setPlan] = useState<Plan | null>(null), [saved, setSaved] = useState(false);
  useEffect(() => { try { const r = localStorage.getItem(KEY); if (r) { setPlan(JSON.parse(r)); setSaved(true); } } catch {} }, []);
  useEffect(() => { if (saved && plan) try { localStorage.setItem(KEY, JSON.stringify(plan)); } catch {} }, [saved, plan]);
  const wipe = () => { try { localStorage.removeItem(KEY); } catch {} setSaved(false); setPlan(null); };
  return plan ? <Dashboard plan={plan} setPlan={setPlan} saved={saved} onSave={() => setSaved(true)} onDelete={wipe} onReset={() => { setSaved(false); setPlan(null); }} /> : <Setup onDone={setPlan} />;
}

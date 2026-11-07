import type { Metadata } from "next";
import { Bricolage_Grotesque, Figtree } from "next/font/google";
import "./globals.css";
const display = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-display", weight: ["500", "700"] });
const body = Figtree({ subsets: ["latin"], variable: "--font-body" });
export const metadata: Metadata = { title: "Mosaic Wellness: a fair trial for your hair product", description: "A concept prototype that helps you tell a normal early phase from a reason to stop and get advice." };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en" className={`${display.variable} ${body.variable}`}><body>{children}</body></html>);
}

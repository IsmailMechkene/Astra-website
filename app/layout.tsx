import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Astra — Windows diagnostics, made clear",
  description: "Ask Astra about your Windows PC and get clear, local diagnostic answers.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://astra-diagnostics.red-fairy-6393.chatgpt.site"),
  title: "Astra — Your PC is talking. Astra translates.",
  description: "Local-first system intelligence for Windows. Ask naturally, inspect the evidence, and stay in control.",
  openGraph: {
    title: "Astra — Your PC is talking. Astra translates.",
    description: "Local-first system intelligence for Windows.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "Astra — local-first system intelligence for Windows" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Astra — Your PC is talking. Astra translates.",
    description: "Local-first system intelligence for Windows.",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}

import Link from "next/link";
import { Activity, BookOpenText, Download, LayoutDashboard, Play, ShieldCheck } from "lucide-react";

const releaseUrl = process.env.NEXT_PUBLIC_ASTRA_DOWNLOAD_URL ?? "#download";

export function SiteHeader() {
  return <header className="site-nav-wrap">
    <nav className="site-nav shell" aria-label="Main navigation">
      <Link className="brand island-brand" href="/" aria-label="Astra home">
        <span className="island-brand-icon"><Activity size={17} strokeWidth={1.8} aria-hidden="true" /></span>
        <span>ASTRA</span>
      </Link>
      <div className="nav-links">
        <Link href="/#product"><LayoutDashboard size={14} strokeWidth={1.7} aria-hidden="true" /><span>Product</span></Link>
        <Link href="/#demo"><Play size={13} strokeWidth={1.8} aria-hidden="true" /><span>Demo</span></Link>
        <Link href="/docs"><BookOpenText size={14} strokeWidth={1.7} aria-hidden="true" /><span>Docs</span></Link>
        <Link href="/policies"><ShieldCheck size={14} strokeWidth={1.7} aria-hidden="true" /><span>Trust</span></Link>
      </div>
      <div className="nav-actions">
        <span className="nav-status"><ShieldCheck size={13} strokeWidth={1.8} aria-hidden="true" /> LOCAL-FIRST</span>
        <a className="button button-small island-download" href={releaseUrl}><Download size={14} strokeWidth={1.9} aria-hidden="true" /><span>Download</span></a>
      </div>
    </nav>
  </header>;
}

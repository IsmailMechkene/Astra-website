"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

const releaseUrl = process.env.NEXT_PUBLIC_ASTRA_DOWNLOAD_URL ?? "#download";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMobileOpen(false);
    const closeOutside = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setMobileOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOutside);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOutside);
    };
  }, []);

  const close = () => setMobileOpen(false);

  return (
    <header className="site-nav-wrap" ref={headerRef}>
      <div className="site-nav-shell shell">
        <nav className="site-nav simple-nav" aria-label="Main navigation">
          <Link className="brand island-brand" href="/" aria-label="Astra home" onClick={close}>
            <span className="island-brand-icon"><img src="/astra_logo.svg" alt="" /></span>
            <span>ASTRA</span>
          </Link>

          <div className="nav-links simple-nav-links">
            <Link href="/#product" onClick={close}>Product</Link>
            <Link href="/#demo" onClick={close}>Demo</Link>
            <Link href="/#trust" onClick={close}>Trust</Link>
            <Link href="/docs" onClick={close}>Docs</Link>
          </div>

          <div className="nav-actions">
            <a className="button button-small island-download" href={releaseUrl} onClick={close}>
              <Download size={15} strokeWidth={1.9} aria-hidden="true" /><span>Download</span>
            </a>
            <button
              className="mobile-menu-toggle"
              type="button"
              aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((current) => !current)}
            >
              {mobileOpen ? <X size={19} aria-hidden="true" /> : <Menu size={19} aria-hidden="true" />}
            </button>
          </div>
        </nav>

        <div className={`mobile-menu simple-mobile-menu${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
          <Link href="/#product" onClick={close}>Product</Link>
          <Link href="/#demo" onClick={close}>Demo</Link>
          <Link href="/#trust" onClick={close}>Trust</Link>
          <Link href="/docs" onClick={close}>Documentation</Link>
        </div>
      </div>
    </header>
  );
}

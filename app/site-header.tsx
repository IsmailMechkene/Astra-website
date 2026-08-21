"use client";

import Link from "next/link";
import { Download, Menu, X } from "lucide-react";
import { type MouseEvent, useEffect, useRef, useState } from "react";
import { astraRelease } from "./release";

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
  const navigate = (event: MouseEvent<HTMLAnchorElement>) => {
    close();
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    window.location.assign(event.currentTarget.href);
  };

  return (
    <header className="site-nav-wrap" ref={headerRef}>
      <div className="site-nav-shell shell">
        <nav className="site-nav professional-nav" aria-label="Main navigation">
          <Link className="astra-nav-brand" href="/" aria-label="Astra home" onClick={navigate}>
            <img src="/astra_logo.svg" alt="" />
            <span>Astra</span>
          </Link>

          <div className="nav-links professional-nav-links">
            <Link href="/#how" onClick={navigate}>How it works</Link>
            <Link href="/#trust" onClick={navigate}>Trust</Link>
            <Link href="/#opensource" onClick={navigate}>Open source</Link>
            <Link href="/docs" onClick={navigate}>Docs</Link>
          </div>

          <div className="nav-actions">
            <a className="nav-download" href={astraRelease.downloadUrl} onClick={close}>
              <Download size={15} strokeWidth={1.9} aria-hidden="true" /><span>Download</span>
            </a>
            <button
              className="mobile-menu-toggle nav-menu-toggle"
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
          <Link href="/#how" onClick={navigate}>How it works</Link>
          <Link href="/#trust" onClick={navigate}>Trust</Link>
          <Link href="/#opensource" onClick={navigate}>Open source</Link>
          <Link href="/docs" onClick={navigate}>Documentation</Link>
        </div>
      </div>
    </header>
  );
}

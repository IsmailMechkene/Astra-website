"use client";

import Link from "next/link";
import {
  Activity,
  ArrowRight,
  BookOpenText,
  ChevronDown,
  CircleGauge,
  Download,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  Menu,
  Play,
  ScanSearch,
  ShieldCheck,
  Sparkles,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

const releaseUrl = process.env.NEXT_PUBLIC_ASTRA_DOWNLOAD_URL ?? "#download";

type MenuName = "product" | "resources" | null;

const productLinks = [
  { href: "/#product", icon: ScanSearch, title: "Live diagnostics", description: "See what is slowing your PC down, while it happens." },
  { href: "/#demo", icon: Sparkles, title: "Astra intelligence", description: "Turn raw system signals into a clear diagnosis." },
  { href: "/#trust", icon: ShieldCheck, title: "Local-first control", description: "Keep machine context private and under your control." },
];

const resourceLinks = [
  { href: "/docs", icon: BookOpenText, title: "Documentation", description: "Install Astra, learn the workflow, and troubleshoot setup." },
  { href: "/policies", icon: FileCheck2, title: "Policies & trust", description: "Read how Astra handles privacy, security, and telemetry." },
];

export function SiteHeader() {
  const [openMenu, setOpenMenu] = useState<MenuName>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    function handlePointerDown(event: PointerEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("pointerdown", handlePointerDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("pointerdown", handlePointerDown);
    };
  }, []);

  const closeAll = () => {
    setOpenMenu(null);
    setMobileOpen(false);
  };

  const toggleMenu = (menu: Exclude<MenuName, null>) => {
    setOpenMenu((current) => current === menu ? null : menu);
  };

  return (
    <header
      className={`site-nav-wrap${openMenu ? " has-open-menu" : ""}`}
      ref={headerRef}
      onMouseLeave={() => setOpenMenu(null)}
    >
      <div className="site-nav-shell shell">
        <nav className="site-nav" aria-label="Main navigation">
          <Link className="brand island-brand" href="/" aria-label="Astra home" onClick={closeAll}>
            <span className="island-brand-icon"><Activity size={19} strokeWidth={1.8} aria-hidden="true" /></span>
            <span>ASTRA</span>
          </Link>

          <div className="nav-links" aria-label="Primary links">
            <button
              className={openMenu === "product" ? "active" : ""}
              type="button"
              aria-expanded={openMenu === "product"}
              aria-controls="product-menu"
              onMouseEnter={() => setOpenMenu("product")}
              onFocus={() => setOpenMenu("product")}
              onClick={() => toggleMenu("product")}
            >
              <span>Product</span><ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <Link href="/#demo" onClick={closeAll}><span>Demo</span></Link>
            <button
              className={openMenu === "resources" ? "active" : ""}
              type="button"
              aria-expanded={openMenu === "resources"}
              aria-controls="resources-menu"
              onMouseEnter={() => setOpenMenu("resources")}
              onFocus={() => setOpenMenu("resources")}
              onClick={() => toggleMenu("resources")}
            >
              <span>Resources</span><ChevronDown size={15} strokeWidth={1.8} aria-hidden="true" />
            </button>
            <Link href="/#trust" onClick={closeAll}><span>Trust</span></Link>
          </div>

          <div className="nav-actions">
            <span className="nav-status"><ShieldCheck size={14} strokeWidth={1.8} aria-hidden="true" /> LOCAL-FIRST</span>
            <a className="button button-small island-download" href={releaseUrl} onClick={closeAll}>
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

        <div id="product-menu" className={`mega-menu product-mega${openMenu === "product" ? " is-open" : ""}`} aria-hidden={openMenu !== "product"}>
          <div className="mega-menu-intro">
            <span className="mega-kicker"><CircleGauge size={14} aria-hidden="true" /> ASTRA DIAGNOSTICS</span>
            <h2>Understand your machine,<br />without the guesswork.</h2>
            <Link href="/#product" onClick={closeAll}>Explore Astra <ArrowRight size={15} aria-hidden="true" /></Link>
          </div>
          <div className="mega-card-grid">
            {productLinks.map(({ href, icon: Icon, title, description }, index) => (
              <Link className="mega-card" href={href} key={title} onClick={closeAll} tabIndex={openMenu === "product" ? 0 : -1}>
                <span className="mega-card-icon"><Icon size={20} strokeWidth={1.65} aria-hidden="true" /></span>
                <span className="mega-card-index">0{index + 1}</span>
                <strong>{title}</strong>
                <small>{description}</small>
                <ArrowRight className="mega-card-arrow" size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div id="resources-menu" className={`mega-menu resources-mega${openMenu === "resources" ? " is-open" : ""}`} aria-hidden={openMenu !== "resources"}>
          <div className="mega-menu-intro compact">
            <span className="mega-kicker"><Gauge size={14} aria-hidden="true" /> KNOWLEDGE BASE</span>
            <h2>Everything you need<br />to run Astra well.</h2>
          </div>
          <div className="resource-menu-grid">
            {resourceLinks.map(({ href, icon: Icon, title, description }) => (
              <Link className="resource-menu-card" href={href} key={title} onClick={closeAll} tabIndex={openMenu === "resources" ? 0 : -1}>
                <span className="mega-card-icon"><Icon size={20} strokeWidth={1.65} aria-hidden="true" /></span>
                <span><strong>{title}</strong><small>{description}</small></span>
                <ArrowRight size={17} aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>

        <div className={`mobile-menu${mobileOpen ? " is-open" : ""}`} aria-hidden={!mobileOpen}>
          <span>Navigate</span>
          <Link href="/#product" onClick={closeAll}><LayoutDashboard size={17} aria-hidden="true" /> Product <ArrowRight size={15} aria-hidden="true" /></Link>
          <Link href="/#demo" onClick={closeAll}><Play size={17} aria-hidden="true" /> Demo <ArrowRight size={15} aria-hidden="true" /></Link>
          <Link href="/docs" onClick={closeAll}><BookOpenText size={17} aria-hidden="true" /> Documentation <ArrowRight size={15} aria-hidden="true" /></Link>
          <Link href="/policies" onClick={closeAll}><ShieldCheck size={17} aria-hidden="true" /> Policies & trust <ArrowRight size={15} aria-hidden="true" /></Link>
        </div>
      </div>
    </header>
  );
}

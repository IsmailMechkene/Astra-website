"use client";

import Link from "next/link";
import { useEffect } from "react";
import { SiteHeader } from "./site-header";

const releaseUrl = process.env.NEXT_PUBLIC_ASTRA_DOWNLOAD_URL ?? "#download";

function Mark() { return <span className="astra-mark" aria-hidden="true"><img src="/astra_logo.svg" alt="" /></span>; }

export function HomeExperience() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main className="site-home">
    <SiteHeader />

    <section className="hero hero-redesign shell">
      <div className="hero-signal" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-copy">
        <div className="hero-brand hero-enter hero-enter-1"><span className="hero-brand-mark"><img src="/astra_logo.svg" alt="" /></span><span>ASTRA</span><i /><small>LOCAL SYSTEM INTELLIGENCE</small></div>
        <h1 className="hero-enter hero-enter-2">Understand your PC.</h1>
        <p className="lede hero-enter hero-enter-3">Ask Astra what is happening. Get a clear answer grounded in live system evidence.</p>
        <div className="hero-actions hero-enter hero-enter-4"><a className="button" href={releaseUrl}>Download for Windows <span>↓</span></a><a className="text-link" href="#demo">See how it works <span>↘</span></a></div>
        <p className="hero-credibility hero-enter hero-enter-5">Read-only <i /> Local-first <i /> Windows 10/11</p>
      </div>

      <figure className="hero-product-shot hero-enter hero-enter-4">
        <img src="/hero.png" alt="Astra desktop application showing live PC vitals, local AI status, and natural-language system questions" />
        <figcaption><span><i /> ACTUAL ASTRA INTERFACE</span><span>Local model · Read-only access</span></figcaption>
      </figure>
    </section>

    <section className="signal-strip" aria-label="Astra product principles"><div className="signal-track"><span>READ THE SIGNALS</span><i /><span>EXPLAIN THE EVIDENCE</span><i /><span>ASK BEFORE ACTION</span><i /><span>KEEP A LOCAL AUDIT TRAIL</span><i /><span>READ THE SIGNALS</span></div></section>

    <section id="product" className="product-story shell" data-reveal><div className="section-intro"><p className="eyebrow">THE SYSTEM, IN CONTEXT</p><h2>Evidence, not alerts.</h2><p>The overview keeps live vitals, active processes, storage pressure, and the selected AI provider visible while you ask questions.</p></div>
      <div className="product-proof-grid">
        <article><span>01</span><h3>Live readings</h3><p>CPU, memory, disk, uptime, and process activity stay visible beside the conversation.</p></article>
        <article><span>02</span><h3>Named sources</h3><p>Every answer can show the local checks Astra used, rather than asking you to trust a score.</p></article>
        <article><span>03</span><h3>Approval first</h3><p>Observation is read-only. Anything that changes Windows requires a clear confirmation.</p></article>
      </div>
    </section>

    <section id="demo" className="demo-section product-evidence-section" data-reveal><div className="shell demo-header"><div><p className="eyebrow">CONVERSATIONAL DIAGNOSIS</p><h2>Ask naturally.<br />Inspect the proof.</h2></div><p>Astra answers in plain language, then exposes the local readings behind that answer—source by source.</p></div>
      <figure className="shell evidence-screen diagnosis-screen">
        <img src="/Ask_naturally_section.png" loading="lazy" decoding="async" alt="Astra answering a system overview question and listing the six local read-only checks used" />
        <figcaption><span>REAL ASTRA CONVERSATION</span><p>Six local reads. One direct answer. The reasoning boundary stays visible.</p></figcaption>
      </figure>
    </section>

    <section id="trust" className="trust-section trust-evidence shell" data-reveal><div className="trust-heading"><p className="eyebrow amber">YOUR MACHINE. YOUR BOUNDARIES.</p><h2>Privacy you can see.</h2><p>The provider choice, every readable system category, and the approval lock are explicit inside Astra—not buried in policy copy.</p><div className="trust-points"><span>Local Ollama or hosted Groq</span><span>Read-only system categories</span><span>Confirmation locked on</span></div><Link className="text-link" href="/policies">Read the trust model <span>→</span></Link></div>
      <figure className="evidence-screen privacy-screen"><img src="/Privacy_trust_section.png" loading="lazy" decoding="async" alt="Astra permissions screen showing Ollama and Groq provider choices, read-only system access, and confirmation controls" /><figcaption><span>ACTUAL PERMISSIONS SCREEN</span><p>The boundary is part of the product.</p></figcaption></figure>
    </section>

    <section id="download" className="download-section shell" data-reveal><div className="download-signal"><Mark /><span>READY WHEN YOU ARE</span></div><div><p className="eyebrow">ASTRA FOR WINDOWS</p><h2>Understand first.<br /><em>Then decide.</em></h2></div><div className="download-action"><a className="button" href={releaseUrl}>Download Astra <span>↓</span></a><p>Version 1.0.0 · Windows x64<br />Local diagnostics · Free download</p></div></section>

    <footer className="site-footer shell"><div><Link className="brand" href="/"><Mark />ASTRA</Link><p>System intelligence for Windows.</p></div><div><span>PRODUCT</span><a href="#demo">Demo</a><Link href="/docs">Documentation</Link></div><div><span>TRUST</span><Link href="/policies">Policies</Link><Link href="/docs#privacy">Local diagnostics</Link></div><p>© {new Date().getFullYear()} ASTRA</p></footer>
  </main>;
}

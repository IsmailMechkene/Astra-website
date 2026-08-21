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
        <img src="/hero.png" width={1536} height={1024} alt="Astra desktop application showing live PC vitals, local AI status, and natural-language system questions" />
        <figcaption><span><i /> ACTUAL ASTRA INTERFACE</span><span>Local model · Read-only access</span></figcaption>
      </figure>
    </section>

    <section className="editorial-bridge shell" data-reveal>
      <div><p className="eyebrow">BUILT FOR UNDERSTANDING</p><span className="editorial-index">01 — PHILOSOPHY</span></div>
      <p className="editorial-statement">Most system tools start with a warning. Astra starts with a question.</p>
    </section>

    <section id="product" className="product-story editorial-product shell" data-reveal>
      <div className="editorial-product-lead"><p className="eyebrow">THE SYSTEM, IN CONTEXT</p><h2>Evidence,<br />not alerts.</h2></div>
      <div className="editorial-product-body"><p className="product-thesis">The overview keeps live vitals, active processes, storage pressure, and the selected AI provider visible while you ask questions.</p><div className="product-proof-grid">
        <article><span>01</span><h3>Live readings</h3><p>CPU, memory, disk, uptime, and process activity stay visible beside the conversation.</p></article>
        <article><span>02</span><h3>Named sources</h3><p>Every answer can show the local checks Astra used, rather than asking you to trust a score.</p></article>
        <article><span>03</span><h3>Approval first</h3><p>Observation is read-only. Anything that changes Windows requires a clear confirmation.</p></article>
      </div></div>
    </section>

    <section id="demo" className="demo-section product-evidence-section" data-reveal><div className="shell demo-header"><div><p className="eyebrow">CONVERSATIONAL DIAGNOSIS</p><h2>Ask naturally.<br />Inspect the proof.</h2></div><p>Astra answers in plain language, then exposes the local readings behind that answer—source by source.</p></div>
      <figure className="shell evidence-screen diagnosis-screen">
        <img src="/Ask_naturally_section.png" width={1536} height={1024} loading="lazy" decoding="async" alt="Astra answering a system overview question and listing the six local read-only checks used" />
        <figcaption><span>REAL ASTRA CONVERSATION</span><p>Six local reads. One direct answer. The reasoning boundary stays visible.</p></figcaption>
      </figure>
    </section>

    <section id="how" className="how-section shell" data-reveal>
      <div className="how-intro"><p className="eyebrow">HOW ASTRA WORKS</p><h2>From question<br />to evidence.</h2><p>Astra keeps the workflow visible, so you always know what it read and how it reached an answer.</p></div>
      <ol className="how-steps">
        <li><span>01</span><div><h3>Ask in plain language</h3><p>Describe what feels wrong or ask for a direct system check. No command syntax required.</p></div></li>
        <li><span>02</span><div><h3>Astra reads locally</h3><p>Only the relevant Windows signals are collected, using read-only diagnostics on your machine.</p></div></li>
        <li><span>03</span><div><h3>Get the answer and proof</h3><p>Astra explains what it found and names the readings behind the conclusion.</p></div></li>
      </ol>
    </section>

    <section id="trust" className="trust-section trust-evidence shell" data-reveal><div className="trust-heading"><p className="eyebrow amber">YOUR MACHINE. YOUR BOUNDARIES.</p><h2>Privacy you can see.</h2><p>The provider choice, every readable system category, and the approval lock are explicit inside Astra—not buried in policy copy.</p><div className="trust-facts"><p><strong>Readings stay on your PC.</strong><span>System information is gathered and assembled locally.</span></p><p><strong>You choose the reasoning provider.</strong><span>Use Ollama on-device or connect Groq with your own key.</span></p><p><strong>Changes always need approval.</strong><span>Read-only is the default; action requires your confirmation.</span></p></div><Link className="text-link" href="/policies">Read the trust model <span>→</span></Link></div>
      <figure className="evidence-screen privacy-screen"><img src="/Privacy_trust_section.png" width={1536} height={1024} loading="lazy" decoding="async" alt="Astra permissions screen showing Ollama and Groq provider choices, read-only system access, and confirmation controls" /><figcaption><span>ACTUAL PERMISSIONS SCREEN</span><p>The boundary is part of the product.</p></figcaption></figure>
    </section>

    <section id="download" className="download-section download-proof shell" data-reveal>
      <div className="download-top"><div><p className="eyebrow">ASTRA FOR WINDOWS</p><h2>Understand first.<br /><em>Then decide.</em></h2></div><div className="download-action"><a className="button" href={releaseUrl}>Download Astra <span>↓</span></a><p>Version 1.0.0 · Windows x64 · Free</p></div></div>
      <div className="download-details">
        <article><span>LATEST RELEASE</span><h3>Version 1.0.0</h3><ul><li>Natural-language system diagnosis</li><li>Local evidence attached to answers</li><li>Ollama and Groq provider choice</li></ul></article>
        <article><span>SYSTEM REQUIREMENTS</span><h3>Windows desktop</h3><ul><li>Windows 10 or Windows 11</li><li>64-bit processor</li><li>Ollama optional for local reasoning</li></ul></article>
        <article className="security-reassurance"><span>SECURITY REASSURANCE</span><h3>Nothing changes silently.</h3><p>Diagnostics are read-only. Any future action that modifies Windows must be shown to you and explicitly approved first.</p><Link href="/policies">Review the trust model <b>→</b></Link></article>
      </div>
    </section>

    <footer className="site-footer shell"><div><Link className="brand" href="/"><Mark />ASTRA</Link><p>System intelligence for Windows.</p></div><div><span>PRODUCT</span><a href="#demo">Demo</a><Link href="/docs">Documentation</Link></div><div><span>TRUST</span><Link href="/policies">Policies</Link><Link href="/docs#privacy">Local diagnostics</Link></div><p>© {new Date().getFullYear()} ASTRA</p></footer>
  </main>;
}

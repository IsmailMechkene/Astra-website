"use client";

import Link from "next/link";
import { ArrowDownRight, ArrowRight, ArrowUpRight, Code2, Download } from "lucide-react";
import { useEffect } from "react";
import { astraRelease } from "./release";
import { SiteHeader } from "./site-header";

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
        <div className="hero-actions hero-enter hero-enter-4"><a className="button" href={astraRelease.downloadUrl}>Download for Windows <Download size={15} strokeWidth={1.9} aria-hidden="true" /></a><a className="text-link" href="#how">See how it works <ArrowDownRight size={15} strokeWidth={1.8} aria-hidden="true" /></a></div>
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

    <section id="evidence" className="demo-section product-evidence-section" data-reveal><div className="shell demo-header"><div><p className="eyebrow">REAL PRODUCT EVIDENCE</p><h2>Ask naturally.<br />Inspect the proof.</h2></div><p>This is the actual Astra interface: a plain-language answer with every local reading used to reach it shown source by source.</p></div>
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

    <section id="trust" className="trust-section trust-text-only shell" data-reveal>
      <div className="trust-editorial-lead">
        <p className="eyebrow amber">TRUST BY INSPECTION</p>
        <h2>Clear boundaries.<br />Verifiable behavior.</h2>
        <p>Astra does not ask for blind trust. Its access model, provider boundary, credential storage, and current limitations are documented plainly.</p>
        <div className="trust-links"><Link className="text-link" href="/docs#privacy">Privacy & security <ArrowRight size={15} strokeWidth={1.8} aria-hidden="true" /></Link><a className="text-link secondary" href="https://github.com/IsmailMechkene/Astra" target="_blank" rel="noreferrer">Inspect the source <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" /></a></div>
      </div>
      <div className="trust-guarantees">
        <article><span>01 / ACCESS</span><div><h3>Diagnostics observe. They do not act.</h3><p>Astra 1.0.0 reads system evidence. It does not delete files, end processes, change settings, or install updates.</p></div><em>READ-ONLY</em></article>
        <article><span>02 / BOUNDARY</span><div><h3>The data boundary follows your choice.</h3><p>Ollama keeps prompts and evidence local. Groq receives only the prompt and readings selected for hosted reasoning.</p></div><em>OLLAMA / GROQ</em></article>
        <article><span>03 / IDENTITY</span><div><h3>No Astra account. No telemetry layer.</h3><p>The current release has no Astra analytics, advertising, account, or hosted proxy service.</p></div><em>NO ACCOUNT</em></article>
      </div>
      <div className="trust-proof-strip"><div><span>01</span><p><strong>OS-backed key storage</strong>Groq credentials use Electron safeStorage on Windows.</p></div><div><span>02</span><p><strong>Explicit provider choice</strong>The reasoning location is visible and user-selected.</p></div><div><span>03</span><p><strong>Public implementation</strong>The application source can be inspected on GitHub.</p></div></div>
    </section>

    <section id="opensource" className="open-source-section shell" data-reveal>
      <div className="open-source-intro"><p className="eyebrow">OPEN SOURCE / COMMUNITY</p><h2>Astra is built<br />in public.</h2><p>The repository is public on GitHub. Read how Astra works, report a reproducible problem, or propose a focused improvement.</p><div className="open-source-actions"><a className="oss-primary" href="https://github.com/IsmailMechkene/Astra" target="_blank" rel="noreferrer"><Code2 size={17} aria-hidden="true" />View repository<ArrowUpRight size={15} aria-hidden="true" /></a><a className="text-link" href="https://github.com/IsmailMechkene/Astra/issues" target="_blank" rel="noreferrer">Report an issue <ArrowUpRight size={15} strokeWidth={1.8} aria-hidden="true" /></a></div></div>
      <div className="contribution-list"><article><span>01 / INSPECT</span><div><h3>Read the implementation.</h3><p>Review the desktop frontend, diagnostic backend, and experiments directly in the public repository.</p></div></article><article><span>02 / REPORT</span><div><h3>Bring reproducible evidence.</h3><p>Open an issue with the Astra version, Windows version, exact symptom, and the relevant diagnostic output.</p></div></article><article><span>03 / CONTRIBUTE</span><div><h3>Propose one focused change.</h3><p>Improve a diagnostic, clarify documentation, strengthen privacy, or make the interface more accessible.</p></div></article></div>
      <a className="repository-signature" href="https://github.com/IsmailMechkene/Astra" target="_blank" rel="noreferrer"><span><Code2 size={16} aria-hidden="true" />github.com/IsmailMechkene/Astra</span><span>PUBLIC REPOSITORY <ArrowUpRight size={14} aria-hidden="true" /></span></a>
    </section>

    <section id="download" className="download-section download-proof shell" data-reveal>
      <div className="download-top"><div><p className="eyebrow">ASTRA FOR WINDOWS</p><h2>Understand first.<br /><em>Then decide.</em></h2></div><div className="download-action"><a className="button" href={astraRelease.downloadUrl}>Download Astra <Download size={16} strokeWidth={1.9} aria-hidden="true" /></a><p>Version {astraRelease.version} · Windows x64 · Free</p><a className="release-notes-link" href={astraRelease.notesUrl} target="_blank" rel="noreferrer">Release notes &amp; checksum <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" /></a></div></div>
      <div className="download-details">
        <article><span>LATEST RELEASE</span><h3>Version {astraRelease.version}</h3><ul><li>Natural-language system diagnosis</li><li>Local evidence attached to answers</li><li>Ollama and Groq provider choice</li></ul></article>
        <article><span>SYSTEM REQUIREMENTS</span><h3>Windows desktop</h3><ul><li>Windows 10 or Windows 11</li><li>64-bit processor</li><li>Ollama optional for local reasoning</li></ul></article>
        <article className="security-reassurance"><span>SECURITY REASSURANCE</span><h3>Nothing changes silently.</h3><p>Diagnostics are read-only. Any future action that modifies Windows must be shown to you and explicitly approved first.</p><Link href="/policies">Review the trust model <ArrowRight size={14} strokeWidth={1.8} aria-hidden="true" /></Link></article>
      </div>
    </section>

    <footer className="site-footer shell"><div><Link className="brand" href="/"><Mark />ASTRA</Link><p>System intelligence for Windows.</p></div><div><span>PRODUCT</span><a href="#how">How it works</a><Link href="/docs">Documentation</Link></div><div><span>COMMUNITY</span><a href="https://github.com/IsmailMechkene/Astra" target="_blank" rel="noreferrer">GitHub</a><Link href="/docs#privacy">Trust & privacy</Link></div><p>© {new Date().getFullYear()} ASTRA</p></footer>
  </main>;
}

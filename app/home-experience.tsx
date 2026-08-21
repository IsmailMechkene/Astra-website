"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { SiteHeader } from "./site-header";

const releaseUrl = process.env.NEXT_PUBLIC_ASTRA_DOWNLOAD_URL ?? "#download";

const scenarios = [
  { label: "Memory pressure", question: "What is using all my memory?", answer: "Chrome and Docker account for 5.5 GB together. Memory pressure is elevated, but the system is still responsive.", metric: "68%", metricLabel: "MEMORY USED", evidence: ["Chrome · 3.1 GB", "Docker · 2.4 GB", "Available · 10.2 GB"] },
  { label: "Slow startup", question: "Why does startup feel slow?", answer: "Four high-impact apps launch when you sign in. Disabling two optional launchers could reduce background work.", metric: "4", metricLabel: "HIGH IMPACT", evidence: ["Discord · 2.8s", "Steam · 2.2s", "Docker · 4.1s"] },
  { label: "Security check", question: "Is this PC protected?", answer: "Windows Defender and Firewall are active. Security definitions are current and no immediate action is needed.", metric: "ON", metricLabel: "PROTECTION", evidence: ["Firewall · Active", "Defender · Active", "Definitions · Current"] },
];

function Mark() { return <span className="astra-mark" aria-hidden="true"><img src="/astra_logo.svg" alt="" /></span>; }

export function HomeExperience() {
  const [scenario, setScenario] = useState(0);

  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>("[data-reveal]");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.14 });
    elements.forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  const current = scenarios[scenario];

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

    <section id="product" className="product-story shell" data-reveal><div className="section-intro"><p className="eyebrow">A DIFFERENT KIND OF SYSTEM TOOL</p><h2>Clarity before cleanup.</h2><p>Astra does not open with a warning wall or a giant “fix everything” button. It starts with what is happening, why it matters, and what you can do next.</p></div>
      <div className="principle-grid"><article className="principle-card card-large"><span className="card-index">01</span><div className="card-visual observation-visual"><i /><i /><i /><i /><i /><i /><i /><i /></div><h3>Observe the whole system</h3><p>CPU, memory, processes, storage, network, battery, updates, and security—organized around the question you asked.</p><a href="#demo">Explore a diagnosis <span>→</span></a></article>
        <article className="principle-card"><span className="card-index">02</span><div className="explain-visual"><b>68%</b><span>Memory pressure</span><i /></div><h3>Explain, don’t alarm</h3><p>Technical evidence translated into a calm, useful answer.</p></article>
        <article className="principle-card"><span className="card-index">03</span><div className="approval-visual"><span>PROPOSED ACTION</span><b>Review before anything runs.</b><div><i>Cancel</i><i>Approve</i></div></div><h3>Keep you in control</h3><p>Read-only by default. Explicit approval before any system change.</p></article></div>
    </section>

    <section id="demo" className="demo-section" data-reveal><div className="shell demo-header"><div><p className="eyebrow">INTERACTIVE DIAGNOSIS</p><h2>Ask naturally.<br />See the evidence.</h2></div><p>Choose a question to see how Astra turns scattered Windows signals into an answer you can act on.</p></div>
      <div className="shell demo-console"><div className="scenario-list" role="tablist" aria-label="Diagnostic scenarios">{scenarios.map((item, index) => <button key={item.label} className={scenario === index ? "active" : ""} onClick={() => setScenario(index)} role="tab" aria-selected={scenario === index}><span>0{index + 1}</span><b>{item.label}</b><i>→</i></button>)}</div>
        <div className="diagnosis" key={scenario}><div className="diagnosis-query"><small>YOU ASKED</small><p>{current.question}</p></div><div className="diagnosis-answer"><div className="agent-mark">A</div><div><small>ASTRA · ANALYSIS COMPLETE</small><p>{current.answer}</p></div></div><div className="diagnosis-evidence"><div className="big-metric"><small>{current.metricLabel}</small><strong>{current.metric}</strong><span>LIVE READING</span></div><div className="evidence-list">{current.evidence.map((item) => <span key={item}>{item}<i /></span>)}</div></div><footer><span><i /> Read-only inspection complete</span><button onClick={() => setScenario((value) => (value + 1) % scenarios.length)}>Next diagnosis →</button></footer></div></div>
    </section>

    <section id="trust" className="trust-section shell" data-reveal><div className="trust-heading"><p className="eyebrow amber">YOUR MACHINE. YOUR BOUNDARIES.</p><h2>Local at the core.</h2><p>System readings happen on your device. You choose where reasoning happens—and Astra makes that boundary visible.</p><Link className="text-link" href="/policies">Read the trust model <span>→</span></Link></div>
      <div className="trust-diagram"><div className="trust-node machine"><span>01</span><b>YOUR PC</b><small>Signals inspected locally</small></div><div className="trust-path"><i /><span>READ-ONLY</span><i /></div><div className="trust-node astra"><span>02</span><b>ASTRA</b><small>Context assembled locally</small></div><div className="provider-split"><div><i /><b>OLLAMA</b><small>On-device reasoning</small></div><div><i /><b>GROQ</b><small>Optional hosted reasoning</small></div></div></div>
    </section>

    <section id="download" className="download-section shell" data-reveal><div className="download-signal"><Mark /><span>READY WHEN YOU ARE</span></div><div><p className="eyebrow">ASTRA FOR WINDOWS</p><h2>Understand first.<br /><em>Then decide.</em></h2></div><div className="download-action"><a className="button" href={releaseUrl}>Download Astra <span>↓</span></a><p>Version 1.0.0 · Windows x64<br />Local diagnostics · Free download</p></div></section>

    <footer className="site-footer shell"><div><Link className="brand" href="/"><Mark />ASTRA</Link><p>System intelligence for Windows.</p></div><div><span>PRODUCT</span><a href="#demo">Demo</a><Link href="/docs">Documentation</Link></div><div><span>TRUST</span><Link href="/policies">Policies</Link><Link href="/docs#privacy">Local diagnostics</Link></div><p>© {new Date().getFullYear()} ASTRA</p></footer>
  </main>;
}

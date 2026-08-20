"use client";

import Link from "next/link";
import { type CSSProperties, useEffect, useState } from "react";
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

  const movePreview = (event: React.PointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    event.currentTarget.style.setProperty("--tilt-x", `${y * -1.4}deg`);
    event.currentTarget.style.setProperty("--tilt-y", `${x * 2}deg`);
  };
  const resetPreview = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--tilt-x", "0deg");
    event.currentTarget.style.setProperty("--tilt-y", "0deg");
  };
  const current = scenarios[scenario];

  return <main className="site-home">
    <SiteHeader />

    <section className="hero shell">
      <div className="hero-signal" aria-hidden="true"><span /><span /><span /></div>
      <div className="hero-logo-watermark" aria-hidden="true"><img src="/astra_logo.svg" alt="" /></div>
      <div className="hero-copy">
        <p className="eyebrow hero-enter hero-enter-1"><span className="live-dot" />LOCAL SYSTEM INTELLIGENCE · WINDOWS</p>
        <h1 className="hero-enter hero-enter-2">Your PC is talking.<br /><em>Astra translates.</em></h1>
        <p className="lede hero-enter hero-enter-3">Ask a real question. Astra inspects the relevant signals on your machine and gives you a clear, evidence-backed answer—without taking control away from you.</p>
        <div className="hero-actions hero-enter hero-enter-4"><a className="button" href={releaseUrl}>Download for Windows <span>↓</span></a><a className="text-link" href="#demo">Run the demo <span>↘</span></a></div>
        <div className="hero-proof hero-enter hero-enter-5"><span>Windows 10 / 11</span><span>Read-only by default</span><span>Your AI, your choice</span></div>
      </div>

      <div className="hero-product hero-enter hero-enter-4" onPointerMove={movePreview} onPointerLeave={resetPreview} style={{ "--tilt-x": "0deg", "--tilt-y": "0deg" } as CSSProperties}>
        <div className="orbit orbit-one" /><div className="orbit orbit-two" />
        <div className="desktop-window">
          <div className="window-chrome"><span><Mark /> ASTRA</span><span className="window-online"><i /> LOCAL ONLINE</span><span className="window-controls">— · □ · ×</span></div>
          <div className="window-layout">
            <aside className="app-sidebar"><b><Mark /> ASTRA</b><small>SYSTEM INTELLIGENCE</small><div className="app-search">⌕ Search <kbd>⌘K</kbd></div><nav><span className="active">◉ Overview</span><span>▣ Conversation</span><span>▤ Processes</span><span>⌁ Performance</span><span>◇ Storage</span><span>⬡ Security</span></nav><footer><i /> Protected locally</footer></aside>
            <div className="app-workspace"><div className="app-topline"><span>Overview<small>Live health and observations</small></span><span className="model-pill">qwen3:4b</span></div>
              <div className="app-content"><p className="mini-label">SYSTEM OVERVIEW</p><h3>Good afternoon.</h3><p>Your system is stable. Astra is observing in read-only mode.</p>
                <div className="assessment"><span className="pulse-glyph"><i /><i /><i /></span><div><small>ASTRA ASSESSMENT</small><b>No immediate issues need attention.</b></div><em>NORMAL</em></div>
                <div className="metric-row"><Metric label="CPU" value="24%" bars={[3,4,4,6,9,7,11,8]} /><Metric label="MEMORY" value="68%" fill={68} /><Metric label="DISK" value="72%" fill={72} /><Metric label="NETWORK" value="18.4" detail="MBPS" /></div>
                <div className="notice-list"><strong>Astra noticed</strong><span><i>01</i><b>Memory pressure</b><small>Within the expected range</small></span><span><i>02</i><b>Security</b><small>Protection is active</small></span></div>
              </div>
            </div>
          </div>
        </div><div className="preview-caption"><span>LIVE PRODUCT PREVIEW</span><span>Move cursor to inspect</span></div>
      </div>
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

    <section className="trust-section shell" data-reveal><div className="trust-heading"><p className="eyebrow amber">YOUR MACHINE. YOUR BOUNDARIES.</p><h2>Local at the core.</h2><p>System readings happen on your device. You choose where reasoning happens—and Astra makes that boundary visible.</p><Link className="text-link" href="/policies">Read the trust model <span>→</span></Link></div>
      <div className="trust-diagram"><div className="trust-node machine"><span>01</span><b>YOUR PC</b><small>Signals inspected locally</small></div><div className="trust-path"><i /><span>READ-ONLY</span><i /></div><div className="trust-node astra"><span>02</span><b>ASTRA</b><small>Context assembled locally</small></div><div className="provider-split"><div><i /><b>OLLAMA</b><small>On-device reasoning</small></div><div><i /><b>GROQ</b><small>Optional hosted reasoning</small></div></div></div>
    </section>

    <section id="download" className="download-section shell" data-reveal><div className="download-signal"><Mark /><span>READY WHEN YOU ARE</span></div><div><p className="eyebrow">ASTRA FOR WINDOWS</p><h2>Understand first.<br /><em>Then decide.</em></h2></div><div className="download-action"><a className="button" href={releaseUrl}>Download Astra <span>↓</span></a><p>Version 1.0.0 · Windows x64<br />Local diagnostics · Free download</p></div></section>

    <footer className="site-footer shell"><div><Link className="brand" href="/"><Mark />ASTRA</Link><p>System intelligence for Windows.</p></div><div><span>PRODUCT</span><a href="#demo">Demo</a><Link href="/docs">Documentation</Link></div><div><span>TRUST</span><Link href="/policies">Policies</Link><Link href="/docs#privacy">Local diagnostics</Link></div><p>© {new Date().getFullYear()} ASTRA</p></footer>
  </main>;
}

function Metric({ label, value, fill, detail, bars }: { label: string; value: string; fill?: number; detail?: string; bars?: number[] }) {
  return <div className="app-metric"><small>{label}</small><strong>{value}</strong>{detail && <em>{detail}</em>}{bars ? <span className="tiny-bars">{bars.map((height, index) => <i key={index} style={{ height: `${height}px` }} />)}</span> : <span className="tiny-meter"><i style={{ width: `${fill ?? 0}%` }} /></span>}</div>;
}

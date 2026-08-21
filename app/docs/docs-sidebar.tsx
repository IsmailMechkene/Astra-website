"use client";

import { useEffect, useState } from "react";

const groups = [
  ["GETTING STARTED", [["quick-start", "Quick start"], ["download", "Download & verify"], ["requirements", "Requirements"], ["install", "Install & first launch"]]],
  ["CONFIGURATION", [["providers", "Reasoning providers"], ["ollama", "Ollama setup"], ["groq", "Groq setup"]]],
  ["USING ASTRA", [["using-astra", "Core workflow"], ["prompts", "Example prompts"], ["capabilities", "What Astra inspects"]]],
  ["REFERENCE", [["privacy", "Privacy & security"], ["limitations", "Current limitations"], ["troubleshooting", "Troubleshooting"], ["uninstall", "Uninstall"], ["faq", "FAQ"]]],
] as const;

export function DocsSidebar() {
  const [active, setActive] = useState("quick-start");

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".docs-section[id]")];
    const updateFromHash = () => location.hash && setActive(location.hash.slice(1));
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setActive(visible[0].target.id);
    }, { rootMargin: "-12% 0px -72% 0px", threshold: 0 });
    sections.forEach((section) => observer.observe(section));
    window.addEventListener("hashchange", updateFromHash);
    updateFromHash();
    return () => { observer.disconnect(); window.removeEventListener("hashchange", updateFromHash); };
  }, []);

  return (
    <aside className="docs-sidebar">
      <div className="docs-version"><span>ASTRA MANUAL</span><strong>v1.0.0</strong><small>Verified 21 Aug 2026</small></div>
      <nav aria-label="Documentation sections">
        {groups.map(([label, links]) => <div className="docs-nav-group" key={label}><p>{label}</p>{links.map(([id, title]) => <a className={active === id ? "is-active" : undefined} aria-current={active === id ? "location" : undefined} href={`#${id}`} key={id}>{title}</a>)}</div>)}
      </nav>
    </aside>
  );
}

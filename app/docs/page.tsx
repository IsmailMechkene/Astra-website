import Link from "next/link";
import { SiteHeader } from "../site-header";
import { DocsSidebar } from "./docs-sidebar";

export const metadata = {
  title: "Documentation — Astra",
  description: "Complete setup, usage, privacy, and troubleshooting documentation for Astra 1.0.0 on Windows.",
};

const capabilities = [
  ["CPU", "Overall load and per-core utilization."],
  ["Memory", "Used, total, available, and memory-pressure percentage."],
  ["Processes", "Heavy processes with PID, user, CPU, memory, status, signature, and scan information when Windows provides it."],
  ["Startup & uptime", "Common startup registry entries, boot time, and time since restart."],
  ["Storage", "Partition usage, temporary-storage inventory, and bounded scans for large or old files."],
  ["Disk health", "Windows-reported physical-disk, volume, media-type, capacity, and filesystem health."],
  ["Security & updates", "Microsoft Defender, firewall, update history, and restart-required status when available."],
  ["Network", "Interfaces, addresses, active connections, DNS, gateway, Wi-Fi signal, and a gateway reachability check."],
  ["Battery", "Charge, design capacity, full-charge capacity, wear, and cycle count when available."],
  ["Reliability", "Grouped Windows Application event-log errors and warnings."],
];

const promptGroups: [string, string[]][] = [
  ["Performance", ["Why does my PC feel slow?", "What is using my CPU right now?", "Which processes use the most memory?", "Is memory pressure causing the slowdown?"]],
  ["Storage", ["Which drive is closest to full?", "What is filling my C: drive?", "Find the largest files in my Downloads folder.", "Which large files have not been used for 12 months?"]],
  ["Security & updates", ["Is Windows Defender active?", "Is my firewall enabled?", "When did Windows Update last complete?", "Is a restart required after updates?"]],
  ["Network & reliability", ["Can this PC reach its default gateway?", "What DNS servers am I using?", "Summarize application errors from the last seven days.", "Are the same crash events repeating?"]],
];

const troubleshooting = [
  ["The installer does not open", "Confirm the file is an .exe rather than an HTML page or partial download. Check its filename, size, and SHA-256 value against the release record below. Re-download from the official Astra source if the hash differs, and check Windows Security protection history for a block or quarantine event."],
  ["Astra opens and immediately closes", "Reinstall from a verified installer and check whether Windows Security quarantined astra-backend.exe. The packaged release starts its own backend and does not require Python, uvicorn, or Node.js. When reporting the problem, include the Astra version, Windows version, exact message, and relevant Windows Application event."],
  ["The local backend is unavailable", "Use Retry once. If the issue persists, close Astra completely and reopen it. The packaged app selects a private local port and manages the backend automatically."],
  ["Ollama server is not running", "Launch Ollama from the Start menu, then run ollama list to confirm it responds. A manually managed installation can use ollama serve. Do not start a second server if Ollama already listens on port 11434."],
  ["The Ollama model is not downloaded", "Run ollama pull qwen3:4b, confirm qwen3:4b appears in ollama list, then retry the prompt."],
  ["Groq says no API key is supplied", "Open Permissions → Groq API key, paste a valid key, and select Save. Switch to Ollama if you do not want hosted reasoning."],
  ["Groq rejects the key or is rate-limited", "Check that the key was copied without spaces, belongs to the correct project, and has not been revoked. For quotas or an outage, wait and retry, review GroqCloud usage, or switch to Ollama."],
  ["A diagnostic value is missing", "This can be normal. Battery, disk-health, Wi-Fi, Defender, update, and event-log data depend on the machine and Windows configuration. Ask Astra which reading was unavailable and what can still be concluded without it."],
  ["The response is slow", "Local speed depends on CPU, GPU, RAM, model state, and current system load. Close memory-heavy apps, keep Ollama and graphics drivers current, or use Groq when hosted reasoning is acceptable."],
  ["The answer looks incorrect", "Review the disclosed tools and confirm the answer cites values present in their results. Ask a narrower follow-up with a specific drive, folder, symptom, or date range. Independently confirm any high-impact diagnosis."],
];

function CodeBlock({ children }: { children: string }) {
  return <pre className="docs-code"><code>{children}</code></pre>;
}

export default function Docs() {
  return (
    <main className="docs-page">
      <SiteHeader />
      <div className="shell docs-layout docs-manual">
        <DocsSidebar />

        <article className="docs-article">
          <header className="docs-hero">
            <p className="eyebrow">ASTRA DOCUMENTATION</p>
            <h1>Understand the machine.<br /><em>Keep control.</em></h1>
            <p className="docs-lede">A complete guide to installing Astra, choosing where reasoning runs, asking useful diagnostic questions, and understanding exactly what the app can access.</p>
            <div className="docs-meta"><span>VERSION 1.0.0</span><span>WINDOWS X64</span><span>READ-ONLY</span></div>
          </header>

          <details className="docs-mobile-toc">
            <summary>On this page</summary>
            <div><a href="#quick-start">Quick start</a><a href="#providers">Providers</a><a href="#using-astra">Using Astra</a><a href="#capabilities">Capabilities</a><a href="#privacy">Privacy</a><a href="#troubleshooting">Troubleshooting</a><a href="#faq">FAQ</a></div>
          </details>

          <section id="quick-start" className="docs-section">
            <div className="docs-section-label"><span>01</span><p>QUICK START</p></div>
            <div className="docs-section-body"><h2>From installer to first answer.</h2><ol className="docs-steps"><li><span>01</span><div><strong>Install Astra</strong><p>Download the Windows x64 installer, verify its checksum, and complete the installer.</p></div></li><li><span>02</span><div><strong>Choose a provider</strong><p>Open Permissions and select Ollama for local reasoning or Groq for hosted reasoning.</p></div></li><li><span>03</span><div><strong>Ask one clear question</strong><p>Try “Give me a system overview.” Astra discloses the read-only checks it uses before answering.</p></div></li></ol></div>
          </section>

          <section id="download" className="docs-section">
            <div className="docs-section-label"><span>02</span><p>DOWNLOAD</p></div>
            <div className="docs-section-body"><h2>Download and verify.</h2><p>Only use an installer linked from the official Astra website. The first public release is unsigned, so Windows may identify its publisher as unknown.</p><div className="release-record"><div><span>INSTALLER</span><strong>Astra-Setup-1.0.0-x64.exe</strong></div><div><span>VERSION</span><strong>1.0.0</strong></div><div><span>SIZE</span><strong>109.3 MiB</strong></div><div><span>SIGNATURE</span><strong>Not signed</strong></div><div className="release-hash"><span>SHA-256</span><code>443C19C0309B03B04A03AC87A7CF8C52E3DE4DFAE78B8DAFCE2810487ABA7678</code></div></div><p>Calculate the file hash in PowerShell and compare every character with the value above:</p><CodeBlock>{"Get-FileHash .\\Astra-Setup-1.0.0-x64.exe -Algorithm SHA256"}</CodeBlock><div className="docs-note warning"><strong>Unsigned release</strong><p>If SmartScreen appears, confirm the official source and checksum before using its additional-information option to continue.</p></div><Link className="text-link" href="/#download">Go to download <span>→</span></Link></div>
          </section>

          <section id="requirements" className="docs-section">
            <div className="docs-section-label"><span>03</span><p>REQUIREMENTS</p></div>
            <div className="docs-section-body"><h2>System requirements.</h2><div className="docs-spec-grid"><div><span>OPERATING SYSTEM</span><strong>Windows 10 or 11</strong></div><div><span>ARCHITECTURE</span><strong>64-bit Intel / AMD</strong></div><div><span>APP STORAGE</span><strong>500 MiB available</strong></div><div><span>DISPLAY</span><strong>1280 × 720 minimum</strong></div><div><span>MEMORY</span><strong>8 GB recommended</strong></div><div><span>PERMISSIONS</span><strong>Standard user</strong></div></div><p>The current build does not support ARM64, Windows 7/8/8.1, macOS, or Linux. Some Windows readings may be unavailable when the OS, hardware, driver, or service does not expose them.</p><h3>Additional requirements by provider</h3><div className="provider-requirements"><article><span>OLLAMA / LOCAL</span><ul><li>Windows 10 22H2 or newer</li><li>Ollama installed separately</li><li>About 4 GB for Ollama plus 2.6 GB for <code>qwen3:4b</code></li><li>Internet needed only for installation and model download</li><li>16 GB RAM provides a better multitasking experience</li></ul></article><article><span>GROQ / HOSTED</span><ul><li>Internet access for every answer</li><li>A GroqCloud account and project</li><li>A valid project API key</li><li>Usage subject to Groq quotas and availability</li></ul></article></div></div>
          </section>

          <section id="install" className="docs-section">
            <div className="docs-section-label"><span>04</span><p>INSTALLATION</p></div>
            <div className="docs-section-body"><h2>Install and launch Astra.</h2><ol><li>Download <code>Astra-Setup-1.0.0-x64.exe</code> from the official release page.</li><li>Verify its SHA-256 checksum.</li><li>Close an older Astra instance before upgrading.</li><li>Run the installer and review the installation location.</li><li>Open Astra from Start or the desktop shortcut.</li></ol><p>You do not need Python, Node.js, FastAPI, or Electron. The packaged release contains its desktop runtime and diagnostic backend.</p><h3>What happens on first launch</h3><ol><li>Astra selects an available port in its private local range.</li><li>The bundled backend starts on <code>127.0.0.1</code>.</li><li>The desktop interface opens and begins sampling CPU, memory, and disk statistics.</li><li>You open <strong>Permissions</strong> and choose a reasoning provider.</li></ol><div className="docs-note"><strong>Local backend</strong><p>The bundled backend runs only on your machine and stops when Astra exits.</p></div></div>
          </section>

          <section id="providers" className="docs-section">
            <div className="docs-section-label"><span>05</span><p>PROVIDERS</p></div>
            <div className="docs-section-body"><h2>Choose where reasoning runs.</h2><p>Both providers use the same local, read-only diagnostic tools. The difference is where the language model receives your prompt and selected evidence.</p><div className="docs-table-wrap"><table><thead><tr><th>Setting</th><th>Ollama</th><th>Groq</th></tr></thead><tbody><tr><td>Configured model</td><td><code>qwen3:4b</code></td><td><code>openai/gpt-oss-20b</code></td></tr><tr><td>Reasoning location</td><td>Your PC</td><td>GroqCloud</td></tr><tr><td>Internet required</td><td>Setup only</td><td>Every request</td></tr><tr><td>Prompt leaves the PC</td><td>No</td><td>Yes</td></tr><tr><td>Selected readings leave the PC</td><td>No</td><td>Yes</td></tr><tr><td>Best suited for</td><td>Privacy and offline use</td><td>Speed on lower-powered PCs</td></tr></tbody></table></div><p>Switch at any time under <strong>Permissions → Reasoning backend</strong>. Provider choice does not change which diagnostics Astra can read.</p></div>
          </section>

          <section id="ollama" className="docs-section">
            <div className="docs-section-label"><span>06</span><p>OLLAMA</p></div>
            <div className="docs-section-body"><h2>Set up local reasoning.</h2><p>Astra expects Ollama at <code>http://127.0.0.1:11434</code> and currently uses <code>qwen3:4b</code>.</p><ol><li>Install Ollama from the <a href="https://docs.ollama.com/windows">official Windows guide</a>.</li><li>Open PowerShell and download Astra’s configured model.</li></ol><CodeBlock>{"ollama pull qwen3:4b"}</CodeBlock><ol start={3}><li>Confirm the model is installed.</li></ol><CodeBlock>{"ollama list"}</CodeBlock><ol start={4}><li>Open Astra, select Ollama, and ask “Give me a system overview.”</li></ol><p>The model package is approximately 2.6 GB. After Ollama and the model are installed, local reasoning can work without internet.</p></div>
          </section>

          <section id="groq" className="docs-section">
            <div className="docs-section-label"><span>07</span><p>GROQ</p></div>
            <div className="docs-section-body"><h2>Set up hosted reasoning.</h2><ol><li>Sign in to the <a href="https://console.groq.com/">GroqCloud Console</a>.</li><li>Select or create a project, then open <a href="https://console.groq.com/keys">API Keys</a>.</li><li>Create a key named for Astra and copy it immediately.</li><li>In Astra, open <strong>Permissions</strong> and select <strong>Groq — Hosted / Cloud</strong>.</li><li>Paste the key into <strong>Groq API key</strong> and select <strong>Save</strong>.</li></ol><div className="docs-note"><strong>How the key is stored</strong><p>The Electron main process encrypts the key through Windows-backed <code>safeStorage</code>. The renderer receives only whether a key exists. Clear it at any time under Permissions.</p><code>%APPDATA%\astra\astra-secrets.json</code></div><p>Never paste a key into a prompt, screenshot, support ticket, or repository. Revoke and replace it in GroqCloud if it is exposed.</p></div>
          </section>

          <section id="using-astra" className="docs-section">
            <div className="docs-section-label"><span>08</span><p>WORKFLOW</p></div>
            <div className="docs-section-body"><h2>How to use Astra.</h2><ol className="docs-steps compact"><li><span>01</span><div><strong>Ask naturally</strong><p>Describe one symptom or question. Include a drive, folder, or time range when it matters.</p></div></li><li><span>02</span><div><strong>Watch the disclosed checks</strong><p>Astra shows which read-only tools start and finish. These results are the evidence behind the response.</p></div></li><li><span>03</span><div><strong>Review the answer and evidence</strong><p>Treat the result as a supported diagnosis, not proof that every possible cause was tested.</p></div></li></ol><h3>Useful controls</h3><ul><li><strong>New conversation</strong> clears the current transcript. History is not persisted between sessions.</li><li><strong>Live status</strong> continuously samples basic CPU, memory, and disk readings.</li><li><strong>Permissions</strong> shows the provider, readable categories, confirmation policy, and Groq-key status.</li></ul></div>
          </section>

          <section id="prompts" className="docs-section">
            <div className="docs-section-label"><span>09</span><p>PROMPTS</p></div>
            <div className="docs-section-body"><h2>Questions worth asking.</h2><div className="prompt-grid">{promptGroups.map(([title, prompts]) => <article key={title}><span>{title}</span><ul>{prompts.map(prompt => <li key={prompt}>{prompt}</li>)}</ul></article>)}</div><div className="docs-note"><strong>Prompt with evidence in mind</strong><p>Describe the symptom, include timing and scope, and ask which readings support the conclusion. Ask one main diagnostic question at a time.</p></div></div>
          </section>

          <section id="capabilities" className="docs-section">
            <div className="docs-section-label"><span>10</span><p>CAPABILITIES</p></div>
            <div className="docs-section-body"><h2>What Astra can inspect.</h2><p>The current backend exposes these read-only diagnostic capabilities. Partial or unavailable data should be reported as a gap—not replaced with an invented value.</p><div className="capability-list">{capabilities.map(([area, detail], index) => <div key={area}><span>{String(index + 1).padStart(2, "0")}</span><strong>{area}</strong><p>{detail}</p></div>)}</div></div>
          </section>

          <section id="privacy" className="docs-section">
            <div className="docs-section-label"><span>11</span><p>PRIVACY</p></div>
            <div className="docs-section-body"><h2>Privacy and security boundaries.</h2><div className="privacy-statements"><article><span>READ-ONLY</span><h3>Diagnosis, not modification.</h3><p>Astra 1.0.0 does not delete files, end processes, change the registry, disable security, install updates, restart Windows, modify disks, or change network settings.</p></article><article><span>OLLAMA</span><h3>Evidence stays local.</h3><p>Collection happens on your PC. Prompts and selected evidence go only to Ollama on localhost. Internet is not needed after setup.</p></article><article><span>GROQ</span><h3>Hosted reasoning is explicit.</h3><p>Collection is local, but your prompt and the readings selected for the answer are sent to Groq. A key and internet connection are required.</p></article><article><span>CREDENTIALS</span><h3>Your key is OS-encrypted.</h3><p>Groq keys use Electron safeStorage backed by Windows. Astra has no user account or hosted proxy in this release.</p></article></div><h3>Current network connections</h3><ul><li><code>127.0.0.1</code> — bundled diagnostic backend</li><li><code>127.0.0.1:11434</code> — Ollama when local reasoning is selected</li><li><code>https://api.groq.com</code> — Groq when hosted reasoning is selected</li></ul><p>The current release does not implement an Astra analytics, advertising, telemetry, or account service.</p></div>
          </section>

          <section id="limitations" className="docs-section">
            <div className="docs-section-label"><span>12</span><p>LIMITATIONS</p></div>
            <div className="docs-section-body"><h2>Current limitations.</h2><ul className="limitation-list"><li>Windows x64 only; no ARM64, macOS, or Linux release.</li><li>The installer is unsigned and may trigger SmartScreen.</li><li>Models are fixed to <code>qwen3:4b</code> and <code>openai/gpt-oss-20b</code>.</li><li>Ollama is fixed to localhost port <code>11434</code>.</li><li>Conversations are not saved as durable history.</li><li>Astra does not modify the system or execute cleanup actions.</li><li>Temperature monitoring is not a dedicated diagnostic tool.</li><li>Event-log evidence is not definitive root-cause analysis.</li><li>Large-file scans are bounded, not complete disk forensics.</li><li>The app does not currently auto-update.</li></ul></div>
          </section>

          <section id="troubleshooting" className="docs-section">
            <div className="docs-section-label"><span>13</span><p>TROUBLESHOOTING</p></div>
            <div className="docs-section-body"><h2>Resolve common problems.</h2><div className="troubleshooting-list">{troubleshooting.map(([title, answer]) => <details key={title}><summary>{title}<span>+</span></summary><p>{answer}</p></details>)}</div></div>
          </section>

          <section id="uninstall" className="docs-section">
            <div className="docs-section-label"><span>14</span><p>UNINSTALL</p></div>
            <div className="docs-section-body"><h2>Uninstall or reset Astra.</h2><ol><li>Close Astra.</li><li>Open <strong>Windows Settings → Apps → Installed apps</strong>.</li><li>Find Astra, select <strong>Uninstall</strong>, and follow the prompts.</li></ol><p>Preferences and the encrypted Groq-key file may remain in:</p><CodeBlock>{"%APPDATA%\\astra"}</CodeBlock><p>For a complete reset, clear the Groq key inside Astra first, uninstall the app, and then remove that folder. Ollama and its models are separate and are not removed with Astra.</p></div>
          </section>

          <section id="faq" className="docs-section">
            <div className="docs-section-label"><span>15</span><p>FAQ</p></div>
            <div className="docs-section-body"><h2>Frequently asked questions.</h2><div className="faq-grid"><article><h3>Is Astra an antivirus?</h3><p>No. It explains Windows-reported security status but does not replace Microsoft Defender or another security product.</p></article><article><h3>Does Astra repair problems?</h3><p>No. Version 1.0.0 is read-only. It diagnoses and explains; it does not clean, repair, terminate, disable, install, or restart.</p></article><article><h3>Does it need administrator access?</h3><p>Normal use is designed for a standard account. Windows may withhold some readings, which Astra should report as unavailable.</p></article><article><h3>Can it work offline?</h3><p>Yes, after Ollama and <code>qwen3:4b</code> are downloaded. Groq always requires internet.</p></article><article><h3>Does Astra upload all system data?</h3><p>No. Ollama keeps prompts and evidence local. Groq receives the prompt and only the readings selected for reasoning.</p></article><article><h3>Can Astra delete large files?</h3><p>No. It identifies candidates for review. A large or old file is not automatically safe to delete.</p></article><article><h3>Can I choose another model?</h3><p>Not in version 1.0.0. The configured Ollama and Groq models are fixed.</p></article><article><h3>Why is the publisher unknown?</h3><p>The first release is not code-signed. Verify the official source and checksum before installation.</p></article></div></div>
          </section>

          <footer className="docs-footer"><div><span>ASTRA 1.0.0</span><p>Windows system intelligence, grounded in evidence.</p></div><Link href="/">Return home <span>→</span></Link></footer>
        </article>
      </div>
    </main>
  );
}

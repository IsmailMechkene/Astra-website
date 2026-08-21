"use client";

import { useEffect, useState } from "react";

const introStorageKey = "astra:intro-seen";
const introDisplayTime = 2000;

function waitForImage(image: HTMLImageElement) {
  const loaded = image.complete
    ? Promise.resolve()
    : new Promise<void>((resolve) => {
        image.addEventListener("load", () => resolve(), { once: true });
        image.addEventListener("error", () => resolve(), { once: true });
      });

  return loaded.then(async () => {
    if (!image.decode) return;
    try {
      await image.decode();
    } catch {
      // A failed decode must not trap visitors on the loading screen.
    }
  });
}

export function SiteLoader() {
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let active = true;

    try {
      if (window.sessionStorage.getItem(introStorageKey) === "1") {
        document.documentElement.classList.remove("astra-loading");
        const hideImmediately = window.setTimeout(() => {
          if (active) setVisible(false);
        }, 0);
        return () => {
          active = false;
          window.clearTimeout(hideImmediately);
        };
      }
      window.sessionStorage.setItem(introStorageKey, "1");
    } catch {
      // The intro still works when browser storage is unavailable.
    }

    const startedAt = performance.now();
    document.documentElement.classList.add("astra-loading");

    const criticalImages = Array.from(
      document.querySelectorAll<HTMLImageElement>("img[data-critical-image]"),
    );
    const fontsReady = document.fonts?.ready ?? Promise.resolve();
    const assetsReady = Promise.all([fontsReady, ...criticalImages.map(waitForImage)]);
    const introTimeout = new Promise<void>((resolve) => window.setTimeout(resolve, introDisplayTime));

    Promise.race([assetsReady, introTimeout]).then(() => {
      const remaining = Math.max(0, introDisplayTime - (performance.now() - startedAt));
      window.setTimeout(() => {
        if (active) setReady(true);
      }, remaining);
    });

    return () => {
      active = false;
      document.documentElement.classList.remove("astra-loading");
    };
  }, []);

  useEffect(() => {
    if (!ready) return;
    document.documentElement.classList.remove("astra-loading");
    const fallback = window.setTimeout(() => setVisible(false), 900);
    return () => window.clearTimeout(fallback);
  }, [ready]);

  if (!visible) return null;

  return (
    <div
      className={`site-loader${ready ? " is-ready" : ""}`}
      role="status"
      aria-live="polite"
      aria-label={ready ? "Astra is ready" : "Loading Astra"}
      onTransitionEnd={(event) => {
        if (ready && event.target === event.currentTarget) setVisible(false);
      }}
    >
      <div className="loader-orbit" aria-hidden="true"><span /><span /></div>
      <div className="loader-content">
        <div className="loader-brand"><img src="/astra_logo.svg" alt="" /><span>ASTRA</span></div>
        <div className="loader-status"><span>LOCAL SYSTEM INTELLIGENCE</span><p>Preparing the interface</p></div>
        <div className="loader-track" aria-hidden="true"><i /></div>
      </div>
      <span className="loader-build">WINDOWS 10 / 11&nbsp;&nbsp;·&nbsp;&nbsp;READ-ONLY</span>
    </div>
  );
}

import { RefObject } from "react";

export function init(rootRef: RefObject<HTMLHeadingElement>) {
  if (!rootRef.current) return;

  const MAX_DELAY = 3000;           // tiempo entre clics (ms) para mantener combo
  const TARGET_CLICKS = 20;         // clics necesarios
  let clicks = 0;
  let lastClick = Date.now();

  // overlay + sonido
  const overlay = document.createElement("div");
  overlay.style.cssText = `
    position:fixed;inset:0;pointer-events:none;
    background:rgba(255,255,255,0);transition:background .15s ease;
  `;
  document.body.appendChild(overlay);

  const audio = new Audio("/thunder.mp3");

  function flash() {
    overlay.style.background = "rgba(255,255,255,0.9)";
    setTimeout(() => (overlay.style.background = "rgba(255,255,255,0)"), 75);
  }

  function onClick() {
    const now = Date.now();
    clicks = now - lastClick > MAX_DELAY ? 1 : clicks + 1;
    lastClick = now;

    if (clicks >= TARGET_CLICKS) {
      // relámpagos aleatorios (3–6)
      const bursts = 3 + Math.floor(Math.random() * 4);
      let i = 0;
      const id = setInterval(() => {
        flash();
        if (++i === bursts) clearInterval(id);
      }, 200);

      audio.currentTime = 0;
      audio.play().catch(() => {}); // por si el navegador bloquea autoplay
      clicks = 0;
    }
  }

  rootRef.current.addEventListener("click", onClick);

  return () => {
    rootRef.current?.removeEventListener("click", onClick);
    overlay.remove();
  };
}

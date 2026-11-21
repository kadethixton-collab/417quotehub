"use client";

import { useEffect, useState } from "react";
import { track } from "@/lib/analytics";

/**
 * Sticky bottom CTA on mobile. Hides itself while the target form is on screen
 * so it never covers the form fields.
 */
export default function MobileCtaBar({ href = "#quote", label, targetId = "quote" }: { href?: string; label: string; targetId?: string }) {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setHidden(entry.isIntersecting), { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, [targetId]);

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-4px_16px_rgba(15,23,42,0.08)] backdrop-blur transition-transform duration-200 md:hidden ${hidden ? "translate-y-full" : "translate-y-0"}`}
      aria-hidden={hidden}
    >
      <a
        href={href}
        tabIndex={hidden ? -1 : 0}
        onClick={() => track("mobile_cta_click", { label })}
        className="block w-full rounded-xl bg-accent-500 py-3.5 text-center text-lg font-extrabold text-slate-900 shadow hover:bg-accent-400"
      >
        {label}
      </a>
    </div>
  );
}

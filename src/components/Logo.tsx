export function Logo({ className = "h-9 w-9" }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true">
      <rect width="40" height="40" rx="9" className="fill-brand-600" />
      <path d="M8 21 20 10l12 11" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <text x="20" y="32" textAnchor="middle" fontSize="11" fontWeight="800" fill="#fbbf24" fontFamily="system-ui, sans-serif">417</text>
    </svg>
  );
}

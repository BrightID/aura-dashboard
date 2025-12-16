export function AuraLogo({ className = "w-6 h-6" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-label="Aura logo"
    >
      <circle
        cx="16"
        cy="16"
        r="14"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.3"
      />
      <circle
        cx="16"
        cy="16"
        r="10"
        stroke="currentColor"
        strokeWidth="2"
        opacity="0.5"
      />
      <circle cx="16" cy="16" r="6" fill="currentColor" />
      <circle
        cx="16"
        cy="16"
        r="3"
        fill="currentColor"
        className="text-background"
      />
    </svg>
  )
}

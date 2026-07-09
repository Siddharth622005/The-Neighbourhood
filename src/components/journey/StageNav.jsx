/**
 * A single row of quiet age-stage pills. No progress bars, no percentages,
 * no completion state shown here — just where you are in the calendar.
 * Quarterly through 3 years, yearly through 6, matching journeyStages.json.
 */
export default function StageNav({ stages, activeId, onSelect }) {
  return (
    <nav
      className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-none"
      style={{ scrollbarWidth: "none" }}
      aria-label="Choose your child's stage"
    >
      {stages.map((s) => (
        <button
          key={s.id}
          onClick={() => onSelect(s.id)}
          className={`flex-shrink-0 px-4 py-2 rounded-full text-sm whitespace-nowrap transition-colors duration-200 ${
            s.id === activeId
              ? "bg-charcoal text-surface-cream"
              : "bg-surface-container-low text-on-surface-variant hover:bg-surface-container"
          }`}
        >
          {s.label}
        </button>
      ))}
    </nav>
  );
}

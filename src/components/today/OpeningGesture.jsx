/**
 * A single line draws itself across the top of the page on every /today
 * visit — the same brushstroke every time. Not a novelty animation, a
 * ritual marker: the same small gesture that opens every day, the way a
 * familiar chime or a particular smell would.
 */
export default function OpeningGesture() {
  return (
    <svg
      viewBox="0 0 240 4"
      className="w-24 h-1 mx-auto mb-6"
      aria-hidden="true"
    >
      <line
        x1="2"
        y1="2"
        x2="238"
        y2="2"
        stroke="#8B7355"
        strokeWidth="2"
        strokeLinecap="round"
        className="today-opening-line"
      />
    </svg>
  );
}

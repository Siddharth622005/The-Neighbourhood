export default function BlobDecor({ className = "" }) {
  return (
    <div className={`pointer-events-none absolute ${className}`} aria-hidden="true">
      <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        <path
          d="M44.7,-53.7C56.5,-44.3,63.1,-28.1,65.3,-11.2C67.5,5.7,65.3,23.3,56.6,36.3C47.9,49.3,32.7,57.7,15.8,62.4C-1.1,67,-19.7,67.9,-34.6,60.5C-49.5,53.1,-60.7,37.4,-65.2,19.8C-69.7,2.2,-67.5,-17.3,-58.4,-31.5C-49.3,-45.7,-33.3,-54.6,-17.2,-60.3C-1.1,-66,15.1,-68.5,29.2,-63.5C43.3,-58.5,55.3,-46,44.7,-53.7Z"
          fill="currentColor"
          transform="translate(100 100)"
        />
      </svg>
    </div>
  );
}

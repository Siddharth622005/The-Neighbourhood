import { forwardRef } from "react";

/**
 * Form controls. `soft` radius (10px) is the system's control corner, on
 * a White fill with a Lavender Mist hairline — the token whose role is
 * "subtle purple-tinted borders and dividers". Focus uses the same 3px
 * outline signal as the rest of the site.
 *
 * Input and Select forward refs so callers can move focus into a form
 * (the waitlist dialog does this on open and on step change).
 *
 * @tailwindcss/forms is loaded, so these start from a stripped base and
 * only the design-system values are stated here.
 */
const CONTROL =
  "type-body-regular w-full rounded-soft border border-lavender-mist bg-white px-md py-sm text-deep-purple placeholder:text-slate-blue/60 transition-colors duration-200 hover:border-warm-orange focus:border-deep-purple focus:ring-0";

export function Label({ htmlFor, className = "", children }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`type-body-small-bold block text-deep-purple ${className}`}
    >
      {children}
    </label>
  );
}

export const Input = forwardRef(function Input({ className = "", ...props }, ref) {
  return <input ref={ref} className={`${CONTROL} ${className}`} {...props} />;
});

export const Select = forwardRef(function Select(
  { className = "", children, ...props },
  ref
) {
  return (
    <select ref={ref} className={`${CONTROL} ${className}`} {...props}>
      {children}
    </select>
  );
});

export function Hint({ className = "", children }) {
  return (
    <p className={`type-caption font-normal text-slate-blue ${className}`}>
      {children}
    </p>
  );
}

export function FieldError({ children }) {
  return (
    <p className="type-body-small-bold text-error" role="alert">
      {children}
    </p>
  );
}

export default function BrandIcon({ path, hex, className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill={hex ? `#${hex}` : "currentColor"}
      aria-hidden="true"
    >
      <path d={path} />
    </svg>
  );
}

export default function Arrow({ direction = 'right', size = '1.2em' }) {
  const iconSize = typeof size === 'number' ? `${size}px` : size;
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      focusable="false"
      style={{ display: 'inline-block', width: size, height: size, verticalAlign: `calc(0.35em - ${iconSize} / 2)`, flexShrink: 0, transform: direction === 'left' ? 'scaleX(-1)' : undefined }}
    >
      <path d="M16.8961 12.5844H3.6001V10.6164H16.8961L10.6801 4.40039H13.4401L20.6401 11.6004L13.4401 18.8004H10.6801L16.8961 12.5844Z" fill="currentColor" transform="translate(0 0.4)" />
    </svg>
  );
}

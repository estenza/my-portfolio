export default function PrimaryButton({
  children,
  className = '',
  heightClassName = 'h-12 sm:h-14',
  paddingClassName = 'px-5 sm:px-6',
}) {
  return (
    <span
      className={[
        'inline-flex w-fit items-center justify-center rounded-full bg-neutral-950 text-base font-medium leading-none text-white transition-colors hover:bg-neutral-800',
        heightClassName,
        paddingClassName,
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {children}
    </span>
  );
}

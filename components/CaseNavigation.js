import Link from 'next/link';
import styles from '@/styles/CaseNavigation.module.css';

function CaseLink({ href, direction }) {
  const previous = direction === 'previous';
  const label = previous ? 'предыдущий кейс' : 'следующий кейс';
  const content = previous
    ? <><span aria-hidden="true">←</span><span>{label}</span></>
    : <><span>{label}</span><span aria-hidden="true">→</span></>;

  if (!href) {
    return <span className={styles.disabled} aria-disabled="true">{content}</span>;
  }

  return (
    <Link href={href} className={styles.link} aria-label={label}>
      {content}
    </Link>
  );
}

export default function CaseNavigation({ previous, next }) {
  return (
    <nav className={styles.navigation} aria-label="Навигация по кейсам">
      <CaseLink href={previous} direction="previous" />
      <CaseLink href={next} direction="next" />
    </nav>
  );
}

import styles from '@/styles/CaseSection.module.css';

/**
 * Базовый строительный блок кейсов.
 * Стили передаются страницей: композиция остаётся общей, а визуальный язык — у кейса.
 */
export default function CaseSection({
  title,
  titleAs: Title = 'h2',
  className = '',
  children,
  ...props
}) {
  return (
    <section className={`${styles.section} ${className}`} {...props}>
      {title && <Title>{title}</Title>}
      {children}
    </section>
  );
}

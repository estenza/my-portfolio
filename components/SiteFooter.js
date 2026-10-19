import styles from '@/styles/SiteFooter.module.css';

export default function SiteFooter({ year = '2026' }) {
  return (
    <footer className={styles.footer}>
      <span>Дизайнил + кодил Вадим Зарипов</span>
      <span>{year}</span>
    </footer>
  );
}

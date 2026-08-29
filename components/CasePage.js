import MainHeader from '@/components/MainHeader';
import styles from '@/styles/CasePage.module.css';

function classNames(...names) {
  return names.filter(Boolean).join(' ');
}

/**
 * Общая оболочка страниц с кейсами.
 * Визуальные блоки внутри остаются у конкретного кейса, а сетка, поверхности,
 * контейнер и футер поддерживаются в одном месте.
 */
export function CasePage({ children, className = '', footerClassName = '', year = '2026' }) {
  return (
    <main className={classNames(styles.page, className)}>
      <MainHeader fullBleed />
      {children}
      <footer className={classNames(styles.footer, footerClassName)}>
        <span>дизайнил + кодил вадим зарипов</span>
        <span>{year}</span>
      </footer>
    </main>
  );
}

export function CaseSurface({ children, className = '', as: Element = 'article', ...props }) {
  return <Element className={classNames(styles.surface, className)} {...props}>{children}</Element>;
}

export function CaseContainer({ children, className = '' }) {
  return <div className={classNames(styles.container, className)}>{children}</div>;
}

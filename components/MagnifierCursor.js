import { useEffect, useRef } from 'react';

export default function MagnifierCursor() {
  const cursorRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(pointer: fine)');
    if (!mediaQuery.matches) return undefined;

    const cursor = cursorRef.current;
    document.body.classList.add('has-magnifier-cursor');

    const setCursorContent = ({ label = '', icon = 'eye', isLink = false }) => {
      labelRef.current.textContent = label;
      cursor.dataset.label = label;
      cursor.dataset.icon = icon;
      cursor.dataset.link = isLink && !label ? 'true' : 'false';

      if (label) {
        const labelWidth = Math.ceil(labelRef.current.scrollWidth);
        const iconWidth = 18;
        const gap = 8;
        const horizontalPadding = 28;
        cursor.style.setProperty('--magnifier-label-width', `${labelWidth + iconWidth + gap + horizontalPadding}px`);
        return labelWidth + iconWidth + gap + horizontalPadding;
      } else {
        cursor.style.removeProperty('--magnifier-label-width');
        return isLink ? 28 : 16;
      }
    };

    const keepCursorInViewport = (x, width, hasLabel) => {
      const offset = hasLabel ? 22 : 14;
      const safeLeft = offset + 4;
      const safeRight = window.innerWidth - width + offset - 4;
      return Math.min(Math.max(x, safeLeft), Math.max(safeLeft, safeRight));
    };

    const moveCursor = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      const projectCard = target && target.closest('[data-cursor-label]');
      const label = projectCard ? projectCard.dataset.cursorLabel : '';
      const icon = projectCard ? projectCard.dataset.cursorIcon : 'eye';
      const link = target && target.closest('a[href]');
      const width = setCursorContent({ label, icon, isLink: Boolean(link) });

      cursor.style.left = `${keepCursorInViewport(event.clientX, width, Boolean(label))}px`;
      cursor.style.top = `${event.clientY}px`;
      cursor.dataset.visible = 'true';
    };

    const updateCursorFromEvent = (event) => setCursorContent(event.detail || {});

    const hideCursor = () => {
      cursor.dataset.visible = 'false';
    };

    const showCursor = () => {
      cursor.dataset.visible = 'true';
    };

    const pressCursor = () => {
      cursor.dataset.pressed = 'true';
    };

    const releaseCursor = () => {
      cursor.dataset.pressed = 'false';
    };

    window.addEventListener('pointermove', moveCursor);
    window.addEventListener('magnifier-cursor-change', updateCursorFromEvent);
    document.documentElement.addEventListener('mouseleave', hideCursor);
    document.documentElement.addEventListener('mouseenter', showCursor);
    window.addEventListener('pointerdown', pressCursor);
    window.addEventListener('pointerup', releaseCursor);
    window.addEventListener('pointercancel', releaseCursor);

    return () => {
      document.body.classList.remove('has-magnifier-cursor');
      window.removeEventListener('pointermove', moveCursor);
      window.removeEventListener('magnifier-cursor-change', updateCursorFromEvent);
      document.documentElement.removeEventListener('mouseleave', hideCursor);
      document.documentElement.removeEventListener('mouseenter', showCursor);
      window.removeEventListener('pointerdown', pressCursor);
      window.removeEventListener('pointerup', releaseCursor);
      window.removeEventListener('pointercancel', releaseCursor);
    };
  }, []);

  return (
    <span ref={cursorRef} className="magnifier-cursor" data-visible="false" data-pressed="false" data-label="" data-icon="eye" aria-hidden="true">
      <svg className="magnifier-cursor__icon magnifier-cursor__icon--eye" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="2.5" fill="currentColor" />
      </svg>
      <svg className="magnifier-cursor__icon magnifier-cursor__icon--arrow" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 19 19 5M9 5h10v10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="magnifier-cursor__icon magnifier-cursor__icon--clock" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="2" />
        <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="magnifier-cursor__icon magnifier-cursor__icon--mail" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="m4.5 7 7.5 6 7.5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <svg className="magnifier-cursor__icon magnifier-cursor__icon--check" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="m5 12.5 4.2 4L19 7" stroke="currentColor" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span ref={labelRef} className="magnifier-cursor__label" />
    </span>
  );
}

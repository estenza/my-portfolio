/* eslint-disable @next/next/no-img-element */

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const SCALE_STEP = 0.5;

function ZoomInIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M9 5.75V12.25M5.75 9H12.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M8.75 15.5C12.4779 15.5 15.5 12.4779 15.5 8.75C15.5 5.02208 12.4779 2 8.75 2C5.02208 2 2 5.02208 2 8.75C2 12.4779 5.02208 15.5 8.75 15.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.75 13.75L18 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function ZoomOutIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5.75 9H12.25" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
      <path d="M8.75 15.5C12.4779 15.5 15.5 12.4779 15.5 8.75C15.5 5.02208 12.4779 2 8.75 2C5.02208 2 2 5.02208 2 8.75C2 12.4779 5.02208 15.5 8.75 15.5Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M13.75 13.75L18 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-5 w-5" fill="none" aria-hidden="true">
      <path d="M5 5L15 15M15 5L5 15" stroke="currentColor" strokeLinecap="round" strokeWidth="1.7" />
    </svg>
  );
}

function clampScale(value) {
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
}

function ViewerButton({ children, disabled = false, label, onClick }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      className="grid h-10 w-10 cursor-pointer place-items-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70 disabled:pointer-events-none disabled:cursor-default disabled:opacity-40"
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default function ZoomableImage({
  alt = '',
  children,
  triggerClassName = 'block h-full w-full cursor-zoom-in border-0 bg-transparent p-0',
  zoomSrc
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scale, setScale] = useState(MIN_SCALE);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [zoomOrigin, setZoomOrigin] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const originalBodyOverflow = document.body.style.overflow;
    const originalDocumentOverflow = document.documentElement.style.overflow;
    const scrollPosition = { x: window.scrollX, y: window.scrollY };

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalBodyOverflow;
      document.documentElement.style.overflow = originalDocumentOverflow;
      requestAnimationFrame(() => {
        window.scrollTo(scrollPosition.x, scrollPosition.y);
      });
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        closeViewer();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  function openViewer() {
    if (!zoomSrc) {
      return;
    }

    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
    setZoomOrigin({ x: 50, y: 50 });
    setIsDragging(false);
    setIsOpen(true);
  }

  function closeViewer() {
    setIsOpen(false);
    setScale(MIN_SCALE);
    setOffset({ x: 0, y: 0 });
    setZoomOrigin({ x: 50, y: 50 });
    setIsDragging(false);
  }

  function updateScale(nextScale) {
    const normalizedScale = clampScale(nextScale);

    setScale(normalizedScale);

    if (normalizedScale === MIN_SCALE) {
      setOffset({ x: 0, y: 0 });
      setZoomOrigin({ x: 50, y: 50 });
    }
  }

  function handleImageClick(event) {
    if (hasDraggedRef.current) {
      hasDraggedRef.current = false;
      return;
    }

    if (scale >= 2) {
      updateScale(MIN_SCALE);
      return;
    }

    const rect = event.currentTarget.getBoundingClientRect();

    setZoomOrigin({
      x: ((event.clientX - rect.left) / rect.width) * 100,
      y: ((event.clientY - rect.top) / rect.height) * 100
    });
    updateScale(2);
  }

  function handlePointerDown(event) {
    if (scale <= MIN_SCALE) {
      return;
    }

    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartRef.current = { x: event.clientX, y: event.clientY };
    dragOffsetRef.current = offset;
    hasDraggedRef.current = false;
    setIsDragging(true);
  }

  function handlePointerMove(event) {
    if (!isDragging || scale <= MIN_SCALE) {
      return;
    }

    const nextOffset = {
      x: dragOffsetRef.current.x + event.clientX - dragStartRef.current.x,
      y: dragOffsetRef.current.y + event.clientY - dragStartRef.current.y
    };

    if (
      Math.abs(nextOffset.x - dragOffsetRef.current.x) > 3
      || Math.abs(nextOffset.y - dragOffsetRef.current.y) > 3
    ) {
      hasDraggedRef.current = true;
    }

    setOffset(nextOffset);
  }

  function handlePointerUp(event) {
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }

    setIsDragging(false);
  }

  const viewer = isOpen && zoomSrc && typeof document !== 'undefined'
    ? createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={alt ? `Просмотр изображения: ${alt}` : 'Просмотр изображения'}
          className="fixed inset-0 z-[420] bg-white"
          onWheel={(event) => {
            event.preventDefault();
            updateScale(scale + (event.deltaY < 0 ? SCALE_STEP : -SCALE_STEP));
          }}
        >
          <div className="absolute right-4 top-4 z-[1] flex items-center gap-2">
            <ViewerButton
              label="Уменьшить изображение"
              disabled={scale <= MIN_SCALE}
              onClick={() => updateScale(scale - SCALE_STEP)}
            >
              <ZoomOutIcon />
            </ViewerButton>
            <ViewerButton
              label="Увеличить изображение"
              disabled={scale >= MAX_SCALE}
              onClick={() => updateScale(scale + SCALE_STEP)}
            >
              <ZoomInIcon />
            </ViewerButton>
            <ViewerButton label="Закрыть изображение" onClick={closeViewer}>
              <CloseIcon />
            </ViewerButton>
          </div>
          <div className="flex h-full w-full items-center justify-center overflow-hidden p-6">
            <img
              src={zoomSrc}
              alt={alt}
              draggable={false}
              className={[
                'max-h-full max-w-full select-none object-contain transition-transform duration-100 ease-out',
                scale > MIN_SCALE
                  ? isDragging ? 'cursor-grabbing' : 'cursor-grab'
                  : 'cursor-zoom-in'
              ].join(' ')}
              style={{
                transform: `translate3d(${offset.x}px, ${offset.y}px, 0) scale(${scale})`,
                transformOrigin: `${zoomOrigin.x}% ${zoomOrigin.y}%`
              }}
              onClick={handleImageClick}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
            />
          </div>
        </div>,
        document.body
      )
    : null;

  return (
    <span className="block w-full">
      <button
        type="button"
        aria-label={alt ? `Открыть изображение: ${alt}` : 'Открыть изображение'}
        className={triggerClassName}
        onClick={openViewer}
      >
        {children}
      </button>
      {viewer}
    </span>
  );
}

import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
}

export default function Tooltip({ content, children, delay = 500 }: TooltipProps) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  const show = () => {
    timerRef.current = setTimeout(() => {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (!rect) return;
      let top = rect.top - 36;
      const left = rect.left + rect.width / 2;
      if (top < 8) top = rect.bottom + 8;
      setPos({ top, left });
      setVisible(true);
    }, delay);
  };

  const hide = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setVisible(false);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  return (
    <>
      <div ref={triggerRef} onMouseEnter={show} onMouseLeave={hide} style={{ display: 'contents' }}>
        {children}
      </div>
      {visible && createPortal(
        <div className="tooltip" style={{ position: 'fixed', top: pos.top, left: pos.left, transform: 'translateX(-50%)', zIndex: 10000 }}>
          {content}
        </div>,
        document.body
      )}
    </>
  );
}

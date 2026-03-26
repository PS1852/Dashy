import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';

interface ContextMenuItem {
  label: string;
  icon?: React.ReactNode;
  onClick: () => void;
  danger?: boolean;
  separator?: boolean;
  disabled?: boolean;
}

interface ContextMenuProps {
  items: ContextMenuItem[];
  trigger: React.ReactNode;
  triggerClassName?: string;
}

export function ContextMenuItem({ item }: { item: ContextMenuItem }) {
  if (item.separator) return <div className="context-menu-separator" />;
  return (
    <button
      className={`context-menu-item ${item.danger ? 'danger' : ''} ${item.disabled ? 'disabled' : ''}`}
      onClick={() => !item.disabled && item.onClick()}
    >
      {item.icon && <span className="context-menu-icon">{item.icon}</span>}
      <span>{item.label}</span>
    </button>
  );
}

export function ContextMenu({ items, trigger, triggerClassName = '' }: ContextMenuProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState({ top: 0, left: 0 });
  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    const rect = triggerRef.current?.getBoundingClientRect();
    if (!rect) return;

    let left = rect.right + 4;
    let top = rect.top;

    // Flip if would overflow right
    if (left + 220 > window.innerWidth) {
      left = rect.left - 224;
    }
    // Flip if would overflow bottom
    if (top + 320 > window.innerHeight) {
      top = Math.max(8, window.innerHeight - 320);
    }

    setPos({ top, left });
    setOpen(v => !v);
  };

  useEffect(() => {
    if (!open) return;
    const handleClick = () => setOpen(false);
    const handleEsc = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('click', handleClick);
    document.addEventListener('keydown', handleEsc);
    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('keydown', handleEsc);
    };
  }, [open]);

  return (
    <>
      <div ref={triggerRef} className={`context-menu-trigger ${triggerClassName}`} onClick={handleOpen}>
        {trigger}
      </div>
      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              ref={menuRef}
              className="context-menu"
              style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9999 }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.12 }}
              onClick={e => e.stopPropagation()}
            >
              {items.map((item, i) => (
                <ContextMenuItem key={i} item={{ ...item, onClick: () => { item.onClick(); setOpen(false); } }} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
}

import { useEffect } from 'react';
import { useApp } from '../context/AppContext';

type Shortcut = {
  key: string;
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  handler: () => void;
};

export function useKeyboardShortcuts(shortcuts: Shortcut[]) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isEditing = ['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)
        || (e.target as HTMLElement)?.isContentEditable;

      for (const shortcut of shortcuts) {
        const ctrlMatch = shortcut.ctrl ? (e.ctrlKey || e.metaKey) : true;
        const shiftMatch = shortcut.shift ? e.shiftKey : !e.shiftKey || !shortcut.shift;
        const altMatch = shortcut.alt ? e.altKey : true;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          // For ctrl shortcuts, allow even when editing (for block formatting)
          if (shortcut.ctrl || !isEditing) {
            e.preventDefault();
            shortcut.handler();
            break;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [shortcuts]);
}

export function useGlobalShortcuts() {
  const { openModal, createPage, toggleSidebar, closeModal, activeModal } = useApp();

  useKeyboardShortcuts([
    { key: 'k', ctrl: true, handler: () => activeModal === 'search' ? closeModal() : openModal('search') },
    { key: 'n', ctrl: true, handler: () => createPage() },
    { key: '\\', ctrl: true, handler: () => toggleSidebar() },
    { key: 'Escape', handler: () => closeModal() },
    { key: '?', handler: () => openModal('shortcuts') },
  ]);
}

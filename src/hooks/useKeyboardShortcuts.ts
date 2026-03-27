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
        const ctrlMatch = !!shortcut.ctrl === (e.ctrlKey || e.metaKey);
        const shiftMatch = !!shortcut.shift === e.shiftKey;
        const altMatch = !!shortcut.alt === e.altKey;
        const keyMatch = e.key.toLowerCase() === shortcut.key.toLowerCase();

        if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
          // Allow shortcuts even when editing for command keys (ctrl/meta)
          const allowInEditor = shortcut.ctrl || shortcut.alt || !isEditing;
          
          if (allowInEditor) {
            if (e.cancelable) {
              e.preventDefault();
            }
            e.stopPropagation();
            shortcut.handler();
            return;
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown, true);
    return () => window.removeEventListener('keydown', handleKeyDown, true);
  }, [shortcuts]);
}

export function useGlobalShortcuts() {
  const { openModal, createPage, createProject, toggleSidebar, closeModal, activeModal } = useApp();

  useKeyboardShortcuts([
    { key: 'k', ctrl: true, handler: () => activeModal === 'search' ? closeModal() : openModal('search') },
    { key: 'n', ctrl: true, handler: () => createPage() },
    { key: 'p', ctrl: true, shift: true, handler: () => createProject() },
    { key: '\\', ctrl: true, handler: () => toggleSidebar() },
    { key: 'Escape', handler: () => closeModal() },
    { key: '/', handler: () => !activeModal && openModal('search') },
    { key: '?', shift: true, handler: () => openModal('shortcuts') },
  ]);
}

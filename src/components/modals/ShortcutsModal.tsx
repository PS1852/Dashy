import { Command } from 'lucide-react';
import Modal from '../ui/Modal';

interface ShortcutsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShortcutsModal({ isOpen, onClose }: ShortcutsModalProps) {
  const categories = [
    {
      title: 'Navigation & UI',
      items: [
        { keys: ['Ctrl', 'K'], label: 'Global search' },
        { keys: ['Ctrl', 'N'], label: 'New page' },
        { keys: ['Ctrl', 'P'], label: 'New project' },
        { keys: ['Ctrl', '\\'], label: 'Toggle sidebar' },
        { keys: ['/'], label: 'Search (Quick)' },
        { keys: ['Shift', '?'], label: 'Show shortcuts' },
        { keys: ['Esc'], label: 'Close modal / Dismiss focus' },
      ]
    },
    {
      title: 'Editor Commands',
      items: [
        { keys: ['/'], label: 'Open slash command menu' },
        { keys: ['Enter'], label: 'Create new block' },
        { keys: ['Shift', 'Enter'], label: 'Line break' },
        { keys: ['Backspace'], label: 'Delete block (when empty)' },
        { keys: ['Tab'], label: 'Indent' },
        { keys: ['Shift', 'Tab'], label: 'Outdent' },
      ]
    },
    {
      title: 'Markdown Shortcuts',
      items: [
        { keys: ['#', 'Space'], label: 'Heading 1' },
        { keys: ['##', 'Space'], label: 'Heading 2' },
        { keys: ['###', 'Space'], label: 'Heading 3' },
        { keys: ['-', 'Space'], label: 'Bulleted list' },
        { keys: ['1.', 'Space'], label: 'Numbered list' },
        { keys: ['[]', 'Space'], label: 'To-do list' },
        { keys: ['>', 'Space'], label: 'Quote' },
        { keys: ['---'], label: 'Divider' },
      ]
    }
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Keyboard Shortcuts" size="md">
      <div className="shortcuts-modal">
        {categories.map((cat, i) => (
          <div key={i} className="shortcut-category">
            <h3 className="shortcut-category-title">{cat.title}</h3>
            <div className="shortcut-list">
              {cat.items.map((item, j) => (
                <div key={j} className="shortcut-item">
                  <span className="shortcut-label">{item.label}</span>
                  <div className="shortcut-keys">
                    {item.keys.map((k, ki) => (
                      <kbd key={ki}>{k}</kbd>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
        <div className="shortcut-footer">
          <Command size={14} /> 
          <span>Tip: Hover over items in the sidebar to see context-specific shortcuts.</span>
        </div>
      </div>
    </Modal>
  );
}

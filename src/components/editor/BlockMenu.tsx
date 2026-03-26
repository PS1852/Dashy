import { useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Type, Heading1, Heading2, Heading3, CheckSquare, List, ListOrdered,
  ChevronRight, Quote, AlertCircle, Code2, Minus, Image
} from 'lucide-react';
import { BlockType } from '../../types';

interface BlockMenuProps {
  onSelect: (type: BlockType) => void;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLElement | null>;
  filterText: string;
}

const blockMenuItems: { type: BlockType; label: string; description: string; icon: React.ReactNode; keywords: string[] }[] = [
  { type: 'paragraph',      label: 'Text',         description: 'Just start writing',           icon: <Type size={18} />,         keywords: ['text', 'paragraph', 'p'] },
  { type: 'heading_1',      label: 'Heading 1',    description: 'Big section heading',          icon: <Heading1 size={18} />,      keywords: ['h1', 'heading', '1'] },
  { type: 'heading_2',      label: 'Heading 2',    description: 'Medium section heading',       icon: <Heading2 size={18} />,      keywords: ['h2', 'heading', '2'] },
  { type: 'heading_3',      label: 'Heading 3',    description: 'Small section heading',        icon: <Heading3 size={18} />,      keywords: ['h3', 'heading', '3'] },
  { type: 'todo',           label: 'To-do',        description: 'Track tasks with checkboxes',  icon: <CheckSquare size={18} />,   keywords: ['todo', 'task', 'check'] },
  { type: 'bulleted_list',  label: 'Bullet list',  description: 'Create a simple list',         icon: <List size={18} />,          keywords: ['bullet', 'list', 'ul'] },
  { type: 'numbered_list',  label: 'Numbered list',description: 'Create a numbered list',       icon: <ListOrdered size={18} />,   keywords: ['numbered', 'list', 'ol'] },
  { type: 'toggle',         label: 'Toggle',       description: 'Collapsible content',          icon: <ChevronRight size={18} />,  keywords: ['toggle', 'collapse', 'details'] },
  { type: 'quote',          label: 'Quote',        description: 'Capture a quote',              icon: <Quote size={18} />,         keywords: ['quote', 'blockquote', '>'] },
  { type: 'callout',        label: 'Callout',      description: 'Make text stand out',          icon: <AlertCircle size={18} />,   keywords: ['callout', 'note', 'info'] },
  { type: 'code',           label: 'Code',         description: 'Capture code snippets',        icon: <Code2 size={18} />,         keywords: ['code', 'snippet', '```'] },
  { type: 'divider',        label: 'Divider',      description: 'Separate content visually',    icon: <Minus size={18} />,         keywords: ['divider', 'separator', 'hr', '---'] },
  { type: 'image',          label: 'Image',        description: 'Upload an image',              icon: <Image size={18} />,         keywords: ['image', 'photo', 'img'] },
];

export default function BlockMenu({ onSelect, onClose, anchorRef, filterText }: BlockMenuProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ top: 0, left: 0 });

  const filtered = filterText
    ? blockMenuItems.filter(item =>
        item.label.toLowerCase().includes(filterText.toLowerCase()) ||
        item.keywords.some(k => k.includes(filterText.toLowerCase()))
      )
    : blockMenuItems;

  // Position menu near cursor
  useEffect(() => {
    const anchor = anchorRef.current;
    if (!anchor) return;
    const rect = anchor.getBoundingClientRect();
    let top = rect.bottom + 4;
    let left = rect.left;
    if (top + 400 > window.innerHeight) top = rect.top - 4 - Math.min(400, filtered.length * 60);
    if (left + 280 > window.innerWidth) left = window.innerWidth - 284;
    setPos({ top, left });
  }, [anchorRef]);

  // Keyboard navigation
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIndex(i => Math.min(i + 1, filtered.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIndex(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { e.preventDefault(); if (filtered[selectedIndex]) onSelect(filtered[selectedIndex].type); }
      if (e.key === 'Escape') { e.preventDefault(); onClose(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [filtered, selectedIndex, onSelect, onClose]);

  // Reset index when filter changes
  useEffect(() => setSelectedIndex(0), [filterText]);

  if (filtered.length === 0) {
    // Close if no match
    onClose();
    return null;
  }

  return createPortal(
    <AnimatePresence>
      <motion.div
        ref={menuRef}
        className="block-menu"
        style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 9998 }}
        initial={{ opacity: 0, scale: 0.96, y: -4 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96 }}
        transition={{ duration: 0.12 }}
      >
        <div className="block-menu-header">
          {filterText ? <>Results for "{filterText}"</> : <>Basic blocks</>}
        </div>
        {filtered.map((item, i) => (
          <button
            key={item.type}
            className={`block-menu-item ${i === selectedIndex ? 'selected' : ''}`}
            onClick={() => onSelect(item.type)}
            onMouseEnter={() => setSelectedIndex(i)}
          >
            <span className="block-menu-icon">{item.icon}</span>
            <span className="block-menu-info">
              <span className="block-menu-label">{item.label}</span>
              <span className="block-menu-desc">{item.description}</span>
            </span>
          </button>
        ))}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
}

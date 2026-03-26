import { useState, useRef, useCallback, KeyboardEvent } from 'react';
import { motion } from 'framer-motion';
import { GripVertical, MoreHorizontal } from 'lucide-react';
import { Block, BlockType } from '../../types';
import {
  ParagraphBlock, HeadingBlock, TodoBlock, BulletedListBlock,
  NumberedListBlock, QuoteBlock, CalloutBlock, CodeBlock, DividerBlock, ToggleBlock, ImageBlock
} from './blocks/BlockComponents';
import BlockMenu from './BlockMenu';
import { ContextMenu } from '../ui/ContextMenu';

interface BlockEditorBlockProps {
  block: Block;
  isFocused: boolean;
  onFocus: () => void;
  onChange: (content: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>, blockId: string) => void;
  onDelete: () => void;
  onTypeChange: (type: BlockType) => void;
  onCheckToggle: () => void;
  numberedIndex: number;
}

// Markdown shortcut patterns
const MD_SHORTCUTS: Record<string, BlockType> = {
  '# ':    'heading_1',
  '## ':   'heading_2',
  '### ':  'heading_3',
  '- ':    'bulleted_list',
  '* ':    'bulleted_list',
  '1. ':   'numbered_list',
  '[] ':   'todo',
  '> ':    'quote',
  '--- ':  'divider',
};

export default function BlockEditorBlock({
  block, isFocused, onFocus, onChange, onKeyDown, onDelete, onTypeChange, onCheckToggle, numberedIndex
}: BlockEditorBlockProps) {
  const [showMenu, setShowMenu] = useState(false);
  const [menuFilter, setMenuFilter] = useState('');
  const blockRef = useRef<HTMLDivElement>(null);
  const anchorRef = useRef<HTMLElement | null>(null);

  const handleChange = useCallback((content: string) => {
    // Check for slash command trigger
    if (content.startsWith('/') && block.type === 'paragraph') {
      setMenuFilter(content.slice(1));
      setShowMenu(true);
    } else if (showMenu) {
      setShowMenu(false);
    }

    // Check for markdown shortcuts
    for (const [pattern, type] of Object.entries(MD_SHORTCUTS)) {
      if (content === pattern || content.endsWith(pattern)) {
        onTypeChange(type);
        onChange('');
        setShowMenu(false);
        return;
      }
    }

    onChange(content);
  }, [block.type, showMenu, onChange, onTypeChange]);

  const handleMenuSelect = (type: BlockType) => {
    setShowMenu(false);
    onTypeChange(type);
    onChange('');
  };

  const blockOptions = [
    {
      label: 'Delete block',
      onClick: onDelete,
      danger: true,
    },
    {
      label: 'Duplicate',
      onClick: () => {}, // handled by parent
    },
    ...(['paragraph', 'heading_1', 'heading_2', 'heading_3', 'bulleted_list', 'numbered_list', 'todo', 'quote', 'callout', 'code'] as BlockType[])
      .filter(t => t !== block.type)
      .slice(0, 4)
      .map(t => ({
        label: `Turn into ${t.replace(/_/g, ' ')}`,
        onClick: () => onTypeChange(t),
      })),
  ];

  const renderBlock = () => {
    const commonProps = { block, isFocused, onFocus, onChange: handleChange, onKeyDown, onCheckToggle };
    switch (block.type) {
      case 'paragraph':    return <ParagraphBlock {...commonProps} />;
      case 'heading_1':
      case 'heading_2':
      case 'heading_3':    return <HeadingBlock {...commonProps} />;
      case 'todo':         return <TodoBlock {...commonProps} />;
      case 'bulleted_list': return <BulletedListBlock {...commonProps} />;
      case 'numbered_list': return <NumberedListBlock {...commonProps} numberedIndex={numberedIndex} />;
      case 'quote':        return <QuoteBlock {...commonProps} />;
      case 'callout':      return <CalloutBlock {...commonProps} />;
      case 'code':         return <CodeBlock {...commonProps} />;
      case 'divider':      return <DividerBlock block={block} onKeyDown={onKeyDown} />;
      case 'toggle':       return <ToggleBlock {...commonProps} />;
      case 'image':        return <ImageBlock {...commonProps} />;
      default:             return <ParagraphBlock {...commonProps} />;
    }
  };

  return (
    <motion.div
      ref={blockRef}
      className={`block-row ${isFocused ? 'focused' : ''}`}
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: 'auto' }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.15 }}
      layout
    >
      {/* Left: drag handle */}
      <div className="block-controls block-controls-left">
        <span className="block-grip drag-handle" title="Drag to reorder">
          <GripVertical size={14} />
        </span>
      </div>

      {/* Block content */}
      <div
        className="block-content"
        ref={el => { anchorRef.current = el; }}
      >
        {renderBlock()}
      </div>

      {/* Right: options menu */}
      <div className="block-controls block-controls-right">
        <ContextMenu
          items={blockOptions}
          trigger={<MoreHorizontal size={14} />}
          triggerClassName="block-options-btn"
        />
      </div>

      {/* Slash command menu */}
      {showMenu && (
        <BlockMenu
          onSelect={handleMenuSelect}
          onClose={() => { setShowMenu(false); onChange(''); }}
          anchorRef={anchorRef}
          filterText={menuFilter}
        />
      )}
    </motion.div>
  );
}

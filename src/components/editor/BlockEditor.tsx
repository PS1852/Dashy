import { useState, useCallback, KeyboardEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { Block, BlockType } from '../../types';
import BlockEditorBlock from './Block';

import { countWords, readingTime } from '../../utils/blockUtils';

interface BlockEditorProps {
  blocks: Block[];
  loading: boolean;
  onAddBlock: (type: BlockType, afterId: string | null, content?: string) => Promise<Block>;
  onUpdateBlock: (id: string, changes: Partial<Block>) => void;
  onDeleteBlock: (id: string) => void;
  onChangeType: (id: string, type: BlockType) => void;
}

export default function BlockEditor({
  blocks, loading,
  onAddBlock, onUpdateBlock, onDeleteBlock, onChangeType,
}: BlockEditorProps) {
  const [focusedBlockId, setFocusedBlockId] = useState<string | null>(null);

  const handleKeyDown = useCallback((e: KeyboardEvent<HTMLElement>, blockId: string) => {
    const blockIndex = blocks.findIndex(b => b.$id === blockId);
    const block = blocks[blockIndex];
    if (!block) return;

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onAddBlock('paragraph', blockId).then(newBlock => {
        setFocusedBlockId(newBlock.$id);
      });
      return;
    }

    if (e.key === 'Backspace') {
      const el = e.currentTarget as HTMLElement;
      const content = el.textContent ?? '';
      if (content === '' && blocks.length > 1) {
        e.preventDefault();
        onDeleteBlock(blockId);
        const prevBlock = blocks[blockIndex - 1];
        if (prevBlock) setFocusedBlockId(prevBlock.$id);
        return;
      }
    }

    if (e.key === 'ArrowUp') {
      if (blockIndex > 0) {
        e.preventDefault();
        setFocusedBlockId(blocks[blockIndex - 1].$id);
      }
    }

    if (e.key === 'ArrowDown') {
      if (blockIndex < blocks.length - 1) {
        e.preventDefault();
        setFocusedBlockId(blocks[blockIndex + 1].$id);
      }
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      const currentLevel = block.indent_level ?? 0;
      if (e.shiftKey) {
        onUpdateBlock(blockId, { indent_level: Math.max(0, currentLevel - 1) });
      } else {
        onUpdateBlock(blockId, { indent_level: Math.min(3, currentLevel + 1) });
      }
    }
  }, [blocks, onAddBlock, onDeleteBlock, onUpdateBlock]);

  // Calculate numbered list indices
  const getNumberedIndex = (blockIndex: number): number => {
    let count = 1;
    for (let i = blockIndex - 1; i >= 0; i--) {
      if (blocks[i].type !== 'numbered_list') break;
      count++;
    }
    return count;
  };

  const wordCount = countWords(blocks);
  const readMin = readingTime(wordCount);

  if (loading) {
    return (
      <div className="block-editor-loading">
        {[100, 70, 90, 45, 80].map((w, i) => (
          <div key={i} className="skeleton-block" style={{ width: `${w}%` }} />
        ))}
      </div>
    );
  }

  return (
    <div className="block-editor">
      {blocks.length === 0 && (
        <div className="block-editor-empty">
          <p className="block-editor-empty-hint">✨ Start writing... or press <kbd>/</kbd> for commands</p>
          <button
            className="block-editor-empty-btn"
            onClick={() => onAddBlock('paragraph', null).then(b => setFocusedBlockId(b.$id))}
          >
            <Plus size={14} /> Add a block
          </button>
        </div>
      )}

      <AnimatePresence initial={false}>
        {blocks.map((block, i) => (
          <BlockEditorBlock
            key={block.$id}
            block={block}
            isFocused={focusedBlockId === block.$id}
            onFocus={() => setFocusedBlockId(block.$id)}
            onChange={content => onUpdateBlock(block.$id, { content })}
            onKeyDown={handleKeyDown}
            onDelete={() => {
              onDeleteBlock(block.$id);
              const prev = blocks[i - 1];
              setFocusedBlockId(prev?.$id ?? null);
            }}
            onTypeChange={type => onChangeType(block.$id, type)}
            onCheckToggle={() => onUpdateBlock(block.$id, { checked: !block.checked })}
            numberedIndex={getNumberedIndex(i)}
          />
        ))}
      </AnimatePresence>

      {/* Word count bar */}
      {blocks.length > 0 && (
        <motion.div
          className="word-count-bar"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          {wordCount} words · {readMin} min read
        </motion.div>
      )}
    </div>
  );
}

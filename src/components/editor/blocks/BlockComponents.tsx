import { useRef, useEffect, useState, KeyboardEvent } from 'react';
import { Block, BlockType } from '../../../types';

interface BlockProps {
  block: Block;
  isFocused: boolean;
  onFocus: () => void;
  onChange: (content: string) => void;
  onKeyDown: (e: KeyboardEvent<HTMLElement>, blockId: string) => void;
  onCheckToggle?: () => void;
  numberedIndex?: number;
  placeholder?: string;
}

export function ParagraphBlock({ block, isFocused, onFocus, onChange, onKeyDown, placeholder }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) {
      ref.current.focus();
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isFocused]);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) {
      ref.current.textContent = block.content ?? '';
    }
  }, [block.$id]);

  const style: React.CSSProperties = {
    color: block.color?.startsWith('bg-') ? undefined : block.color,
    backgroundColor: block.color?.startsWith('bg-') ? block.color.slice(3) : undefined,
    paddingLeft: `${(block.indent_level ?? 0) * 24}px`,
  };

  return (
    <div
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`block-text ${!block.content && isFocused ? 'empty' : ''}`}
      data-placeholder={!block.content && isFocused ? (placeholder ?? "Type '/' for commands") : ''}
      style={style}
      onFocus={onFocus}
      onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
      onKeyDown={e => onKeyDown(e, block.$id)}
    />
  );
}

export function HeadingBlock({ block, isFocused, onFocus, onChange, onKeyDown }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const tagMap: Record<BlockType, string> = {
    heading_1: 'h1', heading_2: 'h2', heading_3: 'h3',
  } as any;
  const Tag = (tagMap[block.type] ?? 'div') as any;
  const placeholderMap: Record<string, string> = {
    heading_1: 'Heading 1', heading_2: 'Heading 2', heading_3: 'Heading 3',
  };

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) {
      ref.current.focus();
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(ref.current);
      range.collapse(false);
      sel?.removeAllRanges();
      sel?.addRange(range);
    }
  }, [isFocused]);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) {
      ref.current.textContent = block.content ?? '';
    }
  }, [block.$id]);

  return (
    <Tag
      ref={ref}
      contentEditable
      suppressContentEditableWarning
      className={`block-heading block-${block.type} ${!block.content && isFocused ? 'empty' : ''}`}
      data-placeholder={!block.content && isFocused ? (placeholderMap[block.type] ?? '') : ''}
      onFocus={onFocus}
      onInput={(e: any) => onChange((e.currentTarget as HTMLElement).textContent ?? '')}
      onKeyDown={(e: any) => onKeyDown(e, block.$id)}
    />
  );
}

export function TodoBlock({ block, isFocused, onFocus, onChange, onKeyDown, onCheckToggle }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) {
      ref.current.focus();
    }
  }, [isFocused]);

  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) {
      ref.current.textContent = block.content ?? '';
    }
  }, [block.$id]);

  return (
    <div className="block-todo" style={{ paddingLeft: `${(block.indent_level ?? 0) * 24}px` }}>
      <button
        className={`todo-checkbox ${block.checked ? 'checked' : ''}`}
        onClick={onCheckToggle}
        aria-label={block.checked ? 'Mark incomplete' : 'Mark complete'}
      >
        {block.checked && (
          <svg viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" width="10" height="10">
            <path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )}
      </button>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`block-text ${block.checked ? 'checked-text' : ''} ${!block.content && isFocused ? 'empty' : ''}`}
        data-placeholder={!block.content && isFocused ? 'To-do' : ''}
        onFocus={onFocus}
        onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
        onKeyDown={e => onKeyDown(e, block.$id)}
      />
    </div>
  );
}

export function BulletedListBlock({ block, isFocused, onFocus, onChange, onKeyDown }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const bulletMap = ['•', '◦', '▪', '▸'];
  const bullet = bulletMap[Math.min(block.indent_level ?? 0, 3)];

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) ref.current.focus();
  }, [isFocused]);
  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) ref.current.textContent = block.content ?? '';
  }, [block.$id]);

  return (
    <div className="block-list-item" style={{ paddingLeft: `${(block.indent_level ?? 0) * 24}px` }}>
      <span className="block-list-bullet">{bullet}</span>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`block-text ${!block.content && isFocused ? 'empty' : ''}`}
        data-placeholder={!block.content && isFocused ? 'List item' : ''}
        onFocus={onFocus}
        onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
        onKeyDown={e => onKeyDown(e, block.$id)}
      />
    </div>
  );
}

export function NumberedListBlock({ block, isFocused, onFocus, onChange, onKeyDown, numberedIndex = 1 }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) ref.current.focus();
  }, [isFocused]);
  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) ref.current.textContent = block.content ?? '';
  }, [block.$id]);

  return (
    <div className="block-list-item" style={{ paddingLeft: `${(block.indent_level ?? 0) * 24}px` }}>
      <span className="block-list-number">{numberedIndex}.</span>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`block-text ${!block.content && isFocused ? 'empty' : ''}`}
        data-placeholder={!block.content && isFocused ? 'List item' : ''}
        onFocus={onFocus}
        onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
        onKeyDown={e => onKeyDown(e, block.$id)}
      />
    </div>
  );
}

export function QuoteBlock({ block, isFocused, onFocus, onChange, onKeyDown }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) ref.current.focus();
  }, [isFocused]);
  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) ref.current.textContent = block.content ?? '';
  }, [block.$id]);

  return (
    <div className="block-quote">
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`block-text ${!block.content && isFocused ? 'empty' : ''}`}
        data-placeholder={!block.content && isFocused ? 'Quote' : ''}
        onFocus={onFocus}
        onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
        onKeyDown={e => onKeyDown(e, block.$id)}
      />
    </div>
  );
}

export function CalloutBlock({ block, isFocused, onFocus, onChange, onKeyDown }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) ref.current.focus();
  }, [isFocused]);
  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) ref.current.textContent = block.content ?? '';
  }, [block.$id]);

  return (
    <div className="block-callout">
      <span className="callout-icon" role="img">{block.callout_icon || '💡'}</span>
      <div
        ref={ref}
        contentEditable
        suppressContentEditableWarning
        className={`block-text ${!block.content && isFocused ? 'empty' : ''}`}
        data-placeholder={!block.content && isFocused ? 'Callout text' : ''}
        onFocus={onFocus}
        onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
        onKeyDown={e => onKeyDown(e, block.$id)}
      />
    </div>
  );
}

export function CodeBlock({ block, isFocused, onFocus, onChange, onKeyDown }: BlockProps) {
  const ref = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) ref.current.focus();
  }, [isFocused]);

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const textarea = ref.current!;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      onChange(textarea.value);
    } else {
      onKeyDown(e as any, block.$id);
    }
  };

  return (
    <div className="block-code">
      <div className="code-header">
        <span className="code-lang">{block.language || 'plain text'}</span>
        <button
          className="code-copy-btn"
          onClick={() => {
            navigator.clipboard.writeText(block.content ?? '');
          }}
          title="Copy code"
        >
          Copy
        </button>
      </div>
      <textarea
        ref={ref}
        className="code-textarea"
        value={block.content ?? ''}
        onChange={e => onChange(e.target.value)}
        onFocus={onFocus}
        onKeyDown={handleKeyDown}
        spellCheck={false}
        placeholder="// Code..."
        rows={Math.max(3, (block.content ?? '').split('\n').length + 1)}
      />
    </div>
  );
}

export function DividerBlock({ onKeyDown, block }: Partial<BlockProps> & { block: Block }) {
  return (
    <div
      className="block-divider"
      onClick={() => {}}
      tabIndex={0}
      onKeyDown={e => onKeyDown?.(e as any, block.$id)}
    >
      <hr />
    </div>
  );
}

export function ToggleBlock({ block, isFocused, onFocus, onChange, onKeyDown }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(() => {
    try { return JSON.parse(localStorage.getItem(`toggle_${block.$id}`) ?? 'false'); } catch { return false; }
  });

  const toggleOpen = () => {
    const next = !open;
    setOpen(next);
    localStorage.setItem(`toggle_${block.$id}`, JSON.stringify(next));
  };

  useEffect(() => {
    if (isFocused && ref.current && document.activeElement !== ref.current) ref.current.focus();
  }, [isFocused]);
  useEffect(() => {
    if (ref.current && ref.current.textContent !== block.content) ref.current.textContent = block.content ?? '';
  }, [block.$id]);

  return (
    <div className="block-toggle">
      <div className="toggle-header">
        <button className={`toggle-arrow ${open ? 'open' : ''}`} onClick={toggleOpen}>▶</button>
        <div
          ref={ref}
          contentEditable
          suppressContentEditableWarning
          className={`block-text ${!block.content && isFocused ? 'empty' : ''}`}
          data-placeholder={!block.content && isFocused ? 'Toggle' : ''}
          onFocus={onFocus}
          onInput={e => onChange((e.currentTarget as HTMLDivElement).textContent ?? '')}
          onKeyDown={e => onKeyDown(e, block.$id)}
        />
      </div>
      {open && <div className="toggle-content">{/* child blocks rendered by BlockEditor */}</div>}
    </div>
  );
}


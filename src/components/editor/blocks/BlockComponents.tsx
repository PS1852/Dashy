import { useRef, useEffect, useState, KeyboardEvent, CSSProperties, RefObject, ChangeEvent } from 'react';
import { Loader2, UploadCloud } from 'lucide-react';
import { storage, STORAGE_BUCKET_IMAGES, ID } from '../../../lib/appwrite';
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

function useEditableContentSync(
  ref: RefObject<HTMLElement | null>,
  value: string,
  isFocused: boolean
) {
  useEffect(() => {
    if (!isFocused || !ref.current || document.activeElement === ref.current) return;

    ref.current.focus();
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(ref.current);
    range.collapse(false);
    sel?.removeAllRanges();
    sel?.addRange(range);
  }, [isFocused, ref]);

  useEffect(() => {
    if (!ref.current || document.activeElement === ref.current) return;
    if (ref.current.textContent !== value) {
      ref.current.textContent = value;
    }
  }, [ref, value]);
}

export function ParagraphBlock({ block, isFocused, onFocus, onChange, onKeyDown, placeholder }: BlockProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEditableContentSync(ref, block.content ?? '', isFocused);

  const style: CSSProperties = {
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
  useEditableContentSync(ref, block.content ?? '', isFocused);

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
  useEditableContentSync(ref, block.content ?? '', isFocused);

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
  useEditableContentSync(ref, block.content ?? '', isFocused);

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
  useEditableContentSync(ref, block.content ?? '', isFocused);

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
  useEditableContentSync(ref, block.content ?? '', isFocused);

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
  useEditableContentSync(ref, block.content ?? '', isFocused);

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

  useEditableContentSync(ref, block.content ?? '', isFocused);

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

export function ImageBlock({ block, onChange, onKeyDown }: BlockProps) {
  const [uploading, setUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const res = await storage.createFile(STORAGE_BUCKET_IMAGES, ID.unique(), file);
      // Use getFilePreview which is more reliable for immediate rendering
      const url = storage.getFilePreview(STORAGE_BUCKET_IMAGES, res.$id, 1000).toString();
      onChange(url);
    } catch (err) {
      console.error('Upload failed:', err);
    } finally {
      setUploading(false);
    }
  };

  const hasImage = !!block.content && (block.content.startsWith('http') || block.content.startsWith('blob'));

  return (
    <div 
      className="block-image" 
      onClick={() => fileInputRef.current?.click()}
      onKeyDown={e => onKeyDown(e as any, block.$id)}
      tabIndex={0}
    >
      <input 
        ref={fileInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />

      {uploading && (
        <div className="image-uploading">
          <Loader2 className="spin" size={24} />
        </div>
      )}

      {hasImage ? (
        <img 
          src={block.content} 
          alt="User uploaded content" 
          className={`image-img ${uploading ? 'loading' : ''}`}
        />
      ) : (
        <div className="image-placeholder">
          <UploadCloud className="image-placeholder-icon" size={32} />
          <p className="image-placeholder-text">Click to upload image</p>
        </div>
      )}
    </div>
  );
}

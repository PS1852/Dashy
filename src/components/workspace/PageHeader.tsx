import { useEffect, useState, useRef } from 'react';
import { DashyPage } from '../../types';


const COVER_GRADIENTS = [
  'linear-gradient(135deg, #f5f0e8 0%, #e8dfd1 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
  'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
  'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
  'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
  'linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)',
  'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
  'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
  'linear-gradient(135deg, #ee9ca7 0%, #ffdde1 100%)',
  'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
  'linear-gradient(135deg, #f8b500 0%, #d4380d 100%)',
  'linear-gradient(135deg, #c1dfc4 0%, #deecdd 100%)',
  'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
  'linear-gradient(135deg, #d4fc79 0%, #96e6a1 100%)',
];

interface CoverPickerProps {
  onSelect: (coverUrl: string) => void;
  onRemove: () => void;
  onClose: () => void;
}

export function CoverPicker({ onSelect, onRemove, onClose }: CoverPickerProps) {
  return (
    <div className="cover-picker" onClick={e => e.stopPropagation()}>
      <div className="cover-picker-header">
        <span>Choose a cover</span>
        <button className="cover-picker-remove" onClick={onRemove}>Remove</button>
      </div>
      <div className="cover-picker-grid">
        {COVER_GRADIENTS.map((gradient, i) => (
          <button
            key={i}
            className="cover-picker-swatch"
            style={{ background: gradient }}
            onClick={() => { onSelect(gradient); onClose(); }}
            title={`Cover ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

interface PageHeaderProps {
  page: DashyPage;
  onUpdatePage: (data: Partial<DashyPage>) => void;
  onTitleChange: (title: string) => void;
}

const EMOJI_SUGGESTIONS = [
  '📝', '📋', '📌', '📎', '📁', '📚', '💡', '🎯', '🚀', '⭐', '🔥', '✅',
  '💼', '🏠', '🎨', '🔬', '📊', '📈', '💬', '🔗', '🗒️', '📅', '⚡', '🌟',
];

export function IconPicker({ onSelect, onRemove, onClose }: { onSelect: (icon: string) => void; onRemove: () => void; onClose: () => void }) {
  const [search, setSearch] = useState('');
  const filtered = search
    ? EMOJI_SUGGESTIONS.filter(() => true) // TODO: integrate real emoji search
    : EMOJI_SUGGESTIONS;

  return (
    <div className="icon-picker" onClick={e => e.stopPropagation()}>
      <input
        className="icon-picker-search"
        placeholder="Search emoji..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        autoFocus
      />
      <div className="icon-picker-grid">
        {filtered.map((emoji, i) => (
          <button
            key={i}
            className="icon-picker-emoji"
            onClick={() => { onSelect(emoji); onClose(); }}
          >
            {emoji}
          </button>
        ))}
      </div>
      <button className="icon-picker-remove" onClick={() => { onRemove(); onClose(); }}>Remove icon</button>
    </div>
  );
}

export default function PageHeader({ page, onUpdatePage, onTitleChange }: PageHeaderProps) {
  const [showCoverPicker, setShowCoverPicker] = useState(false);
  const [showIconPicker, setShowIconPicker] = useState(false);
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current || document.activeElement === titleRef.current) return;

    const nextTitle = page.title || '';
    if (titleRef.current.textContent !== nextTitle) {
      titleRef.current.textContent = nextTitle;
    }
  }, [page.$id, page.title]);

  const handleTitleInput = (e: React.FormEvent<HTMLDivElement>) => {
    const val = (e.currentTarget as HTMLDivElement).textContent ?? '';
    onTitleChange(val);
  };

  return (
    <div className="page-header-outer" onClick={() => { setShowCoverPicker(false); setShowIconPicker(false); }}>
      {/* Cover */}
      {page.cover_url ? (
        <div
          className="page-cover"
          style={{
            background: page.cover_url.startsWith('linear-gradient') ? page.cover_url : `url(${page.cover_url}) center/cover`,
          }}
        >
          <div className="page-cover-actions">
            <button onClick={e => { e.stopPropagation(); setShowCoverPicker(true); }}>Change cover</button>
            <button onClick={() => onUpdatePage({ cover_url: '' })}>Remove</button>
          </div>
          {showCoverPicker && (
            <CoverPicker
              onSelect={url => onUpdatePage({ cover_url: url })}
              onRemove={() => onUpdatePage({ cover_url: '' })}
              onClose={() => setShowCoverPicker(false)}
            />
          )}
        </div>
      ) : null}

      <div className="page-header-content">
        {/* Icon */}
        <div className="page-header-icon-row">
          {page.icon ? (
            <button className="page-icon-btn" onClick={e => { e.stopPropagation(); setShowIconPicker(true); }}>
              {page.icon}
              {showIconPicker && (
                <IconPicker
                  onSelect={icon => onUpdatePage({ icon })}
                  onRemove={() => onUpdatePage({ icon: '' })}
                  onClose={() => setShowIconPicker(false)}
                />
              )}
            </button>
          ) : null}

          {/* Add cover/icon hints */}
          <div className="page-header-hints">
            {!page.cover_url && (
              <button className="page-header-hint-btn" onClick={e => { e.stopPropagation(); setShowCoverPicker(true); }}>
                🖼 Add cover
                {showCoverPicker && (
                  <CoverPicker
                    onSelect={url => onUpdatePage({ cover_url: url })}
                    onRemove={() => onUpdatePage({ cover_url: '' })}
                    onClose={() => setShowCoverPicker(false)}
                  />
                )}
              </button>
            )}
            {!page.icon && (
              <button className="page-header-hint-btn" onClick={e => { e.stopPropagation(); setShowIconPicker(true); }}>
                😀 Add icon
                {showIconPicker && (
                  <IconPicker
                    onSelect={icon => onUpdatePage({ icon })}
                    onRemove={() => onUpdatePage({ icon: '' })}
                    onClose={() => setShowIconPicker(false)}
                  />
                )}
              </button>
            )}
          </div>
        </div>

        {/* Title */}
        <div
          ref={titleRef}
          contentEditable
          suppressContentEditableWarning
          className="page-title-editor"
          data-placeholder="Untitled"
          onInput={handleTitleInput}
          onBlur={() => {
            const nextTitle = titleRef.current?.textContent?.trim() || 'Untitled';
            if (titleRef.current && titleRef.current.textContent !== nextTitle) {
              titleRef.current.textContent = nextTitle;
            }
            onUpdatePage({ title: nextTitle });
          }}
        />
      </div>
    </div>
  );
}

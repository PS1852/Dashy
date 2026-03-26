import { useEffect, useState, useRef } from 'react';
import { MoreHorizontal, Share, Star, Trash2 } from 'lucide-react';
import { DashyPage } from '../types';

interface WorkspaceProps {
  page: DashyPage | undefined;
  onUpdatePage: (data: Partial<DashyPage>) => void;
  onDeletePage: () => void;
}

export default function Workspace({ page, onUpdatePage, onDeletePage }: WorkspaceProps) {
  const [title, setTitle] = useState(page?.title || '');
  const [content, setContent] = useState(page?.content || '');
  const [saving, setSaving] = useState(false);
  const saveTimeoutRef = useRef<any>(null);

  // Sync state when page changes (e.g., selecting a different page)
  useEffect(() => {
    if (page) {
      setTitle(page.title);
      setContent(page.content);
    }
  }, [page?.$id]);

  // Debounced Auto-save
  useEffect(() => {
    if (!page) return;

    // Don't save if content hasn't changed from the original prop
    if (title === page.title && content === page.content) return;

    if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);

    setSaving(true);
    saveTimeoutRef.current = setTimeout(() => {
      onUpdatePage({ title, content });
      setSaving(false);
    }, 1000);

    return () => {
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current);
    };
  }, [title, content]);

  if (!page) {
    return (
      <main className="workspace empty">
        <div className="empty-state">
          <div className="empty-icon">✨</div>
          <h2>Select a page to start</h2>
          <p>Or create a new one from the sidebar.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="workspace">
      <header className="workspace-header">
        <div className="header-breadcrumbs">
          <span>Dashy</span> / <span>Workspace</span> / <span>{page.title || 'Untitled'}</span>
        </div>
        <div className="header-actions">
          {saving && <span className="saving-indicator">Saving...</span>}
          <div className="action-item"><Share size={18} /> Share</div>
          <div className="action-item"><Star size={18} /> Favorite</div>
          <div className="action-item delete" onClick={onDeletePage}>
            <Trash2 size={18} />
          </div>
          <div className="action-item"><MoreHorizontal size={18} /></div>
        </div>
      </header>
      
      <div className="content-area">
        <div className="page-header">
          <div className="page-icon">📄</div>
          <input 
            className="page-title-input" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
          />
        </div>
        
        <div className="editor-content">
          <textarea
            className="editor-textarea"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Start writing..."
          />
        </div>
      </div>
    </main>
  );
}

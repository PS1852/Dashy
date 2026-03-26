import { useState, useEffect, useCallback, useRef } from 'react';
import { Search, FileText, Clock } from 'lucide-react';
import Modal from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import { DashyPage } from '../../types';
import { databases, DB_ID, COLLECTION_ID_PAGES, Query } from '../../lib/appwrite';
import { relativeTime } from '../../utils/dateUtils';

const RECENT_PAGES_KEY = 'dashy_recent_pages';

function getRecentPageIds(): string[] {
  try {
    return JSON.parse(localStorage.getItem(RECENT_PAGES_KEY) ?? '[]');
  } catch { return []; }
}

function addRecentPageId(id: string) {
  const list = getRecentPageIds().filter(i => i !== id);
  localStorage.setItem(RECENT_PAGES_KEY, JSON.stringify([id, ...list].slice(0, 5)));
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const { pages, setActivePageId, user } = useApp();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<DashyPage[]>([]);
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [searching, setSearching] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const recentPageIds = getRecentPageIds();
  const recentPages = recentPageIds.map(id => pages.find(p => p.$id === id)).filter(Boolean) as DashyPage[];

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults([]);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const search = useCallback(async (term: string) => {
    if (!term.trim() || !user) { setResults([]); return; }
    setSearching(true);
    try {
      // Title search
      const titleRes = await databases.listDocuments<DashyPage>(DB_ID, COLLECTION_ID_PAGES, [
        Query.equal('userId', user.$id),
        Query.equal('is_deleted', false),
        Query.search('title', term),
        Query.limit(8),
      ]);
      setResults(titleRes.documents);
    } catch {
      // Fallback: client-side filter
      const lower = term.toLowerCase();
      setResults(pages.filter(p => p.title?.toLowerCase().includes(lower) && !p.is_deleted).slice(0, 8));
    } finally {
      setSearching(false);
    }
  }, [user, pages]);

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => search(query), 300);
    return () => { if (debounceRef.current) clearTimeout(debounceRef.current); };
  }, [query, search]);

  const navigate = (page: DashyPage) => {
    addRecentPageId(page.$id);
    setActivePageId(page.$id);
    onClose();
  };

  const displayList = query ? results : recentPages;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowDown') { e.preventDefault(); setSelectedIdx(i => Math.min(i + 1, displayList.length - 1)); }
      if (e.key === 'ArrowUp') { e.preventDefault(); setSelectedIdx(i => Math.max(i - 1, 0)); }
      if (e.key === 'Enter') { const p = displayList[selectedIdx]; if (p) navigate(p); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, displayList, selectedIdx]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <div className="search-modal">
        <div className="search-modal-input-wrap">
          <Search size={18} className="search-modal-icon" />
          <input
            ref={inputRef}
            className="search-modal-input"
            placeholder="Search pages..."
            value={query}
            onChange={e => { setQuery(e.target.value); setSelectedIdx(0); }}
          />
          {searching && <div className="search-modal-spinner" />}
        </div>

        <div className="search-modal-results">
          {!query && recentPages.length > 0 && (
            <div className="search-section-header">
              <Clock size={13} /> RECENT
            </div>
          )}
          {displayList.length === 0 && query && !searching && (
            <div className="search-empty">No results for "{query}"</div>
          )}
          {displayList.map((page, i) => (
            <button
              key={page.$id}
              className={`search-result-item ${i === selectedIdx ? 'selected' : ''}`}
              onClick={() => navigate(page)}
              onMouseEnter={() => setSelectedIdx(i)}
            >
              <span className="search-result-icon">
                {page.icon || <FileText size={16} />}
              </span>
              <span className="search-result-info">
                <span className="search-result-title">{page.title || 'Untitled'}</span>
                <span className="search-result-time">{relativeTime(page.$updatedAt)}</span>
              </span>
            </button>
          ))}
        </div>
      </div>
    </Modal>
  );
}

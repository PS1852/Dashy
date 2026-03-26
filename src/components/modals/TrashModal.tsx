import { useState, useEffect } from 'react';
import { Trash2, RotateCcw, AlertTriangle } from 'lucide-react';
import Modal from '../ui/Modal';
import { useApp } from '../../context/AppContext';
import { DashyPage } from '../../types';
import { databases, DB_ID, COLLECTION_ID_PAGES, Query } from '../../lib/appwrite';
import { relativeTime } from '../../utils/dateUtils';

interface TrashModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function TrashModal({ isOpen, onClose }: TrashModalProps) {
  const { user, restorePage, permanentlyDeletePage } = useApp();
  const [trashPages, setTrashPages] = useState<DashyPage[]>([]);
  const [loading, setLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const fetchTrash = async () => {
    if (!user) return;
    setLoading(true);
    try {
      const res = await databases.listDocuments<DashyPage>(DB_ID, COLLECTION_ID_PAGES, [
        Query.equal('userId', user.$id),
        Query.equal('is_deleted', true),
        Query.limit(50),
      ]);
      setTrashPages(res.documents);
    } catch { } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) fetchTrash();
  }, [isOpen]);

  const handleRestore = async (page: DashyPage) => {
    await restorePage(page.$id);
    setTrashPages(prev => prev.filter(p => p.$id !== page.$id));
  };

  const handleDeleteForever = async (id: string) => {
    await permanentlyDeletePage(id);
    setTrashPages(prev => prev.filter(p => p.$id !== id));
    setConfirmDeleteId(null);
  };

  const handleEmptyTrash = async () => {
    for (const page of trashPages) {
      await permanentlyDeletePage(page.$id);
    }
    setTrashPages([]);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Trash" size="md">
      <div className="trash-modal">
        {trashPages.length > 0 && (
          <div className="trash-empty-all">
            <button className="danger-btn" onClick={handleEmptyTrash}>
              <Trash2 size={14} /> Empty trash
            </button>
            <span className="trash-hint">Pages in trash are automatically deleted after 30 days.</span>
          </div>
        )}

        {loading && <div className="trash-loading">Loading...</div>}

        {!loading && trashPages.length === 0 && (
          <div className="trash-empty-state">
            <Trash2 size={40} className="trash-empty-icon" />
            <p>Trash is empty</p>
          </div>
        )}

        <div className="trash-list">
          {trashPages.map(page => (
            <div key={page.$id} className="trash-item">
              <span className="trash-item-icon">{page.icon || '📄'}</span>
              <div className="trash-item-info">
                <span className="trash-item-title">{page.title || 'Untitled'}</span>
                <span className="trash-item-date">
                  Deleted {relativeTime(page.deleted_at || page.$updatedAt)}
                </span>
              </div>
              <div className="trash-item-actions">
                <button className="trash-restore-btn" onClick={() => handleRestore(page)} title="Restore">
                  <RotateCcw size={14} /> Restore
                </button>
                {confirmDeleteId === page.$id ? (
                  <span className="trash-confirm-delete">
                    <button className="danger-btn-sm" onClick={() => handleDeleteForever(page.$id)}>Delete forever</button>
                    <button onClick={() => setConfirmDeleteId(null)}>Cancel</button>
                  </span>
                ) : (
                  <button
                    className="trash-delete-btn"
                    onClick={() => setConfirmDeleteId(page.$id)}
                    title="Delete forever"
                  >
                    <AlertTriangle size={14} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Modal>
  );
}

import { useState } from 'react';
import { Copy, Check, Globe, Lock } from 'lucide-react';
import Modal from '../ui/Modal';
import { DashyPage } from '../../types';

interface ShareModalProps {
  page: DashyPage | undefined;
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareModal({ page, isOpen, onClose }: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const shareUrl = page ? `${window.location.origin}${window.location.pathname}#/page/${page.$id}` : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Share page" size="sm">
      <div className="share-modal">
        <div className="share-section">
          <div className="share-status-row">
            <div className="share-status-icon private">
              <Lock size={14} />
            </div>
            <div className="share-status-info">
              <div className="share-status-title">Restricted</div>
              <div className="share-status-desc">Only you can access this page.</div>
            </div>
          </div>
        </div>

        <div className="share-divider" />

        <div className="share-section">
          <div className="share-label">Share link</div>
          <div className="share-link-input-group">
            <input 
              readOnly 
              value={shareUrl} 
              className="share-link-input"
            />
            <button 
              className={`share-copy-btn ${copied ? 'copied' : ''}`}
              onClick={handleCopy}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
        </div>

        <div className="share-footer">
          <Globe size={14} />
          <span>Publishing to web is coming soon in the next update.</span>
        </div>
      </div>
    </Modal>
  );
}

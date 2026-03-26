import { useState } from 'react';
import { MoreHorizontal, Share, Star } from 'lucide-react';

export default function Workspace() {
  const [title, setTitle] = useState('Workspace Home');

  return (
    <main className="workspace">
      <header className="workspace-header">
        <div className="header-breadcrumbs">
          <span>Dashy</span> / <span>General</span>
        </div>
        <div className="header-actions">
          <div className="action-item"><Share size={18} /> Share</div>
          <div className="action-item"><Star size={18} /> Favorite</div>
          <div className="action-item"><MoreHorizontal size={18} /></div>
        </div>
      </header>
      
      <div className="content-area">
        <div className="page-header">
          <div className="page-icon">🚀</div>
          <input 
            className="page-title-input" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Untitled"
          />
        </div>
        
        <div className="editor-content">
          <div className="block">
            <p className="welcome-text">Welcome back to your digital workspace. This is a clean, minimal interface designed for focus and productivity.</p>
          </div>
          <div className="block">
            <h3>Getting Started</h3>
            <ul className="bullet-list">
              <li>Create a new page by clicking the + icon in the sidebar.</li>
              <li>Type '/' to see available blocks (coming soon).</li>
              <li>Share your workspace with others using the Share button.</li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

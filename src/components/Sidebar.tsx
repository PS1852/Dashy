import { Home, Search, Clock, Grid, Settings, Plus, LogOut, FileText } from 'lucide-react';
import { account } from '../lib/appwrite';
import { DashyPage } from '../types';

interface SidebarProps {
  user: any;
  pages: DashyPage[];
  activePageId: string | null;
  onSelectPage: (id: string) => void;
  onCreatePage: () => void;
}

export default function Sidebar({ user, pages, activePageId, onSelectPage, onCreatePage }: SidebarProps) {
  const handleLogout = async () => {
    await account.deleteSession('current');
    window.location.reload();
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="user-info">
          <div className="user-avatar">{user?.name?.charAt(0) || 'U'}</div>
          <span className="user-name">{user?.name || 'User'}</span>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section">
          <div className="nav-item">
            <Search size={18} />
            <span>Search</span>
          </div>
          <div className="nav-item">
            <Clock size={18} />
            <span>Updates</span>
          </div>
          <div className="nav-item">
            <Settings size={18} />
            <span>Settings</span>
          </div>
        </div>

        <div className="nav-section">
          <div className="section-title">Workspace</div>
          <div className="nav-item active">
            <Home size={18} />
            <span>Home</span>
          </div>
          <div className="nav-item">
            <Grid size={18} />
            <span>Dashboards</span>
          </div>
        </div>

        <div className="nav-section flex-grow">
          <div className="section-title flex justify-between items-center">
            <span>Pages</span>
            <Plus size={14} className="cursor-pointer hover:bg-slate-200 rounded" onClick={onCreatePage} />
          </div>
          <div className="pages-list">
            {pages.map((page) => (
              <div 
                key={page.$id} 
                className={`nav-item ${activePageId === page.$id ? 'active' : ''}`}
                onClick={() => onSelectPage(page.$id)}
              >
                <FileText size={14} />
                <span className="truncate">{page.title || 'Untitled'}</span>
              </div>
            ))}
          </div>
        </div>
      </nav>

      <div className="sidebar-footer">
        <div className="nav-item logout" onClick={handleLogout}>
          <LogOut size={18} />
          <span>Logout</span>
        </div>
      </div>
    </aside>
  );
}

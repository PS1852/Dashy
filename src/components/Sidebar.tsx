import { Home, Search, Clock, Grid, Settings, Plus, ChevronRight, LogOut } from 'lucide-react';
import { account } from '../lib/appwrite';

interface SidebarProps {
  user: any;
}

export default function Sidebar({ user }: SidebarProps) {
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
            <Plus size={14} className="cursor-pointer" />
          </div>
          <div className="nav-item">
            <ChevronRight size={14} />
            <span>Project Roadmap</span>
          </div>
          <div className="nav-item">
            <ChevronRight size={14} />
            <span>Meeting Notes</span>
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

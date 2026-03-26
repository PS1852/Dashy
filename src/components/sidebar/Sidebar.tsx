import { useState, useRef, useEffect, useCallback } from 'react';
import { Search, Plus, Settings, Trash2, Star, HelpCircle, LogOut, PanelLeftClose } from 'lucide-react';
import { motion } from 'framer-motion';
import { account } from '../../lib/appwrite';
import { useApp } from '../../context/AppContext';
import { SidebarItemContainer } from './SidebarItem';
import Tooltip from '../ui/Tooltip';

export default function Sidebar() {
  const {
    user, pages,
    createPage, openModal, isSidebarOpen, toggleSidebar,
  } = useApp();

  const [search, setSearch] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(260);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(260);

  const handleLogout = async () => {
    await account.deleteSession('current');
    window.location.reload();
  };

  // ─── Sidebar resize ─────────────────────────────────────────────────────
  const onResizeMouseDown = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    startX.current = e.clientX;
    startWidth.current = sidebarWidth;
    document.body.style.cursor = 'col-resize';
    document.body.style.userSelect = 'none';
  }, [sidebarWidth]);

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const delta = e.clientX - startX.current;
      const newWidth = Math.min(480, Math.max(200, startWidth.current + delta));
      setSidebarWidth(newWidth);
    };
    const onMouseUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };
  }, []);

  // ─── Filter pages by search ─────────────────────────────────────────────
  const filtered = search
    ? pages.filter(p => p.title?.toLowerCase().includes(search.toLowerCase()))
    : pages;

  const rootPages = filtered.filter(p => !p.parent_id);
  const favoritePages = filtered.filter(p => p.is_favorite);

  if (!isSidebarOpen) {
    return (
      <motion.div
        className="sidebar-collapsed"
        initial={false}
        animate={{ x: 0, opacity: 1 }}
      >
        <Tooltip content="Open sidebar (⌘\)">
          <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Open sidebar">
            <PanelLeftClose size={18} />
          </button>
        </Tooltip>
      </motion.div>
    );
  }

  return (
    <motion.aside
      className="sidebar"
      style={{ width: sidebarWidth }}
      initial={{ x: -260 }}
      animate={{ x: 0 }}
      exit={{ x: -260 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Header: User info */}
      <div className="sidebar-header">
        <div className="user-info" onClick={() => openModal('settings')}>
          <div className="user-avatar">
            {user?.name?.charAt(0).toUpperCase() || 'U'}
          </div>
          <span className="user-name">{user?.name || 'My Workspace'}</span>
        </div>
        <Tooltip content="Collapse sidebar (⌘\)">
          <button className="sidebar-icon-btn" onClick={toggleSidebar} aria-label="Collapse sidebar">
            <PanelLeftClose size={16} />
          </button>
        </Tooltip>
      </div>

      {/* Quick actions */}
      <div className="sidebar-quick-actions">
        <button className="sidebar-quick-btn" onClick={() => openModal('search')}>
          <Search size={15} />
          <span>Search</span>
          <kbd>⌘K</kbd>
        </button>
        <Tooltip content="New page (⌘N)">
          <button className="sidebar-quick-btn sidebar-quick-new" onClick={() => createPage()}>
            <Plus size={15} />
          </button>
        </Tooltip>
      </div>

      {/* Local search filter */}
      <div className="sidebar-search-wrap">
        <Search size={13} className="sidebar-search-icon" />
        <input
          className="sidebar-search-input"
          placeholder="Filter pages..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Pages list */}
      <div className="sidebar-pages">
        {/* Favorites */}
        {favoritePages.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <Star size={11} /> FAVORITES
            </div>
            {favoritePages.map(page => (
              <SidebarItemContainer key={page.$id} page={page} depth={0} allPages={pages} />
            ))}
          </div>
        )}

        {/* Pages */}
        <div className="sidebar-section">
          <div className="sidebar-section-title">PAGES</div>
          {rootPages.length === 0 ? (
            <div className="sidebar-empty">
              {search ? (
                <span className="sidebar-empty-text">No pages matching "{search}"</span>
              ) : (
                <>
                  <span className="sidebar-empty-text">No pages yet</span>
                  <button className="sidebar-empty-btn" onClick={() => createPage()}>
                    <Plus size={13} /> New page
                  </button>
                </>
              )}
            </div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={{
                hidden: {},
                visible: { transition: { staggerChildren: 0.03 } },
              }}
            >
              {rootPages.map(page => (
                <SidebarItemContainer key={page.$id} page={page} depth={0} allPages={pages} />
              ))}
            </motion.div>
          )}
        </div>

        {/* New page */}
        <button className="sidebar-new-page-btn" onClick={() => createPage()}>
          <Plus size={14} /> New page
        </button>
      </div>

      {/* Footer */}
      <div className="sidebar-footer">
        <Tooltip content="Trash">
          <button className="sidebar-footer-btn" onClick={() => openModal('trash')}>
            <Trash2 size={16} /> <span>Trash</span>
          </button>
        </Tooltip>
        <Tooltip content="Settings">
          <button className="sidebar-footer-btn" onClick={() => openModal('settings')}>
            <Settings size={16} /> <span>Settings</span>
          </button>
        </Tooltip>
        <Tooltip content="Keyboard shortcuts (?)">
          <button className="sidebar-footer-btn" onClick={() => openModal('shortcuts')}>
            <HelpCircle size={16} />
          </button>
        </Tooltip>
        <Tooltip content="Sign out">
          <button className="sidebar-footer-btn danger" onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </Tooltip>
      </div>

      {/* Resize handle */}
      <div className="sidebar-resize-handle" onMouseDown={onResizeMouseDown} />
    </motion.aside>
  );
}

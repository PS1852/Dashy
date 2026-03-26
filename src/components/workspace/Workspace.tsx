import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Share, MoreHorizontal, CheckCircle, Loader2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { useBlocks } from '../../hooks/useBlocks';
import { DashyPage } from '../../types';
import BlockEditor from '../editor/BlockEditor';
import PageHeader from './PageHeader';
import Dashboard from './Dashboard';
import { SaveStatus } from '../../types';
import { exportAsMarkdown, exportAsPlainText, downloadFile } from '../../utils/exportUtils';
import { relativeTime } from '../../utils/dateUtils';

function SaveIndicator({ status }: { status: SaveStatus }) {
  if (status === 'idle') return null;
  return (
    <motion.div
      className={`save-indicator save-${status}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {status === 'saving' && <><Loader2 size={13} className="spin" /> Saving...</>}
      {status === 'saved' && <><CheckCircle size={13} /> Saved</>}
      {status === 'error' && <>⚠ Save failed</>}
    </motion.div>
  );
}

interface WorkspaceProps {
  page: DashyPage | undefined;
  onUpdatePage: (data: Partial<DashyPage>) => void;
}

export default function Workspace({ page, onUpdatePage }: WorkspaceProps) {
  const { isSidebarOpen, toggleSidebar, openModal, user, getPageProject } = useApp();
  const {
    blocks, loading, saveStatus,
    addBlock, updateBlock, deleteBlock, changeBlockType,
  } = useBlocks(page?.$id ?? null, user?.$id ?? null);
  const activeProject = getPageProject(page?.$id);

  // Update browser tab title
  useEffect(() => {
    if (page) {
      const icon = page.icon ? `${page.icon} ` : '';
      document.title = `${icon}${page.title || 'Untitled'} | Dashy`;
    } else {
      document.title = 'Dashy';
    }
  }, [page?.title, page?.icon]);

  if (!page) {
    return <Dashboard />;
  }

  return (
    <main className="workspace">
      {/* Top bar */}
      <header className="workspace-topbar">
        <div className="topbar-left">
          {!isSidebarOpen && (
            <button className="topbar-icon-btn" onClick={toggleSidebar} title="Open sidebar">
              <Menu size={18} />
            </button>
          )}
          <nav className="workspace-breadcrumb" aria-label="Breadcrumb">
            <span className="breadcrumb-root">Dashy</span>
            <span className="breadcrumb-sep">/</span>
            {activeProject && (
              <>
                <span className="breadcrumb-project">{activeProject.icon} {activeProject.name}</span>
                <span className="breadcrumb-sep">/</span>
              </>
            )}
            <span className="breadcrumb-current">{page.icon && `${page.icon} `}{page.title || 'Untitled'}</span>
          </nav>
        </div>

        <div className="topbar-right">
          <AnimatePresence mode="wait">
            <SaveIndicator key={saveStatus} status={saveStatus} />
          </AnimatePresence>

          <button className="topbar-btn" onClick={() => openModal('share')}>
            <Share size={15} /> Share
          </button>

          <div className="topbar-more-wrap">
            <button
              className="topbar-icon-btn"
              title="Page options"
              onClick={() => {
                // Simple options dropdown
                const menu = document.getElementById('page-options-menu');
                if (menu) menu.classList.toggle('open');
              }}
            >
              <MoreHorizontal size={18} />
            </button>
            <div id="page-options-menu" className="page-options-menu">
              <button onClick={() => {
                const md = exportAsMarkdown(page, blocks);
                downloadFile(md, `${page.title || 'Untitled'}.md`, 'text/markdown');
              }}>Export as Markdown</button>
              <button onClick={() => {
                const txt = exportAsPlainText(page, blocks);
                downloadFile(txt, `${page.title || 'Untitled'}.txt`, 'text/plain');
              }}>Export as Plain Text</button>
            </div>
          </div>
        </div>
      </header>

      {/* Page content */}
      <motion.div
        key={page.$id}
        className="workspace-content"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`content-area ${page ? 'full' : ''}`}>
          <PageHeader
            page={page}
            onUpdatePage={onUpdatePage}
            onTitleChange={title => onUpdatePage({ title })}
          />

          <BlockEditor
            blocks={blocks}
            loading={loading}
            onAddBlock={addBlock}
            onUpdateBlock={updateBlock}
            onDeleteBlock={deleteBlock}
            onChangeType={changeBlockType}
          />
        </div>

        {/* Status bar */}
        <div className="workspace-statusbar">
          <span>{relativeTime(page.$updatedAt)}</span>
        </div>
      </motion.div>
    </main>
  );
}

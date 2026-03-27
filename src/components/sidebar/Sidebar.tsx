import { useState, useRef, useEffect, useCallback } from 'react';
import {
  Search,
  Plus,
  Settings,
  Trash2,
  Star,
  LogOut,
  PanelLeftClose,
  FolderPlus,
  ChevronRight,
  FolderOpen,
  MoreHorizontal,
  Edit2,
  LayoutDashboard,
  Command,
} from 'lucide-react';
import { ContextMenu } from '../ui/ContextMenu';
import { motion, AnimatePresence } from 'framer-motion';
import { account } from '../../lib/appwrite';
import { useApp } from '../../context/AppContext';
import { SidebarItemContainer } from './SidebarItem';
import Tooltip from '../ui/Tooltip';
import { DashyPage, DashyProject } from '../../types';
import ConfirmationModal from '../modals/ConfirmationModal';

interface ProjectGroupProps {
  project: DashyProject;
  pages: DashyPage[];
  allProjectPages: DashyPage[];
  onCreatePage: (projectId: string) => void;
  onUpdateProject: (id: string, data: Partial<DashyProject>) => void;
  onDeleteProject: (id: string) => void;
  onDeletePage: (id: string, title?: string) => void;
}

function ProjectGroup({ 
  project, pages, allProjectPages, onCreatePage, onUpdateProject, onDeleteProject, onDeletePage 
}: ProjectGroupProps) {
  const [expanded, setExpanded] = useState(true);
  const hasPages = pages.length > 0;

  return (
    <div className="sidebar-project-group">
      <div
        className="sidebar-project-row"
        onClick={() => {
          if (hasPages) {
            setExpanded(value => !value);
            return;
          }
          onCreatePage(project.$id);
        }}
      >
        <span className={`sidebar-project-chevron ${hasPages ? 'visible' : ''}`}>
          {hasPages && (
            <motion.span
              animate={{ rotate: expanded ? 90 : 0 }}
              transition={{ duration: 0.15 }}
            >
              <ChevronRight size={14} />
            </motion.span>
          )}
        </span>

        <span className="sidebar-project-icon" style={{ color: project.color }}>
          {project.icon || <FolderOpen size={14} />}
        </span>

        <span className="sidebar-project-title">{project.name}</span>

        <div className="sidebar-project-actions" onClick={e => e.stopPropagation()}>
          <button
            className="sidebar-icon-btn"
            onClick={event => {
              event.stopPropagation();
              onCreatePage(project.$id);
            }}
            title={`Add page to ${project.name}`}
          >
            <Plus size={14} />
          </button>
          
          <ContextMenu 
            trigger={<MoreHorizontal size={14} className="visible" />} 
            triggerClassName="sidebar-icon-btn project-more-btn"
            items={[
              {
                label: 'Rename project',
                icon: <Edit2 size={14} />,
                onClick: () => {
                  const newName = prompt('Rename Project:', project.name);
                  if (newName) onUpdateProject(project.$id, { name: newName });
                },
              },
              { label: '', separator: true, onClick: () => {} },
              {
                label: 'Delete project',
                icon: <Trash2 size={14} />,
                onClick: () => onDeleteProject(project.$id),
                danger: true,
              },
            ]}
          />
        </div>
      </div>

      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div
            className="sidebar-project-pages"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
          >
            {pages.length === 0 ? (
              <button
                className="sidebar-project-empty"
                onClick={() => onCreatePage(project.id)}
              >
                <Plus size={12} /> Create first page
              </button>
            ) : (
              pages.map(page => (
                <SidebarItemContainer
                  key={page.$id}
                  page={page}
                  depth={1}
                  allPages={allProjectPages}
                  onDelete={onDeletePage}
                />
              ))
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Sidebar() {
  const {
    user, pages, projects, pageProjectMap,
    createPage, createProject, updateProject, deleteProject, softDeletePage,
    openModal, isSidebarOpen, toggleSidebar,
    activePageId, setActivePageId,
  } = useApp();

  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [confirmDeleteType, setConfirmDeleteType] = useState<'page' | 'project' | null>(null);
  const [confirmDeleteTitle, setConfirmDeleteTitle] = useState('');
  const [search, setSearch] = useState('');
  const [sidebarWidth, setSidebarWidth] = useState(260);

  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(260);

  const handleLogout = async () => {
    await account.deleteSession('current');
    window.location.reload();
  };

  const handleCreateProject = useCallback(async () => {
    const nextProjectNumber = projects.length + 1;
    const project = await createProject(`Project ${nextProjectNumber}`);
    if (project) {
      await createPage({
        projectId: project.$id,
        title: `${project.name} home`,
      });
    }
  }, [createPage, createProject, projects.length]);

  const handleCreateProjectPage = useCallback((projectId: string) => {
    void createPage({ projectId });
  }, [createPage]);

  const handleDeletePageTrigger = useCallback((id: string, title?: string) => {
    setConfirmDeleteId(id);
    setConfirmDeleteType('page');
    setConfirmDeleteTitle(title || 'Untitled');
  }, []);

  const handleDeleteProjectTrigger = useCallback((id: string) => {
    const project = projects.find(p => p.id === id);
    setConfirmDeleteId(id);
    setConfirmDeleteType('project');
    setConfirmDeleteTitle(project?.name || 'Project');
  }, [projects]);

  const handleConfirmDelete = () => {
    if (!confirmDeleteId || !confirmDeleteType) return;
    if (confirmDeleteType === 'page') softDeletePage(confirmDeleteId);
    else deleteProject(confirmDeleteId);
    setConfirmDeleteId(null);
    setConfirmDeleteType(null);
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

  const query = search.trim().toLowerCase();
  const filteredPages = query
    ? pages.filter(page => page.title?.toLowerCase().includes(query))
    : pages;

  const favoritePages = filteredPages.filter(page => page.is_favorite);
  const standalonePages = filteredPages.filter(page => !page.parent_id && !pageProjectMap[page.$id]);
  const projectGroups = projects
    .map(project => {
      const allProjectPages = pages.filter(page => pageProjectMap[page.$id] === project.id);
      const rootProjectPages = filteredPages.filter(page => (
        pageProjectMap[page.$id] === project.id && !page.parent_id
      ));
      const matchesProject = project.name.toLowerCase().includes(query);

      return {
        project,
        allProjectPages,
        rootProjectPages,
        matchesProject,
      };
    })
    .filter(({ matchesProject, rootProjectPages }) => !query || matchesProject || rootProjectPages.length > 0);

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

      <div className="sidebar-quick-actions">
        <button className="sidebar-quick-btn" onClick={() => openModal('search')}>
          <Search size={15} />
          <span>Search</span>
          <kbd>Ctrl+K</kbd>
        </button>

        <Tooltip content="New page (⌘N)">
          <button className="sidebar-quick-btn sidebar-quick-new" onClick={() => { void createPage(); }}>
            <Plus size={15} />
          </button>
        </Tooltip>

        <Tooltip content="New project (⌘P)">
          <button className="sidebar-quick-btn sidebar-quick-new" onClick={() => { void handleCreateProject(); }}>
            <FolderPlus size={15} />
          </button>
        </Tooltip>
      </div>

      <div className="sidebar-search-wrap">
        <Search size={13} className="sidebar-search-icon" />
        <input
          className="sidebar-search-input"
          placeholder="Filter pages and projects..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      <div className="sidebar-pages">
        <div className="sidebar-section">
          <button 
            className={`sidebar-dashboard-btn ${activePageId === null ? 'active' : ''}`}
            onClick={() => setActivePageId(null)}
          >
            <LayoutDashboard size={15} />
            <span>Dashboard</span>
            <kbd>Ctrl+\</kbd>
          </button>
        </div>

        {favoritePages.length > 0 && (
          <div className="sidebar-section">
            <div className="sidebar-section-title">
              <Star size={11} /> FAVORITES
            </div>
            {favoritePages.map(page => (
              <SidebarItemContainer 
                key={page.$id} 
                page={page} 
                depth={0} 
                allPages={pages} 
                onDelete={handleDeletePageTrigger}
              />
            ))}
          </div>
        )}

        <div className="sidebar-section">
          <div className="sidebar-section-head">
            <div className="sidebar-section-title">PROJECTS</div>
            <button className="sidebar-section-action" onClick={() => { void handleCreateProject(); }}>
              <FolderPlus size={12} /> New
            </button>
          </div>

          {projectGroups.length === 0 ? (
            <div className="sidebar-empty">
              <span className="sidebar-empty-text">
                {query ? 'No projects matching your search' : 'No projects yet'}
              </span>
              {!query && (
                <button className="sidebar-empty-btn" onClick={() => { void handleCreateProject(); }}>
                  <FolderPlus size={13} /> New project
                </button>
              )}
            </div>
          ) : (
            <div className="sidebar-project-list">
              {projectGroups.map(({ project, allProjectPages, rootProjectPages }) => (
                <ProjectGroup
                  key={project.id}
                  project={project}
                  pages={rootProjectPages}
                  allProjectPages={allProjectPages}
                  onCreatePage={handleCreateProjectPage}
                  onUpdateProject={updateProject}
                  onDeleteProject={handleDeleteProjectTrigger}
                  onDeletePage={handleDeletePageTrigger}
                />
              ))}
            </div>
          )}
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-head">
            <div className="sidebar-section-title">PAGES</div>
            <button className="sidebar-section-action" onClick={() => { void createPage(); }}>
              <Plus size={12} /> New
            </button>
          </div>

          {standalonePages.length === 0 ? (
            <div className="sidebar-empty">
              <span className="sidebar-empty-text">
                {query ? 'No pages matching your search' : 'No standalone pages yet. Use the + button above to create one.'}
              </span>
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
              {standalonePages.map(page => (
                <SidebarItemContainer 
                  key={page.$id} 
                  page={page} 
                  depth={0} 
                  allPages={pages} 
                  onDelete={handleDeletePageTrigger}
                />
              ))}
            </motion.div>
          )}
        </div>
      </div>

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
            <Command size={16} /> <span>Keyboard shortcuts</span>
          </button>
        </Tooltip>
        <Tooltip content="Sign out">
          <button className="sidebar-footer-btn danger" onClick={handleLogout}>
            <LogOut size={16} />
          </button>
        </Tooltip>
      </div>

      <div className="sidebar-resize-handle" onMouseDown={onResizeMouseDown} />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={!!confirmDeleteId}
        onClose={() => { setConfirmDeleteId(null); setConfirmDeleteType(null); }}
        onConfirm={handleConfirmDelete}
        title={`Delete ${confirmDeleteType}`}
        message={confirmDeleteType === 'page' 
          ? `Are you sure you want to move "${confirmDeleteTitle}" to trash?`
          : `Are you sure you want to delete project "${confirmDeleteTitle}"? All pages inside will also be moved to trash.`
        }
        confirmLabel="Delete"
        isDanger
      />
    </motion.aside>
  );
}

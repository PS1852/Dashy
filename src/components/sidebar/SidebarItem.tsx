import { useState, useRef } from 'react';
import {
  MoreHorizontal, ChevronRight, GripVertical, Star, Trash2, Copy, Link,
  FileText, Plus, Edit2, FolderPlus
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { DashyPage } from '../../types';
import { useApp } from '../../context/AppContext';
import { ContextMenu } from '../ui/ContextMenu';

interface SidebarItemProps {
  page: DashyPage;
  depth: number;
  allPages: DashyPage[];
  isActive: boolean;
  onSelect: () => void;
  onExpand?: () => void;
  isExpanded?: boolean;
}

export default function SidebarItem({
  page,
  depth,
  allPages,
  isActive,
  onSelect,
  onExpand,
  isExpanded = false,
}: SidebarItemProps) {
  const { updatePage, softDeletePage, createPage, showToast } = useApp();
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState(page.title);
  const inputRef = useRef<HTMLInputElement>(null);
  const children = allPages.filter(p => p.parent_id === page.$id);
  const hasChildren = children.length > 0;

  // ─── Rename logic ───────────────────────────────────────────────────────
  const startRename = () => {
    setRenameValue(page.title);
    setIsRenaming(true);
    setTimeout(() => { inputRef.current?.focus(); inputRef.current?.select(); }, 50);
  };

  const commitRename = () => {
    const trimmed = renameValue.trim() || 'Untitled';
    if (trimmed !== page.title) updatePage(page.$id, { title: trimmed });
    setIsRenaming(false);
  };

  const cancelRename = () => {
    setRenameValue(page.title);
    setIsRenaming(false);
  };

  // ─── Context menu items ─────────────────────────────────────────────────
  const menuItems = [
    {
      label: 'Rename',
      icon: <Edit2 size={14} />,
      onClick: startRename,
    },
    {
      label: page.is_favorite ? 'Remove from favorites' : 'Add to favorites',
      icon: <Star size={14} />,
      onClick: () => updatePage(page.$id, { is_favorite: !page.is_favorite }),
    },
    {
      label: 'Duplicate',
      icon: <Copy size={14} />,
      onClick: async () => {
        const newPage = await createPage(page.parent_id ?? undefined);
        if (newPage) await updatePage(newPage.$id, { title: `${page.title} (copy)`, icon: page.icon });
      },
    },
    {
      label: 'Copy link',
      icon: <Link size={14} />,
      onClick: () => {
        const url = `${window.location.origin}${window.location.pathname}#/page/${page.$id}`;
        navigator.clipboard.writeText(url);
        showToast('Link copied!', 'success');
      },
    },
    { label: '', separator: true, onClick: () => {} },
    {
      label: 'Add sub-page',
      icon: <FolderPlus size={14} />,
      onClick: () => createPage(page.$id),
    },
    { label: '', separator: true, onClick: () => {} },
    {
      label: 'Move to trash',
      icon: <Trash2 size={14} />,
      onClick: () => softDeletePage(page.$id),
      danger: true,
    },
  ];

  return (
    <div className="sidebar-item-wrapper">
      <div
        className={`sidebar-item ${isActive ? 'active' : ''}`}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={onSelect}
      >
        {/* Drag handle */}
        <span className="sidebar-item-grip drag-handle" onClick={e => e.stopPropagation()}>
          <GripVertical size={14} />
        </span>

        {/* Chevron */}
        <span
          className={`sidebar-item-chevron ${hasChildren ? 'visible' : ''}`}
          onClick={e => { e.stopPropagation(); onExpand?.(); }}
        >
          {hasChildren && (
            <motion.span animate={{ rotate: isExpanded ? 90 : 0 }} transition={{ duration: 0.15 }}>
              <ChevronRight size={14} />
            </motion.span>
          )}
        </span>

        {/* Icon */}
        <span className="sidebar-item-icon">
          {page.icon || <FileText size={14} />}
        </span>

        {/* Title */}
        {isRenaming ? (
          <input
            ref={inputRef}
            className="sidebar-item-rename-input"
            value={renameValue}
            onChange={e => setRenameValue(e.target.value)}
            onBlur={commitRename}
            onKeyDown={e => {
              if (e.key === 'Enter') commitRename();
              if (e.key === 'Escape') cancelRename();
            }}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span className="sidebar-item-title">{page.title || 'Untitled'}</span>
        )}

        {/* Actions (hover) */}
        {!isRenaming && (
          <div className="sidebar-item-actions" onClick={e => e.stopPropagation()}>
            <button
              className="sidebar-icon-btn"
              onClick={e => { e.stopPropagation(); createPage(page.$id); }}
              title="Add sub-page"
            >
              <Plus size={14} />
            </button>
            <ContextMenu items={menuItems} trigger={<MoreHorizontal size={14} />} triggerClassName="sidebar-icon-btn" />
          </div>
        )}
      </div>

      {/* Children */}
      <AnimatePresence>
        {isExpanded && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.18 }}
            className="sidebar-children"
          >
            {children.map(child => (
              <SidebarItemContainer
                key={child.$id}
                page={child}
                depth={depth + 1}
                allPages={allPages}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Container that holds expand state
export function SidebarItemContainer({ page, depth, allPages }: { page: DashyPage; depth: number; allPages: DashyPage[] }) {
  const { activePageId, setActivePageId } = useApp();
  const [expanded, setExpanded] = useState(false);

  return (
    <SidebarItem
      page={page}
      depth={depth}
      allPages={allPages}
      isActive={activePageId === page.$id}
      onSelect={() => setActivePageId(page.$id)}
      onExpand={() => setExpanded(v => !v)}
      isExpanded={expanded}
    />
  );
}

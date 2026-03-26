import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react';
import { Models } from 'appwrite';
import {
  account, databases, DB_ID,
  COLLECTION_ID_PAGES, COLLECTION_ID_USER_SETTINGS, COLLECTION_ID_TEMPLATES,
  ID, Query
} from '../lib/appwrite';
import { DashyPage, Block, UserSettings, DashyTemplate, ModalType, Toast, ToastType } from '../types';

interface AppContextType {
  // Auth
  user: Models.User<Models.Preferences> | null;
  loading: boolean;
  // Pages
  pages: DashyPage[];
  activePageId: string | null;
  setActivePageId: (id: string | null) => void;
  createPage: (parentId?: string, templateId?: string) => Promise<DashyPage | null>;
  updatePage: (id: string, data: Partial<DashyPage>) => Promise<void>;
  softDeletePage: (id: string) => Promise<void>;
  restorePage: (id: string) => Promise<void>;
  permanentlyDeletePage: (id: string) => Promise<void>;
  // Blocks
  blocks: Block[];
  setBlocks: React.Dispatch<React.SetStateAction<Block[]>>;
  // Settings
  settings: UserSettings | null;
  updateSettings: (data: Partial<UserSettings>) => Promise<void>;
  // UI
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  activeModal: ModalType;
  openModal: (modal: ModalType) => void;
  closeModal: () => void;
  // Toast
  toasts: Toast[];
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  dismissToast: (id: string) => void;
  // Templates
  templates: DashyTemplate[];
}

const AppContext = createContext<AppContextType | null>(null);

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<Models.User<Models.Preferences> | null>(null);
  const [loading, setLoading] = useState(true);
  const [pages, setPages] = useState<DashyPage[]>([]);
  const [activePageId, setActivePageId] = useState<string | null>(null);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [templates, setTemplates] = useState<DashyTemplate[]>([]);

  // ─── Auth ─────────────────────────────────────────────────────────────
  useEffect(() => {
    const checkSession = async () => {
      try {
        const session = await account.get();
        setUser(session);
        await Promise.all([
          fetchPages(session.$id),
          fetchSettings(session.$id),
          fetchTemplates(),
        ]);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  // ─── Handle hash-based routing ─────────────────────────────────────────
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/page\/(.+)$/);
      if (match) setActivePageId(match[1]);
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  useEffect(() => {
    if (activePageId) {
      window.location.hash = `/page/${activePageId}`;
    }
  }, [activePageId]);

  // ─── Pages ─────────────────────────────────────────────────────────────
  const fetchPages = useCallback(async (userId: string) => {
    try {
      const res = await databases.listDocuments<DashyPage>(DB_ID, COLLECTION_ID_PAGES, [
        Query.equal('userId', userId),
        Query.equal('is_deleted', false),
        Query.orderAsc('sort_order'),
        Query.limit(200),
      ]);
      setPages(res.documents);
      if (res.documents.length > 0) {
        // Check hash first
        const hash = window.location.hash;
        const match = hash.match(/^#\/page\/(.+)$/);
        if (match && res.documents.find(p => p.$id === match[1])) {
          setActivePageId(match[1]);
        } else {
          setActivePageId(res.documents[0].$id);
        }
      }
    } catch (e) {
      console.error('fetchPages error:', e);
    }
  }, []);

  const createPage = useCallback(async (parentId?: string, _templateId?: string): Promise<DashyPage | null> => {
    if (!user) return null;
    // Optimistic: calculate sort_order
    const maxOrder = pages.reduce((m, p) => Math.max(m, p.sort_order ?? 0), 0);
    try {
      const newPage = await databases.createDocument<DashyPage>(DB_ID, COLLECTION_ID_PAGES, ID.unique(), {
        title: 'Untitled',
        content: '',
        userId: user.$id,
        parent_id: parentId ?? null,
        is_deleted: false,
        is_favorite: false,
        sort_order: maxOrder + 1,
        icon: '',
        cover_url: '',
      });
      setPages(prev => [...prev, newPage]);
      setActivePageId(newPage.$id);
      return newPage;
    } catch (e: any) {
      showToast('Failed to create page', 'error');
      return null;
    }
  }, [user, pages]);

  const updatePage = useCallback(async (id: string, data: Partial<DashyPage>) => {
    // Optimistic
    setPages(prev => prev.map(p => p.$id === id ? { ...p, ...data } : p));
    try {
      await databases.updateDocument<DashyPage>(DB_ID, COLLECTION_ID_PAGES, id, data);
    } catch (e: any) {
      showToast('Failed to save page', 'error');
      await fetchPages(user!.$id);
    }
  }, [user]);

  const softDeletePage = useCallback(async (id: string) => {
    const page = pages.find(p => p.$id === id);
    // Optimistic removal
    setPages(prev => prev.filter(p => p.$id !== id && p.parent_id !== id));
    if (activePageId === id) {
      const remaining = pages.filter(p => p.$id !== id);
      setActivePageId(remaining.length > 0 ? remaining[0].$id : null);
    }
    try {
      await databases.updateDocument(DB_ID, COLLECTION_ID_PAGES, id, {
        is_deleted: true,
        deleted_at: new Date().toISOString(),
      });
      showToast(`"${page?.title || 'Page'}" moved to trash`, 'info');
    } catch {
      showToast('Failed to delete page', 'error');
      if (user) await fetchPages(user.$id);
    }
  }, [pages, activePageId, user]);

  const restorePage = useCallback(async (id: string) => {
    try {
      const restored = await databases.updateDocument<DashyPage>(DB_ID, COLLECTION_ID_PAGES, id, {
        is_deleted: false,
        deleted_at: null,
      });
      setPages(prev => [...prev, restored]);
      showToast('Page restored', 'success');
    } catch {
      showToast('Failed to restore page', 'error');
    }
  }, []);

  const permanentlyDeletePage = useCallback(async (id: string) => {
    try {
      await databases.deleteDocument(DB_ID, COLLECTION_ID_PAGES, id);
      showToast('Page permanently deleted', 'success');
    } catch {
      showToast('Failed to delete page', 'error');
    }
  }, []);

  // ─── Settings ──────────────────────────────────────────────────────────
  const fetchSettings = useCallback(async (userId: string) => {
    try {
      const res = await databases.listDocuments<UserSettings>(DB_ID, COLLECTION_ID_USER_SETTINGS, [
        Query.equal('userId', userId), Query.limit(1)
      ]);
      if (res.documents.length > 0) {
        setSettings(res.documents[0]);
        applyTheme(res.documents[0].theme ?? 'light');
        applyFont(res.documents[0].font_style ?? 'serif');
      } else {
        // First time: create settings
        const newSettings = await databases.createDocument<UserSettings>(DB_ID, COLLECTION_ID_USER_SETTINGS, ID.unique(), {
          userId,
          theme: 'light',
          font_style: 'serif',
          sidebar_width: 260,
          small_text: false,
          full_width: false,
        });
        setSettings(newSettings);
      }
    } catch (e) {
      console.error('fetchSettings error:', e);
    }
  }, []);

  const updateSettings = useCallback(async (data: Partial<UserSettings>) => {
    if (!settings) return;
    const updated = { ...settings, ...data };
    setSettings(updated as UserSettings);
    if (data.theme) applyTheme(data.theme);
    if (data.font_style) applyFont(data.font_style);
    try {
      await databases.updateDocument(DB_ID, COLLECTION_ID_USER_SETTINGS, settings.$id, data);
    } catch {
      showToast('Failed to save settings', 'error');
    }
  }, [settings]);

  // ─── Templates ─────────────────────────────────────────────────────────
  const fetchTemplates = useCallback(async () => {
    try {
      const res = await databases.listDocuments<DashyTemplate>(DB_ID, COLLECTION_ID_TEMPLATES, [
        Query.equal('is_public', true), Query.limit(50)
      ]);
      setTemplates(res.documents);
    } catch {
      // Templates not critical
    }
  }, []);

  // ─── UI helpers ────────────────────────────────────────────────────────
  const toggleSidebar = () => setIsSidebarOpen(v => !v);
  const openModal = (modal: ModalType) => setActiveModal(modal);
  const closeModal = () => setActiveModal(null);

  // ─── Toasts ────────────────────────────────────────────────────────────
  const toastTimers = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const showToast = useCallback((message: string, type: ToastType = 'info', duration = 4000) => {
    const id = ID.unique();
    setToasts(prev => {
      const next = [...prev, { id, type, message, duration }];
      return next.slice(-3); // max 3
    });
    const timer = setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
      toastTimers.current.delete(id);
    }, type === 'error' ? 6000 : duration);
    toastTimers.current.set(id, timer);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const timer = toastTimers.current.get(id);
    if (timer) clearTimeout(timer);
  }, []);

  return (
    <AppContext.Provider value={{
      user, loading,
      pages, activePageId, setActivePageId,
      createPage, updatePage, softDeletePage, restorePage, permanentlyDeletePage,
      blocks, setBlocks,
      settings, updateSettings,
      isSidebarOpen, toggleSidebar,
      activeModal, openModal, closeModal,
      toasts, showToast, dismissToast,
      templates,
    }}>
      {children}
    </AppContext.Provider>
  );
}

// ─── Theme helpers ──────────────────────────────────────────────────────────
function applyTheme(theme: string) {
  const root = document.documentElement;
  if (theme === 'dark') {
    root.setAttribute('data-theme', 'dark');
  } else if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', 'light');
  }
}

function applyFont(font: string) {
  document.documentElement.setAttribute('data-font', font);
}

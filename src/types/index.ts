import { Models } from 'appwrite';

// ─── Types ─────────────────────────────────────────────────────────────────

export type BlockType =
  | 'paragraph'
  | 'heading_1'
  | 'heading_2'
  | 'heading_3'
  | 'bulleted_list'
  | 'numbered_list'
  | 'todo'
  | 'toggle'
  | 'quote'
  | 'callout'
  | 'code'
  | 'divider'
  | 'image'
  | 'file'
  | 'page_link';

export interface DashyPage extends Models.Document {
  title: string;
  content: string;
  userId: string;
  icon?: string;
  cover_url?: string;
  parent_id?: string;
  project_id?: string;
  is_favorite?: boolean;
  is_deleted?: boolean;
  deleted_at?: string;
  sort_order?: number;
  word_count?: number;
  last_edited_by?: string;
  template_id?: string;
}

export interface DashyProject extends Models.Row {
  name: string;
  userId: string;
  icon?: string;
  color?: string;
  sort_order?: number;
}

export interface Block extends Models.Document {
  page_id: string;
  userId: string;
  type: BlockType;
  content: string;
  checked?: boolean;
  sort_order: number;
  indent_level: number;
  language?: string;
  color?: string;
  callout_icon?: string;
}

export interface UserSettings extends Models.Document {
  userId: string;
  full_name?: string;
  avatar_url?: string;
  theme: 'light' | 'dark' | 'system';
  font_style: 'serif' | 'sans' | 'mono';
  sidebar_width: number;
  small_text: boolean;
  full_width: boolean;
}

export interface DashyTemplate extends Models.Document {
  title: string;
  description?: string;
  icon?: string;
  category?: string;
  blocks_json: string;
  is_public: boolean;
  userId?: string;
}

export type ModalType = 'search' | 'settings' | 'trash' | 'templates' | 'share' | 'shortcuts' | null;

export type SaveStatus = 'idle' | 'dirty' | 'saving' | 'saved' | 'error';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

export interface Toast {
  id: string;
  type: ToastType;
  message: string;
  duration?: number;
}

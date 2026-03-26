import { useState, useEffect, useRef, useCallback } from 'react';
import { databases, DB_ID, COLLECTION_ID_BLOCKS, ID, Query } from '../lib/appwrite';
import { Block, BlockType, SaveStatus } from '../types';

function getOrderBetween(prev: number | null, next: number | null): number {
  const a = prev ?? 0;
  const b = next ?? a + 2;
  return (a + b) / 2;
}

export function useBlocks(pageId: string | null, userId: string | null) {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [loading, setLoading] = useState(false);
  const [saveStatus, setSaveStatus] = useState<SaveStatus>('idle');
  const dirtyRef = useRef<Set<string>>(new Set());
  const deletedRef = useRef<Set<string>>(new Set());
  const saveTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Fetch blocks when page changes
  useEffect(() => {
    if (!pageId) { setBlocks([]); return; }
    setLoading(true);
    setBlocks([]);
    databases.listDocuments<Block>(DB_ID, COLLECTION_ID_BLOCKS, [
      Query.equal('page_id', pageId),
      Query.orderAsc('sort_order'),
      Query.limit(500),
    ]).then(res => {
      setBlocks(res.documents);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, [pageId]);

  // Debounced save
  const triggerSave = useCallback(() => {
    setSaveStatus('dirty');
    if (saveTimerRef.current) clearTimeout(saveTimerRef.current);
    saveTimerRef.current = setTimeout(() => {
      performSave();
    }, 1500);
  }, []);

  const performSave = useCallback(async () => {
    if (!pageId || !userId) return;
    setSaveStatus('saving');

    const currentBlocks = blocks;

    try {
      const updates: Promise<any>[] = [];

      for (const blockId of Array.from(dirtyRef.current)) {
        const block = currentBlocks.find(b => b.$id === blockId);
        if (!block) continue;
        const { $id, $collectionId, $databaseId, $createdAt, $updatedAt, $permissions, ...data } = block as any;
        update: updates.push(
          databases.updateDocument(DB_ID, COLLECTION_ID_BLOCKS, blockId, data).catch(() => {
            // If update fails because doc doesn't exist, create it
          })
        );
      }

      for (const blockId of Array.from(deletedRef.current)) {
        updates.push(
          databases.deleteDocument(DB_ID, COLLECTION_ID_BLOCKS, blockId).catch(() => {})
        );
      }

      await Promise.all(updates);
      dirtyRef.current.clear();
      deletedRef.current.clear();
      setSaveStatus('saved');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    }
  }, [blocks, pageId, userId]);

  // ─── Block CRUD Operations ─────────────────────────────────────────────

  const addBlock = useCallback(async (
    type: BlockType,
    afterBlockId: string | null = null,
    content = ''
  ): Promise<Block> => {
    if (!pageId || !userId) throw new Error('No page selected');

    const afterIdx = afterBlockId ? blocks.findIndex(b => b.$id === afterBlockId) : blocks.length - 1;
    const prevOrder = afterIdx >= 0 ? (blocks[afterIdx]?.sort_order ?? afterIdx) : 0;
    const nextOrder = afterIdx + 1 < blocks.length ? blocks[afterIdx + 1]?.sort_order : null;
    const newOrder = getOrderBetween(prevOrder, nextOrder);

    const data = {
      page_id: pageId,
      userId,
      type,
      content,
      sort_order: newOrder,
      indent_level: 0,
      checked: false,
    };

    // Create in Appwrite
    const created = await databases.createDocument<Block>(DB_ID, COLLECTION_ID_BLOCKS, ID.unique(), data);

    setBlocks(prev => {
      const insertAt = afterIdx + 1;
      const next = [...prev];
      next.splice(insertAt, 0, created);
      return next;
    });

    return created;
  }, [blocks, pageId, userId]);

  const updateBlock = useCallback((blockId: string, changes: Partial<Block>) => {
    setBlocks(prev => prev.map(b => b.$id === blockId ? { ...b, ...changes } : b));
    dirtyRef.current.add(blockId);
    triggerSave();
  }, [triggerSave]);

  const deleteBlock = useCallback(async (blockId: string) => {
    setBlocks(prev => prev.filter(b => b.$id !== blockId));
    deletedRef.current.add(blockId);
    // Immediate delete for responsiveness
    try {
      await databases.deleteDocument(DB_ID, COLLECTION_ID_BLOCKS, blockId);
      deletedRef.current.delete(blockId);
    } catch (e) {
      console.error('delete block error', e);
    }
  }, []);

  const reorderBlocks = useCallback(async (reordered: Block[]) => {
    setBlocks(reordered);
    // Update sort_orders in Appwrite
    const updates = reordered.map((b, i) => {
      const newOrder = i + 1;
      if (b.sort_order !== newOrder) {
        return databases.updateDocument(DB_ID, COLLECTION_ID_BLOCKS, b.$id, { sort_order: newOrder }).catch(() => {});
      }
      return Promise.resolve();
    });
    await Promise.all(updates);
  }, []);

  const changeBlockType = useCallback((blockId: string, newType: BlockType) => {
    updateBlock(blockId, { type: newType });
  }, [updateBlock]);

  return {
    blocks,
    setBlocks,
    loading,
    saveStatus,
    addBlock,
    updateBlock,
    deleteBlock,
    reorderBlocks,
    changeBlockType,
    performSave,
  };
}

// Fractional indexing helpers
export function getOrderBetween(prev: number | null, next: number | null): number {
  const a = prev ?? 0;
  const b = next ?? a + 2;
  return (a + b) / 2;
}

export function rebalanceOrders(items: { sort_order: number }[]): number[] {
  return items.map((_, i) => i + 1);
}

// Word count helper
export function countWords(blocks: { content: string }[]): number {
  return blocks.reduce((count, block) => {
    const text = block.content?.trim() ?? '';
    if (!text) return count;
    return count + text.split(/\s+/).filter(Boolean).length;
  }, 0);
}

// Reading time (words per minute)
export function readingTime(wordCount: number): number {
  return Math.max(1, Math.ceil(wordCount / 200));
}

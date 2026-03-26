import { Block, DashyPage } from '../types';

export function exportAsMarkdown(page: DashyPage, blocks: Block[]): string {
  const lines: string[] = [];

  if (page.icon) lines.push(`${page.icon} `);
  lines.push(`# ${page.title || 'Untitled'}`);
  lines.push('');

  let numberedCounter = 0;

  for (const block of blocks) {
    const indent = '  '.repeat(block.indent_level ?? 0);
    const text = block.content ?? '';

    switch (block.type) {
      case 'heading_1': lines.push(`\n${indent}# ${text}\n`); break;
      case 'heading_2': lines.push(`\n${indent}## ${text}\n`); break;
      case 'heading_3': lines.push(`\n${indent}### ${text}\n`); break;
      case 'bulleted_list': lines.push(`${indent}- ${text}`); break;
      case 'numbered_list':
        numberedCounter++;
        lines.push(`${indent}${numberedCounter}. ${text}`);
        break;
      case 'todo':
        lines.push(`${indent}- [${block.checked ? 'x' : ' '}] ${text}`);
        break;
      case 'quote': lines.push(`${indent}> ${text}`); break;
      case 'callout':
        lines.push(`${indent}> ${block.callout_icon ?? '💡'} ${text}`);
        break;
      case 'code':
        lines.push(`\`\`\`${block.language ?? ''}`);
        lines.push(text);
        lines.push('```');
        break;
      case 'divider': lines.push('\n---\n'); break;
      case 'paragraph':
      default:
        if (text) lines.push(`${indent}${text}`);
        else lines.push('');
        break;
    }

    // Reset numbered list counter on non-numbered blocks
    if (block.type !== 'numbered_list') numberedCounter = 0;
  }

  return lines.join('\n');
}

export function exportAsPlainText(page: DashyPage, blocks: Block[]): string {
  const lines: string[] = [`${page.title || 'Untitled'}`, ''];
  for (const block of blocks) {
    const text = block.content ?? '';
    if (text) lines.push(text);
  }
  return lines.join('\n');
}

export function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

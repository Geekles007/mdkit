'use client';

import { useState } from 'react';

export interface CodeBlockProps {
  /** The code to display and copy. */
  code: string;
  /** Language label shown in the header (and `data-language` hook). */
  language?: string;
  /** Optional filename shown in the header. */
  filename?: string;
  /** 1-based line numbers to highlight. */
  highlightLines?: number[];
}

/**
 * Dependency-free code block with a copy button, optional filename, and line
 * highlighting. No syntax highlighter is bundled — style the `.mdkit-code*`
 * hooks (or layer Shiki/Prism on top) yourself.
 *
 *   <CodeBlock filename="app.ts" language="ts" highlightLines={[2]} code={source} />
 */
export function CodeBlock({ code, language, filename, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, '').split('\n');
  const highlighted = new Set(highlightLines);

  async function copy() {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard unavailable (e.g. insecure context) — silently ignore
    }
  }

  return (
    <figure className="mdkit-code" data-language={language}>
      <figcaption className="mdkit-code__bar">
        <span className="mdkit-code__name">{filename ?? language ?? 'code'}</span>
        <button
          type="button"
          className="mdkit-code__copy"
          data-copied={copied || undefined}
          onClick={copy}
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>
      <pre className="mdkit-code__pre">
        <code>
          {lines.map((line, index) => (
            <span
              // biome-ignore lint/suspicious/noArrayIndexKey: code lines are static and never reordered
              key={index}
              className="mdkit-code__line"
              data-highlight={highlighted.has(index + 1) || undefined}
            >
              {line || ' '}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
}

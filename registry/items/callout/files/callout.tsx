import type { ReactNode } from 'react';

export type CalloutVariant = 'note' | 'tip' | 'warning' | 'danger';

const VARIANTS: Record<CalloutVariant, { icon: string; label: string }> = {
  note: { icon: 'ℹ️', label: 'Note' },
  tip: { icon: '💡', label: 'Tip' },
  warning: { icon: '⚠️', label: 'Warning' },
  danger: { icon: '🛑', label: 'Danger' },
};

export interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: ReactNode;
}

/**
 * Drop into your MDX components map:
 *
 *   import { Callout } from '@/components/mdkit/callout';
 *   <Callout variant="warning" title="Heads up">…</Callout>
 *
 * Styling hooks via `data-variant`; bring your own CSS or Tailwind.
 */
export function Callout({ variant = 'note', title, children }: CalloutProps) {
  const meta = VARIANTS[variant];
  return (
    <aside className="mdkit-callout" data-variant={variant} role="note">
      <p className="mdkit-callout__title">
        <span aria-hidden="true">{meta.icon}</span> {title ?? meta.label}
      </p>
      <div className="mdkit-callout__body">{children}</div>
    </aside>
  );
}

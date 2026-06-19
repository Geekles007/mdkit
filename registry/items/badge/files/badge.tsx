import type { ReactNode } from 'react';

export type BadgeVariant = 'default' | 'success' | 'warning' | 'danger' | 'info';

export interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
}

/**
 * Inline status pill for versions, states, "new" / "beta" labels, etc.
 *
 *   <Badge variant="success">stable</Badge> <Badge variant="info">v0.1</Badge>
 *
 * Style the `.mdkit-badge` hook (and `[data-variant]`) to taste.
 */
export function Badge({ children, variant = 'default' }: BadgeProps) {
  return (
    <span className="mdkit-badge" data-variant={variant}>
      {children}
    </span>
  );
}

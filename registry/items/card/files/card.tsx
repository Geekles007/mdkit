import type { CSSProperties, ReactNode } from 'react';

export interface CardProps {
  title: string;
  /** When set, the whole card becomes a link. */
  href?: string;
  description?: ReactNode;
  /** Optional leading icon/emoji. */
  icon?: ReactNode;
  children?: ReactNode;
}

/**
 * A single card. Becomes an `<a>` when `href` is set, otherwise a `<div>`.
 *
 *   <Card title="Get started" href="/docs" description="Install in 30s." icon="🚀" />
 */
export function Card({ title, href, description, icon, children }: CardProps) {
  const external = href ? /^https?:\/\//.test(href) : false;
  const body = (
    <>
      {icon ? (
        <div className="mdkit-card__icon" aria-hidden="true">
          {icon}
        </div>
      ) : null}
      <div className="mdkit-card__title">{title}</div>
      {description ? <p className="mdkit-card__desc">{description}</p> : null}
      {children}
    </>
  );

  if (href) {
    return (
      <a
        className="mdkit-card"
        href={href}
        {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
      >
        {body}
      </a>
    );
  }
  return <div className="mdkit-card">{body}</div>;
}

export interface CardGridProps {
  children: ReactNode;
  /** Number of columns at desktop width (default 2). */
  columns?: number;
}

/** Responsive grid wrapper for <Card>s. */
export function CardGrid({ children, columns = 2 }: CardGridProps) {
  return (
    <div className="mdkit-card-grid" style={{ '--mdkit-card-cols': columns } as CSSProperties}>
      {children}
    </div>
  );
}

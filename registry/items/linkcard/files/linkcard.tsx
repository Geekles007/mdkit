import type { ReactNode } from 'react';

export interface LinkCardProps {
  href: string;
  title: string;
  description?: ReactNode;
  /** Optional favicon/image URL shown on the left (falls back to a 🔗). */
  favicon?: string;
}

/**
 * Rich link preview — title, description, and the destination host.
 *
 *   <LinkCard href="https://github.com/Geekles007/mdkit" title="mdkit on GitHub"
 *     description="Copy-paste MDX components." />
 *
 * Style the `.mdkit-linkcard*` hooks to taste.
 */
export function LinkCard({ href, title, description, favicon }: LinkCardProps) {
  let host = href;
  try {
    host = new URL(href).hostname.replace(/^www\./, '');
  } catch {
    // not an absolute URL — keep the raw href as the label
  }
  const external = /^https?:\/\//.test(href);

  return (
    <a
      className="mdkit-linkcard"
      href={href}
      {...(external ? { target: '_blank', rel: 'noreferrer' } : {})}
    >
      <span className="mdkit-linkcard__media" aria-hidden="true">
        {favicon ? (
          <img className="mdkit-linkcard__favicon" src={favicon} alt="" width={20} height={20} />
        ) : (
          '🔗'
        )}
      </span>
      <span className="mdkit-linkcard__body">
        <span className="mdkit-linkcard__title">{title}</span>
        {description ? <span className="mdkit-linkcard__desc">{description}</span> : null}
        <span className="mdkit-linkcard__host">{host}</span>
      </span>
    </a>
  );
}

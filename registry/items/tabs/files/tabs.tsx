'use client';

import {
  Children,
  type ReactElement,
  type ReactNode,
  isValidElement,
  useId,
  useState,
} from 'react';

export interface TabProps {
  /** Label shown in the tab strip. */
  label: string;
  children: ReactNode;
}

/** A single tab panel. Use only as a direct child of <Tabs>. */
export function Tab({ children }: TabProps) {
  return <>{children}</>;
}

export interface TabsProps {
  children: ReactNode;
  /** Index of the tab open on first render. */
  defaultIndex?: number;
}

/**
 * Tabbed content for MDX:
 *
 *   <Tabs>
 *     <Tab label="npm">…</Tab>
 *     <Tab label="pnpm">…</Tab>
 *   </Tabs>
 *
 * Accessible (ARIA tablist/tab/tabpanel). Style the `.mdkit-tabs*` hooks to taste.
 */
export function Tabs({ children, defaultIndex = 0 }: TabsProps) {
  const tabs = Children.toArray(children).filter(
    (child): child is ReactElement<TabProps> => isValidElement(child) && child.type === Tab,
  );
  const [active, setActive] = useState(defaultIndex);
  const baseId = useId();

  return (
    <div className="mdkit-tabs">
      <div className="mdkit-tabs__list" role="tablist">
        {tabs.map((tab, index) => {
          const selected = index === active;
          return (
            <button
              key={`${baseId}-tab-${tab.props.label}`}
              type="button"
              role="tab"
              id={`${baseId}-tab-${index}`}
              aria-selected={selected}
              aria-controls={`${baseId}-panel-${index}`}
              tabIndex={selected ? 0 : -1}
              className="mdkit-tabs__trigger"
              data-state={selected ? 'active' : 'inactive'}
              onClick={() => setActive(index)}
            >
              {tab.props.label}
            </button>
          );
        })}
      </div>
      {tabs.map((tab, index) => (
        <div
          key={`${baseId}-panel-${tab.props.label}`}
          role="tabpanel"
          id={`${baseId}-panel-${index}`}
          aria-labelledby={`${baseId}-tab-${index}`}
          hidden={index !== active}
          className="mdkit-tabs__panel"
        >
          {tab.props.children}
        </div>
      ))}
    </div>
  );
}

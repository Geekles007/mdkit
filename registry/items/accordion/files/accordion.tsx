'use client';

import { type ReactNode, createContext, useContext, useId, useState } from 'react';

interface AccordionContextValue {
  isOpen: (value: string) => boolean;
  toggle: (value: string) => void;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

export interface AccordionProps {
  children: ReactNode;
  /** 'single' closes the others when one opens; 'multiple' allows several. */
  type?: 'single' | 'multiple';
  /** Item value(s) open on first render (requires explicit `value` on items). */
  defaultValue?: string | string[];
}

/**
 * Collapsible sections (FAQ, optional details):
 *
 *   <Accordion type="single" defaultValue="a">
 *     <AccordionItem value="a" title="What is mdkit?">…</AccordionItem>
 *     <AccordionItem value="b" title="Is there a backend?">…</AccordionItem>
 *   </Accordion>
 */
export function Accordion({ children, type = 'single', defaultValue }: AccordionProps) {
  const [open, setOpen] = useState<string[]>(() => {
    if (defaultValue == null) return [];
    return Array.isArray(defaultValue) ? defaultValue : [defaultValue];
  });

  const context: AccordionContextValue = {
    isOpen: (value) => open.includes(value),
    toggle: (value) =>
      setOpen((prev) => {
        if (prev.includes(value)) return prev.filter((v) => v !== value);
        return type === 'single' ? [value] : [...prev, value];
      }),
  };

  return (
    <div className="mdkit-accordion">
      <AccordionContext.Provider value={context}>{children}</AccordionContext.Provider>
    </div>
  );
}

export interface AccordionItemProps {
  title: ReactNode;
  children: ReactNode;
  /** Stable identifier; falls back to a generated id. */
  value?: string;
}

/** A single collapsible section. Use only inside <Accordion>. */
export function AccordionItem({ title, children, value }: AccordionItemProps) {
  const context = useContext(AccordionContext);
  const generatedId = useId();
  if (!context) {
    throw new Error('<AccordionItem> must be used inside <Accordion>.');
  }

  const id = value ?? generatedId;
  const open = context.isOpen(id);

  return (
    <div className="mdkit-accordion__item" data-state={open ? 'open' : 'closed'}>
      <button
        type="button"
        className="mdkit-accordion__trigger"
        aria-expanded={open}
        aria-controls={`${id}-content`}
        onClick={() => context.toggle(id)}
      >
        <span>{title}</span>
        <span className="mdkit-accordion__icon" aria-hidden="true">
          {open ? '−' : '+'}
        </span>
      </button>
      <div id={`${id}-content`} className="mdkit-accordion__panel" hidden={!open}>
        {children}
      </div>
    </div>
  );
}

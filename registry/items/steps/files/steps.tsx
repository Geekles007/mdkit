import { Children, type ReactNode, isValidElement } from 'react';

export interface StepProps {
  title: string;
  children: ReactNode;
}

/** A single step. Use only as a direct child of <Steps>. */
export function Step({ title, children }: StepProps) {
  return (
    <li className="mdkit-step">
      <h3 className="mdkit-step__title">{title}</h3>
      <div className="mdkit-step__body">{children}</div>
    </li>
  );
}

export interface StepsProps {
  children: ReactNode;
}

/**
 * Numbered steps for tutorials:
 *
 *   <Steps>
 *     <Step title="Install">…</Step>
 *     <Step title="Configure">…</Step>
 *   </Steps>
 *
 * Numbering is driven by a CSS counter; style `.mdkit-steps` to taste.
 */
export function Steps({ children }: StepsProps) {
  const steps = Children.toArray(children).filter(isValidElement);
  return (
    <ol className="mdkit-steps" data-count={steps.length}>
      {steps}
    </ol>
  );
}

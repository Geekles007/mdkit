import type { ReactNode } from 'react';

export interface ComparisonColumn {
  key: string;
  label: ReactNode;
  /** Visually emphasize this column (e.g. the recommended plan). */
  highlight?: boolean;
}

export interface ComparisonRow {
  feature: ReactNode;
  /** Cell value per column key: `true` → ✓, `false` → ✗, or any text. */
  values: Record<string, boolean | string>;
}

export interface ComparisonTableProps {
  columns: ComparisonColumn[];
  rows: ComparisonRow[];
}

function Cell({ value }: { value: boolean | string | undefined }) {
  if (typeof value === 'boolean') {
    return (
      <span className="mdkit-compare__bool" data-value={value}>
        <span aria-hidden="true">{value ? '✓' : '✗'}</span>
        <span className="mdkit-compare__sr">{value ? 'Yes' : 'No'}</span>
      </span>
    );
  }
  return <>{value ?? '—'}</>;
}

/**
 * Feature comparison table — booleans render as ✓ / ✗, anything else as text.
 *
 *   <ComparisonTable
 *     columns={[{ key: 'free', label: 'Free' }, { key: 'pro', label: 'Pro', highlight: true }]}
 *     rows={[{ feature: 'Components', values: { free: true, pro: true } }]}
 *   />
 *
 * Style the `.mdkit-compare*` hooks to taste.
 */
export function ComparisonTable({ columns, rows }: ComparisonTableProps) {
  return (
    <div className="mdkit-compare">
      <table className="mdkit-compare__table">
        <thead>
          <tr>
            <th scope="col" className="mdkit-compare__corner">
              <span className="mdkit-compare__sr">Feature</span>
            </th>
            {columns.map((column) => (
              <th key={column.key} scope="col" data-highlight={column.highlight || undefined}>
                {column.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr
              // biome-ignore lint/suspicious/noArrayIndexKey: comparison rows are static config and never reordered
              key={index}
            >
              <th scope="row">{row.feature}</th>
              {columns.map((column) => (
                <td key={column.key} data-highlight={column.highlight || undefined}>
                  <Cell value={row.values[column.key]} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

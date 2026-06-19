'use client';

import { type ReactNode, useState } from 'react';

export interface FileTreeProps {
  children: ReactNode;
}

/**
 * Annotated file/folder tree built from nested <Folder> and <File>:
 *
 *   <FileTree>
 *     <Folder name="src" defaultOpen>
 *       <File name="index.ts" />
 *       <Folder name="components"><File name="button.tsx" /></Folder>
 *     </Folder>
 *     <File name="package.json" />
 *   </FileTree>
 *
 * Indentation comes from the nested DOM; style the `.mdkit-filetree*` hooks.
 */
export function FileTree({ children }: FileTreeProps) {
  return (
    <ul className="mdkit-filetree" role="tree">
      {children}
    </ul>
  );
}

export interface FolderProps {
  name: string;
  defaultOpen?: boolean;
  children?: ReactNode;
}

export function Folder({ name, defaultOpen = false, children }: FolderProps) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <li className="mdkit-filetree__item" role="treeitem" aria-expanded={open}>
      <button
        type="button"
        className="mdkit-filetree__row mdkit-filetree__folder"
        onClick={() => setOpen((value) => !value)}
      >
        <span className="mdkit-filetree__icon" aria-hidden="true">
          {open ? '📂' : '📁'}
        </span>
        {name}
      </button>
      {open && children ? <ul className="mdkit-filetree__children">{children}</ul> : null}
    </li>
  );
}

export interface FileProps {
  name: string;
}

export function File({ name }: FileProps) {
  return (
    <li className="mdkit-filetree__item" role="treeitem">
      <span className="mdkit-filetree__row">
        <span className="mdkit-filetree__icon" aria-hidden="true">
          📄
        </span>
        {name}
      </span>
    </li>
  );
}

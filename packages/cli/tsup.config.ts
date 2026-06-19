import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm'],
  dts: false,
  clean: true,
  sourcemap: true,
  target: 'node20',
  // Bundle the internal (private, unpublished) workspace package into the CLI
  // so the published `mdkit-cli` is self-contained — no @mdkit/core on npm.
  noExternal: ['@mdkit/core'],
  banner: { js: '#!/usr/bin/env node' },
});

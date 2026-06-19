# mdkit

Copy-paste **Markdown & MDX components** — callouts, steps, and more — straight
into your project. shadcn-style: you own the code, there's no runtime
dependency to install. **No database, no backend** — the registry is just
static JSON on GitHub Pages, and a CLI copies components into your repo.

```bash
npx mdkit-cli@latest add callout steps tabs
```

## Components

| Name      | What it is                                          |
| --------- | --------------------------------------------------- |
| `callout`   | note / tip / warning / danger block for MDX content |
| `steps`     | numbered, vertically-connected steps for guides     |
| `tabs`      | accessible tabbed content (npm / pnpm / yarn, …)    |
| `codeblock` | code block with copy button, filename, line highlight |
| `card`      | clickable cards + responsive `CardGrid`             |
| `accordion` | collapsible sections (single- or multiple-open)     |
| `badge`     | inline status pill (version / new / beta / …)       |
| `filetree`  | annotated, collapsible file/folder tree             |
| `linkcard`  | rich link preview (title, description, host)        |
| `comparison-table` | feature comparison table (✓ / ✗ per row)     |

Browse them on the [docs site](https://Geekles007.github.io/mdkit).

## What's inside

```
packages/core      Headless schema (zod) + registry fetch/resolve helpers
packages/cli       `add` / `list` commands — copies components into a project
registry/          Source components + build script -> static JSON in public/r/
apps/www           Next.js docs site (static export); also serves /r
.github/workflows  CI + GitHub Pages deploy (site + registry)
```

Stack: **pnpm** workspaces · **Turborepo** · **TypeScript** · **tsup** ·
**Vitest** · **Biome** · **Changesets**. Scaffolded from
[pkg-boilerplate](https://github.com/Geekles007/pkg-boilerplate).

## Develop

```bash
pnpm install
pnpm registry:build   # compile registry/items -> registry/public/r
pnpm build            # build every package + the docs site
pnpm test             # run unit tests
pnpm check            # lint + format with Biome
```

Try the CLI against the local registry without publishing:

```bash
pnpm --filter mdkit-cli build
node packages/cli/dist/index.js add callout --registry "file://$(pwd)/registry/public" --cwd /tmp/demo
```

## Add a component

Create `registry/items/<name>/`:

```
registry/items/callout/
  meta.json                 name, type, description, dependencies, file map
  files/callout.tsx         the source copied into the consumer's project
```

`pnpm registry:build` validates every component against the schema in
`@mdkit/core` and emits `registry/public/r/index.json` plus one
`registry/public/r/<name>.json` per component. The CLI fetches those, resolves
`registryDependencies`, and writes the files into the user's project.

## Deploy

The `Deploy site + registry` workflow builds the registry, statically exports
the docs site, and publishes to GitHub Pages. Enable Pages → "GitHub Actions"
in the repo settings once.

## License

[MIT](./LICENSE) © Geekles007

# @mdkit/core

Headless building blocks for the [mdkit](https://github.com/Geekles007/mdkit)
registry: the zod schema for registry items and the fetch/resolve helpers shared
by the CLI, the registry build, and the docs site. Browser-safe (no Node
built-ins); inject a `fetch` implementation when you need one.

```ts
import { fetchRegistryIndex, resolveItemTree } from '@mdkit/core';

const index = await fetchRegistryIndex('https://geekles007.github.io/mdkit');
const items = await resolveItemTree('https://geekles007.github.io/mdkit', ['callout']);
```

Exposes: `registryItemSchema`, `registryIndexSchema`, `fetchRegistryItem`,
`fetchRegistryIndex`, `resolveItemTree`, plus the `RegistryItem` / `RegistryIndex`
types.

## License

[MIT](https://github.com/Geekles007/mdkit/blob/main/LICENSE) © Geekles007

# mdkit-cli

Add [mdkit](https://github.com/Geekles007/mdkit) Markdown/MDX components to your
project — shadcn-style. The CLI copies the component source into your repo; there
is no runtime dependency to install.

```bash
npx mdkit-cli@latest add callout steps tabs
```

## Commands

```bash
mdkit list                       # list every available component
mdkit add <names...>             # copy components (and their deps) into the project
```

### Options

| Option              | Description                                  |
| ------------------- | -------------------------------------------- |
| `-r, --registry`    | registry base URL (default: mdkit on Pages)  |
| `-c, --cwd`         | target project directory (default: cwd)      |
| `-o, --overwrite`   | overwrite existing files                     |

The registry URL can also be set with `PKG_REGISTRY_URL`. Components land under
`components/mdkit/` by default; wire them into your MDX components map and style
the `.mdkit-*` class hooks yourself.

## License

[MIT](https://github.com/Geekles007/mdkit/blob/main/LICENSE) © Geekles007

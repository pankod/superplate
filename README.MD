# superplate

**superplate** is a CLI to save you hours of development time when starting a [Next.js](https://nextjs.org/) project. 

## Quick Start

```bash
npx superplate <my-project>
```

Just run the command above and you will be prompted with options to create your project without spending hours on configurations. 

<p align='center'>
<img src='https://user-images.githubusercontent.com/11361964/106468355-dd9be280-64ae-11eb-82da-c313beb16d6b.gif' width='500' alt='superplate example'>
</p>

## Plugins

superplate comes with a set of plugins to get you started. You can check them out in [superplate-core-plugins](https://github.com/pankod/superplate-core-plugins). 

### Using a custom source of plugins

You can use different sources for plugins other than [superplate-core-plugins](https://github.com/pankod/superplate-core-plugins). 

Simply add `--source <path-to-source>` option to use **superplate** with a custom source. 

To Learn more about sources and how to create your own; please check out [Documentation#creating-a-source-repository](X)

### Creating a plugin

**superplate** gives you many abilities to create your own plugin and interact with the others. To learn more on creating a plugin, please check out [Documentation#creating-a-plugin](X)

## Documentation

To learn on how **superplate** and its plugins work, you can check out our [documentation](X)

## Options

### `--source <path-to-source>`

Alias: `-s`. Use this option to target a custom source of plugins. Source path can be a remote git repository or a local path.

### `--version`

Alias `-v`. Prints version number.

### `--help`

Alias `-h`. Prints help information on all commands and options.

### `--debug`

Alias `-d`. Prints additional logs.

## Contribution

If you have a bug to report, do not hesitate to file an issue.

If you are willing to fix an issue or propose a feature; all PRs with clear explanations are welcome and encouraged.

## Development

### `npm run dev:global`

Watch for changes in the code; build the project and then globally install the superplate for testing.

### `npm run build:cli`

Create a build inside `/lib` directory.

### `npm run global`

Install the current build globally

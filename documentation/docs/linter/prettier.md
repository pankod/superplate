---
id: prettier
title: Prettier
sidebar_label: Prettier
---

Use Prettier to make your code uniform and maintain code style integrity.

Refer to [documentation](https://prettier.io/) for details.

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

:::note
Be sure to install lint-staged and husky in your root directory!
:::

```bash
npm install prettier
```

```json title="package.json"
{
    "scripts": {
        "prettier": "prettier '**/*.{js,jsx,ts,tsx}'"
    },
    "dependencies": {
        "prettier": "^2.2.1"
    }
}
```

Prettier uses `cosmiconfig` for configuration file support. 
This means you can configure Prettier in the ways specified in the [original document](https://prettier.io/docs/en/configuration.html#docsNav).

```json title=".prettierrc"
{
    "semi": true,
    "trailingComma": "all",
    "singleQuote": false,
    "printWidth": 80,
    "tabWidth": 4
}
```

To exclude files from formatting, create a .prettierignore file in the root of your project.

```bash title=".prettierignore"
node_modules
__generated__
```
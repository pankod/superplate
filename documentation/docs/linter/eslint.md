---
id: eslint
title: ESLint
sidebar_label: ESLint
---

Use eslint to catch some bugs before commiting code. 
ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code, with the goal of making code more consistent and avoiding bugs.

Refer to [documentation](https://eslint.org/) for details.


```json title="package.json"
{
    "scripts": {
        "lint": "eslint '**/*.{js,jsx,ts,tsx}'"
    },
    "devDependencies": {
        "eslint": "^7.15.0",
        "@typescript-eslint/eslint-plugin": "^4.9.1",
        "@typescript-eslint/parser": "^4.9.1",

        // highlight-start
        If you want to use prettier with ESLint, you need to add the following packages.
        // highlight-end
        // "eslint-config-prettier": "^7.0.0",
        // "eslint-plugin-prettier": "^3.2.0"
    }
}
```

ESLint is designed to be flexible and configurable for your use case. You can turn off every rule and run only with basic syntax validation or mix and match the bundled rules and your custom rules to fit the needs of your project. 

```json title="_.eslintrc"
{
  "root": true,
  "parser": "@typescript-eslint/parser",
  "plugins": ["@typescript-eslint"],
  "overrides": [
      {
          "files": ["*.js"],
          "rules": {
              "@typescript-eslint/no-var-requires": "off"
          }
      }
  ],
  "env": {
      "node": true,
      "browser": true,
      "amd": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",

    // highlight-start
    If you want to use prettier with ESLint, the following configuration can be used.
    // highlight-end
    // "prettier/@typescript-eslint",
    // "plugin:prettier/recommended" 
  ]
}
```

You can tell ESLint to ignore specific files and directories in your config files.

```bash title=".eslintignore"
node_modules
__generated__
```

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::

:::tip
If you didn't choose the plugin during project creation phase, you can follow the instructions above after installing the relevant packages to add.
:::
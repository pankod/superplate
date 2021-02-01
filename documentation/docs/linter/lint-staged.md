---
id: lint-staged
title: Lint staged files
sidebar_label: Lint staged files
---

Use lint-staged to make your code uniform. It allows you to run arbitrary scripts against currently staged files.
 
Refer to [documentation](https://github.com/okonet/lint-staged) for detailed usage.

### How to configure lint-staged files?

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

:::note
Be sure to install lint-staged and husky in your root directory!
:::

```bash
npm install lint-staged husky --save-dev
```


```json title="package.json"
{
    "devDependencies": {
        "husky": "^4.3.7",
        "lint-staged": "^10.5.3"
    },
    "lint-staged": {
        "*.{js,jsx,ts,tsx}": [
            "npm run lint -- --quiet --fix"
        ]
    },
    "husky": {
        "hooks": {
            "pre-commit": "lint-staged"
        }
    }
}
```

`"npm run lint -- --quiet --fix"` 
- --quiet: disable lint-staged’s own console output (default: false)
- --fix: automatically fix code style and add to commit

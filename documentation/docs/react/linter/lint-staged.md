---
id: lint-staged
title: lint-staged
sidebar_label: lint-staged
description: Setting up linter for Create React App
---

Use lint-staged to make your code uniform. It allows you to run arbitrary scripts against currently staged files.
 
[Refer to official documentation for detailed usage. &#8594](https://create-react-app.dev/docs/setting-up-your-editor/#formatting-code-automatically)

## Adding lint-staged to your project later

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm install --save husky lint-staged prettier
```
  </TabItem>
  <TabItem value="yarn">

```
yarn add husky lint-staged prettier
```
  </TabItem>
</Tabs>

- Add the following field to the package.json section:

```json title="package.json"
"dependencies": {
  // ...
},
//highlight-start
"husky": {
  "hooks": {
    "pre-commit": "lint-staged"
  }
},
"lint-staged": {
   "src/**/*.{js,jsx,ts,tsx,json,css,scss,md}": [
     "prettier --write"
   ]
},
//highlight-end
```
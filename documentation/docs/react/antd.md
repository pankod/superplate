---
id: antd
title: Ant Design
sidebar_label: Ant Design
description: Setting up Ant design for Typescript Next.js apps 
---

A design system for enterprise-level products. Create an efficient and enjoyable work experience.

Ant Design provides a React UI library `antd` that contains a set of high quality components and demos for building rich, interactive user interfaces.  
[Go to docs &#8594](https://ant.design/docs/react/introduce)

### Less Support

### Less Support
`antd` uses `less` as its preprocessor.

:::caution

Due to its incompatibility with `storybook`, `less` is not included in superplate.

:::

To use `less` with `antd` in your project  
- First we should modify `src/App.css` to `src/App.less`, then import less file instead.

```diff
/* src/App.tsx */
- import './App.css';
+ import './App.less';
```

```diff
/* src/App.less */
- @import '~antd/dist/antd.css';
+ @import '~antd/dist/antd.less';
```

- Then install `craco-less` and modify `craco.config.js` like below.

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```bash
npm install craco-less
```
  </TabItem>
  <TabItem value="yarn">

```bash
yarn add craco-less
```          
  </TabItem>
</Tabs>

```ts title="craco.config.js"
const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
```

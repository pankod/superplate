---
id: bundle-analyzer
title: Bundle Analyzer
sidebar_label: Bundle Analyzer
description: How to use Bundle Analyzer in React?
---

Bundle Analyzer visualizes size of output files with an interactive treemap. This helps you understand what’s taking the most space in the bundles.

superplate serves optional plugin which adds [Source map explorer](https://github.com/danvk/source-map-explorer#readme) to the created project.

 Run the command below:

 ```
npm run build
npm run analyze
```

This should open 2 pages in the browser. One for client bundles, and one for the server bundles.

### Adding Bundler Analyzer to your project later
:::tip

All this work will be handled automatically by superplate, so you don’t need to do anything extra as long as you choose Bundle Analyzer plugin during the project creation phase.

:::


If you didn't choose the Bundle Analyzer plugin during project creation phase, you can follow the instructions below to add it. 

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
npm install --save source-map-explorer
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add source-map-explorer
```
  </TabItem>
</Tabs>

Then in package.json, add the following line to scripts:

```diff
  "scripts": {
+    "analyze": "source-map-explorer 'build/static/js/*.js'",
     "start": "react-scripts start",
     "build": "react-scripts build",
     "test": "react-scripts test",
```

Then in package.json, add the following line to scripts:

```
npm run build
npm run analyze
```


[Refer to official documentation for detailed usage  &#8594](https://create-react-app.dev/docs/analyzing-the-bundle-size/)

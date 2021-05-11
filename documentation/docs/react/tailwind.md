---
id: tailwind
title: Tailwind CSS
sidebar_label: Tailwind CSS
description: How to use Tailwind CSS in Next.js?
---

A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.  
[Go to Docs &#8594](https://tailwindcss.com/docs)

## Configuration files

Tailwind plugin produces the two [necessary config files:](https://tailwindcss.com/docs/guides/create-react-app#create-your-configuration-file) `tailwind.config.js` and `craco.config.js`  
[See Tailwind configuration docs &#8594](https://tailwindcss.com/docs/configuration)

## Include Tailwind in your CSS

Tailwind is imported directly in `App.tsx`

```ts title="src/App.tsx"
import "tailwindcss/tailwind.css";
```
[You can also include tailwind in your custom css &#8594](https://tailwindcss.com/docs/guides/create-react-app#include-tailwind-in-your-css)

## Purging unused styles

`tailwind.config.js` is configured to purge unused styles in pages and components.

```ts title="tailwind.config.js"
module.exports = {
    purge: ["./src/**/*.tsx"]
}
```
[See guide on optimizing for production on Tailwind docs &#8594](https://tailwindcss.com/docs/optimizing-for-production)

## Configuring PostCSS

Since Create React App doesn't let you override the PostCSS configuration natively. We need to create a `craco.config.js` file to set up Tailwind with React properly.

```ts title="craco.config.js"
module.exports = {
    style: {
      postcss: {
        plugins: [
          require('tailwindcss'),
          require('autoprefixer'),
        ],
      },
    },
  }
```

## Adding Tailwind CSS to your project later

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
npm install -D tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```
```
npm install @craco/craco
```
  </TabItem>
  
  <TabItem value="yarn">

```
yarn add tailwindcss@npm:@tailwindcss/postcss7-compat postcss@^7 autoprefixer@^9
```
```
yarn add @craco/craco
```
  </TabItem>

</Tabs>

```diff title="package.json" {7-9}
{
    // ...
    "scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "test": "react-scripts test",
+   "start": "craco start",
+   "build": "craco build",
+   "test": "craco test",
  },
}
```

[Refer to official documentation for detailed installation. &#8594](https://tailwindcss.com/docs/installation)
---
id: scss
title: Sass/SCSS
sidebar_label: Sass/SCSS
description: How to use Sass in Create React App?
---

Sass is a CSS preprocessor, which adds special features such as variables, nested rules and mixins (sometimes referred to as syntactic sugar) into regular CSS.

Create React App allows you to import Sass using both the `.scss` and `.sass` extensions. You can use component-level Sass via CSS Modules and the `.module.scss` or `.module.sass` extension.

To style your components using CSS Modules, name your stylesheet files with the `[name].module.scss`.


```css title="components/header/index.module.scss"
.header {
  background-color: #20232A;

  title {
    color: #96CBEF;
  }

  &:hover {
    background-color: #2C3946;
  }
}
```



```jsx title="components/header/index.tsx"
import React from "react";

import styles from "./index.module.scss";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <title>Title<title>
    </div>
  );
};
```

<br/>

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
  npm install sass
  ```
  </TabItem>

 <TabItem value="yarn">

```
yarn add sass
```


  </TabItem>

</Tabs>

:::tip

You can [customize Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/theming/#sass) if UI framework chosen as Bootstrap along with Sass during creation phase.
Bootstrap’s source Sass files added to under `src/styles` folder directory.

:::



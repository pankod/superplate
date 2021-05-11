---
id: css
title: Built-in CSS Support
sidebar_label: Built-in CSS 
description: How to use CSS in React?
---

React allows you to import CSS files from a JavaScript file.

For example, to add Global Stylesheet to boilerplate, we import following CSS file within `src/App.tsx`.

```css title="src/styles/global.css"
hmtl,
body {
    margin: 0;
    padding: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans",
        "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
}
```

Then, import the `styles.css` file.

```tsx title="src/App.tsx"
import Home from "pages";
import "styles/global.css";

function App(): JSX.Element {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
```

These styles will apply to all pages and components in your application.

### CSS Modules


[CSS Modules](https://github.com/css-modules/css-modules) let you use the same CSS class name in different files without worrying about naming clashes.

To style your components using CSS Modules, name your stylesheet files with the `[name].module.css`.

For example, lets check out a reusable Header component implementation.

```css title="components/header/index.module.css"
.header {
  background-color: #20232A;
  text-align: center;
}
```


```tsx title="components/header"
import React from "react";
import styles from "./index.module.css";
import { Logo } from "components";

export const Header: React.FC = () => {
  return (
    <div className={styles.header}>
      <Logo />
    </div>
  );
};
```

<br/>

:::note

The class names which will be processed into a globally unique class name during build.

:::



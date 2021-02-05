---
id: bootstrap
title: Bootstrap
sidebar_label: Bootstrap
description: How to use Bootstrap with Next.js?
---

Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.

:::tip

If you also add `sass/scss` under CSS Preprocessors during creation phase, you can easily [customize Bootstrap](https://getbootstrap.com/docs/4.6/getting-started/theming/#sass). Bootstrap’s source ***sass*** files are added under `src/styles` directory.

:::

### Using Sass with Bootstrap
If `sass/scss` is selected you can start [customizing](https://getbootstrap.com/docs/4.6/getting-started/theming/#sass) in `src/styles/app.scss`  
[See Sass/SCSS doc &#8594](scss.md)

If it's not selected, Sass can be added later to customize Bootstrap,

- Add a custom scss file `app.scss` under `src/styles`

```js title="src/styles/app.scss"
@import "./_variables";
@import "./_bootstrap";
``` 

- Add scss files for overriding variables and Bootstrap source Sass file imports

```js  title="src/styles/_variables.scss"
// Override Default Variables
// https://getbootstrap.com/docs/4.6/getting-started/theming/#variable-defaults

$primary: #6610f2;
$secondary: #fd7e14;
```

```js title="src/styles/_bootstrap.scss"
// Option A: Include all of Bootstrap

// @import "~bootstrap/scss/bootstrap";

// Add custom code after this

// Option B: Include parts of Bootstrap

// Required
@import "~bootstrap/scss/functions";
@import "~bootstrap/scss/variables";
@import "~bootstrap/scss/mixins";

// Include custom variable default overrides here

// Optional
@import "~bootstrap/scss/reboot";
@import "~bootstrap/scss/type";
@import "~bootstrap/scss/images";
@import "~bootstrap/scss/code";
@import "~bootstrap/scss/grid";
```

- import in `_app.tsx`

```diff title="pages/_app.tsx"
- import "bootstrap/dist/css/bootstrap.min.css";
+ import "src/styles/app.scss";
```

- install sass
```js
npm install sass
```

### Adding Bootstrap to your project later
If you didn't add bootstrap during project creation phase, you can add it later following [official docs](https://getbootstrap.com/docs/4.6/getting-started/introduction/)

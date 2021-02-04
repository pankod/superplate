---
id: tailwind
title: Tailwind CSS
sidebar_label: Tailwind CSS
description: How to use Tailwind CSS in Next.js?
---

A utility-first CSS framework packed with classes like flex, pt-4, text-center and rotate-90 that can be composed to build any design, directly in your markup.  
[Go to Docs &#8594](https://tailwindcss.com/docs)

### Configuration files
Tailwind plugin produces the two [necessary config files:](https://tailwindcss.com/docs/guides/nextjs#create-your-configuration-files) `tailwind.config.js` and `postcss.config.js`  
[See Tailwind configuration docs &#8594](https://tailwindcss.com/docs/configuration)

### Include Tailwind in your CSS
Tailwind is imported directly in `_app.tsx`

```js title="pages/_app.tsx"
import "tailwindcss/tailwind.css";
```
[You can also include tailwind in your custom css &#8594](https://tailwindcss.com/docs/guides/nextjs#include-tailwind-in-your-css)

### Purging unused styles
`tailwind.config.js` is configured to purge unused styles in pages and components.

```js title="tailwind.config.js"
module.exports = {
    purge: ["./pages/**/*.tsx", "./src/**/*.tsx"]
}
```
[See guide on optimizing for production on Tailwind docs &#8594](https://tailwindcss.com/docs/optimizing-for-production)

### Adding Tailwind CSS to your project later
If you didn't add tailwind during project creation phase, you can add it later following [official docs](https://tailwindcss.com/docs/installation)
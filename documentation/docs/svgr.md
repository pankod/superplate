---
id: svgr
title: SVGR
sidebar_label: SVGR
---

SVGR transforms SVG into ready to use components.  
[Go to Docs &#8594](https://react-svgr.com/docs/getting-started/)

superplate uses this command to transform svg's

```js
npx @svgr/cli -d src/components/icons --ignore-existing --icon --typescript public/icons
```

This command transforms svg's at `public/icons` to `.tsx` components, puts them in `src/components/icons` ignoring existing ones.

:::caution
After adding new svg icons, you must run
```js
npm run svgr
````
to produce components for newly added svg's.  
This command can also be used to reproduce all components.
:::
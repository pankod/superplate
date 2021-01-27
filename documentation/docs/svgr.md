---
id: svgr
title: SVGR
sidebar_label: SVGR
---

SVGR transforms SVG into ready to use components.  
[Go to Docs &#8594](https://react-svgr.com/docs/getting-started/)

Run
```js
npm run svgr
```

to produce components from svg's.


```js title="package.json"
{
    scripts: {
        "svgr": npx @svgr/cli -d src/components/icons --ignore-existing --icon --typescript public/icons
    }
}
```

This command transforms svg's at `public/icons` to `.tsx` components, puts them in `src/components/icons` ignoring existing ones.

:::caution
After adding new svg icons, you must again run
```js
npm run svgr
````
to produce components for newly added svg's.
:::
[See Options Docs  &#8594](https://react-svgr.com/docs/options/)

### Using SVGR in your project without plugin
If svgr plugin isn't added, it can be used later independently
- install cli
```js
npm install @svgr/cli --save-dev
```
- run
```js
npx @svgr/cli icons/clock-icon.svg
```
[See CLI Docs  &#8594](https://react-svgr.com/docs/cli/)
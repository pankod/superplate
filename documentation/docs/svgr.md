---
id: svgr
title: SVGR
sidebar_label: SVGR
---

SVGR transforms SVG into ready to use components.  
[Refer to official documentation for detailed usage. &#8594](https://react-svgr.com/docs/getting-started/)

Run the following command to produce components from SVG's.
```js
npm run svgr
```



This will transform SVG's at `public/icons` to `.tsx` components, puts them in `src/components/icons` ignoring existing ones.

:::caution
After adding new SVG icons, you must run the following command again to produce components for newly added SVG's.
```js
npm run svgr
````

:::
[Refer to official documentation for detailed usage.  &#8594](https://react-svgr.com/docs/options/)

### Using SVGR in your project without plugin
If you didn't choose the SVGR plugin during project creation phase, you can follow the instructions below to add it. 

Install [@svgr/cli](https://react-svgr.com/docs/cli/)
```js
npm install @svgr/cli --save-dev
```
Add command to scripts
```js title="package.json"
{
    scripts: {
        "svgr": "npx @svgr/cli -d src/components/icons --ignore-existing --icon --typescript public/icons"
    }
}
```
Then run the following command
```js
npm run svgr
```
[Refer to official documentation for detailed usage  &#8594](https://react-svgr.com/docs/cli/)

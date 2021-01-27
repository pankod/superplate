---
id: creating-a-plugin
title: Creating a Plugin
sidebar_label: Creating a Plugin
---

You may need to add and modify some files to properly set up libraries with your Next.js project. What we call **plugin** is a directory with all the packages you need to install and the files you need to add and modify.

This article will show you how to create a superplate plugin from scratch and the ways superplate offers you to interact with other plugins in your source. 

Let's create a plugin to add [styled-components](asd) to our project easily. 

### Creating a Plugin Directory

Let's start with creating a directory for our plugin inside our source's `plugins` directory.

```bash
mkdir plugins/styled-components
```

### Adding Plugin to the Prompts

We need to add our plugin to appropriate place in `prompt.js` file. We can ask the user for a styling and place `styled-components` inside it.

```js
module.exports = {
    prompts: [
        {
            name: "styling",
            message: "How would you like to style your apps?",
            type: "select",
            choices: [
                { message: "None", name: "none" },
                { message: "styled-components", name: "styled-components" },
            ],
            default: "none",
        },
    ]
}
```

:::warning
Make sure `name` or `value` property for the choice is the same with the directory name you've created.
:::

## Creating a `package.json`

Let's create a `package.json` inside the plugin directory. We need to add `styled-components` package and the `babel-plugin-styled-components` to properly support SSR. 

```json
{
    "dependencies": {
      "styled-components": "^5.2.1"
    },
    "devDependencies": {
      "babel-plugin-styled-components": "^1.12.0"
    }
}
```

## Modifying `package.json` with User Answers

Let's say that we want to prompt the users, asking them if they want to include the support for SSR.

We can do so by simply modifying our `prompt.js`. Append below codes to your prompts array. 

```js
{
    name: "ssr",
    message: "Do you want styled-components to support SSR?",
    // This will be a Yes/No question
    type: "confirm",
    // We want to skip this question if styled-components is not selected.
    skip: ({answers}) => answers.styling !== "styled-components",
}
```

And if this prompt is not answered *Yes* we want to remove the babel plugin from `devDependencies`. We can do that by creating a `package.js` inside our plugin.

```js

```

## Using Templates

## Passing Template Data to Other Plugins

### Modifying `App` and `Document`

### Defining Custom Data

## Custom `tsconfig.json`

## Custom `.babelrc`

## Providing a Plugin Description

:::warning

work in progress

:::
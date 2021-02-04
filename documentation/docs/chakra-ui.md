---
id: chakra-ui
title: Chakra UI
sidebar_label: Chakra UI
description: How to use Chakra UI in Next.js?
---

Chakra UI is a simple, modular and accessible component library that gives you the building blocks you need to build your React applications.  
[Go to Docs &#8594](https://chakra-ui.com/docs/getting-started)

### Style Props
Style props are a way to alter the style of a component by simply passing props to it

```js
import { Box, Text } from "@chakra-ui/react"

<Box
    m={2} // margin
    bg="tomato" // background color
    h={32} // height
    display="flex"
    alignItems="center"
    border="1px"
    borderRightRadius="0"
    boxShadow="xl"
    _hover={{
        background: "white",
        color: "teal.500",
  }}
    >
    <Text
        fontSize={32}
        textAlign="center"
    />
</Box>
```

[See Docs &#8594](https://chakra-ui.com/docs/features/style-props)

### Responsive Styles
Chakra UI supports responsive styles out of the box. Instead of manually adding @media queries and adding nested styles throughout your code, Chakra UI allows you provide object and array values to add mobile-first responsive styles.

```js
<Text fontSize={{ base: "24px", md: "40px", lg: "56px" }}>
  This is responsive text
</Text>
```

:::note
Chakra UI uses the min-width media query for responsive design.  
:::

[See Docs &#8594](https://chakra-ui.com/docs/features/responsive-styles)

### Theming
Chakra provides a sensible default theme inspired by Tailwind CSS, but you can customize it to fit your design.
[See Default Theme Docs &#8594](https://chakra-ui.com/docs/theming/theme)  
[See Docs on how to customize theme &#8594](https://chakra-ui.com/docs/theming/customize-theme)

### Component Style
Chakra also provides a way to write component styles that is easy to maintain over the life of a growing and changing project  
[See Component Style Docs &#8594](https://chakra-ui.com/docs/theming/component-style)

### Color Mode (Dark Mode)
Chakra UI comes with built-in support for managing color mode in your apps.  
[See Docs on how to setup color mode &#8594](https://chakra-ui.com/docs/features/color-mode)


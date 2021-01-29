---
id: react-use
title: React Use
sidebar_label: React Use
---
  
react-use has various hooks that you can use with ease.

Hooks are functions that let you “hook into” React state and lifecycle features from function components. Hooks don’t work inside classes — they let you use React without classes.

Refer to [documentation](https://github.com/streamich/react-use) for detailed usage.

:::tip

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

If you didn't choose the plugin during project creation phase, be sure to install with `npm install react-use` if you want to add `react-use` afterwards.
:::

In this example, we'll use `useWindowSize` and  `usePrevious` hooks in order to  tracks `Window` dimensions and get the previous state with ease.

```js
import React from "react";
// highlight-next-line
import { usePrevious, useWindowSize } from "react-use";

export const ReactUseExample = () => {
    const [count, setCount] = React.useState(0);
    // highlight-start
    const prevCount = usePrevious(count);
    const { width, height } = useWindowSize();
     // highlight-end

    return (
        <div>
            <div>
                <p>usePrevious</p>
                <p>
                    Now: {count}, before: {prevCount}
                </p>
                <p>
                    <button onClick={() => setCount(count + 1)}>
                        Increment
                    </button>
                    <button onClick={() => setCount(count - 1)}>
                        Decrement
                    </button>
                </p>
            </div>
            <div>
                <p>useWindowSize</p>
                <p>
                    width: {`${width}px`}, height: {`${height}px`}
                </p>
            </div>
        </div>
    );
};
```

---
id: zustand
title: Zustand
sidebar_label: Zustand
description: How to Use zustand in Next.js?
---

### Overview

Zustand is one of the lightest state management libraries.

It's a small, fast, scalable state-management solution using simplified flux principles and has an api based on hooks.
 
We'll show basic usage of zustand with simple counter example.  
[Refer to official documentation for detailed usage. &#8594](https://github.com/pmndrs/zustand)

### Usage

Zustand is known for its simplicity.
We don't need to wrap our root code or add any complex setup.

``` jsx title="components/ZustandExample/index.tsx"
import create from "zustand";

interface Counter {
  count: number;
  inc: () => void;
  dec: () => void;
}

export const useStore = create<Counter>((set) => ({
  count: 1,
  inc: () => set((state) => ({ count: state.count + 1 })),
  dec: () => set((state) => ({ count: state.count - 1 })),
}));

export const ZustandExample = () => {
  const { count, inc, dec } = useStore();
  return (
    <div>
      <button onClick={inc}>up</button>
      <span>{count}</span>
      <button onClick={dec}>down</button>
    </div>
  );
};
```

<br/>

The main function is called `create`. It accepts a callback function, which accepts a `set` function that should be used when manipulating memory.

The `create` then returns a hook, which is called `useStore`. You can use anywhere in app like so:

```tsx
const { count, inc, dec } = useStore();
```

Clicking on the buttons will update state and change count.

<br/>



:::note

All required configurations will be handled automatically by CLI as long as you choose Recoil plugin during the project creation phase.

:::


### Adding zustand to your project later

If you didn't choose zustand plugin during project creation phase, you can follow the instructions below to add it.


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```bash
npm install zustand
```

  </TabItem>
  <TabItem value="yarn">

```bash
yarn add zustand
```

  </TabItem>
</Tabs>


Refer to official [documentation](https://github.com/pmndrs/zustand) for installation.

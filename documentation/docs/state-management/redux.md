---
id: redux
title: Redux
sidebar_label: Redux
---

Redux is a predictable state container for JavaScript apps.

It helps you write applications that behave consistently, run in different environments (client, server, and native), and are easy to test. On top of that, it provides a great developer experience, such as live code editing combined with a time traveling debugger.  
[Refer to official documentation for detailed usage. &#8594](https://redux.js.org/introduction/getting-started)

superplate serves an optional `redux` plugin that prepares a hooks based Redux setup
### Configure Store & Setup Reducers

- Create a store with a root reducer
```ts title="src/redux/store.ts"
import { createStore } from "redux";

import rootReducer from "./reducers";

export default createStore(rootReducer);
 ```

-  Add a root reducer that combines reducers.

[Refer to official documentation on combineReducers for detailed usage. &#8594](https://redux.js.org/recipes/structuring-reducers/using-combinereducers)


 ```ts title="src/redux/reducers/index.ts"
import { combineReducers } from "redux";

import counter from "./counter";

export default combineReducers({ counter });
 ```

```ts title="src/redux/reducers/counter/index.ts"
import { INCREASE, DECREASE } from "@redux/actionTypes";

const initialState = {
  count: 20,
};

export default function Counter(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        count: state.count + 1,
      };
    case DECREASE:
      return {
        count: state.count - 1,
      };
    default:
      return state;
  }
}
```

- Add action types `INCREASE`, `DECREASE`.

```ts title="src/redux/actionTypes.ts"
export const INCREASE = "INCREASE";
export const DECREASE = "DECREASE";
```

- Then pass `store` to `Provider` from React-Redux in `_app.tsx`
```tsx title="pages/_app.tsx"
import React from "react";
import { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "@redux/store";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;

```

Now everything's ready to read data from store and dispatch some actions to make changes to store state.

:::tip

All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **Redux** plugin during the project creation phase.

:::

[Refer to official documentation on configuring store for detailed usage. &#8594](https://redux.js.org/recipes/configuring-your-store)  
[Refer to official documentation on structuring reducers for detailed usage. &#8594](https://redux.js.org/recipes/structuring-reducers/structuring-reducers)

### Hooks (useSelector & useDispatch)

`useSelector` from React-Redux is used to read data from store. It accepts a single selector function. A selector is a function that takes the entire Redux store state as its argument, reads some value from the state, and returns that result.

The React-Redux also provides a `useDispatch` hook that gives us the store's dispatch method as its result. This method is used to dispatch actions to make changes to the store state.

```tsx title="src/components/counter/index.tsx"
import React from "react";
// highlight-start
import { useDispatch, useSelector } from "react-redux";
// highlight-end

import { increase, decrease } from "@redux/actions";
import { IState } from "@redux/istate";

export default function Counter() {
  // highlight-start
  const dispatch = useDispatch();
  const count = useSelector((state: IState) => state.counter.count);
  // highlight-end
  
  return (
    <div>
      <div>
        <h2>Counter</h2>
        <button
          type="button"
          // highlight-start
          onClick={() => dispatch(increase())}
          // highlight-end
        >
          +
        </button>
        <span>{count}</span>
        <button
          type="button"
          // highlight-start
          onClick={() => dispatch(decrease())}
          // highlight-end
        >
          -
        </button>
      </div>
    </div>
  );
}
```

`increase` and `decrease` are action creator methods that return actual action objects for dispatch

```ts title="src/redux/actions.ts"
import { INCREASE, DECREASE } from "./actionTypes";

export const increase = () => ({
  type: INCREASE,
});

export const decrease = () => ({
  type: DECREASE,
});
```

[Refer to official documentation on Hooks usage for detailed usage. &#8594](https://redux.js.org/tutorials/fundamentals/part-5-ui-react#reading-state-from-the-store-with-useselector)

### Middleware

Redux middleware provides a third-party extension point between dispatching an action, and the moment it reaches the reducer. Redux middleware can be used for logging, crash reporting, talking to an asynchronous API, routing, and more.

[Refer to official documentation on Middleware for detailed usage. &#8594](https://redux.js.org/tutorials/fundamentals/part-4-store#middleware)

### Adding Redux to your project later

If you didn't choose the plugin during project creation phase, you can follow the instructions below to add it.

- install `redux` and `react-redux` packages

```bash
npm install redux && npm install react-redux
```


- [Follow insctructions in Configure Store & Setup Reducers](#configure-store--setup-reducers)

[Refer to official documentation on installation for detailed usage. &#8594](https://redux.js.org/introduction/installation)

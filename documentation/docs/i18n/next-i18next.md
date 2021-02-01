---
id: next-i18next
title: next-i18next
sidebar_label: next-i18next
---

next-i18next is a plugin that allows you to get translations up and running quickly and easily, while fully supporting SSR, multiple namespaces with codesplitting.

Refer to official [repo](https://github.com/isaachinman/next-i18next) for detailed usage.

superplate serves an optional `i18n` plugin that sets translation feature using [next-i18next](https://github.com/isaachinman/next-i18next).

The translations of custom text messsages will be stored in each language's own separate folder.

Example translation folder structure:

```
.
└── static
    └── locales
        ├── en
        |   └── common.json
        ├── tr
            └── common.json
```

For each translation folder create a json file and define translations with key-value pairs.

If you want to add a new language file you should:

  - Create a new translation file in `static/locales/{newlang}/common.json`. 
  - Add a key for the language into otherLanguages array in `server/i18n.js`.

:::caution

Make sure both folder and key names are same.

:::


```jsx title="i18n.js"
const NextI18Next = require('next-i18next').default
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig
const path = require('path')

module.exports = new NextI18Next({
  otherLanguages: ['en', 'tr'],
  defaultLanguage: 'en',
  localeSubpaths,
  localePath: path.resolve('./public/locales')
})
```

#### Changing current language
Use `changeLanguage()` method of `i18n` to set current language and trigger the language change manually.

`t()` function can be used to fetch the translation.

You can specify key as a String. It resolves key-value pair from language json file in locales folder and returns value as a string.


```jsx title="components/I18NExampleComponent
import React from "react";
import { TFunction } from "next-i18next";
import { withTranslation, i18n } from "./i18n.js";

const I18NExampleComponent: React.FC<{ t: TFunction }> = ({ t }) => {
  const changeLanguage = () => {
    i18n.changeLanguage(i18n.language === "tr" ? "en" : "tr");
  };

  return (
      <div>
        <button onClick={changeLanguage}>{t(`common:language.en`)}</button>
        <button onClick={changeLanguage}>{t(`common:language.tr`)}</button>
      </div>
  );
};

export const I18NExample = withTranslation(["common", "home"])(
  I18NExampleComponent
);
```


<br/>

:::tip

All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose next-i18next i18n plugin during the project creation phase.

:::

:::caution
Don't forget to wrap your app with i18n, if you prefer to add next-i18next plugin to existing project.

```jsx title="pages/_app.tsx"
...

import { appWithTranslation } from "./i18n.js";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
...
}

export default appWithTranslation(MyApp);
```
:::

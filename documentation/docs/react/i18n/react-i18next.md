---
id: react-i18next
title: react-i18next
sidebar_label: react-i18next
description: Using i18n with React
---

react-i18next is a powerful internationalization framework for React / React Native which is based on i18next.

[Refer to official documentation for detailed usage. &#8594](https://www.i18next.com/)

superplate serves an optional `i18n` plugin that sets translation feature using [react-i18next](https://react.i18next.com/).


```tsx title="i18n.js"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      hello: "Hello",
      greet: "Hello, {{name}}!",
      documentation: "Go To Documentation",
    },
  },
  tr: {
    translation: {
      hello: "Merhaba",
      greet: "Merhaba, {{name}}!",
      documentation: "Dökümantasyona Git",
    },
  },
};

i18n
  .use(initReactI18next) 
  .init({
    resources,
    lng: "en",

    keySeparator: false,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

```

### How to use react-i18next?
Use `changeLanguage()` method of `i18n` to set current language and trigger the language change manually.

`t()` function can be used to fetch the translation.

You can specify key as a String. It resolves key-value pair from `i18n.js` file and returns value as a string.


```tsx title="components/examples/translate
import React from "react";
import { useTranslation } from "react-i18next";

export const TranslateExample: React.FC = () => {
  // https://react.i18next.com/guides/quick-start#translate-your-content
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => i18n.changeLanguage(lang);

  return (
    <div>
      <header>
        <h2>{t("hello")}</h2>
        <div>
          <button onClick={() => changeLanguage("tr")}>🇹🇷 Türkçe</button>
          <button onClick={() => changeLanguage("en")}>🇺🇸 English</button>
        </div>
      </header>
      <main>
        <p>{t("greet", { name: "World" })}</p>
      </main>
      <footer>
        <a
          href="https://react.i18next.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("documentation")}
        </a>
      </footer>
    </div>
  );
};

```


<br/>

### Adding react-i18next to your project later

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
npm install react-i18next i18next --save
```
  </TabItem>
  
  <TabItem value="yarn">

```
 yarn add react-i18next i18next
```
  </TabItem>
</Tabs>

- Create a new file i18n.js beside your index.js containing following content

```tsx title="src/i18n.js"
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  en: {
    translation: {
      "Welcome to React": "Welcome to React and react-i18next"
    }
  },
  fr: {
    translation: {
      "Welcome to React": "Bienvenue à React et react-i18next"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;
```

- Then import that in `index.js`:

```ts title="index.js" {3}
import React, { Component } from "react";
import ReactDOM from "react-dom";
import './i18n';
import App from './App';

// append app to dom
ReactDOM.render(
  <App />,
  document.getElementById("root")
);
```

## Translate your content

Learn more about [translate &#8594](https://react.i18next.com/guides/quick-start#translate-your-content)


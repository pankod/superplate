---
id: next-translate 
title: next-translate 
sidebar_label: next-translate 
---

The main goal of this library is to keep the translations as simple as possible in a Next.js environment.

Next-translate has two parts: `Next.js plugin` + `i18n API`.

Refer to [documentation](https://github.com/vinissimus/next-translate) for detailed usage.


The translations of custom text messsages will be stored in each language's own separate folder.

```js
- locales
    - en
        - common.js
        - home.js
    - tr
        - common.js
        - home.js
```

For each translation folder create a json file and define translations with key-value pairs.

We already added a common.json file for next-translate example.

```json title="locales/eng/common.json"
{
  "hello": "Hello",
  "greet": "Hello, {{name}}!",
  "world": "World",
  "language": {
    "tr": "🇹🇷 Türkçe",
    "en": "🇺🇸 English"
  }
}
```

```json title="locales/tr/common.json"
{
  "hello": "Merhaba",
  "greet": "Merhaba, {{name}}!",
  "world": "Dünya",
  "language": {
    "tr": "🇹🇷 Türkçe",
    "en": "🇺🇸 English"
  }
}
```

### How to use next-trasnlate?

```js
import React from "react";
import Link from "next/link";
// highlight-start
import useTranslation from "next-translate/useTranslation";

import i18nConfig from "@i18n";
// highlight-end

import styles from "./index.module.css";

// highlight-start
const { locales } = i18nConfig;
// highlight-end

export const NextTranslateExample: React.FC<{ defaultNamespace: string }> = ({
    defaultNamespace,
}) => {
    const { t, lang } = useTranslation(defaultNamespace);

    return (
        <div className={styles.app}>
            ...
            <div className={styles.languageContainer}>
                // highlight-start
                {locales.map((lng) => (
                    <Link href="/" passHref locale={lng} key={lng}>
                        <a
                            className={`${styles.language} ${
                                lng === lang ? styles.selectedLanguage : ""
                            }`}
                        >
                            {t(`common:language.${lng}`)}
                        </a>
                    </Link>
                ))}
                // highlight-end
            </div>
            <main className={styles.content}>
                // highlight-start
                <p>{t("common:greet", { name: t`common:world` })}</p>
                // highlight-end
            </main>
            ...
        </div>
    );
};
```

### How to configure next-translate?

:::caution

All required configurations will be handled automatically by CLI as long as you choose plugins during the project creation phase.

:::

If you didn't choose the plugin during project creation phase, you create `i18n.json` file as below after installing required package to add it.

```json title="i18n.json"
{
    "locales": ["en", "tr"],
    "defaultLocale": "en",
    "pages": {
        "*": ["common"],
        "/": ["home"]
    }
}
```
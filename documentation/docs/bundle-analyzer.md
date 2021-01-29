---
id: bundle-analyzer
title: Bundle Analyzer
sidebar_label: Bundle Analyzer
---

Bundle Analyzer visualizes size of output files with an interactive treemap. This helps you understand what’s taking the most space in the bundles.

superplate serves optional plugin which adds [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to the created project.

 Run the command below:

 ```
 npm run build:analyze
```

This should open 2 pages in the browser. One for client bundles, and one for the server bundles.

---
id: azure-pipelines
title: Azure Pipelines
sidebar_label: Azure Pipelines
description: Build Next.js Apps using Azure Pipelines
---

[Azure Pipelines](https://docs.microsoft.com/en-us/azure/devops/pipelines/yaml-schema?view=azure-devops&tabs=schema%2Cparameter-schema) automatically builds and tests code projects to make them available to others. Azure Pipelines combines continuous integration (CI) and continuous delivery (CD) to constantly and consistently test and build your code and ship it to any target, such as [Azure App Service](https://azure.microsoft.com/en-au/services/app-service/) or the new [Azure Static Web Apps](https://azure.microsoft.com/en-au/services/app-service/static/).

The following YAML workflow file created into the `./azure-pipelines.yml` as a default by superplate, if Azure Pipelines is selected as a CI plugin.

```bash title="azure-pipelines.yml"
trigger:
  - main
  - master
      
pr:
  - main
  - master

pool:
  vmImage: ubuntu-latest

jobs:
  - job:
    steps:
      - checkout: self
        persistCredentials: true

      - task: NodeTool@0
        inputs:
          versionSpec: "14.x"
        displayName: "Setup node env"

      - script: |
          'npm ci'
        displayName: "Install dependencies"

      - script: |
          'npm run lint'
        displayName: "Run lint"

      - script: |
          'npm run test'
        displayName: "Run tests"
```

:::note
If you are using Yarn2, you can take advantage of [Zero-Installs](https://yarnpkg.com/features/zero-installs), negating the need for a caching step.
:::


:::tip
The following commands are added to `azure-pipelines.yml` by superplate if any of plugins listed below is selected during project creation phase.
:::

:::note
You can use the following commands in case of adding Azure Pipelines to existing project later.
:::


import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


### Package manager  
---

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

``` 
- npm ci
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn
```            
  </TabItem>
</Tabs>

<br/>


### Install dependencies  
---

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm ci
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn
```            
  </TabItem>
</Tabs>

<br/>

### Run ESlint
---

<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run lint
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn lint
```            
  </TabItem>
</Tabs>

<br/>

## Testing
---


### Run tests
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run test
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn test
```            
  </TabItem>
</Tabs>

### Run Cypress E2E Testing
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run cypress:test
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn cypress:test
```            
  </TabItem>
</Tabs>


### WebdriverIO E2E Testing
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- npm run webdriver:run
```
  </TabItem>
  <TabItem value="yarn">

```
- yarn webdriver:run
```            
  </TabItem>
</Tabs>

:::tip
If you are building a static-rendered Next.js website in Azure, consider deploying to [Azure Static Web Apps](https://docs.microsoft.com/en-us/azure/static-web-apps/overview)
:::
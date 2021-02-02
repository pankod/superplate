---
id: travis
title: Travis CI
sidebar_label: Travis CI
---


As a continuous integration platform, Travis CI supports your development process by automatically building and testing code changes, providing immediate feedback on the success of the change. Travis CI can also automate other parts of your development process by managing deployments and notifications.

Refer to [documentation](https://docs.travis-ci.com) for detailed usage.

The following YAML workflow file created into the `./travis.yml` as a default by superplate, if GitHub Actions selected as a CI plugin.

``` title=".github/workflows/ci.yml"
language: node_js
node_js:
  - "14"
install:
  - npm ci
  - npm run lint
  - npm run test

```
:::tip
The following commands adding to `./travis.yml` by superplate if any of plugin at the below selected during project creation phase.
:::

:::note
You can use the following commands in case of adding Travis CI to existing project later.
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
- name: Cache node_modules
  uses: actions/cache@v2
  with:
    path: ~/.npm
    key: ${{ runner.os }}-node-${{ hashFiles('**/package-lock.json') }}
    restore-keys: |
      ${{ runner.os }}-node-
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Get yarn cache directory path 
  id: yarn-cache-dir-path
  run: echo "::set-output name=dir::$(yarn cache dir)"

- name: Cache node_modules
  uses: actions/cache@v2
  id: yarn-cache # use this to check for `cache-hit` (`steps.yarn-cache.outputs.cache-hit != 'true'`)
  with:
    path: ${{ steps.yarn-cache-dir-path.outputs.dir }}
    key: ${{ runner.os }}-yarn-${{ hashFiles('**/yarn.lock') }}
    restore-keys: |
      ${{ runner.os }}-yarn-
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
- name: Install dependencies 
  run: npm ci
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Install dependencies 
  run: yarn
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
- name: Run lint
  run: npm run lint
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run lint
  run: yarn lint
```            
  </TabItem>
</Tabs>

<br/>

### Testing
---


#### Run tests
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- name: Run tests
  run: npm run test
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run tests
  run: yarn test
```            
  </TabItem>
</Tabs>

#### Run Cypress E2E Testing
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- name: Run e2e test
  run: npm run cypress:test
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run e2e test
  run: yarn cypress:test
```            
  </TabItem>
</Tabs>


#### WebdriverIO E2E Testing
<Tabs
  defaultValue="npm"
  values={[
    {label: 'npm', value: 'npm'},
    {label: 'yarn', value: 'yarn'},
  ]}>
  <TabItem value="npm">

```
- name: Run e2e test
  run: npm run webdriver:run
```
  </TabItem>
  <TabItem value="yarn">

```
- name: Run e2e test
  run: yarn webdriver:run
```            
  </TabItem>
</Tabs>




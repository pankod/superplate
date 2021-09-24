---
slug: /refine
id: refine
title: Refine
---

## What is refine?

**refine** is a [React](https://reactjs.org/)-based framework for building data-intensive applications in no time :sparkles: It ships with [Ant Design System](https://ant.design/), an enterprise-level UI toolkit.

Refine offers lots of out-of-the box functionality for rapid development, without compromising extreme customizability. Use-cases include, but are not limited to *admin panels*, *B2B applications* and *dashboards*.
###

## Key features

⚙️ **Zero-configuration**: One-line setup with [superplate](https://github.com/pankod/superplate). It takes less than a minute to start a project.

📦 **Out-of-the-box** : Routing, networking, authentication, state management, i18n and UI.

🔌 **Backend Agnostic** : Connects to any custom backend. Built-in support for [REST API](https://github.com/pankod/refine/tree/master/packages/simple-rest), [Strapi](https://strapi.io/), [NestJs CRUD](https://github.com/nestjsx/crud), [Airtable](https://www.airtable.com/), [Supabase](https://supabase.io/) and [Altogic](https://altogic.com/).

📝 **Native Typescript Core** : You can always opt out for plain Javascript.

🔘 **Decoupled UI** : UI components are exposed directly without encapsulation. You have full control on UI elements.

🐜 **Powerful Default UI** : Works seamlessly with integrated [Ant Design System](https://ant.design/). (Support for multiple UI frameworks is on the Roadmap)

📝 **Boilerplate-free Code** : Keeps your codebase clean and readable.

### Motivation

Higher-level frontend frameworks can save you a lot time, but they typically offer you a trade-off between speed and flexibility. 

After many years of experience in developing B2B frontend applications and working with popular frameworks, we came up with a new approach to tackle this dilemma. This is how **refine** is born.

**Refine** is a collection of helper `hooks`, `components` and `providers`. They are all decoupled from your UI components and business logic, so they never keep you from customizing your UI or coding your own flow.

As **refine** is totally *unopinionated* about UI and logic, it's strongly *opinionated* about three parts of your application:

1. **API Networking**
2. **State Management**
3. **Authentication & Authorization**

We believe, these are the most important components of a data-intensive frontend application and should be handled in a robust way by leveraging industry best practices.

**refine** guarantees you a perfect implementation of these building blocks in your project, so you can focus on your development.

### Architecture

**refine** makes extensive use of [hooks](https://reactjs.org/docs/hooks-reference.html#gatsby-focus-wrapper) as a default way for interacting with your components. 
Under the hood, **refine** relies heavily to [React Query](https://react-query.tanstack.com/) for data handling, caching and state management. 
Access to external sources and API's happen via providers which are basically plug-in type components for extendibility.



### Benchmark

After releasing the first internal versions, we had the chance to migrate some of our *React* projects to **refine**.
In addition to **shorter development** times and **overall performance gains**, we've measured significant reduction in project size.

**refine** makes your codebase significantly smaller, by eliminating redundant code such as *reducers*, *actions* and *unit tests*. Below is a size comparison for an example project:


### Quick Start

Run the **superplate** tool with the following command:

```
npx superplate-cli tutorial
```

Follow the *CLI wizard* to select options and start creating your project.

After setup is complete, navigate to the project folder and start your project with:

```
npm run dev
```

Your **refine** application will be accessible at [http://localhost:3000](http://localhost:3000).

## Next step

Can read more about our motivation and refine's features on [https://refine.dev](https://refine.dev) website. It includes docs, tutorials and 40+ real-life examples.

We also made a demo admin panel for the imaginary quick-delivery company "finefoods": [https://example.refine.dev](https://example.refine.dev/)

Lastly, project's GitHub page is on : [https://github.com/pankod/refine](https://github.com/pankod/refine)

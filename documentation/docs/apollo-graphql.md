---
id: apollo-graphql
title: Apollo GraphQL Support
sidebar_label: Apollo GraphQL
---

Apollo is a comprehensive state management library for JavaScript that enables you to manage both local and remote data with GraphQL. Use it to fetch, cache, and modify application data, all while automatically updating your UI.

Apollo Client helps you structure code in an economical, predictable, and declarative way that's consistent with modern development practices

`superplate` comes with optional Apollo GraphQL feature plugin. In this example, we'll demonstrate using Apollo GraphQL with [SpaceX-API](https://github.com/r-spacex/SpaceX-API).



We'll define the shape of the query we'll use to fetch `launchesPast` from SpaceX-API.

```jsx title="components/apolloExample/graphql.ts"
import { gql } from "@apollo/client";

export const GET_LAUNCHES = gql`
  query GetLaunches($limit: Int) {
    launchesPast(limit: $limit) {
      mission_name
      links {
        mission_patch_small
      }
      rocket {
        rocket_name
      }
    }
  }
`;
```
<br/>

We'll use Apollo Client's `useQuery` hook to execute our `GET_LAUNCHES` query and obtains data, loading, and error properties from the result within the component. Depending on the state of those properties, we render a launch, a loading indicator, or an error message.

```jsx title="components/apolloExample/index.tsx"
import React from "react";
import { useQuery } from "@apollo/client";

import { GET_LAUNCHES } from "./graphql";
import { GetLaunches, GetLaunchesVariables } from "__generated__/GetLaunches.ts";

export const ApolloExample: React.FC = () => {
	// highlight-start
  const { data, loading, error } = useQuery<GetLaunches, GetLaunchesVariables>(
    GET_LAUNCHES,
    {
      variables: { limit: 1 },
    }
  );
   // highlight-end

  if (loading) return <p>Loading..</p>;
  if (error) return <p>ERROR: {error.message}</p>;
  if (!data) return <p>Not found</p>;

  const { links, mission_name, rocket } = data;

  return (
    <>
        <div>Last Space-X Launch</div>
        <div>
            <img src={links.mission_patch_small} />
            <div>
                <h3>{mission_name}</h3>
                <div>
                    <h4>Rocket:</h4>
                    <span>{rocket.rocket_name}</span>
                </div>
            </div>
        </div>
    </>
  );
};
```
<br/>

Since we are using TypeScript in the project, also import the necessary types that are generated from SpaceX-API schema definitions:
```jsx title="components/apolloExample/index.tsx"
import { GetLaunches, GetLaunchesVariables } from "__generated__/GetLaunches.ts";
```


### Generating schema types

To generate the types automatically we set API service endpoint to apollo config file.

Refer to [documentation](https://www.apollographql.com/docs/devtools/apollo-config/#client-projects) for detailed configuration.

```js title="apollo.config.js"
module.exports = {
  client: {
    service: {
      name: "SpaceX",
      url: "https://api.spacex.land/graphql/",
    },
  },
};
```
<br/>

Then run the following command which defined in package.json.  

```js title="package.json"
  "scripts": {
    "apollo:download-schema": "apollo client:download-schema schema.graphql",
	"apollo:generate-types": "rm -rf __generated__ && apollo client:codegen --target typescript --outputFlat",
	// highlight-next-line
    "apollo:sync": "npm run apollo:download-schema && npm run apollo:generate-types"
  },
```

```bash
npm run apollo:sync
```


Running this command will download a schema from Apollo or a GraphQL endpoint in JSON and generate static types into `__generated__` folder in project root directory automatically.


```ts title="__generated__/GetLaunches.ts"
export interface GetLaunches_launchesPast_links {
  __typename: "LaunchLinks";
  mission_patch_small: string | null;
}

export interface GetLaunches_launchesPast_rocket {
  __typename: "LaunchRocket";
  rocket_name: string | null;
}

export interface GetLaunches_launchesPast {
  __typename: "Launch";
  mission_name: string | null;
  links: GetLaunches_launchesPast_links | null;
  rocket: GetLaunches_launchesPast_rocket | null;
}

export interface GetLaunches {
  launchesPast: (GetLaunches_launchesPast | null)[] | null;
}

export interface GetLaunchesVariables {
  limit?: number | null;
}
```

<br/>

:::tip

All this work will be handled automatically by CLI, so you don’t need to do anything extra as long as you choose **Apollo GraphQL** feature plugin during the project creation phase.

:::



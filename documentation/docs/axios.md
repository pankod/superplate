---
id: axios
title: Axios
sidebar_label: Axios
---

Promise based HTTP client for the browser and node.js  

- Make XMLHttpRequests from the browser
- Make http requests from node.js
- Supports the Promise API
- Intercept request and response
- Transform request and response data
- Cancel requests
- Automatic transforms for JSON data
- Client side support for protecting against XSRF

[Go to Docs &#8594](https://github.com/axios/axios)

Performing a `GET` (or `POST`) request is as simple as calling the method on `axios`

```js
import axios from "axios";

axios.get('/user?ID=12345')
  .then(function (response) {
    // handle success
    console.log(response);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
  .then(function () {
    // always executed
  });
```
[More &#8594](https://github.com/axios/axios#note-commonjs-usage)

Requests can be made by passing the relevant config to axios.

```js
axios({
  method: 'post',
  url: '/user/12345',
  data: {
    firstName: 'Fred',
    lastName: 'Flintstone'
  }
});
```
[More &#8594](https://github.com/axios/axios#axios-api)

### Concurrency
Please use `Promise.all` to handle concurrency

```js
function getUserAccount() {
  return axios.get('/user/12345');
}

function getUserPermissions() {
  return axios.get('/user/12345/permissions');
}

Promise.all([getUserAccount(), getUserPermissions()])
  .then(function (results) {
    const acct = results[0];
    const perm = results[1];
  });
```

:::caution
Helper functions below for dealing with concurrent requests are deprecated
```js
axios.all(iterable)
axios.spread(callback)
```
:::

### Creating an instance
You can create a new instance of axios with a custom config.

```js
import React, { useState, useEffect } from "react";
import axios from "axios";

const BASE_API_URL = "https://official-joke-api.appspot.com/";

const API_URL = "/jokes/programming/random";

const jokesApi = axios.create({
    baseURL: BASE_API_URL,
});

export const AxiosExample = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        jokesApi({
            method: "get",
            url: API_URL,
        })
            .then(res => res.data)
            .then(res => {
                    setData(res);
                    setIsLoaded(true);
                },
                // Note: it's important to handle errors here
                // instead of a catch() block so that we don't swallow
                // exceptions from actual bugs in components.
                err => {
                    setIsLoaded(true);
                    setError(err);
                },
            );
    }, []);
};

```
[More &#8594](https://github.com/axios/axios#creating-an-instance)

:::tip
Consider using `react-query` or `swr` plugins to handle client-side requests.  
They can be used with promise-based methods (fetch, axios..)
:::

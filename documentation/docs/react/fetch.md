---
id: fetch
title: Fetch
sidebar_label: Fetch
description: How to use fetch data in React?
---

The Fetch API provides an interface for fetching resources (including across the network)  
[See MDN Docs &#8594](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)


### Using on Client-side

```tsx title="In your component"
export const FetchExample = () => {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [data, setData] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(res => res.json())
            .then(
                res => {
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
}
```

:::tip
Consider using `react-query` or `swr` plugins to handle client-side requests.  
They can be used with promise-based methods (fetch, axios..)
:::
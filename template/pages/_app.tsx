import React from 'react';
import { AppProps } from "next/app";
<%- _app.import.join("\n") _%>

<%
    var top = _app.wrapper.map(wrapper => wrapper[0] || "");
    var bottom = _app.wrapper.map(wrapper => wrapper[1] || "").reverse();
%>

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    <%- _app.inner.join("\n") %>
    return (
        <%- top.join("\n") %>
        <Component {...pageProps} />
        <%- bottom.join("\n") %>
    );
}

export default MyApp;

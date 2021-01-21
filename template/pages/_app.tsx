import React from 'react';
import { AppProps } from "next/app";
<%- _app.import.join("\n") %>

<%
    var half = Math.floor(_app.wrapper.length / 2)
    var openings = _app.wrapper.slice(0, half);
    var closings = _app.wrapper.slice(half);
%>

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    <%- _app.inner.join("\n") %>
    return (
        <%- openings.join("\n") %>
        <Component {...pageProps} />
        <%- closings.join("\n") %>
    );
}

<%_ if(i18n === 'next-i18next') { _%>
export default appWithTranslation(MyApp);
<%_ } else { _%>
export default MyApp;
<%_ } _%>

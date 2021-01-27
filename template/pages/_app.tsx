import React from 'react';
import { AppProps } from "next/app";
<%- _app.import.join("\n") _%>

<%
    var top = _app.wrapper.map(wrapper => wrapper[0] || "");
    var bottom = _app.wrapper.map(wrapper => wrapper[1] || "");
%>

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
    <%- _app.inner.join("\n") %>
    return (
        <%- top.join("\n") %>
        <Component {...pageProps} />
        <%- bottom.join("\n") %>
    );
}

<%_ if(i18n === 'next-i18next') { _%>
export default appWithTranslation(MyApp);
<%_ } else { _%>
export default MyApp;
<%_ } _%>

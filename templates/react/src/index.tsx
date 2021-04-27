import React from 'react';
import ReactDOM from 'react-dom';
<% - _app.import.join("\n") _ %>

import reportWebVitals from './reportWebVitals';
import App from './App';

<%
    var top = _app.wrapper.map(wrapper => wrapper[0] || "");
    var bottom = _app.wrapper.map(wrapper => wrapper[1] || "").reverse();
%>

  ReactDOM.render(() => {
  <% - _app.inner.join("\n") %>

  return (
      <React.StrictMode>
        <%- top.join("\n") %>
        <App />
        <%- bottom.join("\n") %>
      </React.StrictMode>
    );
  },
    document.getElementById('root')
  );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

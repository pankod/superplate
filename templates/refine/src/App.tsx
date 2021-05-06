import { Admin, Resource } from '@pankod/refine';
<%- _app.import.join("\n") _%>

<%
    var top = _app.wrapper.map(wrapper => wrapper[0] || "");
    var bottom = _app.wrapper.map(wrapper => wrapper[1] || "").reverse();
%>


function App() {
    <%- _app.inner.join("\n") %>
    return (
        <%- top.join("\n") %>
        <Admin <%- _app.adminProps.join("\n") %>><%- _app.children.join("\n") _%></Admin>
         <%- bottom.join("\n") %>
      );
};

export default App;

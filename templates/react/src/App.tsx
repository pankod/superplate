<%- _app.import.join("\n") _%>

<%
    var top = _app.wrapper.map(wrapper => wrapper[0] || "");
    var bottom = _app.wrapper.map(wrapper => wrapper[1] || "").reverse();
%>
import Home from "pages";


function App(): JSX.Element {
    <%- _app.inner.join("\n") %>
    return (
        <%- top.join("\n") %>
        <div className="App">
            <Home />
        </div>
         <%- bottom.join("\n") %>
      );
};

export default App;

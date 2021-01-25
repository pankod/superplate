export default function Home() {
    return (
        <main>
            <h1><%= name %></h1>
            <p <% if(!(e2etest === "none")) { %>  data-test="main-heading" <% } %> >next cli prototype app</p>
        </main>
    );
}

# <%= name %>
<% const docsUrl = "https://github.com/pankod/next-cli"; %>

This project was generated with [Next Cli](<%- docsUrl %>).

## Getting Started

Next-cli is a next.js all-in-one project generator. Create your project with the tools you need without spending hours on setting them up.

Every plugin comes with an example to give you a brief knowledge about their usage. 

## Available Scripts

### Running the development server.

```bash
    <%= pmRun %> dev
```

### Building for production.

```bash
    <%= pmRun %> build
```

### Running the production server.

```bash
    <%= pmRun %> start
```

<%_ if(linter !== 'none') { _%>
### Linting & formatting your code.

```bash
    <%= pmRun %> lint
```
<%_ } _%>

<%_ if(testing !== 'none') { _%>
### Running your tests.

```bash
    <%= pmRun %> test
```
<%_ } _%>

## Learn More

To learn more about **next-cli**, please check out the [Documentation](<%- docsUrl %>).

<% for (var i = 0; i < pluginsData.length; i++ ) { %>
### **<%= pluginsData[i].name %>**

<%= pluginsData[i].description %>

[Go To Documentation](<%- pluginsData[i].url %>)

<% } %>

## License

MIT

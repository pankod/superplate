# <%= name %>
<% const docsUrl = "https://github.com/pankod/superplate"; %>

This project was generated with [superplate](<%- docsUrl %>).

## Getting Started

superplate is a Next.js all-in-one project generator. Create your project with the tools you need without spending hours on setting them up.

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

## Learn More

To learn more about **superplate**, please check out the [Documentation](<%- docsUrl %>).

<% for (var i = 0; i < pluginsData.length; i++ ) { %>
### **<%= pluginsData[i].name %>**

<%= pluginsData[i].description %>

[Go To Documentation](<%- pluginsData[i].url %>)

<% } %>

## License

MIT

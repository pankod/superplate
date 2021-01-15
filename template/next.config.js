const withPlugins = require('next-compose-plugins');

<%_ if (css_features === 'less' || ui === "antd") { _%>
    const withLess = require('@zeit/next-less')
<%_ } _%>

module.exports = withPlugins([
    <%_ if (css_features === 'less' || ui === "antd") { _%>
        [withLess, 
            <%_ if (ui === "antd") { _%>
              {
                lessLoaderOptions: {
                    javascriptEnabled: true,
                },
              },
            <%_ } else { _%>
                { cssModules: true }
            <%_ } _%>
        ],
    <%_ } _%>
]);

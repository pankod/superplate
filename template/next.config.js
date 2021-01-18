const withPlugins = require('next-compose-plugins');

<%_ if (css_features === 'less' || (ui === "antd" && css_features === 'less')) { _%>
    const withLess = require('@zeit/next-less')
<%_ } _%>

<%_ if (ui === "bootstrap" && css_features === 'less') { _%>
    const withCss = require('@zeit/next-css')
<%_ } _%>

<%_ if (features.find(f => f === 'bundle-analyzer')) { _%>
    const withBundleAnalyzer = require('@next/bundle-analyzer')({
        enabled: process.env.ANALYZE === 'true',
    })
<%_ } _%>


module.exports = withPlugins(
    [
        <%_ if (css_features === 'less' || (ui === "antd" && css_features === 'less')) { _%>
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

        <%_ if (ui === "bootstrap" && css_features === 'less') { _%>
            [withCss],
        <%_ } _%>

        <%_ if (features.find(f => f === "bundle-analyzer")) { _%>
            [withBundleAnalyzer],
        <%_ } _%>
    ]
);

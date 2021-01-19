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

<%_ if (i18n === 'next-translate') { _%>
    const nextTranslate = require('next-translate');
<%_ } _%>

<%_ if (i18n === 'next-i18next') { _%>
    const { nextI18NextRewrites } = require('next-i18next/rewrites');

    const localeSubpaths = {
        tr: 'tr',
        en: 'en'
    }
<%_ } _%>

const config = {
<%_ if (features.find(f => f === 'reverse-proxy')) { _%>
    devServer: {
        proxy: {
        '/api': 'http://localhost:3000'
        }
    }, 
<%_ } _%>
<%_ if (i18n === 'next-i18next') { _%>
    rewrites: async () => nextI18NextRewrites(localeSubpaths),
    publicRuntimeConfig: {
      localeSubpaths,
    },
<%_ } _%>
};

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

        <%_ if (i18n === 'next-translate') { _%>
            [nextTranslate],
        <%_ } _%>
    ],
    config,
);

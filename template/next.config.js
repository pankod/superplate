const withPlugins = require('next-compose-plugins');

<%_ if (css_features === 'less') { _%>
    const withLess = require('@zeit/next-less')
<%_ } _%>

module.exports = withPlugins([
    <%_ if (css_features === 'less') { _%>
        [withLess, { cssModules: true }],
    <%_ } _%>
]);

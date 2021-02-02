/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

const siteConfig = {
  title: 'superplate',
  tagline: 'The frontend boilerplate with superpowers',
  url: 'https://pankod.github.io',
  baseUrl: '/superplate/',
  projectName: 'superplate',
  organizationName: 'pankod',
  favicon: 'img/superplate-logo.svg',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: './docs',
          sidebarPath: require.resolve('./sidebars.js'),
          editUrl:
            'https://github.com/pankod/superplate/tree/master/documentation',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    image: 'img/footer_icon.png',
    algolia: {
      apiKey: '3be60f4f8ffc24c75da84857d6323791',
      indexName: 'superplate',
    },
    navbar: {
      title: 'SuperPlate',
      logo: {
        alt: 'SuperPlate Logo',
        src: 'img/superplate-logo.svg',
      },
      items: [
        { to: 'docs', label: 'Docs', position: 'right' },
        {
          href: 'https://github.com/pankod/superplate',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'docs/getting-started/how-it-works',
            },
            {
              label: 'Features',
              to: 'docs',
            },
            /* To do Set Up label and how it work label*/
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'Twitter',
              href: 'https://twitter.com/PankodDev',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: "https://github.com/pankod/superplate",
            },
          ],
        },
      ],
      logo: {
        alt: 'Pankod Logo',
        src: 'img/pankod_footer_logo.png',
      },
      copyright: `Copyright © ${new Date().getFullYear()} Pankod, Inc.`,
    },
  },
};

module.exports = siteConfig;
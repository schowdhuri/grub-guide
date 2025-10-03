import type { Config } from '@docusaurus/types';
import type { Options as ClassicPresetOptions } from '@docusaurus/preset-classic';
import { themes as prismThemes } from 'prism-react-renderer';

const config: Config = {
  title: 'Global Grub Guide',
  tagline: 'A personal journey through world cuisines 🍜🌍',
  favicon: 'img/logo.svg',

  // Set the production url of your site here
  url: 'https://schowdhuri.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/grub-guide/',

  // GitHub pages deployment config.
  organizationName: 'schowdhuri',
  projectName: 'grub-guide',
  trailingSlash: false,

  onBrokenLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to set this to `zh-Hans`.
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  // Prevent search engine indexing and LLM scraping
  headTags: [
    {
      tagName: 'meta',
      attributes: {
        name: 'robots',
        content: 'noindex, nofollow',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'googlebot',
        content: 'noindex, nofollow',
      },
    },
    {
      tagName: 'meta',
      attributes: {
        name: 'ai-content-declaration',
        content: 'no-scrape',
      },
    },
  ],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './src/sidebars.ts',
          routeBasePath: '/', // Serve docs at site's root
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies ClassicPresetOptions,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    navbar: {
      title: 'Global Grub Guide',
      logo: {
        alt: 'GGG Logo',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: '/cuisines',
          position: 'left',
          label: 'Cuisines',
        },
        {
          to: '/locations',
          position: 'left',
          label: 'Locations',
        },
        {
          type: 'custom-searchNavbarItem',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Browse',
          items: [
            {
              label: 'By Cuisine',
              to: '/cuisines',
            },
            {
              label: 'By Location',
              to: '/locations',
            },
          ],
        },
        {
          title: 'More',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/subir/global-grub-guide',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Global Grub Guide. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },
  themes: ['@docusaurus/theme-mermaid'],
};

export default config;
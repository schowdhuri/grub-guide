import type { Config } from "@docusaurus/types";
import type { Options as ClassicPresetOptions } from "@docusaurus/preset-classic";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "Global Grub Guide",
  tagline: "A personal journey through world cuisines 🍜🌍",
  favicon: "img/logo.svg",

  // Set the production url of your site here
  url: "https://food.subir.in",
  baseUrl: "/",

  // GitHub pages deployment config.
  organizationName: "schowdhuri",
  projectName: "grub-guide",
  trailingSlash: false,

  onBrokenLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to set this to `zh-Hans`.
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  // Prevent search engine indexing and LLM scraping
  headTags: [
    {
      tagName: "meta",
      attributes: {
        name: "robots",
        content: "noindex, nofollow",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "googlebot",
        content: "noindex, nofollow",
      },
    },
    {
      tagName: "meta",
      attributes: {
        name: "ai-content-declaration",
        content: "no-scrape",
      },
    },
  ],

  presets: [
    [
      "classic",
      {
        docs: {
          sidebarPath: "./src/sidebars.ts",
          routeBasePath: "/", // Serve docs at site's root
          editUrl: undefined, // Disable "edit this page" links
        },
        blog: false,
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies ClassicPresetOptions,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: "img/docusaurus-social-card.jpg",
    navbar: {
      title: "Global Grub Guide",
      logo: {
        alt: "GGG Logo",
        src: "img/logo.svg",
      },
      items: [
        {
          to: "/cuisines",
          position: "left",
          label: "Cuisines",
        },
        {
          to: "/locations",
          position: "left",
          label: "Locations",
        },
        {
          type: "custom-searchNavbarItem",
          position: "right",
        },
      ],
    },
    footer: {
      style: "light",
      links: [
        {
          title: "Browse",
          items: [
            {
              label: "By Cuisine",
              to: "/cuisines",
            },
            {
              label: "By Location",
              to: "/locations",
            },
          ],
        },
      ],
      copyright: `© ${new Date().getFullYear()} Subir Chowdhuri`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  },

  markdown: {
    mermaid: true,
    hooks: {
      onBrokenMarkdownLinks: "warn",
    },
  },
  themes: ["@docusaurus/theme-mermaid"],
};

export default config;

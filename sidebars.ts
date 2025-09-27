/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  // By default, Docusaurus generates a sidebar from the docs folder structure
  tutorialSidebar: [
    'index',
    {
      type: 'category',
      label: 'Countries',
      items: [
        {
          type: 'category',
          label: '🇹🇭 Thailand',
          items: [
            'countries/thailand/index',
            {
              type: 'category',
              label: 'Curries',
              items: [
                'countries/thailand/gaeng-keow-wan',
                'countries/thailand/gaeng-massaman',
                'countries/thailand/gaeng-phed',
              ],
            },
            {
              type: 'category',
              label: 'Noodles',
              items: [
                'countries/thailand/pad-thai',
                'countries/thailand/khao-soi',
                'countries/thailand/pad-see-ew',
              ],
            },
            {
              type: 'category',
              label: 'Salads',
              items: [
                'countries/thailand/som-tam',
                'countries/thailand/larb',
              ],
            },
            {
              type: 'category',
              label: 'Soups',
              items: [
                'countries/thailand/tom-yum-goong',
                'countries/thailand/tom-kha-gai',
                'countries/thailand/boat-noodles',
                'countries/thailand/jim-jum',
              ],
            },
            {
              type: 'category',
              label: 'Rice Dishes',
              items: [
                'countries/thailand/khao-kha-moo',
                'countries/thailand/khao-chae',
                'countries/thailand/khao-pad',
                'countries/thailand/khao-man-gai',
              ],
            },
            {
              type: 'category',
              label: 'Grilled & BBQ',
              items: [
                'countries/thailand/gai-yang',
                'countries/thailand/moo-yang',
                'countries/thailand/satay',
                'countries/thailand/pla-pao',
              ],
            },
            {
              type: 'category',
              label: 'Stir-Fried Dishes',
              items: [
                'countries/thailand/pad-krapow',
                'countries/thailand/pad-prik-king',
                'countries/thailand/cashew-chicken',
              ],
            },
            {
              type: 'category',
              label: 'Desserts',
              items: [
                'countries/thailand/khao-niao-mamuang',
                'countries/thailand/khanom-krok',
                'countries/thailand/khanom-tokyo',
                'countries/thailand/khanom-bueang',
              ],
            },
            {
              type: 'category',
              label: 'Street Food & Snacks',
              items: [
                'countries/thailand/hoy-tod',
                'countries/thailand/tod-mun-pla',
                'countries/thailand/gai-tod',
                'countries/thailand/sai-krok-isan',
                'countries/thailand/sai-ua',
                'countries/thailand/gai-ping',
                'countries/thailand/nam-jim-jeaw',
              ],
            },
            {
              type: 'category',
              label: 'Chinese-Thai Specialties',
              items: [
                'countries/thailand/birds-nest-soup',
                'countries/thailand/ginger-tea-soy-curd',
              ],
            },
          ],
        },
        // Other countries will be added as their content is created
      ],
    },
  ],
};

export default sidebars;
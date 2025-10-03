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
  // Main sidebar for homepage and navigation hubs
  mainSidebar: [
    {
      type: 'doc',
      id: 'cuisines',
      label: '🍽️ Browse by Cuisine',
    },
    {
      type: 'doc',
      id: 'locations',
      label: '📍 Browse by Location',
    },
  ],

  // OLD - Cuisine-based navigation (now moved to sidebars-cuisine.js)
  cuisineSidebar: [
    {
      type: 'category',
      label: '🇹🇭 Thai Cuisine',
      items: [
        {
          type: 'category',
          label: 'Curries',
          items: [
            'food/gaeng-keow-wan',
            'food/gaeng-massaman',
            'food/gaeng-phed',
          ],
        },
        {
          type: 'category',
          label: 'Noodles',
          items: [
            'food/pad-thai',
            'food/khao-soi',
            'food/pad-see-ew',
          ],
        },
        {
          type: 'category',
          label: 'Salads',
          items: [
            'food/som-tam',
            'food/larb',
          ],
        },
        {
          type: 'category',
          label: 'Soups',
          items: [
            'food/tom-yum-goong',
            'food/tom-kha-gai',
            'food/boat-noodles',
            'food/jim-jum',
          ],
        },
        {
          type: 'category',
          label: 'Rice Dishes',
          items: [
            'food/khao-kha-moo',
            'food/khao-chae',
            'food/khao-pad',
            'food/khao-man-gai',
          ],
        },
        {
          type: 'category',
          label: 'Grilled & BBQ',
          items: [
            'food/gai-yang',
            'food/moo-yang',
            'food/satay',
            'food/pla-pao',
          ],
        },
        {
          type: 'category',
          label: 'Stir-Fried Dishes',
          items: [
            'food/pad-krapow',
            'food/pad-prik-king',
            'food/cashew-chicken',
          ],
        },
        {
          type: 'category',
          label: 'Desserts',
          items: [
            'food/khao-niao-mamuang',
            'food/khanom-krok',
            'food/khanom-tokyo',
            'food/khanom-bueang',
          ],
        },
        {
          type: 'category',
          label: 'Street Food & Snacks',
          items: [
            'food/hoy-tod',
            'food/tod-mun-pla',
            'food/gai-tod',
            'food/sai-krok-isan',
            'food/sai-ua',
            'food/gai-ping',
            'food/nam-jim-jeaw',
          ],
        },
        {
          type: 'category',
          label: 'Chinese-Thai Specialties',
          items: [
            'food/birds-nest-soup',
            'food/ginger-tea-soy-curd',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🇵🇭 Filipino Cuisine',
      items: [
        {
          type: 'category',
          label: 'National Dishes & Adobo',
          items: [
            'food/adobo',
            'food/lechon',
            'food/sisig',
          ],
        },
        {
          type: 'category',
          label: 'Soups & Comfort Food',
          items: [
            'food/bulalo',
            'food/sinigang-na-hipon',
            'food/batchoy',
            'food/sopas',
            'food/arroz-caldo',
            'food/lugaw',
          ],
        },
        {
          type: 'category',
          label: 'Traditional Stews & Braised',
          items: [
            'food/dinuguan-standard',
            'food/dinuguan-bicol-style',
            'food/menudo',
            'food/humba',
            'food/humba-visayan',
            'food/balbacua',
          ],
        },
        {
          type: 'category',
          label: 'Pork Dishes',
          items: [
            'food/lechon-kawali',
            'food/beef-pares',
          ],
        },
        {
          type: 'category',
          label: 'Regional Specialties',
          items: [
            'food/inasal',
            'food/bicol-express',
            'food/laing',
            'food/gising-gising',
          ],
        },
        {
          type: 'category',
          label: 'Breakfast & Silog',
          items: [
            'food/tapsilog',
            'food/tocilog',
            'food/longsilog',
            'food/cornsilog',
          ],
        },
        {
          type: 'category',
          label: 'Noodles & Pancit',
          items: [
            'food/pancit-canton',
            'food/pancit-bihon',
          ],
        },
        {
          type: 'category',
          label: 'Street Food & Snacks',
          items: [
            'food/balut',
            'food/kwek-kwek',
            'food/taho',
            'food/isaw',
            'food/betamax',
            'food/fish-ball',
            'food/kikiam',
            'food/banana-cue',
            'food/turon',
          ],
        },
        {
          type: 'category',
          label: 'Wrapped & Filled',
          items: [
            'food/lumpia',
            'food/empanada',
          ],
        },
        {
          type: 'category',
          label: 'Desserts & Sweets',
          items: [
            'food/halo-halo',
            'food/leche-flan',
            'food/bibingka',
            'food/biko',
            'food/puto',
            'food/suman',
          ],
        },
        {
          type: 'category',
          label: 'Beverages',
          items: [
            'food/calamansi-juice',
            'food/buko-juice',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🇻🇳 Vietnamese Cuisine',
      items: [
        {
          type: 'category',
          label: 'Soups & Broths',
          items: [
            'food/pho-bo',
            'food/pho-ga',
            'food/bun-bo-hue',
            'food/hu-tieu',
            'food/mi-quang',
            'food/bun-cha',
          ],
        },
        {
          type: 'category',
          label: 'Rice Dishes',
          items: [
            'food/com-tam',
          ],
        },
        {
          type: 'category',
          label: 'Spring Rolls & Wraps',
          items: [
            'food/goi-cuon',
            'food/cha-gio',
          ],
        },
        {
          type: 'category',
          label: 'Bánh Mì & Sandwiches',
          items: [
            'food/banh-mi',
          ],
        },
        {
          type: 'category',
          label: 'Beverages',
          items: [
            'food/ca-phe-sua-da',
          ],
        },
      ],
    },
  ],

  // Location-based navigation (organized by country and city)
  locationSidebar: [
    {
      type: 'category',
      label: '🇹🇭 Thailand',
      items: [
        {
          type: 'category',
          label: 'Bangkok',
          items: [
            'food/pad-thai',
            'food/tom-yum-goong',
            'food/som-tam',
            'food/pad-krapow',
            'food/khao-kha-moo',
            'food/gaeng-keow-wan',
            'food/gaeng-massaman',
            'food/gaeng-phed',
            'food/pad-see-ew',
            'food/tom-kha-gai',
            'food/boat-noodles',
            'food/khao-chae',
            'food/khao-pad',
            'food/khao-man-gai',
            'food/gai-yang',
            'food/satay',
            'food/pad-prik-king',
            'food/cashew-chicken',
            'food/khao-niao-mamuang',
            'food/khanom-krok',
            'food/khanom-bueang',
            'food/hoy-tod',
            'food/tod-mun-pla',
            'food/gai-tod',
            'food/birds-nest-soup',
            'food/ginger-tea-soy-curd',
          ],
        },
        {
          type: 'category',
          label: 'Chiang Mai',
          items: [
            'food/khao-soi',
            'food/sai-ua',
            'food/nam-jim-jeaw',
            'food/khanom-tokyo',
          ],
        },
        {
          type: 'category',
          label: 'Isaan Region',
          items: [
            'food/larb',
            'food/jim-jum',
            'food/moo-yang',
            'food/sai-krok-isan',
            'food/gai-ping',
          ],
        },
        {
          type: 'category',
          label: 'Southern Thailand',
          items: [
            'food/pla-pao',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🇵🇭 Philippines',
      items: [
        {
          type: 'category',
          label: 'Manila & National Capital Region',
          items: [
            'food/adobo',
            'food/sisig',
            'food/bulalo',
            'food/sinigang-na-hipon',
            'food/dinuguan-standard',
            'food/menudo',
            'food/lechon-kawali',
            'food/beef-pares',
            'food/tapsilog',
            'food/tocilog',
            'food/longsilog',
            'food/cornsilog',
            'food/pancit-canton',
            'food/pancit-bihon',
            'food/lumpia',
            'food/empanada',
            'food/halo-halo',
            'food/leche-flan',
            'food/balut',
            'food/kwek-kwek',
            'food/taho',
            'food/isaw',
            'food/betamax',
            'food/fish-ball',
            'food/kikiam',
            'food/banana-cue',
            'food/turon',
            'food/bibingka',
            'food/puto',
            'food/calamansi-juice',
            'food/buko-juice',
            'food/sopas',
            'food/arroz-caldo',
            'food/lugaw',
          ],
        },
        {
          type: 'category',
          label: 'Bicol Region',
          items: [
            'food/dinuguan-bicol-style',
            'food/bicol-express',
            'food/laing',
            'food/gising-gising',
          ],
        },
        {
          type: 'category',
          label: 'Visayas (Cebu, Iloilo, Bacolod)',
          items: [
            'food/lechon',
            'food/humba',
            'food/humba-visayan',
            'food/batchoy',
            'food/inasal',
          ],
        },
        {
          type: 'category',
          label: 'Mindanao',
          items: [
            'food/balbacua',
          ],
        },
        {
          type: 'category',
          label: 'Traditional Sweets (Various Regions)',
          items: [
            'food/biko',
            'food/suman',
          ],
        },
      ],
    },
    {
      type: 'category',
      label: '🇻🇳 Vietnam',
      items: [
        {
          type: 'category',
          label: 'Hanoi & Northern Vietnam',
          items: [
            'food/pho-bo',
            'food/pho-ga',
            'food/bun-cha',
            'food/ca-phe-sua-da',
          ],
        },
        {
          type: 'category',
          label: 'Hue & Central Vietnam',
          items: [
            'food/bun-bo-hue',
          ],
        },
        {
          type: 'category',
          label: 'Da Nang & Central Coast',
          items: [
            'food/mi-quang',
          ],
        },
        {
          type: 'category',
          label: 'Ho Chi Minh City & Southern Vietnam',
          items: [
            'food/hu-tieu',
            'food/com-tam',
            'food/goi-cuon',
            'food/cha-gio',
            'food/banh-mi',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
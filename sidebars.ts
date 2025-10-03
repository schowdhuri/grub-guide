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
            'cuisines-view/gaeng-keow-wan',
            'cuisines-view/gaeng-massaman',
            'cuisines-view/gaeng-phed',
          ],
        },
        {
          type: 'category',
          label: 'Noodles',
          items: [
            'cuisines-view/pad-thai',
            'cuisines-view/khao-soi',
            'cuisines-view/pad-see-ew',
          ],
        },
        {
          type: 'category',
          label: 'Salads',
          items: [
            'cuisines-view/som-tam',
            'cuisines-view/larb',
          ],
        },
        {
          type: 'category',
          label: 'Soups',
          items: [
            'cuisines-view/tom-yum-goong',
            'cuisines-view/tom-kha-gai',
            'cuisines-view/boat-noodles',
            'cuisines-view/jim-jum',
          ],
        },
        {
          type: 'category',
          label: 'Rice Dishes',
          items: [
            'cuisines-view/khao-kha-moo',
            'cuisines-view/khao-chae',
            'cuisines-view/khao-pad',
            'cuisines-view/khao-man-gai',
          ],
        },
        {
          type: 'category',
          label: 'Grilled & BBQ',
          items: [
            'cuisines-view/gai-yang',
            'cuisines-view/moo-yang',
            'cuisines-view/satay',
            'cuisines-view/pla-pao',
          ],
        },
        {
          type: 'category',
          label: 'Stir-Fried Dishes',
          items: [
            'cuisines-view/pad-krapow',
            'cuisines-view/pad-prik-king',
            'cuisines-view/cashew-chicken',
          ],
        },
        {
          type: 'category',
          label: 'Desserts',
          items: [
            'cuisines-view/khao-niao-mamuang',
            'cuisines-view/khanom-krok',
            'cuisines-view/khanom-tokyo',
            'cuisines-view/khanom-bueang',
          ],
        },
        {
          type: 'category',
          label: 'Street Food & Snacks',
          items: [
            'cuisines-view/hoy-tod',
            'cuisines-view/tod-mun-pla',
            'cuisines-view/gai-tod',
            'cuisines-view/sai-krok-isan',
            'cuisines-view/sai-ua',
            'cuisines-view/gai-ping',
            'cuisines-view/nam-jim-jeaw',
          ],
        },
        {
          type: 'category',
          label: 'Chinese-Thai Specialties',
          items: [
            'cuisines-view/birds-nest-soup',
            'cuisines-view/ginger-tea-soy-curd',
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
            'cuisines-view/adobo',
            'cuisines-view/lechon',
            'cuisines-view/sisig',
          ],
        },
        {
          type: 'category',
          label: 'Soups & Comfort Food',
          items: [
            'cuisines-view/bulalo',
            'cuisines-view/sinigang-na-hipon',
            'cuisines-view/batchoy',
            'cuisines-view/sopas',
            'cuisines-view/arroz-caldo',
            'cuisines-view/lugaw',
          ],
        },
        {
          type: 'category',
          label: 'Traditional Stews & Braised',
          items: [
            'cuisines-view/dinuguan-standard',
            'cuisines-view/dinuguan-bicol-style',
            'cuisines-view/menudo',
            'cuisines-view/humba',
            'cuisines-view/humba-visayan',
            'cuisines-view/balbacua',
          ],
        },
        {
          type: 'category',
          label: 'Pork Dishes',
          items: [
            'cuisines-view/lechon-kawali',
            'cuisines-view/beef-pares',
          ],
        },
        {
          type: 'category',
          label: 'Regional Specialties',
          items: [
            'cuisines-view/inasal',
            'cuisines-view/bicol-express',
            'cuisines-view/laing',
            'cuisines-view/gising-gising',
          ],
        },
        {
          type: 'category',
          label: 'Breakfast & Silog',
          items: [
            'cuisines-view/tapsilog',
            'cuisines-view/tocilog',
            'cuisines-view/longsilog',
            'cuisines-view/cornsilog',
          ],
        },
        {
          type: 'category',
          label: 'Noodles & Pancit',
          items: [
            'cuisines-view/pancit-canton',
            'cuisines-view/pancit-bihon',
          ],
        },
        {
          type: 'category',
          label: 'Street Food & Snacks',
          items: [
            'cuisines-view/balut',
            'cuisines-view/kwek-kwek',
            'cuisines-view/taho',
            'cuisines-view/isaw',
            'cuisines-view/betamax',
            'cuisines-view/fish-ball',
            'cuisines-view/kikiam',
            'cuisines-view/banana-cue',
            'cuisines-view/turon',
          ],
        },
        {
          type: 'category',
          label: 'Wrapped & Filled',
          items: [
            'cuisines-view/lumpia',
            'cuisines-view/empanada',
          ],
        },
        {
          type: 'category',
          label: 'Desserts & Sweets',
          items: [
            'cuisines-view/halo-halo',
            'cuisines-view/leche-flan',
            'cuisines-view/bibingka',
            'cuisines-view/biko',
            'cuisines-view/puto',
            'cuisines-view/suman',
          ],
        },
        {
          type: 'category',
          label: 'Beverages',
          items: [
            'cuisines-view/calamansi-juice',
            'cuisines-view/buko-juice',
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
            'cuisines-view/pho-bo',
            'cuisines-view/pho-ga',
            'cuisines-view/bun-bo-hue',
            'cuisines-view/hu-tieu',
            'cuisines-view/mi-quang',
            'cuisines-view/bun-cha',
          ],
        },
        {
          type: 'category',
          label: 'Rice Dishes',
          items: [
            'cuisines-view/com-tam',
          ],
        },
        {
          type: 'category',
          label: 'Spring Rolls & Wraps',
          items: [
            'cuisines-view/goi-cuon',
            'cuisines-view/cha-gio',
          ],
        },
        {
          type: 'category',
          label: 'Bánh Mì & Sandwiches',
          items: [
            'cuisines-view/banh-mi',
          ],
        },
        {
          type: 'category',
          label: 'Beverages',
          items: [
            'cuisines-view/ca-phe-sua-da',
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
            'locations-view/pad-thai',
            'locations-view/tom-yum-goong',
            'locations-view/som-tam',
            'locations-view/pad-krapow',
            'locations-view/khao-kha-moo',
            'locations-view/gaeng-keow-wan',
            'locations-view/gaeng-massaman',
            'locations-view/gaeng-phed',
            'locations-view/pad-see-ew',
            'locations-view/tom-kha-gai',
            'locations-view/boat-noodles',
            'locations-view/khao-chae',
            'locations-view/khao-pad',
            'locations-view/khao-man-gai',
            'locations-view/gai-yang',
            'locations-view/satay',
            'locations-view/pad-prik-king',
            'locations-view/cashew-chicken',
            'locations-view/khao-niao-mamuang',
            'locations-view/khanom-krok',
            'locations-view/khanom-bueang',
            'locations-view/hoy-tod',
            'locations-view/tod-mun-pla',
            'locations-view/gai-tod',
            'locations-view/birds-nest-soup',
            'locations-view/ginger-tea-soy-curd',
          ],
        },
        {
          type: 'category',
          label: 'Chiang Mai',
          items: [
            'locations-view/khao-soi',
            'locations-view/sai-ua',
            'locations-view/nam-jim-jeaw',
            'locations-view/khanom-tokyo',
          ],
        },
        {
          type: 'category',
          label: 'Isaan Region',
          items: [
            'locations-view/larb',
            'locations-view/jim-jum',
            'locations-view/moo-yang',
            'locations-view/sai-krok-isan',
            'locations-view/gai-ping',
          ],
        },
        {
          type: 'category',
          label: 'Southern Thailand',
          items: [
            'locations-view/pla-pao',
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
            'locations-view/adobo',
            'locations-view/sisig',
            'locations-view/bulalo',
            'locations-view/sinigang-na-hipon',
            'locations-view/dinuguan-standard',
            'locations-view/menudo',
            'locations-view/lechon-kawali',
            'locations-view/beef-pares',
            'locations-view/tapsilog',
            'locations-view/tocilog',
            'locations-view/longsilog',
            'locations-view/cornsilog',
            'locations-view/pancit-canton',
            'locations-view/pancit-bihon',
            'locations-view/lumpia',
            'locations-view/empanada',
            'locations-view/halo-halo',
            'locations-view/leche-flan',
            'locations-view/balut',
            'locations-view/kwek-kwek',
            'locations-view/taho',
            'locations-view/isaw',
            'locations-view/betamax',
            'locations-view/fish-ball',
            'locations-view/kikiam',
            'locations-view/banana-cue',
            'locations-view/turon',
            'locations-view/bibingka',
            'locations-view/puto',
            'locations-view/calamansi-juice',
            'locations-view/buko-juice',
            'locations-view/sopas',
            'locations-view/arroz-caldo',
            'locations-view/lugaw',
          ],
        },
        {
          type: 'category',
          label: 'Bicol Region',
          items: [
            'locations-view/dinuguan-bicol-style',
            'locations-view/bicol-express',
            'locations-view/laing',
            'locations-view/gising-gising',
          ],
        },
        {
          type: 'category',
          label: 'Visayas (Cebu, Iloilo, Bacolod)',
          items: [
            'locations-view/lechon',
            'locations-view/humba',
            'locations-view/humba-visayan',
            'locations-view/batchoy',
            'locations-view/inasal',
          ],
        },
        {
          type: 'category',
          label: 'Mindanao',
          items: [
            'locations-view/balbacua',
          ],
        },
        {
          type: 'category',
          label: 'Traditional Sweets (Various Regions)',
          items: [
            'locations-view/biko',
            'locations-view/suman',
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
            'locations-view/pho-bo',
            'locations-view/pho-ga',
            'locations-view/bun-cha',
            'locations-view/ca-phe-sua-da',
          ],
        },
        {
          type: 'category',
          label: 'Hue & Central Vietnam',
          items: [
            'locations-view/bun-bo-hue',
          ],
        },
        {
          type: 'category',
          label: 'Da Nang & Central Coast',
          items: [
            'locations-view/mi-quang',
          ],
        },
        {
          type: 'category',
          label: 'Ho Chi Minh City & Southern Vietnam',
          items: [
            'locations-view/hu-tieu',
            'locations-view/com-tam',
            'locations-view/goi-cuon',
            'locations-view/cha-gio',
            'locations-view/banh-mi',
          ],
        },
      ],
    },
  ],
};

export default sidebars;
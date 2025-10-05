/**
 * Creating a sidebar enables you to:
 * - create an ordered group of docs
 * - render a sidebar for each doc of that group
 * - provide next/previous navigation
 *
 * The sidebars can be generated from the filesystem, or explicitly defined here.
 *
 * Create as many sidebars as you want.
 */

import type { SidebarsConfig } from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  "mainSidebar": [
    {
      "type": "doc",
      "id": "cuisines",
      "label": "🍽️ Browse by Cuisine"
    },
    {
      "type": "doc",
      "id": "locations",
      "label": "📍 Browse by Location"
    }
  ],
  "cuisineSidebar": [
    {
      "type": "category",
      "label": "🇵🇭 Filipino Cuisine",
      "link": {
        "type": "doc",
        "id": "cuisines/filipino"
      },
      "items": [
        {
          "type": "category",
          "label": "National Dishes & Adobo",
          "items": [
            "cuisines-view/adobo",
            "cuisines-view/lechon",
            "cuisines-view/sisig"
          ]
        },
        {
          "type": "category",
          "label": "Soups & Comfort Food",
          "items": [
            "cuisines-view/arroz-caldo",
            "cuisines-view/batchoy",
            "cuisines-view/bulalo",
            "cuisines-view/lugaw",
            "cuisines-view/sinigang-na-hipon",
            "cuisines-view/sopas"
          ]
        },
        {
          "type": "category",
          "label": "Traditional Stews & Braised",
          "items": [
            "cuisines-view/balbacua",
            "cuisines-view/dinuguan-bicol-style",
            "cuisines-view/dinuguan-standard",
            "cuisines-view/humba",
            "cuisines-view/humba-visayan",
            "cuisines-view/menudo"
          ]
        },
        {
          "type": "category",
          "label": "Pork Dishes",
          "items": [
            "cuisines-view/beef-pares",
            "cuisines-view/lechon-kawali"
          ]
        },
        {
          "type": "category",
          "label": "Regional Specialties",
          "items": [
            "cuisines-view/bicol-express",
            "cuisines-view/gising-gising",
            "cuisines-view/inasal",
            "cuisines-view/laing"
          ]
        },
        {
          "type": "category",
          "label": "Breakfast & Silog",
          "items": [
            "cuisines-view/cornsilog",
            "cuisines-view/longsilog",
            "cuisines-view/tapsilog",
            "cuisines-view/tocilog"
          ]
        },
        {
          "type": "category",
          "label": "Noodles & Pancit",
          "items": [
            "cuisines-view/pancit-bihon",
            "cuisines-view/pancit-canton"
          ]
        },
        {
          "type": "category",
          "label": "Street Food & Snacks",
          "items": [
            "cuisines-view/balut",
            "cuisines-view/banana-cue",
            "cuisines-view/betamax",
            "cuisines-view/fish-ball",
            "cuisines-view/isaw",
            "cuisines-view/kikiam",
            "cuisines-view/kwek-kwek",
            "cuisines-view/taho",
            "cuisines-view/turon"
          ]
        },
        {
          "type": "category",
          "label": "Wrapped & Filled",
          "items": [
            "cuisines-view/empanada",
            "cuisines-view/lumpia"
          ]
        },
        {
          "type": "category",
          "label": "Desserts & Sweets",
          "items": [
            "cuisines-view/bibingka",
            "cuisines-view/biko",
            "cuisines-view/halo-halo",
            "cuisines-view/leche-flan",
            "cuisines-view/puto",
            "cuisines-view/suman"
          ]
        },
        {
          "type": "category",
          "label": "Beverages",
          "items": [
            "cuisines-view/buko-juice",
            "cuisines-view/calamansi-juice"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "🇹🇭 Thai Cuisine",
      "link": {
        "type": "doc",
        "id": "cuisines/thai"
      },
      "items": [
        {
          "type": "category",
          "label": "Curries",
          "items": [
            "cuisines-view/gaeng-keow-wan",
            "cuisines-view/gaeng-massaman",
            "cuisines-view/gaeng-phed"
          ]
        },
        {
          "type": "category",
          "label": "Noodles",
          "items": [
            "cuisines-view/khao-soi",
            "cuisines-view/pad-see-ew",
            "cuisines-view/pad-thai"
          ]
        },
        {
          "type": "category",
          "label": "Salads",
          "items": [
            "cuisines-view/larb",
            "cuisines-view/som-tam"
          ]
        },
        {
          "type": "category",
          "label": "Soups",
          "items": [
            "cuisines-view/boat-noodles",
            "cuisines-view/jim-jum",
            "cuisines-view/tom-kha-gai",
            "cuisines-view/tom-yum-goong"
          ]
        },
        {
          "type": "category",
          "label": "Rice Dishes",
          "items": [
            "cuisines-view/khao-chae",
            "cuisines-view/khao-kha-moo",
            "cuisines-view/khao-man-gai",
            "cuisines-view/khao-pad"
          ]
        },
        {
          "type": "category",
          "label": "Grilled & BBQ",
          "items": [
            "cuisines-view/gai-yang",
            "cuisines-view/moo-yang",
            "cuisines-view/pla-pao",
            "cuisines-view/satay"
          ]
        },
        {
          "type": "category",
          "label": "Stir-Fried Dishes",
          "items": [
            "cuisines-view/cashew-chicken",
            "cuisines-view/pad-krapow",
            "cuisines-view/pad-prik-king"
          ]
        },
        {
          "type": "category",
          "label": "Desserts",
          "items": [
            "cuisines-view/khanom-bueang",
            "cuisines-view/khanom-krok",
            "cuisines-view/khanom-tokyo",
            "cuisines-view/khao-niao-mamuang"
          ]
        },
        {
          "type": "category",
          "label": "Street Food & Snacks",
          "items": [
            "cuisines-view/gai-ping",
            "cuisines-view/gai-tod",
            "cuisines-view/hoy-tod",
            "cuisines-view/nam-jim-jeaw",
            "cuisines-view/sai-krok-isan",
            "cuisines-view/sai-ua",
            "cuisines-view/tod-mun-pla"
          ]
        },
        {
          "type": "category",
          "label": "Chinese-Thai Specialties",
          "items": [
            "cuisines-view/birds-nest-soup",
            "cuisines-view/ginger-tea-soy-curd"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "🇺🇿 Uzbek Cuisine",
      "link": {
        "type": "doc",
        "id": "cuisines/uzbek"
      },
      "items": [
        {
          "type": "category",
          "label": "Rice Dishes & Plov",
          "items": [
            "food/oshi-nahor",
            "food/plov",
            "food/samarkand-plov",
            "food/shah-plov",
            "food/tashkent-plov"
          ]
        },
        {
          "type": "category",
          "label": "Breads & Pastries",
          "items": [
            "food/katlama",
            "food/non",
            "food/patir-non",
            "food/samarkand-non",
            "food/somsa",
            "food/somsa-jigar",
            "food/somsa-qovoq"
          ]
        },
        {
          "type": "category",
          "label": "Noodles",
          "items": [
            "food/lagman",
            "food/lagman-shorva",
            "food/norin",
            "food/shivit-oshi"
          ]
        },
        {
          "type": "category",
          "label": "Dumplings",
          "items": [
            "food/chuchvara",
            "food/manti",
            "food/qovurma-manti",
            "food/tukhum-barak"
          ]
        },
        {
          "type": "category",
          "label": "Soups",
          "items": [
            "food/chuchvara-shorva",
            "food/moshkichiri",
            "food/nohat-shurak",
            "food/shurpa"
          ]
        },
        {
          "type": "category",
          "label": "Grilled & Kebabs",
          "items": [
            "food/dumba",
            "food/jigar-kabob",
            "food/lyulya-kabob",
            "food/shashlik",
            "food/tandir-kabob"
          ]
        },
        {
          "type": "category",
          "label": "Stews & Braised",
          "items": [
            "food/dimlama",
            "food/qovurma"
          ]
        },
        {
          "type": "category",
          "label": "Salads",
          "items": [
            "food/achichuk",
            "food/tashkent-salad"
          ]
        },
        {
          "type": "category",
          "label": "Specialty Dishes",
          "items": [
            "food/hasip",
            "food/jiz",
            "food/kazy",
            "food/noxat",
            "food/qazi",
            "food/qosh-tili"
          ]
        },
        {
          "type": "category",
          "label": "Desserts & Sweets",
          "items": [
            "food/chak-chak",
            "food/halva",
            "food/navat",
            "food/paklava",
            "food/qovun",
            "food/sumalak"
          ]
        },
        {
          "type": "category",
          "label": "Beverages",
          "items": [
            "food/ayran",
            "food/bodom-sharbat",
            "food/kok-choy",
            "food/qahva",
            "food/qora-choy"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "🇻🇳 Vietnamese Cuisine",
      "link": {
        "type": "doc",
        "id": "cuisines/vietnamese"
      },
      "items": [
        {
          "type": "category",
          "label": "Soups & Broths",
          "items": [
            "cuisines-view/bun-bo-hue",
            "cuisines-view/bun-cha",
            "cuisines-view/hu-tieu",
            "cuisines-view/mi-quang",
            "cuisines-view/pho-bo",
            "cuisines-view/pho-ga"
          ]
        },
        {
          "type": "category",
          "label": "Rice Dishes",
          "items": [
            "cuisines-view/com-tam"
          ]
        },
        {
          "type": "category",
          "label": "Spring Rolls & Wraps",
          "items": [
            "cuisines-view/cha-gio",
            "cuisines-view/goi-cuon"
          ]
        },
        {
          "type": "category",
          "label": "Bánh Mì & Sandwiches",
          "items": [
            "cuisines-view/banh-mi"
          ]
        },
        {
          "type": "category",
          "label": "Beverages",
          "items": [
            "cuisines-view/ca-phe-sua-da"
          ]
        }
      ]
    }
  ],
  "locationSidebar": [
    {
      "type": "category",
      "label": "🇵🇭 Philippines",
      "link": {
        "type": "doc",
        "id": "locations/countries/philippines"
      },
      "items": [
        {
          "type": "category",
          "label": "Bicol Region",
          "link": {
            "type": "doc",
            "id": "locations/cities/philippines-bicol"
          },
          "items": [
            "locations-view/bicol-express",
            "locations-view/dinuguan-bicol-style",
            "locations-view/gising-gising",
            "locations-view/laing"
          ]
        },
        {
          "type": "category",
          "label": "Manila & National Capital Region",
          "link": {
            "type": "doc",
            "id": "locations/cities/philippines-manila"
          },
          "items": [
            "locations-view/adobo",
            "locations-view/arroz-caldo",
            "locations-view/balut",
            "locations-view/banana-cue",
            "locations-view/beef-pares",
            "locations-view/betamax",
            "locations-view/bibingka",
            "locations-view/buko-juice",
            "locations-view/bulalo",
            "locations-view/calamansi-juice",
            "locations-view/cornsilog",
            "locations-view/dinuguan-standard",
            "locations-view/empanada",
            "locations-view/fish-ball",
            "locations-view/halo-halo",
            "locations-view/isaw",
            "locations-view/kikiam",
            "locations-view/kwek-kwek",
            "locations-view/leche-flan",
            "locations-view/lechon-kawali",
            "locations-view/longsilog",
            "locations-view/lugaw",
            "locations-view/lumpia",
            "locations-view/menudo",
            "locations-view/pancit-bihon",
            "locations-view/pancit-canton",
            "locations-view/puto",
            "locations-view/sinigang-na-hipon",
            "locations-view/sisig",
            "locations-view/sopas",
            "locations-view/taho",
            "locations-view/tapsilog",
            "locations-view/tocilog",
            "locations-view/turon"
          ]
        },
        {
          "type": "category",
          "label": "Mindanao",
          "link": {
            "type": "doc",
            "id": "locations/cities/philippines-mindanao"
          },
          "items": [
            "locations-view/balbacua"
          ]
        },
        {
          "type": "category",
          "label": "Traditional Sweets (Various Regions)",
          "items": [
            "locations-view/biko",
            "locations-view/suman"
          ]
        },
        {
          "type": "category",
          "label": "Visayas (Cebu, Iloilo, Bacolod)",
          "link": {
            "type": "doc",
            "id": "locations/cities/philippines-visayas"
          },
          "items": [
            "locations-view/batchoy",
            "locations-view/humba",
            "locations-view/humba-visayan",
            "locations-view/inasal",
            "locations-view/lechon"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "🇹🇭 Thailand",
      "link": {
        "type": "doc",
        "id": "locations/countries/thailand"
      },
      "items": [
        {
          "type": "category",
          "label": "Bangkok",
          "link": {
            "type": "doc",
            "id": "locations/cities/thailand-bangkok"
          },
          "items": [
            "locations-view/birds-nest-soup",
            "locations-view/boat-noodles",
            "locations-view/cashew-chicken",
            "locations-view/gaeng-keow-wan",
            "locations-view/gaeng-massaman",
            "locations-view/gaeng-phed",
            "locations-view/gai-tod",
            "locations-view/gai-yang",
            "locations-view/ginger-tea-soy-curd",
            "locations-view/hoy-tod",
            "locations-view/khanom-bueang",
            "locations-view/khanom-krok",
            "locations-view/khao-chae",
            "locations-view/khao-kha-moo",
            "locations-view/khao-man-gai",
            "locations-view/khao-niao-mamuang",
            "locations-view/khao-pad",
            "locations-view/pad-krapow",
            "locations-view/pad-prik-king",
            "locations-view/pad-see-ew",
            "locations-view/pad-thai",
            "locations-view/satay",
            "locations-view/som-tam",
            "locations-view/tod-mun-pla",
            "locations-view/tom-kha-gai",
            "locations-view/tom-yum-goong"
          ]
        },
        {
          "type": "category",
          "label": "Chiang Mai",
          "link": {
            "type": "doc",
            "id": "locations/cities/thailand-chiang-mai"
          },
          "items": [
            "locations-view/khanom-tokyo",
            "locations-view/khao-soi",
            "locations-view/nam-jim-jeaw",
            "locations-view/sai-ua"
          ]
        },
        {
          "type": "category",
          "label": "Isaan Region",
          "link": {
            "type": "doc",
            "id": "locations/cities/thailand-isaan"
          },
          "items": [
            "locations-view/gai-ping",
            "locations-view/jim-jum",
            "locations-view/larb",
            "locations-view/moo-yang",
            "locations-view/sai-krok-isan"
          ]
        },
        {
          "type": "category",
          "label": "Southern Thailand",
          "link": {
            "type": "doc",
            "id": "locations/cities/thailand-southern"
          },
          "items": [
            "locations-view/pla-pao"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "🇺🇿 Uzbekistan",
      "link": {
        "type": "doc",
        "id": "locations/countries/uzbekistan"
      },
      "items": [
        {
          "type": "category",
          "label": "Tashkent (Capital)",
          "link": {
            "type": "doc",
            "id": "locations/cities/uzbekistan-tashkent"
          },
          "items": [
            "food/ayran",
            "food/lagman",
            "food/manti",
            "food/non",
            "food/plov",
            "food/shashlik",
            "food/shurpa",
            "food/somsa",
            "food/tashkent-plov",
            "food/tashkent-salad"
          ]
        },
        {
          "type": "category",
          "label": "Samarkand (Silk Road City)",
          "link": {
            "type": "doc",
            "id": "locations/cities/uzbekistan-samarkand"
          },
          "items": [
            "food/navat",
            "food/paklava",
            "food/samarkand-non",
            "food/samarkand-plov"
          ]
        },
        {
          "type": "category",
          "label": "National Dishes (All Regions)",
          "items": [
            "food/achichuk",
            "food/chuchvara",
            "food/dimlama",
            "food/dumba",
            "food/halva",
            "food/hasip",
            "food/kok-choy",
            "food/lyulya-kabob",
            "food/norin",
            "food/qazi",
            "food/qora-choy",
            "food/qovurma",
            "food/sumalak"
          ]
        }
      ]
    },
    {
      "type": "category",
      "label": "🇻🇳 Vietnam",
      "link": {
        "type": "doc",
        "id": "locations/countries/vietnam"
      },
      "items": [
        {
          "type": "category",
          "label": "Hanoi & Northern Vietnam",
          "link": {
            "type": "doc",
            "id": "locations/cities/vietnam-hanoi"
          },
          "items": [
            "locations-view/bun-cha",
            "locations-view/ca-phe-sua-da",
            "locations-view/pho-bo",
            "locations-view/pho-ga"
          ]
        },
        {
          "type": "category",
          "label": "Central Vietnam (Huế & Da Nang)",
          "link": {
            "type": "doc",
            "id": "locations/cities/vietnam-hue"
          },
          "items": [
            "locations-view/bun-bo-hue",
            "locations-view/mi-quang"
          ]
        },
        {
          "type": "category",
          "label": "Ho Chi Minh City & Southern Vietnam",
          "link": {
            "type": "doc",
            "id": "locations/cities/vietnam-hcmc"
          },
          "items": [
            "locations-view/banh-mi",
            "locations-view/cha-gio",
            "locations-view/com-tam",
            "locations-view/goi-cuon",
            "locations-view/hu-tieu"
          ]
        }
      ]
    }
  ]
};
export default sidebars;

#!/bin/bash

# Batch update all Thai dish image URLs with working Wikimedia Commons URLs
echo "Batch updating all Thai dish image URLs..."

# Working image URLs from Wikimedia Commons
URL1="https://upload.wikimedia.org/wikipedia/commons/e/ed/Pad_Thai.JPG"
URL2="https://upload.wikimedia.org/wikipedia/commons/9/9c/Tom_Yum_Soup.JPG"
URL3="https://upload.wikimedia.org/wikipedia/commons/c/c6/Green_curry_ingredients.jpg"
URL4="https://upload.wikimedia.org/wikipedia/commons/0/0a/Som_tam_thai.JPG"
URL5="https://upload.wikimedia.org/wikipedia/commons/6/61/Mango_sticky_rice.jpg"
URL6="https://upload.wikimedia.org/wikipedia/commons/a/a8/Beef_Massaman_curry_with_brown_rice.jpg"
URL7="https://upload.wikimedia.org/wikipedia/commons/4/4f/Massaman_curry%2C_Bang_Kapi%2C_Bangkok.jpg"
URL8="https://upload.wikimedia.org/wikipedia/commons/3/3f/Masaman-curry.jpg"
URL9="https://upload.wikimedia.org/wikipedia/commons/7/72/Mixed_Veggies_Matsaman_Curry_rice_-_Tookta%27s_Thai_Food.jpg"
URL10="https://upload.wikimedia.org/wikipedia/commons/7/7b/Mango_sticky_rice_1_2017-04-10.jpg"

# Create sed script to replace common broken image domains
find docs/countries/thailand -name "*.mdx" -not -name "index.mdx" -exec sed -i '' \
  -e "s|https://www\.eatingthaifood\.com/wp-content/uploads/[^']*|$URL1|g" \
  -e "s|https://hot-thai-kitchen\.com/wp-content/uploads/[^']*|$URL2|g" \
  -e "s|https://www\.recipetineats\.com/wp-content/uploads/[^']*|$URL3|g" \
  -e "s|https://static\.thairath\.co\.th/media/[^']*|$URL4|g" \
  -e "s|https://img\.kapook\.com/[^']*|$URL5|g" \
  -e "s|https://thewoksoflife\.com/wp-content/uploads/[^']*|$URL6|g" \
  {} \;

echo "Batch update complete!"
echo "Updated all Thai dish files with working Wikimedia Commons image URLs."
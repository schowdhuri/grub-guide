const fs = require('fs');
const path = require('path');

// Extract frontmatter and content from MDX file
function parseMDXFile(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract frontmatter
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const frontmatterText = frontmatterMatch[1];
    const body = content.slice(frontmatterMatch[0].length);

    // Parse frontmatter
    const title = frontmatterText.match(/title:\s*(.+)/)?.[1]?.replace(/['"]/g, '') || '';
    const description = frontmatterText.match(/description:\s*(.+)/)?.[1]?.replace(/['"]/g, '') || '';
    const slugMatch = frontmatterText.match(/slug:\s*(.+)/)?.[1]?.replace(/['"]/g, '');
    const tagsMatch = frontmatterText.match(/tags:\s*\[(.*?)\]/s);
    const tags = tagsMatch && tagsMatch[1] ?
      tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, '')) : [];

    // Extract native name from title (Thai, Vietnamese, etc.)
    const nativeNameMatch = title.match(/\(([^\)]*[\u0E00-\u0E7F\u1EA0-\u1EF9][^\)]*)\)/);
    const nativeName = nativeNameMatch ? nativeNameMatch[1] : undefined;

    // Extract pronunciation
    const pronunciationMatch = body.match(/\*Pronunciation:\s*["']([^"']*?)["']\*/);
    const pronunciation = pronunciationMatch ? pronunciationMatch[1] : undefined;

    // Use slug from frontmatter or fallback to filename
    const filename = path.basename(filePath, '.mdx');
    const url = slugMatch || `/food/${filename}`;

    // Extract country from tags (first tag is usually the country)
    const country = tags[0] || 'unknown';

    // Clean content for search
    const cleanContent = body
      .replace(/^---[\s\S]*?---/, '') // Remove frontmatter
      .replace(/import\s+.*?from.*?;/g, '') // Remove imports
      .replace(/<[^>]*>/g, ' ') // Remove HTML/JSX tags
      .replace(/[#*`]/g, ' ') // Remove markdown formatting
      .replace(/\s+/g, ' ') // Normalize whitespace
      .toLowerCase()
      .trim();

    const result = {
      title: title.replace(/\s*\([^)]*\)/, ''), // Remove native name from title
      url,
      tags,
      description,
      content: cleanContent,
      country
    };

    if (nativeName) {
      result.nativeName = nativeName;
    }
    if (pronunciation) {
      result.pronunciation = pronunciation;
    }

    return result;
  } catch (error) {
    console.error(`Error parsing ${filePath}:`, error);
    return null;
  }
}

// Generate search index for all food items
function generateSearchIndex() {
  const foodDir = path.join(process.cwd(), 'docs', 'food');
  const files = fs.readdirSync(foodDir)
    .filter(file => file.endsWith('.mdx'))
    .sort();

  console.log(`Processing ${files.length} food files`);

  const searchItems = [];

  for (const file of files) {
    const filePath = path.join(foodDir, file);
    const item = parseMDXFile(filePath);
    if (item) {
      searchItems.push(item);
    }
  }

  // Generate TypeScript file
  const tsContent = `// This file is auto-generated. Do not edit manually.
export interface SearchItem {
  title: string;
  url: string;
  tags: string[];
  description: string;
  content: string;
  country: string;
  nativeName?: string;
  pronunciation?: string;
}

export const searchIndex: SearchItem[] = ${JSON.stringify(searchItems, null, 2)};
`;

  const outputPath = path.join(process.cwd(), 'src', 'data', 'searchIndex.ts');

  // Create directory if it doesn't exist
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(outputPath, tsContent);
  console.log(`Generated search index with ${searchItems.length} items at ${outputPath}`);

  // Log breakdown by country
  const countryBreakdown = searchItems.reduce((acc, item) => {
    acc[item.country] = (acc[item.country] || 0) + 1;
    return acc;
  }, {});
  console.log('Items by country:', countryBreakdown);
}

generateSearchIndex();
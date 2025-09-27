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
    const tagsMatch = frontmatterText.match(/tags:\s*\[(.*?)\]/s);
    const tags = tagsMatch && tagsMatch[1] ?
      tagsMatch[1].split(',').map(tag => tag.trim().replace(/['"]/g, '')) : [];

    // Extract Thai name from title
    const thaiNameMatch = title.match(/\(([^\)]*[\u0E00-\u0E7F][^\)]*)\)/);
    const thaiName = thaiNameMatch ? thaiNameMatch[1] : undefined;

    // Extract pronunciation
    const pronunciationMatch = body.match(/\*Pronunciation:\s*['""]([^'""]*)['""]\*/);
    const pronunciation = pronunciationMatch ? pronunciationMatch[1] : undefined;

    // Generate URL from filename
    const filename = path.basename(filePath, '.mdx');
    const url = filename === 'index' ? '/countries/thailand' : `/countries/thailand/${filename}`;

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
      title: title.replace(/\s*\([^)]*\)/, ''), // Remove Thai name from title
      url,
      tags,
      description,
      content: cleanContent
    };

    if (thaiName) {
      result.thaiName = thaiName;
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

// Generate search index
function generateSearchIndex() {
  const thaiDir = path.join(process.cwd(), 'docs', 'countries', 'thailand');
  const files = fs.readdirSync(thaiDir)
    .filter(file => file.endsWith('.mdx') && file !== 'index.mdx')
    .sort();

  const searchItems = [];

  for (const file of files) {
    const filePath = path.join(thaiDir, file);
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
  thaiName?: string;
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
}

generateSearchIndex();
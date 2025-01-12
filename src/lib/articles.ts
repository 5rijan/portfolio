import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';
import { cache } from 'react';

export interface ArticleMetadata {
  content: string;
  tags: string[];
  date: string;
  title: string;
}

const WRITINGS_DIR = path.join(process.cwd(), 'src/content/writings');

// Add cache for parsed articles
let cachedArticles: ArticleMetadata[] | null = null;
let lastCacheTime = 0;
const CACHE_DURATION = 60 * 60 * 1000; // 1 hour in milliseconds

function formatDate(dateStr: string): string {
  try {
    const [day, month, year] = dateStr.split('-');
    if (!day || !month || !year) {
      throw new Error('Invalid date format');
    }
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr;
  }
}

// Cache the CSV parsing results
const parseCSV = cache(async (csvContent: string) => {
  return parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });
});

// Add memory caching to getAllArticles
export const getAllArticles = cache(async (): Promise<ArticleMetadata[]> => {
  try {
    // Check if cache is still valid
    const now = Date.now();
    if (cachedArticles && (now - lastCacheTime) < CACHE_DURATION) {
      return cachedArticles;
    }

    const metaFilePath = path.join(WRITINGS_DIR, 'meta.csv');
    const csvContent = fs.readFileSync(metaFilePath, 'utf-8');
    
    const records = await parseCSV(csvContent);

    const articles = records.map((record: any) => ({
      ...record,
      date: formatDate(record.date),
      tags: record.tags ? record.tags.split(',').map((tag: string) => tag.trim()) : []
    }));

    // Update cache
    cachedArticles = articles;
    lastCacheTime = now;

    return articles;
  } catch (error) {
    console.error('Error reading or parsing articles:', error);
    // Return cached articles if available, otherwise empty array
    return cachedArticles || [];
  }
});

// Add content cache for individual articles
const contentCache = new Map<string, { content: string; timestamp: number }>();

export const getArticleBySlug = cache(async (slug: string): Promise<ArticleMetadata | null> => {
  try {
    const articles = await getAllArticles();
    const article = articles.find(a => 
      a.content.replace('.md', '') === slug || 
      a.content.replace('.md', '') === `${slug}.md`
    );
    
    if (!article) return null;

    const mdPath = path.join(WRITINGS_DIR, article.content);

    // Check content cache
    const now = Date.now();
    const cached = contentCache.get(mdPath);
    if (cached && (now - cached.timestamp) < CACHE_DURATION) {
      return {
        ...article,
        content: cached.content
      };
    }

    const content = fs.readFileSync(mdPath, 'utf-8');
    
    // Update content cache
    contentCache.set(mdPath, {
      content,
      timestamp: now
    });

    // Prune old cache entries
    if (contentCache.size > 100) { // Limit cache size
      const oldestKey = Array.from(contentCache.entries())
        .sort(([, a], [, b]) => a.timestamp - b.timestamp)[0][0];
      contentCache.delete(oldestKey);
    }

    return {
      ...article,
      content
    };
  } catch (error) {
    console.error('Error getting article by slug:', error);
    return null;
  }
});

// Add utility function to preload articles
export async function preloadArticles(): Promise<void> {
  try {
    await getAllArticles();
  } catch (error) {
    console.error('Error preloading articles:', error);
  }
}

// Add function to get article slugs for static generation
export async function getAllSlugs(): Promise<string[]> {
  const articles = await getAllArticles();
  return articles.map(article => article.content.replace('.md', ''));
}
// src/lib/articles.ts
import fs from 'fs';
import path from 'path';
import { parse } from 'csv-parse/sync';

export interface ArticleMetadata {
  content: string;
  tags: string[];
  date: string;
  title: string;
}

const WRITINGS_DIR = path.join(process.cwd(), 'src/content/writings');

function formatDate(dateStr: string): string {
  try {
    const [day, month, year] = dateStr.split('-');
    if (!day || !month || !year) {
      throw new Error('Invalid date format');
    }
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateStr; // Return original string if formatting fails
  }
}

export async function getAllArticles(): Promise<ArticleMetadata[]> {
  try {
    const metaFilePath = path.join(WRITINGS_DIR, 'meta.csv');
    const csvContent = fs.readFileSync(metaFilePath, 'utf-8');
    
    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
      trim: true
    });

    return records.map((record: any) => ({
      ...record,
      date: formatDate(record.date),
      tags: record.tags ? record.tags.split(',').map((tag: string) => tag.trim()) : []
    }));
  } catch (error) {
    console.error('Error reading or parsing articles:', error);
    return [];
  }
}

export async function getArticleBySlug(slug: string): Promise<ArticleMetadata | null> {
  try {
    const articles = await getAllArticles();
    const article = articles.find(a => 
      a.content.replace('.md', '') === slug || 
      a.content.replace('.md', '') === `${slug}.md`
    );
    
    if (!article) return null;

    const mdPath = path.join(WRITINGS_DIR, article.content);
    const content = fs.readFileSync(mdPath, 'utf-8');
    
    return {
      ...article,
      content
    };
  } catch (error) {
    console.error('Error getting article by slug:', error);
    return null;
  }
}
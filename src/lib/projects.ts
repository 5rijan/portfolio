// src/lib/projects.ts
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { parse } from 'csv-parse/sync';

export interface Project {
  title: string;
  description: string;
  image: string; // Contains comma-separated image paths
  projectUrl: string;
  githubUrl: string;
  tags: string[];
  date: string;
}

export async function getAllProjects(): Promise<Project[]> {
  try {
    // This should only be called from server components or API routes
    const csvPath = join(process.cwd(), 'src', 'content', 'project', 'meta.csv');
    const fileContents = await readFile(csvPath, 'utf8');
    
    const records = parse(fileContents, {
      columns: true,
      skip_empty_lines: true,
      delimiter: ',',
      quote: '"',
      relax_quotes: true,
      relax_column_count: true
    });

    return records.map((record: any) => {
      // Convert DD-MM-YYYY to YYYY-MM-DD
      const [day, month, year] = record.date.split('-');
      const isoDate = `${year}-${month}-${day}`;

      return {
        title: record.title?.trim(),
        description: record.description?.trim(),
        image: record.image?.trim(), // Keep as comma-separated string
        projectUrl: record.project_link?.trim(),
        githubUrl: record.github?.trim(),
        tags: record.tags?.split(',').map((tag: string) => tag.trim()) || [],
        date: isoDate
      };
    });
  } catch (error) {
    console.error('Error reading or parsing CSV:', error);
    return [];
  }
}
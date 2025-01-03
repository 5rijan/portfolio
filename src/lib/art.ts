import path from 'path';
import { promises as fs } from 'fs';
import { parse } from 'csv-parse/sync';

export interface Art {
  content: string;
  title: string;
  date: string;
}

export async function getAllArt(): Promise<Art[]> {
  const csvPath = path.join(process.cwd(), 'src', 'content', 'art', 'meta.csv');
  const fileContents = await fs.readFile(csvPath, 'utf8');
  
  const records = parse(fileContents, {
    columns: true,
    skip_empty_lines: true,
    delimiter: ',',
    quote: '"',
    relax_quotes: true,
    relax_column_count: true
  });

  return records.map((record: any) => {
    const [day, month, year] = record.date.split('-');
    const isoDate = `${year}-${month}-${day}`;

    return {
      content: `/${record.content?.trim()}`, // Add forward slash for public directory
      title: record.title?.trim(),
      date: isoDate
    };
  });
}
// src/app/writings/page.tsx
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getAllArticles } from '@/lib/articles';
import { Suspense } from 'react';

// Add proper typing for articles
interface Article {
  content: string;
  tags: string[];
  date: string;
  title: string;
}

interface GroupedArticles {
  [year: string]: Article[];
}

// Add metadata for static page generation
export const revalidate = 3600; // Revalidate every hour

// Create a separate loading component
function LoadingArticles() {
  return <div className="animate-pulse space-y-12">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="space-y-4">
        <div className="h-4 w-16 bg-gray-200 rounded"></div>
        <div className="space-y-3">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="h-6 bg-gray-200 rounded w-full"></div>
          ))}
        </div>
      </div>
    ))}
  </div>;
}

// Create a separate article list component
function ArticleList({ groupedArticles, years }: { groupedArticles: GroupedArticles, years: string[] }) {
  return (
    <div className="space-y-16">
      {years.map(year => (
        <div key={year} className="space-y-6">
          <h2 className="text-sm font-medium">{year}</h2>
          <div className="space-y-6">
            {groupedArticles[year].map((article, index) => (
              <Link 
                key={`${year}-${index}`}
                href={`/writings/${article.content.replace('.md', '')}`}
                className="group block"
                prefetch={true}
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm">{article.title}</h3>
                    <span className="text-xs">
                      {format(parseISO(article.date), 'MMM dd')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                    {article.tags.map((tag, tagIndex) => (
                      <span key={`${tag}-${tagIndex}`}>#{tag.trim()}</span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default async function WritingsPage() {
  const articles = await getAllArticles();
  
  const groupedArticles = articles.reduce((acc: GroupedArticles, article) => {
    const date = parseISO(article.date);
    const year = format(date, 'yyyy');
    
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(article);
    return acc;
  }, {});

  const years = Object.keys(groupedArticles).sort((a, b) => b.localeCompare(a));

  years.forEach(year => {
    groupedArticles[year].sort((a, b) => 
      parseISO(b.date).getTime() - parseISO(a.date).getTime()
    );
  });

  return (
    <div className="space-y-12">
      <Suspense fallback={<LoadingArticles />}>
        <ArticleList groupedArticles={groupedArticles} years={years} />
      </Suspense>
    </div>
  );
}
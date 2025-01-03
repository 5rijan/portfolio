// src/app/writings/page.tsx
import Link from 'next/link';
import { format, parseISO } from 'date-fns';
import { getAllArticles } from '@/lib/articles';

interface GroupedArticles {
  [year: string]: {
    content: string;
    tags: string[];
    date: string;
    title: string;
  }[];
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
      <div className="space-y-16">
        {years.map(year => (
          <div key={year} className="space-y-6">
            <h2 className="text-sm font-medium ">
              {year}
            </h2>

            <div className="space-y-6">
              {groupedArticles[year].map((article, index) => (
                <Link 
                  key={index}
                  href={`/writings/${article.content.replace('.md', '')}`}
                  className="group block"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm ">
                        {article.title}
                      </h3>
                      <span className="text-xs ">
                        {format(parseISO(article.date), 'MMM dd')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground/60">
                      {article.tags.map((tag, tagIndex) => (
                        <span key={tagIndex}>
                          #{tag.trim()}
                          {tagIndex < article.tags.length - 1}
                        </span>
                      ))}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
// src/app/writings/[...slug]/page.tsx
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns';
import { getArticleBySlug, getAllArticles, type ArticleMetadata } from '@/lib/articles';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-l font-medium mt-8 mb-4">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-l font-medium mt-6 mb-3">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-l font-medium mt-4 mb-2">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => {
    if (typeof children === 'object' && children && 'type' in children && 
        (children.type === 'img' || children.type === Image)) {
      return (
        <Image
          src={(children as any).props.src}
          alt={(children as any).props.alt || ''}
          width={700}
          height={350}
          className="rounded-lg mx-auto my-8"
        />
      );
    }
    return <p className="text-sm text-muted-foreground leading-relaxed mb-4">{children}</p>;
  },
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <a href={href} className="text-sm text-blue-500 hover:text-blue-700 underline decoration-from-font">{children}</a>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="text-sm list-disc ml-6 mb-6 space-y-2">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="text-sm list-decimal ml-6 mb-6 space-y-2">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="text-sm leading-relaxed">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="text-sm border-l-4 border-gray-200 pl-4 italic my-6 text-gray-700 dark:text-gray-300">{children}</blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="text-sm bg-gray-200 dark:bg-gray-800 rounded px-1.5 py-0.5 text-sm text-gray-900 dark:text-gray-100">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="text-sm bg-gray-200 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-6 text-sm text-gray-900 dark:text-gray-100">
      {children}
    </pre>
  ),  
};
interface ArticleProps {
  params: {
    slug: string[];
  };
}
export default async function ArticlePage({ params }: { params: { slug: string[] } }) {
  const { slug } = await params;

  if (!slug || !Array.isArray(slug) || slug.length === 0) {
    notFound();
  }

  try {
    const slugPath = slug.join('/');
    const article = await getArticleBySlug(slugPath);

    if (!article) {
      notFound();
    }

    return (
      <div className="max-w-2xl mx-auto space-y-8 pb-20">
        {/* Back Button */}
        <Link 
          href="/writings"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to writings
        </Link>

        {/* Article Content */}
        <Suspense fallback={<div>Loading article...</div>}>
          <article className="max-w-none">
            <MDXRemote
              source={article.content}
              components={components}
              options={{
                parseFrontmatter: true,
                mdxOptions: {
                  format: 'mdx'
                }
              }}
            />
          </article>
        </Suspense>
      </div>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}

import { notFound } from 'next/navigation';
import { getArticleBySlug, getAllArticles, type ArticleMetadata } from '@/lib/articles';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

const components = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <h1 className="text-l font-bold mt-8 mb-4 dark:text-gray-100">{children}</h1>
  ),
  h2: ({ children }: { children: React.ReactNode }) => (
    <h2 className="text-sm font-semibold mt-6 mb-3 dark:text-gray-200">{children}</h2>
  ),
  h3: ({ children }: { children: React.ReactNode }) => (
    <h3 className="text-sm font-semibold mt-4 mb-2 dark:text-gray-200">{children}</h3>
  ),
  p: ({ children }: { children: React.ReactNode }) => {
    if (
      typeof children === 'object' &&
      children &&
      'type' in children &&
      (children.type === 'img' || children.type === Image)
    ) {
      return <div className="text-sm my-4 dark:text-gray-300">{children}</div>;
    }
    return <p className="text-sm my-4 dark:text-gray-300">{children}</p>;
  },
  a: ({ href, children }: { href?: string; children: React.ReactNode }) => (
    <Link 
      href={href || '#'} 
      className="text-sm text-blue-600 hover:underline dark:text-blue-400"
    >
      {children}
    </Link>
  ),
  ul: ({ children }: { children: React.ReactNode }) => (
    <ul className="text-sm list-disc list-inside my-4 dark:text-gray-300">{children}</ul>
  ),
  ol: ({ children }: { children: React.ReactNode }) => (
    <ol className="text-sm list-decimal list-inside my-4 dark:text-gray-300">{children}</ol>
  ),
  li: ({ children }: { children: React.ReactNode }) => (
    <li className="my-1 dark:text-gray-300">{children}</li>
  ),
  blockquote: ({ children }: { children: React.ReactNode }) => (
    <blockquote className="text-sm border-l-4 border-gray-200 dark:border-gray-700 pl-4 my-4 italic bg-gray-50 dark:bg-gray-800 dark:text-gray-300 p-2 rounded">
      {children}
    </blockquote>
  ),
  code: ({ children }: { children: React.ReactNode }) => (
    <code className="text-sm bg-gray-100 dark:bg-gray-800 rounded px-1 dark:text-gray-300">
      {children}
    </code>
  ),
  pre: ({ children }: { children: React.ReactNode }) => (
    <pre className="text-sm bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-4 dark:text-gray-300">
      {children}
    </pre>
  ),
};

// Define the params type
type Params = {
  slug: string[];
};

// Define the search params type
type SearchParams = { [key: string]: string | string[] | undefined };

// Define the page props type
type Props = {
  params: Promise<Params>;
  searchParams?: Promise<SearchParams>;
};

export default async function ArticlePage({ params, searchParams }: Props) {
  // Await the params
  const resolvedParams = await params;
  const { slug } = resolvedParams;

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
      <article className="text-sm max-w-3xl mx-auto px-4 py-8">
        <Link
          href="/writings"
          className="inline-flex items-center text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 mb-8"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back to writings
        </Link>

        <Suspense fallback={<div className="dark:text-gray-300">Loading article...</div>}>
          <MDXRemote
            source={article.content}
            components={components}
          />
        </Suspense>
      </article>
    );
  } catch (error) {
    console.error('Error loading article:', error);
    notFound();
  }
}
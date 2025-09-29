'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getBlogPosts } from '@/lib/blog';
import { BookOpen, MessageSquare, Calendar, User } from 'lucide-react';
import { useTranslations } from 'next-intl';

export default function BlogPage() {
  const posts = getBlogPosts();
  const tBlog = useTranslations('blog');
  const tUi = useTranslations('ui');

  return (
    <>
      <section className="section bg-gradient-to-br from-brand-light to-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              {tBlog('title')}
            </h1>
            <p className="lead">{tUi('expertTips')}</p>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-title">{tUi('latestArticles')}</h2>
            <p className="lead max-w-2xl mx-auto">{tUi('freshInsights')}</p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {posts.map(post => (
              <Card key={post.id} className="group overflow-hidden bg-white">
                <div className="p-2">
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand/10 to-accent/5 rounded-lg flex items-center justify-center">
                    <div className="text-brand/30">
                      {post.category === 'Speaking Skills' && (
                        <MessageSquare className="h-16 w-16" />
                      )}
                      {post.category === 'Grammar' && (
                        <BookOpen className="h-16 w-16" />
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                    <span className="bg-brand-light text-brand px-3 py-1 rounded-full text-xs font-medium">
                      {post.category}
                    </span>
                    <span>{post.readingTime}</span>
                  </div>
                  <CardTitle className="group-hover:text-brand transition-colors duration-200 line-clamp-2">
                    <Link href={`/en/blog/${post.slug}`}>{post.title}</Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-start">
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>
                        {tUi('by')} {post.author}
                      </span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>
                        {new Date(post.publishedAt).toLocaleDateString(
                          'en-US',
                          {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full"
                      >
                        #{tag.toLowerCase()}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

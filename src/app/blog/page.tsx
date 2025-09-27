import type { Metadata } from 'next';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { getBlogPosts } from '@/lib/blog';
import { Trophy, BookOpen, MessageSquare, Calendar, User, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
  title: 'English Learning Blog | AM Teachings - Tips, Strategies & Resources',
  description: 'Expert advice on English learning, IELTS preparation, grammar tips, and language learning strategies from experienced teacher Aya Mohsen.',
  keywords: 'English learning blog, IELTS tips, grammar help, language learning strategies, English teacher blog',
};

export default function BlogPage() {
  const posts = getBlogPosts();

  return (
    <>
      {/* Hero Section */}
      <section className="section bg-gradient-to-br from-brand-light to-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              English Learning <span className="text-brand">Blog</span>
            </h1>
            <p className="lead">
              Expert tips, proven strategies, and practical advice to help you master English 
              and achieve your IELTS goals. Learn from my experience teaching 500+ students.
            </p>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-title">Popular Categories</h2>
            <p className="lead max-w-2xl mx-auto">
              Explore our most helpful content organized by topic.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            <Card className="group text-center cursor-pointer hover:shadow-xl transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-brand group-hover:scale-110 transition-transform duration-200 mb-3 flex justify-center">
                  <Trophy className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2">IELTS Preparation</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Proven strategies and tips for all four IELTS modules
                </p>
                <div className="text-brand text-sm font-medium">
                  View IELTS Posts →
                </div>
              </CardContent>
            </Card>
            <Card className="group text-center cursor-pointer hover:shadow-xl transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-brand group-hover:scale-110 transition-transform duration-200 mb-3 flex justify-center">
                  <MessageSquare className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Speaking Skills</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Build confidence and fluency in English conversation
                </p>
                <div className="text-brand text-sm font-medium">
                  View Speaking Posts →
                </div>
              </CardContent>
            </Card>
            <Card className="group text-center cursor-pointer hover:shadow-xl transition-shadow duration-200">
              <CardContent className="pt-6">
                <div className="text-brand group-hover:scale-110 transition-transform duration-200 mb-3 flex justify-center">
                  <BookOpen className="h-10 w-10" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Grammar Guide</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Master English grammar from basic to advanced levels
                </p>
                <div className="text-brand text-sm font-medium">
                  View Grammar Posts →
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Blog Posts */}
      <section className="section bg-gray-50">
        <div className="container">
          <div className="text-center space-y-4 mb-12">
            <h2 className="section-title">Latest Articles</h2>
            <p className="lead max-w-2xl mx-auto">
              Fresh insights and practical tips to accelerate your English learning journey.
            </p>
          </div>
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden bg-white">
                <div className="p-2">
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand/10 to-accent/5 rounded-lg flex items-center justify-center">
                    <div className="text-brand/30">
                      {post.category === 'IELTS Preparation' && <Trophy className="h-16 w-16" />}
                      {post.category === 'Speaking Skills' && <MessageSquare className="h-16 w-16" />}
                      {post.category === 'Grammar' && <BookOpen className="h-16 w-16" />}
                      {!['IELTS Preparation', 'Speaking Skills', 'Grammar'].includes(post.category) && <BookOpen className="h-16 w-16" />}
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
                    <Link href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 flex items-center space-x-1">
                      <User className="h-3 w-3" />
                      <span>By {post.author}</span>
                      <span>•</span>
                      <Calendar className="h-3 w-3" />
                      <span>{new Date(post.publishedAt).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}</span>
                    </div>
                    <Link 
                      href={`/blog/${post.slug}`}
                      className="text-brand font-medium text-sm hover:text-brand-dark transition-colors duration-200 flex items-center space-x-1"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-3 w-3" />
                    </Link>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {post.tags.slice(0, 3).map((tag) => (
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

      {/* Newsletter Signup */}
      <section className="section">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">
              Stay Updated with Learning Tips
            </h2>
            <p className="text-xl text-gray-600">
              Get weekly English learning tips, IELTS strategies, and exclusive content 
              delivered straight to your inbox.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:max-w-md sm:mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="form-input flex-1"
              />
              <button className="btn-primary whitespace-nowrap">
                Subscribe Free
              </button>
            </div>
            <p className="text-sm text-gray-500">
              ✓ Weekly tips ✓ No spam ✓ Unsubscribe anytime
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-brand text-white">
        <div className="container text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready for Personalized Learning?
            </h2>
            <p className="text-xl text-blue-100">
              While these articles provide valuable insights, nothing beats personalized feedback 
              and guidance tailored to your specific needs.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/booking">
                <button className="btn-secondary bg-white text-brand hover:bg-gray-50 w-full sm:w-auto">
                  Book a Lesson
                </button>
              </Link>
              <Link href="/contact">
                <button className="btn-secondary border-white text-white hover:bg-white/10 w-full sm:w-auto">
                  Ask Questions
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
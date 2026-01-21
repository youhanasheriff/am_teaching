import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";

interface BlogPostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata(
  props: BlogPostPageProps
): Promise<Metadata> {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post Not Found | AM Teachings",
    };
  }

  return {
    title: `${post.title} | AM Teachings Blog`,
    description: post.excerpt,
    keywords: post.tags.join(", "),
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author],
      tags: post.tags,
    },
  };
}

// Simple markdown-like content renderer
function renderContent(content: string) {
  // Basic markdown parsing - in a real app you'd use a proper markdown parser
  const html = content
    // Headers
    .replace(
      /^### (.*$)/gim,
      '<h3 class="text-xl font-semibold text-gray-900 mb-4 mt-8">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-2xl font-bold text-gray-900 mb-6 mt-10">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-3xl font-bold text-gray-900 mb-8 mt-12">$1</h1>'
    )

    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')

    // Lists
    .replace(/^\- (.*$)/gim, '<li class="mb-2">$1</li>')
    .replace(
      /(<li class="mb-2">.*<\/li>)/g,
      '<ul class="list-disc list-inside space-y-2 mb-4 ml-4">$1</ul>'
    )

    // Paragraphs
    .replace(
      /^(?!<[h|u|l])(.*$)/gim,
      '<p class="mb-4 text-gray-700 leading-relaxed">$1</p>'
    )

    // Clean up empty paragraphs
    .replace(/<p class="mb-4 text-gray-700 leading-relaxed"><\/p>/g, "");

  return html;
}

export default async function BlogPostPage(props: BlogPostPageProps) {
  const params = await props.params;
  const post = getBlogPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const otherPosts = getBlogPosts()
    .filter((p) => p.id !== post.id)
    .slice(0, 3);

  return (
    <>
      {/* Article Header */}
      <article className="section bg-gradient-to-br from-brand-light to-white">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center space-y-6">
              <div className="flex items-center justify-center space-x-4 text-sm text-gray-600">
                <span className="bg-brand-light text-brand px-3 py-1 rounded-full font-medium">
                  {post.category}
                </span>
                <span>•</span>
                <span>{post.readingTime}</span>
                <span>•</span>
                <span>
                  {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                {post.title}
              </h1>
              <p className="lead max-w-2xl mx-auto">{post.excerpt}</p>
              <div className="flex items-center justify-center space-x-3 pt-4">
                <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center text-white font-bold">
                  AM
                </div>
                <div className="text-left">
                  <div className="font-semibold text-gray-900">
                    {post.author}
                  </div>
                  <div className="text-sm text-gray-600">
                    English Teacher & Teaching Specialist
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="section">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderContent(post.content),
                }}
                className="text-gray-700 leading-relaxed"
              />
            </div>

            {/* Tags */}
            <div className="border-t border-gray-200 pt-8 mt-12">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Topics covered:
              </h3>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium hover:bg-brand hover:text-white transition-colors duration-200 cursor-pointer"
                  >
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Author CTA */}
            <div className="bg-brand-light rounded-2xl p-8 mt-12">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                  AM
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Written by {post.author}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    With over 2+ years of experience teaching English and IELTS,
                    I&apos;ve helped 100+ students achieve their language
                    learning goals. Ready to get personalized help with your
                    English journey?
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <Link href="/booking">
                      <Button>Book a Lesson</Button>
                    </Link>
                    <Link href="/contact">
                      <Button variant="outline">Ask a Question</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="section bg-gray-50">
          <div className="container">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
                Continue Learning
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {otherPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group bg-white">
                    <CardContent className="p-6">
                      <div className="mb-3">
                        <span className="bg-brand-light text-brand px-3 py-1 rounded-full text-xs font-medium">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-brand transition-colors duration-200">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="line-clamp-2"
                        >
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{relatedPost.readingTime}</span>
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="text-brand font-medium hover:text-brand-dark"
                        >
                          Read More →
                        </Link>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Back to Blog */}
      <section className="section">
        <div className="container text-center">
          <Link href="/blog">
            <Button variant="outline" size="lg">
              ← Back to All Articles
            </Button>
          </Link>
        </div>
      </section>
    </>
  );
}

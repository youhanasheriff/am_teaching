import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { Button } from "@/components/ui/Button";
import { Card, CardContent } from "@/components/ui/Card";
import { ArrowLeft, Clock, Calendar, Tag, ArrowRight } from "lucide-react";

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
      '<h3 class="text-2xl font-bold text-gray-900 mb-4 mt-10 tracking-tight">$1</h3>'
    )
    .replace(
      /^## (.*$)/gim,
      '<h2 class="text-3xl font-bold text-gray-900 mb-6 mt-12 tracking-tight">$1</h2>'
    )
    .replace(
      /^# (.*$)/gim,
      '<h1 class="text-4xl font-bold text-gray-900 mb-8 mt-14 tracking-tight">$1</h1>'
    )

    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-gray-900">$1</strong>')
    .replace(/\*(.*?)\*/g, '<em class="italic text-gray-800">$1</em>')

    // Lists
    .replace(/^\- (.*$)/gim, '<li class="mb-2 pl-2">$1</li>')
    .replace(
      /(<li class="mb-2 pl-2">.*<\/li>)/g,
      '<ul class="list-disc list-inside space-y-2 mb-6 ml-4 text-gray-700 marker:text-brand">$1</ul>'
    )

    // Paragraphs
    .replace(
      /^(?!<[h|u|l])(.*$)/gim,
      '<p class="mb-6 text-xl text-gray-600 leading-relaxed font-light">$1</p>'
    )

    // Clean up empty paragraphs
    .replace(/<p class="mb-6 text-xl text-gray-600 leading-relaxed font-light"><\/p>/g, "");

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
      <article className="relative pt-32 pb-16 lg:pt-40 lg:pb-24 overflow-hidden">
         <div className="absolute inset-0 bg-gray-50/50 -z-10"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[100px] opacity-70 pointer-events-none"></div>
         
        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto">
             <div className="mb-8">
               <Link href="/blog" className="inline-flex items-center text-sm font-medium text-gray-500 hover:text-brand transition-colors">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Blog
               </Link>
             </div>
             
            <div className="text-center space-y-8">
              <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
                <span className="bg-brand/10 text-brand px-3 py-1 rounded-full font-semibold uppercase tracking-wide text-xs border border-brand/10">
                  {post.category}
                </span>
                <span className="flex items-center">
                   <Clock className="w-4 h-4 mr-1.5 text-gray-400" />
                   {post.readingTime}
                </span>
                <span className="flex items-center">
                   <Calendar className="w-4 h-4 mr-1.5 text-gray-400" />
                   {new Date(post.publishedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl leading-tight">
                {post.title}
              </h1>
              
              <p className="lead max-w-3xl mx-auto text-xl text-gray-600 leading-relaxed font-light border-l-4 border-brand/30 pl-6 italic">
                 {post.excerpt}
              </p>
              
              <div className="flex items-center justify-center pt-6 pb-6 border-b border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-brand to-brand-secondary rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    AM
                  </div>
                  <div className="text-left">
                    <div className="font-bold text-gray-900 text-lg">
                      {post.author}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">
                      English Teacher & Teaching Specialist
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>

      {/* Article Content */}
      <section className="section pt-0">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="prose prose-lg prose-indigo max-w-none">
              <div
                dangerouslySetInnerHTML={{
                  __html: renderContent(post.content),
                }}
              />
            </div>

            {/* Tags */}
            <div className="border-t border-gray-100 pt-8 mt-12">
              <div className="flex items-center gap-2 mb-4 text-gray-900 font-bold">
                 <Tag className="w-5 h-5 text-brand" />
                 <span>Related Topics:</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-gray-50 text-gray-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-brand hover:text-white transition-all duration-200 cursor-pointer border border-gray-100 hover:border-brand"
                  >
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>

            {/* Author CTA */}
            <div className="bg-gradient-to-br from-brand to-brand-secondary rounded-3xl p-1 shadow-xl mt-16 overflow-hidden">
               <div className="bg-white rounded-[1.4rem] p-8 md:p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-24 h-24 bg-brand-light rounded-full flex items-center justify-center text-brand font-bold text-3xl flex-shrink-0 border-4 border-white shadow-lg">
                      AM
                    </div>
                    <div className="text-center md:text-left flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        Enjoyed this article?
                      </h3>
                      <p className="text-gray-600 mb-6 text-lg leading-relaxed">
                        Join my personalized lessons to master these concepts and improve your English fluency.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-3 justify-center md:justify-start">
                        <Link href="/booking">
                          <Button size="lg" className="w-full sm:w-auto shadow-lg shadow-brand/20">Book a Lesson</Button>
                        </Link>
                        <Link href="/contact">
                          <Button size="lg" variant="outline" className="w-full sm:w-auto">Ask a Question</Button>
                        </Link>
                      </div>
                    </div>
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {otherPosts.length > 0 && (
        <section className="section bg-gray-50 relative overflow-hidden">
           <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
           
          <div className="container relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-3xl font-bold text-gray-900">
                  Continue Learning
                </h2>
                <Link href="/blog" className="text-brand font-medium hover:text-brand-secondary flex items-center hidden sm:flex">
                   View All Articles <ArrowRight className="ml-1 w-4 h-4" />
                </Link>
              </div>
              
              <div className="grid gap-8 md:grid-cols-3">
                {otherPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group bg-white border-gray-100 hover:shadow-xl transition-all duration-300">
                    <CardContent className="p-6 flex flex-col h-full">
                      <div className="mb-4">
                        <span className="bg-brand/5 text-brand px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                          {relatedPost.category}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-brand transition-colors duration-200 leading-tight">
                        <Link
                          href={`/blog/${relatedPost.slug}`}
                          className="line-clamp-2"
                        >
                           <span className="absolute inset-0"></span>
                          {relatedPost.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 text-sm line-clamp-3 mb-6 flex-grow leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs font-medium text-gray-400 mt-auto pt-4 border-t border-gray-50">
                        <span className="flex items-center"><Clock className="w-3 h-3 mr-1" />{relatedPost.readingTime}</span>
                        <span className="text-brand group-hover:translate-x-1 transition-transform duration-200 flex items-center">
                          Read <ArrowRight className="ml-1 w-3 h-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
               <div className="mt-10 text-center sm:hidden">
                <Link href="/blog">
                   <Button variant="outline" className="w-full">View All Articles</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
}

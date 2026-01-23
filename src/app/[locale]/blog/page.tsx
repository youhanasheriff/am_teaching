"use client";

import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import { getBlogPosts } from "@/lib/blog";
import { BookOpen, MessageSquare, Calendar, Rss } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";

export default function BlogPage() {
  const posts = getBlogPosts();
  const tBlog = useTranslations("blog");
  const tUi = useTranslations("ui");

  return (
    <>
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-brand/5 rounded-full blur-[80px] animate-float opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[80px] animate-pulse-soft opacity-60 pointer-events-none" />

        <div className="container relative z-10 text-center">
          <div className="max-w-3xl mx-auto space-y-6 animate-fade-in-up">
            <div className="inline-flex items-center rounded-full bg-white/50 px-4 py-1.5 text-sm font-medium text-brand border border-brand/10 backdrop-blur-sm shadow-sm">
              <Rss className="mr-2 h-4 w-4" />
              <span>{tUi("freshInsights") || "Learning Hub"}</span>
            </div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
              {tBlog("title")}
            </h1>
            <p className="lead text-gray-600 max-w-2xl mx-auto text-xl">{tUi("expertTips")}</p>
          </div>
        </div>
      </section>

      <section className="section bg-gray-50/50">
        <div className="container">
          <div className="text-center space-y-4 mb-16">
            <h2 className="section-title gradient-text inline-block">{tUi("latestArticles")}</h2>
            <p className="lead max-w-2xl mx-auto">{tUi("freshInsights")}</p>
          </div>
          
          <div className="grid gap-8 lg:grid-cols-2 xl:grid-cols-3">
            {posts.map((post) => (
              <Card key={post.id} className="group overflow-hidden bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 h-full flex flex-col">
                <div className="p-4 pb-0">
                  <div className="aspect-[16/10] bg-gradient-to-br from-brand-light to-brand-secondary/20 rounded-2xl flex items-center justify-center relative overflow-hidden group-hover:scale-[1.02] transition-transform duration-500">
                     <div className="absolute inset-0 opacity-20 bg-[url('/grid-pattern.svg')]"></div>
                    <div className="text-brand/40 relative z-10 transform group-hover:scale-110 transition-transform duration-300">
                      {post.category === "Speaking Skills" ? (
                        <MessageSquare className="h-20 w-20" />
                      ) : (
                        <BookOpen className="h-20 w-20" />
                      )}
                    </div>
                  </div>
                </div>
                <CardHeader className="pb-2 pt-6">
                  <div className="flex items-center justify-between text-sm mb-3">
                    <span className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wide">
                      {post.category}
                    </span>
                    <span className="text-gray-400 font-medium text-xs flex items-center">
                       <Calendar className="h-3 w-3 mr-1" />
                       {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-brand transition-colors duration-200 line-clamp-2 leading-tight">
                    <Link href={`/en/blog/${post.slug}`}>
                        <span className="absolute inset-0 z-10"></span>
                        {post.title}
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0 flex flex-col flex-grow relative z-20">
                  <p className="text-gray-600 mb-6 line-clamp-3 leading-relaxed flex-grow">
                    {post.excerpt}
                  </p>
                  
                  <div className="pt-4 mt-auto border-t border-gray-100 flex items-center justify-between">
                     <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-brand-light flex items-center justify-center text-brand text-xs font-bold">AM</div>
                        <span className="text-sm font-medium text-gray-700">{post.author}</span>
                     </div>
                     <span className="text-xs font-medium text-gray-400">{post.readingTime}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 text-center">
             <Button variant="outline" size="lg" className="rounded-full px-8 text-gray-500 hover:text-brand border-gray-200">
                Load More Articles
             </Button>
          </div>
        </div>
      </section>
    </>
  );
}

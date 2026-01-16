import { blogPosts } from "@/lib/blog";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Metadata } from 'next';

interface BlogPostPageProps {
    params: {
        slug: string;
    };
}

export async function generateStaticParams() {
    return blogPosts.map((post) => ({
        slug: post.slug,
    }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const post = blogPosts.find((p) => p.slug === params.slug);
    if (!post) return { title: "Post Not Found" };

    return {
        title: `${post.title} | Foundation News`,
        description: post.excerpt,
    };
}

export default function BlogPostDetailPage({ params }: BlogPostPageProps) {
    const post = blogPosts.find((p) => p.slug === params.slug);

    if (!post) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-white pb-24">
            {/* Header / Hero Area */}
            <section className="relative h-[60vh] min-h-[500px] flex items-end pb-12 px-6 overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/90 via-primaryDark/40 to-transparent"></div>
                </div>

                <div className="relative z-10 max-w-4xl mx-auto w-full">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-white/70 hover:text-white mb-8 transition-colors group text-sm font-bold uppercase tracking-widest"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Back to News
                    </Link>

                    <div className="flex flex-wrap gap-4 mb-6">
                        <span className="bg-primary/20 backdrop-blur-md text-primaryLight text-[10px] font-bold px-4 py-1.5 rounded-full uppercase tracking-[0.2em] border border-primaryLight/20">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-2 text-white/60 text-xs font-medium border-l border-white/20 pl-4 ml-2">
                            <Calendar size={14} />
                            {post.date}
                        </div>
                    </div>

                    <h1 className="text-4xl lg:text-6xl font-bold text-white uppercase tracking-tighter leading-none mb-4">
                        {post.title}
                    </h1>
                    <p className="text-lg lg:text-xl text-white/70 font-light max-w-2xl italic leading-relaxed">
                        {post.excerpt}
                    </p>
                </div>
            </section>

            {/* Article Content */}
            <article className="max-w-3xl mx-auto px-6 pt-20">
                <div
                    className={cn(
                        "prose prose-lg max-w-none text-gray-600 leading-relaxed",
                        "first-letter:text-5xl first-letter:font-bold first-letter:text-primary first-letter:mr-3 first-letter:float-left",
                        // Custom styles for inner HTML
                        "[&_h2]:text-3xl [&_h2]:font-bold [&_h2]:text-primaryDark [&_h2]:mt-12 [&_h2]:mb-6 [&_h2]:uppercase [&_h2]:tracking-tight",
                        "[&_p]:mb-8 [&_p]:text-lg",
                        "[&_ul]:list-disc [&_ul]:pl-6 [&_ul]:mb-8 [&_ul_li]:mb-3",
                        "[&_strong]:text-primaryDark [&_strong]:font-bold"
                    )}
                    dangerouslySetInnerHTML={{ __html: post.content }}
                />

                {/* Action / Share Footer */}
                <div className="mt-20 pt-10 border-t border-gray-100 flex flex-wrap items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Share this story:</span>
                        <div className="flex gap-2">
                            {[1, 2, 3].map((i) => (
                                <button key={i} className="p-2.5 rounded-full bg-gray-50 text-gray-400 hover:bg-primary hover:text-white transition-all">
                                    <Share2 size={18} />
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        <Button href="/volunteer-donate" variant="primary" className="px-8 shadow-lg shadow-primary/20">
                            Support our work
                        </Button>
                    </div>
                </div>
            </article>

            {/* Suggested / Related Section (Optional placeholder) */}
            <section className="max-w-7xl mx-auto px-6 mt-32">
                <div className="bg-primary/5 rounded-[3rem] p-12 lg:p-20 text-center border border-primary/10">
                    <h2 className="text-3xl lg:text-5xl font-bold text-primaryDark uppercase tracking-tighter mb-6">Stay Informed</h2>
                    <p className="text-gray-500 max-w-xl mx-auto mb-10 text-lg">Subscribe to our newsletter to receive monthly stories of hope and progress directly from the field.</p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input type="email" placeholder="Email Address" className="flex-grow p-4 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-primary/20" />
                        <Button variant="primary" className="px-10">Subscribe</Button>
                    </div>
                </div>
            </section>
        </main>
    );
}

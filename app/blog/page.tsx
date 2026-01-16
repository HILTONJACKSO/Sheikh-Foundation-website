import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BentoGrid from "@/components/BentoGrid";
import Link from "next/link";
import { blogPosts } from "@/lib/blog";

export default function BlogPage() {
    return (
        <div className="pb-20">
            <Hero
                title="Foundation News"
                description="Read the latest stories and updates from our teams in the field."
                primaryBtnText="Subscribe"
                primaryBtnHref="#newsletter"
                image="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=1200"
            />
            <section className="px-6 max-w-7xl mx-auto pt-20">
                <SectionHeader
                    title="Foundation News"
                    subtitle="Latest Blog"
                    description="Insights, updates, and stories of change from the field."
                    center
                />

                <div className="mt-16">
                    <BentoGrid>
                        {blogPosts.map((post, idx) => (
                            <div key={idx} className="group bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-500">
                                <Link href={`/blog/${post.slug}`} className="block overflow-hidden h-64">
                                    <img
                                        src={post.image}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />
                                </Link>
                                <div className="p-8">
                                    <div className="flex items-center justify-between mb-4">
                                        <span className="bg-primary/10 text-primary text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">{post.category}</span>
                                        <span className="text-gray-400 text-xs font-medium">{post.date}</span>
                                    </div>
                                    <h3 className="text-xl font-bold text-primaryDark mb-3 group-hover:text-primary transition-colors">
                                        <Link href={`/blog/${post.slug}`}>{post.title}</Link>
                                    </h3>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3 italic font-light">{post.excerpt}</p>
                                    <Link href={`/blog/${post.slug}`} className="font-bold text-primary text-xs uppercase tracking-widest hover:text-primaryDark transition-colors flex items-center gap-2">
                                        Read full story
                                        <span className="group-hover:translate-x-1 transition-transform">→</span>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </BentoGrid>
                </div>
            </section>
        </div>
    );
}

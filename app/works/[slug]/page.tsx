import { projects } from "@/lib/projects";
import Hero from "@/components/Hero";
import Button from "@/components/Button";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Metadata } from 'next';

interface ProjectPageProps {
    params: {
        slug: string;
    };
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) return { title: "Project Not Found" };

    return {
        title: `${project.title} | Sheikh Kouyateh Foundation`,
        description: project.description,
    };
}

export default function ProjectDetailPage({ params }: ProjectPageProps) {
    const project = projects.find((p) => p.slug === params.slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="pb-20">
            <Hero
                title={project.title}
                description={project.description}
                image={project.image}
            />

            <article className="max-w-4xl mx-auto px-6 pt-20">
                {/* Back Link */}
                <Link
                    href="/works"
                    className="inline-flex items-center gap-2 text-primary hover:text-primaryDark font-bold mb-10 transition-colors group"
                >
                    <ArrowLeft size={20} className="transition-transform group-hover:-translate-x-1" />
                    Back to All Projects
                </Link>

                {/* Project Meta */}
                <div className="flex flex-wrap gap-6 mb-12 py-6 border-y border-gray-100">
                    <div className="flex items-center gap-2 text-gray-500">
                        <Tag size={18} className="text-primary" />
                        <span className="font-bold text-sm uppercase tracking-wider">{project.area}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-500">
                        <Calendar size={18} className="text-primary" />
                        <span className={cn(
                            "font-bold text-sm uppercase tracking-wider",
                            project.status === 'Upcoming Project' ? "text-primary" : "text-gray-400"
                        )}>
                            {project.status}
                        </span>
                    </div>
                </div>

                {/* Featured Image (Large) */}
                <div className="rounded-3xl overflow-hidden shadow-2xl mb-16 h-[500px]">
                    <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                </div>

                {/* Article Content */}
                <div className="text-gray-600 leading-relaxed text-lg space-y-8">
                    <div
                        className="[&>h2]:text-3xl [&>h2]:font-bold [&>h2]:text-primaryDark [&>h2]:uppercase [&>h2]:tracking-tight [&>h2]:mb-6 [&>h2]:mt-12
                                [&>p]:mb-6 [&>p]:leading-relaxed
                                [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:mb-8 [&>ul]:space-y-3
                                [&>li]:pl-2"
                        dangerouslySetInnerHTML={{ __html: project.content }}
                    />
                </div>

                {/* Support Section */}
                <div className="mt-24 relative overflow-hidden rounded-[2.5rem] bg-primaryDark p-12 lg:p-20 text-white shadow-2xl">
                    <div className="relative z-10 flex flex-col items-center text-center">
                        <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 border border-white/20">Take Action</span>
                        <h3 className="text-3xl lg:text-5xl font-bold mb-8 uppercase tracking-tighter leading-none max-w-2xl">Support This Vital Initiative</h3>
                        <p className="text-white/80 text-lg lg:text-xl mb-12 max-w-xl font-light">
                            Your partnership fuels our progress. Join us in bringing lasting change to communities in need through direct support of this project.
                        </p>
                        <div className="flex flex-wrap justify-center gap-6 w-full sm:w-auto">
                            <Button href="/volunteer-donate" variant="primary" className="bg-white text-primary hover:bg-gray-100 px-12 py-6 text-lg h-auto">Donate Now</Button>
                            <Button href="/contact" variant="secondary" className="border-white/30 text-white hover:bg-white/10 px-12 py-6 text-lg h-auto">Partner With Us</Button>
                        </div>
                    </div>

                    {/* Abstract Design Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
                    <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/20 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
                </div>
            </article>
        </div>
    );
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

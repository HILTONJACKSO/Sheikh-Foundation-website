import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BentoGrid from "@/components/BentoGrid";
import Button from "@/components/Button";
import { cn } from "@/lib/utils";
import { projects } from "@/lib/projects";
import Link from "next/link";

export default function WorksPage() {
    return (
        <div className="pb-20">
            <Hero
                title="Our Works & Projects"
                description="Transforming lives through sustainable development, education, and healthcare across Liberia."
                primaryBtnText="Donate to a Project"
                primaryBtnHref="/volunteer-donate"
                image="/history.jpg"
            />

            <section className="py-20 px-6 max-w-7xl mx-auto">
                <SectionHeader
                    title="Impact Initiatives"
                    subtitle="Our Projects"
                    center
                />

                <div className="mt-16">
                    <BentoGrid>
                        {projects.map((project, idx) => (
                            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col group hover:shadow-lg transition-all duration-300">
                                <Link href={`/works/${project.slug}`} className="h-56 bg-primary/5 relative overflow-hidden block">
                                    <img src={project.image} alt={project.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                    <div className="absolute top-4 right-4 bg-white/80 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-primary">
                                        {project.area}
                                    </div>
                                </Link>
                                <div className="p-8 flex-grow flex flex-col">
                                    <div className="flex justify-between items-start mb-4 gap-4">
                                        <h3 className="text-xl font-bold text-primaryDark group-hover:text-primary transition-colors">
                                            <Link href={`/works/${project.slug}`}>{project.title}</Link>
                                        </h3>
                                        <span className={cn(
                                            "text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded flex-shrink-0",
                                            project.status === 'Upcoming Project' ? "bg-primary/10 text-primary" : "bg-gray-100 text-gray-500"
                                        )}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <p className="text-gray-500 text-sm leading-relaxed mb-8 flex-grow line-clamp-3">
                                        {project.description}
                                    </p>
                                    <Button variant="secondary" href={`/works/${project.slug}`} className="w-full text-sm mt-auto">
                                        Learn More
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </BentoGrid>
                </div>
            </section>
        </div>
    );
}

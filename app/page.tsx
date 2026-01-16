"use client";

import React, { useState } from 'react';
import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BentoGrid from "@/components/BentoGrid";
import BentoCard from "@/components/BentoCard";
import Button from "@/components/Button";
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Play, X, Heart, ShieldCheck, TrendingUp, Users, Quote } from 'lucide-react';
import ScrollReveal, { StaggerItem } from "@/components/ScrollReveal";

export default function Home() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);

    return (
        <>
            <Hero
                title="Empowering Communities Inspiring Change."
                description="Building youth and women capacity through education, healthcare, justice, and sustainable development."
                primaryBtnText="Donate Now"
                primaryBtnHref="/volunteer-donate"
                secondaryBtnText="Volunteer"
                secondaryBtnHref="/volunteer-donate"
                image="/hero_premium.png"
                isMainHero
            />

            {/* Featured Works Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <ScrollReveal>
                    <SectionHeader
                        title="Our Key Initiatives"
                        subtitle="Featured Works"
                        center
                    />
                </ScrollReveal>

                <ScrollReveal stagger className="mt-16 grid md:grid-cols-3 gap-10">
                    {[
                        {
                            title: "Furniture Donation",
                            slug: "project-literacy",
                            desc: "Providing armchairs to local schools to restore dignity and improve concentration for students in need.",
                            img: "/school_donation.jpg"
                        },
                        {
                            title: "$500k JFK Donation",
                            slug: "maternal-health-drive",
                            desc: "Donating over $500,000 in medical supplies to JFK Hospital to strengthen Liberia's healthcare.",
                            img: "/medical_donation.jpg"
                        },
                        {
                            title: "Women's Justice Program",
                            slug: "womens-justice-program",
                            desc: "Advocating for legal rights and property ownership for vulnerable women in Liberia.",
                            img: "/project_3.png"
                        }
                    ].map((work, i) => (
                        <StaggerItem key={i} className="group flex flex-col h-full">
                            <Link href={`/works/${work.slug}`} className="relative h-[300px] rounded-3xl overflow-hidden mb-6 shadow-lg flex-shrink-0 block">
                                <img src={work.img} alt={work.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/80 to-transparent flex items-end p-8">
                                    <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">{work.title}</h3>
                                </div>
                            </Link>
                            <div className="flex flex-col flex-grow">
                                <h4 className="text-xl font-bold text-primaryDark mb-3 uppercase tracking-tight">
                                    <Link href={`/works/${work.slug}`} className="hover:text-primary transition-colors">{work.title}</Link>
                                </h4>
                                <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{work.desc}</p>
                                <Button variant="secondary" href={`/works/${work.slug}`} className="w-full mt-auto">Learn More</Button>
                            </div>
                        </StaggerItem>
                    ))}
                </ScrollReveal>
            </section>

            {/* Video Impact Section */}
            <section className="py-24 bg-primaryDark relative overflow-hidden">
                <div className="absolute inset-0 opacity-10 pointer-events-none">
                    <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=2000" className="w-full h-full object-cover grayscale" />
                </div>

                <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
                    <ScrollReveal>
                        <SectionHeader
                            title="See Our Impact in Action"
                            subtitle="Stories from the Field"
                            description="Watch how your support is transforming lives across Liberia and beyond."
                            center
                            className="[&_span]:text-primaryLight [&_h2]:text-white [&_p]:text-white/90"
                        />
                    </ScrollReveal>

                    <ScrollReveal delay={0.2} direction="up" distance={80} className="mt-16">
                        <div className="group relative max-w-5xl mx-auto aspect-video rounded-[2.5rem] overflow-hidden shadow-2xl border-[12px] border-white/5 cursor-pointer" onClick={() => setIsVideoOpen(true)}>
                            <img
                                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=2000"
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-primaryDark/40 flex items-center justify-center group-hover:bg-primaryDark/20 transition-all">
                                <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl animate-pulse group-hover:scale-110 transition-transform">
                                    <Play size={40} fill="currentColor" />
                                </div>
                            </div>
                        </div>
                    </ScrollReveal>
                </div>
            </section>

            {/* Video Modal */}
            {isVideoOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-10">
                    <div className="absolute inset-0 bg-black/95 backdrop-blur-sm animate-in fade-in duration-300" onClick={() => setIsVideoOpen(false)}></div>
                    <div className="relative w-full max-w-6xl aspect-video bg-black rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
                        <button
                            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all z-20"
                            onClick={() => setIsVideoOpen(false)}
                        >
                            <X size={24} />
                        </button>
                        <iframe
                            src="https://www.youtube.com/embed/9No-FiE9GTM?autoplay=1"
                            className="w-full h-full border-none"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            )}

            {/* About Preview */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <ScrollReveal direction="right">
                        <SectionHeader
                            title="About Our Foundation"
                            subtitle="Commitment to Change"
                            description="The Sheikh Kouyateh Foundation is dedicated to empowering the most vulnerable members of society in Liberia and throughout Africa."
                        />
                        <p className="mt-6 text-gray-600 leading-relaxed">
                            We believe that sustainable development starts with education and healthcare. Our mission is to provide the tools and resources necessary for youth and women to build a better future for themselves and their communities.
                        </p>
                        <div className="mt-8">
                            <Button variant="secondary" href="/about">Learn More About Us</Button>
                        </div>
                    </ScrollReveal>
                    <ScrollReveal direction="left" delay={0.2} className="relative h-[500px] rounded-2xl overflow-hidden shadow-xl border-8 border-gray-50">
                        <img
                            src="/about_preview.jpg"
                            alt="About Sheikh Kouyateh Foundation"
                            className="w-full h-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-primaryDark/20 to-transparent"></div>
                    </ScrollReveal>
                </div>
            </section>


            {/* Core Focus Areas */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <SectionHeader
                            title="Core Focus Areas"
                            subtitle="How We Help"
                            center
                        />
                    </ScrollReveal>
                    <div className="mt-12">
                        <ScrollReveal stagger>
                            <BentoGrid>
                                <StaggerItem>
                                    <BentoCard
                                        title="Education"
                                        description="Providing scholarships, school supplies, and vocational training to empower the next generation."
                                    />
                                </StaggerItem>
                                <StaggerItem>
                                    <BentoCard
                                        title="Healthcare"
                                        description="Improving access to medical services, maternal health, and clean water initiatives."
                                    />
                                </StaggerItem>
                                <StaggerItem>
                                    <BentoCard
                                        title="Justice & Human Rights"
                                        description="Advocating for the rights of women and children and supporting legal reform."
                                    />
                                </StaggerItem>
                                <StaggerItem>
                                    <BentoCard
                                        title="Sustainable Development"
                                        description="Supporting local businesses and agriculture to create lasting economic impact."
                                    />
                                </StaggerItem>
                            </BentoGrid>
                        </ScrollReveal>
                    </div>
                </div>
            </section>

            {/* Why Support Section */}
            <section className="py-20 px-6 max-w-7xl mx-auto">
                <ScrollReveal>
                    <SectionHeader
                        title="Why Support Our Mission"
                        subtitle="Our Commitment"
                        center
                    />
                </ScrollReveal>
                <div className="mt-12">
                    <ScrollReveal stagger>
                        <BentoGrid>
                            <StaggerItem>
                                <BentoCard
                                    title="Direct Impact"
                                    description="Your support goes directly to reaching the most vulnerable, ensuring every dollar creates a tangible difference in someone's life."
                                    icon={<Heart className="text-primary" size={32} />}
                                />
                            </StaggerItem>
                            <StaggerItem>
                                <BentoCard
                                    title="Total Transparency"
                                    description="We operate with high accountability and integrity, providing clear updates on how your contributions are being utilized on the ground."
                                    icon={<ShieldCheck className="text-primary" size={32} />}
                                />
                            </StaggerItem>
                            <StaggerItem>
                                <BentoCard
                                    title="Sustainable Growth"
                                    description="We focus on long-term solutions that empower communities to become self-sufficient, creating a lasting legacy of change."
                                    icon={<TrendingUp className="text-primary" size={32} />}
                                />
                            </StaggerItem>
                            <StaggerItem>
                                <BentoCard
                                    title="Local Leadership"
                                    description="Our programs are driven by local staff and volunteers who understand the unique needs of their own communities."
                                    icon={<Users className="text-primary" size={32} />}
                                />
                            </StaggerItem>
                        </BentoGrid>
                    </ScrollReveal>
                </div>
            </section>

            {/* Team Members Section */}
            <section className="py-20 px-6 bg-gray-50">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <SectionHeader
                            title="Meet Our Leadership Team"
                            subtitle="The People Behind the Mission"
                            center
                        />
                    </ScrollReveal>
                    <ScrollReveal stagger className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                        {[
                            { name: "Mr Chea Brown Galery Sr", role: "Director", image: "/team_1.jpg" },
                            { name: "Mr Caisey K Chie", role: "HR Manager", image: "/team_2.jpg" },
                            { name: "Mr Stephen Nyan Gono", role: "Head of Legal Affairs", image: "/team_3.jpg" },
                            { name: "Ms Maybel Konneh", role: "Outreach Manager", image: "/team_4.jpg" },
                            { name: "Mr Friday G Daniel", role: "Head of IT Department", image: "/team_5.jpg" }
                        ].map((member, idx) => (
                            <StaggerItem key={idx} className="group text-center">
                                <div className="relative mb-6 mx-auto w-48 h-48 rounded-2xl overflow-hidden shadow-md border-4 border-white transition-transform duration-300 group-hover:-translate-y-2">
                                    <div className="absolute inset-0 bg-primary/10 flex items-center justify-center grayscale group-hover:grayscale-0 transition-all">
                                        <img
                                            src={member.image}
                                            alt={member.name}
                                            className={cn(
                                                "w-full h-full transition-opacity",
                                                member.image.includes('logo') ? "object-contain p-8 opacity-50 group-hover:opacity-100" : "object-cover opacity-90 group-hover:opacity-100"
                                            )}
                                        />
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-primaryDark uppercase tracking-tight">{member.name}</h3>
                                <p className="text-primary text-sm font-medium mt-1 uppercase opacity-80">{member.role}</p>
                            </StaggerItem>
                        ))}
                    </ScrollReveal>
                </div>
            </section>

            {/* Testimonials Section */}
            <section className="py-24 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <ScrollReveal>
                        <SectionHeader
                            title="Voice of the Community"
                            subtitle="Testimonials"
                            center
                        />
                    </ScrollReveal>

                    <ScrollReveal stagger className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {[
                            {
                                text: "The medical supplies donated by the foundation saved my daughter's life. We are eternally grateful for their presence in our community.",
                                author: "Mariama D.",
                                role: "Parent & Community Member"
                            },
                            {
                                text: "As a local teacher, seeing my students finally sit in proper armchairs instead of on the floor has transformed my classroom environment and their focus.",
                                author: "Samuel J.",
                                role: "Educator"
                            },
                            {
                                text: "The foundation's commitment to transparency is refreshing. I know exactly where my donation is going and the real impact it's making on the ground.",
                                author: "David W.",
                                role: "International Donor"
                            },
                            {
                                text: "Empowering women with legal rights doesn't just help individuals; it strengthens our entire social fabric. Sheikh Kouyateh is a true visionary.",
                                author: "Fatima K.",
                                role: "Community Leader"
                            }
                        ].map((testimonial, i) => (
                            <StaggerItem key={i} className="bg-primaryDark p-10 rounded-[2.5rem] shadow-2xl hover:shadow-primary/20 transition-all duration-500 relative group border border-white/5">
                                <div className="absolute top-8 right-10 text-white/10 group-hover:text-white/20 transition-colors">
                                    <Quote size={60} fill="currentColor" />
                                </div>
                                <div className="relative z-10">
                                    <p className="text-white/90 text-lg leading-relaxed italic mb-8 font-light">"{testimonial.text}"</p>
                                    <div>
                                        <h4 className="text-xl font-bold text-white uppercase tracking-tighter">{testimonial.author}</h4>
                                        <p className="text-primaryLight text-sm font-medium uppercase tracking-widest opacity-90 mt-1">{testimonial.role}</p>
                                    </div>
                                </div>
                            </StaggerItem>
                        ))}
                    </ScrollReveal>
                </div>
            </section>

            {/* CTA Section */}
            <section className="bg-primary py-20 px-6 text-white text-center overflow-hidden">
                <ScrollReveal distance={100}>
                    <div className="max-w-3xl mx-auto">
                        <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tighter">Join Our Mission to Create Lasting Impact</h2>
                        <p className="mt-6 text-lg opacity-90 font-light italic leading-relaxed">Your support can change lives. Whether you choose to donate your time or resources, you are making a difference today.</p>
                        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                            <Button variant="primary" className="bg-white text-primary hover:bg-gray-100 px-8 py-4 text-base font-bold shadow-xl shadow-black/10">Donate Now</Button>
                            <Button variant="secondary" className="border-white text-white hover:bg-white/10 px-8 py-4 text-base font-bold">Become a Volunteer</Button>
                        </div>
                    </div>
                </ScrollReveal>
            </section>
        </>
    );
}

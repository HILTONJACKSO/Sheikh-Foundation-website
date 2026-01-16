import Hero from "@/components/Hero";
import SectionHeader from "@/components/SectionHeader";
import BentoGrid from "@/components/BentoGrid";
import BentoCard from "@/components/BentoCard";

export default function AboutPage() {
    return (
        <div className="pb-20">
            <Hero
                title="Our Story and Mission"
                description="Dedicated to transparency and impact across Liberia and Africa."
                primaryBtnText="Our Projects"
                primaryBtnHref="/works"
                image="/about_hero.png"
            />

            {/* Intro */}
            <section className="px-6 mb-20 max-w-7xl mx-auto pt-20">
                <SectionHeader
                    title="About the Foundation"
                    subtitle="Our Story"
                    description="The Sheikh Kouyateh Foundation was established to address the critical needs of communities in Liberia and beyond."
                />
                <div className="mt-12 grid md:grid-cols-2 gap-12">
                    <div className="space-y-6 text-gray-600 leading-relaxed">
                        <p>
                            Founded on the principles of compassion and justice, we work tirelessly to bridge the gap in education, healthcare, and social equity. Our approach is community-led, ensuring that our interventions are relevant and sustainable.
                        </p>
                        <p>
                            From humble beginnings, we have grown into a multi-national organization, impacting thousands of lives through our diverse programs and advocacy work.
                        </p>
                    </div>
                    <div className="rounded-2xl overflow-hidden shadow-lg h-[400px]">
                        <img src="/history.jpg" alt="Foundation History" className="w-full h-full object-cover" />
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="bg-gray-50 py-20 px-6">
                <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                        <p className="text-gray-600 leading-relaxed">
                            To empower youth and women through inclusive education, quality healthcare, and social justice initiatives that foster self-reliance and community growth.
                        </p>
                    </div>
                    <div className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                        <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                        <p className="text-gray-600 leading-relaxed">
                            A vibrant Africa where every individual has access to the resources and opportunities needed to thrive in a just and sustainable society.
                        </p>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-20 px-6 max-w-7xl mx-auto text-center">
                <SectionHeader
                    title="Our Core Values"
                    subtitle="What We Stand For"
                    center
                />
                <div className="mt-12">
                    <BentoGrid>
                        <BentoCard title="Integrity" description="Transparency and accountability in all our actions and partnerships." />
                        <BentoCard title="Compassion" description="A deep commitment to understanding and meeting human needs." />
                        <BentoCard title="Empowerment" description="Equipping individuals with the tools to change their own lives." />
                        <BentoCard title="Equity" description="Ensuring fair access to opportunities for all members of society." />
                    </BentoGrid>
                </div>
            </section>

            {/* Founder Section */}
            <section className="pb-20 px-6 max-w-7xl mx-auto">
                <div className="bg-primary rounded-3xl overflow-hidden flex flex-col lg:flex-row items-center">
                    <div className="w-full lg:w-1/2 p-12 lg:p-20 text-white">
                        <h3 className="text-3xl font-bold mb-6">A Letter from the Founder</h3>
                        <p className="text-lg opacity-90 leading-relaxed italic">
                            "Our work is far from over. Every child deserves a classroom, and every mother deserves safe medical care. Together, we can build the Africa we envision."
                        </p>
                        <div className="mt-8">
                            <p className="font-bold text-xl">Sheikh Kouyateh</p>
                            <p className="opacity-70">President & Founder</p>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/2 h-[500px] lg:h-full relative overflow-hidden">
                        <img src="/founder.jpg" alt="Sheikh Kouyateh" className="w-full h-full object-cover object-center scale-105" />
                    </div>
                </div>
            </section>
        </div>
    );
}

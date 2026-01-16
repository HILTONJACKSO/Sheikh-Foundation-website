import Button from "./Button";
import { cn } from "@/lib/utils";

interface HeroProps {
    title: string;
    description: string;
    primaryBtnText?: string;
    primaryBtnHref?: string;
    secondaryBtnText?: string;
    secondaryBtnHref?: string;
    image?: string;
    isMainHero?: boolean;
}

export default function Hero({
    title,
    description,
    primaryBtnText,
    primaryBtnHref,
    secondaryBtnText,
    secondaryBtnHref,
    image = "/hero.jpg",
    isMainHero = false
}: HeroProps) {
    if (!isMainHero) {
        return (
            <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center text-center px-6 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <img src={image} alt={title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-primaryDark/80 backdrop-blur-sm"></div>
                </div>

                {/* Content */}
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h1 className="text-4xl lg:text-6xl font-bold text-white mb-6 uppercase tracking-tight animate-in fade-in slide-in-from-bottom-5 duration-700">{title}</h1>
                    <p className="text-lg lg:text-xl text-white/80 mb-10 leading-relaxed font-light animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-200">{description}</p>
                    {primaryBtnText && primaryBtnHref && (
                        <div className="animate-in fade-in slide-in-from-bottom-5 duration-1000 delay-500">
                            <Button variant="primary" href={primaryBtnHref} className="bg-white text-primary hover:bg-gray-100 px-10">
                                {primaryBtnText}
                            </Button>
                        </div>
                    )}
                </div>
            </section>
        );
    }

    return (
        <section className={cn(
            "bg-primary text-white overflow-hidden relative min-h-[80vh] flex items-center"
        )}>
            {/* Background patterns could go here */}
            <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center px-6 py-24">

                <div className="z-10">
                    <h1 className={cn(
                        "font-bold leading-tight text-4xl lg:text-7xl"
                    )}>
                        {title}
                    </h1>
                    <p className="mt-6 text-lg lg:text-xl opacity-90 max-w-xl">
                        {description}
                    </p>

                    <div className="mt-10 flex flex-wrap gap-4">
                        {primaryBtnText && primaryBtnHref && (
                            <Button variant="primary" href={primaryBtnHref} className="bg-white text-primary hover:bg-gray-100 px-8">
                                {primaryBtnText}
                            </Button>
                        )}
                        {secondaryBtnText && secondaryBtnHref && (
                            <Button variant="secondary" href={secondaryBtnHref} className="border-white text-white hover:bg-white/10 px-8">
                                {secondaryBtnText}
                            </Button>
                        )}
                    </div>

                    {/* Subheader or teaser from reference */}
                    <div className="mt-16 pt-8 border-t border-white/20 hidden lg:block">
                        <p className="text-sm opacity-80 max-w-md">
                            We know that you care about how effectively your donation is being used. That's why we show you how every dollar was spent.
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border-8 border-white/10">
                        <img
                            src={image}
                            alt={title}
                            className="w-full h-auto object-cover aspect-[4/5] lg:aspect-square"
                        />
                        {/* Decorative element like in the reference image */}
                        <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/20">
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2, 3, 4, 5, 6].map(i => (
                                    <div key={i} className="w-1.5 h-1.5 rounded-full bg-white/40"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Circular graphic like in reference */}
                    <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-white/10 rounded-full flex items-center justify-center animate-pulse">
                        <div className="w-32 h-32 border border-white/5 rounded-full"></div>
                    </div>
                </div>

            </div>

            {/* Bottom stats from reference could be integrated here or in the section below */}
        </section>
    );
}

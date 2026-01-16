import { cn } from "@/lib/utils";

interface SectionHeaderProps {
    title: string;
    subtitle: string;
    description?: string;
    center?: boolean;
    className?: string;
}

export default function SectionHeader({ title, subtitle, description, center = false, className }: SectionHeaderProps) {
    return (
        <div className={cn("max-w-2xl", center && "text-center mx-auto", className)}>
            <span className="text-primary font-bold tracking-widest uppercase text-sm">{subtitle}</span>
            <h2 className="text-3xl md:text-4xl font-bold mt-2 text-primaryDark">{title}</h2>
            {description && <p className="mt-4 text-gray-600 text-lg leading-relaxed">{description}</p>}
        </div>
    );
}

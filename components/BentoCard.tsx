import { ReactNode } from "react";

export default function BentoCard({ title, description, icon }: { title: string; description: string; icon?: ReactNode }) {
    return (
        <div className="group bg-white rounded-3xl shadow-sm p-10 border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-2 flex flex-col h-full">
            {icon ? (
                <div className="mb-8 w-14 h-14 bg-primary/5 rounded-2xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    {icon}
                </div>
            ) : (
                <div className="w-12 h-1 bg-primary/20 group-hover:bg-primary rounded-full transition-colors mb-6"></div>
            )}
            <h3 className="text-2xl font-bold text-primaryDark uppercase tracking-tight">{title}</h3>
            <p className="mt-4 text-gray-600 leading-relaxed font-light flex-grow">{description}</p>
        </div>
    );
}
